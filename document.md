# SamySignaux Project Documentation

## 1. Project Overview
SamySignaux is a trading signals platform built with React, Vite, and Tailwind CSS. It provides users with real-time trading signals, educational content (Academy), and broker integration capabilities. The application features a responsive design, multi-language support (English/French), and a dark/light mode capable UI (currently optimized for a clean light/slate theme).

## 2. Technical Stack
- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Routing:** React Router DOM v7
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript

## 3. Project Structure
```
/src
  /components
    /layout       # Sidebar, TopBar
    /ui           # Reusable UI components (Card, Button, Badge, Toast, etc.)
  /data           # Mock data for signals and users
  /hooks          # Custom hooks (useDemoActivity)
  /lib            # Utilities (cn, i18n)
  /pages          # Application pages
  /stores         # Zustand stores (userStore, signalStore)
  App.tsx         # Main router and layout logic
  main.tsx        # Entry point
```

## 4. Key Features & Pages

### 4.1 Dashboard (`/dashboard`)
- **Header:** Personalized greeting.
- **Video Widget:** "Platform Presentation" video with a tutorial badge.
- **Key Stats:** Active Signals count, Win Rate, Monthly Profit.
- **Broker Card:** Shows connected broker (PuPrime), balance, PnL, and open trades.
- **Quick Actions:** Shortcuts to Signals and Broker pages.

### 4.2 Signals (`/signals`)
- **List View:** Displays active and historical trading signals.
- **Filtering:** Filter by Market (Crypto, Forex, Indices, Commodities) and Search.
- **View Modes:** Toggle between "Active" and "History".
- **Signal Card:**
  - Pair, Direction (BUY/SELL), Status.
  - Confidence meter.
  - Entry Price, Current Price (dynamic coloring), Take Profit, Stop Loss.
  - TP Hit indicators (TP1, TP2).
  - Voting system (Up/Down).

### 4.3 Academy (`/academy`)
- **Course Grid:** List of educational modules.
- **Modules:**
  - Introduction to Trading (Unlocked, 100% progress).
  - Technical Analysis (Unlocked, 35% progress).
  - Trader Psychology (Locked).
  - Advanced Strategies (Locked).
- **UI:** Visual progress bars, lock/unlock states, lesson counts.

### 4.4 Broker (`/broker`)
- **Multi-step Connection:**
  1. Create Account (Link to PuPrime).
  2. Deposit Funds (Confirmation checklist).
  3. Connect ID (Input field).
- **Info Sidebar:** Security and support information.

### 4.5 Onboarding (`/onboarding`)
- **Slides:**
  1. Welcome.
  2. Presentation Video (Mockup).
  3. Signals Feature.
  4. Broker Connection.
  5. Community.
  6. Ready/Finish.
- **Navigation:** Next/Skip functionality, progress bar.

### 4.6 Layout & Navigation
- **Sidebar:**
  - Desktop: Fixed left sidebar.
  - Mobile: Slide-over drawer.
  - Links: Dashboard, Signals Live, Academy.
  - CTA: "Join our Partner" (PuPrime) button.
  - Footer: Language switcher (FR/EN), Logout, User profile.
- **TopBar:**
  - Mobile Menu Trigger.
  - Market Ticker (Infinite scroll).
  - Global Search.
  - Quick Stats/Actions (Signal count, Broker button).
  - User Avatar.

## 5. State Management (Zustand)
- **userStore:** Handles authentication (login/register/logout), user profile, and onboarding status.
- **signalStore:** Manages signals list, filtering logic, and voting.

## 6. Design System
- **Colors:** Primary Indigo/Purple/Slate palette with semantic colors for trading (Emerald for profit/buy, Red for loss/sell).
- **Typography:** Sans-serif (Inter default).
- **Components:** Glassmorphism effects, rounded corners (`rounded-xl`), smooth transitions.
