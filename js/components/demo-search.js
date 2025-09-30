// ========================================
// js/components/demo-search.js - Composant de recherche démos
// ========================================

class DemoSearch extends BaseComponent {
    constructor(options) {
        super(options);
        
        this.searchData = null;
        this.isVisible = false;
        this.currentResults = [];
        this.selectedIndex = -1;
        this.searchHistory = [];
        this.maxHistorySize = 10;
        
        // Configuration de la recherche
        this.searchConfig = {
            minLength: 1,
            debounceDelay: 200,
            maxResults: 10,
            placeholder: 'Rechercher une démo ou fonctionnalité... (ex: "chiffrage", "DSTV", "métrage")',
            shortcuts: {
                open: 'ctrl+k',
                close: 'escape',
                up: 'arrowup',
                down: 'arrowdown',
                enter: 'enter'
            },
            ...this.config.search
        };
        
        // État de recherche
        this.searchState = {
            query: '',
            isSearching: false,
            hasResults: false,
            error: null
        };
        
        // Timers
        this.searchTimer = null;
        this.hideTimer = null;
    }
    
    async init() {
        await super.init();
        await this.loadSearchData();
        this.setupKeyboardShortcuts();
    }
    
    async getTemplate() {
        return `
            <div class="demo-search-banner" id="demo-search-banner">
                <div class="demo-search-container">
                    <div class="demo-search-content">
                        <!-- Brand/Logo de recherche -->
                        <div class="demo-search-brand">
                            <i class="fas fa-search"></i>
                            <span>Navigation Démos</span>
                        </div>
                        
                        <!-- Zone de recherche principale -->
                        <div class="demo-search-input-container">
                            <div class="search-input-wrapper">
                                <input 
                                    type="text" 
                                    id="demo-search-input" 
                                    class="demo-search-input" 
                                    placeholder="${this.searchConfig.placeholder}"
                                    autocomplete="off"
                                    spellcheck="false"
                                >
                                <div class="search-input-actions">
                                    <button class="search-clear-btn" id="search-clear" style="display: none;">
                                        <i class="fas fa-times"></i>
                                    </button>
                                    <div class="search-loading" id="search-loading" style="display: none;">
                                        <i class="fas fa-spinner fa-spin"></i>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Résultats de recherche -->
                            <div id="demo-search-results" class="demo-search-results">
                                <div class="search-empty-state">
                                    <i class="fas fa-search"></i>
                                    <p>Tapez pour rechercher parmi les démonstrations disponibles</p>
                                    <div class="search-suggestions">
                                        <span class="suggestion-label">Suggestions :</span>
                                        <button class="suggestion-pill" data-query="chiffrage">Chiffrage</button>
                                        <button class="suggestion-pill" data-query="dstv">DSTV</button>
                                        <button class="suggestion-pill" data-query="stock">Stock</button>
                                        <button class="suggestion-pill" data-query="planning">Planning</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Actions et contrôles -->
                        <div class="demo-search-actions">
                            <button id="demo-search-help" class="demo-search-help-btn" title="Aide et raccourcis">
                                <i class="fas fa-question-circle"></i>
                            </button>
                            <button id="demo-search-close" class="demo-search-close-btn" title="Fermer (Échap)">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Barre de statut -->
                    <div class="demo-search-status" id="demo-search-status" style="display: none;">
                        <div class="status-content">
                            <span class="status-text"></span>
                            <div class="status-shortcuts">
                                <kbd>↑↓</kbd> naviguer
                                <kbd>↵</kbd> sélectionner
                                <kbd>Échap</kbd> fermer
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    bindEvents() {
        super.bindEvents();
        
        const input = this.$('#demo-search-input');
        const clearBtn = this.$('#search-clear');
        const closeBtn = this.$('#demo-search-close');
        const helpBtn = this.$('#demo-search-help');
        
        // Événements de recherche
        if (input) {
            this.addEventHandler(input, 'input', (e) => this.handleInput(e));
            this.addEventHandler(input, 'focus', () => this.handleFocus());
            this.addEventHandler(input, 'blur', () => this.handleBlur());
            this.addEventHandler(input, 'keydown', (e) => this.handleKeydown(e));
        }
        
        // Boutons de contrôle
        if (clearBtn) {
            this.addEventHandler(clearBtn, 'click', () => this.clearSearch());
        }
        
        if (closeBtn) {
            this.addEventHandler(closeBtn, 'click', () => this.hide());
        }
        
        if (helpBtn) {
            this.addEventHandler(helpBtn, 'click', () => this.showHelp());
        }
        
        // Suggestions
        this.addDelegatedHandler('.suggestion-pill', 'click', (e) => {
            const query = e.target.dataset.query;
            if (query) {
                this.setSearchQuery(query);
            }
        });
        
        // Résultats
        this.addDelegatedHandler('.demo-search-result-item', 'click', (e) => {
            const demoId = e.target.closest('.demo-search-result-item')?.dataset.demo;
            if (demoId) {
                this.selectDemo(demoId);
            }
        });
        
        this.addDelegatedHandler('.demo-search-result-item', 'mouseenter', (e) => {
            const index = parseInt(e.target.closest('.demo-search-result-item')?.dataset.index);
            if (!isNaN(index)) {
                this.setSelectedIndex(index);
            }
        });
        
        // Clic à l'extérieur
        this.addEventHandler(document, 'click', (e) => {
            if (!this.element.contains(e.target)) {
                this.hideResults();
            }
        });
        
        // Écouter les changements de route
        this.on('routeChanged', (data) => {
            if (data.isDemoMode && !this.isVisible) {
                this.show();
            } else if (!data.isDemoMode && this.isVisible) {
                this.hide();
            }
        });
    }
    
    async loadSearchData() {
        try {
            // Charger depuis la configuration globale
            if (window.DEMO_SEARCH_CONFIG) {
                this.searchData = window.DEMO_SEARCH_CONFIG;
            } else {
                // Données par défaut
                this.searchData = await this.getDefaultSearchData();
            }
            
            this.log('Search data loaded:', this.searchData);
            
        } catch (error) {
            logger.error('Error loading search data:', error);
            this.searchData = await this.getDefaultSearchData();
        }
    }
    
    async getDefaultSearchData() {
        return {
            demos: [
                {
                    id: 'chiffrage-demo',
                    title: 'Outil de Chiffrage',
                    description: 'Chiffrage automatisé pour projets métalliques',
                    category: 'Devis',
                    keywords: ['chiffrage', 'devis', 'calcul', 'prix', 'métrage', 'coût', 'estimation'],
                    icon: 'fas fa-calculator',
                    requireAccess: true
                },
                {
                    id: 'dstv-demo',
                    title: 'Interface DSTV',
                    description: 'Import/Export de fichiers DSTV pour machines CNC',
                    category: 'Production',
                    keywords: ['dstv', 'cnc', 'usinage', 'fichier', 'machine', 'production', 'export'],
                    icon: 'fas fa-cog',
                    requireAccess: true
                }
            ],
            categories: [
                { id: 'devis', name: 'Devis & Chiffrage', icon: 'fas fa-calculator' },
                { id: 'production', name: 'Production', icon: 'fas fa-cog' },
                { id: 'logistique', name: 'Logistique', icon: 'fas fa-truck' },
                { id: 'gestion', name: 'Gestion', icon: 'fas fa-chart-bar' }
            ]
        };
    }
    
    setupKeyboardShortcuts() {
        this.addEventHandler(document, 'keydown', (e) => {
            // Ctrl+K pour ouvrir
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
                return;
            }
            
            // Échap pour fermer
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
                return;
            }
            
            // Alt+D pour démonstrations
            if (e.altKey && e.key === 'd') {
                e.preventDefault();
                this.show();
            }
        });
    }
    
    handleInput(e) {
        const query = e.target.value;
        this.searchState.query = query;
        
        // Afficher/masquer le bouton de clear
        const clearBtn = this.$('#search-clear');
        if (clearBtn) {
            clearBtn.style.display = query ? 'block' : 'none';
        }
        
        // Debounce de la recherche
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(() => {
            this.performSearch(query);
        }, this.searchConfig.debounceDelay);
    }
    
    handleFocus() {
        this.showResults();
        
        // Afficher la barre de statut
        const status = this.$('#demo-search-status');
        if (status) {
            status.style.display = 'block';
        }
    }
    
    handleBlur() {
        // Délayer la fermeture pour permettre les clics sur les résultats
        this.hideTimer = setTimeout(() => {
            this.hideResults();
        }, 200);
    }
    
    handleKeydown(e) {
        const results = this.$$('.demo-search-result-item');
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.setSelectedIndex(Math.min(this.selectedIndex + 1, results.length - 1));
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                this.setSelectedIndex(Math.max(this.selectedIndex - 1, -1));
                break;
                
            case 'Enter':
                e.preventDefault();
                if (this.selectedIndex >= 0 && results[this.selectedIndex]) {
                    const demoId = results[this.selectedIndex].dataset.demo;
                    this.selectDemo(demoId);
                }
                break;
                
            case 'Escape':
                this.hide();
                break;
        }
    }
    
    async performSearch(query) {
        if (!query || query.length < this.searchConfig.minLength) {
            this.showEmptyState();
            return;
        }
        
        this.setSearching(true);
        
        try {
            const results = await this.searchDemos(query);
            this.displayResults(results, query);
            this.addToHistory(query);
            
        } catch (error) {
            logger.error('Search error:', error);
            this.showError('Erreur lors de la recherche');
        } finally {
            this.setSearching(false);
        }
    }
    
    async searchDemos(query) {
        const normalizedQuery = query.toLowerCase().trim();
        
        if (!this.searchData?.demos) {
            return [];
        }
        
        const results = this.searchData.demos.filter(demo => {
            const searchableText = [
                demo.title,
                demo.description,
                demo.category,
                ...(demo.keywords || [])
            ].join(' ').toLowerCase();
            
            return searchableText.includes(normalizedQuery);
        });
        
        // Trier par pertinence (titre en premier, puis description, puis mots-clés)
        results.sort((a, b) => {
            const aTitle = a.title.toLowerCase().includes(normalizedQuery) ? 1 : 0;
            const bTitle = b.title.toLowerCase().includes(normalizedQuery) ? 1 : 0;
            
            if (aTitle !== bTitle) return bTitle - aTitle;
            
            const aDesc = a.description.toLowerCase().includes(normalizedQuery) ? 1 : 0;
            const bDesc = b.description.toLowerCase().includes(normalizedQuery) ? 1 : 0;
            
            return bDesc - aDesc;
        });
        
        return results.slice(0, this.searchConfig.maxResults);
    }
    
    displayResults(results, query) {
        const container = this.$('#demo-search-results');
        if (!container) return;
        
        this.currentResults = results;
        this.selectedIndex = -1;
        this.searchState.hasResults = results.length > 0;
        
        if (results.length === 0) {
            this.showNoResults(query);
            return;
        }
        
        container.innerHTML = results.map((demo, index) => `
            <div class="demo-search-result-item" data-demo="${demo.id}" data-index="${index}">
                <div class="result-icon">
                    <i class="${demo.icon}"></i>
                </div>
                <div class="result-content">
                    <div class="result-category">${demo.category}</div>
                    <div class="result-title">${this.highlightText(demo.title, query)}</div>
                    <div class="result-description">${this.highlightText(demo.description, query)}</div>
                </div>
                <div class="result-actions">
                    ${demo.requireAccess ? '<i class="fas fa-lock" title="Accès client requis"></i>' : ''}
                    <i class="fas fa-arrow-right"></i>
                </div>
            </div>
        `).join('');
        
        this.showResults();
        this.updateStatus(`${results.length} résultat${results.length > 1 ? 's' : ''} trouvé${results.length > 1 ? 's' : ''}`);
    }
    
    showEmptyState() {
        const container = this.$('#demo-search-results');
        if (!container) return;
        
        container.innerHTML = `
            <div class="search-empty-state">
                <i class="fas fa-search"></i>
                <p>Tapez pour rechercher parmi les démonstrations disponibles</p>
                <div class="search-suggestions">
                    <span class="suggestion-label">Suggestions :</span>
                    <button class="suggestion-pill" data-query="chiffrage">Chiffrage</button>
                    <button class="suggestion-pill" data-query="dstv">DSTV</button>
                    <button class="suggestion-pill" data-query="stock">Stock</button>
                    <button class="suggestion-pill" data-query="planning">Planning</button>
                </div>
            </div>
        `;
        
        this.currentResults = [];
        this.selectedIndex = -1;
        this.updateStatus('Recherchez une démonstration...');
    }
    
    showNoResults(query) {
        const container = this.$('#demo-search-results');
        if (!container) return;
        
        container.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search-minus"></i>
                <p>Aucun résultat pour "<strong>${this.escapeHtml(query)}</strong>"</p>
                <div class="no-results-suggestions">
                    <p>Essayez avec :</p>
                    <ul>
                        <li>Des mots-clés plus généraux</li>
                        <li>Des termes métier (chiffrage, production, stock...)</li>
                        <li>Des noms d'outils (DSTV, ERP, CNC...)</li>
                    </ul>
                </div>
            </div>
        `;
        
        this.updateStatus('Aucun résultat trouvé');
    }
    
    showError(message) {
        const container = this.$('#demo-search-results');
        if (!container) return;
        
        container.innerHTML = `
            <div class="search-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${this.escapeHtml(message)}</p>
                <button class="btn btn-sm btn-outline" onclick="this.closest('.demo-search-results').querySelector('.demo-search-input').focus()">
                    Réessayer
                </button>
            </div>
        `;
        
        this.updateStatus('Erreur de recherche');
    }
    
    setSelectedIndex(index) {
        // Supprimer l'ancienne sélection
        this.$$('.demo-search-result-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        // Appliquer la nouvelle sélection
        this.selectedIndex = index;
        
        if (index >= 0) {
            const selectedItem = this.$$('.demo-search-result-item')[index];
            if (selectedItem) {
                selectedItem.classList.add('selected');
                selectedItem.scrollIntoView({ block: 'nearest' });
            }
        }
    }
    
    selectDemo(demoId) {
        this.log('Demo selected:', demoId);
        
        // Fermer la recherche
        this.hide();
        
        // Émettre l'événement de navigation
        this.emit('demoSelected', { demoId });
        
        // Navigation via EventBus
        if (this.eventBus) {
            this.eventBus.emit('navigateToDemo', { demoId });
        }
        
        // Analytics
        this.trackSearch(this.searchState.query, demoId);
    }
    
    setSearchQuery(query) {
        const input = this.$('#demo-search-input');
        if (input) {
            input.value = query;
            input.focus();
            this.performSearch(query);
        }
    }
    
    clearSearch() {
        const input = this.$('#demo-search-input');
        if (input) {
            input.value = '';
            input.focus();
            this.showEmptyState();
        }
        
        const clearBtn = this.$('#search-clear');
        if (clearBtn) {
            clearBtn.style.display = 'none';
        }
    }
    
    show() {
        if (this.isVisible) return;
        
        this.element.style.display = 'block';
        setTimeout(() => {
            this.element.classList.add('active');
            this.isVisible = true;
            
            // Focus sur l'input
            const input = this.$('#demo-search-input');
            if (input) {
                input.focus();
            }
            
            // Ajuster le padding du body
            document.body.style.paddingTop = 'calc(var(--navbar-height) + var(--demo-banner-height, 80px))';
            
            this.emit('shown');
        }, 50);
    }
    
    hide() {
        if (!this.isVisible) return;
        
        this.element.classList.remove('active');
        setTimeout(() => {
            this.element.style.display = 'none';
            this.isVisible = false;
            
            // Restaurer le padding
            document.body.style.paddingTop = 'var(--navbar-height)';
            
            // Nettoyer
            this.clearSearch();
            this.hideResults();
            
            this.emit('hidden');
        }, 300);
    }
    
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    showResults() {
        clearTimeout(this.hideTimer);
        
        const results = this.$('#demo-search-results');
        if (results) {
            results.classList.add('show');
        }
    }
    
    hideResults() {
        const results = this.$('#demo-search-results');
        if (results) {
            results.classList.remove('show');
        }
        
        const status = this.$('#demo-search-status');
        if (status) {
            status.style.display = 'none';
        }
    }
    
    setSearching(isSearching) {
        this.searchState.isSearching = isSearching;
        
        const loading = this.$('#search-loading');
        if (loading) {
            loading.style.display = isSearching ? 'block' : 'none';
        }
    }
    
    updateStatus(text) {
        const statusText = this.$('.status-text');
        if (statusText) {
            statusText.textContent = text;
        }
    }
    
    showHelp() {
        const helpContent = {
            title: '🔍 Aide - Recherche Démos',
            content: `
                <div class="help-content">
                    <h4>Navigation rapide</h4>
                    <ul>
                        <li><kbd>Ctrl + K</kbd> - Ouvrir/fermer la recherche</li>
                        <li><kbd>Alt + D</kbd> - Accès direct aux démos</li>
                        <li><kbd>↑ ↓</kbd> - Naviguer dans les résultats</li>
                        <li><kbd>Entrée</kbd> - Sélectionner un résultat</li>
                        <li><kbd>Échap</kbd> - Fermer la recherche</li>
                    </ul>
                    
                    <h4>Conseils de recherche</h4>
                    <ul>
                        <li><strong>Mots-clés :</strong> chiffrage, dstv, usinage, métrage...</li>
                        <li><strong>Catégories :</strong> Devis, Production, Gestion...</li>
                        <li><strong>Fonctions :</strong> calcul, import, export, planning...</li>
                    </ul>
                    
                    <h4>Exemples</h4>
                    <div class="search-examples">
                        <button class="example-btn" data-query="chiffrage">chiffrage</button>
                        <button class="example-btn" data-query="dstv">dstv</button>
                        <button class="example-btn" data-query="métrage">métrage</button>
                        <button class="example-btn" data-query="stock">stock</button>
                    </div>
                </div>
            `
        };
        
        // Utiliser le système de modal si disponible
        if (window.modalSystem) {
            const modal = window.modalSystem.create({
                title: helpContent.title,
                content: helpContent.content,
                size: 'md'
            });
            
            window.modalSystem.show(modal.id);
            
            // Gérer les exemples
            modal.element.addEventListener('click', (e) => {
                if (e.target.classList.contains('example-btn')) {
                    const query = e.target.dataset.query;
                    window.modalSystem.close(modal.id);
                    this.setSearchQuery(query);
                }
            });
        } else {
            // Fallback simple
            alert('Raccourcis:\nCtrl+K: Ouvrir/fermer\n↑↓: Naviguer\nEntrée: Sélectionner\nÉchap: Fermer');
        }
    }
    
    addToHistory(query) {
        if (!query || this.searchHistory.includes(query)) return;
        
        this.searchHistory.unshift(query);
        if (this.searchHistory.length > this.maxHistorySize) {
            this.searchHistory = this.searchHistory.slice(0, this.maxHistorySize);
        }
    }
    
    trackSearch(query, selectedDemo = null) {
        if (window.oweoAnalytics) {
            window.oweoAnalytics.track('demo_search', {
                query,
                results_count: this.currentResults.length,
                selected_demo: selectedDemo,
                has_results: this.searchState.hasResults
            });
        }
    }
    
    highlightText(text, query) {
        if (!query) return this.escapeHtml(text);
        
        const escapedText = this.escapeHtml(text);
        const escapedQuery = this.escapeHtml(query);
        const regex = new RegExp(`(${escapedQuery})`, 'gi');
        
        return escapedText.replace(regex, '<mark>$1</mark>');
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Méthodes publiques
    getSearchHistory() {
        return [...this.searchHistory];
    }
    
    clearHistory() {
        this.searchHistory = [];
    }
    
    getState() {
        return {
            ...super.getState(),
            isVisible: this.isVisible,
            searchState: { ...this.searchState },
            resultsCount: this.currentResults.length,
            selectedIndex: this.selectedIndex
        };
    }
}

// Exposer la classe
window.DemoSearch = DemoSearch;