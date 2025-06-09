// ========================================
// js/utils/dom-utils.js - Utilitaires DOM
// ========================================

class DOMUtils {
    constructor() {
        this.cache = new Map();
    }
    
    /**
     * Sélectionner un élément
     */
    select(selector, parent = document) {
        if (typeof selector === 'string') {
            return parent.querySelector(selector);
        }
        return selector;
    }
    
    /**
     * Sélectionner plusieurs éléments
     */
    selectAll(selector, parent = document) {
        if (typeof selector === 'string') {
            return parent.querySelectorAll(selector);
        }
        return [selector];
    }
    
    /**
     * Ajouter des classes
     */
    addClass(element, ...classes) {
        if (element) {
            element.classList.add(...classes);
        }
        return this;
    }
    
    /**
     * Supprimer des classes
     */
    removeClass(element, ...classes) {
        if (element) {
            element.classList.remove(...classes);
        }
        return this;
    }
    
    /**
     * Basculer une classe
     */
    toggleClass(element, className) {
        if (element) {
            return element.classList.toggle(className);
        }
        return false;
    }
    
    /**
     * Vérifier si un élément a une classe
     */
    hasClass(element, className) {
        return element ? element.classList.contains(className) : false;
    }
    
    /**
     * Ajouter un événement avec nettoyage automatique
     */
    on(element, events, handler, options = {}) {
        if (!element) return () => {};
        
        const eventList = events.split(' ');
        
        eventList.forEach(event => {
            element.addEventListener(event, handler, options);
        });
        
        // Retourner une fonction de nettoyage
        return () => {
            eventList.forEach(event => {
                element.removeEventListener(event, handler, options);
            });
        };
    }
    
    /**
     * Délégation d'événements
     */
    delegate(parent, selector, event, handler) {
        if (!parent) return () => {};
        
        const delegateHandler = (e) => {
            const target = e.target.closest(selector);
            if (target && parent.contains(target)) {
                handler.call(target, e);
            }
        };
        
        parent.addEventListener(event, delegateHandler);
        
        return () => {
            parent.removeEventListener(event, delegateHandler);
        };
    }
    
    /**
     * Créer un élément
     */
    create(tag, options = {}) {
        const element = document.createElement(tag);
        
        if (options.className) {
            element.className = options.className;
        }
        
        if (options.id) {
            element.id = options.id;
        }
        
        if (options.textContent) {
            element.textContent = options.textContent;
        }
        
        if (options.innerHTML) {
            element.innerHTML = options.innerHTML;
        }
        
        if (options.attributes) {
            Object.entries(options.attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }
        
        return element;
    }
    
    /**
     * Observer d'intersection
     */
    observeIntersection(element, callback, options = {}) {
        if (!element || !window.IntersectionObserver) {
            return () => {};
        }
        
        const observer = new IntersectionObserver(callback, {
            threshold: 0.1,
            ...options
        });
        
        observer.observe(element);
        
        return () => observer.disconnect();
    }
    
    /**
     * Observer de mutations
     */
    observeMutation(element, callback, options = {}) {
        if (!element || !window.MutationObserver) {
            return () => {};
        }
        
        const observer = new MutationObserver(callback);
        
        observer.observe(element, {
            childList: true,
            subtree: true,
            ...options
        });
        
        return () => observer.disconnect();
    }
    
    /**
     * Observer de redimensionnement
     */
    observeResize(element, callback) {
        if (!element || !window.ResizeObserver) {
            return () => {};
        }
        
        const observer = new ResizeObserver(callback);
        observer.observe(element);
        
        return () => observer.disconnect();
    }
    
    /**
     * Animer un élément
     */
    animate(element, keyframes, options = {}) {
        if (!element || !element.animate) {
            return Promise.resolve();
        }
        
        const animation = element.animate(keyframes, {
            duration: 300,
            easing: 'ease',
            ...options
        });
        
        return animation.finished;
    }
    
    /**
     * Fade in
     */
    fadeIn(element, duration = 300) {
        if (!element) return Promise.resolve();
        
        element.style.opacity = '0';
        element.style.display = 'block';
        
        return this.animate(element, [
            { opacity: 0 },
            { opacity: 1 }
        ], { duration });
    }
    
    /**
     * Fade out
     */
    fadeOut(element, duration = 300) {
        if (!element) return Promise.resolve();
        
        return this.animate(element, [
            { opacity: 1 },
            { opacity: 0 }
        ], { duration }).then(() => {
            element.style.display = 'none';
        });
    }
    
    /**
     * Obtenir les dimensions d'un élément
     */
    getBounds(element) {
        if (!element) return { width: 0, height: 0, top: 0, left: 0 };
        return element.getBoundingClientRect();
    }
    
    /**
     * Vérifier si un élément est visible
     */
    isVisible(element) {
        if (!element) return false;
        
        const style = window.getComputedStyle(element);
        return style.display !== 'none' && 
               style.visibility !== 'hidden' && 
               style.opacity !== '0';
    }
    
    /**
     * Scroll vers un élément
     */
    scrollTo(element, options = {}) {
        if (!element) return;
        
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            ...options
        });
    }
}

// Exposer globalement
window.DOMUtils = DOMUtils;