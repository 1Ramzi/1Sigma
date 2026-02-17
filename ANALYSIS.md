# Analyse Complète du Projet 1Sigma / Tradexa

## Vue d'ensemble

Le projet se compose de **2 applications front-end** :

| Projet | Stack | Port/Build | Statut Build |
|--------|-------|------------|--------------|
| **Tradexa** (Dashboard) | Next.js 16.1.6 + React 18 + TailwindCSS 4 + Zustand + Turbopack | `:6587` | ✅ OK (37 pages) |
| **Tradexa-Landing** | Vite 6 + React 18 + TailwindCSS 4 + Framer Motion | SPA statique | ✅ OK |

**Aucun backend n'existe actuellement.** Toutes les données sont mockées côté client.

---

## 1. Tradexa Dashboard

### 1.1 Architecture

```
Tradexa/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (html/body, viewport)
│   ├── providers.tsx       # ThemeProvider + LanguageProvider
│   ├── globals.css         # Styles globaux TailwindCSS 4
│   ├── (dashboard)/        # Route group principal (36 pages)
│   │   ├── layout.tsx      # Dashboard layout (fonts, providers)
│   │   └── [routes]/page.tsx
│   └── (landing)/          # Route group landing (1 page)
├── components/             # 55 composants réutilisables
├── templates/              # 22 templates de pages (logique métier)
├── stores/                 # 3 stores Zustand
├── hooks/                  # 2 custom hooks
├── mocks/                  # 24 fichiers de données mockées
├── data/                   # mockData.ts (types + données centrales)
├── context/                # LanguageContext (i18n FR/EN)
├── lib/                    # i18n.ts + utils.ts
├── contstants/             # navigation.tsx (typo dans le nom du dossier)
├── types/                  # 7 fichiers de types TypeScript
└── public/                 # Assets statiques (images, fonts, icons)
```

### 1.2 Pages (36 routes dashboard + 1 landing)

| Section | Routes | Description |
|---------|--------|-------------|
| Auth | `/login`, `/register`, `/onboarding` | Login/Register avec mock, onboarding multi-étapes |
| Dashboard | `/dashboard` | Vue principale avec KPIs, graphiques, signaux actifs |
| Signals | `/signals`, `/signals/[id]` | Liste de signaux de trading avec filtres, détail signal |
| Academy | `/academy`, `/academy/live` | Modules de formation vidéo, live trading |
| Broker | `/broker` | Page partenaire broker (PuPrime/Axi) avec FAQ |
| Subscription | `/subscription` | Plans d'abonnement |
| Support | `/support` | Tickets + FAQ |
| Shop | `/shop`, `/shop/details` | Marketplace de produits digitaux |
| Products | `/products`, `/products/*` | Gestion produits (CRUD, commentaires, drafts) |
| Income | `/income/earning`, `/income/payouts`, `/income/refunds`, `/income/statements` | Revenus, paiements, remboursements |
| Customers | `/customers`, `/customers/customer-list`, `/customers/customer-list/details` | Gestion clients |
| Messages | `/messages` | Chat/messagerie |
| Notifications | `/notifications` | Centre de notifications |
| Promote | `/promote` | Promotion de produits |
| Settings | `/settings` | Paramètres profil |
| Affiliate | `/affiliate-center` | Centre d'affiliation |
| Explore | `/explore-creators` | Découverte de créateurs |
| Upgrade | `/upgrade-to-pro` | Upgrade plan |
| Terms | `/terms` | CGU |

### 1.3 State Management

**3 stores Zustand** :

- **`userStore.ts`** : Authentification mock (login/register/logout), profil utilisateur, onboarding state
- **`signalStore.ts`** : Signaux de trading, filtres (market/status/direction/search), votes, ajout de signaux
- **`chatStore.ts`** : Channels de chat, messages, channel actif, envoi de messages

**1 Context React** :

- **`LanguageContext.tsx`** : i18n FR/EN avec localStorage persistence, default FR

### 1.4 Composants Clés

| Composant | Rôle |
|-----------|------|
| `Layout` | Wrapper principal (sidebar + header + contenu) |
| `Sidebar` | Navigation latérale avec sections collapsibles |
| `Header` | Barre supérieure avec recherche, notifications, profil |
| `SignalCard` | Carte de signal de trading |
| `Login/AuthForm` | Formulaires d'authentification |
| `Onboarding` | Tutorial multi-étapes post-inscription |
| `LiveAlertStack` | Notifications push en temps réel (simulées) |
| `SideNotification` | Alertes latérales pour nouveaux signaux |
| `Editor` | Éditeur rich text (TipTap) |

### 1.5 Hooks Custom

- **`useDemoActivity`** : Simule l'activité en temps réel (nouveau signal toutes les 15s, message chat toutes les 8s)
- **`useSelection`** : Gestion de sélection multiple dans les listes/tableaux

### 1.6 Données Mockées

Toutes les données sont **statiques et côté client** :

- `data/mockData.ts` : Types centraux (Signal, User, ChatChannel, ChatMessage) + données mock
- `mocks/` : 24 fichiers de données mockées pour chaque section (produits, commentaires, transactions, etc.)

### 1.7 i18n (Internationalisation)

- **2 langues** : Français (défaut) et Anglais
- **~500 clés** de traduction par langue
- Stockage de la préférence dans `localStorage`
- **Bug corrigé** : Clés manquantes en FR pour les sections Filters et DeleteItems (causait un crash `.replace()` sur `undefined`)

### 1.8 Dépendances Principales

| Package | Usage |
|---------|-------|
| `next` 16.1.6 | Framework SSR/SSG (Turbopack) |
| `zustand` 5 | State management |
| `recharts` | Graphiques |
| `framer-motion` | Animations |
| `@headlessui/react` | Composants accessibles (Select, Dialog) |
| `@tiptap/*` | Éditeur rich text |
| `swiper` | Carousels |
| `next-themes` | Dark/Light mode |
| `react-datepicker` | Sélection de dates |
| `lucide-react` | Icônes |
| `sharp` | Optimisation images |

---

## 2. Tradexa-Landing

### 2.1 Architecture

```
Tradexa-Landing/
├── src/
│   ├── App.tsx         # Application complète (385 lignes, SPA monolithique)
│   ├── main.tsx        # Point d'entrée React
│   ├── index.css       # Styles TailwindCSS
│   └── vite-env.d.ts   # Types Vite
├── public/             # Assets statiques
├── index.html          # HTML template
├── vite.config.ts      # Config Vite
└── vercel.json         # Config déploiement (SPA rewrite)
```

### 2.2 Sections de la Landing Page

Tout est dans un seul fichier `App.tsx` (6 composants) :

1. **Navbar** : Navigation fixe avec menu hamburger mobile
2. **Hero** : Titre principal, CTA, badges (7j gratuits, sans engagement)
3. **Stats** : Métriques (3000+ traders, 78% win rate, 50K+ signaux, 24/7 support)
4. **Features** : 4 fonctionnalités clés (signaux IA, gestion risques, win rate, communauté)
5. **Pricing** : 3 plans (Starter $29, Pro $79, Enterprise $199)
6. **CTA** : Call-to-action final
7. **Footer** : Copyright + liens légaux

### 2.3 Dépendances

| Package | Usage |
|---------|-------|
| `react` 18 | UI |
| `framer-motion` | Animations scroll |
| `lucide-react` | Icônes |
| `tailwind-merge` + `clsx` | Utilitaires CSS |
| `react-router-dom` | Routing (installé mais non utilisé) |
| `recharts` | Graphiques (installé mais non utilisé) |
| `zustand` | State management (installé mais non utilisé) |

---

## 3. Problèmes Identifiés

### 3.1 Bugs Corrigés

| Bug | Fichier | Fix |
|-----|---------|-----|
| Build crash `/shop` : `Cannot read properties of undefined (reading 'replace')` | `components/Filters/index.tsx` | Ajout fallback `(t.showResults \|\| '...').replace(...)` |
| Même pattern dans DeleteItems, UnpublishItems, RefundsPage | Multiples fichiers | Ajout fallback sur tous les `.replace()` |
| Clés i18n FR manquantes (Filters, DeleteItems) | `lib/i18n.ts` | Ajout de ~17 clés FR manquantes |
| Next.js 15.2.4 vulnérable bloqué par Vercel | `package.json` | Mise à jour vers Next.js 16.1.6 |
| Turbopack incompatible avec config webpack seule | `next.config.ts` | Ajout `turbopack: {}` dans la config |

### 3.2 Problèmes Structurels

1. **Typo dans le nom du dossier** : `contstants/` au lieu de `constants/`
2. **Aucun backend** : Toute la logique est mockée côté client
3. **Aucune authentification réelle** : Le login accepte n'importe quoi et retourne `mockUsers[0]`
4. **Aucune persistance** : Pas de base de données, pas d'API
5. **Aucune protection de routes** : Pas de middleware d'auth, toutes les pages sont accessibles
6. **Chat non fonctionnel** : Messages simulés localement, pas de WebSocket
7. **Signaux non réels** : Données statiques + simulation aléatoire via `useDemoActivity`
8. **Landing dépendances inutiles** : `react-router-dom`, `recharts`, `zustand` installés mais non utilisés
9. **Landing monolithique** : Tout dans un seul fichier `App.tsx` (385 lignes)
10. **i18n non typé strictement** : `Translations` = `Record<string, string>`, pas de vérification de clés manquantes à la compilation
11. **Encodage UTF-8** : Certains caractères emoji/spéciaux dans `mockData.ts` sont corrompus (lignes 50-77)

### 3.3 Sécurité

- **Aucune variable d'environnement** pour les API keys
- **Aucun CSP** (Content Security Policy) configuré
- **Aucun rate limiting** (pas de backend)
- **localStorage** utilisé pour la langue et potentiellement l'auth (non sécurisé)

---

## 4. Faisabilité Backend via Supabase

### 4.1 Ce que Supabase peut gérer

| Fonctionnalité | Service Supabase | Complexité |
|----------------|-----------------|------------|
| **Auth** (login/register/OAuth) | Supabase Auth | ✅ Facile |
| **Profils utilisateurs** | PostgreSQL + RLS | ✅ Facile |
| **Signaux de trading** | PostgreSQL + Realtime | ✅ Moyen |
| **Chat/Messages** | PostgreSQL + Realtime | ✅ Moyen |
| **Notifications** | PostgreSQL + Edge Functions | ✅ Moyen |
| **Tickets support** | PostgreSQL + RLS | ✅ Facile |
| **Abonnements/Paiements** | Stripe + Edge Functions | ⚠️ Complexe |
| **Upload fichiers** | Supabase Storage | ✅ Facile |
| **Admin panel** | Edge Functions + RLS | ⚠️ Moyen |
| **Signaux en temps réel** | Realtime subscriptions | ✅ Moyen |

### 4.2 Schéma de Base de Données Proposé

```sql
-- Core
users (id, email, username, avatar_url, role, plan, created_at)
profiles (user_id FK, bio, broker_status, broker_id, onboarding_completed)

-- Trading
signals (id, pair, market, direction, entry_price, stop_loss, take_profit, 
         current_price, tp1-tp5, confidence, status, result, created_by FK, 
         created_at, closed_at)
signal_votes (signal_id FK, user_id FK, vote_type)
signal_followers (signal_id FK, user_id FK)

-- Academy
modules (id, title, description, order, xp_reward)
videos (id, module_id FK, title, url, duration, required, order)
user_progress (user_id FK, video_id FK, completed_at)

-- Support
tickets (id, user_id FK, subject, message, category, status, created_at)
ticket_replies (id, ticket_id FK, user_id FK, content, created_at)

-- Chat
channels (id, name, icon)
messages (id, channel_id FK, user_id FK, content, created_at)
message_reactions (message_id FK, user_id FK, emoji)

-- Subscriptions
subscriptions (id, user_id FK, plan, status, stripe_subscription_id, 
              started_at, expires_at)

-- Notifications
notifications (id, user_id FK, type, title, content, read, created_at)
```

### 4.3 Edge Functions Nécessaires

1. **`process-signal`** : Créer/mettre à jour un signal (admin only)
2. **`stripe-webhook`** : Gérer les événements Stripe (paiements, abonnements)
3. **`create-checkout`** : Créer une session Stripe Checkout
4. **`verify-broker`** : Vérifier l'ID broker d'un utilisateur
5. **`send-notification`** : Envoyer des notifications push

### 4.4 Effort Estimé

| Phase | Description | Effort |
|-------|-------------|--------|
| 1. Auth + Profils | Supabase Auth, tables users/profiles, RLS | 2-3 jours |
| 2. Signaux | CRUD signaux, Realtime, votes | 3-4 jours |
| 3. Chat | Channels, messages, Realtime | 2-3 jours |
| 4. Academy | Modules, vidéos, progression | 2-3 jours |
| 5. Support | Tickets, réponses admin | 1-2 jours |
| 6. Paiements | Stripe integration, subscriptions | 3-5 jours |
| 7. Admin | Dashboard admin, gestion signaux | 3-4 jours |
| **Total estimé** | | **16-24 jours** |

---

## 5. Déploiement

### 5.1 Liens de Production (Vercel)

| Projet | URL Vercel | Statut |
|--------|-----------|--------|
| **Dashboard** | https://tradexa-dashboard.vercel.app | ✅ En ligne |
| **Landing** | https://tradexa-landing.vercel.app | ✅ En ligne |

### 5.2 Configuration

- **Dashboard** : `vercel.json` → Next.js 16, région `cdg1` (Paris), Turbopack
- **Landing** : `vercel.json` → Vite SPA, rewrite `/(.*)` → `/index.html`

### 5.3 Domaines Personnalisés (à configurer)

- **Dashboard** : `app.tradexa.com` ou `dashboard.tradexa.com`
- **Landing** : `tradexa.com` ou `www.tradexa.com`

---

## 6. Recommandations Prioritaires

### Court Terme

1. ✅ Fix du build Dashboard (clés i18n FR + fallbacks .replace())
2. ✅ Mise à jour Next.js 15.2.4 → 16.1.6 (vulnérabilité + Turbopack)
3. ✅ Déploiement Dashboard sur Vercel
4. ✅ Déploiement Landing sur Vercel
5. Renommer `contstants/` → `constants/`
3. Supprimer les dépendances inutiles du Landing
4. Ajouter des `<meta>` SEO sur la landing

### Moyen Terme (après déploiement)

1. Intégrer Supabase Auth (remplacer le mock)
2. Créer les tables PostgreSQL pour les signaux
3. Connecter le chat à Supabase Realtime
4. Ajouter la protection de routes (middleware Next.js)

### Long Terme

1. Intégrer Stripe pour les abonnements
2. Créer un panel admin pour gérer les signaux
3. Ajouter des tests (Playwright E2E + Vitest unit)
4. Séparer la Landing en composants propres
5. Ajouter du monitoring (Sentry, analytics)
