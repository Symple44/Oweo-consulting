// ========================================
// js/pages/home.js - Page d'accueil complète
// ========================================

class HomePage extends BasePage {
    constructor() {
        super({
            id: 'home',
            title: 'Accueil',
            description: 'Transformez votre industrie métallique avec nos solutions ERP innovantes'
        });
    }
    
    getTemplate() {
        return `
            <div class="page-container home-page">
                <!-- Hero Section -->
                <section class="hero-section">
                    <div class="container">
                        <div class="hero-content">
                            <div class="hero-text">
                                <h1 class="hero-title fade-in-up">
                                    Transformez votre <span class="text-gradient">industrie métallique</span> 
                                    avec nos solutions ERP
                                </h1>
                                <p class="hero-description fade-in-up">
                                    Expert en digitalisation pour la charpente métallique, 
                                    nous vous accompagnons dans votre transformation digitale 
                                    avec des outils sur mesure et performants.
                                </p>
                                <div class="hero-actions fade-in-up">
                                    <button class="btn btn-primary btn-lg" data-page="services">
                                        <i class="fas fa-rocket"></i>
                                        Découvrir nos services
                                    </button>
                                    <button class="btn btn-outline btn-lg" id="hero-demo-btn">
                                        <i class="fas fa-play"></i>
                                        Voir les démos
                                    </button>
                                </div>
                            </div>
                            <div class="hero-visual fade-in-up">
                                <div class="hero-graphic">
                                    <div class="graphic-element element-1">
                                        <i class="fas fa-industry"></i>
                                    </div>
                                    <div class="graphic-element element-2">
                                        <i class="fas fa-cogs"></i>
                                    </div>
                                    <div class="graphic-element element-3">
                                        <i class="fas fa-chart-line"></i>
                                    </div>
                                    <div class="graphic-element element-4">
                                        <i class="fas fa-hammer"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Features Section -->
                <section class="features-section">
                    <div class="container">
                        <div class="section-header">
                            <h2 class="section-title fade-in-up">Pourquoi choisir Oweo ?</h2>
                            <p class="section-description fade-in-up">
                                Une expertise métier unique combinée à une technologie de pointe
                            </p>
                        </div>
                        
                        <div class="features-grid">
                            <div class="feature-card fade-in-up">
                                <div class="feature-icon">
                                    <i class="fas fa-bolt"></i>
                                </div>
                                <h3>Performance</h3>
                                <p>Des outils optimisés pour la productivité maximale de vos équipes</p>
                            </div>
                            
                            <div class="feature-card fade-in-up">
                                <div class="feature-icon">
                                    <i class="fas fa-shield-alt"></i>
                                </div>
                                <h3>Fiabilité</h3>
                                <p>Solutions robustes et sécurisées pour vos données critiques</p>
                            </div>
                            
                            <div class="feature-card fade-in-up">
                                <div class="feature-icon">
                                    <i class="fas fa-users"></i>
                                </div>
                                <h3>Accompagnement</h3>
                                <p>Support expert et formation personnalisée pour vos équipes</p>
                            </div>
                            
                            <div class="feature-card fade-in-up">
                                <div class="feature-icon">
                                    <i class="fas fa-sync-alt"></i>
                                </div>
                                <h3>Évolutivité</h3>
                                <p>Solutions qui grandissent avec votre entreprise</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Demos Preview Section -->
                <section class="demos-section">
                    <div class="container">
                        <div class="section-header">
                            <h2 class="section-title fade-in-up">Nos Solutions en Action</h2>
                            <p class="section-description fade-in-up">
                                Découvrez nos outils métier avec des démonstrations interactives
                            </p>
                        </div>
                        
                        <div class="demos-grid">
                            <div class="demo-preview-card fade-in-up">
                                <div class="demo-icon">
                                    <i class="fas fa-calculator"></i>
                                </div>
                                <div class="demo-content">
                                    <h3 class="demo-title">Outil de Chiffrage</h3>
                                    <p class="demo-description">
                                        Automatisez vos devis avec notre module intelligent de chiffrage
                                    </p>
                                    <div class="demo-features">
                                        <span class="demo-tag">Automatisation</span>
                                        <span class="demo-tag">Précision</span>
                                        <span class="demo-tag">Rapidité</span>
                                    </div>
                                </div>
                                <div class="demo-actions">
                                    <button class="btn btn-primary client-demo-link" data-demo="chiffrage-demo">
                                        <i class="fas fa-play"></i>
                                        Voir la démo
                                    </button>
                                </div>
                            </div>
                            
                            <div class="demo-preview-card fade-in-up">
                                <div class="demo-icon">
                                    <i class="fas fa-file-code"></i>
                                </div>
                                <div class="demo-content">
                                    <h3 class="demo-title">Interface DSTV</h3>
                                    <p class="demo-description">
                                        Connectez vos machines CNC avec nos interfaces standardisées
                                    </p>
                                    <div class="demo-features">
                                        <span class="demo-tag">DSTV</span>
                                        <span class="demo-tag">CNC</span>
                                        <span class="demo-tag">Automatisation</span>
                                    </div>
                                </div>
                                <div class="demo-actions">
                                    <button class="btn btn-primary client-demo-link" data-demo="dstv-demo">
                                        <i class="fas fa-play"></i>
                                        Voir la démo
                                    </button>
                                </div>
                            </div>
                            
                            <div class="demo-preview-card fade-in-up">
                                <div class="demo-icon">
                                    <i class="fas fa-industry"></i>
                                </div>
                                <div class="demo-content">
                                    <h3 class="demo-title">Gestion Production</h3>
                                    <p class="demo-description">
                                        Pilotez votre atelier avec des outils de suivi en temps réel
                                    </p>
                                    <div class="demo-features">
                                        <span class="demo-tag">Temps réel</span>
                                        <span class="demo-tag">Suivi</span>
                                        <span class="demo-tag">Analytics</span>
                                    </div>
                                </div>
                                <div class="demo-actions">
                                    <button class="btn btn-outline" disabled>
                                        <i class="fas fa-clock"></i>
                                        Bientôt disponible
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Contact CTA Section -->
                <section class="contact-cta">
                    <div class="container">
                        <div class="contact-content">
                            <h2 class="contact-title fade-in-up">
                                Prêt à transformer votre entreprise ?
                            </h2>
                            <p class="fade-in-up">
                                Contactez-nous pour un diagnostic gratuit et découvrez 
                                comment nos solutions peuvent révolutionner votre activité.
                            </p>
                            <div class="contact-actions fade-in-up">
                                <button class="btn btn-primary btn-lg" data-page="services">
                                    <i class="fas fa-calendar"></i>
                                    Planifier un entretien
                                </button>
                                <button class="btn btn-outline btn-lg" data-page="services">
                                    <i class="fas fa-download"></i>
                                    Télécharger la brochure
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
    
    bindEvents() {
        super.bindEvents();
        
        // Navigation links
        const navLinks = document.querySelectorAll('[data-page]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateTo(page);
            });
        });
        
        // Liens vers les démos
        const demoLinks = document.querySelectorAll('.client-demo-link');
        demoLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const demoId = link.dataset.demo;
                this.handleDemoAccess(demoId);
            });
        });
        
        // Bouton démo du hero
        const heroDemoBtn = document.getElementById('hero-demo-btn');
        if (heroDemoBtn) {
            heroDemoBtn.addEventListener('click', () => {
                this.showDemoSearch();
            });
        }
    }
    
    navigateTo(page) {
        if (window.app && window.app.router) {
            window.app.router.navigate(page);
        }
    }
    
    handleDemoAccess(demoId) {
        // Vérifier l'accès client
        if (window.OweoClientAccess && !window.OweoClientAccess.hasAccess()) {
            window.OweoClientAccess.showAuthModal(demoId);
        } else {
            this.navigateTo(demoId);
        }
    }
    
    showDemoSearch() {
        // Activer la recherche démo
        const demoSearch = window.app?.getComponent('demoSearch');
        if (demoSearch) {
            demoSearch.show();
        } else {
            // Fallback - naviguer vers la page démos
            this.navigateTo('demos');
        }
    }
    
    setupAnimations() {
        super.setupAnimations();
        
        // Animations spécifiques à la home
        const graphicElements = document.querySelectorAll('.graphic-element');
        graphicElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate');
            }, (index + 1) * 200);
        });
        
        // Animation du titre au survol
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.addEventListener('mouseenter', () => {
                heroTitle.classList.add('hover-effect');
            });
            
            heroTitle.addEventListener('mouseleave', () => {
                heroTitle.classList.remove('hover-effect');
            });
        }
    }
}

// Exposer la classe
window.HomePage = HomePage;