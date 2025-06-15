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
        
        // Configuration des démos depuis la config centralisée
        this.demosConfig = window.AppConfig?.demos || {};
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
                estimatedRelease: 'Q2 2024'
            },
            {
                id: 'mobile-app-demo',
                title: 'Application Mobile',
                description: 'Suivi terrain et saisie nomade',
                icon: 'fas fa-mobile-alt',
                estimatedRelease: 'Q3 2024'
            },
            {
                id: 'ai-assistant-demo',
                title: 'Assistant IA',
                description: 'Intelligence artificielle pour optimiser vos processus',
                icon: 'fas fa-robot',
                estimatedRelease: 'Q4 2024'
            }
        ];
    }
    
    getTemplate() {
        return `
            <div class="page-container demos-page">
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
                        <div class="notice-card">
                            <div class="notice-icon">
                                <i class="fas fa-user-lock"></i>
                            </div>
                            <div class="notice-content">
                                <h4>Accès Client Requis</h4>
                                <p>Ces démonstrations nécessitent un code d'accès client. 
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
                                    Planifier une démo
                                </button>
                                <button class="btn btn-outline btn-lg" id="contact-expert-btn">
                                    <i class="fas fa-user-tie"></i>
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
        const isAvailable = demo.enabled;
        const requiresAuth = demo.requiresAuth;
        
        return `
            <div class="demo-card fade-in-up ${!isAvailable ? 'disabled' : ''}" data-demo="${demo.id}">
                <div class="demo-header">
                    <div class="demo-icon">
                        <i class="${demo.icon || 'fas fa-cog'}"></i>
                    </div>
                    <div class="demo-meta">
                        <div class="demo-duration">${demo.estimatedDuration}</div>
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
                            ${demo.features.map(feature => `
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
                        <button class="btn btn-primary demo-launch-btn" data-demo="${demo.id}">
                            <i class="fas fa-play"></i>
                            Lancer la démonstration
                        </button>
                        <button class="btn btn-outline demo-details-btn" data-demo="${demo.id}">
                            <i class="fas fa-info-circle"></i>
                            Détails
                        </button>
                    ` : `
                        <button class="btn btn-outline" disabled>
                            <i class="fas fa-clock"></i>
                            ${demo.comingSoon ? 'Bientôt disponible' : 'En développement'}
                        </button>
                        <button class="btn btn-outline demo-notify-btn" data-demo="${demo.id}">
                            <i class="fas fa-bell"></i>
                            Me notifier
                        </button>
                    `}
                </div>
            </div>
        `;
    }
    
    renderComingSoonCard(demo) {
        return `
            <div class="coming-soon-card fade-in-up" data-demo-id="${demo.id}">
                <div class="coming-soon-icon">
                    <i class="${demo.icon}"></i>
                </div>
                <div class="coming-soon-content">
                    <h4>${demo.title}</h4>
                    <p>${demo.description}</p>
                    <div class="release-date">
                        <i class="fas fa-calendar"></i>
                        Prévu ${demo.estimatedRelease}
                    </div>
                </div>
                <button class="btn btn-outline btn-sm">
                    <i class="fas fa-bell"></i>
                    Me prévenir
                </button>
            </div>
        `;
    }
    
    bindEvents() {
        super.bindEvents();
        
        // Navigation - utiliser une délégation plus spécifique
        const breadcrumbLinks = document.querySelectorAll('.page-breadcrumb [data-page]');
        breadcrumbLinks.forEach(link => {
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
                demo.title.toLowerCase().includes(term) ||
                demo.description.toLowerCase().includes(term) ||
                demo.features.some(feature => feature.toLowerCase().includes(term))
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
        return Object.values(this.demosConfig).filter(demo => demo.enabled).length;
    }
    
    updateSearchClear() {
        const clearBtn = document.getElementById('search-clear');
        if (clearBtn) {
            clearBtn.style.display = this.searchTerm ? 'block' : 'none';
        }
    }
    
    debounceSearch() {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.updateDemosGrid();
        }, 300);
    }
    
    clearSearch() {
        this.searchTerm = '';
        const searchInput = document.getElementById('demos-search');
        if (searchInput) {
            searchInput.value = '';
        }
        this.updateSearchClear();
        this.updateDemosGrid();
    }
    
    selectCategory(category) {
        this.selectedCategory = category;
        
        // Mettre à jour l'UI
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-category="${category}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        this.updateDemosGrid();
    }
    
    clearFilters() {
        this.searchTerm = '';
        this.selectedCategory = 'all';
        
        // Reset UI
        const searchInput = document.getElementById('demos-search');
        if (searchInput) {
            searchInput.value = '';
        }
        
        this.selectCategory('all');
        this.updateSearchClear();
    }
    
    bindHoverEffects() {
        const demoCards = document.querySelectorAll('.demo-card:not(.disabled)');
        demoCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('disabled')) {
                    card.style.transform = 'translateY(-8px)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
    
    updateDemosGrid() {
        const grid = document.getElementById('demos-grid');
        const noResults = document.getElementById('no-results');
        
        if (!grid || !noResults) return;
        
        const filteredDemos = this.getFilteredDemos();
        
        if (filteredDemos.length === 0) {
            grid.innerHTML = '';
            grid.style.display = 'none';
            noResults.style.display = 'block';
        } else {
            grid.innerHTML = this.renderDemosGrid();
            grid.style.display = 'grid';
            noResults.style.display = 'none';
            
            // Re-bind events for new elements
            this.bindDemoCardEvents();
            this.bindHoverEffects();
        }
    }
    
    bindDemoCardEvents() {
        // Boutons de lancement
        const launchBtns = document.querySelectorAll('.demo-launch-btn');
        launchBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const demoId = btn.dataset.demo;
                this.handleDemoAccess(demoId);
            });
        });
        
        // Boutons de détails
        const detailsBtns = document.querySelectorAll('.demo-details-btn');
        detailsBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const demoId = btn.dataset.demo;
                this.showDemoDetails(demoId);
            });
        });
        
        // Boutons de notification
        const notifyBtns = document.querySelectorAll('.demo-notify-btn');
        notifyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const demoId = btn.dataset.demo;
                this.notifyWhenReady(demoId);
            });
        });
        
        // Boutons dans les cartes coming soon
        const comingSoonNotifyBtns = document.querySelectorAll('.coming-soon-card .btn');
        comingSoonNotifyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.coming-soon-card');
                const demoId = card.dataset.demoId;
                this.notifyWhenReady(demoId);
            });
        });
    }
    
    onMount() {
        super.onMount();
        
        // Animation des stats
        this.animateStats();
        
        // Initialiser depuis l'URL si nécessaire
        this.initializeFromURL();
    }
    
    animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.5
        });
        
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
                            ${demoData.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="details-section">
                        <h4><i class="fas fa-clock"></i> Durée estimée</h4>
                        <p>${demoData.estimatedDuration}</p>
                    </div>
                    
                    <div class="details-section">
                        <h4><i class="fas fa-info-circle"></i> Prérequis</h4>
                        <p>${demoData.requiresAuth ? 'Code d\'accès client requis' : 'Accès libre'}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    showAccessInfo() {
        if (window.modalSystem) {
            const contactInfo = window.CompanyInfo || { contact: { email: 'contact@oweo-consulting.fr', phoneFormatted: '06 86 76 81 31' } };
            
            const modal = window.modalSystem.create({
                title: 'Accès aux Démonstrations',
                content: `
                    <div class="access-info">
                        <h4>🔑 Comment accéder aux démos ?</h4>
                        <div class="access-methods">
                            <div class="method">
                                <h5>📱 Accès démo</h5>
                                <p>Utilisez le code <strong>DEMO-CLIENT</strong> pour tester toutes nos démonstrations.</p>
                            </div>
                            <div class="method">
                                <h5>🏢 Accès client</h5>
                                <p>Contactez-nous pour obtenir vos codes d'accès personnalisés :</p>
                                <p>📧 ${contactInfo.contact.email}<br>
                                   📞 ${contactInfo.contact.phoneFormatted}</p>
                            </div>
                        </div>
                    </div>
                `,
                size: 'sm'
            });
            
            window.modalSystem.addActions(modal.id, [
                {
                    id: 'ok',
                    label: 'Compris',
                    class: 'btn-primary',
                    handler: () => true
                }
            ]);
            
            window.modalSystem.show(modal.id);
        }
    }
    
    notifyWhenReady(demoId) {
        if (window.modalSystem) {
            const modal = window.modalSystem.create({
                title: 'Notification activée',
                content: `
                    <div class="notification-success">
                        <i class="fas fa-bell" style="font-size: 3rem; color: var(--success-color); margin-bottom: 1rem;"></i>
                        <p>Nous vous préviendrons dès que cette démonstration sera disponible !</p>
                        <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 1rem;">
                            Un email sera envoyé à l'adresse associée à votre compte client.
                        </p>
                    </div>
                `,
                size: 'sm'
            });
            
            window.modalSystem.addActions(modal.id, [
                {
                    id: 'ok',
                    label: 'OK',
                    class: 'btn-primary',
                    handler: () => true
                }
            ]);
            
            window.modalSystem.show(modal.id);
        }
        
        // Analytics
        if (window.oweoAnalytics) {
            window.oweoAnalytics.track('demo_notification_requested', {
                demo_id: demoId
            });
        }
    }
    
    scheduleDemo() {
        const config = window.AppConfig || {};
        const calendlyUrl = config.calendlyUrl || 'https://calendly.com/nicolas-dubain/30min';
        
        if (typeof window.Calendly !== 'undefined') {
            window.Calendly.initPopupWidget({
                url: calendlyUrl,
                text: 'Planifier une démonstration',
                color: '#00d4ff',
                textColor: '#ffffff',
                branding: false
            });
        } else {
            window.open(calendlyUrl, '_blank', 'width=800,height=700,scrollbars=yes,resizable=yes');
        }
        
        // Analytics
        if (window.oweoAnalytics) {
            window.oweoAnalytics.track('demo_scheduled_from_catalog');
        }
    }
    
    contactExpert() {
        const contactInfo = window.CompanyInfo || { contact: { email: 'contact@oweo-consulting.fr' } };
        const subject = encodeURIComponent('Demande d\'expertise - Démonstrations Oweo');
        const body = encodeURIComponent('Bonjour,\n\nJe souhaiterais échanger avec un expert concernant vos solutions ERP.\n\nCordialement,');
        
        window.location.href = `mailto:${contactInfo.contact.email}?subject=${subject}&body=${body}`;
        
        // Analytics
        if (window.oweoAnalytics) {
            window.oweoAnalytics.track('expert_contact_from_demos');
        }
    }
    
    navigateTo(page) {
        if (window.app && window.app.router) {
            window.app.router.navigate(page);
        }
    }
    
    destroy() {
        // Nettoyer les timeouts
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        
        super.destroy();
    }
}

// Exposer la classe
window.DemosPage = DemosPage;