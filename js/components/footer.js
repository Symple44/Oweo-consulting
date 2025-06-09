// ========================================
// js/components/footer.js - Footer refactorisé
// ========================================

class OweoFooter extends BaseComponent {
    constructor(options) {
        super(options);
        this.year = new Date().getFullYear();
    }
    
    async render() {
        this.element.innerHTML = `
            <footer class="footer">
                <div class="footer-container">
                    <!-- Footer Main -->
                    <div class="footer-main">
                        <div class="footer-section">
                            <div class="footer-brand">
                                <div class="footer-logo">
                                    <div class="footer-logo-icon">🏗️</div>
                                    <span class="footer-logo-text">Oweo</span>
                                </div>
                                <p class="footer-tagline">
                                    Expert en transformation digitale pour l'industrie métallique
                                </p>
                                <div class="footer-social">
                                    <a href="#" class="social-link" aria-label="LinkedIn">
                                        <i class="fab fa-linkedin-in"></i>
                                    </a>
                                    <a href="#" class="social-link" aria-label="Twitter">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                    <a href="#" class="social-link" aria-label="YouTube">
                                        <i class="fab fa-youtube"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="footer-section">
                            <h4 class="footer-section-title">Services</h4>
                            <ul class="footer-links">
                                <li><a href="#" data-page="services">Diagnostic Gratuit</a></li>
                                <li><a href="#" data-page="services">Conseil Stratégique</a></li>
                                <li><a href="#" data-page="services">Implémentation ERP</a></li>
                                <li><a href="#" data-page="services">Développement Sur Mesure</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-section">
                            <h4 class="footer-section-title">Solutions</h4>
                            <ul class="footer-links">
                                <li><a href="#" class="client-demo-link" data-demo="chiffrage-demo">Outil de Chiffrage</a></li>
                                <li><a href="#" class="client-demo-link" data-demo="dstv-demo">Interface DSTV</a></li>
                                <li><a href="#" data-page="services">Gestion Production</a></li>
                                <li><a href="#" data-page="services">Business Intelligence</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-section">
                            <h4 class="footer-section-title">Contact</h4>
                            <div class="footer-contact">
                                <div class="contact-item">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>123 Rue de l'Industrie<br>69000 Lyon, France</span>
                                </div>
                                <div class="contact-item">
                                    <i class="fas fa-phone"></i>
                                    <a href="tel:+33123456789">+33 1 23 45 67 89</a>
                                </div>
                                <div class="contact-item">
                                    <i class="fas fa-envelope"></i>
                                    <a href="mailto:contact@oweo.fr">contact@oweo.fr</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer Bottom -->
                    <div class="footer-bottom">
                        <div class="footer-bottom-content">
                            <p class="footer-copyright">
                                © ${this.year} Oweo. Tous droits réservés.
                            </p>
                            <div class="footer-legal">
                                <a href="#" data-page="mentions-legales">Mentions légales</a>
                                <a href="#" data-page="politique-confidentialite">Politique de confidentialité</a>
                                <a href="#" data-page="cgv">CGV</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
    
    bindEvents() {
        // Navigation
        this.element.addEventListener('click', (e) => {
            const pageLink = e.target.closest('[data-page]');
            if (pageLink) {
                e.preventDefault();
                this.handleNavigation(pageLink.dataset.page);
            }
            
            const demoLink = e.target.closest('.client-demo-link');
            if (demoLink) {
                e.preventDefault();
                this.handleDemoAccess(demoLink.dataset.demo);
            }
        });
    }
    
    handleNavigation(page) {
        if (this.eventBus) {
            this.eventBus.emit('navigate', { page });
        }
    }
    
    handleDemoAccess(demoId) {
        if (window.OweoClientAccess && !window.OweoClientAccess.hasAccess()) {
            window.OweoClientAccess.showAuthModal(demoId);
        } else {
            if (this.eventBus) {
                this.eventBus.emit('navigateToDemo', { demoId });
            }
        }
    }
}