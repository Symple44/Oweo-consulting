// ========================================
// js/pages/home.js - Page d'accueil avec animations dynamiques
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
        
        // NOUVEAU SYSTÈME D'ICÔNES DYNAMIQUES
        this.setupDynamicHeroAnimation();
        
        // Animation des icônes en réaction au survol du texte (simplifiée)
        const heroVisual = document.querySelector('.hero-visual');
        const heroText = document.querySelector('.hero-text');
        
        if (heroText && heroVisual) {
            heroText.addEventListener('mouseenter', () => {
                heroVisual.classList.add('text-hovered');
            });
            
            heroText.addEventListener('mouseleave', () => {
                heroVisual.classList.remove('text-hovered');
            });
        }
    }
    
    /**
     * Nouveau système d'animation avec icônes dynamiques
     */
    setupDynamicHeroAnimation() {
        const heroText = document.querySelector('.hero-text');
        if (!heroText) return;
        
        // Configuration des icônes métalliques
        const metalIcons = [
            '⚙️', '🔧', '🔨', '⚒️', '🔩', '🏗️', 
            '🛠️', '⚡', '🔥', '💎', '🚀', '⭐'
        ];
        
        // Créer le container pour les icônes
        let iconsContainer = heroText.querySelector('.hero-icons-container');
        if (!iconsContainer) {
            iconsContainer = document.createElement('div');
            iconsContainer.className = 'hero-icons-container';
            heroText.appendChild(iconsContainer);
        }
        
        // Variables pour gérer les animations
        let isAnimating = false;
        let animationTimeout;
        let currentIcons = [];
        
        /**
         * Créer une icône animée
         */
        const createAnimatedIcon = (icon, animationClass, delay = 0) => {
            const iconElement = document.createElement('div');
            iconElement.className = `hero-dynamic-icon ${animationClass}`;
            iconElement.textContent = icon;
            iconElement.style.animationDelay = `${delay}ms`;
            
            iconsContainer.appendChild(iconElement);
            currentIcons.push(iconElement);
            
            // Supprimer l'icône après l'animation
            const animationDuration = this.getAnimationDuration(animationClass);
            setTimeout(() => {
                if (iconElement.parentNode) {
                    iconElement.parentNode.removeChild(iconElement);
                }
                const index = currentIcons.indexOf(iconElement);
                if (index > -1) {
                    currentIcons.splice(index, 1);
                }
            }, animationDuration + delay);
        };
        
        /**
         * Obtenir la durée d'animation en ms
         */
        this.getAnimationDuration = (animationClass) => {
            const durations = {
                'anim-1': 4000,
                'anim-2': 3500,
                'anim-3': 4200,
                'anim-4': 3800,
                'anim-5': 4500,
                'anim-6': 3200
            };
            return durations[animationClass] || 4000;
        };
        
        /**
         * Lancer une séquence d'animations
         */
        const startAnimationSequence = () => {
            if (isAnimating) return;
            
            isAnimating = true;
            
            // Nettoyer les icônes existantes
            currentIcons.forEach(icon => {
                if (icon.parentNode) {
                    icon.parentNode.removeChild(icon);
                }
            });
            currentIcons = [];
            
            // Sélectionner 6 icônes aléatoires
            const selectedIcons = [];
            for (let i = 0; i < 6; i++) {
                const randomIcon = metalIcons[Math.floor(Math.random() * metalIcons.length)];
                selectedIcons.push(randomIcon);
            }
            
            // Créer les 6 icônes avec leurs animations respectives
            selectedIcons.forEach((icon, index) => {
                const animationClass = `anim-${index + 1}`;
                const delay = index * 100; // Délai échelonné
                createAnimatedIcon(icon, animationClass, delay);
            });
            
            // Marquer la fin de l'animation
            setTimeout(() => {
                isAnimating = false;
            }, 5000); // Temps total maximum
        };
        
        /**
         * Gestionnaire de survol - ENTREE
         */
        const handleMouseEnter = () => {
            // Annuler tout timeout précédent
            if (animationTimeout) {
                clearTimeout(animationTimeout);
            }
            
            // Démarrer immédiatement si pas en cours
            if (!isAnimating) {
                startAnimationSequence();
            }
        };
        
        /**
         * Gestionnaire de survol - SORTIE
         */
        const handleMouseLeave = () => {
            // Laisser l'animation en cours se terminer naturellement
            // Pas d'arrêt brutal pour une meilleure expérience
        };
        
        /**
         * Gestionnaire tactile pour mobile
         */
        const handleTouchStart = () => {
            if (!isAnimating) {
                startAnimationSequence();
            }
        };
        
        // Attacher les événements
        heroText.addEventListener('mouseenter', handleMouseEnter);
        heroText.addEventListener('mouseleave', handleMouseLeave);
        heroText.addEventListener('touchstart', handleTouchStart);
        
        // Animation de démonstration au chargement (une fois)
        setTimeout(() => {
            if (!heroText.classList.contains('demo-shown')) {
                heroText.classList.add('demo-shown');
                startAnimationSequence();
            }
        }, 2000);
        
        // Stockage des références pour cleanup éventuel
        heroText._iconAnimationCleanup = () => {
            currentIcons.forEach(icon => {
                if (icon.parentNode) {
                    icon.parentNode.removeChild(icon);
                }
            });
            currentIcons = [];
            if (animationTimeout) {
                clearTimeout(animationTimeout);
            }
            heroText.removeEventListener('mouseenter', handleMouseEnter);
            heroText.removeEventListener('mouseleave', handleMouseLeave);
            heroText.removeEventListener('touchstart', handleTouchStart);
        };
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
    
    /**
     * Méthode de nettoyage lors du démontage de la page
     */
    unmount() {
        // Nettoyer les animations hero si elles existent
        const heroText = document.querySelector('.hero-text');
        if (heroText && heroText._iconAnimationCleanup) {
            heroText._iconAnimationCleanup();
        }
        
        // Appeler le unmount parent
        super.unmount();
    }
}

// Exposer la classe
window.HomePage = HomePage;