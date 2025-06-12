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
    }
    
    getTemplate() {
        return `
            <div class="page-container demos-header">
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
                <section class="demos-filters">
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
                                <button class="btn btn-outline btn-sm" onclick="demosPageInstance.showAccessInfo()">
                                    <i class="fas fa-info-circle"></i>
                                    Plus d'infos
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Demos Grid -->
                <section class="demos-grid-section">
                    <div class="container">
                        <div class="demos-grid" id="demos-grid">
                            ${this.renderDemosGrid()}
                        </div>
                        
                        <div class="no-results" id="no-results" style="display: none;">
                            <div class="no-results-content">
                                <i class="fas fa-search-minus"></i>
                                <h3>Aucune démo trouvée</h3>
                                <p>Essayez de modifier vos critères de recherche ou explorez toutes les catégories.</p>
                                <button class="btn btn-primary" onclick="demosPageInstance.clearFilters()">
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
                            ${this.renderComingSoonDemos()}
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
                <div class="demo-card-header">
                    <div class="demo-icon">
                        <i class="${demo.icon || 'fas fa-cog'}"></i>
                    </div>
                    <div class="demo-status">
                        ${requiresAuth ? '<i class="fas fa-lock" title="Accès client requis"></i>' : ''}
                        ${!isAvailable ? '<i class="fas fa-clock" title="Bientôt disponible"></i>' : ''}
                    </div>
                </div>
                
                <div class="demo-card-content">
                    <h3 class="demo-title">${demo.title}</h3>
                    <p class="demo-description">${demo.description}</p>
                    
                    <div class="demo-features">
                        <h4>Fonctionnalités :</h4>
                        <ul class="features-list">
                            ${demo.features.map(feature => `
                                <li><i class="fas fa-check"></i> ${feature}</li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div class="demo-meta">
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${demo.estimatedDuration}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-layer-group"></i>
                            <span>${this.getDemoCategory(demo.id)}</span>
                        </div>
                    </div>
                </div>
                
                <div class="demo-card-actions">
                    ${isAvailable ? `
                        <button class="btn btn-primary btn-block client-demo-link" data-demo="${demo.id}">
                            <i class="fas fa-play"></i>
                            Lancer la démonstration
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="demosPageInstance.showDemoDetails('${demo.id}')">
                            <i class="fas fa-info-circle"></i>
                            Plus de détails
                        </button>
                    ` : `
                        <button class="btn btn-outline btn-block" disabled>
                            <i class="fas fa-clock"></i>
                            ${demo.comingSoon ? 'Bientôt disponible' : 'En développement'}
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="demosPageInstance.notifyWhenReady('${demo.id}')">
                            <i class="fas fa-bell"></i>
                            Me notifier
                        </button>
                    `}
                </div>
            </div>
        `;
    }
    
    renderComingSoonDemos() {
        // Démos à venir (exemple)
        const comingSoon = [
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
            }
        ];
        
        return comingSoon.map(demo => `
            <div class="coming-soon-card fade-in-up">
                <div class="card-icon">
                    <i class="${demo.icon}"></i>
                </div>
                <div class="card-content">
                    <h4>${demo.title}</h4>
                    <p>${demo.description}</p>
                    <div class="release-date">
                        <i class="fas fa-calendar"></i>
                        Prévu ${demo.estimatedRelease}
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-outline btn-sm" onclick="demosPageInstance.notifyWhenReady('${demo.id}')">
                        <i class="fas fa-bell"></i>
                        Me prévenir
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    getFilteredDemos() {
        let demos = Object.entries(this.demosConfig).map(([key, demo]) => ({
            id: key.replace('Demo', '-demo'),
            ...demo
        }));
        
        // Filtrer par catégorie
        if (this.selectedCategory !== 'all') {
            demos = demos.filter(demo => 
                this.getDemoCategory(demo.id).toLowerCase().includes(this.selectedCategory)
            );
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
            'chiffrage-demo': 'Devis',
            'dstv-demo': 'Production',
            'production-demo': 'Production',
            'stock-demo': 'Logistique',
            'planning-demo': 'Gestion'
        };
        
        return categoryMap[demoId] || 'Général';
    }
    
    getAvailableDemosCount() {
        return Object.values(this.demosConfig).filter(demo => demo.enabled).length;
    }
    
    bindEvents() {
        super.bindEvents();
        
        // Navigation
        this.addDelegatedHandler('[data-page]', 'click', (e) => {
            e.preventDefault();
            const page = e.target.closest('[data-page]').dataset.page;
            this.navigateTo(page);
        });
        
        // Liens vers les démos
        this.addDelegatedHandler('.client-demo-link', 'click', (e) => {
            e.preventDefault();
            const demoId = e.target.closest('.client-demo-link').dataset.demo;
            this.handleDemoAccess(demoId);
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
            searchClear.addEventListener('click', () => {
                this.clearSearch();
            });
        }
        
        // Filtres de catégorie
        this.addDelegatedHandler('.category-filter', 'click', (e) => {
            const category = e.target.closest('.category-filter').dataset.category;
            this.selectCategory(category);
        });
        
        // Actions CTA
        const scheduleDemoBtn = document.getElementById('schedule-demo-btn');
        if (scheduleDemoBtn) {
            scheduleDemoBtn.addEventListener('click', () => this.scheduleDemo());
        }
        
        const contactExpertBtn = document.getElementById('contact-expert-btn');
        if (contactExpertBtn) {
            contactExpertBtn.addEventListener('click', () => this.contactExpert());
        }
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
    
    updateDemosGrid() {
        const grid = document.getElementById('demos-grid');
        const noResults = document.getElementById('no-results');
        
        if (!grid || !noResults) return;
        
        const filteredDemos = this.getFilteredDemos();
        
        if (filteredDemos.length === 0) {
            grid.style.display = 'none';
            noResults.style.display = 'block';
        } else {
            grid.innerHTML = this.renderDemosGrid();
            grid.style.display = 'grid';
            noResults.style.display = 'none';
            
            // Rebind events for new elements
            this.bindDemoEvents();
        }
    }
    
    bindDemoEvents() {
        // Rebind events pour les nouveaux éléments
        const demoLinks = document.querySelectorAll('.client-demo-link');
        demoLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const demoId = e.target.closest('.client-demo-link').dataset.demo;
                this.handleDemoAccess(demoId);
            });
        });
    }
    
    handleDemoAccess(demoId) {
        // Vérifier l'accès client
        if (window.OweoClientAccess && !window.OweoClientAccess.hasAccess()) {
            window.OweoClientAccess.showAuthModal(demoId);
        } else {
            this.navigateTo(demoId);
        }
        
        // Analytics
        if (window.AppConfig?.analytics?.enabled && typeof gtag !== 'undefined') {
            gtag('event', 'demo_clicked', {
                event_category: 'demos_page',
                event_label: demoId,
                value: 1
            });
        }
    }
    
    showDemoDetails(demoId) {
        const demo = Object.entries(this.demosConfig).find(([key]) => 
            key.replace('Demo', '-demo') === demoId
        );
        
        if (!demo) return;
        
        const [key, demoData] = demo;
        
        if (window.modalSystem) {
            const modal = window.modalSystem.create({
                title: demoData.title,
                content: `
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
                `,
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
    
    showAccessInfo() {
        if (window.modalSystem) {
            const contactInfo = window.CompanyInfo || { contact: { email: 'contact@oweo-consulting.fr', phoneFormatted: '06 86 76 81 31' } };
            
            window.modalSystem.alert({
                title: 'Accès aux Démonstrations',
                message: `
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
                type: 'info'
            });
        }
    }
    
    notifyWhenReady(demoId) {
        console.log(`🔔 Notification demandée pour ${demoId}`);
        
        if (window.notifications) {
            window.notifications.success('Nous vous préviendrons dès que cette démo sera disponible !');
        }
        
        // Ici vous pourriez intégrer un système de notification par email
    }
    
    scheduleDemo() {
        // Utiliser la même logique que dans home.js
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
    }
    
    contactExpert() {
        const contactInfo = window.CompanyInfo || { contact: { email: 'contact@oweo-consulting.fr' } };
        const subject = encodeURIComponent('Demande d\'expertise - Démonstrations Oweo');
        const body = encodeURIComponent('Bonjour,\n\nJe souhaiterais échanger avec un expert concernant vos solutions ERP.\n\nCordialement,');
        
        window.location.href = `mailto:${contactInfo.contact.email}?subject=${subject}&body=${body}`;
    }
    
    navigateTo(page) {
        if (window.app && window.app.router) {
            window.app.router.navigate(page);
        }
    }
    
    onMount() {
        super.onMount();
        
        // Exposer l'instance pour les événements onclick
        window.demosPageInstance = this;
        
        // Initialiser la recherche si il y a des paramètres d'URL
        this.initializeFromURL();
    }
    
    initializeFromURL() {
        // Récupérer les paramètres de recherche depuis l'URL si nécessaire
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
    
    destroy() {
        // Nettoyer l'instance globale
        if (window.demosPageInstance === this) {
            delete window.demosPageInstance;
        }
        
        // Nettoyer les timeouts
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        
        super.destroy();
    }
}

// Exposer la classe
window.DemosPage = DemosPage;