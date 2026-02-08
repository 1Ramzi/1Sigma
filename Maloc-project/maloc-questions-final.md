# 📋 MALOC — Questions Finales à Valider avec Ramzi

> **Version** : Consolidation finale — 8 février 2026
> **Objectif** : Document UNIQUE regroupant TOUTES les questions ouvertes, dédupliquées et triées
> **Usage** : Ramzi répond directement dans les champs **👉 Réponse** ci-dessous

---

## 📊 Résumé

| Catégorie | 🔴 Bloquant | 🟡 Important | 🟢 Nice-to-have | Total |
|---|---|---|---|---|
| 1. Business & Juridique | 8 | 5 | 1 | 14 |
| 2. Produit & UX | 3 | 8 | 3 | 14 |
| 3. Technique & Architecture | 3 | 7 | 3 | 13 |
| 4. Paiement & Finance | 5 | 5 | 3 | 13 |
| 5. Opérations & Lancement | 5 | 6 | 0 | 11 |
| 6. Sécurité & Conformité | 4 | 6 | 0 | 10 |
| 7. Scalabilité & Évolution | 0 | 2 | 3 | 5 |
| **TOTAL** | **28** | **39** | **13** | **80** |

> ⚠️ **28 questions bloquantes** à résoudre avant ou pendant le développement. Sans réponses, le lancement du 4 avril est compromis.

---

## 1. 🏢 Business & Juridique

### 🔴 Bloquant

---

**Q1.1 — Quelle entité portera l'activité opérationnelle en France ?**

La SOPARFI luxembourgeoise est une holding — elle ne devrait PAS porter l'activité opérationnelle. Une SAS française est-elle créée ou en cours ? Existe-t-elle déjà ?

> **⚠️ Risque** : Sans structure juridique opérationnelle, impossible d'ouvrir un compte Stripe Connect, de signer des contrats, d'émettre des factures. La création d'une SAS prend 2-4 semaines + ouverture compte bancaire 1-2 semaines. **Bloquant absolu pour le lancement.**
>
> **💡 Suggestion** : SAS France comme filiale opérationnelle. Prévoir la structure multi-entités dans les statuts de la SOPARFI mais ne créer les filiales qu'à l'activation de chaque marché.

**👉 Réponse :**

---

**Q1.2 — Maloc a-t-il besoin d'une licence spécifique (ACPR, agent de paiement) ?**

Stripe Connect Custom implique que Maloc collecte les fonds pour compte de tiers. Possible obligation d'enregistrement comme agent de paiement. Vérifier le statut d'Agent de Prestataire de Services de Paiement (APSP).

> **⚠️ Risque** : Opérer sans licence = infraction. À vérifier aussi : inscription au registre des intermédiaires, statut éventuel d'agent de voyages (peu probable).
>
> **💡 Suggestion** : Consulter un avocat spécialisé marketplace/fintech AVANT le lancement.

**👉 Réponse :**

---

**Q1.3 — CGU/CGV : un avocat est-il mandaté ? Quel calendrier ?**

Les CGU doivent couvrir : conditions de location, assurance, caution, politique d'annulation, gestion des litiges, limitation de responsabilité, données personnelles, conditions de l'abonnement prestataire (199€/mois).

> **⚠️ Risque** : Sans CGU/CGV validées juridiquement, le lancement est impossible. Budget : 5-15k€, délai : 3-4 semaines. **Si pas encore fait, risque majeur pour le 4 avril.**
>
> **💡 Suggestion** : Missionner un cabinet spécialisé marketplace/location immédiatement.

**👉 Réponse :**

---

**Q1.4 — Quelle est la responsabilité de Maloc en cas d'accident, vol ou sinistre total ?**

Si un locataire cause un accident grave avec un véhicule loué via Maloc, la plateforme pourrait être mise en cause. Le doc technique mentionne "à définir juridiquement" pour le sinistre total.

> **⚠️ Risque** : Trou béant — risque existentiel si non clarifié.
>
> **💡 Suggestion** : (1) CGU stipulant que Maloc est un intermédiaire. (2) Exiger une attestation d'assurance location valide de chaque loueur. (3) Vérifier que l'assurance couvre la mise à disposition via plateforme numérique. (4) Budget juridique pour les contentieux.

**👉 Réponse :**

---

**Q1.5 — Les assurances des loueurs couvrent-elles la location à des tiers via plateforme ?**

En France, tout véhicule doit être assuré (L211-1). Si le loueur a une assurance standard et non une assurance location, le locataire n'est PAS couvert. La majorité des assurances auto classiques ne couvrent pas la location.

> **⚠️ Risque** : Maloc pourrait être complice de défaut d'assurance. Potentiel showstopper.
>
> **💡 Suggestion** : Vérifier systématiquement que l'assurance du loueur couvre la "location à des tiers". Un partenaire assureur est-il identifié (AXA, Allianz, autre) ? Quel type de couverture (tous risques, tiers+, franchise) ? Qui souscrit : Maloc globalement, chaque loueur, ou le client ?

**👉 Réponse :**

---

**Q1.6 — Assurance : couverture RC conducteur, vol, accidents corporels ?**

Détails manquants : RC conducteur incluse ? Dommages causés à des tiers ? Couverture passagers ? Couverture vol incluse et sous quelles conditions ?

> **⚠️ Risque** : Sans clarification, tout incident grave peut engager la responsabilité de Maloc.
>
> **💡 Suggestion** : Définir clairement qui est responsable contractuellement pour chaque cas de figure.

**👉 Réponse :**

---

**Q1.7 — Les loueurs sont-ils exclusivement des professionnels ou aussi des particuliers ?**

La location entre particuliers est soumise à des règles différentes (loi Hamon, droit de rétractation). Un particulier qui loue régulièrement pourrait être requalifié en professionnel par l'administration fiscale.

> **⚠️ Risque** : Obligations légales plus lourdes si particuliers autorisés.
>
> **💡 Suggestion** : MVP = pros uniquement (137 agences cibles) → plus simple juridiquement. Si particuliers aussi, CGU adaptées et parcours différent.

**👉 Réponse :**

---

**Q1.8 — La marque "Maloc" est-elle déposée ? Domaines sécurisés ?**

Dépôt INPI (~250€) et EUIPO (~850€). Domaines : maloc.com ? maloc.fr ? maloc.eu ? maloc.io ? maloc.app ? maloc.de ?

> **⚠️ Risque** : Sans dépôt, un concurrent pourrait déposer "Maloc" et contraindre un rebranding. Un domaine squatté coûte cher à récupérer.
>
> **💡 Suggestion** : Déposer la marque immédiatement. Vérifier la disponibilité (recherche d'antériorité). Sécuriser les domaines principaux.

**👉 Réponse :**

---

### 🟡 Important

---

**Q1.9 — TVA & fiscalité : quel taux sur la commission Maloc ? Obligations DAC7 ?**

Quel taux de TVA sur la commission (20% ?) ? L'abonnement 199€/mois est-il TTC ou HT ? Pour l'expansion multi-pays : reverse charge ? Maloc doit-il collecter la TVA pour le compte des loueurs (modèle marketplace) ? Obligation de déclaration DAC7 des revenus des loueurs.

> **⚠️ Risque** : Erreur sur la TVA = redressement fiscal. Directive EU 2021/514 (DAC7) impose la déclaration des revenus des loueurs.
>
> **💡 Suggestion** : Consulter un expert-comptable spécialisé marketplace.

**👉 Réponse :**

---

**Q1.10 — Contrat de location : la signature canvas a-t-elle une valeur juridique (eIDAS) ?**

Une signature "canvas" (dessin au doigt) n'est PAS une signature électronique qualifiée au sens d'eIDAS. En cas de litige, un tribunal pourrait contester la validité.

> **⚠️ Risque** : Contrats potentiellement invalides.
>
> **💡 Suggestion** : Implémenter une signature électronique avancée (lier à l'identité, horodater, enregistrer IP/device/hash) ou utiliser un prestataire certifié (Yousign, DocuSign).

**👉 Réponse :**

---

**Q1.11 — RGPD : DPO nommé ? Registre des traitements ? DPA signés ?**

Maloc traite des données hautement sensibles (pièces d'identité, permis, données financières, géolocalisation). DPA à signer avec : Supabase, Stripe, Cloudflare, didit.me, ClickSend, Meilisearch, Sentry, OpenAI. Base légale pour chaque traitement ? Durée de rétention ? Procédure droit d'accès/effacement ?

> **⚠️ Risque** : Sanctions CNIL jusqu'à 4% du CA ou 20M€. Documents d'identité stockés = traitement "à risque" nécessitant une AIPD (Analyse d'Impact).
>
> **💡 Suggestion** : (1) Nommer un DPO (~500€/mois externe). (2) Réaliser une AIPD. (3) Rédiger le registre des traitements. (4) Signer les DPA. (5) Consentement granulaire.

**👉 Réponse :**

---

**Q1.12 — Filiales par marché : une par pays dès le lancement ou une seule entité française ?**

> **⚠️ Risque** : Filiales prématurées = coûts fixes inutiles. Pas de prévision = blocage à l'expansion.
>
> **💡 Suggestion** : SAS France suffit pour le MVP. Prévoir la structure multi-entités dans les statuts de la SOPARFI.

**👉 Réponse :**

---

**Q1.13 — Propriété intellectuelle : logo et charte graphique protégés ?**

> **⚠️ Risque** : Sans protection, risque de copie.

**👉 Réponse :**

---

### 🟢 Nice-to-have

---

**Q1.14 — Contrat SaaS Maloc-Loueur : un template existe-t-il en plus des CGU ?**

> **💡 Suggestion** : Conditions d'utilisation SaaS distinctes des CGU client. Peut être fait post-MVP si les CGU couvrent l'essentiel.

**👉 Réponse :**

---

## 2. 📱 Produit & UX

### 🔴 Bloquant

---

**Q2.1 — Quelle est la priorité plateforme pour le MVP du 4 avril ?**

Le doc prévoit Next.js (web) + React Native (mobile) + React Native iPad (CRM). Développer 3 interfaces en 8 semaines est irréaliste avec une équipe réduite.

> **⚠️ Risque** : Scope trop large = rien de terminé le 4 avril.
>
> **💡 Suggestion** : MVP = web responsive uniquement (Next.js). V2 mai = app mobile React Native (clients). V2 mai = iPad CRM (prestataires).

**👉 Réponse :**

---

**Q2.2 — Les maquettes Figma sont-elles finalisées ? Couvrent-elles tous les écrans MVP ?**

Le design system est-il défini (composants, typographie, couleurs) ?

> **⚠️ Risque** : Sans maquettes, les devs ne peuvent pas commencer l'UI → retard en cascade.
>
> **💡 Suggestion** : Maquettes des Sprints 1-3 (auth, catalogue, réservation) finalisées AVANT le 10 février.

**👉 Réponse :**

---

**Q2.3 — Quelle est la politique d'annulation exacte ?**

Le doc mentionne "annulation possible" sans détail.

> **⚠️ Risque** : Sans politique claire, litiges constants. Point le plus sensible d'une marketplace de location.
>
> **💡 Suggestion** : 2-3 niveaux (inspiré Airbnb) : Flexible (remboursement 100% si 24h+ avant), Modérée (100% si 5j+, 50% si 24h-5j), Stricte (50% si 7j+, 0% après). Le loueur choisit pour chaque véhicule.

**👉 Réponse :**

---

### 🟡 Important

---

**Q2.4 — Système de notation : note globale ou sous-catégories ? Double aveugle ? Bidirectionnel ?**

Le droit de réponse conditionné à l'abonnement est-il légal ? Seuil de visibilité (nombre minimum d'avis) ?

> **⚠️ Risque** : Système mal conçu = destruction de confiance. Sans double aveugle, biais de représailles.
>
> **💡 Suggestion** : (1) Double aveugle obligatoire (14j max). (2) Note globale + 3 sous-catégories (état véhicule, communication, ponctualité). (3) Bidirectionnel. (4) Min 3 avis. (5) Droit de réponse inconditionnel (risque juridique si conditionné à un abo).

**👉 Réponse :**

---

**Q2.5 — Réservation instantanée vs demande d'approbation ? Le loueur choisit ou Maloc impose ?**

Délai de réponse du loueur ? 24h comme Airbnb ? Pénalité si dépassé ?

> **💡 Suggestion** : Laisser le choix au loueur pour le MVP. Pénalité de visibilité si non-réponse > 24h.

**👉 Réponse :**

---

**Q2.6 — Algorithme de ranking du catalogue : comment sont triés les résultats par défaut ?**

> **⚠️ Risque** : Mauvais ranking = mauvaise conversion. Les loueurs avec abonnement s'attendent à être visibles.
>
> **💡 Suggestion** : Disponibilité → note moyenne → taux de réponse → boost payant → fraîcheur.

**👉 Réponse :**

---

**Q2.7 — Parcours utilisateur détaillé : est-il défini et validé étape par étape ?**

Client (inscription → KYC → recherche → réservation → paiement → départ photos → location → retour photos → avis). Loueur (inscription → KYC pro → Stripe → ajout véhicules → acceptation → départ → retour → encaissement). Admin (validation loueurs → validation véhicules → gestion litiges).

> **⚠️ Risque** : Coder sans wireframes validés = itérations coûteuses.

**👉 Réponse :**

---

**Q2.8 — Sync calendrier iCal pour les loueurs multi-plateformes ?**

> **⚠️ Risque** : Double réservation si le loueur ne met pas à jour sa dispo.
>
> **💡 Suggestion** : iCal import/export en V2. Pour le MVP, gestion manuelle + pénalité en CGU pour double réservation.

**👉 Réponse :**

---

**Q2.9 — Grille tarifaire des mises en avant : "5€/semaine" mentionné — tarif unique ou variable ?**

**👉 Réponse :**

---

**Q2.10 — Filtrage des coordonnées dans la messagerie (bloquer email/tel avant réservation) ?**

> **💡 Suggestion** : Comme Airbnb, bloquer les échanges de coordonnées avant réservation pour protéger la commission.

**👉 Réponse :**

---

**Q2.11 — CRM iPad : quelles fonctionnalités exactes pour le MVP ?**

> **💡 Suggestion** : Pour le lancement, les loueurs utilisent le web responsive depuis leur iPad. Build natif iPad = V2 (mai 2026).

**👉 Réponse :**

---

### 🟢 Nice-to-have

---

**Q2.12 — Multi-langue : la structure i18n est-elle prévue dès le code initial ?**

> **💡 Suggestion** : Utiliser `next-intl` dès Sprint 1. Coût : ~2-3 jours de setup. Économie : des semaines de refactoring plus tard.

**👉 Réponse :**

---

**Q2.13 — Traduction automatique de la messagerie pour clients étrangers ?**

**👉 Réponse :**

---

**Q2.14 — Coupons bar-tabac : partenaire distributeur identifié ? Process ? Modèle économique ?**

> **⚠️ Risque** : Concept sympa mais logistique complexe et coûteuse. Cycle commercial 3-6 mois minimum avec un réseau de distribution.
>
> **💡 Suggestion** : Reporter à V3+. Pour le MVP : coupons digitaux (codes promo classiques).

**👉 Réponse :**

---

## 3. 🏗️ Technique & Architecture

### 🔴 Bloquant

---

**Q3.1 — Stack technique confirmée ? Next.js + Supabase + React Native ?**

Le doc mentionne plusieurs options — quelle est la décision finale ?

> **💡 Suggestion** : Next.js (web) + Supabase (BDD/Auth/Realtime) + Cloudflare R2 (stockage) + Stripe Connect Custom (paiements).

**👉 Réponse :**

---

**Q3.2 — Environnements dev/staging/prod définis ?**

> **⚠️ Risque** : Sans staging, les bugs arrivent en prod. Avec un seul projet Supabase, les migrations sont risquées.
>
> **💡 Suggestion** : Dev (Supabase local Docker + Stripe test), Staging (Supabase plan gratuit + Vercel preview), Prod (Supabase Pro EU + Vercel prod). Coût additionnel : ~25€/mois.

**👉 Réponse :**

---

**Q3.3 — Le MVP tel que décrit est-il réalisable en 8 semaines ?**

Le scope inclut : auth, KYC, catalogue + recherche, réservation, paiement Stripe Connect Custom, messagerie temps réel, photos géolocalisées, signature électronique, génération PDF, comparaison IA, notifications push, admin panel. **C'est un scope de 6 mois condensé en 8 semaines.**

> **💡 Suggestion MVP réaliste en 8 semaines** :
> - ✅ Auth (Google/Apple + email)
> - ✅ Profils + KYC basique (upload docs, validation manuelle)
> - ✅ Catalogue véhicules (CRUD + recherche Postgres native)
> - ✅ Réservation (demande → acceptation → confirmation)
> - ✅ Paiement Stripe Connect (débit + commission)
> - ✅ Messagerie basique (Supabase Realtime)
> - ⚠️ Photos état des lieux (upload simple, PAS de comparaison IA)
> - ⚠️ Signature électronique (canvas basique)
> - ❌ Meilisearch → V2
> - ❌ Comparaison IA photos → V2
> - ❌ Génération PDF contrats → V2
> - ❌ PostGIS géolocalisation → V2
> - ❌ iPad CRM → V2
> - ❌ Coupons → V3

**👉 Réponse :**

---

### 🟡 Important

---

**Q3.4 — CI/CD : quel contenu exact du pipeline GitHub Actions ?**

> **💡 Suggestion** : PR → lint + type check + tests unitaires → preview deploy. Merge main → deploy staging auto. Tag release → deploy prod. Rollback Vercel instantané.

**👉 Réponse :**

---

**Q3.5 — Tests : quelle stratégie concrète ? Framework ? Couverture cible ?**

> **💡 Suggestion** : Vitest (unit, 60% couverture cible) + Playwright (E2E sur 5 parcours critiques : inscription, KYC, réservation, paiement, départ/retour). Devs écrivent les unit tests, QA part-time pour E2E.

**👉 Réponse :**

---

**Q3.6 — Monitoring & alerting : Sentry + quoi pour l'infra ?**

> **💡 Suggestion** : Sentry (erreurs + perf), Supabase Dashboard (BDD), Vercel Analytics (Core Web Vitals), UptimeRobot gratuit (uptime). Alertes : Slack webhook erreurs critiques.

**👉 Réponse :**

---

**Q3.7 — Backup & disaster recovery : quelle stratégie ? RPO/RTO ?**

> **💡 Suggestion** : Supabase Pro (backups quotidiens auto, PITR). R2 versioning. RPO 24h, RTO 4h. Tester la restauration 1x/mois.

**👉 Réponse :**

---

**Q3.8 — Meilisearch : self-hosted ou Cloud ?**

> **💡 Suggestion** : Meilisearch Cloud (~30€/mois, EU) plutôt que self-hosted. Moins de maintenance. Pour le MVP avec quelques centaines de véhicules, le plan starter suffit. Ou reporter à V2 et utiliser la recherche Postgres native.

**👉 Réponse :**

---

**Q3.9 — Migration de données : les loueurs ont-ils des données (véhicules, clients) à importer ?**

> **⚠️ Risque** : Si saisie manuelle de 50 véhicules chacun, onboarding lent et frustrant.
>
> **💡 Suggestion** : Prévoir un import CSV pour les véhicules.

**👉 Réponse :**

---

**Q3.10 — WebSockets (Supabase Realtime) : fiabilité sur mobile ?**

> **💡 Suggestion** : Prévoir un mécanisme de "catch-up" au retour en ligne. Notifications push (Expo) comme filet de sécurité.

**👉 Réponse :**

---

### 🟢 Nice-to-have

---

**Q3.11 — API versioning pour les futures apps mobiles ?**

> **💡 Suggestion** : Pas critique pour le MVP web. Dès V2 (app mobile) : `/api/v1/...` dans les Edge Functions.

**👉 Réponse :**

---

**Q3.12 — Monorepo Turborepo : vraiment nécessaire pour le MVP ?**

> **💡 Suggestion** : Simple repo Next.js pour MVP. Migrer vers monorepo quand l'app mobile commence (V2).

**👉 Réponse :**

---

**Q3.13 — Budget infrastructure mensuel estimé ?**

> **💡 Suggestion** : MVP (<1k users) ~100-150€/mois. Growth (1-10k) ~350-500€/mois. Détail : Supabase Pro 25€, Vercel Pro 20€, R2 ~5€, Meilisearch 30€, Sentry 0€, ClickSend ~20€, didit.me variable.

**👉 Réponse :**

---

## 4. 💰 Paiement & Finance

### 🔴 Bloquant

---

**Q4.1 — Le compte Stripe Connect Custom est-il créé ? KYB complété ?**

L'activation prend 2-4 semaines (revue Stripe). Prérequis : société enregistrée, IBAN, identité du dirigeant.

> **⚠️ Risque** : Sans compte activé, aucun paiement possible. **Bloquant critique.**
>
> **💡 Suggestion** : Ouvrir le dossier immédiatement. Commencer en mode test en attendant l'approbation.

**👉 Réponse :**

---

**Q4.2 — Commission exacte : 10% tout sur le loueur, ou split client/loueur comme Airbnb ?**

Le benchmark Airbnb suggère un split (~15-18% total). Quel modèle final ?

> **⚠️ Risque** : Impact direct sur le business model et la compétitivité.

**👉 Réponse :**

---

**Q4.3 — Qui paie les frais Stripe (~1.4% + 0.25€) ?**

Absorbé par Maloc ? Refacturé au loueur ? Split ?

> **⚠️ Risque** : Impact direct sur la marge.

**👉 Réponse :**

---

**Q4.4 — Quand le client est-il débité ? Quand le loueur est-il payé ?**

Client débité : à la réservation ? 24h avant ? Au retrait ? Loueur payé : après retour ? Délai de X jours ? Fenêtre de litige ?

> **💡 Suggestion** : Reversement automatique 72h après retour validé (sans litige). Si litige ouvert → fonds gelés. Le loueur peut initier un retrait à tout moment depuis sa balance.

**👉 Réponse :**

---

**Q4.5 — Prix abonnement SaaS : 199€/mois confirmé ? TTC ou HT ?**

Y aura-t-il un plan gratuit ? Un plan d'essai ? Réduction engagement annuel ?

> **💡 Suggestion** : Plan gratuit (max 3 véhicules, pas de CRM), Plan Pro 199€/mois (tout), 3 mois gratuits pour early adopters, réduction annuel 1990€/an.

**👉 Réponse :**

---

### 🟡 Important

---

**Q4.6 — Gestion des remboursements : qui décide ? Quel process ?**

Total ou partiel ? Sur carte d'origine ou crédit balance ? Délai ? La commission Maloc est-elle remboursée aussi ?

> **⚠️ Risque** : Obligation légale : remboursement sur le moyen de paiement d'origine, délai max 14 jours.
>
> **💡 Suggestion** : (1) Loueur peut initier remboursement total. (2) Client demande → admin arbitre. (3) Toujours sur moyen d'origine.

**👉 Réponse :**

---

**Q4.7 — Commission sur les annulations : Maloc garde sa part ou rembourse tout ?**

> **💡 Suggestion** : Annulation client >5j : 0% retenu, remboursement total. <5j : commission retenue sur partie non remboursée. Annulation loueur : remboursement total client + pénalité loueur.

**👉 Réponse :**

---

**Q4.8 — Caution : pré-autorisation ou débit réel ? Montant max ?**

Qui définit le montant (loueur ou Maloc) ? Que faire si le plafond CB du locataire est insuffisant pour les véhicules haut de gamme ?

> **💡 Suggestion** : Stripe hold 7j (Visa) / 30j (Mastercard) via `capture_method: manual`. Proposer plusieurs niveaux : standard (~2-5k€ franchise assurance) et premium (10k€+). Vérifier le plafond carte avant réservation (dry run).

**👉 Réponse :**

---

**Q4.9 — Facturation : qui émet quoi ?**

Maloc facture le client pour la commission ? Auto-facture au loueur ? Ou le loueur facture directement le client ? Quel logiciel de facturation ?

> **💡 Suggestion** : Stripe Invoices pour l'abonnement 199€/mois. Pour les commissions : Pennylane ou module custom.

**👉 Réponse :**

---

**Q4.10 — Conformité PSD2/SCA : le flow de paiement est-il compatible ?**

> **⚠️ Risque** : Non-conformité SCA = paiements refusés par les banques.
>
> **💡 Suggestion** : Stripe gère SCA nativement (3D Secure). S'assurer que le front-end utilise `confirmPayment()`.

**👉 Réponse :**

---

### 🟢 Nice-to-have

---

**Q4.11 — Multi-devises pour l'expansion (CHF pour la Suisse, etc.) ?**

> **💡 Suggestion** : Stocker montants en centimes + colonne `currency` (déjà fait). Stripe Connect Custom supporte nativement. MVP = EUR uniquement.

**👉 Réponse :**

---

**Q4.12 — Retrait de la balance loueur : seuil minimum ? Délai de virement ?**

**👉 Réponse :**

---

**Q4.13 — Expiration des coupons/balance : durée de validité ?**

**👉 Réponse :**

---

## 5. 🚀 Opérations & Lancement

### 🔴 Bloquant

---

**Q5.1 — Équipe de développement : combien de personnes ? Profils ? Tech lead ?**

Le doc recommande 4-5 devs + 1 designer + 1 QA. Cette équipe est-elle constituée ?

> **⚠️ Risque** : **LA question critique.** Avec moins de 3 devs fullstack seniors, le 4 avril est inatteignable.
>
> **💡 Suggestion** : Minimum : 2 devs fullstack seniors (Next.js + Supabase) + 1 dev Stripe + 1 designer UI/UX + 1 QA part-time.

**👉 Réponse :**

---

**Q5.2 — Onboarding loueurs : combien de loueurs signés ? Le démarchage a-t-il commencé ?**

Les 137 agences cibles sont-elles qualifiées ? D'où vient ce chiffre ? Combien de LOI signées ? Le produit est-il montrable (démo/prototype) ?

> **⚠️ Risque** : Marketplace sans offre = morte. Minimum 30-50 véhicules actifs en Île-de-France + Côte d'Azur au lancement.
>
> **💡 Suggestion** : Commencer le démarchage MAINTENANT avec une maquette/démo. 3 premiers mois gratuits pour les early adopters. "Concierge onboarding" : l'équipe Maloc crée les annonces pour les premiers loueurs.

**👉 Réponse :**

---

**Q5.3 — Date de lancement 4 avril 2026 : toujours d'actualité ?**

> **⚠️ Risque** : Vu les bloquants non résolus (SAS, Stripe, CGU, assurance, équipe), la date est en danger.

**👉 Réponse :**

---

**Q5.4 — Ville(s) de lancement : Paris uniquement ? Côte d'Azur ?**

> **💡 Suggestion** : Focus Île-de-France + Côte d'Azur pour la densité de loueurs premium.

**👉 Réponse :**

---

**Q5.5 — Contenu : qui rédige les textes UI, emails transactionnels, templates de contrats ?**

10-15 templates d'emails transactionnels à rédiger. Textes UI intégrés aux maquettes. Template de contrat de location par défaut.

> **⚠️ Risque** : Sans textes validés, les devs mettent du lorem ipsum et le lancement est retardé.
>
> **💡 Suggestion** : Nommer un responsable contenu.

**👉 Réponse :**

---

### 🟡 Important

---

**Q5.6 — Support client au lancement : qui gère ? Quel outil ? SLA ?**

> **💡 Suggestion** : Crisp (gratuit puis ~25€/mois). 1 personne dédiée. SLA : réponse < 4h en journée pendant les 3 premiers mois.

**👉 Réponse :**

---

**Q5.7 — Marketing & acquisition : quelle stratégie ? Budget alloué ? Canaux prévus ?**

SEO (3-6 mois pour les résultats), Google Ads (CPC luxe : 5-15€), Instagram/TikTok, PR, influenceurs auto, partenariats (clubs auto, hôtels 5*).

> **💡 Suggestion** : J-30 (mars) : landing page pré-inscription. Lancement : PR presse auto/tech. Instagram/TikTok : contenu aspirationnel. Google Ads : 2-3k€/mois test. Partenariats : clubs auto, conciergeries, hôtels 5*.

**👉 Réponse :**

---

**Q5.8 — KPIs de succès : quels seuils pour valider le MVP ?**

> **💡 Suggestion** (avril-juin 2026) : 50+ véhicules actifs, 15+ loueurs, 500+ inscrits, 50+ réservations, 5k€+ commissions/mois, note > 4.0, litiges < 5%, conversion > 2%.

**👉 Réponse :**

---

**Q5.9 — Assistance/dépannage 24/7 : partenaire identifié ? Coût ?**

Procédure en cas de panne, immobilisation. Compensation client ?

**👉 Réponse :**

---

**Q5.10 — Single Point of Failure : y a-t-il un seul dev qui comprend tout le système ?**

> **⚠️ Risque** : Bus factor = 1. Si le dev principal est indisponible, tout s'arrête.
>
> **💡 Suggestion** : Documentation continue. Code review systématique. Au moins 2 personnes par module critique.

**👉 Réponse :**

---

**Q5.11 — Incentives early adopters loueurs : mois gratuits ? Commission réduite ? Programme de parrainage ?**

**👉 Réponse :**

---

## 6. 🔒 Sécurité & Conformité

### 🔴 Bloquant

---

**Q6.1 — Pentest pré-lancement : planifié ? À quelle date ?**

corridor.dev mentionné. Tester : auth, paiement, RLS, upload de fichiers.

> **⚠️ Risque** : Un pentest la veille du lancement ne sert à rien s'il n'y a pas de temps pour corriger.
>
> **💡 Suggestion** : Mi-mars (2-3 semaines avant lancement). 1 semaine pour corrections critiques.

**👉 Réponse :**

---

**Q6.2 — MFA admins : obligatoire ou recommandé ?**

> **⚠️ Risque** : Compte admin compromis = accès à toutes les données et paiements. Vecteur d'attaque #1.
>
> **💡 Suggestion** : MFA **obligatoire** (TOTP via Supabase Auth). Nombre de comptes admin au strict minimum.

**👉 Réponse :**

---

**Q6.3 — AIPD (Analyse d'Impact) réalisée ? Obligatoire pour les documents d'identité.**

> **⚠️ Risque** : Obligatoire pour les traitements à haut risque (CNI, permis, données financières).

**👉 Réponse :**

---

**Q6.4 — Bandeau cookies conforme CNIL : quelle solution ?**

> **💡 Suggestion** : Tarteaucitron (open source, gratuit) ou Axeptio (~40€/mois). À intégrer Sprint 1.

**👉 Réponse :**

---

### 🟡 Important

---

**Q6.5 — Stockage documents d'identité : durée de rétention ? Chiffrement applicatif ? Accès loggé ?**

> **💡 Suggestion** : Rétention = durée relation + 5 ans. Chiffrement applicatif en plus du chiffrement R2 (AES-256). Accès admins uniquement + logs. Purge auto des comptes inactifs > 5 ans.

**👉 Réponse :**

---

**Q6.6 — Chiffrement des données sensibles dans PostgreSQL (téléphone, adresse) ?**

> **💡 Suggestion** : Supabase chiffre au repos par défaut. Pour plus de sécurité : `pgcrypto` sur les colonnes sensibles. URLs documents protégées par pre-signed URLs avec expiration.

**👉 Réponse :**

---

**Q6.7 — Plan de réponse aux incidents (fuite de données, piratage, panne majeure) ?**

> **⚠️ Risque** : RGPD impose notification CNIL dans 72h en cas de violation.
>
> **💡 Suggestion** : Plan minimal : (1) Détection/alerte (2) Confinement (3) Évaluation (4) Notification CNIL 72h + utilisateurs (5) Correction (6) Post-mortem.

**👉 Réponse :**

---

**Q6.8 — Registre des traitements RGPD rédigé ?**

**👉 Réponse :**

---

**Q6.9 — DPA (Data Processing Agreements) signés avec tous les sous-traitants ?**

Supabase, Stripe, Cloudflare, didit.me, ClickSend, Meilisearch, Sentry, OpenAI.

**👉 Réponse :**

---

**Q6.10 — Rate limiting implémenté ? Comment ?**

**👉 Réponse :**

---

## 7. 📈 Scalabilité & Évolution

### 🟡 Important

---

**Q7.1 — Seuils de scaling par composant ?**

> **💡 Suggestion** :
> - Supabase : > 500 connexions simultanées → read replicas
> - Meilisearch : > 100k documents → plan supérieur
> - Vercel : > 100k visites/mois → Pro/Enterprise
> - Edge Functions : > 500k invocations/mois → Enterprise

**👉 Réponse :**

---

**Q7.2 — Plan de migration si Supabase ne suffit plus ?**

> **💡 Suggestion** : Supabase est open source → self-host sur Kubernetes possible. PostgreSQL standard → migrable vers AWS RDS, Cloud SQL. Ne pas utiliser de features trop spécifiques à Supabase dans la logique métier.

**👉 Réponse :**

---

### 🟢 Nice-to-have

---

**Q7.3 — Stratégie multi-pays technique : un Supabase par pays ou un seul global ?**

> **💡 Suggestion** : Phase 2 (Europe) : un seul Supabase EU avec RLS par pays (suffisant jusqu'à ~50k users). Phase 3 (MENA) : nouveau Supabase Middle East. Vercel : un déploiement + `next-intl` + sous-domaines (`fr.maloc.com`, `es.maloc.com`).

**👉 Réponse :**

---

**Q7.4 — Limites connues de Supabase à anticiper ?**

> Edge Functions : cold start ~200-500ms, 150MB RAM, timeout 60s. Realtime : max 200 connexions simultanées (plan Pro). Storage : pas de transformation d'images intégrée. Auth : vérifier MFA TOTP selon le plan.

**👉 Réponse :**

---

**Q7.5 — Maloc OS (IA) : scope MVP ? LLM utilisé ? Coût par transaction ?**

> **💡 Suggestion** : Sprint 5 : comparaison IA photos = assistance uniquement (jamais de décision auto). GPT-4o Vision (~0,05-0,10€ par comparaison). Stories, analytics, WhatsApp bot = post-MVP. Inclus dans l'abo ou facturation à l'usage ?

**👉 Réponse :**

---

## 8. 🚗 Opérations Terrain (État des Lieux, Handover, Carburant)

### 🔴 Bloquant — intégré dans Q2.3 (politique annulation) et ci-dessous :

---

**Q8.1 — Protocole état des lieux : photos obligatoires ? Combien de points de contrôle ? Vidéo ?**

Validation par les deux parties ? Timeout si pas de réponse ? Délai pour contester un dégât non déclaré ?

> **💡 Suggestion** : 8-12 photos standard obligatoires. Validation bilatérale avec timeout 24h. Contestation possible sous 48h.

**👉 Réponse :**

---

**Q8.2 — Modes de handover : main propre uniquement ? Points relais ? Livraison ? Boîtes à clés ?**

Vérification du permis au moment du retrait : comment ?

**👉 Réponse :**

---

**Q8.3 — Forfaits kilométrage : illimité ? 150km/jour ? 300km/jour ? Prix dépassement ?**

> **💡 Suggestion** : 3 formules standardisées au choix du loueur.

**👉 Réponse :**

---

**Q8.4 — Politique carburant : plein/plein ? Véhicules électriques (niveau de batterie mini au retour) ?**

**👉 Réponse :**

---

### 🟡 Important — intégré dans Q5.9 (assistance 24/7) et :

---

**Q8.5 — Procédure en cas d'accident : constat in-app ? Déclaration sous combien d'heures ?**

**👉 Réponse :**

---

## 9. 👤 Vérifications & KYC

### 🔴 Bloquant

---

**Q9.1 — Documents requis (particulier) : pièce d'identité + permis + justificatif domicile — confirmé ?**

**👉 Réponse :**

---

**Q9.2 — Documents requis (loueur pro) : KBIS + pièce d'identité + attestation assurance flotte — confirmé ?**

Vérification SIRET : API INSEE, Pappers, ou manuel ? Cartes grises et contrôle technique vérifiés ?

**👉 Réponse :**

---

**Q9.3 — Vérification automatique (didit.me) ou manuelle ? Délai de vérification ?**

**👉 Réponse :**

---

**Q9.4 — Âge minimum : 21 ans ? 25 ans ? Variable selon le véhicule ?**

**👉 Réponse :**

---

### 🟡 Important

---

**Q9.5 — Vérification casier judiciaire pour véhicules > 100k€ ?**

**👉 Réponse :**

---

**Q9.6 — Historique de conduite : fichier AGIRA ? Déclaratif ? Scoring client basé sur quoi ?**

**👉 Réponse :**

---

---

> **📌 Ce document est la référence unique.** Les anciens fichiers (maloc-questions-ouvertes.md, questions-a-clarifier.md, questions-consolidees.md) ont été supprimés.
>
> **Mode d'emploi** : Ramzi répond directement après chaque **👉 Réponse :** — les réponses seront intégrées dans la documentation technique.
>
> *Consolidé le 8 février 2026*
