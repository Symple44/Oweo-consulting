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
    }
    
    getTemplate() {
        return `
            <div class="page-container cgv-page">
                <!-- Header -->
                <section class="cgv-header">
                    <div class="container">
                        <div class="page-breadcrumb">
                            <a href="#" data-page="home">Accueil</a>
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
                                    <!-- Informations société -->
                                    <div class="company-info">
                                        <h2>OWEO</h2>
                                        <p>
                                            <strong>Raison sociale :</strong> OWEO SAS<br>
                                            <strong>SIREN :</strong> 945 028 199<br>
                                            <strong>SIRET :</strong> 945 028 199 00012<br>
                                            <strong>TVA intracommunautaire :</strong> FR37 945 028 199<br>
                                            <strong>Siège social :</strong> 10 rue du Sous-Bois, 44700 Orvault<br>
                                            <strong>Forme juridique :</strong> Société par Actions Simplifiée (SAS)<br>
                                            <strong>Code NAF/APE :</strong> 62.02A - Conseil en systèmes et logiciels informatiques<br>
                                            <strong>Capital social :</strong> 1 000 €
                                        </p>
                                    </div>
                                    
                                    <hr class="section-divider">
                                    
                                    <!-- Article 1 -->
                                    <section id="dispositions-generales" class="cgv-section">
                                        <h2>1. Dispositions générales</h2>
                                        
                                        <h3>1.1 Objet</h3>
                                        <p>Les présentes Conditions Générales de Vente (ci-après dénommées "CGV") constituent, conformément à l'article L. 441-1 du code du commerce, le socle unique de la relation commerciale entre OWEO (ci-après dénommée "le Prestataire") et ses clients (ci-après dénommés "le Client").</p>
                                        <p>OWEO exerce des activités de prestations de services informatiques et d'assistance à distance dans le domaine informatique, avec une expertise particulière dans les solutions ERP pour l'industrie métallique.</p>
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
                                        <p>Les prestations d'OWEO incluent notamment :</p>
                                        <ul>
                                            <li>Conseil en transformation digitale</li>
                                            <li>Implémentation de solutions ERP</li>
                                            <li>Développement de logiciels sur mesure</li>
                                            <li>Formation et accompagnement au changement</li>
                                            <li>Support et maintenance applicative</li>
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
                                        <p>Sont considérés comme cas de force majeure ou cas fortuits, outre ceux habituellement reconnus par la jurisprudence des cours et tribunaux français et sans que cette liste soit restrictive : la maladie ou l'accident d'un consultant ou d'un animateur de formation, les grèves ou conflits sociaux internes ou externes à OWEO, les désastres naturels, les incendies, l'interruption des télécommunications, de l'approvisionnement en énergie, ou des transports de tout type, ou toute autre circonstance échappant au contrôle raisonnable d'OWEO.</p>
                                    </section>
                                    
                                    <!-- Article 8 -->
                                    <section id="propriete-intellectuelle" class="cgv-section">
                                        <h2>8. Propriété intellectuelle</h2>
                                        <p>Le Prestataire reste propriétaire de tous les droits de propriété intellectuelle sur les études, dessins, modèles, prototypes, logiciels, etc., réalisés (même à la demande du Client) en vue de la Fourniture des Services au Client. Le Client s'interdit donc toute reproduction ou exploitation desdites études, dessins, modèles et prototypes, etc., sans l'autorisation expresse, écrite et préalable du Prestataire qui peut la conditionner à une contrepartie financière.</p>
                                        <p>Les méthodes, le savoir-faire et la documentation d'OWEO demeurent sa propriété exclusive. Le Client s'engage à ne pas les divulguer à des tiers sans autorisation écrite préalable.</p>
                                    </section>
                                    
                                    <!-- Article 9 -->
                                    <section id="donnees-personnelles" class="cgv-section">
                                        <h2>9. Données personnelles</h2>
                                        <p>Les données personnelles recueillies auprès des Clients font l'objet d'un traitement informatique réalisé par le Fournisseur. Elles sont enregistrées dans son fichier Clients et sont indispensables au traitement de sa commande. Ces informations et données personnelles sont également conservées à des fins de sécurité, afin de respecter les obligations légales et réglementaires. Elles seront conservées aussi longtemps que nécessaire pour l'exécution des commandes et des garanties éventuellement applicables.</p>
                                        <p>Le responsable du traitement des données est le Fournisseur. L'accès aux données personnelles sera strictement limité aux employés du responsable de traitement, habilités à les traiter en raison de leurs fonctions. Les informations recueillies pourront éventuellement être communiquées à des tiers liés à l'entreprise par contrat pour l'exécution de tâches sous-traitées, sans que l'autorisation du Client soit nécessaire.</p>
                                        <p>Dans le cadre de l'exécution de leurs prestations, les tiers n'ont qu'un accès limité aux données et ont l'obligation de les utiliser en conformité avec les dispositions de la législation applicable en matière de protection des données personnelles. En dehors des cas énoncés ci-dessus, le Fournisseur s'interdit de vendre, louer, céder ou donner accès à des tiers aux données sans consentement préalable du Client, à moins d'y être contraint en raison d'un motif légitime.</p>
                                        <p>Si les données sont amenées à être transférées en dehors de l'Union européenne, le Client en sera informé et les garanties prises afin de sécuriser les données (par exemple, pour les États-Unis conformément à la décision d'adéquation de la Commission européenne du 10 juillet 2023 constatant que les États-Unis assurent un niveau de protection équivalent à celui de l'UE, adoption de clauses types de protection validées par la CNIL, adoption d'un code de conduite, obtention d'une certification CNIL, etc.) lui seront précisées.</p>
                                        <p>Conformément à la réglementation applicable, le Client dispose d'un droit d'accès, de rectification, d'effacement, et de portabilité des données le concernant, ainsi que du droit de s'opposer au traitement pour motif légitime, droits qu'il peut exercer en s'adressant au responsable de traitement à l'adresse suivante : <a href="mailto:contact@oweo-consulting.fr">contact@oweo-consulting.fr</a>.</p>
                                        <p>En cas de réclamation, le Client peut adresser une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL).</p>
                                    </section>
                                    
                                    <!-- Article 10 -->
                                    <section id="tribunal" class="cgv-section">
                                        <h2>10. Tribunal compétent</h2>
                                        <p>Tous les litiges auxquels le présent contrat et les accords qui en découlent pourraient donner lieu, concernant tant leur validité, leur interprétation, leur exécution, leur résolution, leurs conséquences et leurs suites seront soumis au tribunal de commerce de Nantes.</p>
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
                                            <a href="mailto:contact@oweo-consulting.fr">contact@oweo-consulting.fr</a>
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
    
    bindEvents() {
        super.bindEvents();
        
        // Navigation interne - Utiliser une fonction fléchée pour garder le contexte
        const handleTocClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const link = e.currentTarget;
            const targetId = link.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                const elementId = targetId.substring(1);
                const targetElement = document.getElementById(elementId);
                
                if (targetElement) {
                    // Calculer la position avec offset pour la navbar
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - navbarHeight - 20;
                    
                    // Scroll smooth
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Mettre à jour le lien actif
                    document.querySelectorAll('.toc-link').forEach(l => {
                        l.classList.remove('active');
                    });
                    link.classList.add('active');
                    
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
        
        // Attacher les événements aux liens de navigation
        const tocLinks = document.querySelectorAll('.toc-link');
        tocLinks.forEach(link => {
            link.removeEventListener('click', handleTocClick); // Retirer d'abord pour éviter les doublons
            link.addEventListener('click', handleTocClick);
        });
        
        // Navigation externe
        const pageLinks = document.querySelectorAll('[data-page]');
        pageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateTo(page);
            });
        });
        
        // Scroll spy pour la navigation
        this.setupScrollSpy();
    }
    
    setupScrollSpy() {
        const sections = document.querySelectorAll('.cgv-section');
        const navLinks = document.querySelectorAll('.toc-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-100px 0px -70% 0px'
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    downloadPDF() {
        // Option 1 : Si un PDF pré-généré existe
        const pdfUrl = '/assets/documents/cgv-oweo-v' + this.cgvInfo.version.replace('.', '-') + '.pdf';
        
        // Vérifier si le PDF existe
        fetch(pdfUrl, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    // Le PDF existe, le télécharger
                    const link = document.createElement('a');
                    link.href = pdfUrl;
                    link.download = 'CGV-OWEO-v' + this.cgvInfo.version + '.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    if (window.notifications) {
                        window.notifications.success('Téléchargement du PDF démarré');
                    }
                } else {
                    // Le PDF n'existe pas, proposer l'impression
                    this.printToPDF();
                }
            })
            .catch(() => {
                // En cas d'erreur, proposer l'impression
                this.printToPDF();
            });
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
        if (window.app && window.app.router) {
            window.app.router.navigate(page);
        }
    }
    
    async onMount() {
        await super.onMount();
        
        // Ajouter une classe au body pour les styles spécifiques
        document.body.classList.add('page-cgv');
        
        // Exposer l'instance
        window.cgvPageInstance = this;
        
        // Mettre à jour le titre de la page
        document.title = 'CGV - OWEO';
        
        // S'assurer que le scroll est en haut
        window.scrollTo(0, 0);
    }
    
    destroy() {
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