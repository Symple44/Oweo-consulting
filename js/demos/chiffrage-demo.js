// ========================================
// js/demos/chiffrage-demo.js - Démo outil de chiffrage
// ========================================

class ChiffrageDemo extends BaseDemo {
    constructor() {
        super({
            id: 'chiffrage-demo',
            title: 'Outil de Chiffrage Automatisé',
            description: 'Démonstration du système de chiffrage pour projets métalliques',
            requireClientAccess: true,
            maxSteps: 4
        });
        
        // Données de la démo
        this.projectData = {
            name: 'Hangar Industriel',
            surface: 500,
            hauteur: 6,
            type: 'construction-neuve'
        };
        
        this.materials = [
            { id: 1, name: 'Poutre IPE 200', quantity: 0, price: 45.50, unit: 'ml' },
            { id: 2, name: 'Poutre HEA 160', quantity: 0, price: 38.20, unit: 'ml' },
            { id: 3, name: 'Tôle acier 3mm', quantity: 0, price: 12.80, unit: 'm²' },
            { id: 4, name: 'Bac acier isolé', quantity: 0, price: 28.90, unit: 'm²' }
        ];
        
        this.operations = [
            { id: 1, name: 'Découpe plasma', time: 0, rate: 45, unit: 'h' },
            { id: 2, name: 'Soudage bout à bout', time: 0, rate: 55, unit: 'h' },
            { id: 3, name: 'Montage structure', time: 0, rate: 35, unit: 'h' },
            { id: 4, name: 'Finitions', time: 0, rate: 40, unit: 'h' }
        ];
        
        this.coefficients = {
            materiel: 1.15,
            transport: 0.08,
            marge: 0.25,
            assurance: 0.03
        };
        
        this.currentCalculation = null;
    }
    
    getContent() {
        switch (this.currentStep) {
            case 1:
                return this.renderProjectConfig();
            case 2:
                return this.renderMaterialsSelection();
            case 3:
                return this.renderOperationsPlanning();
            case 4:
                return this.renderFinalQuote();
            default:
                return '<p>Étape non définie</p>';
        }
    }
    
    renderProjectConfig() {
        return `
            <div class="chiffrage-step step-1">
                <div class="step-header">
                    <h3><i class="fas fa-project-diagram"></i> Configuration du Projet</h3>
                    <p>Définissez les paramètres de base de votre projet de charpente métallique.</p>
                </div>
                
                <div class="config-form">
                    <div class="form-grid">
                        <div class="form-group col-span-2">
                            <label for="project-name">Nom du projet</label>
                            <input type="text" id="project-name" class="form-control" 
                                   value="${this.projectData.name}" 
                                   placeholder="Ex: Hangar industriel, Passerelle...">
                        </div>
                        
                        <div class="form-group">
                            <label for="project-surface">Surface (m²)</label>
                            <input type="number" id="project-surface" class="form-control" 
                                   value="${this.projectData.surface}" min="1" max="10000">
                        </div>
                        
                        <div class="form-group">
                            <label for="project-height">Hauteur (m)</label>
                            <input type="number" id="project-height" class="form-control" 
                                   value="${this.projectData.hauteur}" min="1" max="50" step="0.1">
                        </div>
                        
                        <div class="form-group col-span-2">
                            <label for="project-type">Type de construction</label>
                            <select id="project-type" class="form-control">
                                <option value="construction-neuve" ${this.projectData.type === 'construction-neuve' ? 'selected' : ''}>
                                    Construction neuve
                                </option>
                                <option value="extension" ${this.projectData.type === 'extension' ? 'selected' : ''}>
                                    Extension
                                </option>
                                <option value="renovation" ${this.projectData.type === 'renovation' ? 'selected' : ''}>
                                    Rénovation
                                </option>
                                <option value="structure-speciale" ${this.projectData.type === 'structure-speciale' ? 'selected' : ''}>
                                    Structure spéciale
                                </option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="project-preview">
                        <h4>Aperçu du projet</h4>
                        <div class="preview-cards">
                            <div class="preview-card">
                                <div class="preview-icon">
                                    <i class="fas fa-ruler-combined"></i>
                                </div>
                                <div class="preview-info">
                                    <div class="preview-value" id="preview-surface">${this.projectData.surface}</div>
                                    <div class="preview-label">m² de surface</div>
                                </div>
                            </div>
                            
                            <div class="preview-card">
                                <div class="preview-icon">
                                    <i class="fas fa-arrows-alt-v"></i>
                                </div>
                                <div class="preview-info">
                                    <div class="preview-value" id="preview-height">${this.projectData.hauteur}</div>
                                    <div class="preview-label">mètres de hauteur</div>
                                </div>
                            </div>
                            
                            <div class="preview-card">
                                <div class="preview-icon">
                                    <i class="fas fa-cube"></i>
                                </div>
                                <div class="preview-info">
                                    <div class="preview-value" id="preview-volume">${this.projectData.surface * this.projectData.hauteur}</div>
                                    <div class="preview-label">m³ de volume</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="step-help">
                        <i class="fas fa-lightbulb"></i>
                        <div class="help-content">
                            <strong>Conseil :</strong> Plus les informations sont précises, plus le chiffrage sera exact. 
                            Ces paramètres influencent le calcul automatique des quantités de matériaux.
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderMaterialsSelection() {
        return `
            <div class="chiffrage-step step-2">
                <div class="step-header">
                    <h3><i class="fas fa-tools"></i> Sélection des Matériaux</h3>
                    <p>Définissez les quantités de matériaux nécessaires pour votre projet.</p>
                </div>
                
                <div class="materials-section">
                    <div class="materials-calculator">
                        <button class="btn btn-primary auto-calculate-btn" onclick="currentDemo.autoCalculateMaterials()">
                            <i class="fas fa-magic"></i>
                            Calcul automatique
                        </button>
                        <span class="calculator-help">Basé sur les paramètres du projet</span>
                    </div>
                    
                    <div class="materials-table">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Matériau</th>
                                    <th>Quantité</th>
                                    <th>Unité</th>
                                    <th>Prix unitaire</th>
                                    <th>Total HT</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.materials.map(material => `
                                    <tr data-material-id="${material.id}">
                                        <td>
                                            <div class="material-info">
                                                <strong>${material.name}</strong>
                                            </div>
                                        </td>
                                        <td>
                                            <input type="number" 
                                                   class="form-control material-quantity" 
                                                   value="${material.quantity}" 
                                                   min="0" 
                                                   step="0.1"
                                                   data-material-id="${material.id}">
                                        </td>
                                        <td>${material.unit}</td>
                                        <td>${this.formatCurrency(material.price)}</td>
                                        <td class="material-total">
                                            ${this.formatCurrency(material.quantity * material.price)}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                            <tfoot>
                                <tr class="total-row">
                                    <td colspan="4"><strong>Total matériaux HT</strong></td>
                                    <td><strong class="materials-total">${this.formatCurrency(this.calculateMaterialsTotal())}</strong></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    
                    <div class="materials-summary">
                        <div class="summary-cards">
                            <div class="summary-card">
                                <div class="summary-icon">
                                    <i class="fas fa-weight-hanging"></i>
                                </div>
                                <div class="summary-info">
                                    <div class="summary-value">${this.calculateTotalWeight()}</div>
                                    <div class="summary-label">tonnes estimées</div>
                                </div>
                            </div>
                            
                            <div class="summary-card">
                                <div class="summary-icon">
                                    <i class="fas fa-truck"></i>
                                </div>
                                <div class="summary-info">
                                    <div class="summary-value">${this.calculateDeliveries()}</div>
                                    <div class="summary-label">livraisons</div>
                                </div>
                            </div>
                            
                            <div class="summary-card">
                                <div class="summary-icon">
                                    <i class="fas fa-calendar-day"></i>
                                </div>
                                <div class="summary-info">
                                    <div class="summary-value">${this.calculateDeliveryDays()}</div>
                                    <div class="summary-label">jours de délai</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderOperationsPlanning() {
        return `
            <div class="chiffrage-step step-3">
                <div class="step-header">
                    <h3><i class="fas fa-clock"></i> Planification des Opérations</h3>
                    <p>Estimez les temps de réalisation pour chaque opération.</p>
                </div>
                
                <div class="operations-section">
                    <div class="operations-calculator">
                        <button class="btn btn-primary auto-calculate-btn" onclick="currentDemo.autoCalculateOperations()">
                            <i class="fas fa-calculator"></i>
                            Calcul automatique des temps
                        </button>
                        <span class="calculator-help">Basé sur la surface et la complexité</span>
                    </div>
                    
                    <div class="operations-table">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Opération</th>
                                    <th>Temps (h)</th>
                                    <th>Taux horaire</th>
                                    <th>Coût HT</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.operations.map(operation => `
                                    <tr data-operation-id="${operation.id}">
                                        <td>
                                            <div class="operation-info">
                                                <strong>${operation.name}</strong>
                                            </div>
                                        </td>
                                        <td>
                                            <input type="number" 
                                                   class="form-control operation-time" 
                                                   value="${operation.time}" 
                                                   min="0" 
                                                   step="0.5"
                                                   data-operation-id="${operation.id}">
                                        </td>
                                        <td>${this.formatCurrency(operation.rate)}/h</td>
                                        <td class="operation-total">
                                            ${this.formatCurrency(operation.time * operation.rate)}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                            <tfoot>
                                <tr class="total-row">
                                    <td colspan="3"><strong>Total main d'œuvre HT</strong></td>
                                    <td><strong class="operations-total">${this.formatCurrency(this.calculateOperationsTotal())}</strong></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    
                    <div class="planning-timeline">
                        <h4>Planning prévisionnel</h4>
                        <div class="timeline">
                            ${this.operations.map((operation, index) => `
                                <div class="timeline-item">
                                    <div class="timeline-marker">${index + 1}</div>
                                    <div class="timeline-content">
                                        <div class="timeline-title">${operation.name}</div>
                                        <div class="timeline-duration">${operation.time}h</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="planning-summary">
                            <div class="planning-stat">
                                <strong>Durée totale :</strong> ${this.calculateTotalTime()} heures
                            </div>
                            <div class="planning-stat">
                                <strong>Planning :</strong> ${Math.ceil(this.calculateTotalTime() / 8)} jours ouvrés
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderFinalQuote() {
        const subtotalMaterials = this.calculateMaterialsTotal();
        const subtotalOperations = this.calculateOperationsTotal();
        const subtotal = subtotalMaterials + subtotalOperations;
        
        const transport = subtotal * this.coefficients.transport;
        const assurance = subtotal * this.coefficients.assurance;
        const totalHT = subtotal + transport + assurance;
        const marge = totalHT * this.coefficients.marge;
        const prixVente = totalHT + marge;
        const tva = prixVente * 0.20;
        const totalTTC = prixVente + tva;
        
        return `
            <div class="chiffrage-step step-4">
                <div class="step-header">
                    <h3><i class="fas fa-file-invoice-dollar"></i> Devis Final</h3>
                    <p>Récapitulatif complet et tarification finale du projet.</p>
                </div>
                
                <div class="quote-container">
                    <div class="quote-header">
                        <div class="quote-project">
                            <h4>${this.projectData.name}</h4>
                            <div class="project-details">
                                <span>${this.projectData.surface} m²</span>
                                <span>•</span>
                                <span>Hauteur ${this.projectData.hauteur} m</span>
                                <span>•</span>
                                <span>${this.getProjectTypeLabel()}</span>
                            </div>
                        </div>
                        <div class="quote-date">
                            Devis généré le ${this.formatDate(new Date())}
                        </div>
                    </div>
                    
                    <div class="quote-breakdown">
                        <div class="breakdown-section">
                            <h5>Matériaux</h5>
                            <div class="breakdown-items">
                                ${this.materials.filter(m => m.quantity > 0).map(material => `
                                    <div class="breakdown-item">
                                        <span>${material.name}</span>
                                        <span>${material.quantity} ${material.unit}</span>
                                        <span>${this.formatCurrency(material.quantity * material.price)}</span>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="breakdown-subtotal">
                                <span>Sous-total matériaux</span>
                                <span>${this.formatCurrency(subtotalMaterials)}</span>
                            </div>
                        </div>
                        
                        <div class="breakdown-section">
                            <h5>Main d'œuvre</h5>
                            <div class="breakdown-items">
                                ${this.operations.filter(o => o.time > 0).map(operation => `
                                    <div class="breakdown-item">
                                        <span>${operation.name}</span>
                                        <span>${operation.time} h</span>
                                        <span>${this.formatCurrency(operation.time * operation.rate)}</span>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="breakdown-subtotal">
                                <span>Sous-total main d'œuvre</span>
                                <span>${this.formatCurrency(subtotalOperations)}</span>
                            </div>
                        </div>
                        
                        <div class="breakdown-section">
                            <h5>Frais annexes</h5>
                            <div class="breakdown-items">
                                <div class="breakdown-item">
                                    <span>Transport et livraison</span>
                                    <span>${(this.coefficients.transport * 100).toFixed(1)}%</span>
                                    <span>${this.formatCurrency(transport)}</span>
                                </div>
                                <div class="breakdown-item">
                                    <span>Assurance décennale</span>
                                    <span>${(this.coefficients.assurance * 100).toFixed(1)}%</span>
                                    <span>${this.formatCurrency(assurance)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="breakdown-section">
                            <h5>Totaux</h5>
                            <div class="breakdown-items">
                                <div class="breakdown-item">
                                    <span>Total HT</span>
                                    <span></span>
                                    <span>${this.formatCurrency(totalHT)}</span>
                                </div>
                                <div class="breakdown-item">
                                    <span>Marge commerciale (${(this.coefficients.marge * 100).toFixed(0)}%)</span>
                                    <span></span>
                                    <span>${this.formatCurrency(marge)}</span>
                                </div>
                                <div class="breakdown-item">
                                    <span>Prix de vente HT</span>
                                    <span></span>
                                    <span>${this.formatCurrency(prixVente)}</span>
                                </div>
                                <div class="breakdown-item">
                                    <span>TVA (20%)</span>
                                    <span></span>
                                    <span>${this.formatCurrency(tva)}</span>
                                </div>
                            </div>
                            <div class="breakdown-total">
                                <span><strong>Prix total TTC</strong></span>
                                <span><strong>${this.formatCurrency(totalTTC)}</strong></span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="quote-actions">
                        <button class="btn btn-outline" onclick="currentDemo.exportPDF()">
                            <i class="fas fa-file-pdf"></i>
                            Exporter en PDF
                        </button>
                        <button class="btn btn-outline" onclick="currentDemo.exportExcel()">
                            <i class="fas fa-file-excel"></i>
                            Exporter en Excel
                        </button>
                        <button class="btn btn-primary" onclick="currentDemo.saveQuote()">
                            <i class="fas fa-save"></i>
                            Enregistrer le devis
                        </button>
                    </div>
                    
                    <div class="quote-stats">
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-euro-sign"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value">${this.formatNumber(prixVente / this.projectData.surface)}</div>
                                <div class="stat-label">€/m² HT</div>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-percentage"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value">${this.formatNumber((marge / totalHT) * 100)}</div>
                                <div class="stat-label">% de marge</div>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value">${Math.ceil(this.calculateTotalTime() / 8)}</div>
                                <div class="stat-label">jours prévus</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    onMount() {
        super.onMount();
        this.bindFormEvents();
    }
    
    bindFormEvents() {
        // Événements pour la configuration du projet
        const inputs = document.querySelectorAll('#project-name, #project-surface, #project-height, #project-type');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.updateProjectData());
        });
        
        // Événements pour les quantités de matériaux
        const materialInputs = document.querySelectorAll('.material-quantity');
        materialInputs.forEach(input => {
            input.addEventListener('input', () => this.updateMaterialCalculations());
        });
        
        // Événements pour les temps d'opération
        const operationInputs = document.querySelectorAll('.operation-time');
        operationInputs.forEach(input => {
            input.addEventListener('input', () => this.updateOperationCalculations());
        });
    }
    
    updateProjectData() {
        const nameInput = document.getElementById('project-name');
        const surfaceInput = document.getElementById('project-surface');
        const heightInput = document.getElementById('project-height');
        const typeInput = document.getElementById('project-type');
        
        if (nameInput) this.projectData.name = nameInput.value;
        if (surfaceInput) this.projectData.surface = parseFloat(surfaceInput.value) || 0;
        if (heightInput) this.projectData.hauteur = parseFloat(heightInput.value) || 0;
        if (typeInput) this.projectData.type = typeInput.value;
        
        this.updateProjectPreview();
    }
    
    updateProjectPreview() {
        const previewSurface = document.getElementById('preview-surface');
        const previewHeight = document.getElementById('preview-height');
        const previewVolume = document.getElementById('preview-volume');
        
        if (previewSurface) previewSurface.textContent = this.projectData.surface;
        if (previewHeight) previewHeight.textContent = this.projectData.hauteur;
        if (previewVolume) previewVolume.textContent = this.projectData.surface * this.projectData.hauteur;
    }
    
    autoCalculateMaterials() {
        // Calcul automatique basé sur la surface
        const surface = this.projectData.surface;
        const hauteur = this.projectData.hauteur;
        
        // Facteurs de calcul simplifiés
        this.materials[0].quantity = Math.round(surface * 0.15); // Poutres IPE
        this.materials[1].quantity = Math.round(surface * 0.08); // Poutres HEA
        this.materials[2].quantity = Math.round(surface * 0.3);  // Tôle structure
        this.materials[3].quantity = Math.round(surface * 1.1);  // Bac acier
        
        this.updateMaterialInputs();
        this.updateMaterialCalculations();
    }
    
    autoCalculateOperations() {
        // Calcul automatique basé sur la surface et la complexité
        const surface = this.projectData.surface;
        const complexite = this.getComplexityFactor();
        
        this.operations[0].time = Math.round(surface * 0.05 * complexite); // Découpe
        this.operations[1].time = Math.round(surface * 0.08 * complexite); // Soudage
        this.operations[2].time = Math.round(surface * 0.12 * complexite); // Montage
        this.operations[3].time = Math.round(surface * 0.03 * complexite); // Finitions
        
        this.updateOperationInputs();
        this.updateOperationCalculations();
    }
    
    getComplexityFactor() {
        switch (this.projectData.type) {
            case 'construction-neuve': return 1.0;
            case 'extension': return 1.2;
            case 'renovation': return 1.5;
            case 'structure-speciale': return 1.8;
            default: return 1.0;
        }
    }
    
    updateMaterialInputs() {
        this.materials.forEach(material => {
            const input = document.querySelector(`[data-material-id="${material.id}"]`);
            if (input) {
                input.value = material.quantity;
            }
        });
    }
    
    updateOperationInputs() {
        this.operations.forEach(operation => {
            const input = document.querySelector(`[data-operation-id="${operation.id}"]`);
            if (input) {
                input.value = operation.time;
            }
        });
    }
    
    updateMaterialCalculations() {
        const materialInputs = document.querySelectorAll('.material-quantity');
        materialInputs.forEach(input => {
            const materialId = parseInt(input.dataset.materialId);
            const material = this.materials.find(m => m.id === materialId);
            if (material) {
                material.quantity = parseFloat(input.value) || 0;
                
                // Mettre à jour le total de la ligne
                const row = input.closest('tr');
                const totalCell = row.querySelector('.material-total');
                if (totalCell) {
                    totalCell.textContent = this.formatCurrency(material.quantity * material.price);
                }
            }
        });
        
        // Mettre à jour le total global
        const totalElement = document.querySelector('.materials-total');
        if (totalElement) {
            totalElement.textContent = this.formatCurrency(this.calculateMaterialsTotal());
        }
    }
    
    updateOperationCalculations() {
        const operationInputs = document.querySelectorAll('.operation-time');
        operationInputs.forEach(input => {
            const operationId = parseInt(input.dataset.operationId);
            const operation = this.operations.find(o => o.id === operationId);
            if (operation) {
                operation.time = parseFloat(input.value) || 0;
                
                // Mettre à jour le total de la ligne
                const row = input.closest('tr');
                const totalCell = row.querySelector('.operation-total');
                if (totalCell) {
                    totalCell.textContent = this.formatCurrency(operation.time * operation.rate);
                }
            }
        });
        
        // Mettre à jour le total global
        const totalElement = document.querySelector('.operations-total');
        if (totalElement) {
            totalElement.textContent = this.formatCurrency(this.calculateOperationsTotal());
        }
    }
    
    calculateMaterialsTotal() {
        return this.materials.reduce((total, material) => {
            return total + (material.quantity * material.price);
        }, 0);
    }
    
    calculateOperationsTotal() {
        return this.operations.reduce((total, operation) => {
            return total + (operation.time * operation.rate);
        }, 0);
    }
    
    calculateTotalTime() {
        return this.operations.reduce((total, operation) => total + operation.time, 0);
    }
    
    calculateTotalWeight() {
        // Estimation simplifiée du poids
        const weight = this.materials[0].quantity * 0.025 + // IPE
                      this.materials[1].quantity * 0.021 + // HEA
                      this.materials[2].quantity * 0.024 + // Tôle
                      this.materials[3].quantity * 0.012;  // Bac
        return this.formatNumber(weight, 1);
    }
    
    calculateDeliveries() {
        return Math.ceil(parseFloat(this.calculateTotalWeight()) / 15); // 15t par camion
    }
    
    calculateDeliveryDays() {
        return Math.max(3, Math.ceil(this.calculateDeliveries() * 2));
    }
    
    getProjectTypeLabel() {
        const types = {
            'construction-neuve': 'Construction neuve',
            'extension': 'Extension',
            'renovation': 'Rénovation',
            'structure-speciale': 'Structure spéciale'
        };
        return types[this.projectData.type] || 'Non défini';
    }
    
    exportPDF() {
        console.log('📄 Export PDF du devis');
        if (window.notifications) {
            window.notifications.info('Export PDF en cours de préparation...');
        }
        // Ici vous intégreriez une vraie solution d'export PDF
    }
    
    exportExcel() {
        console.log('📊 Export Excel du devis');
        if (window.notifications) {
            window.notifications.info('Export Excel en cours de préparation...');
        }
        // Ici vous intégreriez une vraie solution d'export Excel
    }
    
    saveQuote() {
        console.log('💾 Sauvegarde du devis');
        if (window.notifications) {
            window.notifications.success('Devis sauvegardé avec succès !');
        }
        // Ici vous intégreriez la sauvegarde en base
    }
    
    onStepChange() {
        // Rebind events après changement d'étape
        setTimeout(() => {
            this.bindFormEvents();
        }, 100);
    }
}

// Exposer la classe
window.ChiffrageDemo = ChiffrageDemo;