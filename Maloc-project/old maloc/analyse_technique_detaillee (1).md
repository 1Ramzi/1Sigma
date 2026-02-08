# Analyse Technique Approfondie - Projet Maloc

## 1. Architecture Globale

### 1.1 Stack Technique Actuelle

**Backend API (Express.js)**
- **Version Node.js**: >= 12.0.0
- **Framework**: Express.js avec architecture MVC
- **ORM**: Sequelize 6.32.1
- **Base de données**: PostgreSQL
- **Authentification**: Passport.js + JWT (access token 120 min, refresh token 30 jours)
- **Validation**: Joi pour la validation des requêtes
- **Sécurité**: Helmet, XSS Clean, CORS, Rate Limiting
- **Logging**: Winston + Morgan
- **Tests**: Jest avec couverture de code
- **Process Management**: PM2
- **Documentation API**: Swagger (swagger-jsdoc + swagger-ui-express)

**Frontend Web (Next.js)**
- **Framework**: Next.js 13.4.1 (Pages Router)
- **React**: 18.2.0
- **Styling**: TailwindCSS 3.3.2 + SASS
- **State Management**: Redux + Redux Thunk
- **Internationalisation**: next-i18next (i18n)
- **Cartographie**: Leaflet + React Leaflet + Geosearch
- **Analytics**: Vercel Analytics
- **Forms**: react-form-stepper, react-phone-number-input
- **UI Components**: react-icons, reactjs-popup, react-toastify
- **Date Picker**: react-tailwindcss-datepicker
- **Carousel**: Swiper 9.3.1

**CRM Admin (React)**
- **Framework**: React 18.2.0 (Create React App 5.0.1)
- **Styling**: TailwindCSS 3.0.7 + Twin.macro + Framer Motion
- **State Management**: Redux Toolkit + Redux Persist
- **Tables**: TanStack React Table 8.7.9 + React Window (virtualisation)
- **Calendrier/Planning**: FullCalendar 6.1.10 (avec timeline et resources)
- **Graphiques**: ApexCharts 3.35.2 + React ApexCharts
- **Cartes**: React Simple Maps + D3-geo
- **Forms**: Formik 2.2.9 + Yup 0.32.10
- **PDF**: @react-pdf/renderer 3.1.12
- **Rich Text**: React Quill 2.0.0
- **Drag & Drop**: React Beautiful DnD
- **Color Picker**: React Best Gradient Color Picker
- **Signature**: React Signature Canvas

### 1.2 Services Externes et Intégrations

1. **Cloudflare Images** (`cloudflare-images`)
   - Stockage et optimisation d'images
   - Delivery via CDN avec hash personnalisé
   - Configuration: API Key, Account ID, Image Delivery Hash

2. **Cloudflare R2** (AWS S3 SDK compatible)
   - Stockage de fichiers (documents, contrats)
   - Configuration: Endpoint, Access Key ID, Secret, Bucket Name, Region

3. **Stancer API** (`stancer-api`)
   - Plateforme de paiement en ligne
   - Gestion des transactions et cautions

4. **SMSALA**
   - Service d'envoi de SMS
   - Configuration: URL, ID, Password, Sender ID
   - Utilisé pour les codes de vérification

5. **Imagin Studio API**
   - Génération d'images de véhicules professionnelles
   - Endpoints: Images et Paints
   - Configuration: Customer Key

6. **SMTP/Email**
   - Nodemailer pour l'envoi d'emails
   - Templates HTML pour emails transactionnels

## 2. Modèle de Données Détaillé

### 2.1 Entités Utilisateurs

**Users**
```javascript
{
  id: INTEGER (PK),
  name: STRING (required),
  email: STRING (unique, required, validated),
  password: STRING (hashed, min 8 chars, letter + number),
  role: ENUM ['user', 'first_login_provider', 'provider', 'admin'],
  isEmailVerified: BOOLEAN (default: false),
  phoneNumber: STRING (regex validated),
  lastLoggedAt: DATE,
  verificationCode: INTEGER,
  createdAt: DATE,
  updatedAt: DATE,
  deletedAt: DATE (soft delete)
}
```

**ProviderData** (données supplémentaires pour loueurs)
```javascript
{
  id: INTEGER (PK),
  userId: INTEGER (FK -> Users),
  bio: TEXT,
  // Autres données spécifiques au loueur
  createdAt: DATE,
  updatedAt: DATE
}
```

**Documents** (pièces d'identité, permis)
```javascript
{
  id: INTEGER (PK),
  userId: INTEGER (FK -> Users),
  // URLs des documents stockés
  createdAt: DATE,
  updatedAt: DATE
}
```

**BlockUser** (gestion des blocages)
```javascript
{
  id: INTEGER (PK),
  userId: INTEGER (FK -> Users),
  reason: STRING,
  blockedAt: DATE,
  unblockedAt: DATE (null si toujours bloqué),
  createdAt: DATE,
  updatedAt: DATE
}
```

### 2.2 Entités Véhicules (Hiérarchie Complète)

**VehicleConstructor** (Constructeurs)
```javascript
{
  id: INTEGER (PK),
  name: STRING (ex: "Renault", "Peugeot"),
  logo: STRING (URL),
  createdAt: DATE,
  updatedAt: DATE
}
```

**VehicleModel** (Modèles)
```javascript
{
  id: INTEGER (PK),
  vehicleConstructorId: INTEGER (FK),
  name: STRING (ex: "Clio", "308"),
  createdAt: DATE,
  updatedAt: DATE
}
```

**VehicleGeneration** (Générations)
```javascript
{
  id: INTEGER (PK),
  vehicleModelId: INTEGER (FK),
  name: STRING,
  yearBegin: INTEGER,
  yearEnd: INTEGER,
  createdAt: DATE,
  updatedAt: DATE
}
```

**VehicleSerie** (Séries)
```javascript
{
  id: INTEGER (PK),
  vehicleGenerationId: INTEGER (FK),
  name: STRING,
  createdAt: DATE,
  updatedAt: DATE
}
```

**VehicleTrim** (Finitions/Versions)
```javascript
{
  id: INTEGER (PK),
  vehicleSerieId: INTEGER (FK),
  name: STRING,
  doors: INTEGER,
  seats: INTEGER,
  createdAt: DATE,
  updatedAt: DATE
}
```

**VehicleEquipment** (Équipements)
```javascript
{
  id: INTEGER (PK),
  vehicleTrimId: INTEGER (FK),
  name: STRING,
  description: TEXT,
  createdAt: DATE,
  updatedAt: DATE
}
```

**VehicleSpecification** (Spécifications techniques)
```javascript
{
  id: INTEGER (PK),
  name: STRING (ex: "Puissance", "Consommation"),
  unit: STRING (ex: "CV", "L/100km"),
  createdAt: DATE,
  updatedAt: DATE
}
```

**VehicleSpecificationValue** (Valeurs des spécifications)
```javascript
{
  id: INTEGER (PK),
  vehicleTrimId: INTEGER (FK),
  vehicleSpecificationId: INTEGER (FK),
  value: STRING,
  createdAt: DATE,
  updatedAt: DATE
}
```

**VehicleTrimImage** (Images des modèles)
```javascript
{
  id: INTEGER (PK),
  vehicleTrimId: INTEGER (FK),
  imageUrl: STRING,
  isPrimary: BOOLEAN,
  createdAt: DATE,
  updatedAt: DATE
}
```

**Vehicles** (Véhicules individuels)
```javascript
{
  id: INTEGER (PK),
  vehicleTrimId: INTEGER (FK, required),
  vehicleEquipmentId: INTEGER (FK, nullable),
  vehicleTrimImageId: INTEGER (FK, nullable),
  matriculation: STRING (unique, required),
  currentKms: INTEGER (min: 0, required),
  createdAt: DATE,
  updatedAt: DATE
}
```

### 2.3 Entités Location et Réservation

**Ownership** (Propriété/Mise en location)
```javascript
{
  id: INTEGER (PK),
  vehicleId: INTEGER (FK -> Vehicles, required),
  userId: INTEGER (FK -> Users, required),
  createVehicleRequestId: INTEGER (FK, unique),
  pricePerDay: STRING (required),
  pricePerWeek: STRING (required),
  pricePerWeekend: STRING (required),
  kmPerDay: STRING (required),
  kmPerWeek: STRING (required),
  kmPerWeekend: STRING (required),
  priceExtraKm: STRING (required),
  caution: STRING (required),
  description: TEXT (required),
  isAcceptingNoviceDriver: BOOLEAN (required),
  percentageRsv: INTEGER (required),
  isHidingVehicle: BOOLEAN (default: false),
  endedAt: DATE (null si actif),
  createdAt: DATE,
  updatedAt: DATE
}
```

**OwnershipImage** (Photos du véhicule en location)
```javascript
{
  id: INTEGER (PK),
  ownershipId: INTEGER (FK),
  imageUrl: STRING,
  order: INTEGER,
  createdAt: DATE,
  updatedAt: DATE
}
```

**Booking** (Réservations)
```javascript
{
  id: INTEGER (PK),
  ownershipId: INTEGER (FK, required),
  title: STRING (required),
  description: TEXT,
  testDrive: TEXT,
  startAt: DATE (required),
  endAt: DATE (required),
  createdAt: DATE,
  updatedAt: DATE
}
```

**UIPlanning** (Planning de disponibilité)
```javascript
{
  id: INTEGER (PK),
  bookingId: INTEGER (FK, required),
  // Données de planning pour l'UI
  createdAt: DATE,
  updatedAt: DATE
}
```

**Contract** (Contrats de location)
```javascript
{
  id: INTEGER (PK),
  bookingId: INTEGER (FK),
  // Données du contrat
  createdAt: DATE,
  updatedAt: DATE
}
```

**Deposits** (Cautions)
```javascript
{
  id: INTEGER (PK),
  bookingId: INTEGER (FK),
  amount: DECIMAL,
  status: STRING,
  createdAt: DATE,
  updatedAt: DATE
}
```

### 2.4 Workflow de Validation

**CreateVehicleRequest** (Demande d'ajout de véhicule)
```javascript
{
  id: INTEGER (PK),
  userId: INTEGER (FK -> Users, required),
  vehicleTrimId: INTEGER (FK),
  matriculation: STRING,
  currentKms: INTEGER,
  pricePerDay: STRING,
  pricePerWeek: STRING,
  pricePerWeekend: STRING,
  kmPerDay: STRING,
  kmPerWeek: STRING,
  kmPerWeekend: STRING,
  priceExtraKm: STRING,
  caution: STRING,
  description: TEXT,
  isAcceptingNoviceDriver: BOOLEAN,
  percentageRsv: INTEGER,
  status: ENUM ['pending', 'approved', 'rejected'],
  createdAt: DATE,
  updatedAt: DATE
}
```

**CreateVehicleRequestImage** (Images de la demande)
```javascript
{
  id: INTEGER (PK),
  createVehicleRequestId: INTEGER (FK),
  imageUrl: STRING,
  createdAt: DATE,
  updatedAt: DATE
}
```

**CreateVehicleReview** (Révision par admin)
```javascript
{
  id: INTEGER (PK),
  createVehicleRequestId: INTEGER (FK),
  userId: INTEGER (FK -> Users, admin),
  status: ENUM ['approved', 'rejected'],
  comment: TEXT,
  createdAt: DATE,
  updatedAt: DATE
}
```

**UpdateVehicleRequest** (Demande de modification)
```javascript
{
  id: INTEGER (PK),
  ownershipId: INTEGER (FK),
  createdByUserId: INTEGER (FK),
  // Champs modifiables
  status: ENUM ['pending', 'approved', 'rejected'],
  createdAt: DATE,
  updatedAt: DATE
}
```

**UpdateVehicleRequestImage**
```javascript
{
  id: INTEGER (PK),
  updateVehicleRequestId: INTEGER (FK),
  imageUrl: STRING,
  createdAt: DATE,
  updatedAt: DATE
}
```

**UpdateVehicleReview**
```javascript
{
  id: INTEGER (PK),
  updateVehicleRequestId: INTEGER (FK),
  userId: INTEGER (FK, admin),
  status: ENUM ['approved', 'rejected'],
  comment: TEXT,
  createdAt: DATE,
  updatedAt: DATE
}
```

### 2.5 Adhésion Loueur

**MembershipRequest** (Demande d'adhésion)
```javascript
{
  id: INTEGER (PK),
  userId: INTEGER (FK),
  companyName: STRING,
  siret: STRING,
  address: TEXT,
  status: ENUM ['pending', 'approved', 'rejected'],
  createdAt: DATE,
  updatedAt: DATE
}
```

**MembershipReview** (Révision de l'adhésion)
```javascript
{
  id: INTEGER (PK),
  membershipRequestId: INTEGER (FK),
  createdById: INTEGER (FK, admin),
  createdProviderId: INTEGER (FK, nouveau provider),
  status: ENUM ['approved', 'rejected'],
  comment: TEXT,
  createdAt: DATE,
  updatedAt: DATE
}
```

**Subscription** (Abonnements)
```javascript
{
  id: INTEGER (PK),
  userId: INTEGER (FK),
  plan: STRING,
  startDate: DATE,
  endDate: DATE,
  status: STRING,
  createdAt: DATE,
  updatedAt: DATE
}
```

### 2.6 Autres Entités

**Review** (Avis clients)
```javascript
{
  id: INTEGER (PK),
  userId: INTEGER (FK),
  vehicleId: INTEGER (FK),
  bookingId: INTEGER (FK),
  rating: INTEGER (1-5),
  comment: TEXT,
  createdAt: DATE,
  updatedAt: DATE
}
```

**FavouriteVehicle** (Favoris)
```javascript
{
  id: INTEGER (PK),
  userId: INTEGER (FK, required),
  vehicleId: INTEGER (FK),
  createdAt: DATE,
  updatedAt: DATE
}
```

**Notifications**
```javascript
{
  id: INTEGER (PK),
  userId: INTEGER (FK, required),
  title: STRING,
  message: TEXT,
  isRead: BOOLEAN,
  type: STRING,
  createdAt: DATE,
  updatedAt: DATE
}
```

**ContactRequest** (Demandes de contact)
```javascript
{
  id: INTEGER (PK),
  name: STRING,
  email: STRING,
  phone: STRING,
  message: TEXT,
  status: ENUM ['pending', 'processed'],
  createdAt: DATE,
  updatedAt: DATE
}
```

## 3. Système de Permissions (RBAC)

### 3.1 Rôles Définis

1. **user** (Utilisateur de base)
   - Permissions: manageFavouriteVehicles, getFavouriteVehicles, deposit, getVehicles, getNotifications, manageBookings, getBookings, createReview, createDocument

2. **first_login_provider** (Première connexion loueur)
   - Permissions: manageFavouriteVehicles, getFavouriteVehicles, getNotifications
   - Rôle transitoire pour forcer le changement de mot de passe

3. **provider** (Loueur)
   - Permissions: manageContracts, createDocument, getContracts, getOwnerships, getCreateVehicleRequests, manageCreateVehicleRequests, getUpdateVehicleRequests, manageUpdateVehicleRequests, manageFavouriteVehicles, subscription, getFavouriteVehicles, getNotifications, manageOwnerships, getProviderVehicles, manageBookings, getBookings, getVehicleTrims, deposit

4. **admin** (Administrateur)
   - Permissions: Toutes les permissions (getUsers, manageUsers, getMemberships, manageMemberships, getVehicleConstructors, manageVehicleConstructors, getVehicleModels, manageVehicleModels, getOwnerships, getCreateVehicleRequests, manageCreateVehicleRequests, getCreateVehicleReviews, manageCreateVehicleReviews, getVehicles, manageContracts, getContracts, manageVehicleTrims, getVehicleTrims, getUpdateVehicleRequests, manageUpdateVehicleRequests, getUpdateVehicleReviews, manageUpdateVehicleReviews, manageContactRequests, getContactRequests, manageFavouriteVehicles, getFavouriteVehicles, manageOwnerships, getProviderVehicles, getBookings, manageBookings, manageBlockUsers, getBlockUsers, regeneratePassword, deposit)

### 3.2 Workflow de Changement de Rôle

1. **User → Provider**
   - Création d'une MembershipRequest
   - Validation par admin (MembershipReview)
   - Changement du rôle user → provider

2. **User → first_login_provider**
   - Lors de la création d'un compte provider par admin
   - Obligation de changer le mot de passe
   - Passage automatique à provider après changement

## 4. Routes API Principales

### 4.1 Authentification (`/v1/auth`)
- POST `/register` - Inscription
- POST `/login` - Connexion
- POST `/logout` - Déconnexion
- POST `/refresh-tokens` - Rafraîchir les tokens
- POST `/forgot-password` - Mot de passe oublié
- POST `/reset-password` - Réinitialiser mot de passe
- POST `/send-verification-email` - Envoyer email de vérification
- POST `/verify-email` - Vérifier email

### 4.2 Utilisateurs (`/v1/users`)
- GET `/` - Liste des utilisateurs (admin)
- POST `/` - Créer un utilisateur (admin)
- GET `/:userId` - Détails utilisateur
- PATCH `/:userId` - Modifier utilisateur
- DELETE `/:userId` - Supprimer utilisateur (admin)

### 4.3 Véhicules
- `/v1/vehicles` - CRUD véhicules
- `/v1/vehicle-constructors` - Gestion constructeurs
- `/v1/vehicle-models` - Gestion modèles
- `/v1/vehicle-trims` - Gestion finitions
- `/v1/rentable-vehicles` - Véhicules disponibles à la location
- `/v1/provider-vehicles` - Véhicules d'un loueur

### 4.4 Location
- `/v1/ownerships` - Gestion des propriétés/mises en location
- `/v1/bookings` - Gestion des réservations
- `/v1/contracts` - Gestion des contrats
- `/v1/payment` - Gestion des paiements

### 4.5 Workflow de Validation
- `/v1/create-vehicle-requests` - Demandes d'ajout de véhicule
- `/v1/create-vehicle-reviews` - Révisions des demandes
- `/v1/update-vehicle-requests` - Demandes de modification
- `/v1/update-vehicle-reviews` - Révisions des modifications
- `/v1/membership-requests` - Demandes d'adhésion
- `/v1/membership-reviews` - Révisions des adhésions

### 4.6 Autres
- `/v1/provider-data` - Données supplémentaires des loueurs
- `/v1/favourite-vehicles` - Gestion des favoris
- `/v1/reviews` - Gestion des avis
- `/v1/contact-requests` - Demandes de contact
- `/v1/notifications` - Notifications
- `/v1/block-users` - Gestion des blocages
- `/v1/captcha` - Vérification captcha

## 5. Frontend Web (Next.js)

### 5.1 Pages Principales
- `/` - Page d'accueil avec recherche de véhicules
- `/voitures` - Liste des véhicules disponibles
- `/voitures/[...slug]` - Détails d'un véhicule
- `/prestataire/[...slug]` - Profil d'un loueur
- `/auth/connexion` - Connexion
- `/auth/inscription` - Inscription
- `/adhesion` - Demande d'adhésion comme loueur
- `/contact` - Page de contact
- `/qui-sommes-nous` - À propos
- `/conditions` - Conditions générales
- `/confidentialite` - Politique de confidentialité
- `/mentions` - Mentions légales

### 5.2 Composants Clés
- **Cards**: CardSwiper pour affichage des véhicules
- **Forms**: Formulaires multi-étapes pour réservation et adhésion
- **Maps**: Intégration Leaflet pour localisation des véhicules
- **MultiStep**: Processus de réservation et adhésion en plusieurs étapes

### 5.3 State Management (Redux)
- Actions et reducers pour la gestion de l'état global
- Persistance de l'authentification
- Gestion du panier/réservation en cours

## 6. CRM Admin (React)

### 6.1 Modules Principaux

**Dashboard**
- Vue d'ensemble des statistiques
- Graphiques ApexCharts
- Indicateurs clés de performance

**Gestion Utilisateurs** (`/admin/users`)
- Liste des utilisateurs avec filtres
- Détails et modification
- Gestion des rôles

**Gestion Loueurs** (`/admin/providers`)
- Liste des loueurs
- Détails du loueur
- Statistiques par loueur

**Adhésions** (`/admin/memberships`)
- Demandes d'adhésion en attente
- Validation/Rejet des demandes
- Historique des adhésions

**Véhicules** (`/admin/vehicles`)
- Gestion du catalogue de véhicules
- Constructeurs, modèles, finitions
- Demandes d'ajout/modification de véhicules
- Validation des demandes

**Réservations** (`/admin/reservations`)
- Liste des réservations
- Planning avec FullCalendar
- Gestion des contrats

**Contrats** (`/admin/contracts`)
- Génération de contrats PDF
- Signature électronique
- Archivage

**Promotions** (`/admin/promotions`)
- Création de codes promo
- Gestion des réductions

**Abonnements** (`/admin/subscriptions`)
- Gestion des plans d'abonnement
- Suivi des paiements

**Blacklist** (`/admin/blacklist`)
- Gestion des utilisateurs bloqués
- Raisons de blocage
- Déblocage

**Dépôts/Cautions** (`/admin/deposits`)
- Suivi des cautions
- Gestion des remboursements

**Avis/Ratings** (`/admin/ratings`)
- Modération des avis
- Statistiques des notes

**Demandes de Contact** (`/admin/contact`)
- Gestion des demandes de contact
- Suivi des réponses

**Documents** (`/admin/documents`)
- Vérification des documents d'identité
- Validation des permis de conduire

### 6.2 Composants UI Avancés

**Tables**
- TanStack React Table avec tri, filtrage, pagination
- Virtualisation avec React Window pour grandes listes
- Export CSV/Excel

**Calendrier/Planning**
- FullCalendar avec vue timeline
- Gestion des ressources (véhicules)
- Drag & Drop pour réservations

**Graphiques**
- ApexCharts pour statistiques
- Graphiques en temps réel
- Export PNG/SVG

**PDF**
- Génération de contrats avec @react-pdf/renderer
- Templates personnalisables
- Signature électronique

**Formulaires**
- Formik + Yup pour validation
- Formulaires multi-étapes
- Upload de fichiers

## 7. Points Techniques Critiques

### 7.1 Sécurité

1. **Authentification**
   - JWT avec rotation des tokens
   - Refresh tokens stockés en base
   - Expiration configurable

2. **Validation**
   - Joi pour validation côté serveur
   - Yup pour validation côté client
   - Sanitization XSS

3. **Rate Limiting**
   - Protection contre les attaques par force brute
   - Limitation par IP

4. **Helmet**
   - Headers de sécurité HTTP
   - Protection CSRF

### 7.2 Performance

1. **Base de Données**
   - Index sur les colonnes fréquemment recherchées
   - Soft deletes pour historique
   - Pagination des résultats

2. **Frontend**
   - Code splitting avec Next.js
   - Lazy loading des images
   - Virtualisation des listes longues

3. **Caching**
   - Redis pour cache (à implémenter)
   - Cache CDN pour images Cloudflare

### 7.3 Scalabilité

1. **Architecture**
   - Séparation API/Frontend
   - Microservices potentiels (paiement, notifications)

2. **Stockage**
   - Cloudflare R2 pour fichiers
   - Cloudflare Images pour optimisation

3. **Monitoring**
   - Logging avec Winston
   - Métriques de performance

## 8. Workflows Métier Clés

### 8.1 Workflow d'Adhésion Loueur
1. Utilisateur remplit le formulaire d'adhésion
2. Création d'une MembershipRequest (status: pending)
3. Admin reçoit notification
4. Admin valide/rejette via MembershipReview
5. Si approuvé: User.role → provider
6. Email de confirmation envoyé

### 8.2 Workflow d'Ajout de Véhicule
1. Loueur remplit le formulaire d'ajout
2. Upload des photos
3. Création d'une CreateVehicleRequest (status: pending)
4. Admin reçoit notification
5. Admin valide/rejette via CreateVehicleReview
6. Si approuvé:
   - Création du Vehicle
   - Création de l'Ownership
   - Véhicule visible sur le site
7. Email de confirmation envoyé

### 8.3 Workflow de Réservation
1. Client sélectionne un véhicule et des dates
2. Vérification de disponibilité
3. Création de la Booking
4. Paiement via Stancer
5. Création du Contract
6. Blocage de la caution (Deposit)
7. Emails de confirmation (client + loueur)
8. Ajout au planning (UIPlanning)

### 8.4 Workflow de Modification de Véhicule
1. Loueur modifie les infos de son véhicule
2. Création d'une UpdateVehicleRequest
3. Admin valide/rejette via UpdateVehicleReview
4. Si approuvé: mise à jour de l'Ownership
5. Email de confirmation

## 9. Dépendances Critiques

### 9.1 Backend
- `sequelize` - ORM PostgreSQL
- `passport-jwt` - Authentification JWT
- `joi` - Validation
- `bcryptjs` - Hash des mots de passe
- `axios` - Requêtes HTTP vers services externes
- `multer` - Upload de fichiers
- `node-mailjet` / `nodemailer` - Envoi d'emails
- `stancer-api` - Paiements

### 9.2 Frontend Web
- `next` - Framework React
- `react-redux` - State management
- `axios` - Requêtes API
- `react-leaflet` - Cartes
- `next-i18next` - Internationalisation
- `react-toastify` - Notifications

### 9.3 CRM Admin
- `@reduxjs/toolkit` - State management
- `@tanstack/react-table` - Tables avancées
- `@fullcalendar/*` - Calendrier/Planning
- `apexcharts` - Graphiques
- `formik` + `yup` - Formulaires
- `@react-pdf/renderer` - Génération PDF

## 10. Recommandations pour Migration vers NestJS

### 10.1 Architecture NestJS

**Structure Modulaire Recommandée**
```
src/
├── auth/                 # Module authentification
├── users/                # Module utilisateurs
├── vehicles/             # Module véhicules
│   ├── constructors/
│   ├── models/
│   ├── trims/
│   └── vehicles/
├── ownerships/           # Module propriétés/location
├── bookings/             # Module réservations
├── contracts/            # Module contrats
├── memberships/          # Module adhésions
├── reviews/              # Module avis
├── payments/             # Module paiements
├── notifications/        # Module notifications
├── uploads/              # Module upload fichiers
├── common/               # Modules communs
│   ├── guards/
│   ├── decorators/
│   ├── filters/
│   ├── interceptors/
│   └── pipes/
└── config/               # Configuration
```

**Technologies NestJS à Utiliser**
- `@nestjs/typeorm` ou `@nestjs/sequelize` - ORM
- `@nestjs/passport` + `@nestjs/jwt` - Authentification
- `@nestjs/swagger` - Documentation API
- `@nestjs/config` - Configuration
- `class-validator` + `class-transformer` - Validation
- `@nestjs/throttler` - Rate limiting
- `@nestjs/schedule` - Tâches planifiées
- `@nestjs/bull` - Files d'attente (emails, notifications)

### 10.2 Priorités de Migration

**Phase 1: Infrastructure de Base**
- Configuration NestJS
- Connexion PostgreSQL
- Authentification JWT
- Guards et Decorators
- Exception Filters
- Logging

**Phase 2: Modules Utilisateurs**
- Module Users
- Module Auth
- Module ProviderData
- Module Documents

**Phase 3: Modules Véhicules**
- Module VehicleConstructors
- Module VehicleModels
- Module VehicleTrims
- Module Vehicles

**Phase 4: Modules Location**
- Module Ownerships
- Module Bookings
- Module Contracts
- Module Deposits

**Phase 5: Modules Workflow**
- Module CreateVehicleRequests
- Module UpdateVehicleRequests
- Module MembershipRequests

**Phase 6: Modules Complémentaires**
- Module Reviews
- Module Notifications
- Module Payments
- Module Uploads

### 10.3 Points d'Attention

1. **Migration de Sequelize**
   - Conserver les modèles existants
   - Adapter les associations
   - Tester les migrations

2. **Gestion des Fichiers**
   - Intégration Cloudflare R2
   - Validation des uploads
   - Optimisation des images

3. **Services Externes**
   - Wrapper pour Stancer API
   - Service SMS
   - Service Email
   - Imagin Studio API

4. **Tests**
   - Tests unitaires pour chaque module
   - Tests d'intégration
   - Tests E2E pour workflows critiques

5. **Documentation**
   - Swagger pour API
   - README pour chaque module
   - Diagrammes d'architecture
