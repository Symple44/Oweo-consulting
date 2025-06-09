// ========================================
// js/demos/dstv-demo.js - Démo interface DSTV
// ========================================

class DSTVDemo extends BaseDemo {
    constructor() {
        super({
            id: 'dstv-demo',
            title: 'Interface DSTV pour Machines CNC',
            description: 'Démonstration d\'import/export de fichiers DSTV pour l\'usinage automatisé',
            requireClientAccess: true,
            maxSteps: 4
        });
        
        // Données de la démo
        this.dstvData = {
            file: null,
            parsing: false,
            parsed: false,
            elements: [],
            validationErrors: [],
            machineConfig: {
                type: 'plasma',
                maxThickness: 50,
                maxLength: 12000,
                maxWidth: 3000
            }
        };
        
        // Éléments DSTV d'exemple
        this.sampleElements = [
            {
                id: 'HEA200-001',
                profile: 'HEA200',
                length: 3500,
                material: 'S355',
                operations: [
                    { type: 'cut', position: 0, angle: 90 },
                    { type: 'drill', position: 100, diameter: 16 },
                    { type: 'drill', position: 200, diameter: 20 },
                    { type: 'cut', position: 3500, angle: 45 }
                ]
            },
            {
                id: 'IPE160-001',
                profile: 'IPE160',
                length: 2800,
                material: 'S235',
                operations: [
                    { type: 'cut', position: 0, angle: 90 },
                    { type: 'notch', position: 150, width: 50, depth: 25 },
                    { type: 'drill', position: 1400, diameter: 14 },
                    { type: 'cut', position: 2800, angle: 90 }
                ]
            }
        ];
        
        this.operationTypes = {
            'cut': { label: 'Découpe', icon: 'fas fa-cut', color: '#ef4444' },
            'drill': { label: 'Perçage', icon: 'fas fa-circle', color: '#3b82f6' },
            'notch': { label: 'Entaille', icon: 'fas fa-square', color: '#f59e0b' },
            'punch': { label: 'Poinçonnage', icon: 'fas fa-dot-circle', color: '#10b981' }
        };
    }
    
    getContent() {
        switch (this.currentStep) {
            case 1:
                return this.renderFileImport();
            case 2:
                return this.renderDataValidation();
            case 3:
                return this.renderMachineConfig();
            case 4:
                return this.renderExportGeneration();
            default:
                return '<p>Étape non définie</p>';
        }
    }
    
    renderFileImport() {
        return `
            <div class="dstv-step step-1">
                <div class="step-header">
                    <h3><i class="fas fa-file-upload"></i> Import du fichier DSTV</h3>
                    <p>Importez votre fichier DSTV depuis votre logiciel de CAO/FAO.</p>
                </div>
                
                <div class="file-import-section">
                    <div class="import-methods">
                        <div class="import-method active">
                            <div class="method-header">
                                <i class="fas fa-upload"></i>
                                <h4>Upload de fichier</h4>
                            </div>
                            
                            <div class="file-upload-zone" id="dstv-upload-zone">
                                <div class="upload-content">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                    <h5>Glissez votre fichier DSTV ici</h5>
                                    <p>ou cliquez pour sélectionner</p>
                                    <input type="file" id="dstv-file-input" accept=".nc1,.dstv" style="display: none;">
                                    <div class="file-types">
                                        Formats supportés: .nc1, .dstv
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="import-method">
                            <div class="method-header">
                                <i class="fas fa-code"></i>
                                <h4>Exemple de démonstration</h4>
                            </div>
                            
                            <div class="demo-import">
                                <p>Utilisez des données d'exemple pour découvrir les fonctionnalités.</p>
                                <button class="btn btn-outline" onclick="currentDemo.loadSampleData()">
                                    <i class="fas fa-download"></i>
                                    Charger les données d'exemple
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="import-status" id="import-status" style="display: none;">
                        <div class="status-content">
                            <div class="status-icon">
                                <i class="fas fa-spinner fa-spin"></i>
                            </div>
                            <div class="status-text">
                                <h5>Analyse du fichier en cours...</h5>
                                <p>Parsing des données DSTV</p>
                            </div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="import-progress"></div>
                        </div>
                    </div>
                    
                    <div class="import-results" id="import-results" style="display: none;">
                        <div class="results-summary">
                            <div class="summary-card success">
                                <i class="fas fa-check-circle"></i>
                                <div class="summary-info">
                                    <div class="summary-title">Fichier analysé</div>
                                    <div class="summary-value" id="elements-count">0 éléments</div>
                                </div>
                            </div>
                            
                            <div class="summary-card info">
                                <i class="fas fa-cogs"></i>
                                <div class="summary-info">
                                    <div class="summary-title">Opérations</div>
                                    <div class="summary-value" id="operations-count">0 opérations</div>
                                </div>
                            </div>
                            
                            <div class="summary-card warning">
                                <i class="fas fa-exclamation-triangle"></i>
                                <div class="summary-info">
                                    <div class="summary-title">Avertissements</div>
                                    <div class="summary-value" id="warnings-count">0</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="file-preview">
                            <h4>Aperçu du contenu</h4>
                            <div class="preview-table">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Élément</th>
                                            <th>Profil</th>
                                            <th>Longueur</th>
                                            <th>Opérations</th>
                                            <th>Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody id="preview-elements">
                                        <!-- Généré dynamiquement -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dstv-info">
                        <div class="info-card">
                            <h4><i class="fas fa-info-circle"></i> À propos du format DSTV</h4>
                            <p>Le format DSTV (Deutscher Stahlbau-Verband) est un standard international 
                            pour l'échange de données d'usinage de structures métalliques entre logiciels CAO et machines CNC.</p>
                            
                            <div class="format-features">
                                <div class="feature-item">
                                    <i class="fas fa-check"></i>
                                    <span>Géométrie des pièces</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-check"></i>
                                    <span>Opérations d'usinage</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-check"></i>
                                    <span>Paramètres machine</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-check"></i>
                                    <span>Optimisation des trajets</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderDataValidation() {
        return `
            <div class="dstv-step step-2">
                <div class="step-header">
                    <h3><i class="fas fa-check-double"></i> Validation des Données</h3>
                    <p>Vérifiez la cohérence des données et corrigez les éventuelles erreurs.</p>
                </div>
                
                <div class="validation-section">
                    <div class="validation-controls">
                        <button class="btn btn-primary" onclick="currentDemo.runValidation()">
                            <i class="fas fa-play"></i>
                            Lancer la validation
                        </button>
                        <button class="btn btn-outline" onclick="currentDemo.autoCorrect()">
                            <i class="fas fa-magic"></i>
                            Correction automatique
                        </button>
                    </div>
                    
                    <div class="validation-results">
                        <div class="validation-summary">
                            <div class="validation-card success">
                                <div class="card-icon">
                                    <i class="fas fa-check"></i>
                                </div>
                                <div class="card-content">
                                    <div class="card-value">${this.getValidElementsCount()}</div>
                                    <div class="card-label">Éléments valides</div>
                                </div>
                            </div>
                            
                            <div class="validation-card warning">
                                <div class="card-icon">
                                    <i class="fas fa-exclamation-triangle"></i>
                                </div>
                                <div class="card-content">
                                    <div class="card-value">${this.getWarningsCount()}</div>
                                    <div class="card-label">Avertissements</div>
                                </div>
                            </div>
                            
                            <div class="validation-card error">
                                <div class="card-icon">
                                    <i class="fas fa-times"></i>
                                </div>
                                <div class="card-content">
                                    <div class="card-value">${this.getErrorsCount()}</div>
                                    <div class="card-label">Erreurs</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="elements-validation">
                            <h4>Détail par élément</h4>
                            <div class="elements-list">
                                ${this.sampleElements.map(element => this.renderElementValidation(element)).join('')}
                            </div>
                        </div>
                        
                        <div class="validation-issues">
                            <h4>Issues détectées</h4>
                            <div class="issues-list">
                                <div class="issue-item warning">
                                    <div class="issue-icon">
                                        <i class="fas fa-exclamation-triangle"></i>
                                    </div>
                                    <div class="issue-content">
                                        <div class="issue-title">Perçage proche du bord</div>
                                        <div class="issue-description">
                                            Élément IPE160-001: Perçage à 100mm du bord, recommandé > 120mm
                                        </div>
                                        <div class="issue-suggestion">
                                            Suggestion: Déplacer le perçage à 130mm
                                        </div>
                                    </div>
                                    <div class="issue-actions">
                                        <button class="btn btn-sm btn-outline">Ignorer</button>
                                        <button class="btn btn-sm btn-primary">Corriger</button>
                                    </div>
                                </div>
                                
                                <div class="issue-item info">
                                    <div class="issue-icon">
                                        <i class="fas fa-info-circle"></i>
                                    </div>
                                    <div class="issue-content">
                                        <div class="issue-title">Optimisation possible</div>
                                        <div class="issue-description">
                                            Réorganisation des opérations pour réduire le temps d'usinage de 15%
                                        </div>
                                    </div>
                                    <div class="issue-actions">
                                        <button class="btn btn-sm btn-primary">Appliquer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderMachineConfig() {
        return `
            <div class="dstv-step step-3">
                <div class="step-header">
                    <h3><i class="fas fa-cog"></i> Configuration Machine</h3>
                    <p>Adaptez les paramètres selon votre machine CNC.</p>
                </div>
                
                <div class="machine-config-section">
                    <div class="machine-selector">
                        <h4>Type de machine</h4>
                        <div class="machine-types">
                            <div class="machine-type ${this.dstvData.machineConfig.type === 'plasma' ? 'active' : ''}" 
                                 onclick="currentDemo.selectMachineType('plasma')">
                                <div class="machine-icon">
                                    <i class="fas fa-fire"></i>
                                </div>
                                <div class="machine-info">
                                    <div class="machine-name">Plasma</div>
                                    <div class="machine-desc">Découpe plasma haute précision</div>
                                </div>
                            </div>
                            
                            <div class="machine-type ${this.dstvData.machineConfig.type === 'laser' ? 'active' : ''}" 
                                 onclick="currentDemo.selectMachineType('laser')">
                                <div class="machine-icon">
                                    <i class="fas fa-lightbulb"></i>
                                </div>
                                <div class="machine-info">
                                    <div class="machine-name">Laser</div>
                                    <div class="machine-desc">Découpe laser fibre</div>
                                </div>
                            </div>
                            
                            <div class="machine-type ${this.dstvData.machineConfig.type === 'oxyfuel' ? 'active' : ''}" 
                                 onclick="currentDemo.selectMachineType('oxyfuel')">
                                <div class="machine-icon">
                                    <i class="fas fa-burn"></i>
                                </div>
                                <div class="machine-info">
                                    <div class="machine-name">Oxycoupage</div>
                                    <div class="machine-desc">Découpe oxygène-acétylène</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="machine-parameters">
                        <h4>Paramètres machine</h4>
                        <div class="parameters-grid">
                            <div class="parameter-group">
                                <label>Épaisseur maximale (mm)</label>
                                <input type="number" class="form-control" 
                                       value="${this.dstvData.machineConfig.maxThickness}" 
                                       min="1" max="200">
                            </div>
                            
                            <div class="parameter-group">
                                <label>Longueur maximale (mm)</label>
                                <input type="number" class="form-control" 
                                       value="${this.dstvData.machineConfig.maxLength}" 
                                       min="1000" max="20000">
                            </div>
                            
                            <div class="parameter-group">
                                <label>Largeur maximale (mm)</label>
                                <input type="number" class="form-control" 
                                       value="${this.dstvData.machineConfig.maxWidth}" 
                                       min="500" max="5000">
                            </div>
                            
                            <div class="parameter-group">
                                <label>Vitesse de coupe (mm/min)</label>
                                <input type="number" class="form-control" 
                                       value="2500" min="100" max="10000">
                            </div>
                        </div>
                    </div>
                    
                    <div class="cutting-sequence">
                        <h4>Séquence d'usinage</h4>
                        <div class="sequence-preview">
                            ${this.sampleElements.map((element, index) => `
                                <div class="sequence-element" data-element="${element.id}">
                                    <div class="sequence-number">${index + 1}</div>
                                    <div class="sequence-info">
                                        <div class="sequence-title">${element.id}</div>
                                        <div class="sequence-profile">${element.profile}</div>
                                        <div class="sequence-operations">
                                            ${element.operations.map(op => `
                                                <span class="operation-badge ${op.type}">
                                                    <i class="${this.operationTypes[op.type].icon}"></i>
                                                    ${this.operationTypes[op.type].label}
                                                </span>
                                            `).join('')}
                                        </div>
                                    </div>
                                    <div class="sequence-time">
                                        ${this.calculateElementTime(element)} min
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="sequence-controls">
                            <button class="btn btn-outline" onclick="currentDemo.optimizeSequence()">
                                <i class="fas fa-sort"></i>
                                Optimiser la séquence
                            </button>
                            <button class="btn btn-outline" onclick="currentDemo.previewCutting()">
                                <i class="fas fa-play"></i>
                                Aperçu 3D
                            </button>
                        </div>
                    </div>
                    
                    <div class="machining-summary">
                        <div class="summary-stats">
                            <div class="stat-item">
                                <div class="stat-icon">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <div class="stat-info">
                                    <div class="stat-value">${this.calculateTotalMachiningTime()}</div>
                                    <div class="stat-label">Temps d'usinage</div>
                                </div>
                            </div>
                            
                            <div class="stat-item">
                                <div class="stat-icon">
                                    <i class="fas fa-route"></i>
                                </div>
                                <div class="stat-info">
                                    <div class="stat-value">${this.calculateTotalDistance()}</div>
                                    <div class="stat-label">Distance parcourue</div>
                                </div>
                            </div>
                            
                            <div class="stat-item">
                                <div class="stat-icon">
                                    <i class="fas fa-bolt"></i>
                                </div>
                                <div class="stat-info">
                                    <div class="stat-value">${this.calculatePowerConsumption()}</div>
                                    <div class="stat-label">Consommation</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderExportGeneration() {
        return `
            <div class="dstv-step step-4">
                <div class="step-header">
                    <h3><i class="fas fa-download"></i> Génération et Export</h3>
                    <p>Générez les fichiers finaux pour votre machine CNC.</p>
                </div>
                
                <div class="export-section">
                    <div class="export-options">
                        <h4>Options d'export</h4>
                        <div class="export-formats">
                            <div class="format-option active">
                                <input type="radio" name="export-format" value="dstv" checked>
                                <div class="format-info">
                                    <div class="format-icon">
                                        <i class="fas fa-file-code"></i>
                                    </div>
                                    <div class="format-details">
                                        <div class="format-name">DSTV Standard</div>
                                        <div class="format-desc">Format DSTV optimisé</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="format-option">
                                <input type="radio" name="export-format" value="nc">
                                <div class="format-info">
                                    <div class="format-icon">
                                        <i class="fas fa-cog"></i>
                                    </div>
                                    <div class="format-details">
                                        <div class="format-name">G-Code</div>
                                        <div class="format-desc">Code machine direct</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="format-option">
                                <input type="radio" name="export-format" value="xml">
                                <div class="format-info">
                                    <div class="format-icon">
                                        <i class="fas fa-code"></i>
                                    </div>
                                    <div class="format-details">
                                        <div class="format-name">XML</div>
                                        <div class="format-desc">Format d'échange universel</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="export-preview">
                        <h4>Aperçu du fichier généré</h4>
                        <div class="code-preview">
                            <div class="code-header">
                                <span class="file-name">hangar_industriel.nc1</span>
                                <button class="btn btn-sm btn-outline" onclick="currentDemo.copyCode()">
                                    <i class="fas fa-copy"></i>
                                    Copier
                                </button>
                            </div>
                            <div class="code-content">
                                <pre><code>${this.generateSampleDSTVCode()}</code></pre>
                            </div>
                        </div>
                    </div>
                    
                    <div class="export-actions">
                        <button class="btn btn-primary btn-lg" onclick="currentDemo.downloadFiles()">
                            <i class="fas fa-download"></i>
                            Télécharger les fichiers
                        </button>
                        <button class="btn btn-outline" onclick="currentDemo.sendToMachine()">
                            <i class="fas fa-share"></i>
                            Envoyer à la machine
                        </button>
                        <button class="btn btn-outline" onclick="currentDemo.saveProject()">
                            <i class="fas fa-save"></i>
                            Sauvegarder le projet
                        </button>
                    </div>
                    
                    <div class="export-summary">
                        <div class="summary-grid">
                            <div class="summary-item">
                                <div class="summary-label">Fichiers générés</div>
                                <div class="summary-value">3 fichiers</div>
                                <div class="summary-detail">
                                    programme.nc1, setup.xml, rapport.pdf
                                </div>
                            </div>
                            
                            <div class="summary-item">
                                <div class="summary-label">Taille totale</div>
                                <div class="summary-value">2.4 MB</div>
                                <div class="summary-detail">
                                    Compatible avec votre machine
                                </div>
                            </div>
                            
                            <div class="summary-item">
                                <div class="summary-label">Temps d'usinage</div>
                                <div class="summary-value">${this.calculateTotalMachiningTime()}</div>
                                <div class="summary-detail">
                                    Estimation basée sur vos paramètres
                                </div>
                            </div>
                            
                            <div class="summary-item">
                                <div class="summary-label">Optimisation</div>
                                <div class="summary-value">-15%</div>
                                <div class="summary-detail">
                                    Temps réduit vs séquence originale
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="machine-ready">
                        <div class="ready-status">
                            <div class="status-icon success">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="status-content">
                                <h5>Prêt pour l'usinage</h5>
                                <p>Tous les paramètres sont validés et optimisés pour votre machine ${this.dstvData.machineConfig.type}.</p>
                            </div>
                        </div>
                        
                        <div class="next-steps">
                            <h5>Prochaines étapes :</h5>
                            <ul>
                                <li>Vérifier la matière première sur la machine</li>
                                <li>Configurer les paramètres de coupe</li>
                                <li>Lancer le programme d'usinage</li>
                                <li>Contrôler la première pièce</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    onMount() {
        super.onMount();
        this.setupFileUpload();
    }
    
    setupFileUpload() {
        const uploadZone = document.getElementById('dstv-upload-zone');
        const fileInput = document.getElementById('dstv-file-input');
        
        if (uploadZone && fileInput) {
            uploadZone.addEventListener('click', () => fileInput.click());
            
            uploadZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadZone.classList.add('drag-over');
            });
            
            uploadZone.addEventListener('dragleave', () => {
                uploadZone.classList.remove('drag-over');
            });
            
            uploadZone.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadZone.classList.remove('drag-over');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileUpload(files[0]);
                }
            });
            
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleFileUpload(e.target.files[0]);
                }
            });
        }
    }
    
    handleFileUpload(file) {
        console.log('📁 Fichier DSTV uploadé:', file.name);
        this.dstvData.file = file;
        this.simulateFileProcessing();
    }
    
    simulateFileProcessing() {
        const statusDiv = document.getElementById('import-status');
        const resultsDiv = document.getElementById('import-results');
        const progressBar = document.getElementById('import-progress');
        
        if (statusDiv) statusDiv.style.display = 'block';
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    if (statusDiv) statusDiv.style.display = 'none';
                    if (resultsDiv) resultsDiv.style.display = 'block';
                    this.displayImportResults();
                }, 500);
            }
            
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
        }, 200);
    }
    
    loadSampleData() {
        console.log('📋 Chargement des données d\'exemple');
        this.dstvData.elements = [...this.sampleElements];
        this.dstvData.parsed = true;
        
        const resultsDiv = document.getElementById('import-results');
        if (resultsDiv) {
            resultsDiv.style.display = 'block';
            this.displayImportResults();
        }
    }
    
    displayImportResults() {
        const elementsCount = document.getElementById('elements-count');
        const operationsCount = document.getElementById('operations-count');
        const warningsCount = document.getElementById('warnings-count');
        const previewElements = document.getElementById('preview-elements');
        
        const totalOperations = this.sampleElements.reduce((total, element) => 
            total + element.operations.length, 0);
        
        if (elementsCount) elementsCount.textContent = `${this.sampleElements.length} éléments`;
        if (operationsCount) operationsCount.textContent = `${totalOperations} opérations`;
        if (warningsCount) warningsCount.textContent = '1';
        
        if (previewElements) {
            previewElements.innerHTML = this.sampleElements.map(element => `
                <tr>
                    <td><strong>${element.id}</strong></td>
                    <td>${element.profile}</td>
                    <td>${element.length}mm</td>
                    <td>
                        <div class="operations-badges">
                            ${element.operations.map(op => `
                                <span class="operation-badge ${op.type}">
                                    ${this.operationTypes[op.type].label}
                                </span>
                            `).join('')}
                        </div>
                    </td>
                    <td>
                        <span class="status-badge success">
                            <i class="fas fa-check"></i>
                            Valide
                        </span>
                    </td>
                </tr>
            `).join('');
        }
    }
    
    renderElementValidation(element) {
        const hasWarning = element.id === 'IPE160-001'; // Exemple
        
        return `
            <div class="element-validation ${hasWarning ? 'warning' : 'valid'}">
                <div class="element-header">
                    <div class="element-info">
                        <div class="element-id">${element.id}</div>
                        <div class="element-profile">${element.profile} - ${element.length}mm</div>
                    </div>
                    <div class="element-status">
                        ${hasWarning ? 
                            '<i class="fas fa-exclamation-triangle text-warning"></i>' :
                            '<i class="fas fa-check-circle text-success"></i>'
                        }
                    </div>
                </div>
                <div class="element-operations">
                    ${element.operations.map(op => `
                        <div class="operation-item">
                            <i class="${this.operationTypes[op.type].icon}"></i>
                            <span>${this.operationTypes[op.type].label}</span>
                            <span class="operation-pos">@ ${op.position}mm</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    runValidation() {
        console.log('🔍 Validation des données DSTV');
        if (window.notifications) {
            window.notifications.info('Validation en cours...');
            setTimeout(() => {
                window.notifications.success('Validation terminée - 1 avertissement détecté');
            }, 2000);
        }
    }
    
    autoCorrect() {
        console.log('🔧 Correction automatique');
        if (window.notifications) {
            window.notifications.success('Corrections appliquées automatiquement');
        }
    }
    
    selectMachineType(type) {
        this.dstvData.machineConfig.type = type;
        
        // Mettre à jour l'interface
        document.querySelectorAll('.machine-type').forEach(el => {
            el.classList.remove('active');
        });
        document.querySelector(`[onclick="currentDemo.selectMachineType('${type}')"]`)?.classList.add('active');
        
        console.log('⚙️ Machine sélectionnée:', type);
    }
    
    optimizeSequence() {
        console.log('🎯 Optimisation de la séquence');
        if (window.notifications) {
            window.notifications.success('Séquence optimisée - Gain de 15% sur le temps d\'usinage');
        }
    }
    
    previewCutting() {
        console.log('👁️ Aperçu 3D de l\'usinage');
        if (window.notifications) {
            window.notifications.info('Ouverture de l\'aperçu 3D...');
        }
    }
    
    calculateElementTime(element) {
        // Estimation simplifiée du temps d'usinage
        return Math.round(element.length / 100 + element.operations.length * 2);
    }
    
    calculateTotalMachiningTime() {
        const totalMinutes = this.sampleElements.reduce((total, element) => 
            total + this.calculateElementTime(element), 0);
        return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}min`;
    }
    
    calculateTotalDistance() {
        return `${this.formatNumber(this.sampleElements.reduce((total, element) => 
            total + element.length, 0) / 1000, 1)}m`;
    }
    
    calculatePowerConsumption() {
        return `${this.formatNumber(this.sampleElements.length * 2.5, 1)} kWh`;
    }
    
    getValidElementsCount() {
        return this.sampleElements.length - 1; // Un élément avec avertissement
    }
    
    getWarningsCount() {
        return 1;
    }
    
    getErrorsCount() {
        return 0;
    }
    
    generateSampleDSTVCode() {
        return `ST  001 IPE 160    2800.000    0.000    0.000   90.000
AK  001    0.000   90.000  0  N  0  0  0  0  
AK  001 2800.000   90.000  0  N  0  0  0  0  
BO  001  100.000   16.000  0  N  0  0  0  0  
BO  001  200.000   20.000  0  N  0  0  0  0  
EN  001

ST  002 HEA 200    3500.000    0.000    0.000   90.000
AK  002    0.000   90.000  0  N  0  0  0  0  
AK  002 3500.000   45.000  0  N  0  0  0  0  
BO  002  100.000   16.000  0  N  0  0  0  0  
BO  002  200.000   20.000  0  N  0  0  0  0  
EN  002`;
    }
    
    copyCode() {
        const code = this.generateSampleDSTVCode();
        navigator.clipboard.writeText(code).then(() => {
            if (window.notifications) {
                window.notifications.success('Code copié dans le presse-papier');
            }
        });
    }
    
    downloadFiles() {
        console.log('💾 Téléchargement des fichiers');
        if (window.notifications) {
            window.notifications.success('Téléchargement démarré - 3 fichiers');
        }
    }
    
    sendToMachine() {
        console.log('📤 Envoi vers la machine');
        if (window.notifications) {
            window.notifications.info('Connexion à la machine en cours...');
            setTimeout(() => {
                window.notifications.success('Fichiers envoyés vers la machine CNC');
            }, 2000);
        }
    }
    
    saveProject() {
        console.log('💾 Sauvegarde du projet');
        if (window.notifications) {
            window.notifications.success('Projet sauvegardé avec succès');
        }
    }
}

// Exposer la classe
window.DSTVDemo = DSTVDemo;