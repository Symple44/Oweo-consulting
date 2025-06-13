// ========================================
// js/components/navbar-generic.js - Navbar avec système générique
// ========================================

class NavbarGeneric extends BaseComponent {
    constructor() {
        super('navbar');
        
        this.menuItems = [
            { text: 'Accueil', href: '#home', icon: 'fas fa-home' },
            { text: 'Services', href: '#services', icon: 'fas fa-briefcase' },
            { 
                text: 'Démos', 
                href: '#demos', 
                icon: 'fas fa-flask',
                dropdown: [
                    { text: 'Chiffrage', href: '#chiffrage-demo', icon: 'fas fa-calculator' },
                    { text: 'DSTV', href: '#dstv-demo', icon: 'fas fa-cube' },
                    { text: 'Planning', href: '#planning-demo', icon: 'fas fa-calendar' },
                    { text: 'Stock', href: '#stock-demo', icon: 'fas fa-warehouse' }
                ]
            },
            { text: 'Contact', href: '#contact', icon: 'fas fa-envelope' }
        ];
        
        this.isScrolled = false;
        this.isMobileMenuOpen = false;
        this.currentTheme = 'warm';
    }
    
    render() {
        return `
            <nav class="navbar navbar--animated" id="navbar">
                <div class="navbar-container">
                    ${this.renderBrand()}
                    ${this.renderMenu()}
                    ${this.renderActions()}
                    ${this.renderMobileToggle()}
                </div>
            </nav>
        `;
    }
    
    renderBrand() {
        return `
            <a href="#home" class="navbar-brand">
                <div class="navbar-logo">
                    <i class="fas fa-industry"></i>
                </div>
                <span>${window.CompanyInfo?.name || 'MonEntreprise'}</span>
            </a>
        `;
    }
    
    renderMenu() {
        return `
            <ul class="navbar-menu" id="navbar-menu">
                ${this.menuItems.map(item => this.renderMenuItem(item)).join('')}
                
                <!-- Actions mobiles -->
                <li class="navbar-actions navbar-actions--mobile">
                    ${this.renderThemeToggle()}
                    ${this.renderCTA()}
                </li>
            </ul>
        `;
    }
    
    renderMenuItem(item) {
        const hasDropdown = item.dropdown && item.dropdown.length > 0;
        const isActive = window.location.hash === item.href;
        
        return `
            <li class="navbar-item">
                <a href="${item.href}" 
                   class="navbar-link ${isActive ? 'navbar-link--active' : ''}"
                   ${hasDropdown ? 'data-dropdown="true"' : ''}>
                    ${item.icon ? `<i class="${item.icon}"></i>` : ''}
                    ${item.text}
                    ${hasDropdown ? '<i class="fas fa-chevron-down" style="font-size: 0.75rem;"></i>' : ''}
                </a>
                
                ${hasDropdown ? `
                    <div class="navbar-dropdown">
                        ${item.dropdown.map(subItem => `
                            <a href="${subItem.href}" class="navbar-dropdown-item">
                                ${subItem.icon ? `<i class="${subItem.icon}"></i>` : ''}
                                ${subItem.text}
                            </a>
                        `).join('')}
                    </div>
                ` : ''}
            </li>
        `;
    }
    
    renderActions() {
        return `
            <div class="navbar-actions navbar-actions--desktop">
                ${this.renderThemeToggle()}
                ${this.renderCTA()}
            </div>
        `;
    }
    
    renderThemeToggle() {
        return `
            <button class="navbar-theme-toggle" 
                    id="navbar-theme-toggle" 
                    title="Changer de thème"
                    aria-label="Changer de thème">
                <i class="fas fa-palette"></i>
            </button>
        `;
    }
    
    renderCTA() {
        return `
            <button class="btn btn--primary btn--sm">
                <i class="fas fa-rocket"></i>
                Démarrer
            </button>
        `;
    }
    
    renderMobileToggle() {
        return `
            <button class="navbar-toggle" 
                    id="navbar-toggle"
                    aria-label="Menu"
                    aria-expanded="false">
                <span class="navbar-toggle-icon"></span>
            </button>
        `;
    }
    
    onMount() {
        super.onMount();
        
        // Gestion du scroll
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Toggle mobile
        const toggle = document.getElementById('navbar-toggle');
        const menu = document.getElementById('navbar-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                this.isMobileMenuOpen = !this.isMobileMenuOpen;
                toggle.classList.toggle('navbar-toggle--active');
                menu.classList.toggle('navbar-menu--active');
                toggle.setAttribute('aria-expanded', this.isMobileMenuOpen);
            });
        }
        
        // Fermer le menu mobile au clic sur un lien
        const links = document.querySelectorAll('.navbar-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMobileMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        });
        
        // Toggle thème
        const themeToggle = document.getElementById('navbar-theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // Gestion du clic en dehors pour fermer les dropdowns
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar-item')) {
                this.closeAllDropdowns();
            }
        });
        
        // Active link update
        window.addEventListener('hashchange', () => {
            this.updateActiveLink();
        });
    }
    
    handleScroll() {
        const scrolled = window.scrollY > 50;
        const navbar = document.getElementById('navbar');
        
        if (scrolled !== this.isScrolled) {
            this.isScrolled = scrolled;
            navbar.classList.toggle('navbar--scrolled', scrolled);
        }
    }
    
    closeMobileMenu() {
        const toggle = document.getElementById('navbar-toggle');
        const menu = document.getElementById('navbar-menu');
        
        this.isMobileMenuOpen = false;
        toggle.classList.remove('navbar-toggle--active');
        menu.classList.remove('navbar-menu--active');
        toggle.setAttribute('aria-expanded', 'false');
    }
    
    closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.navbar-dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
        });
    }
    
    toggleTheme() {
        if (window.ThemeManager) {
            window.ThemeManager.nextTheme();
            
            // Animation de rotation sur l'icône
            const icon = document.querySelector('#navbar-theme-toggle i');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                setTimeout(() => {
                    icon.style.transform = '';
                }, 300);
            }
        }
    }
    
    updateActiveLink() {
        const currentHash = window.location.hash;
        const links = document.querySelectorAll('.navbar-link');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentHash) {
                link.classList.add('navbar-link--active');
            } else {
                link.classList.remove('navbar-link--active');
            }
        });
    }
}

// Enregistrer le composant
window.NavbarGeneric = NavbarGeneric;