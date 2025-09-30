// ========================================
// js/pages/cgv.js - Page des Conditions Générales de Vente
// ========================================

class CGVPage extends BasePage {
    constructor() {
        super({
            id: 'cgv',
            title: 'Conditions Générales de Vente',
            description: 'Conditions Générales de Vente d\'OWEO - Prestations de services informatiques'
        });
        
        // Version et date des CGV
        this.cgvInfo = {
            version: '1.0',
            dateVersion: '1er janvier 2024',
            dateApplication: '1er janvier 2024'
        };
        
        // Sections pour la navigation
        this.sections = [
            { id: 'dispositions-generales', title: '1. Dispositions générales' },
            { id: 'commandes-devis', title: '2. Commandes et devis' },
            { id: 'prestations', title: '3. Prestations de service' },
            { id: 'prix', title: '4. Prix' },
            { id: 'paiement', title: '5. Paiement' },
            { id: 'execution', title: '6. Exécution du service' },
            { id: 'responsabilite', title: '7. Responsabilité' },
            { id: 'propriete-intellectuelle', title: '8. Propriété intellectuelle' },
            { id: 'donnees-personnelles', title: '9. Données personnelles' },
            { id: 'tribunal', title: '10. Tribunal compétent' },
            { id: 'loi-applicable', title: '11. Langue et loi applicables' }
        ];
        
        // Récupérer les infos de l'entreprise
        this.companyInfo = window.CompanyInfo || {};

        // Stockage des écouteurs pour le nettoyage
        this._eventListeners = [];

        // État de génération PDF
        this.pdfGenerating = false;
    }
    
    getTemplate() {
        return `
            <div class="cgv-page">
                <!-- Header -->
                <section class="cgv-header page-header">
                    <div class="container">
                        <div class="page-breadcrumb">
                            <a href="#home" class="nav-link">Accueil</a>
                            <i class="fas fa-chevron-right"></i>
                            <span>CGV</span>
                        </div>
                        
                        <h1 class="page-title fade-in-up">Conditions Générales de Vente</h1>
                        
                        <div class="cgv-meta fade-in-up">
                            <div class="meta-item">
                                <i class="fas fa-calendar-alt"></i>
                                <span>Version ${this.cgvInfo.version} du ${this.cgvInfo.dateVersion}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-gavel"></i>
                                <span>En vigueur depuis le ${this.cgvInfo.dateApplication}</span>
                            </div>
                            <div class="meta-item">
                                <button class="btn btn-outline btn-sm" onclick="cgvPageInstance.downloadPDF()">
                                    <i class="fas fa-download"></i>
                                    Télécharger en PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Content -->
                <section class="cgv-content">
                    <div class="container">
                        <!-- Table des matières mobile -->
                        <details class="cgv-mobile-toc">
                            <summary>
                                <i class="fas fa-list"></i>
                                Table des matières
                            </summary>
                            <nav class="toc">
                                ${this.sections.map(section => `
                                    <a href="#${section.id}" class="toc-link">
                                        ${section.title}
                                    </a>
                                `).join('')}
                            </nav>
                        </details>
                        
                        <div class="cgv-layout">
                            <!-- Navigation latérale -->
                            <aside class="cgv-nav">
                                <div class="nav-sticky">
                                    <h3>Sommaire</h3>
                                    <nav class="toc">
                                        ${this.sections.map(section => `
                                            <a href="#${section.id}" class="toc-link">
                                                ${section.title}
                                            </a>
                                        `).join('')}
                                    </nav>
                                    
                                    <div class="cgv-actions">
                                        <button class="btn btn-outline btn-sm btn-block" onclick="window.print()">
                                            <i class="fas fa-print"></i>
                                            Imprimer
                                        </button>
                                    </div>
                                </div>
                            </aside>
                            
                            <!-- Contenu principal -->
                            <main class="cgv-main">
                                <div class="cgv-document">
                                    <!-- Informations société depuis CompanyInfo -->
                                    <div class="company-info">
                                        <h2>${this.companyInfo.fullName || 'OWEO'}</h2>
                                        <p>
                                            <strong>Raison sociale :</strong> ${this.companyInfo.fullName} ${this.companyInfo.legal?.forme || 'SAS'}<br>
                                            <strong>SIREN :</strong> ${this.companyInfo.legal?.siren || '945 028 199'}<br>
                                            <strong>SIRET :</strong> ${this.companyInfo.legal?.siret || '945 028 199 00012'}<br>
                                            <strong>TVA intracommunautaire :</strong> ${this.companyInfo.legal?.tva || 'FR37 945 028 199'}<br>
                                            <strong>Siège social :</strong> ${this.companyInfo.address?.complete || '10 rue du Sous-Bois, 44700 Orvault'}<br>
                                            <strong>Forme juridique :</strong> ${this.getFormeJuridique()}<br>
                                            <strong>Code NAF/APE :</strong> ${this.companyInfo.legal?.ape || '62.02A'} - Conseil en systèmes et logiciels informatiques<br>
                                            <strong>Capital social :</strong> ${this.companyInfo.legal?.capital || '1 000 €'}
                                        </p>
                                    </div>
                                    
                                    <hr class="section-divider">
                                    
                                    <!-- Article 1 -->
                                    <section id="dispositions-generales" class="cgv-section">
                                        <h2>1. Dispositions générales</h2>
                                        
                                        <h3>1.1 Objet</h3>
                                        <p>Les présentes Conditions Générales de Vente (ci-après dénommées "CGV") constituent, conformément à l'article L. 441-1 du code du commerce, le socle unique de la relation commerciale entre ${this.companyInfo.fullName || 'OWEO'} (ci-après dénommée "le Prestataire") et ses clients (ci-après dénommés "le Client").</p>
                                        <p>${this.companyInfo.fullName || 'OWEO'} exerce des activités de prestations de services informatiques et d'assistance à distance dans le domaine informatique, avec une expertise particulière dans les solutions ERP pour l'industrie métallique.</p>
                                        <p>Les présentes CGV détaillent les conditions contractuelles (droits et obligations) entre le Prestataire et le Client, dans le cadre des prestations définies au titre des conditions particulières.</p>
                                        <p>Elles s'appliquent, sans restriction ni réserve, à tous les services rendus par le Prestataire auprès de ses Clients, quelles que soient les clauses pouvant figurer sur les documents du Client, et notamment ses conditions générales d'achat. Elles sont applicables de plein droit à tout contrat portant sur la fourniture de nos services conclu par un Client.</p>
                                        <p>Conformément à la réglementation en vigueur, le Prestataire se réserve le droit de déroger à certaines clauses des présentes CGV, en fonction des négociations menées avec le Client, par l'établissement de Conditions de vente particulières.</p>
                                        
                                        <h3>1.2 Acceptation</h3>
                                        <p>Le Client déclare avoir pris connaissance des présentes CGV avant de passer commande et les avoir acceptées sans réserve. Toute commande vaut acceptation des conditions générales de vente de prestations de services en vigueur.</p>
                                        <p>Les CGV prévalent sur toutes autres conditions, à l'exception de celles expressément approuvées par écrit par le Prestataire, notamment dans les conditions particulières. À cet égard, les CGV sont opposables au client conformément aux termes de l'article 1119 du Code civil.</p>
                                        
                                        <h3>1.3 Dispositions contractuelles</h3>
                                        <p>La nullité d'une clause contractuelle n'entraîne pas la nullité des conditions générales de vente sauf s'il s'agit d'une clause impulsive et déterminante ayant amené l'une des parties à conclure le contrat de prestation de services.</p>
                                        <p>Le fait que le Prestataire ne se prévale pas à un moment donné de l'une des clauses des CGV ne vaut pas renonciation à celles-ci qui pourront s'appliquer ultérieurement.</p>
                                        
                                        <h3>1.4 Modification</h3>
                                        <p>Le Prestataire se réserve la possibilité de modifier les CGV à tout moment. Les CGV applicables sont alors celles portées à la connaissance du Client au moment de la commande.</p>
                                        <p>Toute modification des conditions générales de vente sera présumée acceptée par le Client qui, après avoir été averti par un simple écrit, n'a pas exprimé son désaccord dans un délai de trente jours.</p>
                                    </section>
                                    
                                    <!-- Article 2 -->
                                    <section id="commandes-devis" class="cgv-section">
                                        <h2>2. Commandes et devis</h2>
                                        
                                        <h3>2.1 Caractère définitif</h3>
                                        <p>Définition de la commande : Tout ordre du Client portant sur les prestations et tarifs du Prestataire acceptées par ce dernier, accompagné du versement de l'acompte éventuellement demandé.</p>
                                        <p>Sauf cas particulier, les services du Prestataire donnent lieu à l'établissement d'un devis préalable (lettre de mission valant conditions particulières mentionnant notamment les prestations, leurs prix et la durée et/ou date d'exécution du contrat).</p>
                                        <p>La commande ne sera considérée comme définitive qu'après acceptation expresse et écrite des deux Parties du devis du Prestataire pendant sa durée de validité, mentionnée sur le devis et ne peut être remise en cause que dans les cas limitativement énumérés dans les présentes conditions générales.</p>
                                        
                                        <h3>2.2 Modification ou annulation</h3>
                                        <p>Les éventuelles modifications de la commande demandées par le Client ne seront prises en compte, dans la limite des possibilités du Prestataire, que si elles sont notifiées par écrit, 10 jours au moins avant la date prévue pour la fourniture des Services commandés, après signature par le Client d'un bon de commande spécifique et ajustement éventuel du prix.</p>
                                        <p>Le Prestataire se réserve le droit de refuser ou annuler toute commande d'un Client avec lequel il existerait un litige relatif au paiement d'une commande antérieure, ou en raison d'un motif légitime.</p>
                                        <p>En cas d'annulation de la commande par le Client après son acceptation par le Prestataire moins de 10 jours avant la date prévue pour la Fourniture des Services commandés, pour quelque raison que ce soit hormis la force majeure, l'acompte versé à la commande sera de plein droit acquis au Prestataire et ne pourra donner lieu à un quelconque remboursement.</p>
                                        
                                        <h3>2.3 Durée et résiliation</h3>
                                        
                                        <h4>2.3.1 Durée du contrat</h4>
                                        <p>Le contrat prend effet dès acceptation par le Client du devis proposé pendant sa durée de validité ; l'accomplissement de la mission par le Prestataire ne commencera qu'après réception de tous les documents et informations demandés au Client ou à un tiers.</p>
                                        <p>La durée du contrat peut être déterminée ou indéterminée, selon indication des conditions particulières.</p>
                                        <p>Le contrat à durée déterminée prend fin sans formalisme particulier, à date d'échéance mentionnée aux conditions particulières ou à défaut, à l'issue de l'exécution de la ou des prestation(s) convenue(s).</p>
                                        <p>Sauf accord spécifique écrit, aucun contrat à durée déterminée ne peut être reconduit tacitement.</p>
                                        <p>Le contrat à durée indéterminée peut être résilié par l'une ou l'autre des Parties, par lettre recommandée avec accusé de réception ou tout autre support écrit contre accusé de réception express (étant exclus les simples accusés de lecture ou de remise à destinataire), à effet du 31 décembre de l'année en cours, à condition de respecter un délai de préavis d'une durée d'un mois, sauf modalités différentes stipulées aux conditions particulières.</p>
                                        
                                        <h4>2.3.2 Résolution du contrat</h4>
                                        <p>En dehors des cas visés ci-avant, le contrat quelle que soit sa durée, peut être résolu par le Client à tout moment par lettre recommandée avec demande d'avis de réception ou par un écrit sur un autre support durable contre accusé de réception express (étant exclus les simples accusés de lecture ou de remise à destinataire), en cas :</p>
                                        <ul>
                                            <li>de manquement du Prestataire à son obligation d'exécution à la date ou à l'expiration de la date limite fixée dans les conditions particulières ou, à défaut d'une telle date, dans les trente jours suivant la conclusion du contrat, après que le Prestataire ait été enjoint, selon les mêmes modalités et sans résultat, de fournir le service dans un délai supplémentaire raisonnable.</li>
                                            <li>d'application de hausse du prix non justifiée par une modification technique de la prestation par les conditions particulières (indexation du prix), après demande par lettre recommandée avec accusé de réception du Client (ou autre support écrit durable avec accusé de réception) de rétablissement du prix convenu, restée sans effet pendant quinze jours.</li>
                                        </ul>
                                        <p>Le contrat est considéré comme résolu à la réception par le Prestataire de la lettre ou de l'écrit l'informant de cette résolution à moins que le Prestataire ne se soit exécuté entre-temps.</p>
                                        <p>Néanmoins le Client peut immédiatement résoudre le contrat lorsque le Prestataire refuse de fournir le service ou lorsqu'il n'exécute pas son obligation de fourniture de service à la date prévue, si cette date ou ce délai constitue pour le Client une condition essentielle du contrat. Cette condition essentielle résulte des circonstances qui entourent la conclusion du contrat ou d'une demande expresse du Client avant la conclusion du contrat.</p>
                                        <p>La commande peut être résolue par le Prestataire, en cas :</p>
                                        <ul>
                                            <li>de refus du Client que le Prestataire livre la prestation ;</li>
                                            <li>de non-paiement du prix (ou du solde du prix) à sa date d'exigibilité ;</li>
                                            <li>de non communication par le Client des documents, pièces et informations utiles à l'exécution de la Prestation ;</li>
                                            <li>de non mise à disposition par le Client au représentant du Prestataire d'un espace de travail propre et calme lui permettant d'accomplir sa mission ;</li>
                                            <li>de risque pour la sécurité et intégrité des représentants du Prestataire notamment pour accéder au domicile du Client, en présence de personnes présentant un risque… ;</li>
                                            <li>de comportement inapproprié du Client envers le représentant du Prestataire.</li>
                                        </ul>
                                        <p>Cette résolution interviendra par lettre recommandée avec demande d'avis de réception ou par un écrit sur un autre support durable après mise en demeure restée sans effet pendant un délai de préavis de 15 jours calendaires (sauf autre délai mentionné dans ladite lettre).</p>
                                        <p>Toutefois, la résiliation pourra intervenir sans préavis dès réception de la lettre recommandée du Prestataire en cas de manquement grave ou de motif légitime, sans préjudice de toute demande de dommages et intérêts ou action complémentaire (avec faculté pour le Prestataire de suspendre la fourniture des services dès l'évènement justifiant ladite résiliation).</p>
                                        <p>En cas de résiliation anticipée du contrat sans manquement du Prestataire, celui-ci pourra facturer les diligences et frais relatifs aux prestations commencées, en conservant le cas échéant tout ou partie des sommes versés par le Client, sans préjudice de demande de dommage et intérêt complémentaire.</p>
                                    </section>
                                    
                                    <!-- Article 3 -->
                                    <section id="prestations" class="cgv-section">
                                        <h2>3. Prestations de service</h2>
                                        <p>Les caractéristiques essentielles des prestations de service fournies par le Prestataire sont de manière claire et compréhensible décrites dans le devis (lettre de mission) valant conditions particulières.</p>
                                        <p>Les exemples de prestations, les tarifs, les graphismes figurant sur le site Internet ne sont donnés qu'à titre indicatif et ne sauraient constituer un engagement contractuel de l'entreprise.</p>
                                        <p>Les prestations d'${this.companyInfo.fullName || 'OWEO'} incluent notamment :</p>
                                        <ul>
                                            <li>Conseil en transformation digitale</li>
                                            <li>Implémentation de solutions ERP</li>
                                            <li>Développement de logiciels sur mesure</li>
                                            <li>Formation et accompagnement au changement</li>
                                            <li>Support et maintenance applicative</li>
                                            <li>Intégration de solutions métiers spécifiques à l'industrie métallique</li>
                                        </ul>
                                    </section>
                                    
                                    <!-- Article 4 -->
                                    <section id="prix" class="cgv-section">
                                        <h2>4. Prix</h2>
                                        
                                        <h3>4.1. Prix de vente</h3>
                                        <p>Le prix de vente des services est celui indiqué sur les conditions particulières. Le Prestataire peut prévoir une indexation annuelle du prix de la prestation dans les conditions particulières, qui s'appliquera de plein droit.</p>
                                        <p>Le prix des prestations est calculé en fonction de la nature du service ou variable, selon un taux horaire défini aux conditions particulières, applicable à la durée effective de la prestation fournie. Les tarifs s'entendent nets et HT.</p>
                                        <p>Une facture est établie par le Prestataire et remise au Client lors de chaque Fourniture de Services.</p>
                                        <p>Le prix de vente des services ne comprend pas les frais éventuels facturés en supplément.</p>
                                        
                                        <h3>4.2. Frais – Débours</h3>
                                        <p>En sus du prix de la prestation, le Prestataire peut facturer au Client des frais, notamment les frais de copies, d'affranchissement, déplacement, d'ouverture, d'archivage, de gestion de dossier (auxquels il faut ajouter les autres frais éventuels supportés par le Prestataire), calculé forfaitairement ou au réel avec un prix unitaire par type de frais, selon indication du devis, dont le Client a pu prendre connaissance avant la commande.</p>
                                        <p>Les frais non susceptibles d'être raisonnablement calculés à l'avance sont exigibles en sus du prix.</p>
                                        <p>Les frais éventuellement avancés par le Prestataire au Client sont remboursables sur justification.</p>
                                        
                                        <h3>4.3. Modification du prix</h3>
                                        <p>Le Prestataire se réserve la possibilité de modifier ses prix à tout moment.</p>
                                        <p>En cas de hausse des prix non prévue au titre des conditions particulières, le Client peut rompre le contrat dans les conditions prévues à l'article 2.3.2 Résolution du contrat ci-avant.</p>
                                    </section>
                                    
                                    <!-- Article 5 -->
                                    <section id="paiement" class="cgv-section">
                                        <h2>5. Paiement</h2>
                                        
                                        <h3>5.1. Délais de règlement</h3>
                                        <p>Le délai de paiement ne peut dépasser 30 jours après la date d'exécution de la prestation demandée, sauf accord contraire des parties. Le délai de règlement convenu ne pouvant dépasser 60 jours à compter de la date d'émission de la facture. Par dérogation, un délai maximal de quarante-cinq jours fin de mois après la date d'émission de la facture peut être convenu entre les parties, sous réserve que ce délai soit expressément stipulé par contrat et qu'il ne constitue pas un abus manifeste à l'égard du créancier (C. com., art. L. 441-10).</p>
                                        <p>Le prix est payable en totalité et en un seul versement dans un délai de 30 jours à compter de la Fourniture des Services commandés, telle que définie aux présentes Conditions Générale de vente, arrêté d'un commun accord entre le Client et le Prestataire lors de la négociation commerciale. Ce délai sera mentionné sur la facture qui sera remise au Client par le Prestataire.</p>
                                        <p>Toutefois le contrat peut stipuler des modalités autres et notamment des demandes d'acompte à la conclusion de la commande et/ou des paiements intermédiaires par fractions et sur factures au fur et à mesure de l'accomplissement de la Prestation.</p>
                                        <p>Les paiements effectués par le Client se seront considérés comme définitifs qu'après encaissement effectif par le Prestataire des sommes dues.</p>
                                        <p>Toute somme versée d'avance sur le prix produit des intérêts au taux légal à compter de l'expiration d'un délai de trois mois après le versement et jusqu'à l'exécution de la prestation.</p>
                                        <p>Les sommes versées ne peuvent pas être considérées comme des arrhes.</p>
                                        
                                        <h3>5.2. Modes de paiement</h3>
                                        <p>Le règlement peut s'effectuer par virement bancaire (ou prélèvement bancaire sur demande et autorisation) ou par chèque bancaire.</p>
                                        <p>En cas de paiement par chèque bancaire, celui-ci doit être émis par une banque domiciliée en France métropolitaine ou à Monaco. Le Prestataire se réserve de refuser un moyen de paiement qui lui occasionne des frais.</p>
                                        
                                        <h3>5.3. Retard de paiement</h3>
                                        <p>Des pénalités de retard sont dues dans le cas de paiement après les délais de paiement applicables.</p>
                                        <p>En cas de retard de paiement et de versement des sommes dues par le Client au-delà du délai ci-dessus fixé, et après la date de paiement figurant sur la facture adressée à celui-ci, une indemnité forfaitaire pour frais de recouvrement de 40 € ainsi que des pénalités de retard calculées au taux de 5.07 % du montant TTC du prix des Services figurant sur ladite facture, seront automatiquement et de plein droit acquises au Prestataire, sans formalité aucune ni mise en demeure préalable.</p>
                                        <p>Ces sommes sont exigibles le jour suivant la date de paiement figurant sur la facture.</p>
                                        
                                        <h3>5.4. Défaut de paiement</h3>
                                        <p>Le Prestataire se réserve le droit, lorsque le prix convenu n'est pas payé à l'échéance soit de demander l'exécution du contrat, soit de résoudre le contrat dans les conditions prévues à l'article 2.3.2.</p>
                                        <p>En cas de pluralité d'échéances, le défaut de paiement de l'une des échéances entraîne, lorsque le Prestataire n'opte pas pour la résolution de la commande, l'exigibilité immédiate des échéances ultérieures.</p>
                                    </section>
                                    
                                    <!-- Article 6 -->
                                    <section id="execution" class="cgv-section">
                                        <h2>6. Exécution du service</h2>
                                        
                                        <h3>6.1. Délai</h3>
                                        <p>Les services sont fournis à la date ou dans le délai indiqué sur le contrat.</p>
                                        <p>À défaut d'indication quant à la date de livraison ou d'exécution des services, le prestataire s'engage en tout état de cause à fournir les services dans un délai de 30 jours à compter de la signature du contrat.</p>
                                        <p>Le Client s'engage à fournir au prestataire tous les documents et informations nécessaires à l'exécution de la prestation, dès la demande du Prestataire. A défaut et sans préjudice de ce qui précède, le prestataire ne sera pas tenu de respecter le délai/date prévu aux conditions particulières. Il exécutera la prestation dans un délai de 30 jours maximum à compter de la réception de l'intégralité des documents et informations précités.</p>
                                        
                                        <h3>6.2. Retard</h3>
                                        <p>Lorsque le service n'est pas fourni dans le délai / date mentionné(e) ci-dessus, le client peut résoudre le contrat selon les modalités décrites à l'article 2.3.2.</p>
                                        <p>Ces dispositions ne trouveront pas à s'appliquer si le retard de livraison est causé par la faute du Client (rétention d'information, documents transmis tardivement etc.).</p>
                                        
                                        <h3>6.3. Lieu</h3>
                                        <p>Les prestations sont exécutées dans les locaux du Prestataire indiqué par lui sur le contrat, ou à distance via les outils de télétravail.</p>
                                        
                                        <h3>6.4. Modalités</h3>
                                        <p>Le professionnel effectue la prestation à l'aide de ses propres outils informatiques, téléphoniques et connexion internet.</p>
                                    </section>
                                    
                                    <!-- Article 7 -->
                                    <section id="responsabilite" class="cgv-section">
                                        <h2>7. Responsabilité</h2>
                                        
                                        <h3>7.1 Obligations du Prestataire</h3>
                                        <p>Le Prestataire est tenu d'une obligation de moyen dans l'exécution de ses prestations. A ce titre, il s'engage à réaliser ses meilleurs efforts et à mettre en œuvre les mesures permettant l'accomplissement de sa mission définie au contrat.</p>
                                        <p>Compte tenu de la nature de ses prestations, le Prestataire répond de sa responsabilité en matière de droit commun des contrats.</p>
                                        
                                        <h3>7.2. Exonération de responsabilité et force majeure</h3>
                                        <p>La responsabilité du Prestataire ne pourra en aucun cas être engagée en cas de retard ou de suspension de la fourniture de la prestation imputable au Client, ou en cas de force majeure.</p>
                                        <p>Sont considérés comme cas de force majeure ou cas fortuits, outre ceux habituellement reconnus par la jurisprudence des cours et tribunaux français et sans que cette liste soit restrictive : la maladie ou l'accident d'un consultant ou d'un animateur de formation, les grèves ou conflits sociaux internes ou externes à ${this.companyInfo.fullName || 'OWEO'}, les désastres naturels, les incendies, l'interruption des télécommunications, de l'approvisionnement en énergie, ou des transports de tout type, ou toute autre circonstance échappant au contrôle raisonnable d'${this.companyInfo.fullName || 'OWEO'}.</p>
                                    </section>
                                    
                                    <!-- Article 8 -->
                                    <section id="propriete-intellectuelle" class="cgv-section">
                                        <h2>8. Propriété intellectuelle</h2>
                                        <p>Le Prestataire reste propriétaire de tous les droits de propriété intellectuelle sur les études, dessins, modèles, prototypes, logiciels, etc., réalisés (même à la demande du Client) en vue de la Fourniture des Services au Client. Le Client s'interdit donc toute reproduction ou exploitation desdites études, dessins, modèles et prototypes, etc., sans l'autorisation expresse, écrite et préalable du Prestataire qui peut la conditionner à une contrepartie financière.</p>
                                        <p>Les méthodes, le savoir-faire et la documentation d'${this.companyInfo.fullName || 'OWEO'} demeurent sa propriété exclusive. Le Client s'engage à ne pas les divulguer à des tiers sans autorisation écrite préalable.</p>
                                    </section>
                                    
                                    <!-- Article 9 -->
                                    <section id="donnees-personnelles" class="cgv-section">
                                        <h2>9. Données personnelles</h2>
                                        <p>Les données personnelles recueillies auprès des Clients font l'objet d'un traitement informatique réalisé par le Fournisseur. Elles sont enregistrées dans son fichier Clients et sont indispensables au traitement de sa commande. Ces informations et données personnelles sont également conservées à des fins de sécurité, afin de respecter les obligations légales et réglementaires. Elles seront conservées aussi longtemps que nécessaire pour l'exécution des commandes et des garanties éventuellement applicables.</p>
                                        <p>Le responsable du traitement des données est le Fournisseur. L'accès aux données personnelles sera strictement limité aux employés du responsable de traitement, habilités à les traiter en raison de leurs fonctions. Les informations recueillies pourront éventuellement être communiquées à des tiers liés à l'entreprise par contrat pour l'exécution de tâches sous-traitées, sans que l'autorisation du Client soit nécessaire.</p>
                                        <p>Dans le cadre de l'exécution de leurs prestations, les tiers n'ont qu'un accès limité aux données et ont l'obligation de les utiliser en conformité avec les dispositions de la législation applicable en matière de protection des données personnelles. En dehors des cas énoncés ci-dessus, le Fournisseur s'interdit de vendre, louer, céder ou donner accès à des tiers aux données sans consentement préalable du Client, à moins d'y être contraint en raison d'un motif légitime.</p>
                                        <p>Si les données sont amenées à être transférées en dehors de l'Union européenne, le Client en sera informé et les garanties prises afin de sécuriser les données (par exemple, pour les États-Unis conformément à la décision d'adéquation de la Commission européenne du 10 juillet 2023 constatant que les États-Unis assurent un niveau de protection équivalent à celui de l'UE, adoption de clauses types de protection validées par la CNIL, adoption d'un code de conduite, obtention d'une certification CNIL, etc.) lui seront précisées.</p>
                                        <p>Conformément à la réglementation applicable, le Client dispose d'un droit d'accès, de rectification, d'effacement, et de portabilité des données le concernant, ainsi que du droit de s'opposer au traitement pour motif légitime, droits qu'il peut exercer en s'adressant au responsable de traitement à l'adresse suivante : <a href="mailto:${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}">${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}</a>.</p>
                                        <p>En cas de réclamation, le Client peut adresser une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL).</p>
                                    </section>
                                    
                                    <!-- Article 10 -->
                                    <section id="tribunal" class="cgv-section">
                                        <h2>10. Tribunal compétent</h2>
                                        <p>Tous les litiges auxquels le présent contrat et les accords qui en découlent pourraient donner lieu, concernant tant leur validité, leur interprétation, leur exécution, leur résolution, leurs conséquences et leurs suites seront soumis au tribunal de commerce de ${this.companyInfo.address?.city || 'Nantes'}.</p>
                                        <p>Cette clause s'applique même en cas de référé, de demande incidente ou de pluralité de défendeurs ou d'appel en garantie, et quels que soient le mode et les modalités de paiement, sans que les clauses attributives de juridiction qui pourraient exister sur les documents des Clients puissent mettre obstacle à l'application de la présente clause.</p>
                                    </section>
                                    
                                    <!-- Article 11 -->
                                    <section id="loi-applicable" class="cgv-section">
                                        <h2>11. Langue et loi applicables</h2>
                                        <p>Les présentes Conditions générales et les opérations qui en découlent sont régies exclusivement par le droit français.</p>
                                        <p>Elles sont rédigées en langue française. Dans le cas où elles seraient traduites en une ou plusieurs langues, seul le texte français ferait foi en cas de litige. Le fait que le cas échéant, les échanges habituels entre le prestataire et le client aient lieu totalement ou partiellement dans une langue différente de la langue française, ne peut en aucun cas être considéré comme une renonciation à l'application des présentes conditions générales de vente ou de l'une quelconque de ses stipulations.</p>
                                    </section>
                                    
                                    <!-- Mentions finales -->
                                    <div class="cgv-footer">
                                        <p class="version-note">
                                            <strong>Version ${this.cgvInfo.version}</strong> - 
                                            Dernière mise à jour : ${this.cgvInfo.dateVersion}
                                        </p>
                                        <p class="contact-note">
                                            Pour toute question concernant ces CGV, veuillez nous contacter à :
                                            <a href="mailto:${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}">${this.companyInfo.contact?.email || 'contact@oweo-consulting.fr'}</a>
                                        </p>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
    
    getFormeJuridique() {
        // Mapper les abréviations vers les formes complètes
        const formes = {
            'SARL': 'Société à Responsabilité Limitée (SARL)',
            'SAS': 'Société par Actions Simplifiée (SAS)',
            'SASU': 'Société par Actions Simplifiée Unipersonnelle (SASU)',
            'SA': 'Société Anonyme (SA)',
            'EURL': 'Entreprise Unipersonnelle à Responsabilité Limitée (EURL)'
        };
        
        const forme = this.companyInfo.legal?.forme || 'SAS';
        return formes[forme] || forme;
    }

    // Méthode principale pour le téléchargement PDF
    async downloadPDF() {
        // D'abord, essayer de charger les bibliothèques PDF si pas déjà fait
        if (!window.jspdf || !window.html2canvas) {
            try {
                await this.loadPDFLibraries();
            } catch (error) {
                console.error('Impossible de charger les bibliothèques PDF:', error);
                this.fallbackToPrint();
                return;
            }
        }

        // Si déjà en cours de génération, ne rien faire
        if (this.pdfGenerating) {
            if (window.notifications) {
                window.notifications.warning('Génération PDF déjà en cours...');
            }
            return;
        }

        try {
            this.pdfGenerating = true;
            
            // Afficher une notification de chargement
            let notificationId = null;
            if (window.notifications) {
                notificationId = window.notifications.info('Génération du PDF en cours...', { 
                    duration: 0, 
                    showProgress: true 
                });
            }

            // Générer le PDF
            await this.generatePDF();
            
            // Succès
            if (window.notifications && notificationId) {
                window.notifications.hide(notificationId);
                window.notifications.success('PDF téléchargé avec succès !');
            }

        } catch (error) {
            console.error('Erreur lors de la génération du PDF:', error);
            
            if (window.notifications) {
                window.notifications.error('Erreur lors de la génération du PDF. Utilisation de l\'impression navigateur.');
            }
            
            // Fallback vers l'impression
            this.fallbackToPrint();
            
        } finally {
            this.pdfGenerating = false;
        }
    }
    
    // Charger dynamiquement les bibliothèques PDF
    async loadPDFLibraries() {
        const scripts = [
            {
                src: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
                global: 'jspdf'
            },
            {
                src: 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
                global: 'html2canvas'
            }
        ];
        
        for (const script of scripts) {
            if (!window[script.global]) {
                await this.loadScript(script.src);
            }
        }
    }
    
    // Helper pour charger un script
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    // Générer le PDF
    async generatePDF() {
        const { jsPDF } = window.jspdf;
        
        // Configuration du PDF
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });
        
        // Métadonnées du PDF
        pdf.setProperties({
            title: `CGV ${this.companyInfo.fullName || 'OWEO'} v${this.cgvInfo.version}`,
            subject: 'Conditions Générales de Vente',
            author: this.companyInfo.fullName || 'OWEO',
            keywords: 'cgv, conditions générales, vente, oweo, erp, métallique',
            creator: 'OWEO CGV Generator'
        });
        
        // Utiliser la méthode de génération programmatique
        await this.buildPDFContent(pdf);
        
        // Ajouter les numéros de page
        this.addPageNumbers(pdf);
        
        // Nom du fichier
        const fileName = `CGV-${this.companyInfo.name || 'OWEO'}-v${this.cgvInfo.version}-${new Date().toISOString().slice(0, 10)}.pdf`;
        
        // Sauvegarder le PDF
        pdf.save(fileName);
    }
    
    // Construire le contenu du PDF
    async buildPDFContent(pdf) {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margins = {
            top: 25,
            bottom: 25,
            left: 20,
            right: 20
        };
        const contentWidth = pageWidth - margins.left - margins.right;
        let currentY = margins.top;
        
        // Styles
        const styles = {
            title: { size: 16, style: 'bold', color: [0, 0, 0] },
            h2: { size: 14, style: 'bold', color: [0, 0, 0] },
            h3: { size: 12, style: 'bold', color: [0, 0, 0] },
            h4: { size: 11, style: 'bold', color: [0, 0, 0] },
            normal: { size: 10, style: 'normal', color: [0, 0, 0] },
            small: { size: 9, style: 'normal', color: [100, 100, 100] }
        };
        
        // Fonction helper pour ajouter du texte
        const addText = (text, style, options = {}) => {
            const { size, style: fontStyle, color } = styles[style] || styles.normal;
            const { indent = 0, spacing = 5, align = 'left' } = options;
            
            pdf.setFontSize(size);
            pdf.setFont(undefined, fontStyle);
            pdf.setTextColor(...color);
            
            const lines = pdf.splitTextToSize(text, contentWidth - indent);
            
            lines.forEach(line => {
                // Vérifier si on doit ajouter une nouvelle page
                if (currentY + spacing > pageHeight - margins.bottom) {
                    pdf.addPage();
                    currentY = margins.top;
                    
                    // Ré-ajouter l'en-tête sur la nouvelle page
                    this.addPageHeader(pdf, currentY, margins, contentWidth);
                    currentY += 15;
                }
                
                // Calculer la position X selon l'alignement
                let x = margins.left + indent;
                if (align === 'center') {
                    const textWidth = pdf.getTextWidth(line);
                    x = (pageWidth - textWidth) / 2;
                } else if (align === 'right') {
                    const textWidth = pdf.getTextWidth(line);
                    x = pageWidth - margins.right - textWidth;
                }
                
                pdf.text(line, x, currentY);
                currentY += spacing;
            });
            
            return currentY;
        };
        
        // Ajouter une ligne
        const addLine = (y, color = [200, 200, 200], width = 0.5) => {
            pdf.setDrawColor(...color);
            pdf.setLineWidth(width);
            pdf.line(margins.left, y, pageWidth - margins.right, y);
        };
        
        // Page de garde
        currentY = this.addCoverPage(pdf, currentY, margins, contentWidth, styles);
        
        // Nouvelle page pour le contenu
        pdf.addPage();
        currentY = margins.top;
        
        // En-tête de page
        this.addPageHeader(pdf, currentY, margins, contentWidth);
        currentY += 20;
        
        // Informations de la société
        currentY = addText('INFORMATIONS SOCIÉTÉ', 'h2', { align: 'center' });
        currentY += 5;
        addLine(currentY - 2, [0, 212, 255], 1);
        currentY += 10;
        
        const companyInfo = [
            `Raison sociale : ${this.companyInfo.fullName || 'OWEO'} ${this.companyInfo.legal?.forme || 'SAS'}`,
            `SIREN : ${this.companyInfo.legal?.siren || '945 028 199'}`,
            `SIRET : ${this.companyInfo.legal?.siret || '945 028 199 00012'}`,
            `TVA intracommunautaire : ${this.companyInfo.legal?.tva || 'FR37 945 028 199'}`,
            `Siège social : ${this.companyInfo.address?.complete || '10 rue du Sous-Bois, 44700 Orvault'}`,
            `Forme juridique : ${this.getFormeJuridique()}`,
            `Code NAF/APE : ${this.companyInfo.legal?.ape || '62.02A'} - ${this.companyInfo.legal?.apeName || 'Conseil en systèmes et logiciels informatiques'}`,
            `Capital social : ${this.companyInfo.legal?.capital || '1 000 €'}`
        ];
        
        companyInfo.forEach(info => {
            currentY = addText(info, 'normal', { indent: 5 });
            currentY += 2;
        });
        
        currentY += 10;
        addLine(currentY);
        currentY += 15;
        
        // Contenu des CGV
        const sections = document.querySelectorAll('.cgv-section');
        
        for (const section of sections) {
            // Titre de section (H2)
            const h2 = section.querySelector('h2');
            if (h2) {
                // S'assurer qu'on a assez de place pour le titre
                if (currentY + 20 > pageHeight - margins.bottom) {
                    pdf.addPage();
                    currentY = margins.top;
                    this.addPageHeader(pdf, currentY, margins, contentWidth);
                    currentY += 15;
                }
                
                currentY = addText(h2.textContent.trim(), 'h2');
                currentY += 8;
            }
            
            // Parcourir tous les éléments de la section
            const elements = section.querySelectorAll('h3, h4, p, ul, ol');
            
            for (const element of elements) {
                const tagName = element.tagName.toLowerCase();
                const text = element.textContent.trim();
                
                if (!text) continue;
                
                switch (tagName) {
                    case 'h3':
                        currentY += 5;
                        currentY = addText(text, 'h3');
                        currentY += 5;
                        break;
                        
                    case 'h4':
                        currentY += 3;
                        currentY = addText(text, 'h4', { indent: 5 });
                        currentY += 3;
                        break;
                        
                    case 'p':
                        currentY = addText(text, 'normal');
                        currentY += 4;
                        break;
                        
                    case 'ul':
                    case 'ol':
                        const items = element.querySelectorAll('li');
                        items.forEach((item, index) => {
                            const bullet = tagName === 'ul' ? '• ' : `${index + 1}. `;
                            currentY = addText(bullet + item.textContent.trim(), 'normal', { indent: 10 });
                            currentY += 2;
                        });
                        currentY += 4;
                        break;
                }
            }
            
            currentY += 8;
        }
        
        // Footer final
        currentY += 10;
        if (currentY + 30 > pageHeight - margins.bottom) {
            pdf.addPage();
            currentY = margins.top;
        }
        
        addLine(currentY, [0, 212, 255], 1);
        currentY += 10;
        
        currentY = addText(`Version ${this.cgvInfo.version} - Dernière mise à jour : ${this.cgvInfo.dateVersion}`, 'small', { align: 'center' });
        currentY += 5;
        currentY = addText(`Pour toute question concernant ces CGV :`, 'small', { align: 'center' });
        currentY += 3;
        currentY = addText(this.companyInfo.contact?.email || 'contact@oweo-consulting.fr', 'normal', { align: 'center' });
    }
    
    // Page de garde
    addCoverPage(pdf, y, margins, contentWidth, styles) {
        const pageHeight = pdf.internal.pageSize.getHeight();
        const pageWidth = pdf.internal.pageSize.getWidth();
        
        // Logo ou nom centré
        y = pageHeight / 3;
        
        pdf.setFontSize(36);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(0, 212, 255);
        const companyName = this.companyInfo.fullName || 'OWEO';
        const nameWidth = pdf.getTextWidth(companyName);
        pdf.text(companyName, (pageWidth - nameWidth) / 2, y);
        
        // Titre du document
        y += 20;
        pdf.setFontSize(24);
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(0, 0, 0);
        const title = 'Conditions Générales de Vente';
        const titleWidth = pdf.getTextWidth(title);
        pdf.text(title, (pageWidth - titleWidth) / 2, y);
        
        // Version
        y += 15;
        pdf.setFontSize(14);
        pdf.setTextColor(100, 100, 100);
        const version = `Version ${this.cgvInfo.version}`;
        const versionWidth = pdf.getTextWidth(version);
        pdf.text(version, (pageWidth - versionWidth) / 2, y);
        
        // Date
        y += 8;
        pdf.setFontSize(12);
        const date = `En vigueur au ${this.cgvInfo.dateApplication}`;
        const dateWidth = pdf.getTextWidth(date);
        pdf.text(date, (pageWidth - dateWidth) / 2, y);
        
        // Informations de contact en bas de page
        y = pageHeight - 50;
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        
        const contactInfo = [
            this.companyInfo.address?.full || 'Nantes, France',
            this.companyInfo.contact?.phoneFormatted || '06 86 76 81 31',
            this.companyInfo.urls?.website || 'https://oweo-consulting.fr'
        ];
        
        contactInfo.forEach(info => {
            const infoWidth = pdf.getTextWidth(info);
            pdf.text(info, (pageWidth - infoWidth) / 2, y);
            y += 5;
        });
        
        return y;
    }
    
    // En-tête de page
    addPageHeader(pdf, y, margins, contentWidth) {
        const pageWidth = pdf.internal.pageSize.getWidth();
        
        // Nom de l'entreprise à gauche
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(0, 212, 255);
        pdf.text(this.companyInfo.name || 'OWEO', margins.left, y);
        
        // CGV à droite
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(100, 100, 100);
        const headerText = 'Conditions Générales de Vente';
        const textWidth = pdf.getTextWidth(headerText);
        pdf.text(headerText, pageWidth - margins.right - textWidth, y);
        
        // Ligne de séparation
        y += 5;
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.5);
        pdf.line(margins.left, y, pageWidth - margins.right, y);
        
        return y;
    }
    
    // Ajouter les numéros de page
    addPageNumbers(pdf) {
        const pageCount = pdf.internal.getNumberOfPages();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        pdf.setFontSize(9);
        pdf.setTextColor(150, 150, 150);
        
        // Commencer à la page 2 (pas de numéro sur la page de garde)
        for (let i = 2; i <= pageCount; i++) {
            pdf.setPage(i);
            const text = `Page ${i - 1} / ${pageCount - 1}`;
            const textWidth = pdf.getTextWidth(text);
            pdf.text(text, (pageWidth - textWidth) / 2, pageHeight - 10);
        }
    }
    
    // Méthode helper existante
    getFormeJuridique() {
        const formes = {
            'SARL': 'Société à Responsabilité Limitée (SARL)',
            'SAS': 'Société par Actions Simplifiée (SAS)',
            'SASU': 'Société par Actions Simplifiée Unipersonnelle (SASU)',
            'SA': 'Société Anonyme (SA)',
            'EURL': 'Entreprise Unipersonnelle à Responsabilité Limitée (EURL)'
        };
        
        const forme = this.companyInfo.legal?.forme || 'SAS';
        return formes[forme] || forme;
    }
    
    // Fallback vers l'impression navigateur
    fallbackToPrint() {
        if (window.modalSystem) {
            window.modalSystem.alert({
                title: 'Sauvegarder les CGV en PDF',
                message: `
                    <div style="text-align: left;">
                        <h4>Comment sauvegarder en PDF :</h4>
                        <ol>
                            <li>Dans la fenêtre d'impression qui va s'ouvrir</li>
                            <li>Choisissez "Enregistrer en PDF" comme imprimante</li>
                            <li>Cliquez sur "Enregistrer"</li>
                            <li>Nommez le fichier : CGV-OWEO-v${this.cgvInfo.version}.pdf</li>
                        </ol>
                        <p style="margin-top: 1rem; color: var(--text-muted);">
                            <small>Pour une meilleure qualité, nous recommandons de désactiver les en-têtes et pieds de page dans les options d'impression.</small>
                        </p>
                    </div>
                `,
                type: 'info'
            });
        }
        
        setTimeout(() => {
            window.print();
        }, 500);
    }
    
    bindEvents() {
        super.bindEvents();
        
        // IMPORTANT: Nettoyer les anciens écouteurs d'abord
        this.cleanupEventListeners();
        
        // Navigation interne (table des matières) - SÉLECTEUR SPÉCIFIQUE
        const handleTocClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const link = e.currentTarget;
            const targetId = link.getAttribute('href');
            
            if (targetId && targetId.startsWith('#') && targetId !== '#home') {
                // Navigation interne dans les CGV
                const elementId = targetId.substring(1);
                const targetElement = document.getElementById(elementId);
                
                if (targetElement) {
                    // Ajouter une classe d'animation au menu
                    const navSticky = document.querySelector('.nav-sticky');
                    if (navSticky) {
                        navSticky.classList.add('navigating');
                    }
                    
                    // Marquer la section cible
                    document.querySelectorAll('.cgv-section').forEach(section => {
                        section.classList.remove('navigating-to');
                    });
                    targetElement.classList.add('navigating-to');
                    
                    // Calculer la position avec offset pour la navbar
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - navbarHeight - 20;
                    
                    // Mettre à jour le lien actif immédiatement
                    document.querySelectorAll('.toc-link').forEach(l => {
                        l.classList.remove('active', 'navigating-to');
                    });
                    link.classList.add('active', 'navigating-to');
                    
                    // Mettre à jour l'indicateur immédiatement
                    this.updateMenuIndicator(link);
                    
                    // Scroll smooth avec callback
                    this.smoothScrollTo(offsetPosition, 800, () => {
                        // Retirer les classes d'animation
                        if (navSticky) {
                            navSticky.classList.remove('navigating');
                        }
                        link.classList.remove('navigating-to');
                        targetElement.classList.remove('navigating-to');
                    });
                    
                    // Fermer le menu mobile si ouvert
                    const mobileMenu = document.querySelector('.cgv-mobile-toc');
                    if (mobileMenu && mobileMenu.open) {
                        mobileMenu.open = false;
                    }
                    
                    // Mettre à jour l'URL sans recharger
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    }
                }
            }
            
            return false;
        };
        
        // Sélecteur spécifique pour les liens TOC uniquement
        const tocLinks = document.querySelectorAll('.cgv-page .toc-link');
        tocLinks.forEach(link => {
            link.addEventListener('click', handleTocClick);
            this._eventListeners.push({ element: link, event: 'click', handler: handleTocClick });
        });
        
        // Handler spécifique pour le breadcrumb CGV uniquement
        const handleBreadcrumbClick = (e) => {
            const link = e.currentTarget;
            const href = link.getAttribute('href');
            
            // Vérifier que c'est bien un lien de navigation et pas un lien TOC
            if (href && href.startsWith('#') && !link.classList.contains('toc-link')) {
                e.preventDefault();
                e.stopPropagation();
                
                const page = href.substring(1);
                this.navigateTo(page);
            }
        };
        
        // Sélecteur plus spécifique pour le breadcrumb CGV
        const breadcrumbLinks = document.querySelectorAll('.cgv-page .page-breadcrumb .nav-link');
        breadcrumbLinks.forEach(link => {
            link.addEventListener('click', handleBreadcrumbClick);
            this._eventListeners.push({ element: link, event: 'click', handler: handleBreadcrumbClick });
        });
        
        // Scroll spy pour la navigation
        this.setupScrollSpy();
    }

    // Méthode pour nettoyer les écouteurs
    cleanupEventListeners() {
        this._eventListeners.forEach(({ element, event, handler }) => {
            if (element) {
                element.removeEventListener(event, handler);
            }
        });
        this._eventListeners = [];
    }
    
    updateMenuIndicator(activeLink) {
        const toc = activeLink?.closest('.toc');
        if (!toc || !activeLink) return;
        
        // Assurer que l'indicateur est visible
        toc.classList.add('has-active');
        
        // Position de l'indicateur
        const indicatorTop = activeLink.offsetTop;
        const indicatorHeight = activeLink.offsetHeight;
        
        // Appliquer avec transition smooth
        toc.style.setProperty('--indicator-top', `${indicatorTop}px`);
        toc.style.setProperty('--indicator-height', `${indicatorHeight}px`);
        toc.style.setProperty('--indicator-transition', 'all 0.2s ease-out');
    }
    
    smoothScrollTo(targetPosition, duration = 800, callback) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();
        
        const easeInOutCubic = (t) => {
            return t < 0.5 
                ? 4 * t * t * t 
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        
        const animation = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            } else if (callback) {
                callback();
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    setupScrollSpy() {
        const sections = document.querySelectorAll('.cgv-section');
        const navLinks = document.querySelectorAll('.toc-link');
        const navSticky = document.querySelector('.nav-sticky');
        
        if (!sections.length || !navLinks.length) return;
        
        // Debug: vérifier que le sticky fonctionne
        if (navSticky) {
            const computedStyle = window.getComputedStyle(navSticky);
            console.log('🔧 Menu sticky debug:', {
                position: computedStyle.position,
                top: computedStyle.top,
                display: computedStyle.display,
                parent: navSticky.parentElement
            });
        }
        
        // Variables pour le suivi
        let currentActiveId = null;
        let scrollTimeout;
        let lastScrollTop = 0;
        
        // Fonction simple et robuste pour trouver la section active
        const findActiveSection = () => {
            const scrollPosition = window.pageYOffset;
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
            
            // Point de déclenchement : milieu de l'écran
            const viewportMiddle = scrollPosition + window.innerHeight / 2;
            
            // Trouver toutes les sections visibles
            const visibleSections = [];
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionTop = scrollPosition + rect.top;
                const sectionBottom = sectionTop + rect.height;
                
                // Une section est "visible" si elle intersecte avec la fenêtre
                const isVisible = sectionBottom > scrollPosition + navbarHeight && 
                                sectionTop < scrollPosition + window.innerHeight;
                
                if (isVisible) {
                    visibleSections.push({
                        element: section,
                        id: section.getAttribute('id'),
                        top: sectionTop,
                        bottom: sectionBottom,
                        distanceFromMiddle: Math.abs(viewportMiddle - (sectionTop + rect.height / 2))
                    });
                }
            });
            
            // Si aucune section visible, utiliser la position de scroll
            if (visibleSections.length === 0) {
                // Si on est en haut de page
                if (scrollPosition < 200) {
                    return sections[0]?.getAttribute('id') || null;
                }
                // Si on est en bas de page
                if (scrollPosition + window.innerHeight >= document.documentElement.scrollHeight - 100) {
                    return sections[sections.length - 1]?.getAttribute('id') || null;
                }
                return null;
            }
            
            // Trier par distance du milieu de l'écran et prendre la plus proche
            visibleSections.sort((a, b) => a.distanceFromMiddle - b.distanceFromMiddle);
            return visibleSections[0].id;
        };
        
        // Fonction pour mettre à jour le lien actif
        const updateActiveLink = (activeId) => {
            if (!activeId || activeId === currentActiveId) return;
            
            console.log('🎯 Active section:', activeId); // Debug
            
            currentActiveId = activeId;
            
            // Mettre à jour les classes des sections
            sections.forEach(section => {
                section.classList.remove('active-section');
                if (section.getAttribute('id') === activeId) {
                    section.classList.add('active-section');
                }
            });
            
            // Mettre à jour les liens de navigation
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeId}`) {
                    link.classList.add('active');
                    this.scrollMenuToActiveLink(link);
                    this.updateMenuIndicator(link);
                }
            });
        };
        
        // Observer d'intersection pour les effets visuels
        const visualObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            rootMargin: '-50px 0px',
            threshold: 0.1
        });
        
        sections.forEach(section => {
            visualObserver.observe(section);
        });
        
        // Gestionnaire de scroll principal (simplifié)
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';
            
            // Effets visuels du menu sticky
            if (navSticky) {
                navSticky.classList.add('scrolling');
                navSticky.setAttribute('data-scroll-direction', scrollDirection);
                
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    navSticky.classList.remove('scrolling');
                }, 150);
            }
            
            // Trouver et activer la section courante
            const activeId = findActiveSection();
            if (activeId) {
                updateActiveLink(activeId);
            }
            
            // Mettre à jour la progression du scroll
            this.updateScrollProgress();
            
            lastScrollTop = currentScrollTop;
        };
        
        // Écouter le scroll avec throttling optimisé
        let isScrolling = false;
        
        const throttledScroll = () => {
            if (!isScrolling) {
                requestAnimationFrame(() => {
                    handleScroll();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        };
        
        window.addEventListener('scroll', throttledScroll, { passive: true });
        
        // Activation initiale avec délai pour s'assurer que tout est chargé
        setTimeout(() => {
            const initialActiveId = findActiveSection();
            if (initialActiveId) {
                updateActiveLink(initialActiveId);
            }
            console.log('🚀 Scroll spy initialized'); // Debug
        }, 200);
        
        // Re-calculer lors du redimensionnement
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const activeId = findActiveSection();
                if (activeId) {
                    updateActiveLink(activeId);
                }
            }, 100);
        }, { passive: true });
    }

    adjustStickyMenuOffset() {
        const navSticky = document.querySelector('.nav-sticky');
        if (!navSticky) return;
        
        // Vérifier si le demo banner est visible
        const demoBanner = document.getElementById('demo-search-banner');
        const isDemoMode = demoBanner && demoBanner.style.display !== 'none';
        
        // Calculer l'offset
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
        const demoBarHeight = isDemoMode ? 80 : 0;
        const spacing = 20; // var(--space-4)
        
        const totalOffset = navbarHeight + demoBarHeight + spacing;
        
        // Appliquer l'offset via une variable CSS pour garder la cohérence
        navSticky.style.setProperty('--sticky-top', `${totalOffset}px`);
        navSticky.style.top = `${totalOffset}px`;
        navSticky.style.maxHeight = `calc(100vh - ${totalOffset + spacing}px)`;
    }
    
    updateScrollProgress() {
        const navSticky = document.querySelector('.nav-sticky');
        if (!navSticky) return;
        
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.pageYOffset;
        
        const scrollProgress = scrollHeight > 0 ? (scrollPosition / scrollHeight) * 100 : 0;
        const clampedProgress = Math.max(0, Math.min(100, scrollProgress));
        
        navSticky.style.setProperty('--scroll-progress', `${clampedProgress}%`);
        
        // Classes selon la position
        navSticky.classList.toggle('at-top', clampedProgress < 5);
        navSticky.classList.toggle('at-bottom', clampedProgress > 95);
        navSticky.classList.toggle('in-middle', clampedProgress >= 5 && clampedProgress <= 95);
    }
    
    scrollMenuToActiveLink(activeLink) {
        const navSticky = document.querySelector('.nav-sticky');
        if (!navSticky || !activeLink) return;
        
        const navHeight = navSticky.clientHeight;
        const linkTop = activeLink.offsetTop;
        const linkHeight = activeLink.offsetHeight;
        const currentScrollTop = navSticky.scrollTop;
        
        // Position du lien dans la vue actuelle du menu
        const linkRelativeTop = linkTop - currentScrollTop;
        const linkRelativeBottom = linkRelativeTop + linkHeight;
        
        // Vérifier si le lien est visible dans le menu
        const isLinkVisible = linkRelativeTop >= 0 && linkRelativeBottom <= navHeight;
        
        if (!isLinkVisible) {
            // Centrer le lien dans le menu
            const targetScrollTop = linkTop - (navHeight / 2) + (linkHeight / 2);
            
            navSticky.scrollTo({
                top: Math.max(0, targetScrollTop),
                behavior: 'smooth'
            });
        }
    }
    
    printToPDF() {
        if (window.notifications) {
            window.notifications.info('Pour sauvegarder en PDF, utilisez "Imprimer en PDF" dans la fenêtre d\'impression');
        }
        
        // Afficher un guide rapide
        if (window.modalSystem) {
            window.modalSystem.alert({
                title: 'Sauvegarder les CGV en PDF',
                message: `
                    <div style="text-align: left;">
                        <h4>Comment sauvegarder en PDF :</h4>
                        <ol>
                            <li>Dans la fenêtre d'impression qui va s'ouvrir</li>
                            <li>Choisissez "Enregistrer en PDF" comme imprimante</li>
                            <li>Cliquez sur "Enregistrer"</li>
                            <li>Nommez le fichier : CGV-OWEO-v${this.cgvInfo.version}.pdf</li>
                        </ol>
                    </div>
                `,
                type: 'info'
            });
        }
        
        // Ouvrir la fenêtre d'impression après un court délai
        setTimeout(() => {
            window.print();
        }, 500);
    }
    
    navigateTo(page) {
        // Option 1: Si le router est accessible via window.app
        if (window.app && window.app.router) {
            window.app.router.navigate(page);
            return;
        }
        
        // Option 2: Utiliser l'eventBus si disponible
        if (window.app && window.app.eventBus) {
            window.app.eventBus.emit('navigate', { page });
            return;
        }
        
        // Option 3: Navigation manuelle par hash
        window.location.hash = `#${page}`;
    }
    
    async onMount() {
        await super.onMount();
        
        // Ajouter une classe au body pour les styles spécifiques
        document.body.classList.add('page-cgv');
        
        // Exposer l'instance
        window.cgvPageInstance = this;
        
        // Mettre à jour le titre de la page
        document.title = 'CGV - ' + (this.companyInfo.name || 'OWEO');
        
        // S'assurer que le scroll est en haut
        window.scrollTo(0, 0);
        
        // Initialiser la progression du scroll
        this.updateScrollProgress();
        
        // Ajuster l'offset du menu sticky
        this.adjustStickyMenuOffset();
        
        // Écouter les changements de mode démo pour ajuster le menu
        if (window.app && window.app.eventBus) {
            window.app.eventBus.on('routeChanged', (data) => {
                setTimeout(() => this.adjustStickyMenuOffset(), 100);
            });
        }

        
    }
    
    destroy() {
        // Nettoyer tous les écouteurs d'événements
        this.cleanupEventListeners();
        
        // Nettoyer le scroll spy si nécessaire
        if (this._scrollHandler) {
            window.removeEventListener('scroll', this._scrollHandler);
        }
        
        // Retirer la classe du body
        document.body.classList.remove('page-cgv');
        
        // Nettoyer l'instance globale
        if (window.cgvPageInstance === this) {
            delete window.cgvPageInstance;
        }
        
        super.destroy();
    }
}

// Exposer la classe
window.CGVPage = CGVPage;