class OweoApp {
    constructor() {
        this.initialized = false;
        this.components = new Map();
        this.currentPage = null;
        this.isDemoMode = false;
        
        // Event Bus pour la communication entre composants
        this.eventBus = new EventBus();
        
        // Configuration
        this.config = {
            enableAnalytics: true,
            enableClientAccess: true,
            enableDemoSearch: true,
            debugMode: false
        };
    }
    
    async init() {
        try {
            console.log('🚀 Initializing Oweo App...');
            
            // 1. Initialiser les utilitaires
            await this.initUtils();
            
            // 2. Initialiser les composants
            await this.initComponents();
            
            // 3. Initialiser le routeur
            await this.initRouter();
            
            // 4. Démarrer l'application
            await this.start();
            
            this.initialized = true;
            console.log('✅ Oweo App initialized successfully');
            
        } catch (error) {
            console.error('❌ App initialization failed:', error);
            this.showErrorPage(error);
        }
    }
    
    async initUtils() {
        // Initialisation des utilitaires DOM
        if (typeof DOMUtils !== 'undefined') {
            this.dom = new DOMUtils();
        }
        
        // Initialisation des animations
        if (typeof AnimationUtils !== 'undefined') {
            this.animations = new AnimationUtils();
        }
    }
    
    async initComponents() {
        const componentManager = new ComponentManager(this.eventBus);
        
        // Navbar
        const navbar = new OweoNavbar({
            container: '#navbar',
            eventBus: this.eventBus
        });
        await componentManager.register('navbar', navbar);
        
        // Footer
        const footer = new OweoFooter({
            container: '#footer',
            eventBus: this.eventBus
        });
        await componentManager.register('footer', footer);
        
        // Demo Search (si activé)
        if (this.config.enableDemoSearch) {
            const demoSearch = new DemoSearch({
                container: '#demo-search-banner',
                eventBus: this.eventBus
            });
            await componentManager.register('demoSearch', demoSearch);
        }
        
        this.componentManager = componentManager;
    }
    
    async initRouter() {
        this.router = new OweoRouter({
            container: '#app',
            eventBus: this.eventBus,
            onRouteChange: (route) => this.handleRouteChange(route)
        });
        
        // Enregistrer les pages
        this.registerPages();
        
        await this.router.init();
    }
    
    registerPages() {
        // Pages principales
        this.router.register('home', new HomePage());
        this.router.register('services', new ServicesPage());
        
        // Pages démo
        this.router.register('chiffrage-demo', new ChiffrageDemo());
        this.router.register('dstv-demo', new DSTVDemo());
    }
    
    async start() {
        // Masquer le loading
        const loading = document.querySelector('.loading-container');
        if (loading) {
            this.animations?.fadeOut(loading);
        }
        
        // Afficher l'app
        const appContainer = document.getElementById('app');
        if (appContainer) {
            appContainer.classList.add('loaded');
        }
        
        // Navigation initiale
        await this.router.start();
    }
    
    handleRouteChange(route) {
        this.currentPage = route.name;
        
        // Vérifier si c'est une démo
        const isDemoPage = route.name.includes('-demo');
        
        if (isDemoPage !== this.isDemoMode) {
            this.isDemoMode = isDemoPage;
            this.toggleDemoMode();
        }
        
        // Émettre l'événement
        this.eventBus.emit('routeChanged', {
            route: route.name,
            isDemoMode: this.isDemoMode
        });
    }
    
    toggleDemoMode() {
        const demoSearch = document.getElementById('demo-search-banner');
        if (!demoSearch) return;
        
        if (this.isDemoMode) {
            demoSearch.style.display = 'block';
            setTimeout(() => demoSearch.classList.add('active'), 50);
            
            // Ajuster le padding du body
            document.body.style.paddingTop = 'calc(var(--navbar-height) + 60px)';
        } else {
            demoSearch.classList.remove('active');
            setTimeout(() => demoSearch.style.display = 'none', 300);
            
            // Restaurer le padding
            document.body.style.paddingTop = 'var(--navbar-height)';
        }
    }
    
    showErrorPage(error) {
        const appContainer = document.getElementById('app');
        if (appContainer) {
            appContainer.innerHTML = `
                <div class="error-container">
                    <h1>Erreur de chargement</h1>
                    <p>Une erreur est survenue lors du chargement de l'application.</p>
                    <details>
                        <summary>Détails de l'erreur</summary>
                        <pre>${error.message}</pre>
                    </details>
                    <button onclick="location.reload()" class="btn btn-primary">
                        Recharger la page
                    </button>
                </div>
            `;
        }
    }
}

// Event Bus pour la communication inter-composants
class EventBus {
    constructor() {
        this.events = new Map();
    }
    
    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(callback);
        
        // Retourner une fonction de désabonnement
        return () => this.off(event, callback);
    }
    
    off(event, callback) {
        if (!this.events.has(event)) return;
        
        const callbacks = this.events.get(event);
        const index = callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
        }
    }
    
    emit(event, data) {
        if (!this.events.has(event)) return;
        
        this.events.get(event).forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`Error in event handler for ${event}:`, error);
            }
        });
    }
}

// Component Manager
class ComponentManager {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.components = new Map();
    }
    
    async register(name, component) {
        try {
            await component.init();
            this.components.set(name, component);
            console.log(`✅ Component ${name} registered`);
        } catch (error) {
            console.error(`❌ Failed to register component ${name}:`, error);
        }
    }
    
    get(name) {
        return this.components.get(name);
    }
    
    async destroy() {
        for (const [name, component] of this.components) {
            try {
                if (component.destroy) {
                    await component.destroy();
                }
            } catch (error) {
                console.error(`Error destroying component ${name}:`, error);
            }
        }
        this.components.clear();
    }
}

// Base Component Class
class BaseComponent {
    constructor(options = {}) {
        this.container = options.container;
        this.eventBus = options.eventBus;
        this.initialized = false;
        this.element = null;
    }
    
    async init() {
        if (this.initialized) return;
        
        this.element = typeof this.container === 'string' 
            ? document.querySelector(this.container)
            : this.container;
            
        if (!this.element) {
            throw new Error(`Container not found: ${this.container}`);
        }
        
        await this.render();
        this.bindEvents();
        
        this.initialized = true;
    }
    
    async render() {
        // À implémenter dans les classes enfants
    }
    
    bindEvents() {
        // À implémenter dans les classes enfants
    }
    
    destroy() {
        if (this.element) {
            this.element.innerHTML = '';
        }
        this.initialized = false;
    }
}

// Demo Search Component
class DemoSearch extends BaseComponent {
    constructor(options) {
        super(options);
        this.searchData = null;
        this.isVisible = false;
    }
    
    async init() {
        await super.init();
        await this.loadSearchData();
    }
    
    async loadSearchData() {
        // Charger les données de recherche depuis la configuration
        if (typeof DEMO_SEARCH_CONFIG !== 'undefined') {
            this.searchData = DEMO_SEARCH_CONFIG;
        } else {
            // Données par défaut
            this.searchData = {
                demos: [
                    {
                        id: 'chiffrage-demo',
                        title: 'Outil de Chiffrage',
                        description: 'Chiffrage automatisé pour projets métalliques',
                        category: 'Devis',
                        keywords: ['chiffrage', 'devis', 'calcul', 'prix', 'métrage'],
                        icon: 'fas fa-calculator'
                    },
                    {
                        id: 'dstv-demo',
                        title: 'Interface DSTV',
                        description: 'Import/Export de fichiers DSTV pour machines CNC',
                        category: 'Production',
                        keywords: ['dstv', 'cnc', 'usinage', 'fichier', 'machine'],
                        icon: 'fas fa-cog'
                    }
                ]
            };
        }
    }
    
    bindEvents() {
        const input = this.element.querySelector('#demo-search-input');
        const results = this.element.querySelector('#demo-search-results');
        const closeBtn = this.element.querySelector('#demo-search-close');
        const helpBtn = this.element.querySelector('#demo-search-help');
        
        if (input) {
            input.addEventListener('input', (e) => this.handleSearch(e.target.value));
            input.addEventListener('focus', () => this.showResults());
            input.addEventListener('keydown', (e) => this.handleKeyNavigation(e));
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }
        
        if (helpBtn) {
            helpBtn.addEventListener('click', () => this.showHelp());
        }
        
        // Fermer en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (!this.element.contains(e.target)) {
                this.hideResults();
            }
        });
        
        // Écouter les changements de route
        if (this.eventBus) {
            this.eventBus.on('routeChanged', (data) => {
                if (data.isDemoMode && !this.isVisible) {
                    this.show();
                } else if (!data.isDemoMode && this.isVisible) {
                    this.hide();
                }
            });
        }
    }
    
    handleSearch(query) {
        const results = this.element.querySelector('#demo-search-results');
        if (!results) return;
        
        if (!query.trim()) {
            this.hideResults();
            return;
        }
        
        const filteredDemos = this.searchData.demos.filter(demo => {
            const searchIn = [
                demo.title,
                demo.description,
                demo.category,
                ...demo.keywords
            ].join(' ').toLowerCase();
            
            return searchIn.includes(query.toLowerCase());
        });
        
        this.renderResults(filteredDemos);
        this.showResults();
    }
    
    renderResults(demos) {
        const results = this.element.querySelector('#demo-search-results');
        if (!results) return;
        
        if (demos.length === 0) {
            results.innerHTML = `
                <div class="demo-search-result-item">
                    <div class="demo-search-result-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <div class="demo-search-result-content">
                        <div class="demo-search-result-title">Aucun résultat</div>
                        <div class="demo-search-result-description">
                            Aucune démo ne correspond à votre recherche
                        </div>
                    </div>
                </div>
            `;
            return;
        }
        
        results.innerHTML = demos.map(demo => `
            <div class="demo-search-result-item" data-demo="${demo.id}">
                <div class="demo-search-result-icon">
                    <i class="${demo.icon}"></i>
                </div>
                <div class="demo-search-result-content">
                    <div class="demo-search-result-category">${demo.category}</div>
                    <div class="demo-search-result-title">${demo.title}</div>
                    <div class="demo-search-result-description">${demo.description}</div>
                </div>
            </div>
        `).join('');
        
        // Ajouter les événements de clic
        results.querySelectorAll('.demo-search-result-item[data-demo]').forEach(item => {
            item.addEventListener('click', () => {
                const demoId = item.dataset.demo;
                this.navigateToDemo(demoId);
            });
        });
    }
    
    navigateToDemo(demoId) {
        this.hideResults();
        
        // Émettre l'événement de navigation
        if (this.eventBus) {
            this.eventBus.emit('navigateToDemo', { demoId });
        }
        
        // Navigation directe si pas d'event bus
        if (window.app && window.app.router) {
            window.app.router.navigate(demoId);
        }
    }
    
    showResults() {
        const results = this.element.querySelector('#demo-search-results');
        if (results) {
            results.classList.add('show');
        }
    }
    
    hideResults() {
        const results = this.element.querySelector('#demo-search-results');
        if (results) {
            results.classList.remove('show');
        }
    }
    
    show() {
        this.element.style.display = 'block';
        setTimeout(() => {
            this.element.classList.add('active');
            this.isVisible = true;
        }, 50);
    }
    
    hide() {
        this.element.classList.remove('active');
        setTimeout(() => {
            this.element.style.display = 'none';
            this.isVisible = false;
        }, 300);
    }
    
    showHelp() {
        // Afficher l'aide
        const helpContent = `
            <h3>Aide - Recherche Démos</h3>
            <p>Utilisez la barre de recherche pour trouver rapidement une démonstration :</p>
            <ul>
                <li><strong>Mots-clés :</strong> chiffrage, dstv, usinage, métrage...</li>
                <li><strong>Catégories :</strong> Devis, Production, Gestion...</li>
                <li><strong>Navigation :</strong> Utilisez les flèches ↑↓ et Entrée</li>
            </ul>
        `;
        
        // Ici vous pourriez afficher une modal
        alert(helpContent.replace(/<[^>]*>/g, '\n')); // Version simple
    }
    
    handleKeyNavigation(e) {
        const results = this.element.querySelector('#demo-search-results');
        if (!results || !results.classList.contains('show')) return;
        
        const items = results.querySelectorAll('.demo-search-result-item[data-demo]');
        if (items.length === 0) return;
        
        let selectedIndex = Array.from(items).findIndex(item => 
            item.classList.contains('selected')
        );
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
                this.updateSelection(items, selectedIndex);
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, -1);
                this.updateSelection(items, selectedIndex);
                break;
                
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0) {
                    const selectedItem = items[selectedIndex];
                    this.navigateToDemo(selectedItem.dataset.demo);
                }
                break;
                
            case 'Escape':
                this.hideResults();
                break;
        }
    }
    
    updateSelection(items, selectedIndex) {
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === selectedIndex);
        });
    }
}

// Exposer les classes globalement
window.OweoApp = OweoApp;
window.BaseComponent = BaseComponent;
window.DemoSearch = DemoSearch;
window.EventBus = EventBus;
window.ComponentManager = ComponentManager;