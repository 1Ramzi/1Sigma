# Prompt Claude — Panel Trader Tradexa (Cloisonné)

## ⚠️ RÈGLE IMPORTANTE : CLOISONNEMENT TRADER

Le trader **NE VOIT PAS** :
- Où ses signaux sont publiés/affichés
- L'interface utilisateur finale
- Les noms/identités des followers
- Les détails des abonnements des users

Le trader **VOIT UNIQUEMENT** :
- Ses propres signaux et leur statut
- Le **nombre** de personnes qui suivent chaque signal (anonyme)
- Les retours/feedbacks **anonymisés** (ex: "User #4521 a voté 👍")
- Ses stats globales agrégées

---

## 📁 RESSOURCES OBLIGATOIRES

**Tu DOIS suivre la template existante du projet Tradexa :**

```
Tradexa/
├── app/                    # Next.js 15 App Router
├── components/             # 55 composants existants à réutiliser
├── templates/              # 22 templates de pages
├── stores/                 # Zustand stores (userStore, signalStore, chatStore)
├── hooks/                  # Custom hooks existants
├── mocks/                  # Structure des données mockées
├── data/                   # mockData.ts - types et données
├── context/                # LanguageContext (i18n FR/EN)
├── lib/                    # i18n.ts + utils.ts
├── types/                  # Types TypeScript existants
└── public/                 # Assets
```

**Stack identique :**
- Next.js 15.2.4 + React 18
- TailwindCSS 4
- Zustand 5 (state management)
- Recharts (graphiques)
- Framer Motion (animations)
- Headless UI (composants accessibles)
- Lucide React (icônes)
- next-themes (dark/light mode)

**Réutiliser les composants existants :**
- `Layout` → adapter pour TraderLayout
- `Sidebar` → créer TraderSidebar
- `Header` → réutiliser avec modifications
- `SignalCard` → adapter pour vue trader
- Tous les composants UI de base

---

## 🟢 PANEL TRADER — PAGES À DÉVELOPPER

### 1. Dashboard Trader (`/`)

**Stats visibles (agrégées, anonymes) :**
```typescript
interface TraderDashboardStats {
  totalSignals: number;           // Nb total signaux publiés
  activeSignals: number;          // Signaux en cours
  winRate: number;                // % de wins
  totalFollowers: number;         // Nb followers TOTAL (pas de noms)
  avgFollowersPerSignal: number;  // Moyenne followers par signal
  monthlyEarnings: number;        // Revenus du mois
  
  // Graphiques
  performanceLast30Days: { date: string; winRate: number }[];
  followersGrowth: { date: string; count: number }[];
}
```

**Affichage :**
- 4-6 cards KPIs en haut
- Graphique performance 30 jours
- Liste des 5 derniers signaux actifs (preview)
- Notifications récentes (anonymisées)

---

### 2. Nouveau Signal (`/signals/new`)

**Formulaire complet de création :**

```typescript
interface SignalCreateForm {
  // === MARCHÉ ===
  pair: string;                   // Sélecteur avec recherche (EUR/USD, BTC/USDT, GOLD...)
  market: 'forex' | 'crypto' | 'commodities' | 'indices' | 'stocks';
  direction: 'buy' | 'sell';
  
  // === PRIX ===
  entryPrice: number;             // Prix d'entrée (obligatoire)
  currentPrice?: number;          // Prix actuel (auto-fetch ou manuel)
  
  // === RISK MANAGEMENT ===
  stopLoss: number;               // Stop Loss (obligatoire)
  riskRewardRatio?: number;       // Calculé automatiquement
  
  // === TAKE PROFITS (1 obligatoire, 4 optionnels) ===
  takeProfit1: number;            // TP1 (obligatoire)
  takeProfit2?: number;           // TP2
  takeProfit3?: number;           // TP3
  takeProfit4?: number;           // TP4
  takeProfit5?: number;           // TP5
  
  // === ANALYSE ===
  confidence: 'low' | 'medium' | 'high';
  timeframe: '15m' | '1h' | '4h' | 'daily' | 'weekly';
  analysis?: string;              // Texte analyse (optionnel, max 500 chars)
  chartImage?: File;              // Upload screenshot chart
  
  // === OPTIONS ===
  notifyFollowers: boolean;       // Envoyer notif push (défaut: true)
  expiresAt?: Date;               // Expiration auto (optionnel)
  tags?: string[];                // Tags pour organisation perso
}
```

**UI du formulaire :**
- Étape 1 : Sélection paire + marché + direction (avec preview graphique si possible)
- Étape 2 : Prix d'entrée + Stop Loss + Take Profits (avec calcul R:R automatique)
- Étape 3 : Analyse + Confidence + Timeframe + Image
- Étape 4 : Preview finale avant publication

**Validation :**
- Entry price obligatoire
- Stop Loss obligatoire et cohérent avec direction (SL < entry si BUY, SL > entry si SELL)
- Au moins TP1 obligatoire
- TPs doivent être dans le bon ordre (TP1 < TP2 < TP3... si BUY)

---

### 3. Mes Signaux (`/signals`)

**Liste de tous les signaux du trader :**

```typescript
interface TraderSignalView {
  id: string;
  pair: string;
  market: string;
  direction: 'buy' | 'sell';
  entryPrice: number;
  currentPrice: number;
  stopLoss: number;
  takeProfit1: number;
  status: 'active' | 'closed';
  result?: 'win' | 'loss' | 'breakeven';
  createdAt: Date;
  closedAt?: Date;
  
  // Stats ANONYMES
  followersCount: number;         // "47 personnes suivent ce signal"
  upvotes: number;                // Nb de 👍 (pas de noms)
  downvotes: number;              // Nb de 👎 (pas de noms)
  
  // Performance
  currentPL: number;              // P/L actuel en pips
  tpsHit: number[];               // Quels TPs ont été touchés [1, 2]
}
```

**Filtres :**
- Statut : Actifs / Fermés / Tous
- Résultat : Wins / Losses / Breakeven
- Marché : Forex / Crypto / etc.
- Période : Cette semaine / Ce mois / Tout

**Actions par signal :**
- Voir détails
- Mettre à jour (si actif)
- Clôturer (si actif)

---

### 4. Détail Signal (`/signals/[id]`)

**Vue complète d'un signal :**

- Toutes les infos du signal
- Graphique prix (entry, SL, TPs visualisés)
- Timeline des événements (créé, TP1 touché, mis à jour...)
- **Stats anonymes** :
  - "52 personnes suivent ce signal"
  - "38 👍 • 4 👎"
  - Aucun nom, aucune info user

**Actions :**
- Bouton "Mettre à jour"
- Bouton "Clôturer"
- Bouton "Dupliquer" (créer nouveau signal similaire)

---

### 5. Mettre à Jour Signal (`/signals/[id]/update`)

**Formulaire de mise à jour :**

```typescript
interface SignalUpdateForm {
  // Mise à jour prix
  currentPrice?: number;          // Nouveau prix actuel
  
  // Ajustement Risk Management  
  newStopLoss?: number;           // Ajuster SL (trailing stop)
  moveToBreakEven?: boolean;      // Déplacer SL au prix d'entrée
  
  // Take Profits
  tpHit?: 1 | 2 | 3 | 4 | 5;     // Marquer un TP comme atteint
  adjustTp?: {                    // Modifier un TP
    level: 1 | 2 | 3 | 4 | 5;
    newPrice: number;
  };
  
  // Communication
  updateNote?: string;            // Note pour les followers (ex: "TP1 touché, SL au BE")
}
```

**Historique des updates visible sur la page**

---

### 6. Clôturer Signal (`/signals/[id]/close`)

**Formulaire de clôture :**

```typescript
interface SignalCloseForm {
  exitPrice: number;                           // Prix de sortie (obligatoire)
  result: 'win' | 'loss' | 'breakeven';       // Résultat (obligatoire)
  closingNote?: string;                        // Note de clôture
  
  // Calculés automatiquement
  finalPL?: number;                            // P/L final en pips
  duration?: string;                           // Durée du trade
}
```

**Après clôture :**
- Signal passe en statut "closed"
- Stats mises à jour
- Affichage récapitulatif final

---

### 7. Feedback Anonymisé (`/feedback`)

**Vue des retours utilisateurs ANONYMISÉS :**

```typescript
interface AnonymousFeedback {
  signalId: string;
  signalPair: string;
  
  // Feedback anonyme
  odUserId: string;              // "User #4521" (jamais le vrai nom/email)
  odType: 'upvote' | 'downvote' | 'comment';
  comment?: string;              // Si commentaire, texte seulement
  createdAt: Date;
}
```

**Affichage :**
- Liste des feedbacks récents
- "User #7832 a voté 👍 sur EUR/USD"
- "User #2104 a commenté sur BTC/USDT : 'Excellent call!'"
- Filtres par signal, par type, par date

**⚠️ JAMAIS de noms, emails, ou infos identifiables**

---

### 8. Mes Revenus (`/earnings`)

**Stats financières du trader :**

```typescript
interface TraderEarnings {
  totalEarnings: number;          // Total all-time
  monthlyEarnings: number;        // Ce mois
  pendingPayout: number;          // En attente de paiement
  lastPayout: { amount: number; date: Date };
  
  // Historique (anonyme)
  earningsHistory: {
    month: string;
    amount: number;
    signalsCount: number;
    avgPerSignal: number;
  }[];
}
```

**Pas de détail par utilisateur** — seulement des agrégats

---

### 9. Mon Profil (`/profile`)

**Édition profil trader :**

```typescript
interface TraderProfileForm {
  displayName: string;
  bio: string;
  avatar: File;
  socialLinks: {
    twitter?: string;
    telegram?: string;
    discord?: string;
  };
  tradingStyle: string;           // Ex: "Swing Trading", "Scalping"
  preferredMarkets: string[];     // Marchés de prédilection
}
```

---

## 📁 STRUCTURE DU PROJET

```
tradexa-trader/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # Dashboard
│   ├── signals/
│   │   ├── page.tsx              # Liste mes signaux
│   │   ├── new/page.tsx          # Nouveau signal
│   │   └── [id]/
│   │       ├── page.tsx          # Détail signal
│   │       ├── update/page.tsx   # Mettre à jour
│   │       └── close/page.tsx    # Clôturer
│   ├── feedback/page.tsx         # Feedbacks anonymisés
│   ├── earnings/page.tsx         # Mes revenus
│   └── profile/page.tsx          # Mon profil
├── components/
│   ├── layout/
│   │   ├── TraderLayout.tsx
│   │   ├── TraderSidebar.tsx
│   │   └── TraderHeader.tsx
│   ├── signals/
│   │   ├── SignalForm.tsx        # Formulaire création (multi-step)
│   │   ├── SignalUpdateForm.tsx
│   │   ├── SignalCloseForm.tsx
│   │   ├── SignalCard.tsx
│   │   ├── SignalDetail.tsx
│   │   └── PairSelector.tsx      # Sélecteur paire avec search
│   ├── feedback/
│   │   ├── FeedbackList.tsx
│   │   └── AnonymousFeedbackCard.tsx
│   ├── stats/
│   │   ├── StatsCard.tsx
│   │   ├── PerformanceChart.tsx
│   │   └── FollowersChart.tsx
│   └── common/
│       └── [réutiliser depuis template]
├── stores/
│   └── traderStore.ts
├── mocks/
│   ├── traderStats.ts
│   ├── traderSignals.ts
│   └── anonymousFeedback.ts
├── types/
│   └── trader.ts
└── lib/
    └── [réutiliser depuis template]
```

---

## 🎨 DESIGN

- **Couleur accent** : Emerald/Green (#10B981) — succès, trading positif
- **Dark mode** par défaut (comme le dashboard principal)
- **Reprendre tous les styles** de la template Tradexa existante
- **Responsive** : Desktop-first mais fonctionnel sur tablet

---

## 📝 DONNÉES MOCK À CRÉER

```typescript
// mocks/traderStats.ts
export const mockTraderStats: TraderDashboardStats = {
  totalSignals: 156,
  activeSignals: 8,
  winRate: 78.5,
  totalFollowers: 1247,           // Nombre seulement, pas de liste
  avgFollowersPerSignal: 43,
  monthlyEarnings: 3420,
  performanceLast30Days: [...],
  followersGrowth: [...]
};

// mocks/traderSignals.ts
export const mockTraderSignals: TraderSignalView[] = [
  {
    id: "sig_001",
    pair: "EUR/USD",
    market: "forex",
    direction: "buy",
    entryPrice: 1.0850,
    currentPrice: 1.0892,
    stopLoss: 1.0820,
    takeProfit1: 1.0900,
    status: "active",
    followersCount: 47,           // Juste le nombre
    upvotes: 38,
    downvotes: 2,
    currentPL: 42,
    tpsHit: [],
    createdAt: new Date()
  },
  // ...
];

// mocks/anonymousFeedback.ts
export const mockFeedback: AnonymousFeedback[] = [
  {
    signalId: "sig_001",
    signalPair: "EUR/USD",
    odUserId: "User #4521",       // ANONYMISÉ
    type: "upvote",
    createdAt: new Date()
  },
  {
    signalId: "sig_002",
    signalPair: "BTC/USDT",
    odUserId: "User #7832",       // ANONYMISÉ
    type: "comment",
    comment: "Excellent timing sur ce call!",
    createdAt: new Date()
  },
  // ...
];
```

---

## ✅ CHECKLIST DÉVELOPPEMENT

1. [ ] Setup projet Next.js 15 (même config que Tradexa principal)
2. [ ] Copier les composants réutilisables depuis la template
3. [ ] Créer TraderLayout + TraderSidebar
4. [ ] Implémenter Dashboard avec stats mock
5. [ ] **Formulaire création signal** (PRIORITÉ #1)
6. [ ] Liste mes signaux
7. [ ] Détail signal + Update + Close
8. [ ] Feedback anonymisé
9. [ ] Earnings
10. [ ] Profil

---

## ⚠️ RAPPEL CLOISONNEMENT

**À NE JAMAIS AFFICHER AU TRADER :**
- ❌ Noms/emails des utilisateurs
- ❌ Liste des followers (seulement le COUNT)
- ❌ Détails des abonnements
- ❌ Interface utilisateur finale
- ❌ Où le signal est affiché

**À TOUJOURS ANONYMISER :**
- ✅ Feedbacks → "User #XXXX"
- ✅ Votes → Compteurs seulement
- ✅ Commentaires → Texte + "User #XXXX"
- ✅ Stats → Agrégées uniquement
