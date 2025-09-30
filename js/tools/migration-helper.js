// ========================================
// js/tools/migration-helper.js - Assistant de migration
// ========================================

class MigrationHelper {
    static async checkOldStructure() {
        logger.group('Vérification de l\'ancienne structure');
        
        const oldFiles = [
            'js/components/navbar.js',
            'js/pages/home.js',
            'js/pages/services.js',
            'js/pages/outil-chiffrage-demo.js',
            'js/utils/client-access.js'
        ];
        
        const results = [];
        
        for (const file of oldFiles) {
            try {
                const response = await fetch(file, { method: 'HEAD' });
                results.push({
                    file,
                    exists: response.ok,
                    status: response.status
                });
            } catch (error) {
                results.push({
                    file,
                    exists: false,
                    error: error.message
                });
            }
        }
        
        results.forEach(result => {
            const icon = result.exists ? '✅' : '❌';
            logger.log(`${icon} ${result.file}`);
        });
        
        logger.groupEnd();
        return results;
    }
    
    static generateBackupScript() {
        return `#!/bin/bash
# Script de sauvegarde avant migration

echo "🔄 Sauvegarde du site existant..."

# Créer le dossier de sauvegarde
BACKUP_DIR="backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Sauvegarder les fichiers existants
cp -r css/ "$BACKUP_DIR/" 2>/dev/null || echo "❌ Dossier css/ non trouvé"
cp -r js/ "$BACKUP_DIR/" 2>/dev/null || echo "❌ Dossier js/ non trouvé"
cp index.html "$BACKUP_DIR/" 2>/dev/null || echo "❌ index.html non trouvé"

echo "✅ Sauvegarde terminée dans: $BACKUP_DIR"
echo ""
echo "Pour restaurer en cas de problème:"
echo "  cp -r $BACKUP_DIR/* ."
        `;
    }
    
    static generateDeploymentChecklist() {
        return `
# Checklist de Déploiement - Site Refactorisé

## Avant Migration
- [ ] Sauvegarder l'ancien site
- [ ] Tester l'ancien site une dernière fois
- [ ] Noter les configurations spécifiques

## Migration
- [ ] Remplacer index.html
- [ ] Créer la structure CSS modulaire
- [ ] Migrer les fichiers JavaScript
- [ ] Configurer demo-config.js
- [ ] Mettre à jour les codes d'accès client

## Tests Post-Migration
- [ ] Page d'accueil s'affiche correctement
- [ ] Navigation fonctionne
- [ ] Recherche de démos opérationnelle
- [ ] Accès client fonctionne
- [ ] Démos Chiffrage et DSTV accessibles
- [ ] Version mobile responsive
- [ ] Pas d'erreurs console

## Validation
- [ ] Exécuter ValidationTools.validateSiteIntegrity()
- [ ] Vérifier les analytics/tracking
- [ ] Tester sur différents navigateurs
- [ ] Valider l'accessibilité

## Production
- [ ] Mettre à jour la documentation
- [ ] Former les utilisateurs si nécessaire
- [ ] Monitorer les erreurs post-déploiement
        `;
    }
}

// ========================================
// Initialisation globale et outils debug
// ========================================

// Debug Tools
window.OweoDebug = {
    validateSite: () => ValidationTools.validateSiteIntegrity(),
    generateReport: () => ValidationTools.generateReport(),
    checkMigration: () => MigrationHelper.checkOldStructure(),
    
    // Accès rapide aux composants
    get app() { return window.app; },
    get router() { return window.app?.router; },
    get eventBus() { return window.app?.eventBus; },
    get componentManager() { return window.app?.componentManager; },
    
    // Utilitaires de test
    testDemoSearch() {
        const demoSearch = document.getElementById('demo-search-banner');
        if (demoSearch) {
            demoSearch.style.display = 'block';
            setTimeout(() => demoSearch.classList.add('active'), 50);
        }
    },
    
    testModal() {
        const modal = modalSystem.create({
            title: 'Test Modal',
            content: '<p>Ceci est un test de modal</p>',
            size: 'md'
        });
        modalSystem.show(modal.id);
    },
    
    simulateClientAccess() {
        if (window.OweoClientAccess) {
            window.OweoClientAccess.authenticate('DEMO-CLIENT');
        }
    }
};

// Exposer les nouvelles classes
window.ServicesPage = ServicesPage;
window.OweoFooter = OweoFooter;
window.ModalSystem = ModalSystem;
window.ValidationTools = ValidationTools;
window.MigrationHelper = MigrationHelper;

// Auto-validation en mode debug
if (window.location.search.includes('debug=true')) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            logger.log('🚀 Mode debug activé - Validation automatique');
            window.OweoDebug.validateSite();
        }, 2000);
    });
}