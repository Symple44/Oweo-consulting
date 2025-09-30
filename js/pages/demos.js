// ========================================
// js/pages/demos.js - Page catalogue des démos
// ========================================

class DemosPage extends BasePage {
    constructor() {
        super({
            id: 'demos',
            title: 'Nos Démonstrations',
            description: 'Découvrez nos solutions ERP en action avec des démonstrations interactives'
        });
        
        // Configuration des démos depuis la config centralisée avec des valeurs par défaut
        this.demosConfig = this.getCompleteDeomosConfig();
        this.searchTerm = '';
        this.selectedCategory = 'all';
        
        // Catégories de démos
        this.categories = [
            { id: 'all', name: 'Toutes les démos', icon: 'fas fa-th-large' },
            { id: 'devis', name: 'Devis & Chiffrage', icon: 'fas fa-calculator' },
            { id: 'production', name: 'Production', icon: 'fas fa-cog' },
            { id: 'logistique', name: 'Logistique', icon: 'fas fa-truck' },
            { id: 'gestion', name: 'Gestion', icon: 'fas fa-chart-bar' }
        ];
        
        // Démos à venir
        this.comingSoonDemos = [
            {
                id: 'analytics-demo',
                title: 'Analytics Avancés',
                description: 'Tableaux de bord et analyses prédictives',
                icon: 'fas fa-chart-line',
                estimatedRelease: '2026'
            },
            {
                id: 'mobile-app-demo',
                title: 'Application Mobile',
                description: 'Suivi terrain et saisie nomade',
                icon: 'fas fa-mobile-alt',
                estimatedRelease: '2026'
            },
            {
                id: 'ai-assistant-demo',
                title: 'Assistant IA',
                description: 'Intelligence artificielle pour optimiser vos processus',
                icon: 'fas fa-robot',
                estimatedRelease: '2026'
            }
        ];
    }
    
    getCompleteDeomosConfig() {
        // Récupérer la config de base depuis AppConfig
        const baseConfig = window.AppConfig?.demos || {};
        
        // Configuration complète avec toutes les démos et leurs propriétés
        const fullDemosConfig = {
            chiffrageDemo: {
                enabled: true,
                requiresAuth: true,
                title: 'Démo Chiffrage',
                description: 'Outil de chiffrage automatisé pour la charpente métallique',
                features: ['Calcul automatique', 'Export PDF', 'Base de données matériaux'],
                estimatedDuration: '15-20 minutes',
                icon: 'fas fa-calculator'
            },
            dstvDemo: {
                enabled: true,
                requiresAuth: true,
                title: 'Démo DSTV',
                description: 'Interface DSTV pour machines CNC',
                features: ['Import DSTV', 'Validation automatique', 'Export machines'],
                estimatedDuration: '10-15 minutes',
                icon: 'fas fa-cog'
            }
        };
        
        // Fusionner avec la config existante en préservant les valeurs de AppConfig
        Object.keys(fullDemosConfig).forEach(key => {
            if (baseConfig[key]) {
                fullDemosConfig[key] = { ...fullDemosConfig[key], ...baseConfig[key] };
            }
        });
        
        return fullDemosConfig;
    }
    
    getTemplate() {
        return `
            <div class="demos-page">
                <!-- Page Header -->
                <section class="page-header">
                    <div class="container">
                        <div class="page-breadcrumb">
                            <a href="#" data-page="home">Accueil</a>
                            <i class="fas fa-chevron-right"></i>
                            <span>Démonstrations</span>
                        </div>
                        
                        <h1 class="page-title fade-in-up">Nos Démonstrations</h1>
                        <p class="page-description fade-in-up">
                            Explorez nos solutions ERP en action. Testez nos outils métier 
                            avec des démonstrations interactives et découvrez comment ils peuvent 
                            transformer votre activité.
                        </p>
                        
                        <div class="demos-stats fade-in-up">
                            <div class="stat-item">
                                <div class="stat-number">${this.getAvailableDemosCount()}</div>
                                <div class="stat-label">Démos disponibles</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">15-25</div>
                                <div class="stat-label">Minutes par démo</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">100%</div>
                                <div class="stat-label">Interactif</div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Search and Filters -->
                <section class="filters-section">
                    <div class="container">
                        <div class="filters-container">
                            <div class="search-container">
                                <div class="search-input-wrapper">
                                    <i class="fas fa-search"></i>
                                    <input type="text" 
                                           id="demos-search" 
                                           class="search-input" 
                                           placeholder="Rechercher une démonstration..."
                                           value="${this.searchTerm}">
                                    <button class="search-clear" id="search-clear" style="display: none;">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="category-filters">
                                ${this.categories.map(category => `
                                    <button class="category-filter ${category.id === this.selectedCategory ? 'active' : ''}" 
                                            data-category="${category.id}">
                                        <i class="${category.icon}"></i>
                                        <span>${category.name}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Access Notice -->
                <section class="access-notice">
                    <div class="container">
                        <div class="notice-content">
                            <div class="notice-icon">
                                <i class="fas fa-info-circle"></i>
                            </div>
                            <div class="notice-text">
                                <h3>Accès aux démonstrations</h3>
                                <p>Certaines démos nécessitent un accès client. 
                                Utilisez <strong>DEMO-CLIENT</strong> pour tester ou contactez-nous pour un accès personnalisé.</p>
                            </div>
                            <div class="notice-actions">
                                <button class="btn btn-outline btn-sm" id="access-info-btn">
                                    <i class="fas fa-info-circle"></i>
                                    Plus d'infos
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Demos Grid -->
                <section class="section">
                    <div class="container">
                        <div class="demos-grid" id="demos-grid">
                            ${this.renderDemosGrid()}
                        </div>
                        
                        <div class="no-results" id="no-results" style="display: none;">
                            <div class="no-results-content">
                                <i class="fas fa-search-minus"></i>
                                <h3>Aucune démo trouvée</h3>
                                <p>Essayez de modifier vos critères de recherche ou explorez toutes les catégories.</p>
                                <button class="btn btn-primary" id="clear-filters-btn">
                                    <i class="fas fa-refresh"></i>
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Coming Soon -->
                <section class="coming-soon-section">
                    <div class="container">
                        <div class="section-header">
                            <h2 class="section-title fade-in-up">Prochainement</h2>
                            <p class="section-description fade-in-up">
                                De nouvelles démonstrations arrivent bientôt
                            </p>
                        </div>
                        
                        <div class="coming-soon-grid">
                            ${this.comingSoonDemos.map(demo => this.renderComingSoonCard(demo)).join('')}
                        </div>
                    </div>
                </section>
                
                <!-- Contact CTA -->
                <section class="section-lg">
                    <div class="container">
                        <div class="contact-cta fade-in-up">
                            <div class="contact-content">
                                <h2>Besoin d'une démonstration personnalisée ?</h2>
                                <p>
                                    Nos experts peuvent adapter ces démonstrations à votre contexte métier 
                                    et vous présenter des solutions sur mesure.
                                </p>
                            </div>
                            
                            <div class="contact-actions">
                                <button class="btn btn-primary btn-lg" id="schedule-demo-btn">
                                    <i class="fas fa-calendar"></i>
                                    Parler à un expert
                                </button>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
    
    renderDemosGrid() {
        const availableDemos = this.getFilteredDemos();
        
        if (availableDemos.length === 0) {
            return '';
        }
        
        return availableDemos.map(demo => this.renderDemoCard(demo)).join('');
    }
    
    renderDemoCard(demo) {
        const isAvailable = demo.enabled !== false;
        const requiresAuth = demo.requiresAuth !== false;
        
        return `
            <div class="demo-card fade-in-up ${!isAvailable ? 'disabled' : ''}" data-demo="${demo.id}">
                <div class="demo-header">
                    <div class="demo-icon">
                        <i class="${demo.icon || 'fas fa-cog'}"></i>
                    </div>
                    <div class="demo-meta">
                        <div class="demo-duration">${demo.estimatedDuration || '15-20 minutes'}</div>
                        <div class="demo-status">
                            ${requiresAuth ? '<i class="fas fa-lock" title="Accès client requis"></i>' : ''}
                            ${!isAvailable ? '<i class="fas fa-clock" title="Bientôt disponible"></i>' : ''}
                        </div>
                    </div>
                </div>
                
                <div class="demo-content">
                    <h3 class="demo-title">${demo.title}</h3>
                    <p class="demo-description">${demo.description}</p>
                    
                    <div class="demo-features">
                        <h4>Fonctionnalités :</h4>
                        <ul class="features-list">
                            ${(demo.features || []).map(feature => `
                                <li>
                                    <i class="fas fa-check"></i>
                                    <span>${feature}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="demo-actions">
                    ${isAvailable ? `
                        <button class="btn btn-primary demo-start-btn" data-demo="${demo.id}">
                            <i class="fas fa-play"></i>
                            Démarrer la démo
                        </button>
                        <button class="btn btn-outline demo-info-btn" data-demo="${demo.id}">
                            <i class="fas fa-info-circle"></i>
                            Plus d'infos
                        </button>
                    ` : `
                        <button class="btn btn-disabled" disabled>
                            <i class="fas fa-clock"></i>
                            Bientôt disponible
                        </button>
                    `}
                </div>
            </div>
        `;
    }
    
    renderComingSoonCard(demo) {
        return `
            <div class="coming-soon-card fade-in-up">
                <div class="coming-soon-icon">
                    <i class="${demo.icon}"></i>
                </div>
                <h3>${demo.title}</h3>
                <p>${demo.description}</p>
                <div class="release-date">
                    <i class="fas fa-calendar"></i>
                    ${demo.estimatedRelease}
                </div>
            </div>
        `;
    }
    
    onAfterRender() {
        // Vérifier que le DOM est prêt
        const container = document.querySelector('.demos-page');
        if (!container) {
            console.error('DemosPage: Container not found in DOM');
            return;
        }
        
        this.bindEvents();
        this.initializeAnimations();
        this.initializeFromURL();
    }
    
    bindEvents() {
        // Utiliser document au lieu de this.container qui peut être null
        const container = document.querySelector('.demos-page');
        if (!container) {
            console.warn('DemosPage container not found');
            return;
        }
        
        // Navigation interne
        const navLinks = container.querySelectorAll('[data-page]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const page = link.dataset.page;
                this.navigateTo(page);
            });
        });
        
        // Recherche
        const searchInput = document.getElementById('demos-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.updateSearchClear();
                this.debounceSearch();
            });
        }
        
        // Clear search
        const searchClear = document.getElementById('search-clear');
        if (searchClear) {
            searchClear.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.clearSearch();
            });
        }
        
        // Filtres de catégorie
        const categoryFilters = document.querySelectorAll('.category-filter');
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                const category = filter.dataset.category;
                this.selectCategory(category);
            });
        });
        
        // Actions CTA
        const scheduleDemoBtn = document.getElementById('schedule-demo-btn');
        if (scheduleDemoBtn) {
            scheduleDemoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.scheduleDemo();
            });
        }
        
        const contactExpertBtn = document.getElementById('contact-expert-btn');
        if (contactExpertBtn) {
            contactExpertBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.contactExpert();
            });
        }
        
        // Bouton d'info d'accès
        const accessInfoBtn = document.getElementById('access-info-btn');
        if (accessInfoBtn) {
            accessInfoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAccessInfo();
            });
        }
        
        // Bouton de réinitialisation des filtres
        const clearFiltersBtn = document.getElementById('clear-filters-btn');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearFilters();
            });
        }
        
        // Lier les événements des cartes de démo
        this.bindDemoCardEvents();
        
        // Effet de survol sur les cartes (sans interférer avec les clics)
        this.bindHoverEffects();
    }
    
    getFilteredDemos() {
        // Mapper correctement les démos depuis la config
        let demos = Object.entries(this.demosConfig).map(([key, demo]) => {
            // Les clés dans AppConfig sont comme "chiffrageDemo", "dstvDemo", etc.
            // On doit les convertir en "chiffrage-demo", "dstv-demo", etc.
            const id = key.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
            return {
                id: id,
                ...demo
            };
        });
        
        // Filtrer par catégorie
        if (this.selectedCategory !== 'all') {
            demos = demos.filter(demo => {
                const demoCategory = this.getDemoCategory(demo.id);
                return demoCategory === this.selectedCategory;
            });
        }
        
        // Filtrer par terme de recherche
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            demos = demos.filter(demo => 
                (demo.title && demo.title.toLowerCase().includes(term)) ||
                (demo.description && demo.description.toLowerCase().includes(term)) ||
                (demo.features && demo.features.some(feature => feature.toLowerCase().includes(term)))
            );
        }
        
        return demos;
    }
    
    getDemoCategory(demoId) {
        const categoryMap = {
            'chiffrage-demo': 'devis',
            'dstv-demo': 'production',
            'production-demo': 'production',
            'stock-demo': 'logistique',
            'planning-demo': 'gestion'
        };
        
        return categoryMap[demoId] || 'gestion';
    }
    
    getAvailableDemosCount() {
        return Object.values(this.demosConfig).filter(demo => demo.enabled !== false).length;
    }
    
    updateSearchClear() {
        const clearBtn = document.getElementById('search-clear');
        if (clearBtn) {
            clearBtn.style.display = this.searchTerm ? 'flex' : 'none';
        }
    }
    
    debounceSearch() {
        clearTimeout(this.searchDebounce);
        this.searchDebounce = setTimeout(() => {
            this.updateDemosGrid();
            this.updateURL();
        }, 300);
    }
    
    updateDemosGrid() {
        const grid = document.getElementById('demos-grid');
        const noResults = document.getElementById('no-results');
        
        if (!grid || !noResults) return;
        
        const filteredDemos = this.getFilteredDemos();
        
        if (filteredDemos.length === 0) {
            grid.innerHTML = '';
            noResults.style.display = 'block';
        } else {
            grid.innerHTML = filteredDemos.map(demo => this.renderDemoCard(demo)).join('');
            noResults.style.display = 'none';
            
            // Réappliquer les événements et animations
            this.bindDemoCardEvents();
            this.bindHoverEffects();
            
            // Animer l'apparition des cartes
            const cards = grid.querySelectorAll('.demo-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 50);
            });
        }
    }
    
    selectCategory(categoryId) {
        this.selectedCategory = categoryId;
        
        // Mettre à jour les boutons
        const filters = document.querySelectorAll('.category-filter');
        filters.forEach(filter => {
            const isActive = filter.dataset.category === categoryId;
            filter.classList.toggle('active', isActive);
        });
        
        // Mettre à jour l'affichage
        this.updateDemosGrid();
        this.updateURL();
    }
    
    clearSearch() {
        this.searchTerm = '';
        const searchInput = document.getElementById('demos-search');
        if (searchInput) {
            searchInput.value = '';
        }
        this.updateSearchClear();
        this.updateDemosGrid();
        this.updateURL();
    }
    
    clearFilters() {
        this.searchTerm = '';
        this.selectedCategory = 'all';
        
        const searchInput = document.getElementById('demos-search');
        if (searchInput) {
            searchInput.value = '';
        }
        
        this.updateSearchClear();
        this.selectCategory('all');
    }
    
    updateURL() {
        const params = new URLSearchParams();
        
        if (this.searchTerm) {
            params.set('search', this.searchTerm);
        }
        
        if (this.selectedCategory && this.selectedCategory !== 'all') {
            params.set('category', this.selectedCategory);
        }
        
        const newURL = params.toString() 
            ? `${window.location.pathname}?${params.toString()}`
            : window.location.pathname;
            
        window.history.replaceState({}, '', newURL);
    }
    
    bindDemoCardEvents() {
        const container = document.querySelector('.demos-page');
        if (!container) return;
        
        // Boutons de démarrage
        const startButtons = container.querySelectorAll('.demo-start-btn');
        startButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const demoId = btn.dataset.demo;
                this.handleDemoAccess(demoId);
            });
        });
        
        // Boutons d'info
        const infoButtons = container.querySelectorAll('.demo-info-btn');
        infoButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const demoId = btn.dataset.demo;
                this.showDemoDetails(demoId);
            });
        });
    }
    
    bindHoverEffects() {
        const container = document.querySelector('.demos-page');
        if (!container) return;
        
        const cards = container.querySelectorAll('.demo-card:not(.disabled)');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover');
            });
        });
    }
    
    initializeAnimations() {
        const container = document.querySelector('.demos-page');
        if (!container) return;
        
        // Observer pour les animations au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observer les éléments avec animation
        const animatedElements = container.querySelectorAll('.fade-in-up');
        animatedElements.forEach(el => observer.observe(el));
        
        // Animation des stats
        const stats = container.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    initializeFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        const categoryParam = urlParams.get('category');
        
        if (searchParam) {
            this.searchTerm = searchParam;
            const searchInput = document.getElementById('demos-search');
            if (searchInput) {
                searchInput.value = searchParam;
            }
        }
        
        if (categoryParam && this.categories.find(c => c.id === categoryParam)) {
            this.selectCategory(categoryParam);
        }
        
        // Mettre à jour l'affichage
        this.updateDemosGrid();
        this.updateSearchClear();
    }
    
    handleDemoAccess(demoId) {
        // Vérifier l'accès client
        if (window.OweoClientAccess && !window.OweoClientAccess.hasAccess()) {
            window.OweoClientAccess.showAuthModal(demoId);
        } else {
            this.navigateTo(demoId);
        }
        
        // Analytics
        if (window.oweoAnalytics) {
            // Retrouver la démo pour avoir son titre
            const demoEntry = Object.entries(this.demosConfig).find(([key]) => {
                const convertedId = key.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
                return convertedId === demoId;
            });
            
            window.oweoAnalytics.track('demo_accessed', {
                demo_id: demoId,
                demo_title: demoEntry ? demoEntry[1].title : demoId
            });
        }
    }
    
    showDemoDetails(demoId) {
        // Retrouver la démo en utilisant la même logique de conversion
        const demoEntry = Object.entries(this.demosConfig).find(([key, demo]) => {
            const convertedId = key.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
            return convertedId === demoId;
        });
        
        if (!demoEntry) return;
        
        const [key, demoData] = demoEntry;
        
        if (window.modalSystem) {
            const modal = window.modalSystem.create({
                title: demoData.title,
                content: this.getDemoDetailsContent(demoData),
                size: 'md'
            });
            
            window.modalSystem.addActions(modal.id, [
                {
                    id: 'start',
                    label: 'Démarrer la démo',
                    class: 'btn-primary',
                    icon: 'fas fa-play',
                    handler: () => {
                        window.modalSystem.close(modal.id);
                        this.handleDemoAccess(demoId);
                        return false;
                    }
                },
                {
                    id: 'close',
                    label: 'Fermer',
                    class: 'btn-outline',
                    handler: () => true
                }
            ]);
            
            window.modalSystem.show(modal.id);
        }
    }
    
    getDemoDetailsContent(demoData) {
        return `
            <div class="demo-details">
                <div class="demo-overview">
                    <p>${demoData.description}</p>
                </div>
                
                <div class="demo-sections">
                    <div class="details-section">
                        <h4><i class="fas fa-list"></i> Fonctionnalités</h4>
                        <ul>
                            ${(demoData.features || []).map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="details-section">
                        <h4><i class="fas fa-clock"></i> Durée estimée</h4>
                        <p>${demoData.estimatedDuration || '15-20 minutes'}</p>
                    </div>
                    
                    <div class="details-section">
                        <h4><i class="fas fa-info-circle"></i> Prérequis</h4>
                        <p>${demoData.requiresAuth ? 
                            'Cette démonstration nécessite un accès client. Utilisez le code <strong>DEMO-CLIENT</strong> ou contactez-nous pour obtenir un accès personnalisé.' :
                            'Aucun prérequis, démonstration accessible librement.'
                        }</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    showAccessInfo() {
        if (window.modalSystem) {
            const modal = window.modalSystem.create({
                title: 'Accès aux démonstrations',
                content: `
                    <div class="access-info-content">
                        <p>Nos démonstrations interactives vous permettent de tester nos solutions en conditions réelles.</p>
                        
                        <h4><i class="fas fa-lock"></i> Démonstrations avec accès</h4>
                        <p>Certaines démos nécessitent une authentification pour protéger les données sensibles et offrir une expérience personnalisée.</p>
                        
                        <div class="access-code-box">
                            <p><strong>Code d'accès de test :</strong></p>
                            <code>DEMO-CLIENT</code>
                        </div>
                        
                        <h4><i class="fas fa-user-tie"></i> Accès personnalisé</h4>
                        <p>Pour obtenir un accès personnalisé avec vos propres données de test, contactez notre équipe commerciale.</p>
                    </div>
                `,
                size: 'md'
            });
            
            window.modalSystem.addActions(modal.id, [
                {
                    id: 'contact',
                    label: 'Demander un accès',
                    class: 'btn-primary',
                    icon: 'fas fa-envelope',
                    handler: () => {
                        window.modalSystem.close(modal.id);
                        this.navigateTo('contact');
                        return false;
                    }
                },
                {
                    id: 'close',
                    label: 'Fermer',
                    class: 'btn-outline',
                    handler: () => true
                }
            ]);
            
            window.modalSystem.show(modal.id);
        }
    }
    
    scheduleDemo() {
        if (window.Calendly) {
            Calendly.initPopupWidget({
                url: window.AppConfig?.calendlyUrl || 'https://calendly.com/nicolas-dubain/30min',
                prefill: {
                    name: '',
                    email: '',
                    customAnswers: {
                        a1: 'Démonstration personnalisée'
                    }
                }
            });
        } else {
            this.navigateTo('contact');
        }
    }
    
    contactExpert() {
        this.navigateTo('contact');
    }
    
    // Méthode pour détruire la page
    destroy() {
        // Nettoyer les timers
        if (this.searchDebounce) {
            clearTimeout(this.searchDebounce);
        }
        
        // Appeler la méthode parent
        super.destroy();
    }
}

// Enregistrer la page globalement si nécessaire
window.DemosPage = DemosPage;