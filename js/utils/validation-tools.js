// ========================================
// js/utils/validation-tools.js - Outils de validation
// ========================================

class ValidationTools {
    static validateSiteIntegrity() {
        const checks = [];
        
        // Vérifier les composants essentiels
        checks.push(this.checkComponent('OweoApp', window.OweoApp));
        checks.push(this.checkComponent('OweoRouter', window.OweoRouter));
        checks.push(this.checkComponent('BaseComponent', window.BaseComponent));
        checks.push(this.checkComponent('DemoSearch', window.DemoSearch));
        
        // Vérifier les pages
        checks.push(this.checkComponent('HomePage', window.HomePage));
        checks.push(this.checkComponent('ServicesPage', window.ServicesPage));
        
        // Vérifier les démos
        checks.push(this.checkComponent('ChiffrageDemo', window.ChiffrageDemo));
        checks.push(this.checkComponent('DSTVDemo', window.DSTVDemo));
        
        // Vérifier les utilitaires
        checks.push(this.checkComponent('DOMUtils', window.DOMUtils));
        checks.push(this.checkComponent('AnimationUtils', window.AnimationUtils));
        
        // Vérifier les configurations
        checks.push(this.checkConfig('DEMO_SEARCH_CONFIG', window.DEMO_SEARCH_CONFIG));
        
        // Vérifier les éléments DOM
        checks.push(this.checkElement('navbar', '#navbar'));
        checks.push(this.checkElement('app', '#app'));
        checks.push(this.checkElement('footer', '#footer'));
        checks.push(this.checkElement('demo-search-banner', '#demo-search-banner'));
        
        // Résultats
        const passed = checks.filter(check => check.status === 'pass').length;
        const failed = checks.filter(check => check.status === 'fail').length;

        logger.group('Validation de l\'intégrité du site', false);
        logger.log(`Réussis: ${passed}`);
        logger.log(`Échoués: ${failed}`);

        checks.forEach(check => {
            const icon = check.status === 'pass' ? '✅' : '❌';
            logger.log(`${icon} ${check.name}: ${check.message}`);
        });

        logger.groupEnd();
        
        return {
            total: checks.length,
            passed,
            failed,
            checks,
            success: failed === 0
        };
    }
    
    static checkComponent(name, component) {
        return {
            name,
            status: typeof component === 'function' ? 'pass' : 'fail',
            message: typeof component === 'function' 
                ? 'Composant disponible' 
                : 'Composant manquant'
        };
    }
    
    static checkConfig(name, config) {
        return {
            name,
            status: config && typeof config === 'object' ? 'pass' : 'fail',
            message: config && typeof config === 'object' 
                ? 'Configuration chargée' 
                : 'Configuration manquante'
        };
    }
    
    static checkElement(name, selector) {
        const element = document.querySelector(selector);
        return {
            name,
            status: element ? 'pass' : 'fail',
            message: element ? 'Élément présent' : 'Élément manquant'
        };
    }
    
    static generateReport() {
        const validation = this.validateSiteIntegrity();
        
        const report = `
# Rapport de Validation - Site Oweo

**Date:** ${new Date().toLocaleString('fr-FR')}
**Statut global:** ${validation.success ? '✅ SUCCÈS' : '❌ ÉCHEC'}

## Résumé
- Total de vérifications: ${validation.total}
- Réussies: ${validation.passed}
- Échouées: ${validation.failed}

## Détails des vérifications

${validation.checks.map(check => `
### ${check.name}
- **Statut:** ${check.status === 'pass' ? '✅ Réussi' : '❌ Échoué'}
- **Message:** ${check.message}
`).join('')}

## Recommandations

${validation.failed > 0 ? `
⚠️ **Actions requises:**
${validation.checks
    .filter(check => check.status === 'fail')
    .map(check => `- Corriger: ${check.name}`)
    .join('\n')}
` : '✅ Tous les composants sont correctement chargés.'}

---
*Rapport généré automatiquement par ValidationTools*
        `;
        
        return report;
    }
}