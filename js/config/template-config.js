// ========================================
// js/config/template-config.js - Configuration Template Oweo
// ========================================

window.TemplateConfig = {
    // ========================================
    // CONFIGURATION GÉNÉRALE
    // ========================================
    
    enabled: true,
    defaultTheme: 'oweo',
    defaultMode: 'auto',
    showThemeSelector: true,
    
    // ========================================
    // FICHIERS TEMPLATE REQUIS
    // ========================================
    
    templateFiles: [
        'template-variables.css',
        'template-utilities.css',
        'template-navigation.css',
        'template-modals.css',
        'template-components.css',
        'template-pages.css',
        'template-demos.css'
    ],
    
    // ========================================
    // THÈMES OWEO
    // ========================================
    
    themes: {
        oweo: {
            name: 'Oweo Signature',
            primary: 199,
            accent: 25,
            tertiary: 349,
            saturation: 84,
            lightness: 50
        },
        oweoLight: {
            name: 'Oweo Clair',
            primary: 199,
            accent: 25,
            tertiary: 349,
            saturation: 70,
            lightness: 60
        },
        oweoDark: {
            name: 'Oweo Sombre',
            primary: 199,
            accent: 25,
            tertiary: 349,
            saturation: 90,
            lightness: 45
        }
    },
    
    // ========================================
    // FEATURES
    // ========================================
    
    features: {
        themeSelector: true,
        darkModeToggle: true,
        animationSystem: true,
        responsiveDesign: true,
        devTools: true
    },
    
    // ========================================
    // SYSTÈME D'ÉVÉNEMENTS
    // ========================================
    
    eventListeners: [],
    
    on(event, callback) {
        this.eventListeners.push({ event, callback });
    },
    
    emit(event, data) {
        this.eventListeners
            .filter(listener => listener.event === event)
            .forEach(listener => {
                try {
                    listener.callback(data);
                } catch (error) {
                    console.warn('⚠️ Erreur dans event listener:', error);
                }
            });
    },
    
    off(event, callback) {
        this.eventListeners = this.eventListeners.filter(
            listener => !(listener.event === event && listener.callback === callback)
        );
    },
    
    // ========================================
    // INITIALISATION
    // ========================================
    
    init() {
        console.log('🎨 Initialisation du Template System Centralisé Oweo');
        
        try {
            this.validateTemplateFiles();
            this.registerThemes();
            this.setupKeyboardShortcuts();
            this.initializeTheme();
            
            if (this.isDevelopment()) {
                this.initDevTools();
            }
            
            console.log('✅ Template System centralisé initialisé');
            
        } catch (error) {
            console.error('❌ Erreur Template System:', error);
        }
    },
    
    // ========================================
    // VALIDATION
    // ========================================
    
    validateTemplateFiles() {
        const loadedStylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .map(link => link.href);
        
        const missingFiles = this.templateFiles.filter(file => 
            !loadedStylesheets.some(loaded => loaded.includes(file))
        );
        
        if (missingFiles.length > 0) {
            console.warn('⚠️ Fichiers template manquants:', missingFiles);
            return false;
        }
        
        console.log('✅ Tous les fichiers template sont chargés:', this.templateFiles.length);
        return true;
    },
    
    // ========================================
    // GESTION DES THÈMES
    // ========================================
    
    registerThemes() {
        if (window.TemplateManager && typeof window.TemplateManager.registerTheme === 'function') {
            Object.entries(this.themes).forEach(([key, theme]) => {
                window.TemplateManager.registerTheme(key, theme);
            });
            console.log('✨ Thèmes Oweo enregistrés');
        }
    },
    
    initializeTheme() {
        const savedTheme = this.loadThemePreference();
        const theme = savedTheme || this.defaultTheme;
        const mode = savedTheme?.mode || this.defaultMode;
        
        this.applyTheme(theme);
        this.applyMode(mode);
    },
    
    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) {
            console.warn('⚠️ Thème inconnu:', themeName);
            return;
        }
        
        document.documentElement.style.setProperty('--primary-hue', theme.primary);
        document.documentElement.style.setProperty('--accent-hue', theme.accent);
        document.documentElement.style.setProperty('--tertiary-hue', theme.tertiary);
        document.documentElement.style.setProperty('--saturation', theme.saturation + '%');
        document.documentElement.style.setProperty('--lightness', theme.lightness + '%');
        
        document.body.setAttribute('data-theme', themeName);
        
        this.emit('themeChanged', { theme: themeName, config: theme });
        console.log('🎨 Thème appliqué:', theme.name);
    },
    
    applyMode(mode) {
        const body = document.body;
        
        // Supprimer les classes de mode existantes
        body.classList.remove('light-mode', 'dark-mode', 'auto-mode');
        
        if (mode === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            mode = prefersDark ? 'dark' : 'light';
        }
        
        body.classList.add(mode + '-mode');
        body.setAttribute('data-mode', mode);
        
        this.emit('modeChanged', { mode });
        console.log('🌓 Mode appliqué:', mode);
    },
    
    // ========================================
    // RACCOURCIS CLAVIER
    // ========================================
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey) {
                switch (e.key) {
                    case 'T':
                        e.preventDefault();
                        this.toggleThemeSelector();
                        break;
                    case 'M':
                        e.preventDefault();
                        this.toggleMode();
                        break;
                    case 'D':
                        e.preventDefault();
                        this.toggleDevTools();
                        break;
                }
            }
        });
    },
    
    // ========================================
    // ACTIONS UTILISATEUR
    // ========================================
    
    toggleThemeSelector() {
        if (this.features.themeSelector) {
            // Créer ou afficher le sélecteur de thème
            this.showThemeSelector();
        }
    },
    
    toggleMode() {
        const currentMode = document.body.getAttribute('data-mode') || 'light';
        const newMode = currentMode === 'light' ? 'dark' : 'light';
        
        this.applyMode(newMode);
        this.saveThemePreference({ mode: newMode });
    },
    
    showThemeSelector() {
        // Créer une interface de sélection de thème simple
        const existingSelector = document.getElementById('theme-selector');
        if (existingSelector) {
            existingSelector.remove();
            return;
        }
        
        const selector = document.createElement('div');
        selector.id = 'theme-selector';
        selector.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--bg-color, white);
                border: 1px solid var(--border-color, #ddd);
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                z-index: 10000;
                font-family: system-ui, sans-serif;
            ">
                <h3 style="margin: 0 0 15px 0; font-size: 16px;">🎨 Sélecteur de thème</h3>
                ${Object.entries(this.themes).map(([key, theme]) => `
                    <button 
                        onclick="window.TemplateConfig.selectTheme('${key}')"
                        style="
                            display: block;
                            width: 100%;
                            margin: 5px 0;
                            padding: 8px 12px;
                            border: 1px solid #ddd;
                            border-radius: 4px;
                            background: white;
                            cursor: pointer;
                            transition: all 0.2s;
                        "
                        onmouseover="this.style.background='#f5f5f5'"
                        onmouseout="this.style.background='white'"
                    >
                        ${theme.name}
                    </button>
                `).join('')}
                <button 
                    onclick="document.getElementById('theme-selector').remove()"
                    style="
                        margin-top: 10px;
                        padding: 6px 12px;
                        border: none;
                        background: #dc3545;
                        color: white;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 12px;
                    "
                >
                    Fermer
                </button>
            </div>
        `;
        
        document.body.appendChild(selector);
    },
    
    selectTheme(themeName) {
        this.applyTheme(themeName);
        this.saveThemePreference({ theme: themeName });
        document.getElementById('theme-selector')?.remove();
    },
    
    // ========================================
    // PERSISTANCE
    // ========================================
    
    saveThemePreference(data) {
        try {
            const existing = this.loadThemePreference() || {};
            const updated = { ...existing, ...data };
            localStorage.setItem('oweo_theme_preference', JSON.stringify(updated));
        } catch (e) {
            console.warn('⚠️ Impossible de sauvegarder les préférences');
        }
    },
    
    loadThemePreference() {
        try {
            const saved = localStorage.getItem('oweo_theme_preference');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    },
    
    // ========================================
    // UTILITAIRES
    // ========================================
    
    isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1';
    },
    
    getThemeInfo() {
        return {
            current: document.body.getAttribute('data-theme'),
            mode: document.body.getAttribute('data-mode'),
            available: Object.keys(this.themes)
        };
    },
    
    // ========================================
    // OUTILS DE DÉVELOPPEMENT
    // ========================================
    
    initDevTools() {
        window.TemplateDevTools = {
            listThemes: () => {
                console.table(this.themes);
            },
            
            currentTheme: () => {
                return this.getThemeInfo();
            },
            
            validateStructure: () => {
                return this.validateTemplateFiles();
            },
            
            testTheme: (themeName) => {
                if (this.themes[themeName]) {
                    this.applyTheme(themeName);
                    console.log('🎨 Test du thème:', themeName);
                } else {
                    console.error('❌ Thème inconnu:', themeName);
                }
            },
            
            resetTheme: () => {
                this.applyTheme(this.defaultTheme);
                this.applyMode(this.defaultMode);
                localStorage.removeItem('oweo_theme_preference');
                console.log('🔄 Thème réinitialisé');
            },
            
            showInfo: () => {
                console.log(`
🎨 TEMPLATE SYSTEM OWEO
======================

Thème actuel: ${this.getThemeInfo().current}
Mode actuel: ${this.getThemeInfo().mode}
Fichiers CSS: ${this.templateFiles.length}
Thèmes disponibles: ${Object.keys(this.themes).length}

Commandes:
• TemplateConfig.toggleMode()           - Changer mode
• TemplateConfig.showThemeSelector()    - Sélecteur de thème
• TemplateDevTools.testTheme('oweo')    - Tester un thème
• TemplateDevTools.resetTheme()         - Réinitialiser

Raccourcis:
• Ctrl+Shift+T : Sélecteur de thème
• Ctrl+Shift+M : Toggle mode sombre/clair
• Ctrl+Shift+D : Infos développement
                `);
            }
        };
        
        // Afficher les infos au chargement
        setTimeout(() => {
            if (this.isDevelopment()) {
                window.TemplateDevTools.showInfo();
            }
        }, 500);
    },
    
    toggleDevTools() {
        if (window.TemplateDevTools) {
            window.TemplateDevTools.showInfo();
        }
    }
};

// ========================================
// AUTO-INITIALISATION
// ========================================

function initTemplateConfig() {
    try {
        window.TemplateConfig.init();
    } catch (error) {
        console.error('💥 Erreur initialisation Template Config:', error);
    }
}

// Initialiser quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initTemplateConfig, 100);
    });
} else {
    setTimeout(initTemplateConfig, 100);
}

// Alias global
window.Template = window.TemplateConfig;