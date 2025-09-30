// ========================================
// js/core/event-bus.js - Système d'événements centralisé
// ========================================

class EventBus {
    constructor() {
        this.events = new Map();
        this.maxListeners = 100;
        this.debugMode = false;
    }
    
    /**
     * S'abonner à un événement
     * @param {string} event - Nom de l'événement
     * @param {function} callback - Fonction à exécuter
     * @param {object} options - Options (once, priority)
     * @returns {function} Fonction de désabonnement
     */
    on(event, callback, options = {}) {
        if (typeof event !== 'string' || typeof callback !== 'function') {
            throw new Error('Event name must be string and callback must be function');
        }
        
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        
        const listeners = this.events.get(event);
        
        // Vérifier la limite de listeners
        if (listeners.length >= this.maxListeners) {
            logger.warn(`⚠️ Maximum listeners (${this.maxListeners}) reached for event: ${event}`);
        }
        
        const listener = {
            callback,
            once: options.once || false,
            priority: options.priority || 0,
            id: this.generateId()
        };
        
        // Insérer selon la priorité (priorité plus élevée = exécution en premier)
        const insertIndex = listeners.findIndex(l => l.priority < listener.priority);
        if (insertIndex === -1) {
            listeners.push(listener);
        } else {
            listeners.splice(insertIndex, 0, listener);
        }
        
        if (this.debugMode) {
            logger.log(`📡 EventBus: Listener added for '${event}' (id: ${listener.id})`);
        }
        
        // Retourner une fonction de désabonnement
        return () => this.off(event, listener.id);
    }
    
    /**
     * S'abonner à un événement une seule fois
     * @param {string} event - Nom de l'événement
     * @param {function} callback - Fonction à exécuter
     * @returns {function} Fonction de désabonnement
     */
    once(event, callback) {
        return this.on(event, callback, { once: true });
    }
    
    /**
     * Se désabonner d'un événement
     * @param {string} event - Nom de l'événement
     * @param {string|function} callbackOrId - Callback ou ID du listener
     */
    off(event, callbackOrId) {
        if (!this.events.has(event)) return;
        
        const listeners = this.events.get(event);
        const index = typeof callbackOrId === 'string' 
            ? listeners.findIndex(l => l.id === callbackOrId)
            : listeners.findIndex(l => l.callback === callbackOrId);
        
        if (index > -1) {
            const removed = listeners.splice(index, 1)[0];
            
            if (this.debugMode) {
                logger.log(`📡 EventBus: Listener removed for '${event}' (id: ${removed.id})`);
            }
        }
        
        // Supprimer l'événement si plus de listeners
        if (listeners.length === 0) {
            this.events.delete(event);
        }
    }
    
    /**
     * Émettre un événement
     * @param {string} event - Nom de l'événement
     * @param {*} data - Données à transmettre
     * @returns {boolean} True si des listeners ont été exécutés
     */
    emit(event, data) {
        if (!this.events.has(event)) {
            if (this.debugMode) {
                logger.log(`📡 EventBus: No listeners for '${event}'`);
            }
            return false;
        }
        
        const listeners = this.events.get(event).slice(); // Copie pour éviter les modifications pendant l'itération
        let executed = 0;
        
        if (this.debugMode) {
            logger.log(`📡 EventBus: Emitting '${event}' to ${listeners.length} listeners`, data);
        }
        
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            
            try {
                listener.callback(data, event);
                executed++;
                
                // Supprimer si 'once'
                if (listener.once) {
                    this.off(event, listener.id);
                }
            } catch (error) {
                logger.error(`EventBus: Error in listener for '${event}':`, error);
            }
        }
        
        return executed > 0;
    }
    
    /**
     * Supprimer tous les listeners d'un événement
     * @param {string} event - Nom de l'événement (optionnel, si omis supprime tout)
     */
    removeAllListeners(event) {
        if (event) {
            this.events.delete(event);
        } else {
            this.events.clear();
        }
        
        if (this.debugMode) {
            logger.log(`📡 EventBus: ${event ? `All listeners for '${event}'` : 'All listeners'} removed`);
        }
    }
    
    /**
     * Obtenir la liste des événements
     * @returns {string[]} Liste des noms d'événements
     */
    eventNames() {
        return Array.from(this.events.keys());
    }
    
    /**
     * Obtenir le nombre de listeners pour un événement
     * @param {string} event - Nom de l'événement
     * @returns {number} Nombre de listeners
     */
    listenerCount(event) {
        return this.events.has(event) ? this.events.get(event).length : 0;
    }
    
    /**
     * Attendre qu'un événement soit émis
     * @param {string} event - Nom de l'événement
     * @param {number} timeout - Timeout en ms (optionnel)
     * @returns {Promise} Promise qui se résout avec les données de l'événement
     */
    waitFor(event, timeout) {
        return new Promise((resolve, reject) => {
            let timeoutId;
            
            const unsubscribe = this.once(event, (data) => {
                if (timeoutId) clearTimeout(timeoutId);
                resolve(data);
            });
            
            if (timeout) {
                timeoutId = setTimeout(() => {
                    unsubscribe();
                    reject(new Error(`Timeout waiting for event: ${event}`));
                }, timeout);
            }
        });
    }
    
    /**
     * Générer un ID unique pour les listeners
     * @returns {string} ID unique
     */
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
    
    /**
     * Activer/désactiver le mode debug
     * @param {boolean} enabled - Activer le debug
     */
    setDebugMode(enabled) {
        this.debugMode = enabled;
        logger.log(`📡 EventBus: Debug mode ${enabled ? 'enabled' : 'disabled'}`);
    }
    
    /**
     * Obtenir des statistiques sur l'EventBus
     * @returns {object} Statistiques
     */
    getStats() {
        const stats = {
            totalEvents: this.events.size,
            totalListeners: 0,
            events: {}
        };
        
        for (const [event, listeners] of this.events) {
            stats.totalListeners += listeners.length;
            stats.events[event] = listeners.length;
        }
        
        return stats;
    }
}