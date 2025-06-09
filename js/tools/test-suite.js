// ========================================
// js/tools/test-suite.js - Suite de tests automatisés
// ========================================

class OweoTestSuite {
    constructor() {
        this.tests = [];
        this.results = [];
        this.startTime = null;
        this.endTime = null;
    }
    
    // Framework de test simple
    test(name, testFunction) {
        this.tests.push({ name, testFunction });
    }
    
    async runAll() {
        console.log('🧪 Démarrage de la suite de tests Oweo...');
        console.log('==========================================');
        
        this.startTime = Date.now();
        this.results = [];
        
        for (const test of this.tests) {
            try {
                const start = Date.now();
                await test.testFunction();
                const duration = Date.now() - start;
                
                this.results.push({
                    name: test.name,
                    status: 'PASS',
                    duration,
                    error: null
                });
                
                console.log(`✅ ${test.name} (${duration}ms)`);
                
            } catch (error) {
                const duration = Date.now() - start;
                
                this.results.push({
                    name: test.name,
                    status: 'FAIL',
                    duration,
                    error: error.message
                });
                
                console.log(`❌ ${test.name} - ${error.message} (${duration}ms)`);
            }
        }
        
        this.endTime = Date.now();
        this.generateReport();
    }
    
    generateReport() {
        const totalDuration = this.endTime - this.startTime;
        const passed = this.results.filter(r => r.status === 'PASS').length;
        const failed = this.results.filter(r => r.status === 'FAIL').length;
        
        console.log('\n==========================================');
        console.log('📊 RAPPORT DE TESTS');
        console.log('==========================================');
        console.log(`⏱️  Durée totale: ${totalDuration}ms`);
        console.log(`✅ Tests réussis: ${passed}`);
        console.log(`❌ Tests échoués: ${failed}`);
        console.log(`📈 Taux de réussite: ${Math.round((passed / this.tests.length) * 100)}%`);
        
        if (failed > 0) {
            console.log('\n🔍 Détails des échecs:');
            this.results
                .filter(r => r.status === 'FAIL')
                .forEach(result => {
                    console.log(`  ❌ ${result.name}: ${result.error}`);
                });
        }
        
        return {
            total: this.tests.length,
            passed,
            failed,
            duration: totalDuration,
            results: this.results
        };
    }
    
    // Tests prédéfinis pour Oweo
    setupOweoTests() {
        // Test 1: Vérification des composants core
        this.test('Core Components Available', () => {
            const required = [
                'OweoApp', 'OweoRouter', 'BaseComponent', 'EventBus',
                'DOMUtils', 'AnimationUtils', 'ModalSystem'
            ];
            
            for (const component of required) {
                if (typeof window[component] !== 'function') {
                    throw new Error(`${component} n'est pas disponible`);
                }
            }
        });
        
        // Test 2: Vérification du DOM
        this.test('DOM Elements Present', () => {
            const requiredElements = ['#navbar', '#app', '#footer', '#demo-search-banner'];
            
            for (const selector of requiredElements) {
                if (!document.querySelector(selector)) {
                    throw new Error(`Élément ${selector} manquant`);
                }
            }
        });
        
        // Test 3: Configuration des démos
        this.test('Demo Configuration Valid', () => {
            if (!window.DEMO_SEARCH_CONFIG) {
                throw new Error('Configuration démos manquante');
            }
            
            if (!Array.isArray(window.DEMO_SEARCH_CONFIG.demos)) {
                throw new Error('Liste des démos invalide');
            }
            
            if (window.DEMO_SEARCH_CONFIG.demos.length === 0) {
                throw new Error('Aucune démo configurée');
            }
        });
        
        // Test 4: Système de recherche
        this.test('Demo Search Functionality', async () => {
            if (!window.DemoSearch) {
                throw new Error('DemoSearch non disponible');
            }
            
            // Simuler une recherche
            const demoSearch = document.getElementById('demo-search-input');
            if (!demoSearch) {
                throw new Error('Input de recherche manquant');
            }
            
            // Test de saisie
            demoSearch.value = 'chiffrage';
            demoSearch.dispatchEvent(new Event('input'));
            
            // Vérifier les résultats après un délai
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const results = document.querySelectorAll('.demo-search-result-item');
            if (results.length === 0) {
                throw new Error('Aucun résultat de recherche affiché');
            }
        });
        
        // Test 5: Navigation
        this.test('Router Navigation', async () => {
            if (!window.app || !window.app.router) {
                throw new Error('Router non initialisé');
            }
            
            // Tester la navigation vers home
            await window.app.router.navigate('home', false);
            
            if (window.app.router.getCurrentRoute()?.path !== 'home') {
                throw new Error('Navigation vers home échouée');
            }
        });
        
        // Test 6: Accès client
        this.test('Client Access System', () => {
            if (!window.OweoClientAccess) {
                throw new Error('Système d\'accès client manquant');
            }
            
            // Test authentification avec code valide
            const result = window.OweoClientAccess.authenticate('DEMO-CLIENT');
            if (!result) {
                throw new Error('Authentification client échouée');
            }
            
            // Vérifier l'accès
            if (!window.OweoClientAccess.hasAccess()) {
                throw new Error('Vérification d\'accès échouée');
            }
        });
        
        // Test 7: Système de modales
        this.test('Modal System', () => {
            if (!window.modalSystem) {
                throw new Error('Système de modales manquant');
            }
            
            // Créer une modal de test
            const modal = window.modalSystem.create({
                title: 'Test Modal',
                content: 'Contenu de test'
            });
            
            if (!modal.id) {
                throw new Error('Création de modal échouée');
            }
            
            // Nettoyer
            window.modalSystem.close(modal.id);
        });
        
        // Test 8: Responsive Design
        this.test('Responsive Design', () => {
            const viewport = document.querySelector('meta[name="viewport"]');
            if (!viewport) {
                throw new Error('Meta viewport manquant');
            }
            
            // Vérifier quelques classes responsive
            const styles = getComputedStyle(document.documentElement);
            const containerMaxWidth = styles.getPropertyValue('--container-max-width');
            
            if (!containerMaxWidth) {
                throw new Error('Variables CSS responsive manquantes');
            }
        });
        
        // Test 9: Performance
        this.test('Performance Checks', () => {
            // Vérifier le nombre d'éléments DOM (ne doit pas être excessif)
            const domElements = document.querySelectorAll('*').length;
            if (domElements > 1000) {
                console.warn(`⚠️ Nombre élevé d'éléments DOM: ${domElements}`);
            }
            
            // Vérifier les ressources chargées
            if (performance.getEntriesByType) {
                const resources = performance.getEntriesByType('resource');
                const slowResources = resources.filter(r => r.duration > 1000);
                
                if (slowResources.length > 0) {
                    console.warn(`⚠️ Ressources lentes détectées:`, slowResources.map(r => r.name));
                }
            }
        });
        
        // Test 10: Accessibilité
        this.test('Accessibility Basics', () => {
            // Vérifier les alt text des images
            const images = document.querySelectorAll('img:not([alt])');
            if (images.length > 0) {
                throw new Error(`${images.length} images sans attribut alt`);
            }
            
            // Vérifier les labels des formulaires
            const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
            const unlabeledInputs = Array.from(inputs).filter(input => {
                const label = document.querySelector(`label[for="${input.id}"]`);
                return !label && input.type !== 'hidden';
            });
            
            if (unlabeledInputs.length > 0) {
                console.warn(`⚠️ ${unlabeledInputs.length} champs sans label détectés`);
            }
        });
    }
    
    // Méthode statique pour lancer tous les tests
    static async runOweoTests() {
        const suite = new OweoTestSuite();
        suite.setupOweoTests();
        return await suite.runAll();
    }
}