// ========================================
// js/utils/logger.js - Système de logging intelligent
// ========================================

(function() {
    'use strict';

    /**
     * Logger intelligent qui s'adapte à l'environnement
     * - Mode silencieux en production
     * - Logs détaillés en développement
     * - Support du debug persistant via localStorage
     * - Groupes de logs collapsed/expanded
     * - Préfixes colorés par niveau
     */
    class OweoLogger {
        constructor() {
            // Détection de l'environnement
            this.environment = this.detectEnvironment();

            // Configuration du logger
            this.config = {
                enabled: this.shouldEnableLogging(),
                persistentDebug: this.isPersistentDebugEnabled(),
                showTimestamps: true,
                showCaller: false, // Afficher le nom de la fonction appelante (coûteux en perf)
                levels: {
                    debug: { enabled: true, color: '#6366f1', icon: '🐛' },
                    log: { enabled: true, color: '#3b82f6', icon: '📝' },
                    info: { enabled: true, color: '#10b981', icon: 'ℹ️' },
                    warn: { enabled: true, color: '#f59e0b', icon: '⚠️' },
                    error: { enabled: true, color: '#ef4444', icon: '❌' }
                }
            };

            // Statistiques (utile pour le debug)
            this.stats = {
                logs: 0,
                warns: 0,
                errors: 0,
                debugs: 0,
                infos: 0
            };

            // Historique des logs (pour export)
            this.history = [];
            this.maxHistorySize = 100;

            this.init();
        }

        /**
         * Détecte l'environnement d'exécution
         */
        detectEnvironment() {
            const hostname = window.location.hostname;

            if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '') {
                return 'development';
            } else if (hostname.includes('staging') || hostname.includes('preprod')) {
                return 'staging';
            } else {
                return 'production';
            }
        }

        /**
         * Détermine si les logs doivent être activés
         */
        shouldEnableLogging() {
            // Vérifier le flag localStorage pour debug persistant
            if (this.isPersistentDebugEnabled()) {
                return true;
            }

            // Vérifier le paramètre URL
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('debug') === 'true') {
                return true;
            }

            // Activer en dev et staging, désactiver en prod
            return this.environment !== 'production';
        }

        /**
         * Vérifie si le debug persistant est activé via localStorage
         */
        isPersistentDebugEnabled() {
            try {
                return localStorage.getItem('oweo:debug') === 'true';
            } catch (e) {
                return false;
            }
        }

        /**
         * Initialisation du logger
         */
        init() {
            // Exposer les méthodes de contrôle en développement
            if (this.environment === 'development') {
                this.exposeDebugHelpers();
            }

            // Logger l'état du logger
            if (this.config.enabled) {
                const style = `color: ${this.config.levels.info.color}; font-weight: bold;`;
                console.log(`%c${this.config.levels.info.icon} Logger activé en mode: ${this.environment}`, style);

                if (this.config.persistentDebug) {
                    console.log('%c🔒 Mode debug persistant activé (localStorage)', 'color: #f59e0b; font-weight: bold;');
                }
            }
        }

        /**
         * Expose des helpers de debug sur window
         */
        exposeDebugHelpers() {
            window.oweoDebug = {
                enable: () => this.enablePersistentDebug(),
                disable: () => this.disablePersistentDebug(),
                status: () => this.showStatus(),
                stats: () => this.showStats(),
                export: () => this.exportLogs(),
                clear: () => this.clearHistory(),
                setLevel: (level, enabled) => this.setLogLevel(level, enabled)
            };

            console.log('%c💡 Helpers disponibles via window.oweoDebug', 'color: #10b981; font-style: italic;');
        }

        /**
         * Active le debug persistant
         */
        enablePersistentDebug() {
            try {
                localStorage.setItem('oweo:debug', 'true');
                this.config.persistentDebug = true;
                this.config.enabled = true;
                console.log('%c🔒 Debug persistant activé. Rechargez la page pour appliquer.', 'color: #10b981; font-weight: bold;');
            } catch (e) {
                console.error('Impossible d\'activer le debug persistant:', e);
            }
        }

        /**
         * Désactive le debug persistant
         */
        disablePersistentDebug() {
            try {
                localStorage.removeItem('oweo:debug');
                this.config.persistentDebug = false;
                console.log('%c🔓 Debug persistant désactivé. Rechargez la page pour appliquer.', 'color: #f59e0b; font-weight: bold;');
            } catch (e) {
                console.error('Impossible de désactiver le debug persistant:', e);
            }
        }

        /**
         * Affiche le statut du logger
         */
        showStatus() {
            console.group('🔍 Logger Status');
            console.table({
                'Environnement': this.environment,
                'Logs activés': this.config.enabled,
                'Debug persistant': this.config.persistentDebug,
                'Timestamps': this.config.showTimestamps,
                'Historique': `${this.history.length}/${this.maxHistorySize}`
            });
            console.groupEnd();
        }

        /**
         * Affiche les statistiques
         */
        showStats() {
            console.group('📊 Logger Statistics');
            console.table(this.stats);
            console.groupEnd();
            return this.stats;
        }

        /**
         * Exporte l'historique des logs
         */
        exportLogs() {
            const data = {
                environment: this.environment,
                timestamp: new Date().toISOString(),
                stats: this.stats,
                logs: this.history
            };

            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `oweo-logs-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);

            console.log('📥 Historique des logs exporté');
            return data;
        }

        /**
         * Efface l'historique
         */
        clearHistory() {
            this.history = [];
            console.log('🗑️ Historique des logs effacé');
        }

        /**
         * Active/désactive un niveau de log
         */
        setLogLevel(level, enabled) {
            if (this.config.levels[level]) {
                this.config.levels[level].enabled = enabled;
                console.log(`${enabled ? '✅' : '❌'} Niveau "${level}" ${enabled ? 'activé' : 'désactivé'}`);
            } else {
                console.warn(`⚠️ Niveau de log inconnu: ${level}`);
            }
        }

        /**
         * Ajoute un log à l'historique
         */
        addToHistory(level, args) {
            if (this.history.length >= this.maxHistorySize) {
                this.history.shift(); // Retirer le plus ancien
            }

            this.history.push({
                level,
                timestamp: new Date().toISOString(),
                message: args.map(arg => {
                    if (typeof arg === 'object') {
                        try {
                            return JSON.stringify(arg);
                        } catch (e) {
                            return '[Object]';
                        }
                    }
                    return String(arg);
                }).join(' ')
            });
        }

        /**
         * Formate un message de log
         */
        formatMessage(level, args) {
            const levelConfig = this.config.levels[level];
            const prefix = levelConfig.icon;

            // Ajouter le timestamp si activé
            if (this.config.showTimestamps) {
                const time = new Date().toLocaleTimeString('fr-FR');
                return [`${prefix} [${time}]`, ...args];
            }

            return [prefix, ...args];
        }

        /**
         * Log de niveau debug
         */
        debug(...args) {
            if (!this.config.enabled || !this.config.levels.debug.enabled) return;

            this.stats.debugs++;
            this.addToHistory('debug', args);

            const formatted = this.formatMessage('debug', args);
            const style = `color: ${this.config.levels.debug.color}`;

            console.log(`%c${formatted[0]}`, style, ...formatted.slice(1));
        }

        /**
         * Log standard
         */
        log(...args) {
            if (!this.config.enabled || !this.config.levels.log.enabled) return;

            this.stats.logs++;
            this.addToHistory('log', args);

            const formatted = this.formatMessage('log', args);
            const style = `color: ${this.config.levels.log.color}`;

            console.log(`%c${formatted[0]}`, style, ...formatted.slice(1));
        }

        /**
         * Log informatif
         */
        info(...args) {
            if (!this.config.enabled || !this.config.levels.info.enabled) return;

            this.stats.infos++;
            this.addToHistory('info', args);

            const formatted = this.formatMessage('info', args);
            const style = `color: ${this.config.levels.info.color}; font-weight: bold;`;

            console.log(`%c${formatted[0]}`, style, ...formatted.slice(1));
        }

        /**
         * Warning
         */
        warn(...args) {
            if (!this.config.enabled || !this.config.levels.warn.enabled) return;

            this.stats.warns++;
            this.addToHistory('warn', args);

            const formatted = this.formatMessage('warn', args);
            const style = `color: ${this.config.levels.warn.color}; font-weight: bold;`;

            console.warn(`%c${formatted[0]}`, style, ...formatted.slice(1));
        }

        /**
         * Error (silencieux en production sauf si debug activé)
         */
        error(...args) {
            // Toujours tracker les stats
            this.stats.errors++;
            this.addToHistory('error', args);

            // Ne pas afficher en production sauf si debug persistant activé
            if (!this.config.enabled && this.environment === 'production') return;

            const formatted = this.formatMessage('error', args);
            const style = `color: ${this.config.levels.error.color}; font-weight: bold;`;

            console.error(`%c${formatted[0]}`, style, ...formatted.slice(1));
        }

        /**
         * Groupe de logs (collapsed par défaut)
         */
        group(label, collapsed = true) {
            if (!this.config.enabled) return;

            if (collapsed) {
                console.groupCollapsed(`📦 ${label}`);
            } else {
                console.group(`📦 ${label}`);
            }
        }

        /**
         * Fin du groupe
         */
        groupEnd() {
            if (!this.config.enabled) return;
            console.groupEnd();
        }

        /**
         * Table (utile pour afficher des objets)
         */
        table(data, columns) {
            if (!this.config.enabled) return;
            console.table(data, columns);
        }

        /**
         * Timer - Démarre un chronomètre
         */
        time(label) {
            if (!this.config.enabled) return;
            console.time(`⏱️ ${label}`);
        }

        /**
         * Timer - Arrête un chronomètre
         */
        timeEnd(label) {
            if (!this.config.enabled) return;
            console.timeEnd(`⏱️ ${label}`);
        }

        /**
         * Trace de la stack (utile pour le debug)
         */
        trace(...args) {
            if (!this.config.enabled) return;
            console.trace('🔍 Stack trace:', ...args);
        }

        /**
         * Assert - Log uniquement si la condition est fausse
         */
        assert(condition, ...args) {
            if (!this.config.enabled) return;
            if (!condition) {
                console.assert(condition, '🚨 Assertion failed:', ...args);
            }
        }

        /**
         * Clear console (uniquement en dev)
         */
        clear() {
            if (this.environment === 'development') {
                console.clear();
                this.log('Console cleared');
            }
        }
    }

    // Créer l'instance globale
    const logger = new OweoLogger();

    // Exposer le logger globalement
    window.logger = logger;

    // Alias pour compatibilité
    window.OweoLogger = OweoLogger;

})();