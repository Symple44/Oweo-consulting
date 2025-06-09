// ========================================
// js/utils/client-access.js - Système d'accès client
// ========================================

class OweoClientAccess {
    constructor() {
        this.hasAccessFlag = false;
        this.clientCode = null;
        this.accessToken = null;
        this.sessionTimeout = 3600000; // 1 heure
        this.validCodes = [
            'DEMO-CLIENT',
            'OWEO-2024',
            'METAL-PRO',
            'CHARP-EXPERT'
        ];
        
        // Charger l'état depuis le sessionStorage (en mode développement uniquement)
        this.loadSession();
    }
    
    /**
     * Vérifier si l'utilisateur a l'accès
     */
    hasAccess() {
        return this.hasAccessFlag && this.isSessionValid();
    }
    
    /**
     * Authentifier avec un code client
     */
    authenticate(code) {
        if (!code) return false;
        
        const normalizedCode = code.toUpperCase().trim();
        
        if (this.validCodes.includes(normalizedCode)) {
            this.hasAccessFlag = true;
            this.clientCode = normalizedCode;
            this.accessToken = this.generateToken();
            
            // Sauvegarder la session
            this.saveSession();
            
            console.log('✅ Accès client accordé:', normalizedCode);
            
            // Émettre un événement d'authentification
            this.emitAuthEvent('authenticated', { code: normalizedCode });
            
            return true;
        }
        
        console.log('❌ Code client invalide:', normalizedCode);
        this.emitAuthEvent('authentication_failed', { code: normalizedCode });
        
        return false;
    }
    
    /**
     * Déconnecter l'utilisateur
     */
    logout() {
        this.hasAccessFlag = false;
        this.clientCode = null;
        this.accessToken = null;
        
        this.clearSession();
        
        console.log('🚪 Déconnexion client');
        this.emitAuthEvent('logout');
        
        // Rediriger vers l'accueil
        if (window.app && window.app.router) {
            window.app.router.navigate('home');
        }
    }
    
    /**
     * Afficher le modal d'authentification
     */
    showAuthModal(targetDemo = null) {
        if (this.hasAccess()) {
            // Si déjà authentifié, naviguer directement
            if (targetDemo) {
                this.navigateToDemo(targetDemo);
            }
            return;
        }
        
        const modal = this.createAuthModal(targetDemo);
        document.body.appendChild(modal);
        
        // Animer l'ouverture
        setTimeout(() => {
            modal.classList.add('show');
            const input = modal.querySelector('#client-code-input');
            if (input) input.focus();
        }, 10);
    }
    
    /**
     * Créer le modal d'authentification
     */
    createAuthModal(targetDemo) {
        const modal = document.createElement('div');
        modal.className = 'client-auth-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-container">
                <div class="modal-header">
                    <div class="modal-icon">
                        <i class="fas fa-user-lock"></i>
                    </div>
                    <h3>Accès Client Requis</h3>
                    <p>Veuillez saisir votre code d'accès pour continuer</p>
                    <button class="modal-close" onclick="this.closest('.client-auth-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <form id="auth-form" onsubmit="return false;">
                        <div class="form-group">
                            <label for="client-code-input">Code d'accès client</label>
                            <input type="text" 
                                   id="client-code-input" 
                                   class="form-control" 
                                   placeholder="Ex: DEMO-CLIENT"
                                   autocomplete="off"
                                   required>
                            <div class="form-help">
                                Votre code d'accès vous a été fourni par votre conseiller Oweo
                            </div>
                        </div>
                        
                        <div class="auth-error" id="auth-error" style="display: none;">
                            <i class="fas fa-exclamation-circle"></i>
                            <span>Code d'accès invalide</span>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-outline" onclick="this.closest('.client-auth-modal').remove()">
                                Annuler
                            </button>
                            <button type="submit" class="btn btn-primary" id="auth-submit">
                                <i class="fas fa-unlock"></i>
                                Accéder
                            </button>
                        </div>
                    </form>
                    
                    <div class="demo-access-info">
                        <div class="info-card">
                            <h4>🚀 Accès démo disponible</h4>
                            <p>Utilisez le code <strong>DEMO-CLIENT</strong> pour accéder aux démonstrations.</p>
                        </div>
                        
                        <div class="contact-info">
                            <h5>Besoin d'un accès ?</h5>
                            <p>Contactez-nous pour obtenir vos codes d'accès personnalisés :</p>
                            <div class="contact-methods">
                                <a href="tel:+33123456789" class="contact-method">
                                    <i class="fas fa-phone"></i>
                                    01 23 45 67 89
                                </a>
                                <a href="mailto:contact@oweo.fr" class="contact-method">
                                    <i class="fas fa-envelope"></i>
                                    contact@oweo.fr
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Gérer la soumission du formulaire
        const form = modal.querySelector('#auth-form');
        const input = modal.querySelector('#client-code-input');
        const submitBtn = modal.querySelector('#auth-submit');
        const errorDiv = modal.querySelector('#auth-error');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAuthSubmit(input.value, modal, targetDemo, errorDiv, submitBtn);
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleAuthSubmit(input.value, modal, targetDemo, errorDiv, submitBtn);
            }
        });
        
        // Fermer en cliquant sur le backdrop
        modal.querySelector('.modal-backdrop').addEventListener('click', () => {
            modal.remove();
        });
        
        return modal;
    }
    
    /**
     * Gérer la soumission d'authentification
     */
    handleAuthSubmit(code, modal, targetDemo, errorDiv, submitBtn) {
        // UI de chargement
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Vérification...';
        errorDiv.style.display = 'none';
        
        // Simuler un délai de vérification
        setTimeout(() => {
            if (this.authenticate(code)) {
                // Succès
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Accès autorisé';
                submitBtn.classList.remove('btn-primary');
                submitBtn.classList.add('btn-success');
                
                setTimeout(() => {
                    modal.remove();
                    
                    // Naviguer vers la démo si spécifiée
                    if (targetDemo) {
                        this.navigateToDemo(targetDemo);
                    }
                    
                    // Notification de succès
                    this.showSuccessNotification();
                }, 1000);
                
            } else {
                // Échec
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-unlock"></i> Accéder';
                errorDiv.style.display = 'flex';
                
                // Secouer le modal
                modal.querySelector('.modal-container').classList.add('shake');
                setTimeout(() => {
                    modal.querySelector('.modal-container').classList.remove('shake');
                }, 600);
            }
        }, 1500);
    }
    
    /**
     * Naviguer vers une démo
     */
    navigateToDemo(demoId) {
        if (window.app && window.app.router) {
            window.app.router.navigate(demoId);
        }
    }
    
    /**
     * Afficher une notification de succès
     */
    showSuccessNotification() {
        if (window.notifications) {
            window.notifications.success('Accès client autorisé ! Bienvenue dans l\'espace démo.');
        } else {
            // Fallback simple
            console.log('✅ Accès autorisé');
        }
    }
    
    /**
     * Générer un token d'accès
     */
    generateToken() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return btoa(`${this.clientCode}:${timestamp}:${random}`);
    }
    
    /**
     * Vérifier si la session est valide
     */
    isSessionValid() {
        if (!this.accessToken) return false;
        
        try {
            const decoded = atob(this.accessToken);
            const [code, timestamp] = decoded.split(':');
            const sessionAge = Date.now() - parseInt(timestamp);
            
            return sessionAge < this.sessionTimeout;
        } catch (error) {
            return false;
        }
    }
    
    /**
     * Sauvegarder la session (version simplifiée pour la démo)
     */
    saveSession() {
        try {
            const sessionData = {
                hasAccess: this.hasAccessFlag,
                clientCode: this.clientCode,
                accessToken: this.accessToken,
                timestamp: Date.now()
            };
            
            // Dans un vrai projet, utilisez sessionStorage ou un système plus sécurisé
            window._oweoSession = sessionData;
            
        } catch (error) {
            console.warn('Impossible de sauvegarder la session:', error);
        }
    }
    
    /**
     * Charger la session sauvegardée
     */
    loadSession() {
        try {
            const sessionData = window._oweoSession;
            
            if (sessionData && sessionData.accessToken) {
                this.hasAccessFlag = sessionData.hasAccess;
                this.clientCode = sessionData.clientCode;
                this.accessToken = sessionData.accessToken;
                
                // Vérifier que la session est encore valide
                if (!this.isSessionValid()) {
                    this.clearSession();
                }
            }
            
        } catch (error) {
            console.warn('Impossible de charger la session:', error);
        }
    }
    
    /**
     * Supprimer la session
     */
    clearSession() {
        try {
            delete window._oweoSession;
        } catch (error) {
            console.warn('Impossible de supprimer la session:', error);
        }
    }
    
    /**
     * Émettre des événements d'authentification
     */
    emitAuthEvent(eventType, data = {}) {
        const event = new CustomEvent(`oweo:auth:${eventType}`, {
            detail: data
        });
        document.dispatchEvent(event);
        
        // Aussi via l'EventBus si disponible
        if (window.app && window.app.eventBus) {
            window.app.eventBus.emit(`auth:${eventType}`, data);
        }
    }
    
    /**
     * Obtenir les informations client
     */
    getClientInfo() {
        return {
            hasAccess: this.hasAccess(),
            clientCode: this.clientCode,
            sessionValid: this.isSessionValid(),
            timeRemaining: this.getSessionTimeRemaining()
        };
    }
    
    /**
     * Obtenir le temps restant de session
     */
    getSessionTimeRemaining() {
        if (!this.accessToken) return 0;
        
        try {
            const decoded = atob(this.accessToken);
            const [code, timestamp] = decoded.split(':');
            const sessionAge = Date.now() - parseInt(timestamp);
            const remaining = Math.max(0, this.sessionTimeout - sessionAge);
            
            return Math.floor(remaining / 1000); // en secondes
        } catch (error) {
            return 0;
        }
    }
    
    /**
     * Ajouter un indicateur de statut dans la navbar
     */
    addStatusIndicator() {
        const navbar = document.querySelector('.navbar-actions');
        if (!navbar || document.querySelector('.client-status-indicator')) return;
        
        const indicator = document.createElement('div');
        indicator.className = 'client-status-indicator';
        indicator.innerHTML = `
            <div class="status-badge ${this.hasAccess() ? 'authenticated' : 'guest'}">
                <i class="fas fa-${this.hasAccess() ? 'user-check' : 'user'}"></i>
                <span>${this.hasAccess() ? this.clientCode : 'Invité'}</span>
                ${this.hasAccess() ? `
                    <button class="logout-btn" onclick="window.OweoClientAccess.logout()" title="Se déconnecter">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                ` : ''}
            </div>
        `;
        
        navbar.insertBefore(indicator, navbar.firstChild);
    }
    
    /**
     * Mettre à jour l'indicateur de statut
     */
    updateStatusIndicator() {
        const indicator = document.querySelector('.client-status-indicator');
        if (indicator) {
            indicator.remove();
        }
        this.addStatusIndicator();
    }
}

// Créer une instance globale
window.OweoClientAccess = new OweoClientAccess();

// Écouter les changements de route pour mettre à jour l'indicateur
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter l'indicateur de statut
    setTimeout(() => {
        window.OweoClientAccess.addStatusIndicator();
    }, 1000);
});

// Mettre à jour l'indicateur lors des changements d'authentification
document.addEventListener('oweo:auth:authenticated', () => {
    window.OweoClientAccess.updateStatusIndicator();
});

document.addEventListener('oweo:auth:logout', () => {
    window.OweoClientAccess.updateStatusIndicator();
});