// ========================================
// js/core/app.js - Application principale avec intégration SEO
// ========================================

class OweoApp {
    constructor() {
        this.initialized = false;
        this.components = new Map();
        this.currentPage = null;
        this.isDemoMode = false;
        
        // Event Bus pour la communication entre composants
        this.eventBus = new EventBus();
        
        // SEO Manager
        this.seoManager = null;
        
        // Google Services
        this.googleServices = null;
        
        // Configuration
        this.config = {
            enableAnalytics: true,
            enableClientAccess: true,
            enableDemoSearch: true,
            enableSEO: true,
            debugMode: false
        };
    }
    
    async init() {
        try {
            console.log('🚀 Initializing Oweo App...');
            
            // 1. Initialiser les utilitaires
            await this.initUtils();
            
            // 2. Initialiser le SEO
            await this.initSEO();
            
            // 3. Initialiser Google Services
            await this.initGoogleServices();
            
            // 4. Initialiser les composants
            await this.initComponents();
            
            // 5. Initialiser le routeur
            await this.initRouter();
            
            // 6. Démarrer l'application
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
    
    async initSEO() {
        if (!this.config.enableSEO || typeof SEOManager === 'undefined') {
            console.warn('⚠️ SEO disabled or SEOManager not available');
            return;
        }
        
        try {
            this.seoManager = new SEOManager();
            this.seoManager.init();
            
            // Définir le SEO de la page d'accueil par défaut
            if (window.SEOPagesConfig?.home) {
                this.seoManager.updatePageSEO(window.SEOPagesConfig.home);
            }
            
            console.log('✅ SEO Manager initialized');
        } catch (error) {
            console.error('❌ SEO initialization failed:', error);
        }
    }
    
    async initGoogleServices() {
        if (!this.config.enableAnalytics || typeof GoogleServices === 'undefined') {
            console.warn('⚠️ Analytics disabled or GoogleServices not available');
            return;
        }
        
        try {
            this.googleServices = window.googleServices || new GoogleServices();
            
            // Écouter les événements de l'app pour le tracking
            this.setupAnalyticsEvents();
            
            console.log('✅ Google Services ready');
        } catch (error) {
            console.error('❌ Google Services initialization failed:', error);
        }
    }
    
    setupAnalyticsEvents() {
        if (!this.googleServices) return;
        
        // Écouter les événements de navigation
        this.eventBus.on('routeChanged', (data) => {
            if (this.googleServices) {
                this.googleServices.onRouteChange(data.route);
            }
        });
        
        // Écouter les accès aux démos
        this.eventBus.on('demoAccessed', (data) => {
            if (this.googleServices) {
                this.googleServices.onDemoAccess(data.demoId);
            }
        });
        
        // Écouter les soumissions de formulaires
        this.eventBus.on('formSubmitted', (data) => {
            if (this.googleServices) {
                this.googleServices.onFormSubmit(data.formType);
            }
        });
        
        // Écouter les téléchargements
        this.eventBus.on('brochureDownloaded', () => {
            if (this.googleServices) {
                this.googleServices.onBrochureDownload();
            }
        });
        
        // Écouter les ouvertures Calendly
        this.eventBus.on('calendlyOpened', () => {
            if (this.googleServices) {
                this.googleServices.onCalendlyOpen();
            }
        });
    }
    
    async initComponents() {
        this.componentManager = new ComponentManager(this.eventBus);
        
        // Navbar
        if (typeof OweoNavbar !== 'undefined') {
            const navbar = new OweoNavbar({
                container: '#navbar',
                eventBus: this.eventBus
            });
            await this.componentManager.register('navbar', navbar);
        }
        
        // Footer
        if (typeof OweoFooter !== 'undefined') {
            const footer = new OweoFooter({
                container: '#footer',
                eventBus: this.eventBus
            });
            await this.componentManager.register('footer', footer);
        }
        
        // Demo Search (si activé)
        if (this.config.enableDemoSearch && typeof DemoSearch !== 'undefined') {
            const demoSearch = new DemoSearch({
                container: '#demo-search-banner',
                eventBus: this.eventBus
            });
            await this.componentManager.register('demoSearch', demoSearch);
        }
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
        if (typeof HomePage !== 'undefined') {
            this.router.register('home', new HomePage());
        }
        
        if (typeof ServicesPage !== 'undefined') {
            this.router.register('services', new ServicesPage());
        }
        
        // Page catalogue des démos
        if (typeof DemosPage !== 'undefined') {
            this.router.register('demos', new DemosPage());
        }
        
        // Page de contact
        if (typeof ContactPage !== 'undefined') {
            this.router.register('contact', new ContactPage());
        }

        // Page de CGV
        if (typeof CGVPage !== 'undefined') {
            this.router.register('cgv', new CGVPage());
        }

        // Page Legal
        if (typeof LegalPage !== 'undefined') {
            this.router.register('legal', new LegalPage('legal'));
            this.router.register('privacy', new LegalPage('privacy'));
            this.router.register('terms', new LegalPage('terms'));
            this.router.register('cookies', new LegalPage('cookies'));
        }
        
        // Pages démo individuelles
        if (typeof ChiffrageDemo !== 'undefined') {
            this.router.register('chiffrage-demo', new ChiffrageDemo());
        }
        
        if (typeof DSTVDemo !== 'undefined') {
            this.router.register('dstv-demo', new DSTVDemo());
        }
    }
    
    async start() {
        // Masquer le loading
        const loading = document.querySelector('.loading-container');
        if (loading && this.animations) {
            await this.animations.fadeOut(loading);
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
        this.currentPage = route.path;
        
        // Vérifier si c'est une démo individuelle (pas la page catalogue)
        const isDemoPage = route.path.includes('-demo');
        
        if (isDemoPage !== this.isDemoMode) {
            this.isDemoMode = isDemoPage;
            this.toggleDemoMode();
        }
        
        // ⭐ NOUVEAU: Mettre à jour le SEO pour la nouvelle page
        this.updatePageSEO(route.path);
        
        // Émettre l'événement
        this.eventBus.emit('routeChanged', {
            route: route.path,
            isDemoMode: this.isDemoMode,
            isDemosPage: route.path === 'demos',
            isContactPage: route.path === 'contact',
            ...route
        });
    }
    
    updatePageSEO(pagePath) {
        if (!this.seoManager || !window.SEOPagesConfig) return;
        
        try {
            const pageConfig = window.SEOPagesConfig[pagePath];
            if (pageConfig) {
                // Construire l'URL canonique
                const baseUrl = window.CompanyInfo?.urls?.website || 'https://oweo-consulting.fr';
                const canonical = pagePath === 'home' 
                    ? baseUrl 
                    : `${baseUrl}/#${pagePath}`;
                
                // Mettre à jour le SEO
                this.seoManager.updatePageSEO({
                    ...pageConfig,
                    canonical: canonical
                });
                
                console.log(`🔍 SEO updated for page: ${pagePath}`);
            } else {
                console.warn(`⚠️ No SEO config found for page: ${pagePath}`);
            }
        } catch (error) {
            console.error('❌ Error updating page SEO:', error);
        }
    }
    
    toggleDemoMode() {
        const demoSearch = document.getElementById('demo-search-banner');
        if (!demoSearch) return;
        
        if (this.isDemoMode) {
            demoSearch.style.display = 'block';
            setTimeout(() => demoSearch.classList.add('active'), 50);
            
            // Ajuster le padding du body
            document.body.style.paddingTop = 'calc(var(--navbar-height) + 80px)';
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
                    <div class="error-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h1>Erreur de chargement</h1>
                    <p>Une erreur est survenue lors du chargement de l'application.</p>
                    <details>
                        <summary>Détails de l'erreur</summary>
                        <pre>${error.message}</pre>
                        <pre>${error.stack}</pre>
                    </details>
                    <div class="error-actions">
                        <button onclick="location.reload()" class="btn btn-primary">
                            <i class="fas fa-refresh"></i>
                            Recharger la page
                        </button>
                        <button onclick="window.location.hash='#home'" class="btn btn-outline">
                            <i class="fas fa-home"></i>
                            Retour à l'accueil
                        </button>
                    </div>
                </div>
                
                <style>
                .error-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 60vh;
                    text-align: center;
                    padding: 2rem;
                }
                
                .error-icon {
                    font-size: 4rem;
                    color: #ef4444;
                    margin-bottom: 1rem;
                }
                
                .error-container h1 {
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    color: #1f2937;
                }
                
                .error-container p {
                    margin-bottom: 2rem;
                    color: #6b7280;
                    max-width: 500px;
                }
                
                .error-container details {
                    margin-bottom: 2rem;
                    text-align: left;
                    background: #f3f4f6;
                    padding: 1rem;
                    border-radius: 8px;
                    max-width: 600px;
                }
                
                .error-container pre {
                    font-size: 0.875rem;
                    color: #ef4444;
                    white-space: pre-wrap;
                    word-break: break-word;
                }
                
                .error-actions {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                
                .btn {
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 600;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    border: none;
                    transition: all 0.2s;
                }
                
                .btn-primary {
                    background: #3b82f6;
                    color: white;
                }
                
                .btn-primary:hover {
                    background: #2563eb;
                }
                
                .btn-outline {
                    background: transparent;
                    color: #3b82f6;
                    border: 1px solid #3b82f6;
                }
                
                .btn-outline:hover {
                    background: #3b82f6;
                    color: white;
                }
                </style>
            `;
        }
    }
    
    // ⭐ NOUVELLES MÉTHODES PUBLIQUES POUR LE SEO ET ANALYTICS
    
    // Méthode pour tracker des événements personnalisés
    trackEvent(eventName, parameters = {}) {
        if (this.googleServices) {
            this.googleServices.trackEvent(eventName, parameters);
        }
    }
    
    // Méthode pour tracker des conversions
    trackConversion(conversionName, value = null) {
        if (this.googleServices) {
            this.googleServices.trackConversion(conversionName, value);
        }
    }
    
    // Méthode pour mettre à jour le SEO dynamiquement
    updateSEO(seoData) {
        if (this.seoManager) {
            this.seoManager.updatePageSEO(seoData);
        }
    }
    
    // Méthodes publiques existantes
    
    getComponent(name) {
        return this.componentManager?.get(name);
    }
    
    getCurrentRoute() {
        return this.router?.getCurrentRoute();
    }
    
    navigate(route) {
        return this.router?.navigate(route);
    }
    
    async destroy() {
        if (this.componentManager) {
            await this.componentManager.destroyAll();
        }
        
        if (this.router) {
            await this.router.destroy();
        }
        
        this.initialized = false;
        console.log('🗑️ App destroyed');
    }
}

// Exposer la classe principale
window.OweoApp = OweoApp;