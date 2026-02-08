# Maloc — Analyse des flows de réservation & Recommandations UX

> Document de référence pour le design du tunnel de réservation Maloc (location véhicules haut de gamme)
> Généré le 08/02/2026

---

## Table des matières

1. [Analyse par plateforme](#1-analyse-par-plateforme)
   - [Turo](#11-turo)
   - [Getaround](#12-getaround)
   - [Airbnb](#13-airbnb)
   - [Virtuo](#14-virtuo)
2. [Tableau comparatif](#2-tableau-comparatif)
3. [Flow recommandé pour Maloc](#3-flow-recommandé-pour-maloc)
4. [Liste des écrans nécessaires](#4-liste-des-écrans-nécessaires)
5. [Wireframes textuels](#5-wireframes-textuels)
6. [Composants UI nécessaires](#6-composants-ui-nécessaires)

---

## 1. Analyse par plateforme

### 1.1 Turo

#### 1.1.1 Flow de réservation (côté client)

1. **Recherche** — Saisie lieu + dates (début/fin) + heure. Filtres : type de véhicule, prix, transmission, caractéristiques, distance, note, Superhost
2. **Résultats** — Carte + liste. Chaque card : photo, modèle, prix/jour, note, nombre de trajets, badge "All-Star Host"
3. **Fiche véhicule** — Galerie photos (8-15), description, caractéristiques (sièges, portes, transmission, GPS, Bluetooth…), avis, profil hôte, politique d'annulation, distance/localisation approximative, extras disponibles
4. **Personnalisation** — Sélection du plan de protection (Basic, Standard, Premium), ajout d'extras (siège enfant, GPS, livraison), modification dates/heures
5. **Lieu de prise en charge** — Choix entre : récupération chez l'hôte, livraison à une adresse (supplément), aéroport
6. **Checkout** — Récapitulatif (véhicule, dates, protection, extras, frais), saisie moyen de paiement, code promo, conditions générales
7. **Confirmation** — Résumé de la réservation, instructions de l'hôte, messagerie ouverte, rappels avant le trajet

#### 1.1.2 Flow côté hôte

1. **Notification de demande** — Push + email. L'hôte voit : profil locataire (photo, note, vérifications), dates, revenus estimés
2. **Acceptation/Refus** — L'hôte a un délai pour accepter (généralement 1-8h selon paramétrage). Options : accepter, refuser (avec raison), proposer modification
3. **Réservation instantanée** — Option activable : acceptation automatique sans intervention de l'hôte (critères paramétrables : note minimum, nombre de trajets minimum)
4. **Gestion** — Calendrier de disponibilité, tarification dynamique, messages avec le locataire, instructions de remise
5. **Pré-trajet** — Rappel de préparer le véhicule, vérification du niveau de carburant

#### 1.1.3 Tunnel de paiement

- **Infos collectées** : carte bancaire (Stripe), nom, adresse de facturation
- **Décomposition du prix** : prix/jour × nb jours + frais de service Turo (~15-25% côté locataire) + plan de protection + extras + taxes + frais de livraison éventuels
- **Pré-autorisation** : montant total bloqué à la réservation
- **Débit effectif** : au début du trajet
- **Caution** : gérée via le plan de protection (pas de caution séparée)
- **Remboursement hôte** : 3 jours après la fin du trajet, via virement/PayPal

#### 1.1.4 Messagerie

- **Chat in-app** entre locataire et hôte
- **Messages système** : confirmation de réservation, rappel J-1, début du trajet, fin du trajet, demande d'évaluation
- **Partage de localisation** pour le point de rencontre
- **Envoi de photos** possible (état des lieux)
- **Numéros de téléphone masqués** (pas de contact direct hors plateforme)
- **Templates de messages** suggérés à l'hôte

#### 1.1.5 État des lieux / Check-in / Check-out

- **Check-in** : L'hôte et le locataire se rencontrent (ou livraison). Le locataire prend des photos du véhicule via l'app (extérieur : 4 angles min + intérieur + odomètre + niveau carburant). L'app guide avec des emplacements de photos prédéfinis
- **Pendant le trajet** : suivi GPS optionnel (si activé par l'hôte), kilométrage tracké
- **Check-out** : Mêmes photos obligatoires. Comparaison avant/après. L'hôte confirme l'état du véhicule
- **Signalement de dommages** : fenêtre de 24h après le check-out pour signaler un problème avec photos à l'appui
- **Évaluation mutuelle** : note + commentaire (locataire → hôte, hôte → locataire)

---

### 1.2 Getaround

#### 1.2.1 Flow de réservation (côté client)

1. **Recherche** — Lieu + dates + heures. Filtres : type, prix, transmission, carburant, Getaround Connect (ouverture via app)
2. **Résultats** — Carte + liste. Badge "Connect" (véhicule avec boîtier connecté). Prix/heure ou prix/jour
3. **Fiche véhicule** — Photos, caractéristiques, avis, profil propriétaire, localisation précise (pour Connect), politique carburant, kilométrage inclus (10 mi/h, 200 mi/jour)
4. **Vérification du profil** (1ère fois) — Upload permis de conduire + pièce d'identité, validation automatique ou manuelle
5. **Choix de la protection** — Plans : Plus ou Premium (couverture différente sur la franchise)
6. **Checkout** — Récapitulatif, paiement par carte
7. **Confirmation** — Accès aux instructions, chat avec le propriétaire

**Particularité Getaround Connect** : Pas de remise de clés. Le locataire se rend au véhicule, ouvre l'app, fait le check-in (photos), déverrouille à distance. Les clés sont à l'intérieur du véhicule. C'est **le modèle le plus proche de ce que Maloc devrait viser**.

#### 1.2.2 Flow côté propriétaire

1. **Listing** — Création de l'annonce : photos, description, prix, disponibilités, règles (fumeur, animaux…)
2. **Acceptation** — Automatique pour les véhicules Connect (pas d'intervention). Manuelle possible pour les véhicules non-Connect
3. **Gestion du calendrier** — Blocage de créneaux, tarification par période
4. **Installation Connect** — Boîtier OBD installé par Getaround (gratuit), permet déverrouillage à distance
5. **Revenus** — Tableau de bord avec suivi des gains, versements automatiques

#### 1.2.3 Tunnel de paiement

- **Infos collectées** : carte bancaire, permis de conduire, pièce d'identité
- **Tarification** : prix/heure (min 1h) ou forfait journalier. Frais de service (~30-40% côté propriétaire)
- **Pré-autorisation** : oui, au moment de la réservation
- **Ajustements post-trajet** : si kilométrage dépassé ou carburant non remis → surcharge automatique
- **Pas de caution séparée** : intégré dans le plan de protection

#### 1.2.4 Messagerie

- **Chat in-app** entre locataire et propriétaire
- **Messages automatiques** : confirmation, rappel 1h avant, début du trajet, fin du trajet, reçu
- **Notifications push** à chaque événement
- **Pas de partage de numéro** (tout via l'app)
- **Support 24/7** accessible depuis le chat

#### 1.2.5 État des lieux / Check-in / Check-out

- **Check-in guidé** (Getaround Connect) :
  1. Ouvrir l'app → "Commencer le check-in"
  2. Photos guidées : extérieur (4 faces), intérieur, tableau de bord (kilométrage), niveau carburant
  3. Signaler tout dommage existant (annotation sur photo)
  4. Confirmer le check-in → déverrouillage du véhicule
- **Check-out** :
  1. Garer le véhicule à l'emplacement d'origine
  2. Mêmes photos obligatoires
  3. Laisser les clés dans le véhicule
  4. Verrouiller via l'app → fin du trajet
- **Ajustement automatique** : si delta carburant ou kilométrage excessif → facturation supplémentaire
- **Fenêtre de litige** : 48h pour signaler un problème

---

### 1.3 Airbnb

#### 1.3.1 Flow de réservation (côté client)

1. **Recherche** — Lieu + dates + nb voyageurs. Filtres par type, prix, équipements, note
2. **Résultats** — Carte + grille de cards avec photos, prix/nuit, note
3. **Fiche logement** — Galerie, description, équipements, avis, profil hôte (Superhost), politique annulation, carte du quartier, disponibilité
4. **Checkout** — Dates, nb voyageurs, message à l'hôte (optionnel), plan de protection (AirCover), paiement (carte, PayPal, Apple Pay, Google Pay, virement), code promo
5. **Confirmation** — Résumé, accès messagerie, instructions d'arrivée (souvent envoyées 24-48h avant)

#### 1.3.2 Flow côté hôte

1. **Notification** — Push + email avec profil voyageur
2. **Réservation instantanée** ou **demande** (choix de l'hôte)
3. **Pré-approbation** — L'hôte peut pré-approuver un voyageur qui a envoyé un message
4. **Gestion** — Calendrier, tarification smart (prix dynamique), règles de la maison, instructions d'arrivée programmées, co-hôtes

#### 1.3.3 Tunnel de paiement

- **Moyens de paiement** : carte, PayPal, Apple Pay, Google Pay, virement (selon pays), paiement en plusieurs fois (>500€)
- **Frais de service** : ~14% côté voyageur, 3% côté hôte
- **Débit** : à la confirmation de réservation
- **Versement hôte** : 24h après le check-in
- **Caution** : pré-autorisation optionnelle (définie par l'hôte)

#### 1.3.4 Messagerie

- **Chat riche** : texte, photos, traduction automatique
- **Messages programmés** : instructions d'arrivée envoyées automatiquement à J-X
- **Réponses rapides** / templates
- **Messages système** : confirmation, rappels, check-in, check-out, évaluation
- **Appels téléphoniques** via la plateforme (numéros masqués)

#### 1.3.5 Check-in / Check-out

- **Instructions d'arrivée** : envoyées automatiquement (adresse exacte, code, photos de l'entrée)
- **Self check-in** : boîte à clés, serrure connectée, concierge
- **Pas d'état des lieux photographique obligatoire** (point faible vs location de véhicules)
- **Check-out** : instructions de départ (ménage, clés, heures)

**Enseignement pour Maloc** : Le système de messagerie programmée et les instructions automatisées sont excellents. Le manque d'état des lieux structuré ne s'applique pas (Maloc doit absolument en avoir un).

---

### 1.4 Virtuo

#### 1.4.1 Flow de réservation (côté client)

1. **Recherche** — Ville + dates + heures. Pas de carte (flotte propre dans des stations fixes)
2. **Sélection du véhicule** — Choix par catégorie (citadine, berline, SUV). Véhicule exact attribué automatiquement (pas de choix unitaire)
3. **Personnalisation** — Options : conducteur additionnel, kilométrage illimité, annulation flexible
4. **Vérification du profil** (1ère fois) — Scan du permis + selfie (vérification biométrique), scan de la CNI
5. **Checkout** — Récapitulatif, paiement par carte
6. **Confirmation** — QR code / accès digital au véhicule

**Particularité Virtuo** : 100% digital, pas d'interaction humaine. Flotte propre (pas de P2P). Véhicules premium (BMW, Mercedes, Audi). Le locataire se rend à la station, ouvre le véhicule via l'app.

#### 1.4.2 Flow côté "loueur" (pas applicable — flotte propre)

Virtuo gère sa propre flotte. Pas de flow hôte. Gestion centralisée : maintenance, nettoyage, repositionnement.

**Enseignement pour Maloc** : Si Maloc a une composante flotte propre en plus du P2P, le modèle Virtuo est la référence pour l'expérience sans friction.

#### 1.4.3 Tunnel de paiement

- **Carte bancaire** uniquement (Visa, Mastercard, Amex)
- **Débit** : à la réservation
- **Caution** : pré-autorisation de 500-1500€ selon la catégorie
- **Prix tout inclus** : assurance, assistance, kilométrage de base
- **Ajustements post-trajet** : kilométrage excédentaire, carburant, amendes

#### 1.4.4 Messagerie

- **Pas de messagerie P2P** (pas d'hôte)
- **Chat support in-app** avec l'équipe Virtuo
- **Notifications push** : confirmation, rappel, début/fin location, reçu
- **Centre d'aide** intégré

#### 1.4.5 État des lieux / Check-in / Check-out

- **Check-in** :
  1. Se rendre à la station (adresse précise + plan)
  2. Scanner le QR code ou ouvrir via l'app
  3. Photos guidées obligatoires (extérieur 4 faces + intérieur + compteur)
  4. Signaler tout dommage → annotation directe
  5. Confirmer → véhicule déverrouillé, clés dans la boîte à gants
- **Check-out** :
  1. Retour à la station (même station ou différente si autorisé)
  2. Photos de retour obligatoires
  3. Verrouiller via l'app
  4. Récapitulatif automatique (durée, km, ajustements)
- **Inspection automatique** : Virtuo vérifie les photos et compare avant/après

---

## 2. Tableau comparatif

| Critère | Turo | Getaround | Airbnb | Virtuo |
|---|---|---|---|---|
| **Modèle** | P2P véhicules | P2P véhicules | P2P logements | Flotte propre véhicules |
| **Résa instantanée** | Optionnelle | Oui (Connect) | Optionnelle | Oui |
| **Ouverture digitale** | Non (remise de clés) | Oui (Connect) | Serrure connectée | Oui (app) |
| **État des lieux in-app** | Oui (photos guidées) | Oui (photos guidées) | Non structuré | Oui (photos guidées) |
| **Protection intégrée** | Oui (3 plans) | Oui (2 plans) | AirCover | Incluse |
| **Messagerie P2P** | Oui | Oui | Oui | Non (support uniquement) |
| **Vérification identité** | Permis + ID | Permis + ID | ID + selfie | Permis + ID + selfie |
| **Paiement fractionné** | Non | Non | Oui (>500€) | Non |
| **Ajustement post-trajet** | Manuel (litiges) | Automatique (km, carburant) | Non | Automatique |
| **Tarification** | Jour | Heure/Jour | Nuit | Jour |

---

## 3. Flow recommandé pour Maloc

> Maloc combine le meilleur de Getaround (ouverture digitale, check-in guidé), Turo (expérience P2P, communauté), Virtuo (premium, sans friction) et Airbnb (messagerie riche, paiement flexible).

### 3.1 Principes directeurs

1. **100% digital** — Aucune remise de clés physique (boîtier connecté type Getaround Connect)
2. **Premium first** — Chaque écran respire le haut de gamme (photos pro, typo soignée, animations)
3. **Confiance** — Vérification poussée des locataires (permis + ID + selfie + scoring)
4. **Protection du véhicule** — État des lieux photographique obligatoire et exhaustif
5. **Flexibilité de paiement** — Paiement en plusieurs fois pour les locations longues ou véhicules chers

### 3.2 Flow complet — Côté locataire

```
┌─────────────────────────────────────────────────────┐
│  PHASE 1 : DÉCOUVERTE                                │
├─────────────────────────────────────────────────────┤
│                                                       │
│  1.1 Landing / Home                                   │
│      → Barre de recherche : Ville + Dates + Heures   │
│      → Véhicules à la une (curatés)                  │
│      → Catégories (SUV, Berline, Sport, Électrique)  │
│                                                       │
│  1.2 Résultats de recherche                           │
│      → Carte interactive + Liste                      │
│      → Filtres : marque, catégorie, prix, note,      │
│        transmission, carburant, options               │
│      → Tri : pertinence, prix, distance, note        │
│                                                       │
│  1.3 Fiche véhicule                                   │
│      → Galerie photos pro (10+ photos)               │
│      → Infos : modèle, année, km, transmission,     │
│        carburant, places, options                     │
│      → Profil propriétaire (photo, note, réponse,   │
│        ancienneté, nb de locations)                   │
│      → Avis des locataires précédents                │
│      → Localisation approximative (carte)            │
│      → Calendrier de disponibilité                   │
│      → Politique d'annulation                        │
│      → CTA : "Réserver" (prix affiché clairement)   │
│                                                       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  PHASE 2 : RÉSERVATION                               │
├─────────────────────────────────────────────────────┤
│                                                       │
│  2.1 Confirmation des dates & lieu                    │
│      → Dates/heures modifiables                      │
│      → Lieu de prise en charge (position du véhicule │
│        ou livraison à une adresse — premium)         │
│                                                       │
│  2.2 Plan de protection                               │
│      → 3 niveaux : Essentiel, Confort, Sérénité     │
│      → Comparatif clair (franchise, couverture,      │
│        assistance, véhicule de remplacement)          │
│      → Recommandation "Le plus choisi"               │
│                                                       │
│  2.3 Options & extras                                 │
│      → Conducteur additionnel                        │
│      → Kilométrage illimité                          │
│      → Livraison / restitution à domicile            │
│      → Siège enfant                                  │
│      → Plein de carburant prépayé                    │
│                                                       │
│  2.4 Vérification du profil (si 1ère réservation)    │
│      → Scan du permis de conduire (OCR)              │
│      → Scan de la pièce d'identité                   │
│      → Selfie vidéo (liveness check)                 │
│      → Validation en temps réel ou sous 24h          │
│                                                       │
│  2.5 Message au propriétaire (optionnel)             │
│      → Texte libre pour se présenter / poser une     │
│        question                                       │
│                                                       │
│  2.6 Paiement                                         │
│      → Récapitulatif complet et détaillé :           │
│        - Prix location (X€/jour × N jours)           │
│        - Plan de protection                          │
│        - Options                                      │
│        - Frais de service Maloc                      │
│        - Total                                        │
│      → Moyens de paiement : carte, Apple Pay,        │
│        Google Pay                                     │
│      → Paiement en 2-3 fois (pour >300€)            │
│      → Code promo                                    │
│      → Pré-autorisation de caution (affichée         │
│        clairement, non débitée)                       │
│      → CGV + politique annulation → checkbox         │
│      → CTA : "Confirmer et payer"                    │
│                                                       │
│  2.7 Confirmation                                     │
│      → Animation de succès                           │
│      → Résumé complet de la réservation              │
│      → Étapes suivantes claires                      │
│      → Accès au chat avec le propriétaire            │
│      → "Ajouter au calendrier"                       │
│      → Email + push de confirmation                  │
│                                                       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  PHASE 3 : PRÉ-TRAJET                               │
├─────────────────────────────────────────────────────┤
│                                                       │
│  3.1 Rappel J-1                                       │
│      → Push + email avec résumé                      │
│      → Instructions de prise en charge               │
│      → Localisation exacte du véhicule               │
│                                                       │
│  3.2 Rappel H-1                                       │
│      → Push : "Votre véhicule vous attend"           │
│      → Bouton "Naviguer vers le véhicule"            │
│                                                       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  PHASE 4 : CHECK-IN (État des lieux départ)          │
├─────────────────────────────────────────────────────┤
│                                                       │
│  4.1 Écran de check-in                                │
│      → Timer : disponible 15 min avant l'heure       │
│      → Étape 1 : Photos extérieures guidées          │
│        (avant, arrière, gauche, droite — overlays)   │
│      → Étape 2 : Photos intérieures                  │
│        (tableau de bord, sièges, coffre)             │
│      → Étape 3 : Photo odomètre                     │
│      → Étape 4 : Photo niveau carburant/batterie    │
│      → Étape 5 : Signalement de dommages existants  │
│        (tap sur la zone + photo + commentaire)       │
│      → Étape 6 : Confirmation & signature digitale   │
│                                                       │
│  4.2 Déverrouillage                                   │
│      → Bouton "Déverrouiller le véhicule"            │
│      → Animation de déverrouillage                   │
│      → Les clés sont dans la boîte à gants           │
│      → Instructions de démarrage si nécessaire       │
│                                                       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  PHASE 5 : PENDANT LE TRAJET                         │
├─────────────────────────────────────────────────────┤
│                                                       │
│  5.1 Dashboard trajet                                 │
│      → Durée restante                                │
│      → Kilométrage consommé / inclus                 │
│      → Bouton "Prolonger la location"                │
│      → Bouton "Assistance 24/7"                      │
│      → Chat avec le propriétaire                     │
│      → Signaler un problème                          │
│                                                       │
│  5.2 Extension de location                            │
│      → Vérification de disponibilité                 │
│      → Nouvelle durée + supplément affiché           │
│      → Paiement immédiat du delta                    │
│                                                       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  PHASE 6 : CHECK-OUT (État des lieux retour)         │
├─────────────────────────────────────────────────────┤
│                                                       │
│  6.1 Retour du véhicule                               │
│      → Rappel de l'emplacement de restitution        │
│      → Navigation vers le point de retour            │
│                                                       │
│  6.2 Écran de check-out                               │
│      → Mêmes photos guidées que le check-in          │
│      → Comparaison côte-à-côte check-in/check-out   │
│      → Photo odomètre + carburant                    │
│      → Signalement de nouveaux dommages              │
│      → Propreté du véhicule (note)                   │
│                                                       │
│  6.3 Verrouillage & fin                               │
│      → Laisser les clés dans la boîte à gants        │
│      → Bouton "Verrouiller et terminer"              │
│      → Animation de fin de trajet                    │
│                                                       │
│  6.4 Récapitulatif final                              │
│      → Durée effective                               │
│      → Kilométrage parcouru                          │
│      → Ajustements éventuels (km, carburant)         │
│      → Montant total final                           │
│      → Reçu envoyé par email                         │
│                                                       │
│  6.5 Évaluation                                       │
│      → Note (1-5 étoiles)                            │
│      → Sous-critères : propreté, conformité,         │
│        communication du propriétaire                  │
│      → Commentaire libre                             │
│      → Photo optionnelle                             │
│                                                       │
└─────────────────────────────────────────────────────┘
```

### 3.3 Flow complet — Côté propriétaire

```
┌─────────────────────────────────────────────────────┐
│  ONBOARDING PROPRIÉTAIRE                             │
├─────────────────────────────────────────────────────┤
│                                                       │
│  O.1 Inscription                                      │
│      → Identité, coordonnées, IBAN                   │
│      → Vérification d'identité                       │
│                                                       │
│  O.2 Ajout d'un véhicule                              │
│      → Carte grise (scan OCR → pré-remplissage)     │
│      → Photos guidées (12 positions minimum)         │
│      → Description, options, règles                  │
│      → Définition du prix (aide au pricing)          │
│      → Zones de prise en charge                      │
│      → Installation du boîtier connecté              │
│        (envoi gratuit ou RDV technicien)              │
│                                                       │
│  O.3 Paramétrage                                      │
│      → Réservation instantanée (on/off)              │
│      → Critères d'acceptation auto (note min,        │
│        ancienneté, nb de locations)                   │
│      → Délai de préavis minimum                      │
│      → Durée min/max de location                     │
│      → Politique d'annulation                        │
│                                                       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  GESTION DES RÉSERVATIONS                            │
├─────────────────────────────────────────────────────┤
│                                                       │
│  G.1 Nouvelle demande (si pas instantanée)            │
│      → Push : "Nouvelle demande de [Prénom]"         │
│      → Profil locataire : photo, note, vérifications,│
│        nombre de locations, ancienneté               │
│      → Dates et revenus estimés                      │
│      → Actions : Accepter / Refuser / Modifier       │
│      → Timer : 8h pour répondre (paramétrable)       │
│                                                       │
│  G.2 Réservation confirmée                            │
│      → Récapitulatif dans le calendrier              │
│      → Chat ouvert avec le locataire                 │
│      → Rappels automatiques de préparation           │
│                                                       │
│  G.3 Suivi du trajet                                  │
│      → Statut en temps réel (check-in fait,          │
│        en cours, check-out)                           │
│      → Localisation du véhicule (optionnel)          │
│      → Notification au check-in et check-out         │
│                                                       │
│  G.4 Post-trajet                                      │
│      → Photos de l'état des lieux (comparaison)      │
│      → Validation ou signalement de dommage          │
│      → Fenêtre de 24h pour litige                    │
│      → Revenus crédités sous 48h                     │
│      → Évaluation du locataire                       │
│                                                       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  TABLEAU DE BORD PROPRIÉTAIRE                        │
├─────────────────────────────────────────────────────┤
│                                                       │
│  D.1 Dashboard                                        │
│      → Revenus du mois / total                       │
│      → Prochaines réservations                       │
│      → Taux d'occupation                             │
│      → Note moyenne                                  │
│                                                       │
│  D.2 Calendrier                                       │
│      → Vue mois/semaine                              │
│      → Blocage de créneaux                           │
│      → Tarification par période                      │
│                                                       │
│  D.3 Mes véhicules                                    │
│      → Liste des véhicules                           │
│      → Stats par véhicule                            │
│      → Modifier l'annonce                            │
│                                                       │
│  D.4 Mes revenus                                      │
│      → Historique des versements                     │
│      → Détail par location                           │
│      → Export comptable                              │
│                                                       │
└─────────────────────────────────────────────────────┘
```

### 3.4 Messagerie Maloc

| Événement | Message système | Destinataire |
|---|---|---|
| Demande envoyée | "Votre demande a été envoyée à [Prénom]" | Locataire |
| Nouvelle demande | "[Prénom] souhaite louer votre [Véhicule]" | Propriétaire |
| Réservation confirmée | "Réservation confirmée ! Voici les détails…" | Les deux |
| Rappel J-1 | "Votre location commence demain à [heure]" | Les deux |
| Rappel H-1 | "Votre véhicule vous attend dans 1h" | Locataire |
| Check-in effectué | "Le locataire a pris en charge le véhicule" | Propriétaire |
| Mi-parcours (>3j) | "Tout se passe bien ? Besoin d'aide ?" | Locataire |
| Rappel retour H-2 | "N'oubliez pas de restituer le véhicule à [heure]" | Locataire |
| Check-out effectué | "Le véhicule a été restitué" | Propriétaire |
| Ajustements | "Votre facture finale : [détails]" | Locataire |
| Demande d'évaluation | "Comment s'est passée votre expérience ?" | Les deux |
| Paiement versé | "Vos revenus de [X€] ont été versés" | Propriétaire |

**Fonctionnalités messagerie** :
- Chat temps réel (texte + photos)
- Numéros de téléphone masqués (appel via l'app)
- Traduction automatique (si internationalisation)
- Messages système non supprimables (audit trail)
- Indicateur "lu" / "en ligne"
- Réponses rapides (templates)
- Envoi de localisation

---

## 4. Liste des écrans nécessaires

### 4.1 Écrans publics (non connecté)
1. **Landing page** — Hero + recherche + catégories + véhicules à la une
2. **Page "Comment ça marche"** — Flow en 3-4 étapes illustrées
3. **Page "Devenir propriétaire"** — Arguments + simulateur de revenus + CTA
4. **Page de résultats de recherche** — Carte + liste + filtres
5. **Fiche véhicule** — Détail complet (voir flow 1.3)
6. **Pages légales** — CGV, CGU, politique de confidentialité, politique d'annulation

### 4.2 Tunnel d'inscription / connexion
7. **Modal inscription** — Email / Google / Apple
8. **Modal connexion** — Email + mot de passe / Magic link / Social
9. **Vérification email** — Code OTP
10. **Complétion du profil** — Prénom, nom, photo, téléphone
11. **Vérification d'identité** — Scan permis + ID + selfie (multi-étapes)

### 4.3 Tunnel de réservation (locataire)
12. **Étape 1 : Dates & lieu** — Confirmation/modification
13. **Étape 2 : Plan de protection** — Choix parmi 3 plans
14. **Étape 3 : Options & extras** — Sélection des options
15. **Étape 4 : Message au propriétaire** — Texte libre (optionnel)
16. **Étape 5 : Paiement** — Récapitulatif + formulaire de paiement
17. **Page de confirmation** — Succès + résumé + prochaines étapes

### 4.4 Check-in / Check-out
18. **Écran pré-check-in** — Instructions + countdown
19. **Check-in : Photos extérieures** — Guide photo avec overlay (×4)
20. **Check-in : Photos intérieures** — Guide photo (×3)
21. **Check-in : Compteurs** — Photo odomètre + carburant
22. **Check-in : Signalement dommages** — Vue schéma véhicule + annotation
23. **Check-in : Récapitulatif & signature** — Résumé + confirmation
24. **Déverrouillage du véhicule** — Bouton + animation
25. **Dashboard trajet en cours** — Timer, km, actions
26. **Extension de location** — Modal avec dispo + prix
27. **Check-out : Photos** — Même flow que check-in
28. **Check-out : Comparaison** — Côte-à-côte avant/après
29. **Check-out : Verrouillage** — Bouton + animation
30. **Récapitulatif de fin** — Facture finale + détails
31. **Évaluation** — Note + sous-critères + commentaire

### 4.5 Messagerie
32. **Liste des conversations** — Inbox avec préview
33. **Conversation** — Chat temps réel + messages système
34. **Modal appel** — Appel masqué via la plateforme

### 4.6 Espace locataire
35. **Dashboard locataire** — Prochaine résa + historique
36. **Mes réservations** — Liste avec statuts
37. **Détail d'une réservation** — Toutes les infos + actions
38. **Mon profil** — Infos personnelles + vérifications
39. **Mes moyens de paiement** — Gestion des cartes
40. **Mes évaluations** — Historique des avis reçus/donnés
41. **Mes favoris** — Véhicules sauvegardés
42. **Notifications** — Centre de notifications

### 4.7 Espace propriétaire
43. **Dashboard propriétaire** — Revenus, réservations, taux d'occupation
44. **Calendrier** — Vue mois/semaine avec réservations
45. **Mes véhicules** — Liste avec stats
46. **Ajouter un véhicule** — Tunnel multi-étapes (carte grise, photos, prix, dispo)
47. **Modifier un véhicule** — Édition de l'annonce
48. **Demande de réservation** — Détail + profil locataire + actions
49. **Mes revenus** — Historique + détail + export
50. **Paramètres propriétaire** — Résa instantanée, critères, IBAN

### 4.8 Support & litiges
51. **Centre d'aide** — FAQ + catégories
52. **Signaler un problème** — Formulaire + photos
53. **Suivi de litige** — Timeline + échanges
54. **Assistance 24/7** — Chat support

### 4.9 Modals & overlays
55. **Modal filtre de recherche** — Filtres avancés
56. **Modal partage** — Partager un véhicule
57. **Modal annulation** — Politique + confirmation
58. **Modal code promo** — Saisie + validation
59. **Modal signalement** — Signaler un comportement
60. **Bottomsheet sélection dates** — Calendrier
61. **Bottomsheet sélection heures** — Picker d'heures

---

## 5. Wireframes textuels

### 5.1 Landing Page

```
╔══════════════════════════════════════════════════════════╗
║  [Logo MALOC]              Rechercher   Se connecter    ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║          Louez des véhicules d'exception                 ║
║          près de chez vous                               ║
║                                                          ║
║  ┌────────────────────────────────────────────────────┐  ║
║  │ 📍 Ville     📅 Début      📅 Fin      🔍 Chercher│  ║
║  └────────────────────────────────────────────────────┘  ║
║                                                          ║
║  ── Catégories ──────────────────────────────────────    ║
║  [ 🏎 Sport ]  [ 🚙 SUV ]  [ 🚗 Berline ]  [ ⚡ Élec ] ║
║                                                          ║
║  ── Véhicules à la une ─────────────────────────────    ║
║  ┌──────────┐  ┌──────────┐  ┌──────────┐              ║
║  │  [Photo]  │  │  [Photo]  │  │  [Photo]  │              ║
║  │ BMW M4    │  │ Porsche   │  │ Mercedes  │              ║
║  │ ★4.9 (23) │  │ ★5.0 (12) │  │ ★4.8 (45) │              ║
║  │ 89€/jour  │  │ 150€/jour │  │ 75€/jour  │              ║
║  └──────────┘  └──────────┘  └──────────┘              ║
║                                                          ║
║  ── Comment ça marche ──────────────────────────────    ║
║  ①Trouvez    ②Réservez    ③Déverrouillez  ④Roulez     ║
║                                                          ║
║  ── Devenez propriétaire ───────────────────────────    ║
║  │ Rentabilisez votre véhicule     [Estimer mes revenus]│ ║
║                                                          ║
║  ── Footer ─────────────────────────────────────────    ║
╚══════════════════════════════════════════════════════════╝
```

### 5.2 Résultats de recherche

```
╔══════════════════════════════════════════════════════════╗
║  [Logo]  [Barre de recherche pré-remplie]    [Profil]   ║
╠══════════════════════════════════════════════════════════╣
║  ┌─ Filtres ─────────────────────────────────────────┐  ║
║  │ Catégorie ▾ │ Prix ▾ │ Marque ▾ │ + Filtres       │  ║
║  └───────────────────────────────────────────────────┘  ║
║                                                          ║
║  12 véhicules disponibles          Trier: Pertinence ▾  ║
║                                                          ║
║  ┌──────────────────────┐  ┌─────────────────────────┐  ║
║  │                       │  │                          │  ║
║  │   LISTE DES           │  │      CARTE               │  ║
║  │   VÉHICULES           │  │      INTERACTIVE          │  ║
║  │                       │  │                          │  ║
║  │  ┌─────────────────┐ │  │    📍89€  📍150€         │  ║
║  │  │ [Photo]         │ │  │         📍75€             │  ║
║  │  │ BMW M4 Compet.  │ │  │                          │  ║
║  │  │ ★4.9 (23) Auto  │ │  │    📍120€                │  ║
║  │  │ 89€/jour  ♡     │ │  │                          │  ║
║  │  └─────────────────┘ │  │                          │  ║
║  │  ┌─────────────────┐ │  │                          │  ║
║  │  │ [Photo]         │ │  │                          │  ║
║  │  │ Porsche 911     │ │  │                          │  ║
║  │  │ ★5.0 (12) Manu  │ │  │                          │  ║
║  │  │ 150€/jour ♡     │ │  │                          │  ║
║  │  └─────────────────┘ │  │                          │  ║
║  └──────────────────────┘  └─────────────────────────┘  ║
╚══════════════════════════════════════════════════════════╝
```

### 5.3 Fiche véhicule

```
╔══════════════════════════════════════════════════════════╗
║  ← Retour                                    ♡  ↗️     ║
╠══════════════════════════════════════════════════════════╣
║  ┌──────────────────────────────────────────────────┐   ║
║  │                                                    │   ║
║  │              GALERIE PHOTOS (swipe)                │   ║
║  │                   1/12                             │   ║
║  │                                                    │   ║
║  └──────────────────────────────────────────────────┘   ║
║                                                          ║
║  BMW M4 Competition 2024                                 ║
║  ★ 4.9 (23 locations) · Sport · Automatique             ║
║                                                          ║
║  ┌──────────┐                                           ║
║  │ [Photo]  │  Jean-Pierre · Superhost                  ║
║  │          │  ★ 4.9 · Répond en <1h · 45 locations     ║
║  └──────────┘  Membre depuis 2024                       ║
║                                                          ║
║  ── Caractéristiques ───────────────────────────────    ║
║  🚗 4 places  ⚙️ Auto  ⛽ Essence  📏 200 km/jour incl.║
║  GPS · Bluetooth · Sièges chauffants · Caméra recul     ║
║                                                          ║
║  ── Description ────────────────────────────────────    ║
║  "Magnifique BMW M4 en parfait état..."                  ║
║  [Voir plus]                                             ║
║                                                          ║
║  ── Localisation ───────────────────────────────────    ║
║  [Carte avec zone approximative]                        ║
║  Paris 16e · Adresse exacte après réservation           ║
║                                                          ║
║  ── Avis ───────────────────────────────────────────    ║
║  ★★★★★ Marie · il y a 3 jours                          ║
║  "Véhicule impeccable, propriétaire au top !"           ║
║  [Voir les 23 avis]                                     ║
║                                                          ║
║  ── Politique d'annulation ─────────────────────────    ║
║  Flexible : annulation gratuite jusqu'à 24h avant       ║
║                                                          ║
║  ┌──────────────────────────────────────────────────┐   ║
║  │   89€/jour              [  Réserver  ]            │   ║
║  │   12-15 fév · 3 jours = 267€ + frais             │   ║
║  └──────────────────────────────────────────────────┘   ║
╚══════════════════════════════════════════════════════════╝
```

### 5.4 Tunnel de réservation — Plan de protection

```
╔══════════════════════════════════════════════════════════╗
║  ← Retour        Étape 2/5 : Protection       [X]      ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  Choisissez votre niveau de protection                   ║
║                                                          ║
║  ┌─────────────────────────────────────────────────┐    ║
║  │  ESSENTIEL                           9€/jour     │    ║
║  │  Franchise : 2 000€                              │    ║
║  │  ✓ Responsabilité civile                         │    ║
║  │  ✓ Assistance routière                           │    ║
║  │  ✗ Vol & vandalisme                              │    ║
║  │  ✗ Véhicule de remplacement                      │    ║
║  │                                [Sélectionner]    │    ║
║  └─────────────────────────────────────────────────┘    ║
║                                                          ║
║  ┌─────────────────────────────────────────────────┐    ║
║  │  ⭐ CONFORT — Le plus choisi         15€/jour    │    ║
║  │  Franchise : 800€                                │    ║
║  │  ✓ Responsabilité civile                         │    ║
║  │  ✓ Assistance routière                           │    ║
║  │  ✓ Vol & vandalisme                              │    ║
║  │  ✗ Véhicule de remplacement                      │    ║
║  │                                [Sélectionner]    │    ║
║  └─────────────────────────────────────────────────┘    ║
║                                                          ║
║  ┌─────────────────────────────────────────────────┐    ║
║  │  SÉRÉNITÉ                           25€/jour     │    ║
║  │  Franchise : 0€                                  │    ║
║  │  ✓ Responsabilité civile                         │    ║
║  │  ✓ Assistance routière                           │    ║
║  │  ✓ Vol & vandalisme                              │    ║
║  │  ✓ Véhicule de remplacement                      │    ║
║  │                                [Sélectionner]    │    ║
║  └─────────────────────────────────────────────────┘    ║
║                                                          ║
║  ┌──────────────────────────────────────────────────┐   ║
║  │                  [ Continuer → ]                   │   ║
║  └──────────────────────────────────────────────────┘   ║
╚══════════════════════════════════════════════════════════╝
```

### 5.5 Tunnel de réservation — Paiement

```
╔══════════════════════════════════════════════════════════╗
║  ← Retour        Étape 5/5 : Paiement         [X]      ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  ── Récapitulatif ──────────────────────────────────    ║
║  BMW M4 Competition · 12-15 fév (3 jours)               ║
║                                                          ║
║  Location (89€ × 3 jours)                    267,00€    ║
║  Protection Confort (15€ × 3 jours)           45,00€    ║
║  Kilométrage illimité                         30,00€    ║
║  Frais de service                             34,20€    ║
║  ─────────────────────────────────────────────────      ║
║  TOTAL                                       376,20€    ║
║                                                          ║
║  ℹ️ Caution de 800€ (pré-autorisation, non débitée)     ║
║                                                          ║
║  ── Code promo ─────────────────────────────────────    ║
║  [____________] [Appliquer]                             ║
║                                                          ║
║  ── Paiement ───────────────────────────────────────    ║
║                                                          ║
║  ○ Payer en 1 fois : 376,20€                            ║
║  ○ Payer en 3 fois : 3 × 125,40€ (sans frais)          ║
║                                                          ║
║  ┌──────────────────────────────────────────────────┐   ║
║  │  💳 Numéro de carte                               │   ║
║  │  [____  ____  ____  ____]                         │   ║
║  │  Expiration [__/__]   CVV [___]                   │   ║
║  └──────────────────────────────────────────────────┘   ║
║                                                          ║
║  Ou payer avec :  [Apple Pay]  [Google Pay]             ║
║                                                          ║
║  ☐ J'accepte les CGV et la politique d'annulation       ║
║                                                          ║
║  ┌──────────────────────────────────────────────────┐   ║
║  │        [ Confirmer et payer 376,20€ ]              │   ║
║  └──────────────────────────────────────────────────┘   ║
║                                                          ║
║  🔒 Paiement sécurisé par Stripe                        ║
╚══════════════════════════════════════════════════════════╝
```

### 5.6 Check-in — Photos guidées

```
╔══════════════════════════════════════════════════════════╗
║  État des lieux de départ           Étape 1/6           ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  Photographiez l'AVANT du véhicule                      ║
║                                                          ║
║  ┌──────────────────────────────────────────────────┐   ║
║  │                                                    │   ║
║  │           ┌─────────────────┐                     │   ║
║  │           │    ___________   │                     │   ║
║  │           │   /           \  │ ← Overlay guide    │   ║
║  │           │  |   AVANT     | │                     │   ║
║  │           │  |  du véhicule| │                     │   ║
║  │           │   \___________/  │                     │   ║
║  │           └─────────────────┘                     │   ║
║  │                                                    │   ║
║  │              VUE CAMÉRA                            │   ║
║  │                                                    │   ║
║  └──────────────────────────────────────────────────┘   ║
║                                                          ║
║  💡 Assurez-vous que le véhicule est bien éclairé       ║
║     et cadré entièrement                                ║
║                                                          ║
║  Progression : ■ □ □ □                                   ║
║  (Avant · Arrière · Gauche · Droite)                    ║
║                                                          ║
║              [ 📸 Prendre la photo ]                    ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

### 5.7 Check-in — Signalement de dommages

```
╔══════════════════════════════════════════════════════════╗
║  État des lieux de départ           Étape 5/6           ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  Dommages existants à signaler ?                        ║
║                                                          ║
║  ┌──────────────────────────────────────────────────┐   ║
║  │           ┌─────────┐                             │   ║
║  │     ┌─────┤         ├─────┐                       │   ║
║  │     │     │  AVANT  │     │                       │   ║
║  │     │ G   │         │  D  │  ← Vue schématique    │   ║
║  │     │ A   │         │  R  │     du véhicule       │   ║
║  │     │ U   │         │  O  │                       │   ║
║  │     │ C   │         │  I  │  Tapez sur une zone   │   ║
║  │     │ H   │         │  T  │  pour signaler un     │   ║
║  │     │ E   │         │  E  │  dommage              │   ║
║  │     └─────┤         ├─────┘                       │   ║
║  │           │ ARRIÈRE │                             │   ║
║  │           └─────────┘                             │   ║
║  └──────────────────────────────────────────────────┘   ║
║                                                          ║
║  Dommages signalés : (0)                                ║
║                                                          ║
║  [ + Ajouter un dommage ]                               ║
║                                                          ║
║  ──────────────────────────────                         ║
║  ○ Aucun dommage constaté                               ║
║                                                          ║
║              [ Continuer → ]                            ║
╚══════════════════════════════════════════════════════════╝
```

### 5.8 Dashboard trajet en cours

```
╔══════════════════════════════════════════════════════════╗
║  Votre location en cours                                 ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  BMW M4 Competition                                      ║
║  ┌──────────────────────────────────────────────────┐   ║
║  │  [Photo du véhicule]                              │   ║
║  └──────────────────────────────────────────────────┘   ║
║                                                          ║
║  ┌────────────┐  ┌────────────┐  ┌────────────┐        ║
║  │  ⏱ Durée   │  │  📏 Km     │  │  ⛽ Retour  │        ║
║  │  restante  │  │  parcourus │  │  prévu     │        ║
║  │  1j 14h    │  │  123 / 600 │  │  15 fév    │        ║
║  │            │  │  km        │  │  14:00     │        ║
║  └────────────┘  └────────────┘  └────────────┘        ║
║                                                          ║
║  ┌──────────────────────────────────────────────────┐   ║
║  │  📍 Lieu de restitution                           │   ║
║  │  12 Rue de la Pompe, Paris 16e     [Naviguer]    │   ║
║  └──────────────────────────────────────────────────┘   ║
║                                                          ║
║  ┌──────────────────┐  ┌───────────────────────┐       ║
║  │ 💬 Chat proprio   │  │ 🔄 Prolonger           │       ║
║  └──────────────────┘  └───────────────────────┘       ║
║                                                          ║
║  ┌──────────────────┐  ┌───────────────────────┐       ║
║  │ 🆘 Assistance     │  │ ⚠️ Signaler problème   │       ║
║  └──────────────────┘  └───────────────────────┘       ║
║                                                          ║
║  ┌──────────────────────────────────────────────────┐   ║
║  │         [ Terminer la location ]                   │   ║
║  └──────────────────────────────────────────────────┘   ║
╚══════════════════════════════════════════════════════════╝
```

### 5.9 Dashboard propriétaire

```
╔══════════════════════════════════════════════════════════╗
║  [Logo]     Dashboard            [Notif 🔔3]  [Profil] ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  Bonjour Jean-Pierre 👋                                 ║
║                                                          ║
║  ┌────────────┐  ┌────────────┐  ┌────────────┐        ║
║  │ 💰 Revenus  │  │ 📊 Taux    │  │ ⭐ Note    │        ║
║  │  ce mois   │  │ occupation │  │ moyenne    │        ║
║  │  1 247€    │  │    72%     │  │   4.9      │        ║
║  └────────────┘  └────────────┘  └────────────┘        ║
║                                                          ║
║  ── Prochaines réservations ────────────────────────    ║
║                                                          ║
║  ┌──────────────────────────────────────────────────┐   ║
║  │  🟢 EN COURS · Marie D.                           │   ║
║  │  BMW M4 · 12-15 fév · Check-in effectué           │   ║
║  │                            [Voir] [Chat]          │   ║
║  ├──────────────────────────────────────────────────┤   ║
║  │  🟡 À VENIR · Thomas L.                           │   ║
║  │  BMW M4 · 18-20 fév · Confirmée                   │   ║
║  │                            [Voir] [Chat]          │   ║
║  └──────────────────────────────────────────────────┘   ║
║                                                          ║
║  ── Mes véhicules ──────────────────────────────────    ║
║  ┌──────────────────────────────────────────────────┐   ║
║  │  [Photo] BMW M4 Competition                       │   ║
║  │  ★4.9 · 23 locations · 1 247€ ce mois             │   ║
║  │  Statut: 🟢 En location                           │   ║
║  ├──────────────────────────────────────────────────┤   ║
║  │  [ + Ajouter un véhicule ]                        │   ║
║  └──────────────────────────────────────────────────┘   ║
║                                                          ║
║  ── Navigation ─────────────────────────────────────    ║
║  [Dashboard] [Calendrier] [Messages] [Revenus] [+]     ║
╚══════════════════════════════════════════════════════════╝
```

---

## 6. Composants UI nécessaires

### 6.1 Navigation & Layout
| Composant | Description |
|---|---|
| `TopBar` | Barre de navigation avec logo, recherche, notifications, profil |
| `BottomTabBar` | Navigation mobile (Accueil, Rechercher, Réservations, Messages, Profil) |
| `SideNav` | Navigation desktop pour espace propriétaire |
| `Stepper` | Indicateur de progression dans les tunnels (étapes numérotées) |
| `PageHeader` | En-tête de page avec titre, retour, actions |
| `Modal` | Overlay centré (confirmation, formulaires courts) |
| `BottomSheet` | Panneau glissant depuis le bas (mobile) |
| `Drawer` | Panneau latéral (filtres desktop) |

### 6.2 Recherche & Filtres
| Composant | Description |
|---|---|
| `SearchBar` | Barre de recherche avec autocomplete lieu + sélecteurs dates/heures |
| `DateRangePicker` | Calendrier de sélection de plage de dates |
| `TimePicker` | Sélecteur d'heure (créneaux de 30 min) |
| `FilterChip` | Chip de filtre actif (supprimable) |
| `FilterPanel` | Panneau de filtres avancés (catégorie, prix, marque, etc.) |
| `PriceRangeSlider` | Double slider pour fourchette de prix |
| `MapView` | Carte interactive (Mapbox/Google Maps) avec markers |
| `MapMarker` | Marker de prix sur la carte |

### 6.3 Cards & Listes
| Composant | Description |
|---|---|
| `VehicleCard` | Card de véhicule (photo, nom, note, prix, favoris) |
| `VehicleCardCompact` | Version compacte pour les listes |
| `BookingCard` | Card de réservation (statut, véhicule, dates, actions) |
| `ReviewCard` | Card d'avis (note, auteur, date, commentaire) |
| `UserProfileCard` | Mini profil (photo, nom, note, badges) |
| `ConversationCard` | Preview de conversation (avatar, dernier message, timestamp) |
| `RevenueCard` | Card de revenu (montant, période, détail) |
| `StatCard` | Card de statistique (icône, valeur, label) |

### 6.4 Formulaires & Inputs
| Composant | Description |
|---|---|
| `TextInput` | Champ texte standard |
| `TextArea` | Champ texte multiligne |
| `Select` | Liste déroulante |
| `Checkbox` | Case à cocher |
| `RadioGroup` | Groupe de boutons radio |
| `Toggle` | Interrupteur on/off |
| `FileUpload` | Upload de fichier/photo |
| `CreditCardInput` | Champ carte bancaire (Stripe Elements) |
| `OTPInput` | Champ de code de vérification (6 digits) |
| `PhoneInput` | Champ téléphone avec indicatif pays |
| `AddressAutocomplete` | Champ adresse avec autocomplétion |
| `PromoCodeInput` | Champ code promo avec validation |

### 6.5 Check-in / Check-out
| Composant | Description |
|---|---|
| `CameraOverlay` | Vue caméra avec guide de cadrage (overlay semi-transparent) |
| `PhotoGrid` | Grille de photos prises (avec possibilité de reprendre) |
| `VehicleSchematic` | Vue schématique du véhicule (pour signalement de dommages) |
| `DamageAnnotation` | Pin de dommage sur le schéma (+ photo + commentaire) |
| `PhotoComparison` | Comparaison côte-à-côte (check-in vs check-out) |
| `DigitalSignature` | Zone de signature tactile |
| `UnlockButton` | Bouton de déverrouillage avec animation (état: prêt → chargement → déverrouillé) |
| `LockButton` | Bouton de verrouillage avec animation |
| `ChecklistItem` | Élément de checklist coché/non coché |

### 6.6 Messagerie
| Composant | Description |
|---|---|
| `ChatBubble` | Bulle de message (envoyé / reçu) |
| `SystemMessage` | Message système centré (événement automatique) |
| `ChatInput` | Zone de saisie avec boutons (photo, localisation, emoji) |
| `QuickReply` | Boutons de réponse rapide (templates) |
| `MessageTimestamp` | Séparateur temporel dans le chat |
| `TypingIndicator` | Indicateur "en train d'écrire…" |
| `ReadReceipt` | Indicateur de lecture (✓✓) |

### 6.7 Paiement & Prix
| Composant | Description |
|---|---|
| `PriceSummary` | Récapitulatif détaillé du prix (lignes + total) |
| `PriceTag` | Étiquette de prix (ex: "89€/jour") |
| `PaymentMethodSelector` | Sélecteur de moyen de paiement (carte, Apple Pay, etc.) |
| `InstallmentSelector` | Sélecteur paiement en 1x/2x/3x |
| `DepositNotice` | Bannière d'information sur la caution |
| `ReceiptView` | Reçu détaillé (imprimable/PDF) |
| `SavedCardItem` | Carte bancaire enregistrée (derniers chiffres + actions) |

### 6.8 Protection & Assurance
| Composant | Description |
|---|---|
| `ProtectionPlanCard` | Card de plan de protection (nom, prix, couverture, CTA) |
| `ProtectionComparison` | Tableau comparatif des plans |
| `CoverageItem` | Ligne de couverture (✓/✗ + description) |
| `BadgeRecommended` | Badge "Le plus choisi" |

### 6.9 Évaluation
| Composant | Description |
|---|---|
| `StarRating` | Sélecteur d'étoiles (1-5) |
| `SubCriteriaRating` | Rating par sous-critère (propreté, conformité, communication) |
| `ReviewForm` | Formulaire complet d'évaluation |
| `AverageRating` | Affichage de la note moyenne (★ 4.9) |

### 6.10 Calendrier & Disponibilité
| Composant | Description |
|---|---|
| `CalendarMonth` | Vue calendrier mensuelle avec réservations colorées |
| `CalendarWeek` | Vue calendrier hebdomadaire |
| `AvailabilityToggle` | Basculer disponible/indisponible sur un créneau |
| `PricingOverride` | Modifier le prix pour une période spécifique |
| `BookingTimeline` | Timeline d'une réservation (créée → confirmée → check-in → check-out) |

### 6.11 Feedbacks & États
| Composant | Description |
|---|---|
| `Toast` | Notification éphémère (succès, erreur, info) |
| `SuccessAnimation` | Animation de confirmation (confettis / check) |
| `EmptyState` | État vide (illustration + message + CTA) |
| `LoadingSkeleton` | Placeholder de chargement |
| `ErrorState` | État d'erreur avec retry |
| `Badge` | Badge de statut (En cours, Confirmée, Terminée, Annulée) |
| `ProgressBar` | Barre de progression (upload photos, vérification identité) |
| `Countdown` | Compte à rebours (timer d'acceptation de demande) |
| `Tooltip` | Info-bulle contextuelle |

### 6.12 Identité & Vérification
| Composant | Description |
|---|---|
| `IDScannerView` | Vue caméra pour scan de document (overlay cadrage) |
| `SelfieCaptureView` | Vue caméra selfie avec guidage visage |
| `VerificationStatus` | Indicateur d'état de vérification (en cours, vérifié, échoué) |
| `VerificationBadge` | Badge "Profil vérifié" ✓ |

---

## Annexe : Priorités de développement

### MVP (V1)
- Landing + Recherche + Résultats + Fiche véhicule
- Inscription + Vérification d'identité
- Tunnel de réservation (5 étapes)
- Check-in / Check-out avec photos guidées
- Messagerie basique (texte + photos)
- Dashboard locataire & propriétaire basiques
- Paiement par carte (Stripe)

### V2
- Ouverture digitale du véhicule (boîtier connecté)
- Paiement en plusieurs fois
- Apple Pay / Google Pay
- Extension de location
- Tarification dynamique
- Évaluation avec sous-critères
- Système de Superhost

### V3
- Livraison à domicile
- Comparaison photos IA (détection de dommages)
- Assurance intégrée multi-niveaux
- Programme de fidélité
- Appels masqués via la plateforme
- Export comptable propriétaire
- Multi-véhicules par propriétaire (gestion de flotte)
