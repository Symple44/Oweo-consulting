// ========================================
// js/components/footer.js 
// ========================================

class OweoFooter extends BaseComponent {
    constructor(options) {
        super(options);
        this.year = new Date().getFullYear();
        
        // Attendre que CompanyInfo soit chargé
        this.companyInfo = null;
        this.loadCompanyInfo();
    }
    
    loadCompanyInfo() {
        // Vérifier si CompanyInfo est disponible
        if (window.CompanyInfo) {
            this.companyInfo = window.CompanyInfo;
        } else {
            // Attendre un peu que CompanyInfo se charge
            setTimeout(() => {
                this.companyInfo = window.CompanyInfo || this.getFallbackInfo();
            }, 100);
        }
    }
    
    getFallbackInfo() {
        // Informations de fallback si CompanyInfo n'est pas disponible
        return {
            name: 'Oweo',
            tagline: 'Expert en transformation digitale pour l\'industrie métallique',
            contact: {
                email: 'contact@oweo-consulting.fr',
                phone: '+33 6 86 76 81 31',
                phoneFormatted: '06 86 76 81 31'
            },
            address: {
                full: 'Nantes, France'
            },
            businessHours: {
                days: 'Lun-Ven',
                hours: '8h30-18h30'
            },
            social: {
                linkedin: 'https://linkedin.com/company/oweo-consulting'
            }
        };
    }
    
    async render() {
        // S'assurer que les infos société sont disponibles
        if (!this.companyInfo) {
            this.companyInfo = window.CompanyInfo || this.getFallbackInfo();
        }
        
        this.element.innerHTML = `
            <footer class="footer">
                <div class="footer-container">
                    <!-- Footer Main -->
                    <div class="footer-main">
                        <!-- Footer Brand -->
                        <div class="footer-section">
                            <div class="footer-brand">
                                <div class="footer-logo">
                                    <div class="footer-logo-icon">🏗️</div>
                                    <span class="footer-logo-text">${this.companyInfo.name}</span>
                                </div>
                                <p class="footer-tagline">
                                    ${this.companyInfo.tagline}
                                    Nous accompagnons les entreprises dans leur digitalisation 
                                    avec des solutions ERP sur mesure.
                                </p>
                                <div class="footer-social">
                                    ${this.companyInfo.social.linkedin ? `
                                        <a href="${this.companyInfo.social.linkedin}" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener">
                                            <i class="fab fa-linkedin-in"></i>
                                        </a>
                                    ` : ''}
                                    ${this.companyInfo.social.twitter ? `
                                        <a href="${this.companyInfo.social.twitter}" class="social-link" aria-label="Twitter" target="_blank" rel="noopener">
                                            <i class="fab fa-twitter"></i>
                                        </a>
                                    ` : ''}
                                    ${this.companyInfo.social.facebook ? `
                                        <a href="${this.companyInfo.social.facebook}" class="social-link" aria-label="Facebook" target="_blank" rel="noopener">
                                            <i class="fab fa-facebook-f"></i>
                                        </a>
                                    ` : ''}
                                    ${this.companyInfo.social.youtube ? `
                                        <a href="${this.companyInfo.social.youtube}" class="social-link" aria-label="YouTube" target="_blank" rel="noopener">
                                            <i class="fab fa-youtube"></i>
                                        </a>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                        
                        <!-- Services -->
                        <div class="footer-section">
                            <h4 class="footer-section-title">Services</h4>
                            <ul class="footer-links">
                                <li><a href="#" data-page="services">Diagnostic Gratuit</a></li>
                                <li><a href="#" data-page="services">Conseil Stratégique</a></li>
                                <li><a href="#" data-page="services">Implémentation ERP</a></li>
                                <li><a href="#" data-page="services">Développement Sur Mesure</a></li>
                                <li><a href="#" data-page="services">Formation & Support</a></li>
                            </ul>
                        </div>
                        
                        <!-- Solutions -->
                        <div class="footer-section">
                            <h4 class="footer-section-title">Solutions</h4>
                            <ul class="footer-links">
                                <li><a href="#" class="client-demo-link" data-demo="chiffrage-demo">Outil de Chiffrage</a></li>
                                <li><a href="#" class="client-demo-link" data-demo="dstv-demo">Interface DSTV</a></li>
                                <li><a href="#" data-page="services">Gestion Production</a></li>
                                <li><a href="#" data-page="services">Suivi Projets</a></li>
                                <li><a href="#" data-page="services">Analytics Métier</a></li>
                            </ul>
                        </div>
                        
                        <!-- Contact -->
                        <div class="footer-section">
                            <h4 class="footer-section-title">Contact</h4>
                            <div class="footer-contact">
                                <div class="contact-item">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <div>
                                        <div>${this.companyInfo.address.full}</div>
                                    </div>
                                </div>
                                <div class="contact-item">
                                    <i class="fas fa-phone"></i>
                                    <a href="tel:${this.companyInfo.contact.phone}">${this.companyInfo.contact.phoneFormatted}</a>
                                </div>
                                <div class="contact-item">
                                    <i class="fas fa-envelope"></i>
                                    <a href="mailto:${this.companyInfo.contact.email}">${this.companyInfo.contact.email}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer Bottom -->
                    <div class="footer-bottom">
                        <div class="footer-bottom-content">
                            <p class="footer-copyright">
                                © ${this.year} ${this.companyInfo.name}. Tous droits réservés.
                            </p>
                            <div class="footer-legal">
                                <a href="#" data-page="cgv">CGV</a>
                                <a href="#" data-page="legal">Mentions légales</a>
                                <a href="#" data-page="privacy">Politique de confidentialité</a>
                                <a href="#" data-page="terms">CGU</a>
                                <a href="#" data-page="cookies">Cookies</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
        
        this.bindEvents();
    }
    
    bindEvents() {
        // Navigation links
        const navLinks = this.element.querySelectorAll('[data-page]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                logger.log(`🔗 Footer navigation to: ${page}`);
                this.navigateTo(page);
            });
        });
        
        // Demo links
        const demoLinks = this.element.querySelectorAll('.client-demo-link');
        demoLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const demoId = link.dataset.demo;
                this.handleDemoAccess(demoId);
            });
        });
        
        // Social links tracking
        const socialLinks = this.element.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = link.getAttribute('aria-label');
                logger.log(`Social link clicked: ${platform}`);
                
                // Analytics tracking
                if (window.AppConfig?.analytics?.enabled && typeof gtag !== 'undefined') {
                    gtag('event', 'social_link_clicked', {
                        event_category: 'engagement',
                        event_label: platform.toLowerCase(),
                        value: 1
                    });
                }
            });
        });
        
        // Contact links tracking
        const contactEmail = this.element.querySelector('a[href^="mailto:"]');
        if (contactEmail) {
            contactEmail.addEventListener('click', () => {
                if (window.AppConfig?.analytics?.enabled && typeof gtag !== 'undefined') {
                    gtag('event', 'contact_email_clicked', {
                        event_category: 'contact',
                        event_label: 'footer_email'
                    });
                }
            });
        }
        
        const contactPhone = this.element.querySelector('a[href^="tel:"]');
        if (contactPhone) {
            contactPhone.addEventListener('click', () => {
                if (window.AppConfig?.analytics?.enabled && typeof gtag !== 'undefined') {
                    gtag('event', 'contact_phone_clicked', {
                        event_category: 'contact',
                        event_label: 'footer_phone'
                    });
                }
            });
        }
    }
    
    navigateTo(page) {
        if (window.app && window.app.router) {
            logger.log(`📄 Footer navigating to: ${page}`);
            window.app.router.navigate(page);
        } else {
            logger.error('Router not available');
        }
    }
    
    handleDemoAccess(demoId) {
        // Check client access
        if (window.OweoClientAccess && !window.OweoClientAccess.hasAccess()) {
            window.OweoClientAccess.showAuthModal(demoId);
        } else {
            this.navigateTo(demoId);
        }
    }
    
    // Méthode pour mettre à jour les informations de contact si elles changent
    updateCompanyInfo() {
        if (window.CompanyInfo) {
            this.companyInfo = window.CompanyInfo;
            this.render(); // Re-render avec les nouvelles infos
        }
    }
    
    // Vérifier la cohérence des informations
    validateInfo() {
        if (!this.companyInfo) {
            logger.warn('⚠️ Footer: CompanyInfo non disponible');
            return false;
        }
        
        // Vérifications de base
        const checks = [
            { test: this.companyInfo.contact?.email?.includes('@'), msg: 'Email invalide' },
            { test: this.companyInfo.contact?.phone?.startsWith('+33'), msg: 'Téléphone invalide' },
            { test: this.companyInfo.name?.length > 0, msg: 'Nom société manquant' }
        ];
        
        const failures = checks.filter(check => !check.test);
        if (failures.length > 0) {
            logger.warn('⚠️ Footer: Validation échouée:', failures.map(f => f.msg));
            return false;
        }
        
        return true;
    }
    
    async onMount() {
        super.onMount();
        
        // Valider les informations au montage
        this.validateInfo();
        
        // Écouter les changements de CompanyInfo si nécessaire
        if (window.addEventListener) {
            window.addEventListener('companyInfoUpdated', () => {
                this.updateCompanyInfo();
            });
        }
    }
}

// Expose the class
window.OweoFooter = OweoFooter;