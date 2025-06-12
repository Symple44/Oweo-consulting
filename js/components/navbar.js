// ========================================
// js/components/navbar.js - Navigation principale
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
                                <i class="fas fa-play-circle"></i>
                                <span>Démos</span>
                                <i class="fas fa-chevron-down"></i>
                            </a>
                            <div class="dropdown-menu">
                                <a href="#" class="dropdown-item client-demo-link" data-demo="chiffrage-demo">
                                    <i class="fas fa-calculator"></i>
                                    <div>
                                        <div class="item-title">Outil de Chiffrage</div>
                                        <div class="item-desc">Chiffrage automatisé</div>
                                    </div>
                                </a>
                                <a href="#" class="dropdown-item client-demo-link" data-demo="dstv-demo">
                                    <i class="fas fa-cog"></i>
                                    <div>
                                        <div class="item-title">Interface DSTV</div>
                                        <div class="item-desc">Import/Export CNC</div>
                                    </div>
                                </a>
                                <div class="dropdown-divider"></div>
                                <a href="#" class="dropdown-item" data-page="demos">
                                    <i class="fas fa-th-large"></i>
                                    <div>
                                        <div class="item-title">Toutes les démos</div>
                                        <div class="item-desc">Catalogue complet</div>
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
                        <button class="btn btn-outline btn-sm" id="client-access-btn">
                            <i class="fas fa-user-lock"></i>
                            <span>Accès Client</span>
                        </button>
                        <button class="btn btn-primary btn-sm" data-page="contact">
                            <i class="fas fa-phone"></i>
                            <span>Nous Contacter</span>
                        </button>
                    </div>
                    
                    <!-- Mobile Menu Toggle -->
                    <button class="navbar-toggle" id="mobile-menu-toggle">
                        <span class="toggle-line"></span>
                        <span class="toggle-line"></span>
                        <span class="toggle-line"></span>
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
                            
                            <!-- Mobile Demos Section -->
                            <div class="mobile-nav-section">
                                <div class="mobile-nav-title">
                                    <i class="fas fa-play-circle"></i>
                                    Démonstrations
                                </div>
                                <div class="mobile-nav-items">
                                    <a href="#" class="mobile-nav-link client-demo-link" data-demo="chiffrage-demo">
                                        <i class="fas fa-calculator"></i>
                                        <span>Outil de Chiffrage</span>
                                    </a>
                                    <a href="#" class="mobile-nav-link client-demo-link" data-demo="dstv-demo">
                                        <i class="fas fa-cog"></i>
                                        <span>Interface DSTV</span>
                                    </a>
                                </div>
                            </div>
                            
                            <a href="#" class="mobile-nav-link" data-page="contact">
                                <i class="fas fa-envelope"></i>
                                <span>Contact</span>
                            </a>
                        </div>
                        
                        <div class="mobile-actions">
                            <button class="btn btn-outline btn-block" id="mobile-client-access">
                                <i class="fas fa-user-lock"></i>
                                Accès Client
                            </button>
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

        // Toggle mobile menu avec vérification
        const mobileToggle = this.$('#mobile-menu-toggle');
        const mobileMenu = this.$('#mobile-menu');
        
        if (mobileToggle && mobileMenu) {
            console.log('✅ Mobile menu elements found');
            
            this.addEventHandler(mobileToggle, 'click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔄 Toggle clicked, current state:', this.isMenuOpen);
                this.toggleMobileMenu();
            });
        } else {
            console.error('❌ Mobile menu elements not found', {
                toggle: !!mobileToggle,
                menu: !!mobileMenu
            });
        }
        
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
        
        // Accès client
        const clientAccessBtns = this.$$('#client-access-btn, #mobile-client-access');
        clientAccessBtns.forEach(btn => {
            this.addEventHandler(btn, 'click', () => this.showClientAccess());
        });
        
        // Gestion du scroll
        if (this.config.hideOnScroll) {
            this.addEventHandler(window, 'scroll', () => this.handleScroll());
        }
        
        // Fermer le menu mobile en cliquant sur un lien
        this.addDelegatedHandler('.mobile-nav-link', 'click', () => {
            this.closeMobileMenu();
        });
        
        // Resize handler
        this.addEventHandler(window, 'resize', () => this.handleResize());
    }
    
    navigateTo(page) {
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
        
        if (!toggle || !menu) {
            console.error('❌ Cannot find mobile menu elements');
            return;
        }
        
        console.log('📱 Toggling mobile menu to:', this.isMenuOpen ? 'open' : 'closed');
        
        if (this.isMenuOpen) {
            this.openMobileMenu(toggle, menu);
        } else {
            this.closeMobileMenu(toggle, menu);
        }
    }
    
    openMobileMenu(toggle = null, menu = null) {
        toggle = toggle || this.$('#mobile-menu-toggle');
        menu = menu || this.$('#mobile-menu');
        
        if (!toggle || !menu) {
            console.error('❌ Cannot open mobile menu - elements not found');
            return;
        }
        
        // Créer une overlay si elle n'existe pas
        let overlay = document.querySelector('.navbar-mobile-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'navbar-mobile-overlay';
            document.body.appendChild(overlay);
            
            // Fermer le menu en cliquant sur l'overlay
            overlay.addEventListener('click', () => this.closeMobileMenu());
        }
        
        // Forcer l'affichage
        menu.style.display = 'block';
        menu.style.visibility = 'visible';
        
        // Utiliser requestAnimationFrame pour s'assurer que le DOM est prêt
        requestAnimationFrame(() => {
            // Ajouter les classes
            toggle.classList.add('active');
            menu.classList.add('show');
            overlay.classList.add('show');
            
            // FORCER le transform après un court délai
            setTimeout(() => {
                // Vérifier si le transform n'est pas appliqué
                const currentTransform = window.getComputedStyle(menu).transform;
                console.log('Current transform:', currentTransform);
                
                if (currentTransform.includes('-') || currentTransform === 'none') {
                    console.log('⚠️ Transform incorrect, application forcée');
                    menu.style.transform = 'translateX(0)';
                    menu.style.setProperty('transform', 'translateX(0)', 'important');
                }
                
                // Vérifier la visibilité finale
                const rect = menu.getBoundingClientRect();
                console.log('Menu position:', {
                    left: rect.left,
                    width: rect.width,
                    visible: rect.left >= 0 && rect.left < window.innerWidth
                });
                
                if (rect.left < 0) {
                    console.error('❌ Menu toujours hors écran !');
                    // Forcer avec left
                    menu.style.left = '0';
                    menu.style.transform = 'none';
                }
            }, 50);
        });
        
        // Bloquer le scroll
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');
        
        this.isMenuOpen = true;
        this.emit('mobileMenuOpened');
    }
    
    closeMobileMenu(toggle = null, menu = null) {
        toggle = toggle || this.$('#mobile-menu-toggle');
        menu = menu || this.$('#mobile-menu');
        
        if (toggle) toggle.classList.remove('active');
        if (menu) {
            menu.classList.remove('show');
            
            // Attendre la fin de la transition avant de cacher
            setTimeout(() => {
                if (!this.isMenuOpen) {
                    menu.style.display = 'none';
                }
            }, 300); // Durée de la transition
        }
        
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