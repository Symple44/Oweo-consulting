// ========================================
// js/pages/home.js - Page d'accueil corrigée
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
                                    avec nos solutions ERP innovantes
                                </h1>
                                <p class="hero-description fade-in-up">
                                    Expert en digitalisation pour la charpente métallique, 
                                    nous vous accompagnons dans votre transformation digitale 
                                    avec des outils sur mesure et performants.
                                </p>
                                <div class="hero-actions fade-in-up">
                                    <button class="btn btn-primary btn-lg" data-action="services">
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
                        
                        <div class="features-grid-2x2">
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
                                <button class="btn btn-primary btn-lg" id="schedule-meeting-btn">
                                    <i class="fas fa-calendar"></i>
                                    Planifier un entretien
                                </button>
                                <button class="btn btn-outline btn-lg" id="download-brochure-btn">
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
        
        // Navigation vers les pages (en évitant les recharges)
        this.handlePageNavigation();
        
        // Liens vers les démos
        this.handleDemoLinks();
        
        // Actions spécifiques
        this.handleSpecificActions();
    }
    
    handlePageNavigation() {
        const pageLinks = document.querySelectorAll('[data-action]');
        pageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const action = link.dataset.action;
                
                if (action === 'services') {
                    this.navigateTo('services');
                }
            });
        });
    }
    
    handleDemoLinks() {
        const demoLinks = document.querySelectorAll('.client-demo-link');
        demoLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const demoId = link.dataset.demo;
                this.handleDemoAccess(demoId);
            });
        });
        
        // Bouton démo du hero
        const heroDemoBtn = document.getElementById('hero-demo-btn');
        if (heroDemoBtn) {
            heroDemoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showDemoSearch();
            });
        }
    }
    
    handleSpecificActions() {
        // Bouton planifier entretien -> Calendly
        const scheduleMeetingBtn = document.getElementById('schedule-meeting-btn');
        if (scheduleMeetingBtn) {
            scheduleMeetingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openCalendly();
            });
        }
        
        // Bouton télécharger brochure
        const downloadBrochureBtn = document.getElementById('download-brochure-btn');
        if (downloadBrochureBtn) {
            downloadBrochureBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.downloadBrochure();
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
    
    openCalendly() {
        // Configuration Calendly depuis app-config
        const config = window.AppConfig || {};
        const calendlyUrl = config.calendlyUrl || 'https://calendly.com/nicolas-dubain/30min';
        
        // Vérifier si le widget Calendly est disponible
        if (typeof window.Calendly !== 'undefined') {
            // Utiliser le widget popup officiel
            window.Calendly.initPopupWidget({
                url: calendlyUrl,
                text: 'Planifier un entretien',
                color: '#00d4ff',
                textColor: '#ffffff',
                branding: false
            });
        } else {
            // Fallback : ouvrir dans une nouvelle fenêtre
            console.warn('Widget Calendly non disponible, fallback vers nouvelle fenêtre');
            window.open(calendlyUrl, '_blank', 'width=800,height=700,scrollbars=yes,resizable=yes');
        }
        
        // Tracking optionnel
        if (typeof gtag !== 'undefined') {
            gtag('event', 'calendly_opened', {
                event_category: 'engagement',
                event_label: 'home_page'
            });
        }
        
        // Notification de succès
        if (window.app && window.app.showNotification) {
            window.app.showNotification('Ouverture de la planification de rendez-vous', 'info');
        }
    }
    
    downloadBrochure() {
        // Configuration brochure depuis app-config
        const config = window.AppConfig || {};
        const brochureUrl = config.brochureUrl || '/assets/brochures/oweo-solutions-erp.pdf';
        
        // Créer un lien de téléchargement
        const link = document.createElement('a');
        link.href = brochureUrl;
        link.download = 'Oweo-Solutions-ERP-Metallique.pdf';
        link.target = '_blank';
        
        // Déclencher le téléchargement
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Notification de succès
        if (window.app && window.app.showNotification) {
            window.app.showNotification('Téléchargement de la brochure démarré', 'success');
        }
        
        // Tracking optionnel
        if (typeof gtag !== 'undefined') {
            gtag('event', 'brochure_downloaded', {
                event_category: 'engagement',
                event_label: 'home_page'
            });
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
        
        // Animation de survol pour toute la zone de texte hero avec icônes métalliques
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            let animationVariant = 0; // Pour alterner entre différents effets
            
            heroText.addEventListener('mouseenter', () => {
                // Retirer les classes précédentes
                heroText.classList.remove('hover-effect', 'hover-particles', 'metal-theme', 'multi-icons', 'unicode-metal', 'rotating-icons', 'metal-rain');
                
                // Ajouter l'effet de base
                heroText.classList.add('hover-effect');
                
                // Alterner entre différents styles d'animation
                switch(animationVariant % 4) {
                    case 0:
                        // Animation basique avec icônes métalliques
                        heroText.classList.add('metal-theme');
                        break;
                    case 1:
                        // Icônes multiples avec délais
                        heroText.classList.add('multi-icons');
                        break;
                    case 2:
                        // Icônes avec rotation
                        heroText.classList.add('rotating-icons');
                        break;
                    case 3:
                        // Pluie d'icônes métalliques
                        heroText.classList.add('hover-particles', 'metal-rain');
                        break;
                }
                
                animationVariant++;
            });
            
            heroText.addEventListener('mouseleave', () => {
                // Retirer toutes les classes d'animation
                heroText.classList.remove('hover-effect', 'hover-particles', 'metal-theme', 'multi-icons', 'unicode-metal', 'rotating-icons', 'metal-rain');
            });
            
            // Effet tactile pour mobile avec animation aléatoire
            heroText.addEventListener('touchstart', () => {
                const randomVariant = Math.floor(Math.random() * 4);
                
                heroText.classList.remove('hover-effect', 'hover-particles', 'metal-theme', 'multi-icons', 'unicode-metal', 'rotating-icons', 'metal-rain');
                heroText.classList.add('hover-effect');
                
                switch(randomVariant) {
                    case 0:
                        heroText.classList.add('metal-theme');
                        break;
                    case 1:
                        heroText.classList.add('multi-icons');
                        break;
                    case 2:
                        heroText.classList.add('rotating-icons');
                        break;
                    case 3:
                        heroText.classList.add('hover-particles', 'metal-rain');
                        break;
                }
                
                // Retirer l'effet après 3 secondes sur mobile
                setTimeout(() => {
                    heroText.classList.remove('hover-effect', 'hover-particles', 'metal-theme', 'multi-icons', 'unicode-metal', 'rotating-icons', 'metal-rain');
                }, 3000);
            });
        }
        
        // Animation des icônes en réaction au survol du texte
        const heroVisual = document.querySelector('.hero-visual');
        if (heroText && heroVisual) {
            heroText.addEventListener('mouseenter', () => {
                heroVisual.classList.add('text-hovered');
            });
            
            heroText.addEventListener('mouseleave', () => {
                heroVisual.classList.remove('text-hovered');
            });
        }
        
        // Effet de démonstration au chargement de la page (une seule fois)
        setTimeout(() => {
            if (heroText && !heroText.classList.contains('demo-shown')) {
                heroText.classList.add('hover-effect', 'unicode-metal', 'demo-shown');
                setTimeout(() => {
                    heroText.classList.remove('hover-effect', 'unicode-metal');
                }, 4000);
            }
        }, 2000);
    }
    
    // Prévenir les recharges de page accidentelles
    mount() {
        super.mount();
        
        // Empêcher les soumissions de formulaires accidentelles
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
            });
        });
        
        // Empêcher les liens href="#" de recharger
        const hashLinks = document.querySelectorAll('a[href="#"], a[href=""]');
        hashLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
            });
        });
    }
}

// Exposer la classe
window.HomePage = HomePage;