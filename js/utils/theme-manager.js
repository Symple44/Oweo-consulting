// ========================================
// js/utils/theme-manager.js - Gestionnaire de thèmes centralisé
// ========================================

class ThemeManager {
    constructor() {
        // Thèmes prédéfinis
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
            mono: {
                name: 'Monochrome',
                primary: 0,
                accent: 0,
                tertiary: 0,
                saturation: 0,
                lightness: 60
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
        this.currentTheme = 'warm';
        this.currentMode = 'dark'; // dark ou light
        
        // Charger le thème sauvegardé
        this.loadSavedTheme();
        
        // Initialiser
        this.init();
    }
    
    // ========================================
    // INITIALISATION
    // ========================================
    
    init() {
        // Appliquer le thème initial
        this.applyTheme(this.currentTheme);
        
        // Détecter les préférences système
        this.detectSystemPreferences();
        
        // Créer le sélecteur de thème si en dev
        if (this.isDevelopment()) {
            this.createThemeSelector();
        }
        
        // Écouter les changements de préférences système
        this.watchSystemChanges();
    }
    
    // ========================================
    // APPLICATION DU THÈME
    // ========================================
    
    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;
        
        const root = document.documentElement;
        
        // Appliquer les variables CSS
        root.style.setProperty('--theme-primary-hue', theme.primary);
        root.style.setProperty('--theme-accent-hue', theme.accent);
        root.style.setProperty('--theme-tertiary-hue', theme.tertiary);
        root.style.setProperty('--theme-saturation', `${theme.saturation}%`);
        root.style.setProperty('--theme-lightness', `${theme.lightness}%`);
        
        // Mettre à jour l'attribut data
        root.setAttribute('data-theme', themeName);
        root.setAttribute('data-theme-mode', this.currentMode);
        
        // Sauvegarder
        this.currentTheme = themeName;
        this.saveTheme();
        
        // Émettre un événement
        this.emitThemeChange();
        
        console.log(`🎨 Thème appliqué: ${theme.name}`);
    }
    
    // ========================================
    // CHANGEMENT DE MODE (CLAIR/SOMBRE)
    // ========================================
    
    toggleMode() {
        this.currentMode = this.currentMode === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme-mode', this.currentMode);
        this.saveTheme();
        this.emitThemeChange();
    }
    
    setMode(mode) {
        if (mode === 'light' || mode === 'dark') {
            this.currentMode = mode;
            document.documentElement.setAttribute('data-theme-mode', this.currentMode);
            this.saveTheme();
            this.emitThemeChange();
        }
    }
    
    // ========================================
    // THÈME PERSONNALISÉ
    // ========================================
    
    createCustomTheme(colors) {
        this.themes.custom = {
            name: 'Personnalisé',
            primary: colors.primary || 0,
            accent: colors.accent || 0,
            tertiary: colors.tertiary || 0,
            saturation: colors.saturation || 50,
            lightness: colors.lightness || 50
        };
        
        this.applyTheme('custom');
    }
    
    // ========================================
    // SÉLECTEUR DE THÈME UI
    // ========================================
    
    createThemeSelector() {
        const selector = document.createElement('div');
        selector.id = 'theme-selector';
        selector.innerHTML = this.getThemeSelectorHTML();
        selector.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--theme-bg-elevated);
            border: 1px solid var(--theme-border-default);
            border-radius: 12px;
            padding: 16px;
            z-index: 1000;
            box-shadow: var(--theme-shadow-lg);
            min-width: 200px;
            font-family: var(--font-sans);
        `;
        
        document.body.appendChild(selector);
        this.bindSelectorEvents();
    }
    
    getThemeSelectorHTML() {
        return `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <h4 style="margin: 0; font-size: 14px; font-weight: 600; color: var(--theme-text-primary);">
                    Sélecteur de Thème
                </h4>
                <button id="theme-selector-close" style="
                    background: none;
                    border: none;
                    color: var(--theme-text-tertiary);
                    cursor: pointer;
                    padding: 4px;
                    font-size: 18px;
                ">×</button>
            </div>
            
            <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 12px; color: var(--theme-text-secondary); margin-bottom: 8px;">
                    Thème
                </label>
                <select id="theme-select" style="
                    width: 100%;
                    padding: 8px;
                    background: var(--theme-surface-alpha-10);
                    border: 1px solid var(--theme-border-subtle);
                    border-radius: 8px;
                    color: var(--theme-text-primary);
                    font-size: 14px;
                    cursor: pointer;
                ">
                    ${Object.entries(this.themes).map(([key, theme]) => `
                        <option value="${key}" ${key === this.currentTheme ? 'selected' : ''}>
                            ${theme.name}
                        </option>
                    `).join('')}
                </select>
            </div>
            
            <div style="margin-bottom: 16px;">
                <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                    <span style="font-size: 12px; color: var(--theme-text-secondary);">Mode sombre</span>
                    <input type="checkbox" id="mode-toggle" ${this.currentMode === 'dark' ? 'checked' : ''} style="
                        width: 36px;
                        height: 20px;
                        -webkit-appearance: none;
                        appearance: none;
                        background: var(--theme-surface-alpha-15);
                        border-radius: 20px;
                        position: relative;
                        cursor: pointer;
                        transition: background 0.3s;
                    ">
                </label>
            </div>
            
            <div id="theme-preview" style="
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 8px;
                margin-top: 16px;
                padding-top: 16px;
                border-top: 1px solid var(--theme-border-subtle);
            ">
                <div style="text-align: center;">
                    <div style="
                        width: 40px;
                        height: 40px;
                        background: var(--theme-primary);
                        border-radius: 8px;
                        margin: 0 auto 4px;
                    "></div>
                    <span style="font-size: 10px; color: var(--theme-text-tertiary);">Primary</span>
                </div>
                <div style="text-align: center;">
                    <div style="
                        width: 40px;
                        height: 40px;
                        background: var(--theme-accent);
                        border-radius: 8px;
                        margin: 0 auto 4px;
                    "></div>
                    <span style="font-size: 10px; color: var(--theme-text-tertiary);">Accent</span>
                </div>
                <div style="text-align: center;">
                    <div style="
                        width: 40px;
                        height: 40px;
                        background: var(--theme-tertiary);
                        border-radius: 8px;
                        margin: 0 auto 4px;
                    "></div>
                    <span style="font-size: 10px; color: var(--theme-text-tertiary);">Tertiary</span>
                </div>
            </div>
            
            <style>
                #mode-toggle:checked {
                    background: var(--theme-primary);
                }
                #mode-toggle::after {
                    content: '';
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    background: white;
                    border-radius: 50%;
                    top: 2px;
                    left: 2px;
                    transition: transform 0.3s;
                }
                #mode-toggle:checked::after {
                    transform: translateX(16px);
                }
                #theme-select option {
                    background: var(--theme-bg-elevated);
                    color: var(--theme-text-primary);
                }
            </style>
        `;
    }
    
    bindSelectorEvents() {
        // Sélecteur de thème
        const themeSelect = document.getElementById('theme-select');
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                this.applyTheme(e.target.value);
            });
        }
        
        // Toggle mode clair/sombre
        const modeToggle = document.getElementById('mode-toggle');
        if (modeToggle) {
            modeToggle.addEventListener('change', (e) => {
                this.setMode(e.target.checked ? 'dark' : 'light');
            });
        }
        
        // Bouton fermer
        const closeBtn = document.getElementById('theme-selector-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                const selector = document.getElementById('theme-selector');
                if (selector) selector.remove();
            });
        }
    }
    
    // ========================================
    // UTILITAIRES
    // ========================================
    
    loadSavedTheme() {
        const saved = localStorage.getItem('app-theme');
        if (saved) {
            try {
                const { theme, mode } = JSON.parse(saved);
                this.currentTheme = theme || 'warm';
                this.currentMode = mode || 'dark';
            } catch (e) {
                console.error('Erreur lors du chargement du thème:', e);
            }
        }
    }
    
    saveTheme() {
        localStorage.setItem('app-theme', JSON.stringify({
            theme: this.currentTheme,
            mode: this.currentMode
        }));
    }
    
    detectSystemPreferences() {
        // Détecter le mode sombre système
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.currentMode = 'dark';
        } else {
            this.currentMode = 'light';
        }
        
        // Détecter les préférences de contraste
        if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
            document.documentElement.setAttribute('data-high-contrast', 'true');
        }
        
        // Détecter les préférences de mouvement réduit
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.setAttribute('data-reduced-motion', 'true');
        }
    }
    
    watchSystemChanges() {
        // Écouter les changements de mode sombre
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            this.setMode(e.matches ? 'dark' : 'light');
        });
    }
    
    emitThemeChange() {
        // Émettre un événement personnalisé
        const event = new CustomEvent('themechange', {
            detail: {
                theme: this.currentTheme,
                mode: this.currentMode,
                colors: this.themes[this.currentTheme]
            }
        });
        window.dispatchEvent(event);
    }
    
    isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.search.includes('debug=true');
    }
    
    // ========================================
    // API PUBLIQUE
    // ========================================
    
    // Obtenir la liste des thèmes
    getThemes() {
        return Object.keys(this.themes);
    }
    
    // Obtenir le thème actuel
    getCurrentTheme() {
        return {
            name: this.currentTheme,
            mode: this.currentMode,
            ...this.themes[this.currentTheme]
        };
    }
    
    // Définir une couleur spécifique
    setColor(type, hue) {
        if (['primary', 'accent', 'tertiary'].includes(type)) {
            const root = document.documentElement;
            root.style.setProperty(`--theme-${type}-hue`, hue);
            
            // Mettre à jour le thème custom
            if (this.currentTheme === 'custom') {
                this.themes.custom[type] = hue;
                this.saveTheme();
            }
        }
    }
    
    // Exporter le thème actuel
    exportTheme() {
        return {
            name: this.currentTheme,
            mode: this.currentMode,
            colors: { ...this.themes[this.currentTheme] }
        };
    }
    
    // Importer un thème
    importTheme(themeData) {
        if (themeData && themeData.colors) {
            this.createCustomTheme(themeData.colors);
        }
    }
}

// ========================================
// INITIALISATION GLOBALE
// ========================================

// Créer l'instance globale
window.ThemeManager = new ThemeManager();

// Raccourcis console
console.log(`
🎨 Gestionnaire de Thèmes
========================
ThemeManager.applyTheme('warm')     - Appliquer un thème
ThemeManager.toggleMode()           - Basculer clair/sombre
ThemeManager.createCustomTheme({})  - Créer un thème personnalisé
ThemeManager.getThemes()            - Liste des thèmes
ThemeManager.getCurrentTheme()      - Thème actuel

Raccourci: Ctrl+Shift+T pour ouvrir le sélecteur
`);

// Raccourci clavier pour ouvrir le sélecteur
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        const selector = document.getElementById('theme-selector');
        if (!selector) {
            window.ThemeManager.createThemeSelector();
        }
    }
});