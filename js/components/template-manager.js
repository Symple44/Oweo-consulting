// ========================================
// js/components/template-manager.js - Gestionnaire de thèmes intégré Oweo
// ========================================

class OweoThemeManager {
    constructor() {
        // Thèmes prédéfinis + thèmes Oweo
        this.themes = {
            warm: {
                name: 'Chaleureux',
                primary: 199,    // Bleu ciel
                accent: 25,      // Orange
                tertiary: 349,   // Rose
                saturation: 84,
                lightness: 50
            },
            cool: {
                name: 'Cool',
                primary: 217,    // Bleu
                accent: 271,     // Violet
                tertiary: 180,   // Cyan
                saturation: 80,
                lightness: 55
            },
            nature: {
                name: 'Nature',
                primary: 152,    // Vert
                accent: 30,      // Orange terre
                tertiary: 90,    // Vert lime
                saturation: 60,
                lightness: 45
            },
            oweo: {
                name: 'Oweo Signature',
                primary: 199,     // Bleu Oweo
                accent: 25,       // Orange Oweo  
                tertiary: 349,    // Rose accent
                saturation: 84,
                lightness: 50
            },
            custom: {
                name: 'Personnalisé',
                primary: 0,
                accent: 0,
                tertiary: 0,
                saturation: 50,
                lightness: 50
            }
        };
        
        // Configuration actuelle
        this.currentTheme = 'oweo';  // Thème par défaut Oweo
        this.currentMode = 'dark';   // Mode sombre par défaut
        
        // État d'initialisation
        this.initialized = false;
        
        // Charger les préférences sauvegardées
        this.loadSavedTheme();
    }
    
    // ========================================
    // INITIALISATION INTÉGRÉE
    // ========================================
    
    init() {
        if (this.initialized) return;
        
        console.log('🎨 Initialisation Oweo Theme Manager');
        
        // Appliquer le thème initial
        this.applyTheme(this.currentTheme);
        
        // Détecter les préférences système
        this.detectSystemPreferences();
        
        // Créer l'interface de développement si nécessaire
        if (this.isDevelopment()) {
            this.createDevInterface();
        }
        
        // Écouter les changements de préférences système
        this.watchSystemChanges();
        
        // Intégration avec l'EventBus Oweo
        this.setupOweoIntegration();
        
        this.initialized = true;
        console.log('✅ Theme Manager initialisé');
    }
    
    setupOweoIntegration() {
        // Intégration avec le système d'événements Oweo
        if (window.app && window.app.eventBus) {
            // Écouter les événements Oweo
            window.app.eventBus.on('app:ready', () => {
                console.log('🔗 Theme Manager connecté à l\'app Oweo');
            });
            
            window.app.eventBus.on('page:changed', (pageData) => {
                // Adapter le thème selon la page si nécessaire
                this.handlePageChange(pageData);
            });
        }
    }
    
    handlePageChange(pageData) {
        // Logique spécifique pour certaines pages
        if (pageData.page === 'demos') {
            // Optionnel : basculer vers un thème spécifique pour les démos
        }
    }
    
    // ========================================
    // APPLICATION DU THÈME
    // ========================================
    
    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) {
            console.warn(`Thème "${themeName}" non trouvé`);
            return;
        }
        
        const root = document.documentElement;
        
        // Appliquer les variables CSS template
        root.style.setProperty('--theme-primary-hue', theme.primary);
        root.style.setProperty('--theme-accent-hue', theme.accent);
        root.style.setProperty('--theme-tertiary-hue', theme.tertiary);
        root.style.setProperty('--theme-saturation', `${theme.saturation}%`);
        root.style.setProperty('--theme-lightness', `${theme.lightness}%`);
        
        // Maintenir la compatibilité avec les variables existantes
        this.updateLegacyVariables(theme);
        
        // Mettre à jour les attributs data
        root.setAttribute('data-theme', themeName);
        root.setAttribute('data-theme-mode', this.currentMode);
        
        // Sauvegarder la configuration
        this.currentTheme = themeName;
        this.saveTheme();
        
        // Émettre les événements
        this.emitThemeChange();
        
        console.log(`🎨 Thème appliqué: ${theme.name}`);
    }
    
    updateLegacyVariables(theme) {
        // Maintenir la compatibilité avec les variables CSS existantes du projet
        const root = document.documentElement;
        
        // Calculer les couleurs basées sur le thème
        const primaryColor = `hsl(${theme.primary}, ${theme.saturation}%, ${theme.lightness}%)`;
        const accentColor = `hsl(${theme.accent}, ${theme.saturation}%, ${theme.lightness}%)`;
        
        // Mise à jour des variables existantes
        root.style.setProperty('--primary-color', primaryColor);
        root.style.setProperty('--accent-color', accentColor);
        
        // Variables dérivées pour compatibilité
        root.style.setProperty('--primary-light', `hsl(${theme.primary}, ${theme.saturation}%, ${Math.min(theme.lightness + 10, 95)}%)`);
        root.style.setProperty('--primary-dark', `hsl(${theme.primary}, ${theme.saturation}%, ${Math.max(theme.lightness - 10, 5)}%)`);
    }
    
    // ========================================
    // GESTION DES MODES
    // ========================================
    
    toggleMode() {
        this.currentMode = this.currentMode === 'dark' ? 'light' : 'dark';
        this.setMode(this.currentMode);
    }
    
    setMode(mode) {
        if (mode !== 'light' && mode !== 'dark') {
            console.warn(`Mode "${mode}" non valide`);
            return;
        }
        
        this.currentMode = mode;
        document.documentElement.setAttribute('data-theme-mode', this.currentMode);
        document.documentElement.setAttribute('data-mode', this.currentMode); // Compatibilité
        
        this.saveTheme();
        this.emitThemeChange();
        
        console.log(`🌓 Mode changé: ${mode}`);
    }
    
    // ========================================
    // INTERFACE DE DÉVELOPPEMENT
    // ========================================
    
    createDevInterface() {
        // Créer un sélecteur de thème simple pour le développement
        const selector = document.createElement('div');
        selector.id = 'oweo-theme-selector';
        selector.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; z-index: 9999; 
                        background: var(--bg-card); border: 1px solid var(--border-color);
                        border-radius: var(--radius-lg); padding: var(--space-4);
                        font-family: var(--font-family-base); font-size: 0.875rem;">
                <div style="margin-bottom: var(--space-2); font-weight: 600;">🎨 Theme Manager</div>
                <select id="oweo-theme-select" style="margin-bottom: var(--space-2); width: 100%;">
                    ${Object.entries(this.themes).map(([key, theme]) => 
                        `<option value="${key}" ${key === this.currentTheme ? 'selected' : ''}>${theme.name}</option>`
                    ).join('')}
                </select>
                <button id="oweo-mode-toggle" style="width: 100%; padding: var(--space-2);">
                    ${this.currentMode === 'dark' ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
                </button>
                <button id="oweo-theme-close" style="width: 100%; padding: var(--space-1); margin-top: var(--space-2); 
                                                     background: transparent; border: 1px solid var(--border-color);">
                    ✕
                </button>
            </div>
        `;
        
        document.body.appendChild(selector);
        this.bindDevInterface();
    }
    
    bindDevInterface() {
        const themeSelect = document.getElementById('oweo-theme-select');
        const modeToggle = document.getElementById('oweo-mode-toggle');
        const closeBtn = document.getElementById('oweo-theme-close');
        
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                this.applyTheme(e.target.value);
            });
        }
        
        if (modeToggle) {
            modeToggle.addEventListener('click', () => {
                this.toggleMode();
                modeToggle.textContent = this.currentMode === 'dark' ? '☀️ Mode Clair' : '🌙 Mode Sombre';
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                const selector = document.getElementById('oweo-theme-selector');
                if (selector) selector.remove();
            });
        }
    }
    
    // ========================================
    // PERSISTANCE ET DÉTECTION SYSTÈME
    // ========================================
    
    loadSavedTheme() {
        try {
            const saved = localStorage.getItem('oweo-theme-config');
            if (saved) {
                const config = JSON.parse(saved);
                this.currentTheme = config.theme || 'oweo';
                this.currentMode = config.mode || 'dark';
            }
        } catch (e) {
            console.warn('Erreur lors du chargement du thème sauvegardé:', e);
        }
    }
    
    saveTheme() {
        try {
            const config = {
                theme: this.currentTheme,
                mode: this.currentMode,
                timestamp: Date.now()
            };
            localStorage.setItem('oweo-theme-config', JSON.stringify(config));
        } catch (e) {
            console.warn('Erreur lors de la sauvegarde du thème:', e);
        }
    }
    
    detectSystemPreferences() {
        // Détecter le mode sombre système
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.currentMode = 'dark';
        }
        
        // Détecter les préférences de contraste élevé
        if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
            document.documentElement.setAttribute('data-high-contrast', 'true');
        }
        
        // Détecter les préférences de mouvement réduit
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.setAttribute('data-reduced-motion', 'true');
        }
    }
    
    watchSystemChanges() {
        // Écouter les changements de préférences système
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (this.currentMode === 'auto') {
                    this.setMode(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
    
    // ========================================
    // ÉVÉNEMENTS ET COMMUNICATION
    // ========================================
    
    emitThemeChange() {
        // Événement standard
        const event = new CustomEvent('themechange', {
            detail: {
                theme: this.currentTheme,
                mode: this.currentMode,
                colors: this.themes[this.currentTheme]
            }
        });
        window.dispatchEvent(event);
        
        // Intégration avec l'EventBus Oweo
        if (window.app && window.app.eventBus) {
            window.app.eventBus.emit('theme:changed', {
                theme: this.currentTheme,
                mode: this.currentMode,
                colors: this.themes[this.currentTheme]
            });
        }
    }
    
    // ========================================
    // API PUBLIQUE
    // ========================================
    
    getThemes() {
        return Object.keys(this.themes);
    }
    
    getCurrentTheme() {
        return {
            name: this.currentTheme,
            mode: this.currentMode,
            ...this.themes[this.currentTheme]
        };
    }
    
    addTheme(name, config) {
        this.themes[name] = {
            name: config.name || name,
            primary: config.primary || 0,
            accent: config.accent || 0,
            tertiary: config.tertiary || 0,
            saturation: config.saturation || 50,
            lightness: config.lightness || 50
        };
        
        console.log(`✨ Thème "${name}" ajouté`);
    }
    
    removeTheme(name) {
        if (name === 'oweo' || name === 'warm') {
            console.warn(`Impossible de supprimer le thème "${name}"`);
            return;
        }
        
        delete this.themes[name];
        
        if (this.currentTheme === name) {
            this.applyTheme('oweo');
        }
    }
    
    isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.search.includes('debug=true');
    }
    
    // ========================================
    // MÉTHODES UTILITAIRES
    // ========================================
    
    exportConfig() {
        return {
            theme: this.currentTheme,
            mode: this.currentMode,
            themes: this.themes
        };
    }
    
    importConfig(config) {
        if (config.themes) {
            this.themes = { ...this.themes, ...config.themes };
        }
        
        if (config.theme) {
            this.applyTheme(config.theme);
        }
        
        if (config.mode) {
            this.setMode(config.mode);
        }
    }
}

// ========================================
// INITIALISATION GLOBALE
// ========================================

// Créer l'instance globale
window.OweoThemeManager = new OweoThemeManager();
window.ThemeManager = window.OweoThemeManager; // Alias pour compatibilité

// Initialiser automatiquement quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.OweoThemeManager.init();
    });
} else {
    window.OweoThemeManager.init();
}

// Raccourcis console pour le développement
if (window.OweoThemeManager.isDevelopment()) {
    console.log(`
🎨 Oweo Theme Manager
====================
OweoThemeManager.applyTheme('oweo')     - Appliquer un thème
OweoThemeManager.toggleMode()           - Basculer clair/sombre
OweoThemeManager.getThemes()            - Liste des thèmes
OweoThemeManager.getCurrentTheme()      - Thème actuel

Raccourcis clavier:
Ctrl+Shift+T : Sélecteur de thème
Ctrl+Shift+M : Basculer mode
    `);
}