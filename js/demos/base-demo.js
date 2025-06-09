// ========================================
// js/demos/base-demo.js - Classe de base pour les démos
// ========================================

class BaseDemo extends BasePage {
    constructor(options = {}) {
        super(options);
        
        this.requireClientAccess = options.requireClientAccess !== false;
        this.demoData = options.demoData || {};
        this.currentStep = 1;
        this.maxSteps = options.maxSteps || 3;
        this.isCompleted = false;
    }
    
    async onInit() {
        // Vérifier l'accès client si requis
        if (this.requireClientAccess && window.OweoClientAccess) {
            if (!window.OweoClientAccess.hasAccess()) {
                window.OweoClientAccess.showAuthModal(this.id);
                return;
            }
        }
        
        await super.onInit();
    }
    
    getTemplate() {
        return `
            <div class="demo-page" data-demo="${this.id}">
                <!-- Demo Header -->
                <div class="demo-header">
                    <div class="container">
                        <div class="demo-header-content">
                            <div class="demo-info">
                                <h1 class="demo-title">${this.title}</h1>
                                <p class="demo-description">${this.description}</p>
                                ${this.requireClientAccess ? `
                                    <div class="demo-access-badge">
                                        <i class="fas fa-user-lock"></i>
                                        Accès client requis
                                    </div>
                                ` : ''}
                            </div>
                            <div class="demo-progress">
                                <div class="progress-info">
                                    <span>Étape ${this.currentStep} sur ${this.maxSteps}</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${(this.currentStep / this.maxSteps) * 100}%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Demo Content -->
                <div class="demo-content">
                    <div class="container">
                        ${this.getContent()}
                    </div>
                </div>
                
                <!-- Demo Footer -->
                <div class="demo-footer">
                    <div class="container">
                        <div class="demo-navigation">
                            ${this.getNavigationControls()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    getContent() {
        // À implémenter dans les classes enfants
        return `
            <div class="demo-placeholder">
                <div class="placeholder-content">
                    <i class="fas fa-cog fa-3x"></i>
                    <h3>Démo en cours de développement</h3>
                    <p>Cette démonstration sera bientôt disponible.</p>
                </div>
            </div>
        `;
    }
    
    getNavigationControls() {
        return `
            <div class="navigation-controls">
                ${this.currentStep > 1 ? `
                    <button class="btn btn-outline" onclick="this.previousStep()">
                        <i class="fas fa-arrow-left"></i>
                        Étape précédente
                    </button>
                ` : ''}
                
                <div class="navigation-center">
                    <button class="btn btn-secondary" onclick="this.resetDemo()">
                        <i class="fas fa-redo"></i>
                        Recommencer
                    </button>
                </div>
                
                ${this.currentStep < this.maxSteps ? `
                    <button class="btn btn-primary" onclick="this.nextStep()">
                        Étape suivante
                        <i class="fas fa-arrow-right"></i>
                    </button>
                ` : `
                    <button class="btn btn-success" onclick="this.completeDemo()">
                        <i class="fas fa-check"></i>
                        Terminer la démo
                    </button>
                `}
            </div>
        `;
    }
    
    async onMount() {
        await super.onMount();
        
        // Analytics pour le démarrage de la démo
        this.trackDemoStart();
        
        // Exposer l'instance pour les événements onclick
        window.currentDemo = this;
    }
    
    nextStep() {
        if (this.currentStep < this.maxSteps) {
            this.currentStep++;
            this.updateProgress();
            this.trackStepNavigation('next');
            
            // Hook pour les classes enfants
            this.onStepChange();
        }
    }
    
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateProgress();
            this.trackStepNavigation('previous');
            
            // Hook pour les classes enfants
            this.onStepChange();
        }
    }
    
    resetDemo() {
        this.currentStep = 1;
        this.isCompleted = false;
        this.updateProgress();
        this.trackDemoReset();
        
        // Hook pour les classes enfants
        this.onReset();
    }
    
    completeDemo() {
        this.isCompleted = true;
        this.trackDemoCompletion();
        
        // Hook pour les classes enfants
        this.onComplete();
        
        // Notification de fin
        this.showCompletionNotification();
    }
    
    updateProgress() {
        const progressBar = document.querySelector('.progress-fill');
        const progressInfo = document.querySelector('.progress-info span');
        
        if (progressBar) {
            progressBar.style.width = `${(this.currentStep / this.maxSteps) * 100}%`;
        }
        
        if (progressInfo) {
            progressInfo.textContent = `Étape ${this.currentStep} sur ${this.maxSteps}`;
        }
        
        // Mettre à jour la navigation
        const navigationContainer = document.querySelector('.demo-navigation');
        if (navigationContainer) {
            navigationContainer.innerHTML = this.getNavigationControls();
        }
    }
    
    showCompletionNotification() {
        const notification = {
            title: 'Démo terminée !',
            message: `Vous avez terminé la démonstration "${this.title}".`,
            type: 'success',
            duration: 5000,
            actions: [
                {
                    label: 'Recommencer',
                    action: () => this.resetDemo()
                },
                {
                    label: 'Retour à l\'accueil',
                    action: () => this.navigateHome()
                }
            ]
        };
        
        if (window.notifications) {
            window.notifications.show(notification);
        } else {
            alert(notification.message);
        }
    }
    
    navigateHome() {
        if (window.app && window.app.router) {
            window.app.router.navigate('home');
        }
    }
    
    // Hooks pour les classes enfants
    onStepChange() {
        // À implémenter dans les classes enfants
    }
    
    onReset() {
        // À implémenter dans les classes enfants
    }
    
    onComplete() {
        // À implémenter dans les classes enfants
    }
    
    // Analytics
    trackDemoStart() {
        if (window.oweoAnalytics) {
            window.oweoAnalytics.track('demo_started', {
                demo_id: this.id,
                demo_title: this.title,
                requires_access: this.requireClientAccess
            });
        }
    }
    
    trackStepNavigation(direction) {
        if (window.oweoAnalytics) {
            window.oweoAnalytics.track('demo_step_navigation', {
                demo_id: this.id,
                step: this.currentStep,
                direction,
                max_steps: this.maxSteps
            });
        }
    }
    
    trackDemoCompletion() {
        if (window.oweoAnalytics) {
            window.oweoAnalytics.track('demo_completed', {
                demo_id: this.id,
                demo_title: this.title,
                total_steps: this.maxSteps,
                completion_time: Date.now()
            });
        }
    }
    
    trackDemoReset() {
        if (window.oweoAnalytics) {
            window.oweoAnalytics.track('demo_reset', {
                demo_id: this.id,
                step_when_reset: this.currentStep
            });
        }
    }
    
    // Utilitaires
    formatNumber(number, decimals = 2) {
        return new Intl.NumberFormat('fr-FR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(number);
    }
    
    formatCurrency(amount, currency = 'EUR') {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency
        }).format(amount);
    }
    
    formatDate(date, options = {}) {
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            ...options
        }).format(date);
    }
    
    generateSampleData(type, count = 10) {
        const sampleData = {
            materials: [
                { name: 'Acier S235', price: 1.2, unit: 'kg' },
                { name: 'Acier S355', price: 1.4, unit: 'kg' },
                { name: 'Inox 304L', price: 8.5, unit: 'kg' },
                { name: 'Aluminium 6060', price: 3.2, unit: 'kg' }
            ],
            operations: [
                { name: 'Découpe laser', cost: 45, unit: 'h' },
                { name: 'Pliage', cost: 35, unit: 'h' },
                { name: 'Soudage', cost: 55, unit: 'h' },
                { name: 'Perçage', cost: 25, unit: 'h' }
            ],
            projects: [
                { name: 'Hangar industriel', type: 'Construction', budget: 250000 },
                { name: 'Passerelle piétonne', type: 'Infrastructure', budget: 85000 },
                { name: 'Escalier métallique', type: 'Aménagement', budget: 15000 }
            ]
        };
        
        return sampleData[type] ? sampleData[type].slice(0, count) : [];
    }
    
    simulateAPICall(data, delay = 1000) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data,
                    timestamp: new Date().toISOString()
                });
            }, delay);
        });
    }
    
    showLoading(element, message = 'Chargement...') {
        if (element) {
            element.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <p>${message}</p>
                </div>
            `;
        }
    }
    
    hideLoading(element, content) {
        if (element) {
            element.innerHTML = content;
        }
    }
}

// Exposer la classe
window.BaseDemo = BaseDemo;