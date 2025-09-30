// ========================================
// js/pages/home.js - Page d'accueil repositionnée sur l'accompagnement
// ========================================

class HomePage extends BasePage {
    constructor() {
        super({
            id: 'home',
            title: 'Accueil',
            description: 'Votre partenaire pour la transformation numérique de l\'industrie métallique'
        });
    }
    
    getTemplate() {
        return `
            <div class="home-page">
                <!-- Hero Section -->
                <section class="hero-section">
                    <div class="container">
                        <div class="hero-content">
                            <div class="hero-text">
                                <h1 class="hero-title fade-in-up">
                                    Votre partenaire pour la <span class="text-gradient">transformation numérique</span> 
                                    de l'industrie métallique
                                </h1>
                                <p class="hero-description fade-in-up">
                                    Spécialistes de la charpente métallique et de la métallurgie, 
                                    nous vous accompagnons dans votre digitalisation avec des solutions 
                                    adaptées à vos enjeux métier.
                                </p>
                                <div class="hero-actions fade-in-up">
                                    <button class="btn btn-primary btn-lg" data-action="contact">
                                        <i class="fas fa-handshake"></i>
                                        Parlons de votre projet
                                    </button>
                                    <button class="btn btn-outline btn-lg" data-action="services">
                                        <i class="fas fa-cogs"></i>
                                        Découvrir nos services
                                    </button>
                                </div>
                            </div>
                            <div class="hero-visual fade-in-up">
                                <div class="hero-graphic">
                                    <div class="graphic-element element-1">
                                        <i class="fas fa-industry"></i>
                                    </div>
                                    <div class="graphic-element element-2">
                                        <i class="fas fa-digital-tachograph"></i>
                                    </div>
                                    <div class="graphic-element element-3">
                                        <i class="fas fa-chart-line"></i>
                                    </div>
                                    <div class="graphic-element element-4">
                                        <i class="fas fa-handshake"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Expertise Section -->
                <section class="expertise-section">
                    <div class="container">
                        <div class="section-header">
                            <h2 class="section-title fade-in-up">Notre Expertise Métier</h2>
                            <p class="section-description fade-in-up">
                                Une connaissance approfondie de l'industrie métallique 
                                pour vous proposer des solutions vraiment adaptées
                            </p>
                        </div>
                        
                        <div class="expertise-grid">
                            <div class="expertise-card fade-in-up">
                                <div class="expertise-icon">
                                    <i class="fas fa-hammer"></i>
                                </div>
                                <h3>Charpente Métallique</h3>
                                <p>Digitalisation complète de vos processus : du devis à la livraison, 
                                nous connaissons vos défis quotidiens</p>
                                <ul class="expertise-points">
                                    <li>Chiffrage et métrés</li>
                                    <li>Gestion de production</li>
                                    <li>Interfaces machines CNC</li>
                                </ul>
                            </div>
                            
                            <div class="expertise-card fade-in-up">
                                <div class="expertise-icon">
                                    <i class="fas fa-cogs"></i>
                                </div>
                                <h3>Transformation Numérique</h3>
                                <p>Accompagnement complet dans votre évolution digitale, 
                                en respectant vos contraintes et votre culture d'entreprise</p>
                                <ul class="expertise-points">
                                    <li>Diagnostic et stratégie</li>
                                    <li>Conduite du changement</li>
                                    <li>Formation des équipes</li>
                                </ul>
                            </div>
                            
                            <div class="expertise-card fade-in-up">
                                <div class="expertise-icon">
                                    <i class="fas fa-code"></i>
                                </div>
                                <h3>Solutions Sur Mesure</h3>
                                <p>Développement d'outils spécifiques à votre métier, 
                                intégrés dans votre écosystème existant</p>
                                <ul class="expertise-points">
                                    <li>Développement spécifique</li>
                                    <li>Intégration système</li>
                                    <li>Support et maintenance</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Process Section -->
                <section class="process-section">
                    <div class="container">
                        <div class="section-header">
                            <h2 class="section-title fade-in-up">Notre Approche</h2>
                            <p class="section-description fade-in-up">
                                Une méthodologie éprouvée pour garantir le succès de votre transformation
                            </p>
                        </div>
                        
                        <div class="process-flow">
                            <div class="process-step fade-in-up">
                                <div class="step-icon">
                                    <span class="step-number">1</span>
                                    <i class="fas fa-search"></i>
                                </div>
                                <div class="step-content">
                                    <h3>Diagnostic</h3>
                                    <p>Analyse de vos processus actuels et identification des opportunités d'amélioration</p>
                                </div>
                            </div>
                            
                            <div class="process-step fade-in-up">
                                <div class="step-icon">
                                    <span class="step-number">2</span>
                                    <i class="fas fa-drafting-compass"></i>
                                </div>
                                <div class="step-content">
                                    <h3>Conception</h3>
                                    <p>Définition de la solution optimale adaptée à vos besoins et contraintes</p>
                                </div>
                            </div>
                            
                            <div class="process-step fade-in-up">
                                <div class="step-icon">
                                    <span class="step-number">3</span>
                                    <i class="fas fa-tools"></i>
                                </div>
                                <div class="step-content">
                                    <h3>Mise en œuvre</h3>
                                    <p>Développement, paramétrage et déploiement progressif de la solution</p>
                                </div>
                            </div>
                            
                            <div class="process-step fade-in-up">
                                <div class="step-icon">
                                    <span class="step-number">4</span>
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="step-content">
                                    <h3>Accompagnement</h3>
                                    <p>Formation, support et optimisation continue pour garantir l'adoption</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Trust Section -->
                <section class="trust-section">
                    <div class="container">
                        <div class="trust-content">
                            <div class="trust-text fade-in-up">
                                <h2>Pourquoi nous faire confiance ?</h2>
                                <div class="trust-points">
                                    <div class="trust-point">
                                        <div class="trust-icon">
                                            <i class="fas fa-award"></i>
                                        </div>
                                        <div class="trust-info">
                                            <h4>Expertise Reconnue</h4>
                                            <p>Plus de 10 ans d'expérience dans la métallurgie et l'industrie</p>
                                        </div>
                                    </div>
                                    
                                    <div class="trust-point">
                                        <div class="trust-icon">
                                            <i class="fas fa-users"></i>
                                        </div>
                                        <div class="trust-info">
                                            <h4>Proximité Client</h4>
                                            <p>Accompagnement personnalisé et réactif tout au long du projet</p>
                                        </div>
                                    </div>
                                    
                                    <div class="trust-point">
                                        <div class="trust-icon">
                                            <i class="fas fa-rocket"></i>
                                        </div>
                                        <div class="trust-info">
                                            <h4>Innovation Continue</h4>
                                            <p>Solutions modernes et évolutives pour rester compétitif</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="trust-stats fade-in-up">
                                <div class="stat-item">
                                    <div class="stat-number">10+</div>
                                    <div class="stat-label">Années d'expérience</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-number">50+</div>
                                    <div class="stat-label">Projets réalisés</div>
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
                                Prêt à démarrer votre transformation ?
                            </h2>
                            <p class="fade-in-up">
                                Échangeons sur vos enjeux et découvrons ensemble comment nous pouvons 
                                vous accompagner dans votre évolution numérique.
                            </p>
                            <div class="contact-actions fade-in-up">
                                <button class="btn btn-primary btn-lg" id="schedule-meeting-btn">
                                    <i class="fas fa-calendar"></i>
                                    Planifier un échange
                                </button>
                                <button class="btn btn-outline btn-lg" id="contact-direct-btn">
                                    <i class="fas fa-phone"></i>
                                    Nous contacter
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
        
        // Navigation vers les pages
        this.handlePageNavigation();
        
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
                
                switch(action) {
                    case 'services':
                        this.navigateTo('services');
                        break;
                    case 'contact':
                        this.navigateTo('contact');
                        break;
                    default:
                        logger.warn('Action non reconnue:', action);
                }
            });
        });
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
        
        // Bouton contact direct
        const contactDirectBtn = document.getElementById('contact-direct-btn');
        if (contactDirectBtn) {
            contactDirectBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleDirectContact();
            });
        }
    }
    
    navigateTo(page) {
        if (window.app && window.app.router) {
            window.app.router.navigate(page);
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
                text: 'Planifier un échange',
                color: '#00d4ff',
                textColor: '#ffffff',
                branding: false
            });
        } else {
            // Fallback : ouvrir dans une nouvelle fenêtre
            logger.warn('Widget Calendly non disponible, fallback vers nouvelle fenêtre');
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
    
    handleDirectContact() {
        // Récupérer les informations de contact depuis CompanyInfo
        const companyInfo = window.CompanyInfo || {};
        const phone = companyInfo.contact?.phone || '+33686768131';
        const email = companyInfo.contact?.email || 'contact@oweo-consulting.fr';
        
        // Créer un modal avec les options de contact
        if (window.modalSystem) {
            const modal = window.modalSystem.create({
                title: 'Nous contacter',
                content: this.getContactModalContent(companyInfo),
                size: 'md'
            });
            
            window.modalSystem.addActions(modal.id, [
                {
                    id: 'close',
                    label: 'Fermer',
                    class: 'btn-outline',
                    handler: () => true
                }
            ]);
            
            window.modalSystem.show(modal.id);
            
            // Ajouter les événements aux boutons de contact
            setTimeout(() => {
                const phoneBtn = document.querySelector('[data-contact="phone"]');
                const emailBtn = document.querySelector('[data-contact="email"]');
                
                if (phoneBtn) {
                    phoneBtn.addEventListener('click', () => {
                        window.location.href = `tel:${phone}`;
                        window.modalSystem.close(modal.id);
                    });
                }
                
                if (emailBtn) {
                    emailBtn.addEventListener('click', () => {
                        window.location.href = `mailto:${email}?subject=Demande d'information`;
                        window.modalSystem.close(modal.id);
                    });
                }
            }, 100);
        } else {
            // Fallback si pas de système de modal
            this.navigateTo('contact');
        }
    }
    
    getContactModalContent(companyInfo) {
        const phone = companyInfo.contact?.phoneFormatted || '06 86 76 81 31';
        const email = companyInfo.contact?.email || 'contact@oweo-consulting.fr';
        const address = companyInfo.address?.full || 'Nantes, France';
        const hours = companyInfo.businessHours?.days && companyInfo.businessHours?.hours 
            ? `${companyInfo.businessHours.days} ${companyInfo.businessHours.hours}` 
            : 'Lun-Ven 8h30-18h30';
        
        return `
            <div class="contact-modal">
                <div class="contact-intro">
                    <p>Contactez-nous dès maintenant pour discuter de votre projet de transformation numérique.</p>
                </div>
                
                <div class="contact-options">
                    <div class="contact-option" data-contact="phone">
                        <div class="contact-option-icon">
                            <i class="fas fa-phone"></i>
                        </div>
                        <div class="contact-option-content">
                            <h4>Téléphone</h4>
                            <p class="contact-value">${phone}</p>
                            <p class="contact-note">Appelez-nous directement</p>
                        </div>
                        <div class="contact-option-action">
                            <i class="fas fa-external-link-alt"></i>
                        </div>
                    </div>
                    
                    <div class="contact-option" data-contact="email">
                        <div class="contact-option-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="contact-option-content">
                            <h4>Email</h4>
                            <p class="contact-value">${email}</p>
                            <p class="contact-note">Envoyez-nous un message</p>
                        </div>
                        <div class="contact-option-action">
                            <i class="fas fa-external-link-alt"></i>
                        </div>
                    </div>
                </div>
                
                <div class="contact-info">
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${address}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <span>${hours}</span>
                    </div>
                </div>
            </div>
        `;
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
        
        // Animation des icônes dynamiques si nécessaire
        this.setupDynamicHeroAnimation();
        
        // Animation des icônes en réaction au survol du texte
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
        
        // Animation des statistiques
        this.animateStats();
    }
    
    setupDynamicHeroAnimation() {
        const heroText = document.querySelector('.hero-text');
        if (!heroText) return;
        
        // Configuration des icônes métalliques et numériques
        const digitalIcons = [
            '💻', '🔧', '⚙️', '🏗️', '📊', '🚀', 
            '⚡', '💡', '🔨', '🛠️', '📈', '⭐'
        ];
        
        // Créer le container pour les icônes
        let iconsContainer = heroText.querySelector('.hero-icons-container');
        if (!iconsContainer) {
            iconsContainer = document.createElement('div');
            iconsContainer.className = 'hero-icons-container';
            heroText.appendChild(iconsContainer);
        }
        
        let isAnimating = false;
        
        const createAnimatedIcon = (icon, animationClass, delay = 0) => {
            const iconElement = document.createElement('div');
            iconElement.className = `hero-dynamic-icon ${animationClass}`;
            iconElement.textContent = icon;
            iconElement.style.animationDelay = `${delay}ms`;
            
            iconsContainer.appendChild(iconElement);
            
            // Supprimer l'icône après l'animation
            const animationDuration = 4000;
            setTimeout(() => {
                if (iconElement.parentNode) {
                    iconElement.parentNode.removeChild(iconElement);
                }
            }, animationDuration + delay);
        };
        
        const startAnimationSequence = () => {
            if (isAnimating) return;
            
            isAnimating = true;
            
            // Sélectionner 6 icônes aléatoires
            const selectedIcons = [];
            for (let i = 0; i < 6; i++) {
                const randomIcon = digitalIcons[Math.floor(Math.random() * digitalIcons.length)];
                selectedIcons.push(randomIcon);
            }
            
            // Créer les icônes avec leurs animations
            selectedIcons.forEach((icon, index) => {
                const animationClass = `anim-${index + 1}`;
                const delay = index * 100;
                createAnimatedIcon(icon, animationClass, delay);
            });
            
            setTimeout(() => {
                isAnimating = false;
            }, 5000);
        };
        
        // Gestionnaires d'événements
        heroText.addEventListener('mouseenter', startAnimationSequence);
        
        // Animation de démonstration au chargement
        setTimeout(() => {
            if (!heroText.classList.contains('demo-shown')) {
                heroText.classList.add('demo-shown');
                startAnimationSequence();
            }
        }, 2000);
    }
    
    animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const finalValue = stat.textContent;
                    const isPercent = finalValue.includes('%');
                    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                    
                    let currentValue = 0;
                    const increment = numericValue / 30; // Animation sur 30 frames
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            currentValue = numericValue;
                            clearInterval(timer);
                        }
                        
                        stat.textContent = Math.floor(currentValue) + (isPercent ? '%' : '+');
                    }, 50);
                    
                    observer.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    }
    
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
    
    unmount() {
        // Nettoyer les animations hero si elles existent
        const heroText = document.querySelector('.hero-text');
        if (heroText && heroText._iconAnimationCleanup) {
            heroText._iconAnimationCleanup();
        }
        
        super.unmount();
    }
}

// Exposer la classe
window.HomePage = HomePage;