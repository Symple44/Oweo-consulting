// ========================================
// js/components/navbar.js - Navigation principale CORRIGÉE
// ========================================

class OweoNavbar extends BaseComponent {
    constructor(options) {
        super(options);
        
        this.isMenuOpen = false;
        this.scrolled = false;
        this.lastScrollY = 0;
        this.hidden = false;
        
        // Configuration
        this.config = {
            hideOnScroll: true,
            scrollThreshold: 100,
            ...this.config
        };
    }
    
    async getTemplate() {
        return `
            <nav class="navbar" id="main-navbar">
                <div class="navbar-container">
                    <!-- Logo/Brand -->
                    <div class="navbar-brand">
                        <a href="#" class="brand-link" data-page="home">
                            <div class="brand-logo">
                                <div class="logo-icon">🏗️</div>
                                <span class="logo-text">Oweo</span>
                            </div>
                        </a>
                    </div>
                    
                    <!-- Navigation Links (Desktop) -->
                    <div class="navbar-nav">
                        <a href="#" class="nav-link" data-page="home">
                            <i class="fas fa-home"></i>
                            <span>Accueil</span>
                        </a>
                        <a href="#" class="nav-link" data-page="services">
                            <i class="fas fa-cogs"></i>
                            <span>Services</span>
                        </a>
                        <div class="nav-dropdown">
                            <a href="#" class="nav-link dropdown-toggle">
                                <i class="fas fa-box-open"></i>
                                <span>Nos Produits</span>
                                <i class="fas fa-chevron-down"></i>
                            </a>
                            <div class="dropdown-menu">
                                <a href="https://topsteel.tech/" target="_blank" rel="noopener noreferrer" class="dropdown-item">
                                    <i class="fas fa-brain"></i>
                                    <div>
                                        <div class="item-title">TopSteel <i class="fas fa-external-link-alt" style="font-size: 0.75em; opacity: 0.7;"></i></div>
                                        <div class="item-desc">ERP innovant couplé à l'IA</div>
                                    </div>
                                </a>
                                <a href="https://metaliste.info/" target="_blank" rel="noopener noreferrer" class="dropdown-item">
                                    <i class="fas fa-building"></i>
                                    <div>
                                        <div class="item-title">MétaListe <i class="fas fa-external-link-alt" style="font-size: 0.75em; opacity: 0.7;"></i></div>
                                        <div class="item-desc">Annuaire de la métallurgie</div>
                                    </div>
                                </a>
                                <a href="https://vega.pro/" target="_blank" rel="noopener noreferrer" class="dropdown-item">
                                    <i class="fas fa-industry"></i>
                                    <div>
                                        <div class="item-title">V-Steel <i class="fas fa-external-link-alt" style="font-size: 0.75em; opacity: 0.7;"></i></div>
                                        <div class="item-desc">Gestion production (Partenaire)</div>
                                    </div>
                                </a>
                                <div class="dropdown-divider"></div>
                                <a href="#" class="dropdown-item" data-page="products">
                                    <i class="fas fa-th-large"></i>
                                    <div>
                                        <div class="item-title">Tous nos produits</div>
                                        <div class="item-desc">Découvrez notre gamme</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <a href="#" class="nav-link" data-page="contact">
                            <i class="fas fa-envelope"></i>
                            <span>Contact</span>
                        </a>
                    </div>
                    
                    <!-- Actions (Desktop) -->
                    <div class="navbar-actions">
                        <button class="btn btn-primary btn-sm" data-page="contact">
                            <i class="fas fa-phone"></i>
                            <span>Nous Contacter</span>
                        </button>
                    </div>
                    
                    <!-- Mobile Menu Toggle -->
                    <button class="navbar-toggle" id="mobile-menu-toggle" aria-label="Menu" aria-expanded="false">
                        <span class="toggle-line" aria-hidden="true"></span>
                        <span class="toggle-line" aria-hidden="true"></span>
                        <span class="toggle-line" aria-hidden="true"></span>
                    </button>
                </div>
                
                <!-- Mobile Menu -->
                <div class="navbar-mobile" id="mobile-menu">
                    <div class="mobile-menu-content">
                        <div class="mobile-nav">
                            <a href="#" class="mobile-nav-link" data-page="home">
                                <i class="fas fa-home"></i>
                                <span>Accueil</span>
                            </a>
                            <a href="#" class="mobile-nav-link" data-page="services">
                                <i class="fas fa-cogs"></i>
                                <span>Services</span>
                            </a>
                            
                            <!-- Mobile Products Section -->
                            <div class="mobile-nav-section">
                                <div class="mobile-nav-title">
                                    <i class="fas fa-box-open"></i>
                                    Nos Produits
                                </div>
                                <div class="mobile-nav-items">
                                    <a href="https://topsteel.tech/" target="_blank" rel="noopener noreferrer" class="mobile-nav-link">
                                        <i class="fas fa-brain"></i>
                                        <span>TopSteel <i class="fas fa-external-link-alt" style="font-size: 0.75em;"></i></span>
                                    </a>
                                    <a href="https://metaliste.info/" target="_blank" rel="noopener noreferrer" class="mobile-nav-link">
                                        <i class="fas fa-building"></i>
                                        <span>MétaListe <i class="fas fa-external-link-alt" style="font-size: 0.75em;"></i></span>
                                    </a>
                                    <a href="https://vega.pro/" target="_blank" rel="noopener noreferrer" class="mobile-nav-link">
                                        <i class="fas fa-industry"></i>
                                        <span>V-Steel <i class="fas fa-external-link-alt" style="font-size: 0.75em;"></i></span>
                                    </a>
                                </div>
                            </div>
                            
                            <a href="#" class="mobile-nav-link" data-page="contact">
                                <i class="fas fa-envelope"></i>
                                <span>Contact</span>
                            </a>
                        </div>
                        
                        <div class="mobile-actions">
                            <button class="btn btn-primary btn-block" data-page="contact">
                                <i class="fas fa-phone"></i>
                                Nous Contacter
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
    
    bindEvents() {
        super.bindEvents();
        
        // Navigation principale
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
        
        // Toggle mobile menu
        const mobileToggle = this.$('#mobile-menu-toggle');
        if (mobileToggle) {
            this.addEventHandler(mobileToggle, 'click', () => this.toggleMobileMenu());
        }
        
        // Dropdowns
        this.addDelegatedHandler('.dropdown-toggle', 'click', (e) => {
            e.preventDefault();
            this.toggleDropdown(e.target.closest('.nav-dropdown'));
        });
        
        // Fermer dropdowns en cliquant ailleurs
        this.addEventHandler(document, 'click', (e) => {
            if (!e.target.closest('.nav-dropdown')) {
                this.closeAllDropdowns();
            }
        });
        
        // Accès client supprimé
        
        // Gestion du scroll
        if (this.config.hideOnScroll) {
            this.addEventHandler(window, 'scroll', () => this.handleScroll());
        }
        
        // Fermer le menu mobile en cliquant sur un lien
        this.addDelegatedHandler('.mobile-nav-link', 'click', () => {
            this.closeMobileMenu();
        });
        
        // Fermer le menu mobile en cliquant sur les boutons d'action
        this.addDelegatedHandler('.mobile-actions button[data-page]', 'click', () => {
            this.closeMobileMenu();
        });
        
        // Resize handler
        this.addEventHandler(window, 'resize', () => this.handleResize());
    }
    
    navigateTo(page) {
        // Fermer le menu mobile si ouvert
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        }
        
        this.emit('navigate', { page });
        
        // Navigation via EventBus
        if (this.eventBus) {
            this.eventBus.emit('navigate', { page });
        }
        
        // Navigation directe si pas d'event bus
        if (window.app && window.app.router) {
            window.app.router.navigate(page);
        }
        
        // Mettre à jour l'état actif
        this.updateActiveState(page);
    }
    
    handleDemoAccess(demoId) {
        // Vérifier l'accès client
        if (window.OweoClientAccess && !window.OweoClientAccess.hasAccess()) {
            window.OweoClientAccess.showAuthModal(demoId);
        } else {
            this.navigateToDemo(demoId);
        }
    }
    
    navigateToDemo(demoId) {
        this.emit('navigateToDemo', { demoId });
        
        if (this.eventBus) {
            this.eventBus.emit('navigateToDemo', { demoId });
        }
        
        if (window.app && window.app.router) {
            window.app.router.navigate(demoId);
        }
    }
    
    showClientAccess() {
        if (window.OweoClientAccess) {
            window.OweoClientAccess.showAuthModal();
        } else {
            alert('Système d\'accès client non disponible');
        }
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        const toggle = this.$('#mobile-menu-toggle');
        const menu = this.$('#mobile-menu');
        
        if (this.isMenuOpen) {
            this.openMobileMenu(toggle, menu);
        } else {
            this.closeMobileMenu(toggle, menu);
        }
    }
    
    openMobileMenu(toggle = null, menu = null) {
        toggle = toggle || this.$('#mobile-menu-toggle');
        menu = menu || this.$('#mobile-menu');
        
        if (toggle) toggle.classList.add('active');
        if (menu) {
            menu.classList.add('show');
            // Ajouter la classe loading pour l'effet de liseré
            this.element.classList.add('loading');
            
            // Retirer la classe loading après l'animation
            setTimeout(() => {
                this.element.classList.remove('loading');
            }, 600);
        }
        
        // Bloquer le scroll du body
        document.body.style.overflow = 'hidden';
        
        this.isMenuOpen = true;
        this.emit('mobileMenuOpened');
    }
    
    closeMobileMenu(toggle = null, menu = null) {
        toggle = toggle || this.$('#mobile-menu-toggle');
        menu = menu || this.$('#mobile-menu');
        
        if (toggle) toggle.classList.remove('active');
        if (menu) menu.classList.remove('show');
        
        // Restaurer le scroll du body
        document.body.style.overflow = '';
        
        this.isMenuOpen = false;
        this.emit('mobileMenuClosed');
    }
    
    toggleDropdown(dropdown) {
        if (!dropdown) return;
        
        const isOpen = dropdown.classList.contains('show');
        
        // Fermer tous les autres dropdowns
        this.closeAllDropdowns();
        
        // Basculer le dropdown actuel
        if (!isOpen) {
            dropdown.classList.add('show');
        }
    }
    
    closeAllDropdowns() {
        const dropdowns = this.$$('.nav-dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Ajouter la classe scrolled
        if (currentScrollY > 50 && !this.scrolled) {
            this.scrolled = true;
            this.element.classList.add('scrolled');
        } else if (currentScrollY <= 50 && this.scrolled) {
            this.scrolled = false;
            this.element.classList.remove('scrolled');
        }
        
        // Masquer/afficher sur scroll
        if (Math.abs(currentScrollY - this.lastScrollY) > this.config.scrollThreshold) {
            if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
                // Scroll vers le bas - masquer
                if (!this.hidden) {
                    this.hidden = true;
                    this.element.classList.add('hidden');
                }
            } else {
                // Scroll vers le haut - afficher
                if (this.hidden) {
                    this.hidden = false;
                    this.element.classList.remove('hidden');
                }
            }
            
            this.lastScrollY = currentScrollY;
        }
    }
    
    handleResize() {
        // Fermer le menu mobile en mode desktop
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Fermer les dropdowns
        this.closeAllDropdowns();
    }
    
    updateActiveState(currentPage) {
        // Supprimer l'état actif de tous les liens
        const allLinks = this.$$('.nav-link, .mobile-nav-link');
        allLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Ajouter l'état actif au lien courant
        const activeLinks = this.$$(`[data-page="${currentPage}"]`);
        activeLinks.forEach(link => {
            link.classList.add('active');
        });
    }
    
    // Méthodes publiques
    setActiveRoute(route) {
        this.updateActiveState(route);
    }
    
    showNotification(message, type = 'info') {
        // Créer une notification dans la navbar
        const notification = this.dom.create('div', {
            className: `navbar-notification notification-${type}`,
            innerHTML: `
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}-circle"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            `
        });
        
        this.element.appendChild(notification);
        
        // Auto-suppression
        setTimeout(() => {
            if (notification.parentNode) {
                this.animationUtils?.fadeOut(notification).then(() => {
                    notification.remove();
                });
            }
        }, 5000);
        
        // Suppression manuelle
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.animationUtils?.fadeOut(notification).then(() => {
                    notification.remove();
                });
            });
        }
    }
    
    getState() {
        return {
            ...super.getState(),
            isMenuOpen: this.isMenuOpen,
            scrolled: this.scrolled,
            hidden: this.hidden
        };
    }
}

// Exposer la classe
window.OweoNavbar = OweoNavbar;