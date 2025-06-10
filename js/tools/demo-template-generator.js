// ========================================
// js/tools/demo-template-generator.js - Générateur de templates de démos
// ========================================

class DemoTemplateGenerator {
    
    static generateBasicDemo(config) {
        const {
            id,
            title,
            description,
            category = 'Custom',
            icon = 'fas fa-cog',
            requireClientAccess = true
        } = config;
        
        const className = this.toPascalCase(id);
        
        return `// js/demos/${id}.js - ${title}
// Généré automatiquement par DemoTemplateGenerator

class ${className} extends BaseDemo {
    constructor() {
        super({
            id: '${id}',
            title: '${title}',
            requireClientAccess: ${requireClientAccess}
        });
        
        // Données spécifiques à votre démo
        this.data = {
            // Ajoutez vos données ici
        };
        
        // État de la démo
        this.currentStep = 1;
        this.maxSteps = 3;
    }
    
    getContent() {
        return \`
            <div class="${id}">
                <!-- En-tête de la démo -->
                <div class="demo-header-custom">
                    <div class="demo-icon-large">
                        <i class="${icon}"></i>
                    </div>
                    <div class="demo-info">
                        <h2>${title}</h2>
                        <p>${description}</p>
                        <div class="demo-progress">
                            Étape \${this.currentStep} sur \${this.maxSteps}
                        </div>
                    </div>
                </div>
                
                <!-- Contenu principal -->
                <div class="demo-main-content">
                    \${this.renderCurrentStep()}
                </div>
                
                <!-- Navigation -->
                <div class="demo-navigation">
                    \${this.currentStep > 1 ? \`
                        <button class="btn btn-secondary" onclick="${id}Instance.previousStep()">
                            <i class="fas fa-arrow-left"></i>
                            Précédent
                        </button>
                    \` : ''}
                    
                    \${this.currentStep < this.maxSteps ? \`
                        <button class="btn btn-primary ml-auto" onclick="${id}Instance.nextStep()">
                            Suivant
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    \` : \`
                        <button class="btn btn-success ml-auto" onclick="${id}Instance.complete()">
                            <i class="fas fa-check"></i>
                            Terminer
                        </button>
                    \`}
                </div>
            </div>
        \`;
    }
    
    renderCurrentStep() {
        switch (this.currentStep) {
            case 1:
                return this.renderStep1();
            case 2:
                return this.renderStep2();
            case 3:
                return this.renderStep3();
            default:
                return '<p>Étape non définie</p>';
        }
    }
    
    renderStep1() {
        return \`
            <div class="demo-step">
                <h3>Étape 1 : Configuration</h3>
                <div class="step-content">
                    <p>Configurez les paramètres de base de votre ${title.toLowerCase()}.</p>
                    
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="param1">Paramètre 1</label>
                            <input type="text" id="param1" class="form-control" 
                                   placeholder="Entrez la valeur">
                        </div>
                        <div class="form-group">
                            <label for="param2">Paramètre 2</label>
                            <select id="param2" class="form-control">
                                <option value="">Sélectionnez...</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="step-help">
                        <i class="fas fa-info-circle"></i>
                        <span>Conseil : Commencez par les paramètres par défaut</span>
                    </div>
                </div>
            </div>
        \`;
    }
    
    renderStep2() {
        return \`
            <div class="demo-step">
                <h3>Étape 2 : Traitement</h3>
                <div class="step-content">
                    <p>Traitez les données selon vos paramètres.</p>
                    
                    <div class="processing-area">
                        <div class="processing-status">
                            <i class="fas fa-spinner fa-spin"></i>
                            <span>Traitement en cours...</span>
                        </div>
                        
                        <div class="processing-results" style="display: none;">
                            <h4>Résultats :</h4>
                            <ul id="results-list">
                                <!-- Résultats générés dynamiquement -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        \`;
    }
    
    renderStep3() {
        return \`
            <div class="demo-step">
                <h3>Étape 3 : Résultats</h3>
                <div class="step-content">
                    <p>Consultez et exportez vos résultats.</p>
                    
                    <div class="results-summary">
                        <div class="summary-card">
                            <h4>Résumé</h4>
                            <div class="summary-stats">
                                <div class="stat-item">
                                    <span class="stat-value">100%</span>
                                    <span class="stat-label">Complété</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-value">0</span>
                                    <span class="stat-label">Erreurs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="export-actions">
                        <button class="btn btn-outline" onclick="${id}Instance.exportPDF()">
                            <i class="fas fa-file-pdf"></i>
                            Exporter PDF
                        </button>
                        <button class="btn btn-outline" onclick="${id}Instance.exportExcel()">
                            <i class="fas fa-file-excel"></i>
                            Exporter Excel
                        </button>
                    </div>
                </div>
            </div>
        \`;
    }
    
    onMount() {
        super.onMount();
        
        // Exposer l'instance globalement pour les événements onclick
        window.${id}Instance = this;
        
        // Initialiser les événements spécifiques
        this.bindCustomEvents();
        
        // Simuler le traitement à l'étape 2
        if (this.currentStep === 2) {
            this.simulateProcessing();
        }
    }
    
    bindCustomEvents() {
        // Ajouter vos événements personnalisés ici
        
        // Exemple : validation en temps réel
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateInput(input));
        });
    }
    
    validateInput(input) {
        // Logique de validation personnalisée
        if (input.value.trim()) {
            input.classList.remove('error');
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
        }
    }
    
    nextStep() {
        if (this.currentStep < this.maxSteps) {
            this.currentStep++;
            this.updateView();
            
            // Analytics
            if (window.oweoAnalytics) {
                window.oweoAnalytics.track('demo_step', {
                    demo_id: '${id}',
                    step: this.currentStep
                });
            }
        }
    }
    
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateView();
        }
    }
    
    updateView() {
        const container = document.querySelector('.demo-main-content');
        if (container) {
            container.innerHTML = this.renderCurrentStep();
        }
        
        const navigation = document.querySelector('.demo-navigation');
        if (navigation) {
            navigation.innerHTML = this.getNavigationHTML();
        }
        
        // Rebind events après mise à jour
        this.bindCustomEvents();
        
        // Actions spécifiques par étape
        if (this.currentStep === 2) {
            setTimeout(() => this.simulateProcessing(), 500);
        }
    }
    
    getNavigationHTML() {
        return \`
            \${this.currentStep > 1 ? \`
                <button class="btn btn-secondary" onclick="${id}Instance.previousStep()">
                    <i class="fas fa-arrow-left"></i>
                    Précédent
                </button>
            \` : ''}
            
            \${this.currentStep < this.maxSteps ? \`
                <button class="btn btn-primary ml-auto" onclick="${id}Instance.nextStep()">
                    Suivant
                    <i class="fas fa-arrow-right"></i>
                </button>
            \` : \`
                <button class="btn btn-success ml-auto" onclick="${id}Instance.complete()">
                    <i class="fas fa-check"></i>
                    Terminer
                </button>
            \`}
        \`;
    }
    
    simulateProcessing() {
        const statusEl = document.querySelector('.processing-status');
        const resultsEl = document.querySelector('.processing-results');
        
        if (!statusEl || !resultsEl) return;
        
        // Simuler un délai de traitement
        setTimeout(() => {
            statusEl.style.display = 'none';
            resultsEl.style.display = 'block';
            
            // Générer des résultats factices
            const resultsList = document.getElementById('results-list');
            if (resultsList) {
                resultsList.innerHTML = \`
                    <li>✅ Traitement réussi pour 15 éléments</li>
                    <li>✅ Validation des données complète</li>
                    <li>✅ Génération du rapport terminée</li>
                \`;
            }
        }, 2000);
    }
    
    complete() {
        console.log('🎉 Démo ${title} terminée');
        
        // Notification
        if (window.notifications) {
            window.notifications.success('Démo terminée avec succès !');
        }
        
        // Analytics
        if (window.oweoAnalytics) {
            window.oweoAnalytics.track('demo_completed', {
                demo_id: '${id}',
                total_steps: this.maxSteps
            });
        }
        
        // Retour à l'accueil ou affichage des résultats finaux
        setTimeout(() => {
            if (window.app && window.app.router) {
                window.app.router.navigate('home');
            }
        }, 2000);
    }
    
    exportPDF() {
        console.log('📄 Export PDF ${title}');
        // Implémentez votre logique d'export PDF
        if (window.notifications) {
            window.notifications.info('Export PDF en cours...');
        }
    }
    
    exportExcel() {
        console.log('📊 Export Excel ${title}');
        // Implémentez votre logique d'export Excel
        if (window.notifications) {
            window.notifications.info('Export Excel en cours...');
        }
    }
}

// Enregistrer la démo automatiquement
if (typeof window !== 'undefined') {
    window.${className} = ${className};
    
    // Auto-enregistrement dans le router si disponible
    document.addEventListener('DOMContentLoaded', () => {
        if (window.app && window.app.router) {
            window.app.router.register('${id}', new ${className}());
            console.log('✅ Démo ${title} enregistrée');
        }
    });
}`;
    }
    
    static generateInteractiveDemo(config) {
        // Template pour démo plus complexe avec graphiques, API, etc.
        const basicDemo = this.generateBasicDemo(config);
        
        const additionalFeatures = `
    
    // Fonctionnalités avancées ajoutées automatiquement
    
    async loadDataFromAPI() {
        try {
            // Simuler un appel API
            const response = await fetch('/api/demo-data/${config.id}');
            if (!response.ok) throw new Error('Erreur API');
            
            this.data = await response.json();
            this.updateView();
            
        } catch (error) {
            console.error('Erreur chargement données:', error);
            if (window.notifications) {
                window.notifications.error('Impossible de charger les données');
            }
        }
    }
    
    initializeChart(containerId, data) {
        // Exemple d'intégration Chart.js
        if (typeof Chart !== 'undefined') {
            const ctx = document.getElementById(containerId);
            if (ctx) {
                new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: '${config.title} - Données'
                            }
                        }
                    }
                });
            }
        }
    }
    
    setupRealTimeUpdates() {
        // Simuler des mises à jour en temps réel
        this.updateInterval = setInterval(() => {
            this.refreshData();
        }, 5000);
    }
    
    refreshData() {
        // Mettre à jour les données en temps réel
        const timestamp = new Date().toLocaleTimeString();
        console.log(\`🔄 Mise à jour données \${timestamp}\`);
        
        // Mettre à jour l'interface si nécessaire
        const statusEl = document.querySelector('.real-time-status');
        if (statusEl) {
            statusEl.textContent = \`Dernière MAJ: \${timestamp}\`;
        }
    }
    
    destroy() {
        // Nettoyage lors de la fermeture
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        super.destroy();
    }`;
        
        return basicDemo + additionalFeatures;
    }
    
    static generateDemoCSS(id, primaryColor = '#00d4ff') {
        return `/* css/${id}.css - Styles pour ${id} */

.${id} {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-6);
}

/* En-tête personnalisé */
.demo-header-custom {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    margin-bottom: var(--space-8);
    padding: var(--space-8);
    background: linear-gradient(135deg, 
        rgba(0, 212, 255, 0.1) 0%, 
        rgba(124, 58, 237, 0.1) 100%);
    border-radius: var(--radius-xl);
    border: 1px solid rgba(0, 212, 255, 0.2);
}

.demo-icon-large {
    width: 80px;
    height: 80px;
    border-radius: var(--radius-xl);
    background: linear-gradient(135deg, ${primaryColor}, #7c3aed);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    flex-shrink: 0;
    box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
}

.demo-info {
    flex: 1;
}

.demo-info h2 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: var(--space-3);
    color: var(--text-primary);
}

.demo-info p {
    color: var(--text-secondary);
    margin-bottom: var(--space-4);
    font-size: 1.125rem;
}

.demo-progress {
    display: inline-block;
    background: ${primaryColor};
    color: white;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    font-weight: 600;
}

/* Contenu principal */
.demo-main-content {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: var(--space-8);
    margin-bottom: var(--space-6);
    min-height: 400px;
}

.demo-step h3 {
    color: var(--text-primary);
    margin-bottom: var(--space-6);
    font-size: 1.5rem;
    font-weight: 700;
}

.step-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
}

.step-help {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4);
    background: rgba(59, 130, 246, 0.1);
    border-radius: var(--radius-lg);
    color: #2563eb;
    font-size: 0.875rem;
}

/* Zone de traitement */
.processing-area {
    text-align: center;
    padding: var(--space-8);
}

.processing-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
}

.processing-status i {
    font-size: 2rem;
    color: ${primaryColor};
}

.processing-results {
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    text-align: left;
}

.processing-results h4 {
    margin-bottom: var(--space-4);
    color: var(--text-primary);
}

.processing-results ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.processing-results li {
    padding: var(--space-2) 0;
    border-bottom: 1px solid var(--border-light);
}

/* Résultats */
.results-summary {
    margin-bottom: var(--space-6);
}

.summary-card {
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    text-align: center;
}

.summary-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--space-4);
    margin-top: var(--space-4);
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-value {
    font-size: 2rem;
    font-weight: 800;
    color: ${primaryColor};
    display: block;
}

.stat-label {
    font-size: 0.875rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

/* Actions d'export */
.export-actions {
    display: flex;
    gap: var(--space-3);
    justify-content: center;
}

/* Navigation */
.demo-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-6);
}

/* Statut temps réel */
.real-time-status {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-align: center;
    margin-top: var(--space-2);
}

/* États des inputs */
.form-control.valid {
    border-color: var(--success-color);
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.form-control.error {
    border-color: var(--error-color);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
    .demo-header-custom {
        flex-direction: column;
        text-align: center;
    }
    
    .demo-icon-large {
        width: 60px;
        height: 60px;
        font-size: 1.5rem;
    }
    
    .demo-info h2 {
        font-size: 1.5rem;
    }
    
    .export-actions {
        flex-direction: column;
    }
    
    .summary-stats {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .demo-navigation {
        flex-direction: column;
        gap: var(--space-4);
    }
    
    .demo-navigation .ml-auto {
        margin-left: 0;
        width: 100%;
    }
}`;
    }
    
    static toPascalCase(str) {
        return str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
    }
    
    // Interface utilisateur pour générer des démos
    static showGenerator() {
        if (!window.modalSystem) {
            console.error('ModalSystem requis pour le générateur');
            return;
        }
        
        const modal = window.modalSystem.create({
            title: '🚀 Générateur de Démos Oweo',
            content: `
                <form id="demo-generator-form">
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="demo-id">ID de la démo *</label>
                            <input type="text" id="demo-id" class="form-control" 
                                   placeholder="ex: gestion-stock" required>
                            <small>Format: kebab-case (lettres, chiffres, tirets)</small>
                        </div>
                        
                        <div class="form-group">
                            <label for="demo-title">Titre *</label>
                            <input type="text" id="demo-title" class="form-control" 
                                   placeholder="ex: Gestion des Stocks" required>
                        </div>
                        
                        <div class="form-group col-span-2">
                            <label for="demo-description">Description</label>
                            <textarea id="demo-description" class="form-control" rows="2"
                                      placeholder="Description de la démo..."></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="demo-category">Catégorie</label>
                            <select id="demo-category" class="form-control">
                                <option value="Devis">Devis</option>
                                <option value="Production">Production</option>
                                <option value="Logistique">Logistique</option>
                                <option value="Gestion">Gestion</option>
                                <option value="Custom">Personnalisé</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="demo-icon">Icône FontAwesome</label>
                            <input type="text" id="demo-icon" class="form-control" 
                                   value="fas fa-cog" placeholder="fas fa-cog">
                        </div>
                        
                        <div class="form-group">
                            <label for="demo-type">Type de démo</label>
                            <select id="demo-type" class="form-control">
                                <option value="basic">Basique (3 étapes)</option>
                                <option value="interactive">Interactive (avancée)</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>
                                <input type="checkbox" id="require-access" checked>
                                Nécessite un accès client
                            </label>
                        </div>
                    </div>
                </form>
            `,
            size: 'lg'
        });
        
        window.modalSystem.addActions(modal.id, [
            {
                id: 'cancel',
                label: 'Annuler',
                class: 'btn-outline',
                handler: () => window.modalSystem.close(modal.id)
            },
            {
                id: 'generate',
                label: 'Générer la Démo',
                class: 'btn-primary',
                icon: 'fas fa-magic',
                handler: () => this.handleGeneration(modal.id)
            }
        ]);
        
        window.modalSystem.show(modal.id);
    }
    
    static handleGeneration(modalId) {
        const form = document.getElementById('demo-generator-form');
        const formData = new FormData(form);
        
        const config = {
            id: formData.get('demo-id') || document.getElementById('demo-id').value,
            title: formData.get('demo-title') || document.getElementById('demo-title').value,
            description: formData.get('demo-description') || document.getElementById('demo-description').value,
            category: document.getElementById('demo-category').value,
            icon: document.getElementById('demo-icon').value,
            requireClientAccess: document.getElementById('require-access').checked
        };
        
        // Validation
        if (!config.id || !config.title) {
            window.notifications?.error('ID et titre requis');
            return;
        }
        
        if (!/^[a-z0-9-]+$/.test(config.id)) {
            window.notifications?.error('ID invalide (utilisez kebab-case)');
            return;
        }
        
        // Génération
        const demoType = document.getElementById('demo-type').value;
        const jsCode = demoType === 'interactive' 
            ? this.generateInteractiveDemo(config)
            : this.generateBasicDemo(config);
        
        const cssCode = this.generateDemoCSS(config.id);
        
        // Affichage des résultats
        this.showGeneratedCode(config, jsCode, cssCode);
        
        window.modalSystem.close(modalId);
    }
    
    static showGeneratedCode(config, jsCode, cssCode) {
        const resultsModal = window.modalSystem.create({
            title: `✅ Démo "${config.title}" générée`,
            content: `
                <div class="generated-demo-results">
                    <div class="result-section">
                        <h4>📋 Instructions</h4>
                        <ol>
                            <li>Copiez le code JavaScript dans <code>js/demos/${config.id}.js</code></li>
                            <li>Copiez le code CSS dans <code>css/${config.id}.css</code></li>
                            <li>Ajoutez le CSS à votre index.html</li>
                            <li>Ajoutez la démo à la configuration</li>
                            <li>Testez votre nouvelle démo !</li>
                        </ol>
                    </div>
                    
                    <div class="result-section">
                        <h4>📄 Code JavaScript</h4>
                        <div class="code-container">
                            <button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">
                                <i class="fas fa-copy"></i> Copier
                            </button>
                            <pre><code>${this.escapeHtml(jsCode)}</code></pre>
                        </div>
                    </div>
                    
                    <div class="result-section">
                        <h4>🎨 Code CSS</h4>
                        <div class="code-container">
                            <button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">
                                <i class="fas fa-copy"></i> Copier
                            </button>
                            <pre><code>${this.escapeHtml(cssCode)}</code></pre>
                        </div>
                    </div>
                    
                    <div class="result-section">
                        <h4>⚙️ Configuration à ajouter</h4>
                        <div class="code-container">
                            <button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">
                                <i class="fas fa-copy"></i> Copier
                            </button>
                            <pre><code>${this.escapeHtml(this.generateDemoConfig(config))}</code></pre>
                        </div>
                    </div>
                </div>
                
                <style>
                .generated-demo-results {
                    max-height: 70vh;
                    overflow-y: auto;
                }
                
                .result-section {
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #e5e7eb;
                }
                
                .result-section:last-child {
                    border-bottom: none;
                }
                
                .code-container {
                    position: relative;
                    background: #f8fafc;
                    border-radius: 8px;
                    overflow: hidden;
                }
                
                .copy-btn {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: #3b82f6;
                    color: white;
                    border: none;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    cursor: pointer;
                    z-index: 1;
                }
                
                .copy-btn:hover {
                    background: #2563eb;
                }
                
                pre {
                    margin: 0;
                    padding: 1rem;
                    overflow-x: auto;
                    font-size: 12px;
                    line-height: 1.4;
                }
                
                code {
                    font-family: 'Monaco', 'Menlo', monospace;
                }
                </style>
            `,
            size: 'xl'
        });
        
        window.modalSystem.addActions(resultsModal.id, [
            {
                id: 'close',
                label: 'Fermer',
                class: 'btn-primary',
                handler: () => window.modalSystem.close(resultsModal.id)
            }
        ]);
        
        window.modalSystem.show(resultsModal.id);
        
        // Notification de succès
        if (window.notifications) {
            window.notifications.success(`Démo "${config.title}" générée avec succès !`);
        }
    }
    
    static generateDemoConfig(config) {
        return `// À ajouter dans js/config/demo-config.js
{
    id: '${config.id}',
    title: '${config.title}',
    description: '${config.description || 'Nouvelle démo générée automatiquement'}',
    category: '${config.category}',
    keywords: ['${config.id}', '${config.category.toLowerCase()}', 'demo'],
    icon: '${config.icon}',
    requireAccess: ${config.requireClientAccess}
}`;
    }
    
    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
