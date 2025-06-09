// ========================================
// js/utils/notifications.js - Système de notifications
// ========================================

class NotificationSystem {
    constructor() {
        this.notifications = new Map();
        this.container = this.getOrCreateContainer();
        this.maxNotifications = 5;
        this.defaultDuration = 5000;
        this.animationDuration = 300;
    }
    
    /**
     * Créer une notification de succès
     */
    success(message, options = {}) {
        return this.create({
            type: 'success',
            message,
            icon: 'fas fa-check-circle',
            ...options
        });
    }
    
    /**
     * Créer une notification d'erreur
     */
    error(message, options = {}) {
        return this.create({
            type: 'error',
            message,
            icon: 'fas fa-times-circle',
            duration: options.duration || 8000, // Plus long pour les erreurs
            ...options
        });
    }
    
    /**
     * Créer une notification d'avertissement
     */
    warning(message, options = {}) {
        return this.create({
            type: 'warning',
            message,
            icon: 'fas fa-exclamation-triangle',
            ...options
        });
    }
    
    /**
     * Créer une notification d'information
     */
    info(message, options = {}) {
        return this.create({
            type: 'info',
            message,
            icon: 'fas fa-info-circle',
            ...options
        });
    }
    
    /**
     * Créer une notification personnalisée
     */
    create(options = {}) {
        const notification = {
            id: this.generateId(),
            type: options.type || 'info',
            message: options.message || 'Notification',
            title: options.title || null,
            icon: options.icon || 'fas fa-info-circle',
            duration: options.duration || this.defaultDuration,
            closable: options.closable !== false,
            actions: options.actions || [],
            onClick: options.onClick || null,
            element: null,
            timer: null,
            createdAt: Date.now()
        };
        
        // Créer l'élément DOM
        notification.element = this.createElement(notification);
        
        // Ajouter à la collection
        this.notifications.set(notification.id, notification);
        
        // Afficher la notification
        this.show(notification);
        
        // Programmer la suppression automatique
        if (notification.duration > 0) {
            notification.timer = setTimeout(() => {
                this.hide(notification.id);
            }, notification.duration);
        }
        
        // Limiter le nombre de notifications
        this.enforceMaxNotifications();
        
        return notification;
    }
    
    /**
     * Créer l'élément DOM
     */
    createElement(notification) {
        const element = document.createElement('div');
        element.className = `notification notification-${notification.type}`;
        element.setAttribute('data-notification-id', notification.id);
        
        element.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="${notification.icon}"></i>
                </div>
                
                <div class="notification-body">
                    ${notification.title ? `
                        <div class="notification-title">${notification.title}</div>
                    ` : ''}
                    <div class="notification-message">${notification.message}</div>
                    
                    ${notification.actions.length > 0 ? `
                        <div class="notification-actions">
                            ${notification.actions.map(action => `
                                <button class="notification-action" data-action="${action.id}">
                                    ${action.icon ? `<i class="${action.icon}"></i>` : ''}
                                    ${action.label}
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                ${notification.closable ? `
                    <button class="notification-close" type="button">
                        <i class="fas fa-times"></i>
                    </button>
                ` : ''}
            </div>
            
            ${notification.duration > 0 ? `
                <div class="notification-progress">
                    <div class="notification-progress-bar" style="animation-duration: ${notification.duration}ms;"></div>
                </div>
            ` : ''}
        `;
        
        // Lier les événements
        this.bindEvents(element, notification);
        
        return element;
    }
    
    /**
     * Lier les événements
     */
    bindEvents(element, notification) {
        // Bouton de fermeture
        const closeBtn = element.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hide(notification.id);
            });
        }
        
        // Actions personnalisées
        const actionBtns = element.querySelectorAll('.notification-action');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const actionId = btn.dataset.action;
                const action = notification.actions.find(a => a.id === actionId);
                
                if (action && action.handler) {
                    const result = action.handler(notification);
                    
                    // Fermer si l'action retourne true
                    if (result === true) {
                        this.hide(notification.id);
                    }
                }
            });
        });
        
        // Clic sur la notification
        if (notification.onClick) {
            element.addEventListener('click', () => {
                notification.onClick(notification);
            });
        }
        
        // Pause/Resume sur hover
        element.addEventListener('mouseenter', () => {
            this.pauseTimer(notification.id);
        });
        
        element.addEventListener('mouseleave', () => {
            this.resumeTimer(notification.id);
        });
    }
    
    /**
     * Afficher une notification
     */
    show(notification) {
        // Ajouter au conteneur
        this.container.appendChild(notification.element);
        
        // Animer l'entrée
        setTimeout(() => {
            notification.element.classList.add('show');
        }, 10);
        
        // Émettre l'événement
        this.emitEvent('shown', notification);
    }
    
    /**
     * Masquer une notification
     */
    hide(notificationId) {
        const notification = this.notifications.get(notificationId);
        if (!notification) return;
        
        // Annuler le timer
        if (notification.timer) {
            clearTimeout(notification.timer);
        }
        
        // Animer la sortie
        notification.element.classList.remove('show');
        notification.element.classList.add('hide');
        
        // Supprimer après l'animation
        setTimeout(() => {
            if (notification.element.parentNode) {
                notification.element.parentNode.removeChild(notification.element);
            }
            
            // Supprimer de la collection
            this.notifications.delete(notificationId);
            
            // Émettre l'événement
            this.emitEvent('hidden', notification);
        }, this.animationDuration);
    }
    
    /**
     * Supprimer toutes les notifications
     */
    clear() {
        for (const [id] of this.notifications) {
            this.hide(id);
        }
    }
    
    /**
     * Mettre en pause le timer d'une notification
     */
    pauseTimer(notificationId) {
        const notification = this.notifications.get(notificationId);
        if (!notification || !notification.timer) return;
        
        clearTimeout(notification.timer);
        
        // Calculer le temps restant
        const elapsed = Date.now() - notification.createdAt;
        notification.remainingTime = Math.max(0, notification.duration - elapsed);
        
        // Pause la barre de progression
        const progressBar = notification.element.querySelector('.notification-progress-bar');
        if (progressBar) {
            progressBar.style.animationPlayState = 'paused';
        }
    }
    
    /**
     * Reprendre le timer d'une notification
     */
    resumeTimer(notificationId) {
        const notification = this.notifications.get(notificationId);
        if (!notification || notification.remainingTime === undefined) return;
        
        // Reprendre la barre de progression
        const progressBar = notification.element.querySelector('.notification-progress-bar');
        if (progressBar) {
            progressBar.style.animationPlayState = 'running';
        }
        
        // Redémarrer le timer avec le temps restant
        if (notification.remainingTime > 0) {
            notification.timer = setTimeout(() => {
                this.hide(notificationId);
            }, notification.remainingTime);
        }
        
        delete notification.remainingTime;
    }
    
    /**
     * Limiter le nombre de notifications
     */
    enforceMaxNotifications() {
        const visibleNotifications = Array.from(this.notifications.values())
            .sort((a, b) => a.createdAt - b.createdAt);
        
        while (visibleNotifications.length > this.maxNotifications) {
            const oldest = visibleNotifications.shift();
            this.hide(oldest.id);
        }
    }
    
    /**
     * Obtenir ou créer le conteneur
     */
    getOrCreateContainer() {
        let container = document.getElementById('notifications-container');
        
        if (!container) {
            container = document.createElement('div');
            container.id = 'notifications-container';
            container.className = 'notifications-container';
            document.body.appendChild(container);
        }
        
        return container;
    }
    
    /**
     * Générer un ID unique
     */
    generateId() {
        return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    /**
     * Émettre un événement
     */
    emitEvent(eventType, notification) {
        const event = new CustomEvent(`oweo:notification:${eventType}`, {
            detail: { notification }
        });
        document.dispatchEvent(event);
    }
    
    /**
     * Obtenir les statistiques
     */
    getStats() {
        return {
            total: this.notifications.size,
            byType: this.getCountByType(),
            oldest: this.getOldest(),
            newest: this.getNewest()
        };
    }
    
    /**
     * Compter par type
     */
    getCountByType() {
        const counts = {};
        for (const notification of this.notifications.values()) {
            counts[notification.type] = (counts[notification.type] || 0) + 1;
        }
        return counts;
    }
    
    /**
     * Obtenir la plus ancienne notification
     */
    getOldest() {
        let oldest = null;
        for (const notification of this.notifications.values()) {
            if (!oldest || notification.createdAt < oldest.createdAt) {
                oldest = notification;
            }
        }
        return oldest;
    }
    
    /**
     * Obtenir la plus récente notification
     */
    getNewest() {
        let newest = null;
        for (const notification of this.notifications.values()) {
            if (!newest || notification.createdAt > newest.createdAt) {
                newest = notification;
            }
        }
        return newest;
    }
}

// Créer une instance globale
window.notifications = new NotificationSystem();

// Exposer la classe aussi
window.NotificationSystem = NotificationSystem;