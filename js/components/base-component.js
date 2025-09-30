// ========================================
// js/components/base-component.js - Classe de base pour les composants
// ========================================

class BaseComponent {
    constructor(options = {}) {
        this.container = options.container;
        this.eventBus = options.eventBus;
        this.config = options.config || {};
        this.initialized = false;
        this.destroyed = false;
        this.element = null;
        this.eventHandlers = [];
        this.observers = [];
        this.children = new Map();
        
        // Utilitaires
        this.dom = new DOMUtils();
        this.animationUtils = window.AnimationUtils ? new window.AnimationUtils() : null;
        
        // ID unique pour le composant
        this.id = this.generateId();
        
        // Debugging
        this.debugMode = options.debugMode || false;
    }
    
    /**
     * Initialisation du composant
     */
    async init() {
        if (this.initialized) {
            logger.warn(`⚠️ Component ${this.constructor.name} already initialized`);
            return;
        }
        
        if (this.destroyed) {
            throw new Error(`Cannot initialize destroyed component ${this.constructor.name}`);
        }
        
        try {
            // Résoudre le conteneur
            await this.resolveContainer();
            
            // Hook pré-initialisation
            await this.onBeforeInit();
            
            // Rendu du composant
            await this.render();
            
            // Liaison des événements
            this.bindEvents();
            
            // Initialisation des composants enfants
            await this.initializeChildren();
            
            // Hook post-initialisation
            await this.onAfterInit();
            
            this.initialized = true;
            
            // Émettre l'événement d'initialisation
            this.emit('initialized', { component: this });
            
            this.log(`✅ Component ${this.constructor.name} initialized`);
            
        } catch (error) {
            this.log(`❌ Error initializing component ${this.constructor.name}:`, error);
            throw error;
        }
    }
    
    /**
     * Résoudre le conteneur du composant
     */
    async resolveContainer() {
        if (!this.container) {
            throw new Error('Container is required');
        }
        
        if (typeof this.container === 'string') {
            this.element = this.dom.select(this.container);
            if (!this.element) {
                throw new Error(`Container not found: ${this.container}`);
            }
        } else if (this.container instanceof Element) {
            this.element = this.container;
        } else {
            throw new Error('Invalid container type');
        }
        
        // Ajouter l'ID du composant
        this.element.setAttribute('data-component-id', this.id);
        this.element.setAttribute('data-component-type', this.constructor.name);
    }
    
    /**
     * Rendu du composant
     */
    async render() {
        if (!this.element) return;
        
        const template = await this.getTemplate();
        if (template) {
            this.element.innerHTML = template;
        }
        
        // Ajouter les classes CSS du composant
        this.addComponentClasses();
    }
    
    /**
     * Template du composant (à implémenter dans les classes enfants)
     */
    async getTemplate() {
        return '';
    }
    
    /**
     * Ajouter les classes CSS du composant
     */
    addComponentClasses() {
        const componentClass = this.constructor.name
            .replace(/([A-Z])/g, '-$1')
            .toLowerCase()
            .replace(/^-/, '');
            
        this.dom.addClass(this.element, 'component', componentClass);
    }
    
    /**
     * Liaison des événements
     */
    bindEvents() {
        // À implémenter dans les classes enfants
    }
    
    /**
     * Ajouter un gestionnaire d'événement avec nettoyage automatique
     */
    addEventHandler(element, events, handler, options = {}) {
        const cleanup = this.dom.on(element, events, handler, options);
        this.eventHandlers.push(cleanup);
        return cleanup;
    }
    
    /**
     * Délégation d'événements
     */
    addDelegatedHandler(selector, event, handler) {
        const cleanup = this.dom.delegate(this.element, selector, event, handler);
        this.eventHandlers.push(cleanup);
        return cleanup;
    }
    
    /**
     * Ajouter un observer avec nettoyage automatique
     */
    addObserver(type, element, callback, options = {}) {
        let cleanup;
        
        switch (type) {
            case 'intersection':
                cleanup = this.dom.observeIntersection(element, callback, options);
                break;
            case 'mutation':
                cleanup = this.dom.observeMutation(element, callback, options);
                break;
            case 'resize':
                cleanup = this.dom.observeResize(element, callback);
                break;
            default:
                throw new Error(`Unknown observer type: ${type}`);
        }
        
        this.observers.push(cleanup);
        return cleanup;
    }
    
    /**
     * Initialiser les composants enfants
     */
    async initializeChildren() {
        // À implémenter dans les classes enfants si nécessaire
    }
    
    /**
     * Ajouter un composant enfant
     */
    addChild(name, component) {
        this.children.set(name, component);
        return component;
    }
    
    /**
     * Obtenir un composant enfant
     */
    getChild(name) {
        return this.children.get(name);
    }
    
    /**
     * Hooks de cycle de vie
     */
    async onBeforeInit() {
        // Hook appelé avant l'initialisation
    }
    
    async onAfterInit() {
        // Hook appelé après l'initialisation
    }
    
    async onBeforeDestroy() {
        // Hook appelé avant la destruction
    }
    
    async onAfterDestroy() {
        // Hook appelé après la destruction
    }
    
    /**
     * Destruction du composant
     */
    async destroy() {
        if (this.destroyed) return;
        
        try {
            // Hook pré-destruction
            await this.onBeforeDestroy();
            
            // Détruire les composants enfants
            for (const [name, child] of this.children) {
                if (child.destroy) {
                    await child.destroy();
                }
            }
            this.children.clear();
            
            // Nettoyer les événements
            this.eventHandlers.forEach(cleanup => cleanup());
            this.eventHandlers = [];
            
            // Nettoyer les observers
            this.observers.forEach(cleanup => cleanup());
            this.observers = [];
            
            // Nettoyer le DOM
            if (this.element) {
                this.element.removeAttribute('data-component-id');
                this.element.removeAttribute('data-component-type');
                // Note: Ne pas supprimer l'élément, juste nettoyer les attributs
            }
            
            // Hook post-destruction
            await this.onAfterDestroy();
            
            this.destroyed = true;
            this.initialized = false;
            
            // Émettre l'événement de destruction
            this.emit('destroyed', { component: this });
            
            this.log(`🗑️ Component ${this.constructor.name} destroyed`);
            
        } catch (error) {
            this.log(`❌ Error destroying component ${this.constructor.name}:`, error);
        }
    }
    
    /**
     * Émettre un événement
     */
    emit(event, data = {}) {
        if (this.eventBus) {
            this.eventBus.emit(`component:${event}`, {
                component: this.constructor.name,
                id: this.id,
                ...data
            });
        }
    }
    
    /**
     * S'abonner à un événement
     */
    on(event, callback, options = {}) {
        if (this.eventBus) {
            const unsubscribe = this.eventBus.on(event, callback, options);
            this.eventHandlers.push(unsubscribe);
            return unsubscribe;
        }
        return () => {};
    }
    
    /**
     * Générer un ID unique
     */
    generateId() {
        return `${this.constructor.name.toLowerCase()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    /**
     * Logging avec contexte du composant
     */
    log(...args) {
        if (this.debugMode) {
            logger.log(`[${this.constructor.name}#${this.id}]`, ...args);
        }
    }
    
    /**
     * Utilitaires de sélection dans le contexte du composant
     */
    $(selector) {
        return this.dom.select(selector, this.element);
    }
    
    $$(selector) {
        return this.dom.selectAll(selector, this.element);
    }
    
    /**
     * État du composant
     */
    getState() {
        return {
            id: this.id,
            type: this.constructor.name,
            initialized: this.initialized,
            destroyed: this.destroyed,
            hasElement: Boolean(this.element),
            childrenCount: this.children.size
        };
    }
}

// Exposer les classes globalement
window.EventBus = EventBus;
window.ComponentManager = ComponentManager;
window.DOMUtils = DOMUtils;
window.BaseComponent = BaseComponent;