// ========================================
// js/components/navbar.js - Navigation principale simplifiée
// ========================================

class OweoNavbar extends BaseComponent {
    constructor(options) {
        super(options);

        this.isMenuOpen = false;
        this.scrolled = false;
        this.lastScrollY = 0;
        this.hidden = false;

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
                                <img src="assets/images/oweo.png" alt="Oweo" class="logo-image">
                            </div>
                        </a>
                    </div>

                    <!-- Navigation Links (Desktop) -->
                    <div class="navbar-nav">
                        <a href="#" class="nav-link" data-page="home">
                            <span>Accueil</span>
                        </a>
                        <a href="#" class="nav-link" data-page="services">
                            <span>Services</span>
                        </a>
                        <a href="#" class="nav-link" data-page="products">
                            <span>Réalisations</span>
                        </a>
                        <a href="#" class="nav-link" data-page="contact">
                            <span>Contact</span>
                        </a>
                    </div>

                    <!-- Actions (Desktop) -->
                    <div class="navbar-actions">
                        <button class="btn btn-primary btn-sm" data-page="contact">
                            Parlons de votre projet
                        </button>
                    </div>

                    <!-- Theme toggle -->
                    <div class="navbar-theme-toggle-container"></div>

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
                                <span>Accueil</span>
                            </a>
                            <a href="#" class="mobile-nav-link" data-page="services">
                                <span>Services</span>
                            </a>
                            <a href="#" class="mobile-nav-link" data-page="products">
                                <span>Réalisations</span>
                            </a>
                            <a href="#" class="mobile-nav-link" data-page="contact">
                                <span>Contact</span>
                            </a>
                        </div>

                        <div class="mobile-actions">
                            <button class="btn btn-primary btn-block" data-page="contact">
                                Parlons de votre projet
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }

    bindEvents() {
        super.bindEvents();

        this.addDelegatedHandler('[data-page]', 'click', (e) => {
            e.preventDefault();
            const page = e.target.closest('[data-page]').dataset.page;
            this.navigateTo(page);
        });

        this.addDelegatedHandler('.client-demo-link', 'click', (e) => {
            e.preventDefault();
            const demoId = e.target.closest('.client-demo-link').dataset.demo;
            this.handleDemoAccess(demoId);
        });

        const mobileToggle = this.$('#mobile-menu-toggle');
        if (mobileToggle) {
            this.addEventHandler(mobileToggle, 'click', () => this.toggleMobileMenu());
        }

        this.addDelegatedHandler('.dropdown-toggle', 'click', (e) => {
            e.preventDefault();
            this.toggleDropdown(e.target.closest('.nav-dropdown'));
        });

        this.addEventHandler(document, 'click', (e) => {
            if (!e.target.closest('.nav-dropdown')) {
                this.closeAllDropdowns();
            }
        });

        if (this.config.hideOnScroll) {
            this.addEventHandler(window, 'scroll', () => this.handleScroll());
        }

        this.addDelegatedHandler('.mobile-nav-link', 'click', () => {
            this.closeMobileMenu();
        });

        this.addDelegatedHandler('.mobile-actions button[data-page]', 'click', () => {
            this.closeMobileMenu();
        });

        this.addEventHandler(window, 'resize', () => this.handleResize());
    }

    navigateTo(page) {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        }

        this.emit('navigate', { page });

        if (this.eventBus) {
            this.eventBus.emit('navigate', { page });
        }

        if (window.app && window.app.router) {
            window.app.router.navigate(page);
        }

        this.updateActiveState(page);
    }

    handleDemoAccess(demoId) {
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
        if (menu) menu.classList.add('show');

        document.body.style.overflow = 'hidden';
        this.isMenuOpen = true;
        this.emit('mobileMenuOpened');
    }

    closeMobileMenu(toggle = null, menu = null) {
        toggle = toggle || this.$('#mobile-menu-toggle');
        menu = menu || this.$('#mobile-menu');

        if (toggle) toggle.classList.remove('active');
        if (menu) menu.classList.remove('show');

        document.body.style.overflow = '';
        this.isMenuOpen = false;
        this.emit('mobileMenuClosed');
    }

    toggleDropdown(dropdown) {
        if (!dropdown) return;

        const isOpen = dropdown.classList.contains('show');
        this.closeAllDropdowns();

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

        if (currentScrollY > 20 && !this.scrolled) {
            this.scrolled = true;
            this.element.classList.add('scrolled');
        } else if (currentScrollY <= 20 && this.scrolled) {
            this.scrolled = false;
            this.element.classList.remove('scrolled');
        }

        if (Math.abs(currentScrollY - this.lastScrollY) > this.config.scrollThreshold) {
            if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
                if (!this.hidden) {
                    this.hidden = true;
                    this.element.classList.add('hidden');
                }
            } else {
                if (this.hidden) {
                    this.hidden = false;
                    this.element.classList.remove('hidden');
                }
            }

            this.lastScrollY = currentScrollY;
        }
    }

    handleResize() {
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMobileMenu();
        }
        this.closeAllDropdowns();
    }

    updateActiveState(currentPage) {
        const allLinks = this.$$('.nav-link, .mobile-nav-link');
        allLinks.forEach(link => {
            link.classList.remove('active');
        });

        const activeLinks = this.$$(`[data-page="${currentPage}"]`);
        activeLinks.forEach(link => {
            link.classList.add('active');
        });
    }

    setActiveRoute(route) {
        this.updateActiveState(route);
    }

    showNotification(message, type = 'info') {
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

        setTimeout(() => {
            if (notification.parentNode) {
                this.animationUtils?.fadeOut(notification).then(() => {
                    notification.remove();
                });
            }
        }, 5000);

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

window.OweoNavbar = OweoNavbar;
