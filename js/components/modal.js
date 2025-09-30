// ========================================
// js/components/modal.js - Système de modales
// ========================================

class ModalSystem {
    constructor() {
        this.modals = new Map();
        this.currentModal = null;
        this.modalCount = 0;
        this.zIndexBase = 1050;
        
        // Conteneur des modales
        this.container = this.getOrCreateContainer();
        
        // Gérer les raccourcis clavier globaux
        this.bindGlobalEvents();
    }
    
    /**
     * Créer une nouvelle modale
     */
    create(options = {}) {
        const modalId = options.id || this.generateId();
        
        const modal = {
            id: modalId,
            title: options.title || 'Modal',
            content: options.content || '',
            size: options.size || 'md', // sm, md, lg, xl
            closable: options.closable !== false,
            backdrop: options.backdrop !== false,
            keyboard: options.keyboard !== false,
            actions: options.actions || [],
            onShow: options.onShow || null,
            onHide: options.onHide || null,
            onDestroy: options.onDestroy || null,
            element: null,
            visible: false
        };
        
        // Créer l'élément DOM
        modal.element = this.createElement(modal);
        
        // Stocker la modale
        this.modals.set(modalId, modal);
        
        return modal;
    }
    
    /**
     * Créer l'élément DOM de la modale
     */
    createElement(modal) {
        const element = document.createElement('div');
        element.className = `modal modal-${modal.size}`;
        element.setAttribute('data-modal-id', modal.id);
        element.style.zIndex = this.zIndexBase + this.modalCount++;
        
        element.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">${modal.title}</h4>
                        ${modal.closable ? `
                            <button type="button" class="modal-close" data-dismiss="modal">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : ''}
                    </div>
                    
                    <div class="modal-body">
                        ${modal.content}
                    </div>
                    
                    ${modal.actions.length > 0 ? `
                        <div class="modal-footer">
                            <div class="modal-actions">
                                ${modal.actions.map(action => `
                                    <button type="button" 
                                            class="btn ${action.class || 'btn-outline'}" 
                                            data-action="${action.id}"
                                            ${action.dismiss ? 'data-dismiss="modal"' : ''}>
                                        ${action.icon ? `<i class="${action.icon}"></i>` : ''}
                                        ${action.label}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Lier les événements
        this.bindModalEvents(element, modal);
        
        return element;
    }
    
    /**
     * Lier les événements d'une modale
     */
    bindModalEvents(element, modal) {
        // Bouton de fermeture
        const closeBtn = element.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide(modal.id));
        }
        
        // Backdrop
        const backdrop = element.querySelector('.modal-backdrop');
        if (backdrop && modal.backdrop) {
            backdrop.addEventListener('click', () => this.hide(modal.id));
        }
        
        // Actions personnalisées
        const actionBtns = element.querySelectorAll('[data-action]');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const actionId = btn.dataset.action;
                const action = modal.actions.find(a => a.id === actionId);
                
                if (action && action.handler) {
                    const result = action.handler(e, modal);
                    
                    // Fermer automatiquement si l'action retourne true
                    if (result === true || btn.hasAttribute('data-dismiss')) {
                        this.hide(modal.id);
                    }
                }
            });
        });
        
        // Gestion du clavier
        if (modal.keyboard) {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.closable) {
                    this.hide(modal.id);
                }
            });
        }
    }
    
    /**
     * Afficher une modale
     */
    show(modalId) {
        const modal = this.modals.get(modalId);
        if (!modal) {
            logger.error('Modal not found:', modalId);
            return;
        }
        
        if (modal.visible) {
            return; // Déjà visible
        }
        
        // Masquer la modale courante s'il y en a une
        if (this.currentModal && this.currentModal !== modalId) {
            this.hide(this.currentModal);
        }
        
        // Ajouter au DOM
        this.container.appendChild(modal.element);
        
        // Déclencher l'affichage avec une petite animation
        setTimeout(() => {
            modal.element.classList.add('show');
            modal.visible = true;
            this.currentModal = modalId;
            
            // Bloquer le scroll du body
            document.body.classList.add('modal-open');
            
            // Focus sur le premier élément focusable
            this.focusFirstElement(modal.element);
            
            // Callback onShow
            if (modal.onShow) {
                modal.onShow(modal);
            }
            
            // Émettre l'événement
            this.emitEvent('shown', modal);
        }, 10);
    }
    
    /**
     * Masquer une modale
     */
    hide(modalId) {
        const modal = this.modals.get(modalId);
        if (!modal || !modal.visible) {
            return;
        }
        
        // Animation de fermeture
        modal.element.classList.remove('show');
        modal.visible = false;
        
        // Callback onHide
        if (modal.onHide) {
            modal.onHide(modal);
        }
        
        // Émettre l'événement
        this.emitEvent('hidden', modal);
        
        // Supprimer du DOM après l'animation
        setTimeout(() => {
            if (modal.element.parentNode) {
                modal.element.parentNode.removeChild(modal.element);
            }
            
            // Restaurer le scroll si c'était la dernière modale
            if (this.currentModal === modalId) {
                document.body.classList.remove('modal-open');
                this.currentModal = null;
            }
        }, 300);
    }
    
    /**
     * Fermer toutes les modales
     */
    hideAll() {
        for (const [modalId, modal] of this.modals) {
            if (modal.visible) {
                this.hide(modalId);
            }
        }
    }
    
    /**
     * Détruire une modale
     */
    destroy(modalId) {
        const modal = this.modals.get(modalId);
        if (!modal) return;
        
        // Masquer d'abord
        this.hide(modalId);
        
        // Callback onDestroy
        if (modal.onDestroy) {
            modal.onDestroy(modal);
        }
        
        // Supprimer de la collection
        this.modals.delete(modalId);
        
        // Émettre l'événement
        this.emitEvent('destroyed', modal);
    }
    
    /**
     * Mettre à jour le contenu d'une modale
     */
    updateContent(modalId, content) {
        const modal = this.modals.get(modalId);
        if (!modal) return;
        
        modal.content = content;
        
        const bodyElement = modal.element.querySelector('.modal-body');
        if (bodyElement) {
            bodyElement.innerHTML = content;
        }
    }
    
    /**
     * Mettre à jour le titre d'une modale
     */
    updateTitle(modalId, title) {
        const modal = this.modals.get(modalId);
        if (!modal) return;
        
        modal.title = title;
        
        const titleElement = modal.element.querySelector('.modal-title');
        if (titleElement) {
            titleElement.textContent = title;
        }
    }
    
    /**
     * Ajouter des actions à une modale
     */
    addActions(modalId, actions) {
        const modal = this.modals.get(modalId);
        if (!modal) return;
        
        modal.actions = [...modal.actions, ...actions];
        
        // Recréer le footer
        this.updateModalFooter(modal);
    }
    
    /**
     * Mettre à jour le footer d'une modale
     */
    updateModalFooter(modal) {
        const footerElement = modal.element.querySelector('.modal-footer');
        
        if (modal.actions.length === 0) {
            if (footerElement) {
                footerElement.remove();
            }
            return;
        }
        
        const footerHTML = `
            <div class="modal-footer">
                <div class="modal-actions">
                    ${modal.actions.map(action => `
                        <button type="button" 
                                class="btn ${action.class || 'btn-outline'}" 
                                data-action="${action.id}"
                                ${action.dismiss ? 'data-dismiss="modal"' : ''}>
                            ${action.icon ? `<i class="${action.icon}"></i>` : ''}
                            ${action.label}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        if (footerElement) {
            footerElement.outerHTML = footerHTML;
        } else {
            modal.element.querySelector('.modal-content').insertAdjacentHTML('beforeend', footerHTML);
        }
        
        // Rebind les événements pour les nouvelles actions
        this.bindModalEvents(modal.element, modal);
    }
    
    /**
     * Obtenir ou créer le conteneur des modales
     */
    getOrCreateContainer() {
        let container = document.getElementById('modals-container');
        
        if (!container) {
            container = document.createElement('div');
            container.id = 'modals-container';
            container.className = 'modals-container';
            document.body.appendChild(container);
        }
        
        return container;
    }
    
    /**
     * Lier les événements globaux
     */
    bindGlobalEvents() {
        // Échap pour fermer la modale courante
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                const modal = this.modals.get(this.currentModal);
                if (modal && modal.keyboard && modal.closable) {
                    this.hide(this.currentModal);
                }
            }
        });
    }
    
    /**
     * Focuser le premier élément
     */
    focusFirstElement(modalElement) {
        const focusableElements = modalElement.querySelectorAll(
            'input, button, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }
    
    /**
     * Générer un ID unique
     */
    generateId() {
        return `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    /**
     * Émettre un événement
     */
    emitEvent(eventType, modal) {
        const event = new CustomEvent(`oweo:modal:${eventType}`, {
            detail: { modal }
        });
        document.dispatchEvent(event);
    }
    
    /**
     * Méthodes utilitaires pour créer des modales courantes
     */
    
    /**
     * Modale de confirmation
     */
    confirm(options = {}) {
        return new Promise((resolve) => {
            const modal = this.create({
                title: options.title || 'Confirmation',
                content: `
                    <div class="confirm-modal">
                        <div class="confirm-icon ${options.type || 'warning'}">
                            <i class="fas fa-${options.type === 'danger' ? 'exclamation-triangle' : 'question-circle'}"></i>
                        </div>
                        <div class="confirm-content">
                            <p>${options.message || 'Êtes-vous sûr ?'}</p>
                        </div>
                    </div>
                `,
                size: options.size || 'sm',
                actions: [
                    {
                        id: 'cancel',
                        label: options.cancelLabel || 'Annuler',
                        class: 'btn-outline',
                        handler: () => {
                            resolve(false);
                            return true;
                        }
                    },
                    {
                        id: 'confirm',
                        label: options.confirmLabel || 'Confirmer',
                        class: options.type === 'danger' ? 'btn-danger' : 'btn-primary',
                        handler: () => {
                            resolve(true);
                            return true;
                        }
                    }
                ]
            });
            
            this.show(modal.id);
        });
    }
    
    /**
     * Modale d'alerte
     */
    alert(options = {}) {
        return new Promise((resolve) => {
            const modal = this.create({
                title: options.title || 'Information',
                content: `
                    <div class="alert-modal">
                        <div class="alert-icon ${options.type || 'info'}">
                            <i class="fas fa-${this.getAlertIcon(options.type)}"></i>
                        </div>
                        <div class="alert-content">
                            <p>${options.message}</p>
                        </div>
                    </div>
                `,
                size: options.size || 'sm',
                actions: [
                    {
                        id: 'ok',
                        label: options.buttonLabel || 'OK',
                        class: 'btn-primary',
                        handler: () => {
                            resolve();
                            return true;
                        }
                    }
                ]
            });
            
            this.show(modal.id);
        });
    }
    
    /**
     * Obtenir l'icône selon le type d'alerte
     */
    getAlertIcon(type) {
        const icons = {
            'success': 'check-circle',
            'warning': 'exclamation-triangle',
            'danger': 'times-circle',
            'error': 'times-circle',
            'info': 'info-circle'
        };
        
        return icons[type] || 'info-circle';
    }
    
    /**
     * Obtenir les informations sur les modales
     */
    getInfo() {
        return {
            total: this.modals.size,
            visible: Array.from(this.modals.values()).filter(m => m.visible).length,
            current: this.currentModal,
            modals: Array.from(this.modals.keys())
        };
    }
}

// Créer une instance globale
window.modalSystem = new ModalSystem();

// Exposer la classe aussi
window.ModalSystem = ModalSystem;