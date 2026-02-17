# 1Sigma - Plateforme de Trading Tradexa

Plateforme complète de trading avec dashboard utilisateur, panel administrateur, panel trader et landing page.

## 📁 Structure du Projet

```
1Sigma/
├── Tradexa/                    # Application principale (Dashboard + Admin + Trader)
├── Tradexa-Landing/            # Site vitrine/landing page
├── tradexa-trader/             # Panel trader (en développement)
├── tradexa-trader-panel-v2.md  # Documentation du panel trader v2
└── ANALYSIS.md                 # Analyse du projet
```

---

## 🎯 Tradexa/ - Application Principale

**Stack Technique:**
- Next.js 16+ (App Router)
- TypeScript
- TailwindCSS 4
- Zustand 5 (State Management)
- Recharts (Graphiques)
- Framer Motion (Animations)
- Lucide React (Icônes)

### Structure

```
Tradexa/
├── app/
│   ├── (dashboard)/           # Routes utilisateur (dashboard, signaux, broker, etc.)
│   ├── (admin-panel)/         # Routes admin (gestion utilisateurs, traders, revenus, etc.)
│   ├── (trader-panel)/        # Routes trader (signaux, feedback, earnings)
│   └── (landing)/             # Pages publiques (accueil, pricing, etc.)
├── components/                # Composants réutilisables
│   ├── AdminPanel/            # Composants spécifiques admin
│   ├── Badge/
│   ├── Button/
│   ├── Card/
│   ├── Header/
│   ├── Icon/
│   ├── LiveAlertStack/
│   ├── NavLink/
│   ├── Sidebar/
│   └── ... (50+ composants)
├── context/
│   └── LanguageContext.tsx    # Gestion multilingue
├── stores/
│   └── userStore.ts           # Store Zustand pour l'état utilisateur
├── templates/                 # Templates de pages
│   ├── Academy/
│   ├── Broker/
│   ├── Signals/
│   ├── Subscription/
│   └── ...
└── contstants/
    └── navigation.tsx         # Configuration navigation
```

### Rôles et Accès

#### 👤 **Dashboard Utilisateur** (`/dashboard`)
- Tableau de bord personnel
- Signaux de trading
- Académie de formation
- Gestion broker
- Abonnements
- Profil utilisateur

#### 👨‍💼 **Panel Admin** (`/panel/admin`)
- Gestion utilisateurs
- Gestion traders
- Gestion brokers
- Gestion formations
- Statistiques revenus
- Création de traders

#### 📊 **Panel Trader** (`/panel/trader`)
- Dashboard trader
- Création/gestion signaux
- Feedback utilisateurs (anonymisé)
- Statistiques earnings
- Profil trader

**⚠️ CLOISONNEMENT:** Les traders ne voient JAMAIS les noms/emails des utilisateurs, seulement "User #XXXX" et des statistiques anonymes.

---

## 🌐 Tradexa-Landing/ - Site Vitrine

**Stack Technique:**
- Next.js (App Router)
- TypeScript
- TailwindCSS
- Framer Motion

### Pages
- `/` - Accueil
- `/about` - À propos
- `/services` - Services
- `/solution` - Solutions
- `/blog` - Blog
- `/blog/[slug]` - Article de blog
- `/faq` - FAQ
- `/contact` - Contact

**Objectif:** Site marketing pour présenter Tradexa et convertir les visiteurs en utilisateurs.

---

## 🚀 tradexa-trader/ - Panel Trader (En développement)

Panel trader standalone avec les mêmes fonctionnalités que le panel trader intégré dans Tradexa, mais en version indépendante.

**Stack:** Next.js 16+, TailwindCSS 4, Zustand 5, Recharts, Framer Motion, Lucide

**Couleur d'accent:** Emerald/Green (#10B981)

**Pages prévues:**
- Dashboard
- Signals (list/new/[id]/update/close)
- Feedback
- Earnings
- Profile

---

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn ou pnpm

### Installation Tradexa (Application principale)

```bash
cd Tradexa
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### Installation Tradexa-Landing

```bash
cd Tradexa-Landing
npm install
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

### Installation tradexa-trader (En développement)

```bash
cd tradexa-trader
npm install
npm run dev
```

---

## 🎨 Système de Thème

Les applications utilisent un système de thème CSS avec variables personnalisées :

```css
/* globals.css */
:root {
  --background: ...
  --foreground: ...
  --primary: ...
  --secondary: ...
  /* etc. */
}

[data-theme="dark"] {
  /* Variables pour le mode sombre */
}
```

**Mode sombre par défaut** pour le panel trader.

---

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env.local` dans chaque projet :

```env
# Tradexa/.env.local
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
# Ajoutez vos variables ici
```

### TypeScript

Tous les projets utilisent TypeScript avec configuration stricte :
- `tsconfig.json` - Configuration TypeScript
- Type checking automatique

### TailwindCSS

Configuration dans `tailwind.config.ts` avec :
- Couleurs personnalisées
- Thème étendu
- Plugins (typography, forms, etc.)

---

## 📝 Scripts Disponibles

### Tradexa
```bash
npm run dev          # Démarrer en mode développement
npm run build        # Build pour production
npm run start        # Démarrer en production
npm run lint         # Linter le code
npm run type-check   # Vérifier les types TypeScript
```

### Tradexa-Landing
```bash
npm run dev          # Démarrer en mode développement
npm run build        # Build pour production
npm run start        # Démarrer en production
```

---

## 🗂️ Composants Principaux

### Tradexa/components/

- **Badge/** - Badges de statut (success, warning, error, etc.)
- **Button/** - Boutons avec variants (primary, secondary, outline, etc.)
- **Card/** - Cartes pour afficher du contenu
- **Header/** - En-tête de l'application
- **Icon/** - Système d'icônes SVG
- **Sidebar/** - Barre latérale de navigation
- **NavLink/** - Liens de navigation avec état actif
- **LiveAlertStack/** - Stack d'alertes en temps réel
- **AdminPanel/** - Composants spécifiques admin (AdminHeader, AdminSidebar)

---

## 🌍 Internationalisation

Le projet utilise un `LanguageContext` pour gérer le multilingue :

```typescript
// Utilisation
const { language, setLanguage } = useLanguage();
```

Langues supportées : FR, EN (extensible)

---

## 📊 Gestion d'État

### Zustand Store (`stores/userStore.ts`)

```typescript
interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  // ... autres méthodes
}
```

---

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer Tradexa
cd Tradexa
vercel

# Déployer Tradexa-Landing
cd Tradexa-Landing
vercel
```

### Build Manuel

```bash
# Build
npm run build

# Les fichiers de build sont dans .next/
# Déployez le dossier .next/ sur votre serveur
```

---

## 📚 Documentation Additionnelle

- **tradexa-trader-panel-v2.md** - Spécifications détaillées du panel trader v2
- **ANALYSIS.md** - Analyse technique du projet

---

## 🔐 Sécurité

- ✅ Authentification requise pour toutes les routes protégées
- ✅ Séparation stricte des rôles (User/Admin/Trader)
- ✅ Cloisonnement des données trader (pas d'accès aux infos utilisateurs)
- ✅ Variables d'environnement pour les secrets
- ✅ HTTPS en production

---

## 🤝 Contribution

### Workflow Git

```bash
# Créer une branche
git checkout -b feature/ma-feature

# Commiter les changements
git add .
git commit -m "feat: description de la feature"

# Push
git push origin feature/ma-feature
```

### Convention de Commits

- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Documentation
- `style:` - Formatage, style
- `refactor:` - Refactoring
- `test:` - Tests
- `chore:` - Maintenance

---

## 📞 Support

Pour toute question ou problème, consultez la documentation ou créez une issue sur GitHub.

---

## 📄 Licence

Propriétaire - Tous droits réservés

---

## 🎯 Roadmap

- [x] Dashboard utilisateur
- [x] Panel admin
- [x] Panel trader intégré
- [x] Landing page
- [x] Système de signaux
- [x] Gestion broker
- [x] Académie
- [ ] Panel trader standalone (tradexa-trader/)
- [ ] API REST complète
- [ ] Application mobile
- [ ] Notifications push
- [ ] Chat en temps réel

---

**Dernière mise à jour:** Février 2026
**Version:** 1.0.0
**Auteur:** 1Ramzi
