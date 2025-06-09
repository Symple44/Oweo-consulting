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
            console.warn(`⚠️ Maximum listeners (${this.maxListeners}) reached for event: ${event}`);
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
            console.log(`📡 EventBus: Listener added for '${event}' (id: ${listener.id})`);
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
                console.log(`📡 EventBus: Listener removed for '${event}' (id: ${removed.id})`);
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
                console.log(`📡 EventBus: No listeners for '${event}'`);
            }
            return false;
        }
        
        const listeners = this.events.get(event).slice(); // Copie pour éviter les modifications pendant l'itération
        let executed = 0;
        
        if (this.debugMode) {
            console.log(`📡 EventBus: Emitting '${event}' to ${listeners.length} listeners`, data);
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
                console.error(`❌ EventBus: Error in listener for '${event}':`, error);
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
            console.log(`📡 EventBus: ${event ? `All listeners for '${event}'` : 'All listeners'} removed`);
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
        console.log(`📡 EventBus: Debug mode ${enabled ? 'enabled' : 'disabled'}`);
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

// ========================================
// js/core/component-manager.js - Gestionnaire de composants
// ========================================

class ComponentManager {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.components = new Map();
        this.loadingPromises = new Map();
        this.initOrder = [];
        this.debugMode = false;
    }
    
    /**
     * Enregistrer un composant
     * @param {string} name - Nom du composant
     * @param {object} component - Instance du composant
     * @param {object} options - Options (dependencies, autoInit, etc.)
     * @returns {Promise} Promise de l'enregistrement
     */
    async register(name, component, options = {}) {
        if (this.components.has(name)) {
            console.warn(`⚠️ Component '${name}' already registered, replacing...`);
        }
        
        const componentWrapper = {
            instance: component,
            name,
            initialized: false,
            dependencies: options.dependencies || [],
            autoInit: options.autoInit !== false,
            priority: options.priority || 0,
            retryCount: 0,
            maxRetries: options.maxRetries || 3,
            ...options
        };
        
        this.components.set(name, componentWrapper);
        
        if (this.debugMode) {
            console.log(`🧩 ComponentManager: Registered '${name}'`);
        }
        
        // Auto-initialisation si activée
        if (componentWrapper.autoInit) {
            return this.initialize(name);
        }
        
        return Promise.resolve(componentWrapper);
    }
    
    /**
     * Initialiser un composant
     * @param {string} name - Nom du composant
     * @returns {Promise} Promise de l'initialisation
     */
    async initialize(name) {
        if (this.loadingPromises.has(name)) {
            return this.loadingPromises.get(name);
        }
        
        const component = this.components.get(name);
        if (!component) {
            throw new Error(`Component '${name}' not found`);
        }
        
        if (component.initialized) {
            return component;
        }
        
        // Créer la promise d'initialisation
        const initPromise = this._initializeComponent(component);
        this.loadingPromises.set(name, initPromise);
        
        try {
            const result = await initPromise;
            this.loadingPromises.delete(name);
            return result;
        } catch (error) {
            this.loadingPromises.delete(name);
            throw error;
        }
    }
    
    /**
     * Initialiser un composant avec ses dépendances
     * @private
     */
    async _initializeComponent(component) {
        try {
            // Vérifier et initialiser les dépendances
            await this._initializeDependencies(component);
            
            if (this.debugMode) {
                console.log(`🧩 ComponentManager: Initializing '${component.name}'...`);
            }
            
            // Initialiser le composant
            if (component.instance.init && typeof component.instance.init === 'function') {
                await component.instance.init();
            }
            
            component.initialized = true;
            this.initOrder.push(component.name);
            
            // Émettre l'événement d'initialisation
            this.eventBus?.emit('component:initialized', {
                name: component.name,
                component: component.instance
            });
            
            if (this.debugMode) {
                console.log(`✅ ComponentManager: '${component.name}' initialized successfully`);
            }
            
            return component;
            
        } catch (error) {
            component.retryCount++;
            
            console.error(`❌ ComponentManager: Failed to initialize '${component.name}':`, error);
            
            // Retry si possible
            if (component.retryCount < component.maxRetries) {
                console.log(`🔄 ComponentManager: Retrying '${component.name}' (${component.retryCount}/${component.maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, 1000 * component.retryCount));
                return this._initializeComponent(component);
            }
            
            // Émettre l'événement d'erreur
            this.eventBus?.emit('component:error', {
                name: component.name,
                error: error.message
            });
            
            throw error;
        }
    }
    
    /**
     * Initialiser les dépendances d'un composant
     * @private
     */
    async _initializeDependencies(component) {
        if (!component.dependencies || component.dependencies.length === 0) {
            return;
        }
        
        const dependencyPromises = component.dependencies.map(dep => {
            if (!this.components.has(dep)) {
                throw new Error(`Dependency '${dep}' not found for component '${component.name}'`);
            }
            return this.initialize(dep);
        });
        
        await Promise.all(dependencyPromises);
    }
    
    /**
     * Obtenir un composant
     * @param {string} name - Nom du composant
     * @returns {object|null} Instance du composant ou null
     */
    get(name) {
        const component = this.components.get(name);
        return component?.initialized ? component.instance : null;
    }
    
    /**
     * Vérifier si un composant est initialisé
     * @param {string} name - Nom du composant
     * @returns {boolean} True si initialisé
     */
    isInitialized(name) {
        const component = this.components.get(name);
        return component ? component.initialized : false;
    }
    
    /**
     * Détruire un composant
     * @param {string} name - Nom du composant
     * @returns {Promise} Promise de la destruction
     */
    async destroy(name) {
        const component = this.components.get(name);
        if (!component) {
            console.warn(`⚠️ Component '${name}' not found for destruction`);
            return;
        }
        
        try {
            // Appeler la méthode destroy si elle existe
            if (component.instance.destroy && typeof component.instance.destroy === 'function') {
                await component.instance.destroy();
            }
            
            component.initialized = false;
            
            // Émettre l'événement de destruction
            this.eventBus?.emit('component:destroyed', {
                name: component.name
            });
            
            if (this.debugMode) {
                console.log(`🗑️ ComponentManager: '${name}' destroyed`);
            }
            
        } catch (error) {
            console.error(`❌ ComponentManager: Error destroying '${name}':`, error);
        }
    }
    
    /**
     * Détruire tous les composants
     * @returns {Promise} Promise de la destruction
     */
    async destroyAll() {
        const destroyPromises = [];
        
        // Détruire dans l'ordre inverse d'initialisation
        for (let i = this.initOrder.length - 1; i >= 0; i--) {
            const name = this.initOrder[i];
            if (this.components.has(name)) {
                destroyPromises.push(this.destroy(name));
            }
        }
        
        await Promise.all(destroyPromises);
        
        this.components.clear();
        this.initOrder = [];
        this.loadingPromises.clear();
        
        if (this.debugMode) {
            console.log('🗑️ ComponentManager: All components destroyed');
        }
    }
    
    /**
     * Initialiser tous les composants auto-init
     * @returns {Promise} Promise de l'initialisation
     */
    async initializeAll() {
        const autoInitComponents = Array.from(this.components.values())
            .filter(comp => comp.autoInit && !comp.initialized)
            .sort((a, b) => b.priority - a.priority); // Priorité plus élevée en premier
        
        const initPromises = autoInitComponents.map(comp => this.initialize(comp.name));
        
        try {
            await Promise.all(initPromises);
            
            if (this.debugMode) {
                console.log(`✅ ComponentManager: All auto-init components initialized (${autoInitComponents.length})`);
            }
            
        } catch (error) {
            console.error('❌ ComponentManager: Error during batch initialization:', error);
            throw error;
        }
    }
    
    /**
     * Obtenir la liste des composants
     * @returns {string[]} Liste des noms de composants
     */
    getComponentNames() {
        return Array.from(this.components.keys());
    }
    
    /**
     * Obtenir les statistiques des composants
     * @returns {object} Statistiques
     */
    getStats() {
        const stats = {
            total: this.components.size,
            initialized: 0,
            pending: 0,
            failed: 0,
            components: {}
        };
        
        for (const [name, component] of this.components) {
            if (component.initialized) {
                stats.initialized++;
            } else if (this.loadingPromises.has(name)) {
                stats.pending++;
            } else if (component.retryCount >= component.maxRetries) {
                stats.failed++;
            }
            
            stats.components[name] = {
                initialized: component.initialized,
                retryCount: component.retryCount,
                dependencies: component.dependencies
            };
        }
        
        return stats;
    }
    
    /**
     * Activer/désactiver le mode debug
     * @param {boolean} enabled - Activer le debug
     */
    setDebugMode(enabled) {
        this.debugMode = enabled;
        console.log(`🧩 ComponentManager: Debug mode ${enabled ? 'enabled' : 'disabled'}`);
    }
    
    /**
     * Attendre qu'un composant soit initialisé
     * @param {string} name - Nom du composant
     * @param {number} timeout - Timeout en ms
     * @returns {Promise} Promise qui se résout quand le composant est prêt
     */
    async waitFor(name, timeout = 5000) {
        if (this.isInitialized(name)) {
            return this.get(name);
        }
        
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                unsubscribe();
                reject(new Error(`Timeout waiting for component: ${name}`));
            }, timeout);
            
            const unsubscribe = this.eventBus?.on('component:initialized', (data) => {
                if (data.name === name) {
                    clearTimeout(timeoutId);
                    unsubscribe();
                    resolve(data.component);
                }
            });
        });
    }
}