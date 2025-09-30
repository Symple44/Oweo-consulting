// ========================================
// js/utils/theme-manager.js - Gestionnaire de thème dark/light
// ========================================

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Appliquer le thème sauvegardé
        this.applyTheme(this.currentTheme);

        // Créer le bouton de changement de thème
        this.createThemeToggle();
    }

    applyTheme(theme) {
        const root = document.documentElement;
        const body = document.body;

        if (theme === 'dark') {
            root.classList.add('dark-theme');
            root.classList.remove('light-theme');
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
        } else {
            root.classList.add('light-theme');
            root.classList.remove('dark-theme');
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
        }

        this.currentTheme = theme;
        localStorage.setItem('theme', theme);

        // Mettre à jour l'icône du bouton
        this.updateToggleIcon();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    createThemeToggle() {
        const toggle = document.createElement('button');
        toggle.id = 'theme-toggle';
        toggle.className = 'theme-toggle';
        toggle.setAttribute('aria-label', 'Changer de thème');
        toggle.innerHTML = `
            <i class="fas fa-moon theme-icon-dark"></i>
            <i class="fas fa-sun theme-icon-light"></i>
        `;

        toggle.addEventListener('click', () => this.toggleTheme());

        // Ajouter le bouton au navbar - tout à droite
        setTimeout(() => {
            const navbar = document.querySelector('.navbar-actions');
            if (navbar) {
                navbar.appendChild(toggle);
            }
        }, 100);
    }

    updateToggleIcon() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            if (this.currentTheme === 'dark') {
                toggle.classList.add('dark');
            } else {
                toggle.classList.remove('dark');
            }
        }
    }
}

// Initialiser le gestionnaire de thème
window.themeManager = new ThemeManager();