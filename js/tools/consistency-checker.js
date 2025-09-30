// ========================================
// js/tools/consistency-checker.js - Outil de vérification de cohérence
// ========================================

class ConsistencyChecker {
    constructor() {
        this.issues = [];
        this.warnings = [];
        this.infos = [];
    }
    
    /**
     * Vérifier la cohérence de toutes les configurations
     */
    checkAll() {
        logger.log('🔍 Démarrage de la vérification de cohérence...');
        
        this.issues = [];
        this.warnings = [];
        this.infos = [];
        
        // Vérifications principales
        this.checkCompanyInfo();
        this.checkAppConfig();
        this.checkCrossReferences();
        this.checkDOMElements();
        this.checkExternalServices();
        
        // Générer le rapport
        this.generateReport();
        
        return {
            success: this.issues.length === 0,
            issues: this.issues,
            warnings: this.warnings,
            infos: this.infos
        };
    }
    
    /**
     * Vérifier CompanyInfo
     */
    checkCompanyInfo() {
        if (!window.CompanyInfo) {
            this.addIssue('CompanyInfo non chargé');
            return;
        }
        
        const info = window.CompanyInfo;
        
        // Vérifications email
        if (!info.contact?.email) {
            this.addIssue('Email de contact manquant');
        } else if (!this.isValidEmail(info.contact.email)) {
            this.addIssue(`Email invalide: ${info.contact.email}`);
        } else if (!info.contact.email.includes('oweo')) {
            this.addWarning(`Email ne contient pas 'oweo': ${info.contact.email}`);
        }
        
        // Vérifications téléphone
        if (!info.contact?.phone) {
            this.addIssue('Téléphone de contact manquant');
        } else if (!info.contact.phone.startsWith('+33')) {
            this.addWarning(`Téléphone ne commence pas par +33: ${info.contact.phone}`);
        }
        
        // Vérifications URLs
        if (info.urls?.website && !info.urls.website.startsWith('https://')) {
            this.addIssue(`URL website doit être HTTPS: ${info.urls.website}`);
        }
        
        if (info.urls?.calendly && !info.urls.calendly.includes('calendly.com')) {
            this.addIssue(`URL Calendly invalide: ${info.urls.calendly}`);
        }
        
        this.addInfo('CompanyInfo vérifié');
    }
    
    /**
     * Vérifier AppConfig
     */
    checkAppConfig() {
        if (!window.AppConfig) {
            this.addIssue('AppConfig non chargé');
            return;
        }
        
        const config = window.AppConfig;
        
        // Vérifier que les getters fonctionnent
        try {
            const contact = config.contact;
            if (!contact?.email) {
                this.addIssue('AppConfig.contact.email non accessible');
            }
        } catch (error) {
            this.addIssue(`Erreur AppConfig.contact: ${error.message}`);
        }
        
        try {
            const calendlyUrl = config.calendlyUrl;
            if (!calendlyUrl) {
                this.addIssue('AppConfig.calendlyUrl non accessible');
            }
        } catch (error) {
            this.addIssue(`Erreur AppConfig.calendlyUrl: ${error.message}`);
        }
        
        this.addInfo('AppConfig vérifié');
    }
    
    /**
     * Vérifier les références croisées
     */
    checkCrossReferences() {
        if (!window.CompanyInfo || !window.AppConfig) {
            this.addWarning('Impossible de vérifier les références croisées');
            return;
        }
        
        const companyEmail = window.CompanyInfo.contact?.email;
        const appConfigEmail = window.AppConfig.contact?.email;
        
        if (companyEmail && appConfigEmail && companyEmail !== appConfigEmail) {
            this.addIssue(`Incohérence email: CompanyInfo(${companyEmail}) vs AppConfig(${appConfigEmail})`);
        }
        
        const companyPhone = window.CompanyInfo.contact?.phone;
        const appConfigPhone = window.AppConfig.contact?.phone;
        
        if (companyPhone && appConfigPhone && companyPhone !== appConfigPhone) {
            this.addIssue(`Incohérence téléphone: CompanyInfo(${companyPhone}) vs AppConfig(${appConfigPhone})`);
        }
        
        const companyCalendly = window.CompanyInfo.urls?.calendly;
        const appConfigCalendly = window.AppConfig.calendlyUrl;
        
        if (companyCalendly && appConfigCalendly && companyCalendly !== appConfigCalendly) {
            this.addIssue(`Incohérence Calendly: CompanyInfo(${companyCalendly}) vs AppConfig(${appConfigCalendly})`);
        }
        
        this.addInfo('Références croisées vérifiées');
    }
    
    /**
     * Vérifier les éléments DOM
     */
    checkDOMElements() {
        // Vérifier les liens de contact dans le DOM
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        
        const uniqueEmails = new Set();
        const uniquePhones = new Set();
        
        emailLinks.forEach(link => {
            const email = link.href.replace('mailto:', '').split('?')[0];
            uniqueEmails.add(email);
        });
        
        phoneLinks.forEach(link => {
            const phone = link.href.replace('tel:', '');
            uniquePhones.add(phone);
        });
        
        if (uniqueEmails.size > 1) {
            this.addWarning(`Emails multiples dans le DOM: ${Array.from(uniqueEmails).join(', ')}`);
        }
        
        if (uniquePhones.size > 1) {
            this.addWarning(`Téléphones multiples dans le DOM: ${Array.from(uniquePhones).join(', ')}`);
        }
        
        // Vérifier la cohérence avec la config
        const configEmail = window.CompanyInfo?.contact?.email;
        if (configEmail && uniqueEmails.size > 0 && !uniqueEmails.has(configEmail)) {
            this.addIssue(`Email config (${configEmail}) absent du DOM`);
        }
        
        this.addInfo(`DOM vérifié: ${emailLinks.length} liens email, ${phoneLinks.length} liens téléphone`);
    }
    
    /**
     * Vérifier les services externes
     */
    checkExternalServices() {
        // Vérifier Calendly
        if (typeof window.Calendly !== 'undefined') {
            this.addInfo('Widget Calendly chargé');
        } else {
            this.addWarning('Widget Calendly non chargé');
        }
        
        // Vérifier FontAwesome
        const faElement = document.querySelector('.fas, .fab, .far');
        if (faElement) {
            this.addInfo('FontAwesome détecté');
        } else {
            this.addWarning('FontAwesome non détecté');
        }
    }
    
    /**
     * Utilitaires
     */
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    addIssue(message) {
        this.issues.push({ type: 'ERROR', message, timestamp: new Date() });
    }
    
    addWarning(message) {
        this.warnings.push({ type: 'WARNING', message, timestamp: new Date() });
    }
    
    addInfo(message) {
        this.infos.push({ type: 'INFO', message, timestamp: new Date() });
    }
    
    /**
     * Générer le rapport
     */
    generateReport() {
        logger.log('\n📊 RAPPORT DE COHÉRENCE');
        logger.log('========================');
        
        if (this.issues.length === 0) {
            logger.log('✅ Aucun problème détecté');
        } else {
            logger.log(`❌ ${this.issues.length} problème(s) détecté(s):`);
            this.issues.forEach(issue => {
                logger.log(`  ❌ ${issue.message}`);
            });
        }
        
        if (this.warnings.length > 0) {
            logger.log(`\n⚠️ ${this.warnings.length} avertissement(s):`);
            this.warnings.forEach(warning => {
                logger.log(`  ⚠️ ${warning.message}`);
            });
        }
        
        if (this.infos.length > 0) {
            logger.log(`\nℹ️ Informations (${this.infos.length}):`);
            this.infos.forEach(info => {
                logger.log(`  ℹ️ ${info.message}`);
            });
        }
        
        logger.log('\n========================');
        
        const score = this.calculateScore();
        logger.log(`📈 Score de cohérence: ${score}%`);
        
        if (score < 80) {
            logger.log('🔴 Score faible - corrections recommandées');
        } else if (score < 95) {
            logger.log('🟡 Score correct - améliorations possibles');
        } else {
            logger.log('🟢 Excellente cohérence');
        }
    }
    
    calculateScore() {
        const totalChecks = this.issues.length + this.warnings.length + this.infos.length;
        if (totalChecks === 0) return 100;
        
        const errorWeight = 10;
        const warningWeight = 3;
        
        const penalty = (this.issues.length * errorWeight) + (this.warnings.length * warningWeight);
        const maxPenalty = totalChecks * errorWeight;
        
        const score = Math.max(0, Math.round(((maxPenalty - penalty) / maxPenalty) * 100));
        return score;
    }
    
    /**
     * Mode d'écoute continue
     */
    startMonitoring(interval = 10000) {
        logger.log(`🔄 Démarrage de la surveillance (${interval/1000}s)`);
        
        setInterval(() => {
            const result = this.checkAll();
            if (!result.success) {
                logger.warn('🚨 Nouvelles incohérences détectées');
            }
        }, interval);
    }
    
    /**
     * Export du rapport
     */
    exportReport() {
        const report = {
            timestamp: new Date().toISOString(),
            score: this.calculateScore(),
            summary: {
                issues: this.issues.length,
                warnings: this.warnings.length,
                infos: this.infos.length
            },
            details: {
                issues: this.issues,
                warnings: this.warnings,
                infos: this.infos
            }
        };
        
        return JSON.stringify(report, null, 2);
    }
}

// Créer une instance globale
window.ConsistencyChecker = ConsistencyChecker;

// Auto-lancement en mode développement
if (window.location.hostname === 'localhost') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            const checker = new ConsistencyChecker();
            const result = checker.checkAll();
            
            // Exposer pour tests manuels
            window.checkConsistency = () => checker.checkAll();
            window.startMonitoring = () => checker.startMonitoring();
            
            logger.log('💡 Utilisez checkConsistency() pour relancer une vérification');
            logger.log('💡 Utilisez startMonitoring() pour surveiller en continu');
        }, 2000);
    });
}