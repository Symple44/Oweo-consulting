// ========================================
// js/components/footer.js - Footer complet
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
                        <!-- Footer Brand -->
                        <div class="footer-section">
                            <div class="footer-brand">
                                <div class="footer-logo">
                                    <div class="footer-logo-icon">🏗️</div>
                                    <span class="footer-logo-text">Oweo</span>
                                </div>
                                <p class="footer-tagline">
                                    Expert en transformation digitale pour l'industrie métallique. 
                                    Nous accompagnons les entreprises dans leur digitalisation 
                                    avec des solutions ERP sur mesure.
                                </p>
                                <div class="footer-social">
                                    <a href="#" class="social-link" aria-label="LinkedIn">
                                        <i class="fab fa-linkedin-in"></i>
                                    </a>
                                    <a href="#" class="social-link" aria-label="Twitter">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                    <a href="#" class="social-link" aria-label="Facebook">
                                        <i class="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="#" class="social-link" aria-label="YouTube">
                                        <i class="fab fa-youtube"></i>
                                    </a>
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
                                        <div>123 Rue de l'Industrie</div>
                                        <div>69000 Lyon, France</div>
                                    </div>
                                </div>
                                <div class="contact-item">
                                    <i class="fas fa-phone"></i>
                                    <a href="tel:+33123456789">+33 1 23 45 67 89</a>
                                </div>
                                <div class="contact-item">
                                    <i class="fas fa-envelope"></i>
                                    <a href="mailto:contact@oweo.fr">contact@oweo.fr</a>
                                </div>
                                <div class="contact-item">
                                    <i class="fas fa-clock"></i>
                                    <div>Lun-Ven 8h30-18h30</div>
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
                                <a href="#">Mentions légales</a>
                                <a href="#">Politique de confidentialité</a>
                                <a href="#">CGU</a>
                                <a href="#">Cookies</a>
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
                console.log(`Social link clicked: ${platform}`);
                // Analytics tracking here
            });
        });
    }
    
    navigateTo(page) {
        if (window.app && window.app.router) {
            window.app.router.navigate(page);
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
}

// Expose the class
window.OweoFooter = OweoFooter;