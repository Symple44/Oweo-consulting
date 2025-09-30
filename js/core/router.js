// ========================================
// js/core/router.js - Routeur SPA
// ========================================

class OweoRouter {
    constructor(options = {}) {
        this.container = options.container || '#app';
        this.eventBus = options.eventBus;
        this.onRouteChange = options.onRouteChange;
        
        this.routes = new Map();
        this.currentRoute = null;
        this.previousRoute = null;
        this.isNavigating = false;
        
        // Configuration
        this.config = {
            enableTransitions: true,
            transitionDuration: 300,
            notFoundRedirect: 'home',
            ...options
        };
        
        // État de navigation
        this.navigationHistory = [];
        this.maxHistorySize = 50;
    }
    
    /**
     * Initialiser le routeur
     */
    async init() {
        // Gérer les événements de navigation
        this.bindEvents();
        
        // Navigation initiale
        const initialRoute = this.getRouteFromURL();
        await this.navigate(initialRoute, false);
        
        logger.log('🧭 Router initialized');
    }
    
    /**
     * Enregistrer une route
     */
    register(path, component) {
        if (typeof component === 'function') {
            // Si c'est une classe, l'instancier
            this.routes.set(path, new component());
        } else {
            // Si c'est déjà une instance
            this.routes.set(path, component);
        }
        
        logger.log(`🛤️ Route registered: ${path}`);
    }
    
    /**
     * Naviguer vers une route
     */
    async navigate(path, pushState = true) {
        if (this.isNavigating) {
            logger.warn('Navigation already in progress');
            return;
        }
        
        // Nettoyer le path
        path = this.cleanPath(path);
        
        // Vérifier si la route existe
        if (!this.routes.has(path)) {
            logger.warn(`Route not found: ${path}`);
            if (this.config.notFoundRedirect && path !== this.config.notFoundRedirect) {
                return this.navigate(this.config.notFoundRedirect, pushState);
            }
            return;
        }
        
        this.isNavigating = true;
        
        try {
            // Préparer la navigation
            const route = this.createRouteObject(path);
            
            // Hook pré-navigation
            await this.onBeforeNavigate(route);
            
            // Mise à jour de l'historique
            if (pushState) {
                this.updateURL(path);
            }
            this.addToHistory(route);
            
            // Effectuer la navigation
            await this.performNavigation(route);
            
            // Hook post-navigation
            await this.onAfterNavigate(route);
            
            // Émettre l'événement
            this.emitRouteChange(route);
            
        } catch (error) {
            logger.error('Navigation error:', error);
            this.handleNavigationError(error, path);
        } finally {
            this.isNavigating = false;
        }
    }
    
    /**
     * Effectuer la navigation
     */
    async performNavigation(route) {
        const container = this.getContainer();
        if (!container) {
            throw new Error('Router container not found');
        }
        
        const component = this.routes.get(route.path);
        
        // Détruire le composant précédent
        if (this.currentRoute && this.currentRoute.component) {
            await this.destroyCurrentComponent();
        }
        
        // Transition de sortie
        if (this.config.enableTransitions && container.firstElementChild) {
            await this.transitionOut(container.firstElementChild);
        }
        
        // Initialiser le nouveau composant
        await this.initializeComponent(component);
        
        // Rendre le composant
        const content = await component.render();
        container.innerHTML = content;
        
        // Monter le composant
        if (component.onMount) {
            await component.onMount();
        }
        
        // Transition d'entrée
        if (this.config.enableTransitions) {
            await this.transitionIn(container.firstElementChild);
        }
        
        // Mettre à jour la route courante
        this.previousRoute = this.currentRoute;
        this.currentRoute = {
            ...route,
            component
        };
    }
    
    /**
     * Initialiser un composant
     */
    async initializeComponent(component) {
        if (component && component.init && !component.initialized) {
            await component.init();
        }
    }
    
    /**
     * Détruire le composant courant
     */
    async destroyCurrentComponent() {
        const component = this.currentRoute?.component;
        if (component && component.destroy) {
            await component.destroy();
        }
    }
    
    /**
     * Transition de sortie
     */
    async transitionOut(element) {
        if (!element || !window.AnimationUtils) return;
        
        const animations = new AnimationUtils();
        await animations.fadeOut(element, this.config.transitionDuration);
    }
    
    /**
     * Transition d'entrée
     */
    async transitionIn(element) {
        if (!element || !window.AnimationUtils) return;
        
        const animations = new AnimationUtils();
        await animations.fadeIn(element, this.config.transitionDuration);
    }
    
    /**
     * Créer un objet route
     */
    createRouteObject(path) {
        return {
            path,
            timestamp: Date.now(),
            params: this.extractParams(path),
            query: this.extractQuery()
        };
    }
    
    /**
     * Extraire les paramètres de l'URL
     */
    extractParams(path) {
        // Pour l'instant, gestion simple
        // Peut être étendu pour supporter /route/:id
        return {};
    }
    
    /**
     * Extraire la query string
     */
    extractQuery() {
        const params = new URLSearchParams(window.location.search);
        const query = {};
        
        for (const [key, value] of params.entries()) {
            query[key] = value;
        }
        
        return query;
    }
    
    /**
     * Gérer les événements
     */
    bindEvents() {
        // Protéger contre la propagation d'événements
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link && !link.closest('.cgv-page')) {
                const href = link.getAttribute('href');
                if (href && href !== '#' && href.length > 1) {
                    // C'est une navigation de route principale
                    e.preventDefault();
                    e.stopImmediatePropagation(); // Empêcher d'autres handlers
                    const route = href.substring(1);
                    this.navigate(route);
                }
            }
        }, true); // Utiliser la phase de capture

        // Événement popstate (boutons précédent/suivant)
        window.addEventListener('popstate', (event) => {
            const path = this.getRouteFromURL();
            this.navigate(path, false);
        });
        
        // Écouter les événements de navigation
        if (this.eventBus) {
            this.eventBus.on('navigate', (data) => {
                if (data.page) {
                    this.navigate(data.page);
                }
            });
            
            this.eventBus.on('navigateToDemo', (data) => {
                if (data.demoId) {
                    this.navigate(data.demoId);
                }
            });
        }
    }
    
    /**
     * Hooks de navigation
     */
    async onBeforeNavigate(route) {
        logger.log(`🧭 Navigating to: ${route.path}`);
        
        if (this.eventBus) {
            this.eventBus.emit('beforeNavigate', route);
        }
    }
    
    async onAfterNavigate(route) {
        logger.log(`✅ Navigation completed: ${route.path}`);
        
        // Scroll vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Mettre à jour le titre
        this.updatePageTitle(route);
        
        if (this.eventBus) {
            this.eventBus.emit('afterNavigate', route);
        }
    }
    
    /**
     * Émettre le changement de route
     */
    emitRouteChange(route) {
        if (this.onRouteChange) {
            this.onRouteChange(route);
        }
        
        if (this.eventBus) {
            this.eventBus.emit('routeChanged', route);
        }
    }
    
    /**
     * Gérer les erreurs de navigation
     */
    handleNavigationError(error, path) {
        logger.error(`Navigation error for ${path}:`, error);

        // Tentative de navigation vers une page d'erreur ou accueil
        if (path !== 'home' && this.routes.has('home')) {
            setTimeout(() => this.navigate('home'), 100);
        }
    }
    
    /**
     * Obtenir la route depuis l'URL
     */
    getRouteFromURL() {
        const hash = window.location.hash.slice(1);
        return this.cleanPath(hash || 'home');
    }
    
    /**
     * Nettoyer un path
     */
    cleanPath(path) {
        if (!path || path === '/') return 'home';
        return path.replace(/^\/+|\/+$/g, '');
    }
    
    /**
     * Mettre à jour l'URL
     */
    updateURL(path) {
        const url = `#${path}`;
        if (window.location.hash !== url) {
            window.history.pushState(null, '', url);
        }
    }
    
    /**
     * Mettre à jour le titre de la page
     */
    updatePageTitle(route) {
        const component = route.component;
        let title = 'Oweo';
        
        if (component && component.title) {
            title = `${component.title} - Oweo`;
        }
        
        document.title = title;
    }
    
    /**
     * Ajouter à l'historique de navigation
     */
    addToHistory(route) {
        this.navigationHistory.unshift(route);
        
        if (this.navigationHistory.length > this.maxHistorySize) {
            this.navigationHistory = this.navigationHistory.slice(0, this.maxHistorySize);
        }
    }
    
    /**
     * Obtenir le conteneur
     */
    getContainer() {
        if (typeof this.container === 'string') {
            return document.querySelector(this.container);
        }
        return this.container;
    }
    
    /**
     * Démarrer le routeur
     */
    async start() {
        await this.init();
    }
    
    /**
     * Naviguer vers la page précédente
     */
    goBack() {
        if (this.navigationHistory.length > 1) {
            const previousRoute = this.navigationHistory[1];
            this.navigate(previousRoute.path);
        } else if (window.history.length > 1) {
            window.history.back();
        } else {
            this.navigate('home');
        }
    }
    
    /**
     * Actualiser la route courante
     */
    refresh() {
        if (this.currentRoute) {
            this.navigate(this.currentRoute.path, false);
        }
    }
    
    /**
     * Vérifier si une route existe
     */
    hasRoute(path) {
        return this.routes.has(this.cleanPath(path));
    }
    
    /**
     * Obtenir la route courante
     */
    getCurrentRoute() {
        return this.currentRoute;
    }
    
    /**
     * Obtenir l'historique de navigation
     */
    getHistory() {
        return [...this.navigationHistory];
    }
    
    /**
     * Détruire le routeur
     */
    async destroy() {
        // Détruire le composant courant
        await this.destroyCurrentComponent();
        
        // Nettoyer les routes
        for (const [path, component] of this.routes) {
            if (component.destroy) {
                await component.destroy();
            }
        }
        
        this.routes.clear();
        this.navigationHistory = [];
        this.currentRoute = null;
        this.previousRoute = null;
        
        logger.log('🧭 Router destroyed');
    }
}

// Exposer la classe
window.OweoRouter = OweoRouter;