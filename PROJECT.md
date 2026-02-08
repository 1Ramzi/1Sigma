# SamySignaux - Plateforme de Signaux Trading AI

## 🎯 Vision

Plateforme de signaux de trading propulsés par IA multi-LLM. Convertir des visiteurs en affiliés via une expérience interactive et une communauté engagée.

---

## 🛠 Stack Technique

- **Framework** : React 18 + TypeScript
- **Build** : Vite
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Icônes** : Lucide React
- **State** : Zustand
- **Routing** : React Router v6
- **Charts** : Recharts

---

## 📄 Pages

### 1. Landing (Public)
Page d'accueil pour convertir les visiteurs.

**Sections :**
- Hero avec stats animées
- Comment ça marche (3-4 étapes)
- Aperçu des performances
- Témoignages
- Plans tarifaires
- Footer

### 2. Login / Register
Pages d'authentification.

- Formulaire de connexion
- Formulaire d'inscription
- Mot de passe oublié

### 3. Dashboard (Connecté)
Page principale avec les signaux en temps réel.

**Éléments :**
- Navbar avec navigation + notifications + profil
- Liste des signaux actifs (SignalCard)
- Filtres (marché, statut, direction)
- Stats sidebar (win rate, résultats récents)

### 4. Performance
Statistiques et historique des signaux.

**Éléments :**
- KPIs en haut (win rate, total signaux, profit moyen)
- Graphique de performance (courbe)
- Répartition par marché (pie chart)
- Tableau historique des signaux avec filtres

### 5. Community
Chat communautaire style Discord.

**Éléments :**
- Liste des channels (#général, #analyses, #aide, #wins)
- Zone de chat principale
- Liste des membres en ligne
- Messages avec réactions

### 6. Formation (optionnel)
Section éducation trading.

- Liste des cours
- Player vidéo
- Progress tracker

### 7. Lives (optionnel)
Streaming du trader.

- Player vidéo
- Indicateur LIVE
- Chat en direct
- Planning des lives

---

## 🧩 Composants Principaux

### SignalCard
Carte affichant un signal de trading.

**Contenu :**
- Paire (BTC/USDT, EUR/USD, etc.)
- Direction (BUY/SELL)
- Prix d'entrée, Take Profit, Stop Loss
- Confiance IA (jauge en %)
- Timestamp
- Statut (Actif, Clôturé, Gagnant, Perdant)
- Votes (👍 nombre de followers)
- Commentaires
- Bouton signaler

### Navbar
Navigation principale.

- Logo
- Liens : Signaux | Performances | Formation | Lives | Communauté
- Notifications (bell icon)
- Menu utilisateur

### StatsCounter
Compteur animé pour les statistiques.

### ConfidenceGauge
Jauge circulaire de confiance IA.

### ChatMessage
Message dans le chat avec réactions.

---

## 🗂 Structure des Dossiers

```
src/
├── components/
│   ├── ui/           # Button, Card, Badge, Input, Modal
│   ├── layout/       # Navbar, Sidebar, PageWrapper
│   ├── signals/      # SignalCard, SignalList, SignalFilters
│   ├── social/       # CommentSection, VoteButton
│   ├── chat/         # ChatRoom, ChatMessage, ChannelList
│   └── stats/        # StatsCounter, PerformanceChart
├── pages/
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── Performance.tsx
│   └── Community.tsx
├── stores/           # Zustand stores
├── hooks/            # Custom hooks
├── data/
│   └── mockData.ts   # Données mockées réalistes
├── lib/
│   └── utils.ts
├── styles/
│   └── globals.css
└── App.tsx
```

---

## 📊 Données Mockées

### Signaux
- 20+ signaux variés (Forex, Crypto, Indices)
- Mix de statuts (Actif, Clôturé, Gagnant, Perdant)
- Prix cohérents avec les marchés réels
- Commentaires et votes réalistes

### Utilisateurs
- 10+ users avec avatars
- Rôles : Membre, VIP, Modo, Trader

### Stats globales
- Win rate : ~78%
- Total signaux : 1,247
- Membres actifs : 3,421


---

## 🚀 Commandes

```bash
npm install     # Installation
npm run dev     # Développement
npm run build   # Build production
```

---

## 🌐 Déploiement

- **URL** : https://samysignaux.maloc.jp
- **Serveur** : Nginx (fichiers statiques)
- **SSL** : Let's Encrypt
