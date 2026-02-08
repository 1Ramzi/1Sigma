# 🎨 Analyse Complète des Maquettes SVG — Maloc

> **Document fusionné** par Clawd  
> **Sources** : Analyse Maloc OS (page par page) + Complément Maloc Dev (design system, composants, pages manquantes)  
> **Date** : 8 février 2026  
> **Fichiers source** : `/var/www/Maloc-project/Maquette SVG/`

---

## 📊 1. Vue d'ensemble

> *[Maloc OS]*

| Fichier | Dimensions | Type de page | Priorité MVP |
|---------|------------|--------------|--------------|
| Home Page Auto.svg | 1920×8526 | Landing principale Auto | 🔴 MVP |
| Home Page Auto-1.svg | 1920×8526 | Variante Home Auto | 🟡 |
| Home Page immo.svg | 1920×8526 | Landing Immobilier | 🟢 V3+ |
| Catalogue Voiture.svg | 1920×1683 | Liste véhicules | 🔴 MVP |
| Catalogue Voiture-1.svg | 1920×2852 | Variante catalogue étendu | 🟡 |
| Catalogue Immo.svg | 1920×1683 | Liste immobilier | 🟢 V3+ |
| Page Voitures.svg | 1920×7109 | Détail véhicule | 🔴 MVP |
| Créer votre compte V1.svg | 1920×1080 | Inscription | 🔴 MVP |
| Devenir prestataire.svg | 1920×5154 | Onboarding loueur | 🔴 MVP |
| Page prestataire abonné.svg | 1920×4328 | Profil loueur (abonné) | 🔴 MVP |
| Page prestataire Pas abonné.svg | 1920×3597 | Profil loueur (gratuit) | 🟡 |
| Paramètres compte clients infos.svg | 1920×4054 | Paramètres utilisateur | 🔴 MVP |
| Paramètres compte clients infos-1.svg | 1920×4054 | Variante paramètres | 🟡 |
| Paramètres compte clients infos-2.svg | 1920×3597 | Variante paramètres | 🟡 |
| Paramètres compte clients infos-3.svg | 1920×2180 | Variante paramètres | 🟡 |
| Blog.svg | 1920×4883 | Liste articles | 🟡 V2 |
| Page Article.svg | 1920×7485 | Détail article | 🟡 V2 |
| Boutique.svg | 1920×2672 | Shop/Merch | 🟢 V3+ |
| Page Carrière.svg | 1920×5420 | Recrutement | 🟢 V3+ |
| Page Carrière 2.svg | 1920×3101 | Variante carrière | 🟢 V3+ |
| Page Carrière 3.svg | 1920×3101 | Variante carrière | 🟢 V3+ |

> *[Maloc Dev]* **Incohérences notées** :
> - Le logo apparaît comme "Maloc" sur certaines pages et "Matoc" sur d'autres → **bug de rendu SVG** probable
> - Les pages Immobilier et Carrière sont maquettées mais classées V3+ → effort de design dépensé sur du non-prioritaire

---

## 🎨 2. Design System

### Palette de couleurs

> *[Maloc Dev]* — Extraite par analyse des SVG convertis en PNG

| Rôle | Hex | Usage |
|------|-----|-------|
| **Primary Blue** | `#007BFF` | CTAs, boutons, liens, éléments interactifs (169 occurrences) |
| **Dark Blue** | `#003FFF` | Accents, hover states, variantes (53 occurrences) |
| **Accent Blue** | `#0076FF` | Highlights, badges premium |
| **Background** | `#0A0A1A` ~ `#0D1117` | Fond sombre principal (dark theme premium) |
| **Surface** | `#1A1A2E` ~ `#16213E` | Cards, surfaces élevées |
| **Neutral Light** | `#D9D9D9` | Placeholders, borders, dividers (77 occurrences) |
| **Neutral Mid** | `#A7A7A7` | Texte secondaire |
| **White** | `#FFFFFF` | Texte principal, icônes |
| **Success** | `#00FF0D` | Validation, badges actifs |
| **Error** | `#CE3A3A` | Erreurs, alertes |

> *[Maloc OS]* — Estimations initiales :
> - **Primaire** : Bleu foncé (#0A1628 ou similaire)
> - **Accent** : Doré/Or (#D4AF37 ou similaire)
> - **Background** : Blanc + Dégradés radiaux
> - **Texte** : Blanc sur fond sombre, Noir sur fond clair

### Effets visuels

> *[Maloc Dev]*

- **Halos bleus** (gradients radiaux) en arrière-plan → ambiance luxe/premium
- **Glassmorphism** léger sur les cards (backdrop-blur, transparence)
- **Dark theme exclusif** — pas de light mode prévu dans les maquettes

### Typographie

> *[Maloc Dev]*

- **Logo "Maloc"** : Script/cursive italique (probablement custom ou Playfair Display Italic)
- **Titres** : Sans-serif bold (Inter, Poppins ou similaire)
- **Corps** : Sans-serif regular
- **Tailles estimées** : H1 ~48px, H2 ~32px, H3 ~24px, body ~16px, small ~14px

> *[Maloc OS]*
> - **Accents** : Peut-être une serif pour le premium

### Spacing

> *[Maloc Dev]*

- **Container** : ~1200px max-width, centré
- **Grille** : 3 colonnes pour les cards véhicules
- **Gaps** : ~24px entre cards, ~16px padding interne
- **Sections** : ~80-120px de margin vertical entre sections

### Patterns UI récurrents

> *[Maloc OS]*

- Cards avec coins arrondis
- Boutons avec hover effect
- Badges (Superhost, Certifié, etc.)
- Icônes linéaires
- Ombres douces (box-shadow)
- Split screen pour auth
- Sidebar + content pour catalogue
- Sticky booking widget
- Accordéons FAQ
- Carousels horizontaux

---

## 📄 3. Analyse détaillée de chaque page

### 🏠 3.1 Home Page Auto (Landing principale)

**Fichier** : `Home Page Auto.svg` (1920×8526)

#### Structure déduite *[Maloc OS]*

**Hero Section** (~800px)
- Logo Maloc
- Navigation : Accueil, Catalogue, Blog, Devenir prestataire, Connexion
- Headline principal + sous-titre
- Barre de recherche (ville, dates, type de véhicule)
- CTA principal ("Rechercher")
- Image hero (véhicule de luxe)

**Section "Comment ça marche"** (~600px)
- 3-4 étapes illustrées
- Icônes + texte explicatif
- Flow : Rechercher → Réserver → Rouler

**Section "Véhicules populaires"** (~800px)
- Carrousel ou grille de véhicules
- Cards véhicules (photo, nom, prix/jour, note)
- CTA "Voir tout le catalogue"

**Section "Pourquoi Maloc"** (~600px)
- USPs (Unique Selling Points)
- Icônes + texte (Assurance, Qualité, Support 24/7, etc.)

**Section "Loueurs partenaires"** (~400px)
- Logos ou cards de loueurs premium
- Badges "Certifié Maloc"

**Section "Témoignages"** (~500px)
- Avis clients avec photo, nom, note
- Carousel ou grille

**Section "FAQ"** (~800px)
- Accordéon de questions fréquentes
- Lien vers FAQ complète

**Section CTA final** (~400px)
- "Prêt à vivre l'expérience ?"
- Double CTA : "Louer un véhicule" / "Devenir prestataire"

**Footer** (~400px)
- Liens légaux (CGU, CGV, Mentions légales, RGPD)
- Réseaux sociaux
- Newsletter
- Contact

#### Observations *[Maloc Dev]*

**Navigation (Header)** :
- Logo Maloc à gauche (script cursive blanc)
- Menu horizontal : Voitures, Logements, Boutique, À Propos, Actualités
- Actions droite : icône globe (i18n), icône profil, hamburger menu
- Fond transparent/semi-transparent fusionnant avec le background
- **→ Composant réutilisable sur toutes les pages**

#### Composants à développer
- [ ] Navbar responsive
- [ ] SearchBar avec autocomplete ville
- [ ] DatePicker
- [ ] VehicleCard
- [ ] TestimonialCard
- [ ] FAQ Accordion
- [ ] Footer

---

### 🚗 3.2 Catalogue Voiture

**Fichier** : `Catalogue Voiture.svg` (1920×1683)

#### Structure déduite *[Maloc OS]*

**Header** (~100px)
- Navbar fixe
- Breadcrumb : Accueil > Catalogue

**Filtres sidebar** (~largeur 300px)
- Type de véhicule (SUV, Berline, Sport, etc.)
- Marque (dropdown multi-select)
- Prix min/max (slider)
- Localisation (rayon km)
- Dates disponibilité
- Note minimum
- CTA "Appliquer les filtres"

**Zone résultats** (~largeur 1620px)
- Tri (pertinence, prix, note, récent)
- Nombre de résultats
- Toggle vue grille/liste
- Pagination ou infinite scroll

**Cards véhicules** (dans la grille)
- Photo principale
- Badge "Superhost" / "Nouveau"
- Nom du véhicule
- Localisation
- Prix/jour
- Note moyenne (étoiles)
- CTA "Voir détails"
- Icône favoris (cœur)

#### Observations *[Maloc Dev]*

**Search Bar** :
- **Barre segmentée style Airbnb** horizontale
- Segments : Lieu | Dates | Type de véhicule | Rechercher
- Fond semi-transparent, coins arrondis
- CTA bleu #007BFF pour le bouton rechercher

**Vehicle Cards** :
- Image du véhicule (ratio ~16:10)
- Nom du véhicule (bold)
- Badge loueur (nom + note)
- Prix/jour
- Bouton réservation ou CTA
- **Layout grille 3 colonnes** avec gap ~24px
- Hover effect probable (scale + shadow)

**Map Panel** :
- **Split-view : 60% cards / 40% carte**
- Carte interactive à droite, full-height
- Markers sur les emplacements des véhicules
- **→ Mapbox ou Google Maps**

#### Composants à développer
- [ ] FilterSidebar
- [ ] PriceRangeSlider
- [ ] VehicleGrid
- [ ] VehicleCard (variante catalogue)
- [ ] Pagination
- [ ] SortDropdown
- [ ] MapPanel (Mapbox GL JS / Google Maps)

---

### 📄 3.3 Page Véhicule (Détail)

**Fichier** : `Page Voitures.svg` (1920×7109)

#### Structure déduite *[Maloc OS]*

**Galerie photos** (~600px)
- Photo principale grande
- Thumbnails secondaires
- Lightbox au clic
- Badge "X photos"

**Infos principales** (~400px)
- Nom du véhicule (ex: "Porsche 911 Carrera S")
- Badge marque/modèle/année
- Localisation (ville + distance)
- Note moyenne + nombre d'avis
- Prix/jour affiché

**Bloc réservation** (sidebar sticky)
- Calendrier dates
- Prix récapitulatif (jours × prix + frais)
- CTA "Réserver"
- Politique d'annulation affichée

**Caractéristiques** (~400px)
- Puissance, transmission, carburant
- Nombre de places, coffre
- Options (GPS, Bluetooth, etc.)
- Icônes illustratives

**Description** (~300px)
- Texte libre du loueur
- "Lire plus" si long

**Conditions de location** (~300px)
- Âge minimum
- Permis requis
- Caution
- Kilométrage inclus
- Carburant

**Profil loueur** (~400px)
- Photo + nom
- Badge "Superhost" si applicable
- Membre depuis X
- Taux de réponse
- Temps de réponse moyen
- CTA "Contacter"
- Lien vers page loueur

**Avis** (~800px)
- Note globale + sous-catégories
- Liste des avis (photo, nom, date, texte, note)
- Pagination ou "Voir plus"

**Véhicules similaires** (~400px)
- Carrousel horizontal
- Cards véhicules

**Section carte** (~400px)
- Google Maps avec zone approximative
- Pas l'adresse exacte

#### Observations *[Maloc Dev]*

- **Bi-colonne** : Contenu gauche (~60%) + Module réservation sticky droite (~40%)
- **Caractéristiques** : Grille d'icônes (puissance, transmission, places, carburant...)
- **Module réservation** : Dates, calcul prix, CTA "Réserver" — sticky/persistent au scroll

#### Composants à développer
- [ ] PhotoGallery avec Lightbox
- [ ] BookingWidget (sidebar)
- [ ] Calendar/DateRangePicker
- [ ] CharacteristicsGrid
- [ ] HostProfileCard
- [ ] ReviewsList
- [ ] ReviewCard
- [ ] SimilarVehiclesCarousel
- [ ] MapPreview

---

### 📝 3.4 Créer votre compte

**Fichier** : `Créer votre compte V1.svg` (1920×1080)

#### Structure déduite *[Maloc OS]*

**Layout**
- Split screen : formulaire à gauche, visuel à droite
- Ou centered form avec background

**Formulaire inscription**
- Choix type de compte : Particulier / Professionnel
- Email
- Mot de passe (avec indicateur force)
- Confirmation mot de passe
- Checkbox CGU
- CTA "Créer mon compte"
- Séparateur "ou"
- Boutons OAuth : Google, Apple
- Lien "Déjà un compte ? Connexion"

#### Composants à développer
- [ ] AuthForm
- [ ] PasswordStrengthIndicator
- [ ] OAuthButtons
- [ ] AccountTypeSelector

---

### 🏢 3.5 Devenir prestataire

**Fichier** : `Devenir prestataire.svg` (1920×5154)

#### Structure déduite *[Maloc OS]*

**Hero section**
- Headline "Rejoignez le réseau Maloc"
- Sous-titre value prop
- CTA "Commencer"

**Section avantages** (~600px)
- 4-6 avantages illustrés
- Commission, visibilité, outils, assurance, support

**Section "Comment ça marche"** (~500px)
- Steps : Inscription → Validation → Ajout véhicules → Premières réservations

**Section témoignages loueurs** (~400px)
- Avis de loueurs existants

**Section pricing** (~600px)
- Plan gratuit vs Plan Pro (199€/mois)
- Tableau comparatif features

**Formulaire de demande** (~800px)
- Nom de l'entreprise
- SIRET
- Nombre de véhicules
- Secteur géographique
- Téléphone
- Email
- Message/motivation
- CTA "Envoyer ma demande"

**FAQ loueurs** (~500px)
- Questions spécifiques aux loueurs

#### Composants à développer
- [ ] PricingTable
- [ ] ApplicationForm
- [ ] StepsTimeline
- [ ] AdvantagesGrid

---

### 👤 3.6 Page prestataire (POV client)

**Fichiers** : 
- `Page prestataire abonné Maloc - POV du client.svg` (1920×4328)
- `Page prestataire Pas abonné Maloc - POV du client.svg` (1920×3597)

#### Structure déduite *[Maloc OS]*

**Header profil** (~400px)
- Bannière personnalisée (si abonné)
- Logo/photo du loueur
- Nom de l'agence
- Badge "Superhost" / "Certifié" / "Abonné Maloc"
- Localisation
- Note moyenne + nombre d'avis
- Membre depuis
- Stats : véhicules, réservations, taux réponse

**Réseaux sociaux** (si abonné)
- Liens Instagram, Facebook, WhatsApp

**Description** (~200px)
- Bio de l'agence
- Horaires d'ouverture

**Véhicules du loueur** (~600px)
- Grille de tous ses véhicules
- CTA "Voir dans le catalogue" avec filtre

**Avis sur le loueur** (~600px)
- Liste des avis
- Réponses du loueur (si abonné)

#### Différences abonné vs non-abonné *[Maloc OS]*

| Feature | Gratuit | Abonné |
|---------|---------|--------|
| Bannière personnalisée | ❌ | ✅ |
| Réseaux sociaux | ❌ | ✅ |
| Réponse aux avis | ❌ | ✅ |
| Badge "Abonné Maloc" | ❌ | ✅ |

#### Observations *[Maloc Dev]*

- **Bannière** : 1600×350px, image personnalisable
- **Avatar** : Centré, superposé à la bannière
- **Badges** : "Vérifié", "Abonné Maloc", ancienneté
- **Véhicules** : Carrousel horizontal des véhicules du loueur
- **Infos** : Horaires d'ouverture, carte localisation, contact
- **Avis** : Section dédiée avec notes et commentaires
- **Réseaux sociaux** : Liens Instagram/Facebook/WhatsApp + grille d'aperçus

#### Composants à développer
- [ ] HostHeader (avec bannière overlay)
- [ ] HostStats
- [ ] SocialLinks
- [ ] HostVehiclesGrid
- [ ] HostReviews

---

### ⚙️ 3.7 Paramètres compte clients

**Fichiers** : 4 variantes (1920×2180 à 4054)

#### Structure déduite *[Maloc OS]* (tabs ou sections)

**Informations personnelles**
- Photo de profil (upload)
- Prénom, Nom
- Email (vérifié ✓)
- Téléphone (vérifié ✓)
- Date de naissance
- Adresse

**Vérification d'identité**
- Statut KYC (En attente / Vérifié / Refusé)
- Upload pièce d'identité
- Upload permis de conduire
- Upload justificatif de domicile
- Upload KBIS (si pro)

**Sécurité**
- Changer mot de passe
- Activer 2FA
- Sessions actives

**Moyens de paiement**
- Cartes enregistrées
- Ajouter une carte

**Notifications**
- Email (on/off par type)
- Push (on/off par type)
- SMS (on/off par type)

**Balance & Coupons**
- Solde actuel
- Historique transactions
- Saisir un code coupon

**Favoris**
- Liste des véhicules favoris

**Réservations**
- Historique des réservations
- En cours / Passées / Annulées

**Paramètres compte pro** (si pro)
- Infos entreprise
- Facturation
- Télécharger factures

#### Composants à développer
- [ ] ProfileForm
- [ ] KYCUploader
- [ ] PaymentMethodsList
- [ ] NotificationSettings
- [ ] BalanceCard
- [ ] FavoritesList
- [ ] ReservationsList

---

### 📰 3.8 Blog

**Fichier** : `Blog.svg` (1920×4883)

#### Structure déduite *[Maloc OS]*

**Header blog**
- Titre "Le Blog Maloc"
- Catégories (Actualités, Conseils, Guides, Lifestyle)

**Article featured** (~400px)
- Grande image
- Titre
- Extrait
- Date + auteur
- CTA "Lire"

**Grille d'articles** (~2000px)
- Cards articles (image, titre, catégorie, date, extrait)
- 3 colonnes desktop
- Pagination

**Sidebar** (~300px)
- Recherche
- Catégories
- Articles populaires
- Newsletter

#### Composants à développer
- [ ] ArticleCard
- [ ] ArticleGrid
- [ ] BlogSidebar
- [ ] CategoryFilter

---

### 📖 3.9 Page Article

**Fichier** : `Page Article.svg` (1920×7485)

#### Structure déduite *[Maloc OS]*

**Header article**
- Breadcrumb
- Catégorie
- Titre
- Date + auteur + temps de lecture
- Image hero

**Corps de l'article** (~4000px)
- Contenu riche (headings, paragraphes, images, listes)
- Sidebar sticky (sommaire, partage, auteur)

**Section auteur** (~300px)
- Photo + bio
- Autres articles de l'auteur

**Articles similaires** (~400px)
- 3-4 cards articles

**Commentaires** (optionnel)

#### Composants à développer
- [ ] ArticleContent (MDX/rich text)
- [ ] TableOfContents
- [ ] ShareButtons
- [ ] AuthorCard
- [ ] RelatedArticles

---

### 🛒 3.10 Boutique (V3+)

**Fichier** : `Boutique.svg` (1920×2672)

#### Structure déduite *[Maloc OS]*

- Merch Maloc (t-shirts, casquettes, etc.)
- Grille produits
- Détail produit
- Panier
- Checkout

*À développer en V3+*

---

### 💼 3.11 Page Carrière (V3+)

**Fichiers** : 3 variantes

#### Structure déduite *[Maloc OS]*

- Hero "Rejoignez l'aventure Maloc"
- Culture d'entreprise
- Postes ouverts
- Avantages
- Formulaire candidature

*À développer en V3+*

---

## 🛠️ 4. Composants UI réutilisables — Mapping vers shadcn/ui + Tailwind

> *[Maloc Dev]*

### Recommandation stack : **Tailwind CSS + shadcn/ui + Framer Motion**

| Composant Maloc | shadcn/ui | Notes |
|----------------|-----------|-------|
| Header/Nav | `NavigationMenu` | + custom logo + glassmorphism |
| Search Bar | `Input` + `Popover` + `Calendar` | Composer les segments |
| Vehicle Card | `Card` | Custom avec image, badge, prix |
| Map Panel | Mapbox GL JS / Google Maps | Intégration custom |
| Module Réservation | `Card` + `Calendar` + `Button` | Sticky sidebar |
| Avis | `Card` + `Avatar` + rating custom | Étoiles custom |
| Carousel | `Carousel` (Embla) | Pour véhicules similaires |
| Provider Profile | Custom layout | Bannière + avatar overlay |
| Footer | Custom | Multi-colonnes grid |
| Formulaires | `Form` + `Input` + `Select` | React Hook Form + Zod |
| Modals | `Dialog` | Pour détails réservation, litiges |
| Toast/Notifications | `Toast` | Sonner via shadcn |
| Tabs | `Tabs` | Pour sections profil, paramètres |
| Accordion | `Accordion` | Pour FAQ |

### Composants partagés à développer *[Maloc OS]*

- [ ] Navbar
- [ ] Footer
- [ ] VehicleCard
- [ ] SearchBar
- [ ] DateRangePicker
- [ ] ReviewCard
- [ ] Rating (stars)
- [ ] Button variants
- [ ] Input variants
- [ ] Modal
- [ ] Toast/Notification
- [ ] Loader/Skeleton

---

## ⚠️ 5. Pages manquantes (MVP sans maquette)

> *[Maloc Dev]*

### 10 pages critiques non maquettées :

1. **Flow de réservation** — Aucune maquette du tunnel de réservation (étapes, paiement, confirmation)
2. **Messagerie** — Pas de maquette pour le système de conversation loueur/client
3. **État des lieux** — Pas de maquette pour la prise de photos géolocalisées
4. **Dashboard Admin** — Aucune maquette admin
5. **CRM Prestataire (Maloc OS)** — Pas de maquette iPad/desktop du SaaS
6. **Login/Connexion** — Seule l'inscription est maquettée, pas le login
7. **Vérification identité (KYC)** — Pas de maquette pour l'upload de documents
8. **Pages "Favoris"** — Pas de maquette
9. **Balance & Coupons** — Pas de maquette
10. **Page résultat après recherche filtrée** — Pas de maquette

### Recommandations pour les pages manquantes *[Maloc Dev]*

#### Messagerie (MVP)
- S'inspirer de **Airbnb messaging** : sidebar gauche (conversations), panel droit (messages)
- Événements système inline (réservation confirmée, rappel avis, etc.)
- Intégrer les cards de réservation directement dans la conversation
- Dark theme cohérent avec le reste

#### Flow de réservation
- **3 étapes** : Dates & options → Vérification identité → Paiement
- Progress bar en haut
- Résumé sticky à droite (comme le module réservation de la page détail)
- Stripe Elements pour le formulaire de paiement

#### Dashboard Admin
- S'inspirer de **Vercel Dashboard** ou **Linear** (dark theme, clean, data-dense)
- Sidebar gauche avec navigation par section
- Cards de stats en haut (utilisateurs, réservations, revenus, litiges)
- Tables avec filtres pour la gestion des entités

#### CRM Prestataire (iPad)
- S'inspirer de **Notion** ou **Linear** pour le layout
- Navigation par tabs : Flotte, Réservations, Messagerie, Facturation, Avis
- Optimisé tactile (boutons larges, swipe actions)
- Mode plein écran iPad

---

## 🚀 6. Recommandations techniques

### Stack UI *[Maloc Dev]*
- **Tailwind CSS** pour le styling utilitaire
- **shadcn/ui** pour les composants de base
- **Framer Motion** pour les animations

### Animations *[Maloc Dev]*
- Page transitions
- Card hover effects (scale, shadow)
- Scroll-triggered animations pour les sections
- Skeleton loading pour les images

### Dark Theme *[Maloc Dev]*
- Tailwind `dark:` classes nativement
- CSS variables pour la palette custom
- Les maquettes sont **100% dark theme** → pas besoin de light mode au MVP

### Checklist développement MVP *[Maloc OS]*

#### Pages prioritaires 🔴
- [ ] Home Page Auto
- [ ] Catalogue Voiture
- [ ] Page Véhicule (détail)
- [ ] Créer votre compte / Connexion
- [ ] Devenir prestataire
- [ ] Page prestataire
- [ ] Paramètres compte

#### Pages V2
- [ ] Blog
- [ ] Page Article
- [ ] Messagerie
- [ ] Dashboard loueur (CRM)

#### Pages V3+
- [ ] Boutique
- [ ] Carrière
- [ ] Home Page Immo
- [ ] Catalogue Immo

---

> **Note** : Les fichiers SVG originaux sont dans `/var/www/Maloc-project/Maquette SVG/`. Pour une analyse pixel-perfect, ouvrir chaque SVG dans Figma ou un navigateur.
