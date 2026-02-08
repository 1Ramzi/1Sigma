# 🚗 MALOC — Document d'Architecture & Spécifications Techniques

> **Version** : 1.1 — 7 février 2026
> **Auteur** : Architecture technique
> **Statut** : Draft pour validation
> **Lancement cible** : 4 avril 2026

---

## Table des matières

1. [Vue d'ensemble du projet](#1-vue-densemble-du-projet)
2. [Architecture technique recommandée](#2-architecture-technique-recommandée)
3. [Modèle de données](#3-modèle-de-données)
4. [Spécifications fonctionnelles par rôle](#4-spécifications-fonctionnelles-par-rôle)
5. [Workflows détaillés](#5-workflows-détaillés)
6. [Sécurité & conformité](#6-sécurité--conformité)
7. [Roadmap technique](#7-roadmap-technique)
8. [Intégrations tierces](#8-intégrations-tierces)
9. [Review Maloc OS — Points validés](#9-review-maloc-os--points-validés)
10. [Choix techniques argumentés](#10-choix-techniques-argumentés)
11. [Assurance & Risques](#11-assurance--risques)
12. [Scalabilité & Performance](#12-scalabilité--performance)
13. [Sécurité avancée](#13-sécurité-avancée)
14. [Benchmark Airbnb — Leçons appliquées](#14-benchmark-airbnb--leçons-appliquées)

---

## 1. Vue d'ensemble du projet

### 1.1 Résumé

**Maloc** est une plateforme marketplace de location de véhicules haut de gamme — l'équivalent d'Airbnb pour les voitures de luxe. Elle met en relation des **clients** (particuliers et professionnels) avec des **prestataires** (agences de location, loueurs indépendants) à travers une expérience mobile-first sécurisée et entièrement digitalisée.

### 1.2 Vision

- **Phase 1 (Lancement)** : France — 137 agences cibles, avril 2026
- **Phase 2** : Expansion Europe (Espagne, Italie, Allemagne, Suisse, Belgique)
- **Phase 3** : Expansion MENA (Émirats, Arabie Saoudite, Maroc)
- **Phase 4 (Long terme)** : Diversification verticale — immobilier de luxe, yachts, jets privés

### 1.3 Structure juridique

- Holding **SOPARFI** basée au Luxembourg
- Entités opérationnelles par marché

### 1.4 Modèle économique

| Source de revenus | Détail |
|---|---|
| Commission | 10% sur chaque location |
| Abonnement prestataire | 199 €/mois (accès CRM/SaaS complet) |
| Mises en avant payantes | Boost de visibilité véhicules/agences |
| Coupons prestataires | Ventes de coupons promotionnels |

### 1.5 Ressources existantes

- **Figma** : [Maquettes UI/UX](https://www.figma.com/design/bfAXwgPanhBCmypa70nkO4/Maloc)
- **Motion design** : Assets disponibles
- **Tests** : Stratégie de tests exhaustifs prévue sur toutes les features

---

## 2. Architecture technique recommandée

### 2.1 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTS                                   │
│  ┌──────────┐  ┌───────────────┐  ┌──────────────────────┐      │
│  │ Next.js  │  │ React Native  │  │ React Native (iPad)  │      │
│  │ Web App  │  │ Mobile App    │  │ CRM Prestataire      │      │
│  │ (Vercel) │  │ iOS/Android   │  │                      │      │
│  └────┬─────┘  └──────┬────────┘  └──────────┬───────────┘      │
└───────┼────────────────┼─────────────────────┼──────────────────┘
        │                │                     │
        ▼                ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API GATEWAY (Supabase)                         │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌───────────────┐  │
│  │   Auth   │  │ Database │  │ Realtime  │  │ Edge Functions │  │
│  │Google/   │  │ Postgres │  │ WebSocket │  │ (Deno)        │  │
│  │Apple SSO │  │          │  │           │  │               │  │
│  └──────────┘  └──────────┘  └───────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────────────────┘
        │                │                     │
        ▼                ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SERVICES EXTERNES                             │
│  ┌─────────┐ ┌────────┐ ┌──────────┐ ┌─────────┐ ┌──────────┐ │
│  │ Stripe  │ │Cloudfl.│ │ didit.me │ │ClickSen│ │api-ninjas│ │
│  │ Connect │ │   R2   │ │  KYC     │ │  SMS    │ │ Véhicule│ │
│  └─────────┘ └────────┘ └──────────┘ └─────────┘ └──────────┘ │
│  ┌──────────┐ ┌──────────────┐ ┌────────────┐                  │
│  │ Sentry   │ │ Meilisearch  │ │corridor.dev│                  │
│  │Monitoring│ │   Search     │ │  Sécurité  │                  │
│  └──────────┘ └──────────────┘ └────────────┘                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Stack détaillé

| Couche | Technologie | Justification |
|---|---|---|
| **Web App** | Next.js 14+ (App Router) | SSR/SSG, SEO catalogue, performance |
| **Mobile App** | React Native (Expo) | iOS + Android, codebase unique |
| **iPad CRM** | React Native (iPad build) | Exigence projet — CRM tactile pour prestataires |
| **Backend / BaaS** | Supabase | Auth, Postgres, Realtime, Edge Functions, Storage |
| **Base de données** | PostgreSQL (via Supabase) | ACID, RLS (Row Level Security), JSON, PostGIS |
| **Paiements** | Stripe Connect (Custom) | Marketplace multi-vendeurs, split payments, cautions |
| **Stockage média** | Cloudflare R2 (Europe) | S3-compatible, pas de frais d'egress, conformité RGPD |
| **Vérification identité** | didit.me | KYC/KYB, vérification documents |
| **SMS** | ClickSend | Notifications SMS, OTP |
| **Données véhicules** | api-ninjas.com | Specs techniques véhicules (auto-complétion) |
| **Recherche** | Meilisearch (self-hosted) | Recherche instantanée, facettes, géo-search |
| **Monitoring** | Sentry | Crash reporting, performance monitoring |
| **Sécurité** | corridor.dev | Audit sécurité, pen-testing |
| **CI/CD** | GitHub Actions | Tests auto, déploiement continu |
| **Hébergement web** | Vercel | Edge network, preview deployments |
| **IA (Maloc OS)** | OpenAI API / Anthropic | Comparaison photos, génération stories, analyse données |

### 2.3 Recommandations d'architecte

> **🏗 PostGIS** : Activer l'extension PostGIS dans Supabase pour la géolocalisation des photos et la recherche géographique de véhicules.

> **🏗 Stripe Connect Custom** : Indispensable pour le modèle marketplace — permet de gérer les comptes connectés prestataires, le split payment (90/10), les cautions (via PaymentIntents avec capture différée), et les reversements automatiques.

> **🏗 Supabase Realtime** : Utiliser les channels Realtime pour la messagerie in-app et les notifications en temps réel (statut réservation, litiges).

> **🏗 Edge Functions** : Toute logique métier sensible (vérification blacklist, calcul paiement, webhooks Stripe) doit passer par des Edge Functions Supabase (Deno) — jamais côté client.

> **🏗 Meilisearch vs Algolia** : Recommandation Meilisearch self-hosted sur un VPS européen pour le contrôle des données et l'absence de coûts à l'usage. Algolia en fallback si les performances de recherche ne suffisent pas.

> **🏗 Queue système** : Intégrer pg_cron + pgmq (Supabase) ou un service comme Trigger.dev pour les tâches asynchrones (envoi emails, génération PDF contrats, comparaison IA photos).

---

## 3. Modèle de données

### 3.1 Diagramme relationnel (simplifié)

```
users ──────────┐
                │ 1:1
                ▼
         user_profiles
                │
    ┌───────────┼───────────────┐
    │           │               │
    ▼           ▼               ▼
providers   reservations    conversations
    │           │               │
    ▼           │               ▼
vehicles        │           messages
    │           │               │
    ▼           ▼               ▼
photos      transactions     photos
    │
    ▼
reviews
```

### 3.2 Schéma détaillé des tables

#### `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('client', 'provider', 'admin')),
  auth_provider TEXT CHECK (auth_provider IN ('google', 'apple', 'email')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'banned')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_login_at TIMESTAMPTZ,
  last_login_ip INET
);
```

#### `user_profiles`
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  avatar_url TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'FR',
  -- Vérification identité
  verification_status TEXT DEFAULT 'unverified'
    CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected')),
  verification_type TEXT CHECK (verification_type IN ('personal', 'professional')),
  didit_verification_id TEXT,
  -- Documents (personal: CNI + permis + justif domicile / pro: KBIS + CNI + permis)
  id_document_url TEXT,
  drivers_license_url TEXT,
  proof_of_address_url TEXT,   -- perso uniquement
  kbis_url TEXT,                -- pro uniquement
  -- Stripe
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### `providers`
```sql
CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  company_name TEXT NOT NULL,
  siret TEXT,
  -- Page vitrine
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  cover_url TEXT,
  theme_color TEXT DEFAULT '#000000',
  custom_config JSONB DEFAULT '{}',
  -- Stripe Connect
  stripe_account_id TEXT,
  stripe_onboarding_complete BOOLEAN DEFAULT false,
  -- Abonnement
  subscription_status TEXT DEFAULT 'inactive'
    CHECK (subscription_status IN ('inactive', 'active', 'past_due', 'cancelled')),
  subscription_started_at TIMESTAMPTZ,
  -- Stats
  rating_average NUMERIC(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  total_rentals INTEGER DEFAULT 0,
  -- Admin
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES users(id),
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'suspended', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### `vehicles`
```sql
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  -- Infos véhicule
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'berline', 'suv', 'sportive', 'cabriolet', 'supercar',
    'hypercar', 'limousine', 'van', 'utilitaire', 'autre'
  )),
  fuel_type TEXT CHECK (fuel_type IN ('essence', 'diesel', 'hybride', 'electrique')),
  transmission TEXT CHECK (transmission IN ('manuelle', 'automatique')),
  seats INTEGER,
  doors INTEGER,
  horsepower INTEGER,
  color TEXT,
  license_plate TEXT,
  vin TEXT,
  mileage INTEGER,
  -- Location
  daily_rate_cents INTEGER NOT NULL,
  deposit_amount_cents INTEGER NOT NULL,
  min_rental_days INTEGER DEFAULT 1,
  max_rental_days INTEGER DEFAULT 30,
  -- Localisation
  location_address TEXT,
  location_city TEXT,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  -- Disponibilité
  is_available BOOLEAN DEFAULT true,
  available_from DATE,
  available_to DATE,
  -- Modération
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  validated_by UUID REFERENCES users(id),
  validated_at TIMESTAMPTZ,
  -- Mise en avant
  is_featured BOOLEAN DEFAULT false,
  featured_until TIMESTAMPTZ,
  -- Source
  is_supplier_vehicle BOOLEAN DEFAULT false, -- véhicule du catalogue fournisseur Maloc
  supplier_vehicle_id UUID,
  -- Metadata (données api-ninjas)
  specs_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index géographique
CREATE INDEX idx_vehicles_location ON vehicles
  USING GIST (ST_MakePoint(location_lng, location_lat));
```

#### `vehicle_photos`
```sql
CREATE TABLE vehicle_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  storage_key TEXT NOT NULL, -- clé Cloudflare R2
  position INTEGER DEFAULT 0,
  is_cover BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### `reservations`
```sql
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT UNIQUE NOT NULL, -- ex: MAL-2026-XXXX
  client_id UUID REFERENCES users(id),
  provider_id UUID REFERENCES providers(id),
  vehicle_id UUID REFERENCES vehicles(id),
  -- Dates
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  pickup_time TIME,
  return_time TIME,
  -- Montants
  daily_rate_cents INTEGER NOT NULL,
  total_days INTEGER NOT NULL,
  subtotal_cents INTEGER NOT NULL,
  commission_cents INTEGER NOT NULL, -- 10%
  deposit_amount_cents INTEGER NOT NULL,
  total_cents INTEGER NOT NULL,
  extra_charges_cents INTEGER DEFAULT 0,
  -- Statut
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',        -- en attente d'acceptation loueur
    'accepted',       -- accepté par le loueur
    'deposit_held',   -- caution préautorisée
    'in_progress',    -- location en cours (après signature)
    'return_pending', -- retour en attente de vérification
    'completed',      -- terminé
    'disputed',       -- litige en cours
    'cancelled',      -- annulé
    'refunded'        -- remboursé
  )),
  -- Stripe
  stripe_payment_intent_id TEXT,
  stripe_deposit_intent_id TEXT,
  -- Signature
  contract_url TEXT,
  client_signed_at TIMESTAMPTZ,
  provider_signed_at TIMESTAMPTZ,
  -- Timestamps
  accepted_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  cancelled_by UUID REFERENCES users(id),
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### `reservation_photos`
```sql
CREATE TABLE reservation_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id UUID REFERENCES reservations(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES users(id),
  phase TEXT NOT NULL CHECK (phase IN (
    'departure_provider', -- photos loueur au départ
    'departure_client',   -- photos client au départ
    'return_client',      -- photos client au retour
    'return_provider',    -- photos loueur au retour (vérification)
    'damage'              -- photos dommages
  )),
  url TEXT NOT NULL,
  storage_key TEXT NOT NULL,
  -- Géolocalisation + horodatage
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  taken_at TIMESTAMPTZ NOT NULL,
  device_timestamp TIMESTAMPTZ,
  -- Comparaison IA
  ai_comparison_result JSONB,
  ai_damage_detected BOOLEAN,
  ai_confidence_score NUMERIC(5,4),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### `conversations`
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id UUID REFERENCES reservations(id),
  type TEXT DEFAULT 'reservation' CHECK (type IN ('reservation', 'support', 'dispute')),
  -- Participants
  client_id UUID REFERENCES users(id),
  provider_id UUID REFERENCES providers(id),
  admin_id UUID REFERENCES users(id), -- rejoint en cas de litige
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### `messages`
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id),
  content TEXT,
  type TEXT DEFAULT 'text' CHECK (type IN (
    'text', 'image', 'photo_set', 'contract', 'system', 'dispute'
  )),
  metadata JSONB DEFAULT '{}', -- ex: photo_ids, contract_url
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### `reviews`
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id UUID REFERENCES reservations(id) UNIQUE,
  reviewer_id UUID REFERENCES users(id),
  reviewed_provider_id UUID REFERENCES providers(id),
  reviewed_vehicle_id UUID REFERENCES vehicles(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  -- Modération prestataire (avec/sans abo)
  provider_response TEXT,
  provider_responded_at TIMESTAMPTZ,
  is_visible BOOLEAN DEFAULT true,
  -- Admin
  flagged BOOLEAN DEFAULT false,
  flagged_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### `blacklists`
```sql
CREATE TABLE blacklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('client', 'supplier')),
  -- Cible
  blocked_user_id UUID REFERENCES users(id),
  blocked_provider_id UUID REFERENCES providers(id),
  reason TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### `balances`
```sql
CREATE TABLE balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id) UNIQUE,
  owner_type TEXT NOT NULL CHECK (owner_type IN ('client', 'provider')),
  available_cents INTEGER DEFAULT 0,
  pending_cents INTEGER DEFAULT 0,
  currency TEXT DEFAULT 'EUR',
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### `transactions`
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  balance_id UUID REFERENCES balances(id),
  reservation_id UUID REFERENCES reservations(id),
  type TEXT NOT NULL CHECK (type IN (
    'rental_payment',     -- paiement location
    'deposit_hold',       -- préautorisation caution
    'deposit_release',    -- libération caution
    'deposit_charge',     -- prélèvement sur caution (dommages)
    'commission',         -- commission Maloc (10%)
    'provider_payout',    -- reversement prestataire
    'withdrawal',         -- retrait vers compte bancaire
    'coupon_credit',      -- crédit coupon
    'refund',             -- remboursement
    'subscription',       -- abonnement prestataire
    'featured_payment',   -- paiement mise en avant
    'extra_charge'        -- frais supplémentaires
  )),
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  stripe_transfer_id TEXT,
  stripe_payout_id TEXT,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### `coupons`
```sql
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('client', 'provider')),
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount')),
  discount_value INTEGER NOT NULL, -- pourcentage ou centimes
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  min_order_cents INTEGER DEFAULT 0,
  -- Validité
  valid_from TIMESTAMPTZ DEFAULT now(),
  valid_until TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  -- Origine
  created_by UUID REFERENCES users(id), -- admin
  provider_id UUID REFERENCES providers(id), -- si coupon prestataire
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### `coupon_usages`
```sql
CREATE TABLE coupon_usages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID REFERENCES coupons(id),
  user_id UUID REFERENCES users(id),
  reservation_id UUID REFERENCES reservations(id),
  discount_applied_cents INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### `subscriptions`
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id) UNIQUE,
  plan TEXT DEFAULT 'standard' CHECK (plan IN ('standard')), -- 199€/mois
  price_cents INTEGER DEFAULT 19900,
  stripe_subscription_id TEXT,
  status TEXT DEFAULT 'inactive' CHECK (status IN (
    'inactive', 'trialing', 'active', 'past_due', 'cancelled', 'unpaid'
  )),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### `contracts`
```sql
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id UUID REFERENCES reservations(id),
  provider_id UUID REFERENCES providers(id),
  -- Template
  template_id UUID REFERENCES contract_templates(id),
  -- Contenu généré
  content_html TEXT,
  pdf_url TEXT,
  pdf_storage_key TEXT,
  -- Signatures
  client_signature_url TEXT,
  provider_signature_url TEXT,
  client_signed_at TIMESTAMPTZ,
  provider_signed_at TIMESTAMPTZ,
  client_ip INET,
  provider_ip INET,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending_signatures', 'signed', 'voided')),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### `contract_templates`
```sql
CREATE TABLE contract_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id), -- NULL = template Maloc global
  name TEXT NOT NULL,
  content_template TEXT NOT NULL, -- HTML avec variables {{client_name}}, etc.
  is_default BOOLEAN DEFAULT false,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### `disputes`
```sql
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id UUID REFERENCES reservations(id) UNIQUE,
  conversation_id UUID REFERENCES conversations(id),
  opened_by UUID REFERENCES users(id),
  assigned_admin UUID REFERENCES users(id),
  reason TEXT NOT NULL,
  -- Résolution
  resolution_type TEXT CHECK (resolution_type IN (
    'provider_compensation',  -- dédommagement loueur
    'maloc_gesture',          -- geste commercial Maloc
    'client_refund',          -- remboursement client
    'no_action'               -- pas d'action
  )),
  resolution_amount_cents INTEGER,
  resolution_notes TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'escalated')),
  opened_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);
```

#### `favorites`
```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, vehicle_id)
);
```

#### `featured_listings`
```sql
CREATE TABLE featured_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id),
  vehicle_id UUID REFERENCES vehicles(id),
  type TEXT NOT NULL CHECK (type IN ('vehicle_boost', 'provider_highlight', 'homepage_banner')),
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  amount_paid_cents INTEGER NOT NULL,
  stripe_payment_id TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### `supplier_vehicles` (catalogue fournisseur Maloc)
```sql
CREATE TABLE supplier_vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  category TEXT,
  suggested_daily_rate_cents INTEGER,
  specs_data JSONB DEFAULT '{}',
  is_available BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id), -- admin
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### `logs`
```sql
CREATE TABLE logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT, -- 'reservation', 'vehicle', 'user', etc.
  entity_id UUID,
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Partition par mois pour performance
CREATE INDEX idx_logs_user_created ON logs(user_id, created_at DESC);
CREATE INDEX idx_logs_entity ON logs(entity_type, entity_id);
```

#### `notifications`
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'reservation_accepted', 'new_message', 'dispute_opened', etc.
  title TEXT NOT NULL,
  body TEXT,
  data JSONB DEFAULT '{}',
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### `admin_settings`
```sql
CREATE TABLE admin_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMPTZ DEFAULT now()
);
-- Exemples : maintenance_mode, commission_rate, etc.
```

### 3.3 Row Level Security (RLS)

> **🏗 Recommandation** : Toutes les tables doivent avoir des politiques RLS activées dans Supabase. Exemples critiques :

```sql
-- Les clients ne voient que leurs propres réservations
CREATE POLICY "clients_own_reservations" ON reservations
  FOR SELECT USING (auth.uid() = client_id);

-- Les prestataires ne voient que les réservations de leurs véhicules
CREATE POLICY "providers_own_reservations" ON reservations
  FOR SELECT USING (
    provider_id IN (SELECT id FROM providers WHERE user_id = auth.uid())
  );

-- Les admins voient tout
CREATE POLICY "admin_full_access" ON reservations
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );
```

---

## 4. Spécifications fonctionnelles par rôle

### 4.1 Client (Utilisateur)

#### 4.1.1 Authentification & Inscription
- **Sign in** : Google OAuth / Apple Sign In
- **Vérification d'identité obligatoire** (via didit.me) :
  - **Particulier** : CNI + Permis de conduire + Justificatif de domicile
  - **Professionnel** : KBIS + CNI + Permis de conduire
- Statut de vérification visible dans le profil
- Profil modifiable (soumis à re-validation admin pour changements sensibles)

#### 4.1.2 Catalogue & Recherche
- Parcourir le catalogue de véhicules disponibles
- Recherche par : ville, dates, catégorie, prix, marque, modèle
- Filtres avancés : transmission, carburant, nombre de places, prix min/max
- Tri : prix, popularité, note, distance
- Recherche géolocalisée (PostGIS)
- Recherche full-text instantanée (Meilisearch)

#### 4.1.3 Réservation
- Sélection véhicule + dates + options
- Visualisation du prix détaillé (sous-total, commission, caution)
- Demande de réservation → attente acceptation loueur
- Annulation possible (selon politique d'annulation)
- Historique complet des réservations

#### 4.1.4 Paiement
- Ajout/gestion cartes bancaires (Stripe Elements)
- Empreinte bancaire (location + caution) à la réservation
- Débit automatique au début de la location
- Suivi des transactions dans la balance
- Coupons cadeaux applicables

#### 4.1.5 Messagerie
- Conversation temps réel avec le prestataire (Supabase Realtime)
- Envoi de texte, photos
- Réception des photos du véhicule (départ/retour)
- Notifications push

#### 4.1.6 Favoris
- Ajouter/retirer des véhicules en favoris
- Liste de favoris consultable

#### 4.1.7 Avis
- Laisser un avis + note (1-5 étoiles) après une location terminée
- Consultation des avis sur les prestataires et véhicules

#### 4.1.8 Balance & Coupons
- Solde de balance consultable
- Crédit via coupons cadeaux
- Utilisation du solde lors des paiements

#### 4.1.9 Processus de location (côté client)
- **Départ** : Recevoir les photos du loueur → Prendre ses propres photos → Signer le contrat électroniquement
- **Retour** : Prendre les photos de retour → Attendre validation loueur

#### 4.1.10 Logs
- Historique complet des actions : connexions, réservations, paiements, modifications profil
- Accessible dans les paramètres du compte

---

### 4.2 Prestataire (Loueur)

> Le prestataire dispose d'un **CRM/SaaS complet**, accessible sur **web et iPad**.

#### 4.2.1 Onboarding
- Demande d'inscription en tant que prestataire
- Soumission des documents (KBIS, assurances, etc.)
- Validation par l'admin Maloc
- Onboarding Stripe Connect (compte connecté)
- Activation de l'abonnement 199€/mois

#### 4.2.2 Gestion de flotte
- Ajout de véhicules (formulaire enrichi par api-ninjas.com)
- Upload photos véhicules (stockage Cloudflare R2)
- Modification/suppression véhicules
- Gestion de la disponibilité (calendrier)
- Import depuis le catalogue fournisseur Maloc (véhicules pré-référencés)
- Statut de validation par l'admin

#### 4.2.3 Page vitrine configurable
- Slug personnalisé (`maloc.com/agence/mon-agence`)
- Personnalisation : logo, couverture, description, couleur de thème
- Configuration libre via JSON (custom_config)
- Affichage des véhicules, avis, informations de contact

#### 4.2.4 Gestion des réservations
- Vue liste + calendrier des réservations
- Accepter / refuser une demande
- Vérification automatique blacklist client
- Suivi du statut en temps réel
- Gestion des retours et vérification photos

#### 4.2.5 Facturation & Comptabilité
- Tableau de bord financier
- Historique des transactions
- Suivi commissions Maloc (10%)
- Export comptable (CSV/PDF)
- Factures automatiques

#### 4.2.6 Messagerie
- Conversations avec les clients (Supabase Realtime)
- Envoi de photos géolocalisées + horodatées
- Notifications push

#### 4.2.7 Blacklist
- **Blacklist clients** : bloquer un client problématique
- **Blacklist fournisseurs** : bloquer un fournisseur de véhicules
- Flagging automatique lors des nouvelles réservations

#### 4.2.8 Avis
- Consultation des avis reçus
- Réponse aux avis (fonctionnalité liée à l'abonnement actif)
- Signalement d'avis abusifs

#### 4.2.9 Signature électronique & Contrats
- **Générateur de contrats** : templates personnalisables avec variables dynamiques
- Signature électronique intégrée (canvas signature)
- Génération PDF automatique
- Stockage sécurisé (Cloudflare R2)
- Contrat complet : identités, véhicule, dates, conditions, photos, signatures, IP, horodatage

#### 4.2.10 Maloc OS (Intelligence Artificielle)
- **Générateur de stories** : création automatique de contenus pour réseaux sociaux à partir des photos véhicules
- **Analyse de données** : insights sur les performances (taux d'occupation, revenus, tendances)
- **Bot WhatsApp SAV** : assistant automatique pour le support client du prestataire

> **🏗 Recommandation** : Implémenter Maloc OS comme un module séparé avec une API interne. Utiliser OpenAI GPT-4o pour la génération de contenus et l'analyse, et l'API WhatsApp Business pour le bot SAV.

#### 4.2.11 Mises en avant payantes
- Boost de véhicules (position premium dans les résultats)
- Mise en avant de l'agence (highlight sur la homepage)
- Bannière homepage
- Durées et tarifs configurables par l'admin

#### 4.2.12 Balance & Retraits
- Solde de balance consultable (revenus - commissions)
- Reversement automatique après chaque location
- Retrait vers compte bancaire sous 24-48h (via Stripe Payouts)
- Coupons prestataires utilisables

#### 4.2.13 Abonnement
- Plan unique : **199€/mois**
- Paiement récurrent via Stripe Subscriptions
- Gestion du renouvellement, annulation
- Fonctionnalités liées à l'abonnement actif (réponse aux avis, Maloc OS, etc.)

#### 4.2.14 Espace fournisseur
- Accès au catalogue de véhicules Maloc (véhicules mis à disposition par la plateforme)
- Import rapide dans sa flotte

#### 4.2.15 iPad CRM
- Build React Native dédié iPad
- Interface optimisée tactile
- Toutes les fonctionnalités CRM accessibles
- Mode paysage privilégié

#### 4.2.16 Logs
- Historique complet de toutes les actions
- Logs d'accès, modifications, transactions

---

### 4.3 Admin

#### 4.3.1 Dashboard statistiques
- Nombre de réservations (jour/semaine/mois)
- Revenus et commissions
- Nombre d'utilisateurs / prestataires actifs
- Véhicules en ligne
- Taux de conversion
- Litiges en cours
- Graphiques et KPIs

#### 4.3.2 Gestion des demandes agences
- Liste des demandes d'inscription prestataire
- Revue des documents soumis
- Approuver / rejeter avec motif
- Historique des décisions

#### 4.3.3 Gestion utilisateurs & prestataires
- Liste complète avec recherche/filtres
- Actions : **ban**, **block**, **reset**, **suspendre**
- Consultation des **logs complets** par utilisateur
- Validation des modifications de profil
- Reset de mot de passe / vérification

#### 4.3.4 Validation véhicules
- File d'attente des véhicules soumis
- Vérification des informations et photos
- Approuver / rejeter avec commentaire

#### 4.3.5 Gestion paiements & réservations
- Vue globale de toutes les réservations
- Intervention sur les paiements (remboursements, ajustements)
- Suivi des cautions en cours
- Gestion des reversements

#### 4.3.6 Catalogue fournisseur
- CRUD du catalogue de véhicules Maloc (supplier_vehicles)
- Mise à disposition pour les prestataires

#### 4.3.7 Mode maintenance
- Activation/désactivation du mode maintenance
- Message personnalisable
- Accès admin maintenu pendant la maintenance

#### 4.3.8 Générateur de coupons
- Création de coupons **clients** (cadeaux, promos)
- Création de coupons **prestataires** (réductions abonnement, crédits)
- Paramètres : type de réduction, montant, validité, nombre max d'utilisations
- Suivi d'utilisation

#### 4.3.9 Générateur de contrats
- Création/édition de templates de contrats globaux
- Variables dynamiques disponibles
- Preview PDF

#### 4.3.10 Gestion des litiges
- Vue des litiges ouverts
- Rejoindre la conversation du litige
- Arbre de décision :
  1. **Dédommagement loueur** : indemnisation au prestataire
  2. **Geste commercial Maloc** : crédit/avoir pour le client
  3. **Remboursement client** : remboursement partiel ou total
- Clôture du litige avec notes

---

## 5. Workflows détaillés

### 5.1 Workflow de réservation

```
Client                      Système                     Prestataire
  │                           │                              │
  ├─ Recherche véhicule ─────►│                              │
  ├─ Sélectionne dates ──────►│                              │
  ├─ Demande réservation ────►│                              │
  │                           ├─ Vérifie identité client ───►│
  │                           ├─ Check blacklist ────────────►│
  │                           ├─ Notifie prestataire ────────►│
  │                           │                              ├─ Accepte/Refuse
  │                           │◄─────── Réponse ─────────────┤
  │◄── Notification ──────────┤                              │
  │    (accepté/refusé)       │                              │
  │                           │                              │
  │ [Si accepté]              │                              │
  ├─ Empreinte bancaire ─────►│                              │
  │   (location + caution)    ├─ Stripe: PaymentIntent ─────►│
  │                           ├─ Stripe: SetupIntent ────────►│ (caution)
  │◄── Confirmation ──────────┤                              │
  │                           │                              │
```

### 5.2 Workflow de départ

```
Prestataire                  Système                     Client
  │                           │                              │
  ├─ Prend photos véhicule ──►│                              │
  │  (géoloc + horodatage)    ├─ Stocke R2 ─────────────────│
  │                           ├─ Envoie dans conversation ──►│
  │                           │                              │
  │                           │◄── Prend ses photos ─────────┤
  │                           │    (géoloc + horodatage)     │
  │                           ├─ Stocke R2                   │
  │                           │                              │
  │                           ├─ Génère contrat PDF ─────────│
  │                           │  (identités, véhicule,       │
  │                           │   dates, conditions, photos) │
  │                           │                              │
  │◄── Signature électronique─┤──Signature électronique ────►│
  │    (IP + horodatage)      │  (IP + horodatage)           │
  │                           │                              │
  │                           ├─ Débit location ─────────────│
  │                           ├─ Hold caution ───────────────│
  │                           │                              │
  │                           ├─ Statut: IN_PROGRESS ────────│
  │                           │                              │
  ═══════════ DÉPART DU VÉHICULE ═══════════════════════════
```

### 5.3 Workflow de retour

```
Client                       Système                     Prestataire
  │                           │                              │
  ├─ Prend photos retour ────►│                              │
  │  (géoloc + horodatage)    ├─ Stocke R2                   │
  │                           ├─ Notifie prestataire ────────►│
  │                           │                              │
  │                           │                              ├─ Vérifie véhicule
  │                           │                              ├─ Prend photos si dommages
  │                           │                              │
  │                           ├─ Comparaison IA ─────────────│
  │                           │  (photos départ vs retour)   │
  │                           │                              │
  │ [Si pas de dommage]       │                              │
  │                           ├─ Libère caution ─────────────│
  │                           ├─ Reverse au prestataire ─────►│
  │                           │  (montant - 10% commission)  │
  │                           ├─ Statut: COMPLETED           │
  │                           │                              │
  │ [Si dommage détecté]      │                              │
  │                           ├─ Statut: DISPUTED ───────────│
  │                           ├─ → Workflow litige            │
```

### 5.4 Workflow de paiement

```
┌─────────────────────────────────────────────────────────┐
│                   FLUX FINANCIER                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. RÉSERVATION ACCEPTÉE                                │
│     └─ Stripe PaymentIntent (location) → authorized     │
│     └─ Stripe PaymentIntent (caution) → authorized      │
│                                                          │
│  2. DÉPART (signatures OK)                              │
│     └─ Capture PaymentIntent location → débité          │
│     └─ Caution reste en hold                            │
│                                                          │
│  3. RETOUR (sans dommage)                               │
│     └─ Cancel caution PaymentIntent → libérée           │
│     └─ Calcul : montant_location - 10% commission       │
│     └─ Stripe Transfer → compte prestataire             │
│                                                          │
│  3b. RETOUR (avec dommages/extras)                      │
│     └─ Capture partielle/totale caution                 │
│     └─ Montant dommages prélevé sur caution             │
│     └─ Reste caution → libéré                           │
│     └─ Transfer prestataire (location + dommages - 10%) │
│                                                          │
│  4. RETRAIT PRESTATAIRE                                 │
│     └─ Stripe Payout → compte bancaire                  │
│     └─ Délai : 24 à 48h                                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 5.5 Workflow de litige

```
Client/Prestataire           Système                     Admin
  │                           │                              │
  ├─ Bouton "Ouvrir litige" ─►│                              │
  │                           ├─ Crée dispute ───────────────│
  │                           ├─ Gèle caution ──────────────│
  │                           ├─ Notifie admin ─────────────►│
  │                           │                              │
  │                           │                              ├─ Rejoint conversation
  │◄── Discussion 3 parties ──┤──────────────────────────────┤
  │                           │                              │
  │                           │                              ├─ Examine preuves
  │                           │                              │  (photos, contrat, logs)
  │                           │                              │
  │                           │         ARBRE DE DÉCISION    │
  │                           │         ┌────────────────────┤
  │                           │         │                    │
  │                           │    ┌────┴────┐ ┌────┴─────┐ ┌────┴──────┐
  │                           │    │Dédomm.  │ │Geste     │ │Rembours.  │
  │                           │    │loueur   │ │Maloc     │ │client     │
  │                           │    └────┬────┘ └────┬─────┘ └────┬──────┘
  │                           │         │           │            │
  │                           │    Capture     Crédit        Refund
  │                           │    caution →   balance →     Stripe →
  │                           │    prestataire client        client
  │                           │                              │
  │                           ├─ Clôture litige ─────────────┤
  │◄── Notification résultat ─┤                              │
```

---

## 6. Sécurité & Conformité

### 6.1 Conformité RGPD

| Exigence | Implémentation |
|---|---|
| **Consentement** | Opt-in explicite à l'inscription, gestion des préférences cookies |
| **Droit d'accès** | Export des données personnelles (JSONB) via le profil |
| **Droit à l'effacement** | Suppression de compte avec anonymisation des données liées |
| **Portabilité** | Export au format standard (JSON/CSV) |
| **Minimisation** | Collecte uniquement des données nécessaires |
| **Localisation** | Stockage exclusivement en Europe (Supabase EU, Cloudflare R2 EU) |
| **DPO** | Désigner un DPO (obligatoire vu le volume de données sensibles) |
| **Registre des traitements** | Documenter tous les traitements de données personnelles |
| **Sous-traitants** | DPA (Data Processing Agreement) avec Supabase, Stripe, Cloudflare, didit.me |

### 6.2 Sécurité des preuves

| Mesure | Détail |
|---|---|
| **Photos géolocalisées** | Latitude + longitude embarquées dans les métadonnées (EXIF vérifié côté serveur) |
| **Horodatage** | Timestamp serveur systématique (non modifiable côté client) |
| **Comparaison IA** | Analyse automatique départ vs retour — détection de dommages |
| **Contrat PDF** | Généré côté serveur, signé électroniquement, stocké en immutable |
| **Stockage Cloudflare R2** | Région Europe, versioning activé, pas de suppression soft |

### 6.3 Logs & Traçabilité

- **Logs IP** : chaque action authentifiée enregistre l'adresse IP
- **Logs utilisateur** : historique complet (connexions, actions, modifications)
- **Logs prestataire** : idem + actions CRM
- **Logs admin** : toutes les actions d'administration traçées
- **Session tracking** : identifiant de session pour regrouper les actions
- **User agent** : enregistrement du device/navigateur
- **Rétention** : 5 ans minimum (exigence légale location de véhicules)

### 6.4 Sécurité applicative

| Couche | Mesure |
|---|---|
| **Authentification** | Supabase Auth (Google/Apple OAuth), MFA recommandé pour admins |
| **Autorisation** | Row Level Security PostgreSQL, rôles Supabase |
| **API** | Rate limiting, validation des inputs (Zod), sanitization |
| **Paiements** | Jamais de données cartes stockées (Stripe tokenization) |
| **Documents** | URLs signées temporaires (Cloudflare R2 pre-signed URLs) |
| **Audit externe** | corridor.dev pour pen-testing et audit de sécurité |
| **Chiffrement** | TLS 1.3 en transit, AES-256 au repos (Supabase + R2) |
| **Secrets** | Variables d'environnement, jamais dans le code |

### 6.5 Sécurité interne

- **corridor.dev** : audit de sécurité et pen-testing régulier
- Tests exhaustifs de toutes les features (unitaires, intégration, E2E)
- Revue de code obligatoire (PR reviews)
- Environnements séparés : dev / staging / production

---

## 7. Roadmap technique

> **Objectif** : Lancement le **4 avril 2026** — soit environ **8 semaines** depuis aujourd'hui (7 février 2026).

### Phase 0 — Setup & Fondations (S1 : 10-14 février)

- [x] Document d'architecture (ce document)
- [ ] Setup repository monorepo (Turborepo)
  - `/apps/web` — Next.js
  - `/apps/mobile` — React Native (Expo)
  - `/apps/ipad` — React Native iPad build
  - `/packages/shared` — Types, utils, validations partagés
  - `/packages/supabase` — Migrations, seeds, Edge Functions
- [ ] Setup Supabase projet (région EU — `eu-west-1`)
- [ ] Schéma base de données initial + migrations
- [ ] Setup Stripe Connect (mode test)
- [ ] Setup Cloudflare R2 bucket
- [ ] CI/CD GitHub Actions (lint, test, deploy)
- [ ] Setup Sentry
- [ ] Setup Meilisearch (VPS EU)
- [ ] Configuration Vercel (web)

### Phase 1 — Auth & Core (S2-S3 : 17 fév — 28 fév)

**Sprint 1 (17-21 fév) — Auth & Profils**
- [ ] Supabase Auth (Google + Apple Sign In)
- [ ] Inscription / connexion (web + mobile)
- [ ] Profils utilisateurs (CRUD)
- [ ] Intégration didit.me (vérification identité)
- [ ] Upload documents (CNI, permis, KBIS, justif domicile)
- [ ] RLS policies de base
- [ ] Système de logs

**Sprint 2 (24-28 fév) — Véhicules & Catalogue**
- [ ] CRUD véhicules (prestataires)
- [ ] Upload photos véhicules (Cloudflare R2)
- [ ] Intégration api-ninjas.com (auto-complétion specs)
- [ ] Catalogue client (liste, recherche, filtres)
- [ ] Indexation Meilisearch
- [ ] Recherche géolocalisée (PostGIS)
- [ ] Favoris
- [ ] Page vitrine prestataire

### Phase 2 — Réservation & Paiement (S4-S5 : 3 mars — 14 mars)

**Sprint 3 (3-7 mars) — Réservation**
- [ ] Flow de réservation complet
- [ ] Vérification blacklist
- [ ] Acceptation/refus prestataire
- [ ] Calendrier de disponibilité
- [ ] Notifications push (Expo Notifications)
- [ ] Intégration ClickSend (SMS)

**Sprint 4 (10-14 mars) — Paiement**
- [ ] Stripe Connect onboarding prestataires
- [ ] PaymentIntent (location + caution)
- [ ] Capture / cancel / partial capture
- [ ] Balance prestataire
- [ ] Reversement automatique (Transfer)
- [ ] Retrait (Payout) 24-48h
- [ ] Abonnement prestataire 199€/mois (Stripe Subscriptions)
- [ ] Coupons (client + prestataire)

### Phase 3 — Location Flow & Messagerie (S5-S6 : 17 mars — 28 mars)

**Sprint 5 (17-21 mars) — Flow départ/retour**
- [ ] Photos géolocalisées + horodatées (mobile)
- [ ] Envoi photos dans conversation
- [ ] Signature électronique (canvas)
- [ ] Génération contrat PDF
- [ ] Stockage contrats (R2)
- [ ] Flow retour complet
- [ ] Comparaison IA photos (départ vs retour)

**Sprint 6 (24-28 mars) — Messagerie & Litiges**
- [ ] Messagerie temps réel (Supabase Realtime)
- [ ] Conversations liées aux réservations
- [ ] Système de litiges
- [ ] Admin rejoint conversation
- [ ] Arbre de décision litiges
- [ ] Avis et notes

### Phase 4 — Admin & CRM (S7 : 31 mars — 4 avril)

**Sprint 7 (31 mars — 4 avril) — Polish & Admin**
- [ ] Dashboard admin complet (stats, graphiques)
- [ ] Gestion utilisateurs/prestataires (ban, block, logs)
- [ ] Validation véhicules
- [ ] Validation modifications profils
- [ ] Catalogue fournisseur Maloc
- [ ] Mode maintenance
- [ ] Générateur coupons admin
- [ ] Générateur contrats admin
- [ ] Mises en avant payantes
- [ ] iPad CRM build final
- [ ] Comptabilité prestataire (export)
- [ ] Blacklist (clients + fournisseurs)

### Phase 5 — Post-MVP (après lancement)

- [ ] Maloc OS — Générateur de stories IA
- [ ] Maloc OS — Analyse de données IA
- [ ] Maloc OS — Bot WhatsApp SAV
- [ ] PWA (Progressive Web App)
- [ ] Multi-langue (i18n)
- [ ] Expansion Europe (adaptation légale par pays)
- [ ] Expansion MENA

> **🏗 Recommandation** : Le planning est extrêmement serré (8 semaines). Prioriser impérativement le MVP : auth, catalogue, réservation, paiement, messagerie, contrats. Les fonctionnalités Maloc OS (IA) doivent être repoussées post-lancement. Prévoir une équipe de **minimum 4-5 développeurs** + 1 designer + 1 QA dédiés à plein temps.

### Roadmap simplifiée (mise à jour)

| Jalon | Date cible | Contenu |
|---|---|---|
| **MVP** | 4 avril 2026 | Catalogue + réservation + paiement + messagerie + KYC + photos état des lieux |
| **V2** | Mai 2026 | CRM prestataire complet + blacklist + facturation |
| **V3** | Juin 2026 | Maloc OS (IA) + fournisseurs + coupons |

---

## 8. Intégrations tierces

### 8.1 Stripe Connect (Paiements)

| Fonctionnalité | API Stripe |
|---|---|
| Onboarding prestataire | Account Links (Custom Connect) |
| Paiement location | PaymentIntents (capture différée) |
| Caution | PaymentIntents (authorize → capture/cancel) |
| Commission 10% | Application fees sur Transfers |
| Reversement prestataire | Transfers vers Connected Account |
| Retrait | Payouts (24-48h) |
| Abonnement 199€/mois | Subscriptions + Invoices |
| Remboursement | Refunds |
| Webhooks | `payment_intent.succeeded`, `invoice.paid`, `account.updated`, etc. |

### 8.2 didit.me (Vérification d'identité)

| Usage | Détail |
|---|---|
| KYC particulier | Vérification CNI + Permis + Justif domicile |
| KYB professionnel | Vérification KBIS + CNI + Permis |
| Webhooks | Notification de résultat de vérification |
| Stockage | Documents stockés chez didit.me + copie R2 |

### 8.3 api-ninjas.com (Données véhicules)

| Usage | Détail |
|---|---|
| Auto-complétion | Marque → Modèle → Année → Specs auto |
| Données | Puissance, consommation, transmission, etc. |
| Cache | Mettre en cache les résultats (table `vehicle_specs_cache`) |

### 8.4 ClickSend (SMS)

| Usage | Détail |
|---|---|
| Notifications | Réservation acceptée, rappels, litiges |
| Vérification | OTP téléphone (backup Supabase Auth) |
| Transactionnel | Confirmation départ/retour |

### 8.5 Cloudflare R2 (Stockage)

| Usage | Détail |
|---|---|
| Photos véhicules | Upload + CDN |
| Photos location | Géolocalisées + horodatées |
| Contrats PDF | Stockage immutable |
| Documents identité | Copie chiffrée |
| Région | Europe (conformité RGPD) |
| Accès | Pre-signed URLs (expiration 1h) |

### 8.6 Meilisearch (Recherche)

| Index | Contenu |
|---|---|
| `vehicles` | Marque, modèle, catégorie, ville, prix |
| `providers` | Nom agence, ville, description |
| Facettes | Catégorie, prix, transmission, carburant |
| Géo-search | Filtrage par rayon géographique |
| Sync | Supabase → Meilisearch via Edge Function (webhook DB) |

### 8.7 Sentry (Monitoring)

| Usage | Détail |
|---|---|
| Web | `@sentry/nextjs` |
| Mobile | `@sentry/react-native` |
| Backend | `@sentry/node` (Edge Functions) |
| Alertes | Slack/email sur erreurs critiques |
| Performance | Transaction tracing |

### 8.8 corridor.dev (Sécurité)

| Usage | Détail |
|---|---|
| Pen-testing | Audit pré-lancement |
| Monitoring | Surveillance continue post-lancement |
| Rapports | Rapports de vulnérabilités |

### 8.9 OpenAI / Anthropic (IA — Maloc OS)

| Usage | Détail |
|---|---|
| Comparaison photos | Vision API — détection dommages départ vs retour |
| Générateur stories | GPT-4o — génération de contenus social media |
| Analyse données | Insights automatiques sur les KPIs prestataire |
| Bot WhatsApp | Assistant conversationnel SAV |

### 8.10 WhatsApp Business API (Maloc OS)

| Usage | Détail |
|---|---|
| Bot SAV | Réponses automatiques aux questions clients |
| Notifications | Messages transactionnels (confirmation, rappels) |
| Provider | Meta Cloud API ou Twilio |

---

## 9. Review Maloc OS — Points validés

Suite à la review approfondie du projet par Maloc OS, les points suivants ont été **validés** :

| Point | Statut | Commentaire |
|---|---|---|
| Vision produit claire | ✅ | Marketplace location véhicules luxe bien positionnée |
| Séparation User/Loueur/Admin | ✅ | Rôles bien définis avec RLS et permissions distinctes |
| Balance pour traçabilité financière | ✅ | Système de balance interne couplé à Stripe Connect |
| Coupons physiques bar-tabac | ✅ | Concept innovant, différenciateur marché |
| Logs sur TOUTES les actions | ✅ | Table `logs` avec IP, user agent, session, partitionnée par mois |
| KYC différencié pro/particulier | ✅ | Particulier (CNI+permis+domicile) vs Pro (KBIS+CNI+permis) via didit.me |
| Blacklist partagée | ✅ | Vraie valeur ajoutée — flagging automatique cross-prestataires |
| 1 loueur = 1 conversation (pattern Airbnb) | ✅ | Conversations liées aux réservations, pas de multi-thread |
| Snapshot annonces au moment réservation | ✅ | Tarifs et conditions figés dans la réservation (`daily_rate_cents` snapshot) |

### Points critiques — Réponses apportées

| Question soulevée | Réponse |
|---|---|
| Stack technique définie ? | ✅ **Next.js + React Native + Supabase + Stripe Connect + Cloudflare R2** |
| Schéma BDD complet ? | ✅ **22 tables détaillées** avec relations, contraintes et index |
| Flux paiement clair ? | ✅ **Workflow complet** avec Stripe Connect Custom (authorize → capture → transfer → payout) |
| État des lieux ? | ✅ **Protocole photo géolocalisé + horodaté** en 4 phases (départ loueur/client, retour client/loueur) |
| Caution sécurisée ? | ✅ **Empreinte bancaire Stripe** — PaymentIntent avec capture différée |

---

## 10. Choix techniques argumentés

### 10.1 Supabase vs Backend custom

| Critère | Supabase | Backend custom (Express/NestJS) |
|---|---|---|
| Auth + RLS + Realtime + Storage | Out of the box | 3+ semaines de dev |
| Open source | ✅ Pas de vendor lock-in définitif | N/A |
| Self-host possible | ✅ Migration possible si besoin | Natif |
| Courbe d'apprentissage | Faible | Moyenne |
| **Verdict** | **✅ Choisi** — gain de 3 semaines minimum | Overkill pour le MVP |

### 10.2 Next.js vs alternatives (Nuxt, Remix, SvelteKit)

- **SEO critique** pour le catalogue public de véhicules → SSR/ISR indispensable
- **Même écosystème React** que React Native → partage de types, logique, composants
- Écosystème mature, déploiement Vercel optimisé
- **Verdict** : Next.js est le choix naturel pour cette stack

### 10.3 Stripe Connect Custom vs Standard vs Express

- **Standard** : aucun contrôle sur les payouts/commissions → ❌ éliminé
- **Express** : contrôle limité, onboarding Stripe-hosted → insuffisant
- **Custom** : **seul mode** donnant un contrôle total sur payouts, commissions, balances, pour une marketplace multi-vendeurs
- **Verdict** : Custom obligatoire pour le modèle 90/10

### 10.4 API REST (PostgREST natif) vs GraphQL

- PostgREST intégré à Supabase = zéro config
- Plus simple, plus performant pour nos cas d'usage
- Pas d'over-engineering — GraphQL n'apporte rien ici
- **Verdict** : REST natif Supabase

### 10.5 iPad CRM : React Native build dédié vs responsive web

- **Pas du responsive web** — build React Native dédié pour iPad
- Interface tactile optimisée, mode paysage
- Accès aux APIs natives (caméra pour photos, notifications push)
- **Verdict** : Build dédié React Native iPad

---

## 11. Assurance & Risques

### 11.1 Stratégie par phases

| Phase | Approche | Détail |
|---|---|---|
| **Phase 1 (lancement)** | Assurance loueur | Les prestataires utilisent leur propre assurance. Vérification obligatoire du justificatif d'assurance lors de l'onboarding |
| **Phase 2 (post-traction)** | Partenariat assureur | Intégration d'une assurance Maloc via partenariat (Wakam, Luko ou équivalent) |

### 11.2 Couverture des risques

| Type de risque | Mécanisme |
|---|---|
| **Petits dommages** (rayures, usure) | Caution Stripe — capture partielle/totale sur l'empreinte bancaire |
| **Sinistres lourds** (accident, vol, incendie) | Assurance du loueur (Phase 1) → Assurance Maloc intégrée (Phase 2) |
| **Sinistre total** | ⚠️ **À définir juridiquement** — responsabilité entre locataire, loueur et plateforme |

### 11.3 Points juridiques à trancher

- Responsabilité de la plateforme en cas de sinistre total
- Obligation d'assurance minimale pour les loueurs
- Conditions d'application de la caution vs assurance
- Conformité avec la réglementation française sur la location de véhicules entre particuliers

---

## 12. Scalabilité & Performance

### 12.1 Capacité de charge

| Composant | Capacité | Détail |
|---|---|---|
| **Supabase** | 10 000+ users concurrents | Postgres avec connection pooling (PgBouncer) |
| **Cloudflare R2 + CDN** | Illimitée | Distribution edge mondiale, pas de frais d'egress, pas de bottleneck images |
| **Vercel Edge** | Auto-scale | SSR/ISR distribué sur edge network |

### 12.2 Stratégie multi-pays

- **Read replicas Supabase** par région (EU, MENA) pour réduire la latence
- **Edge Functions par région** — logique métier exécutée au plus proche de l'utilisateur
- Adaptation légale par pays (TVA, assurances, KYC)

### 12.3 Queue system & jobs asynchrones

- **pg_boss** (natif PostgreSQL) pour les jobs async :
  - Envoi d'emails transactionnels
  - Envoi de SMS (ClickSend)
  - Comparaison photos IA (départ vs retour)
  - Génération de PDF contrats
  - Synchronisation Meilisearch
- Avantage : pas de service externe supplémentaire, intégré à Postgres

### 12.4 Protection & rate limiting

- **Rate limiting sur Edge Functions** : built-in Supabase + règles custom
- **Détection de comportements suspects** :
  - Réservations multiples simultanées depuis le même compte
  - Changements fréquents de carte bancaire
  - Patterns d'utilisation anormaux
  - Alertes automatiques vers l'admin

---

## 13. Sécurité avancée

### 13.1 Protection API

| Mesure | Implémentation |
|---|---|
| **Rate limiting** | Edge Functions built-in + rules custom par endpoint |
| **WAF** | Cloudflare WAF activé sur tous les domaines |
| **CSP Headers** | Content Security Policy stricte sur Next.js |
| **CORS** | Origines autorisées explicitement |
| **Input validation** | Zod schemas sur tous les endpoints |

### 13.2 Anti-fraude

| Mécanisme | Détail |
|---|---|
| Détection comportements suspects | Réservations multiples, changements carte, patterns anormaux |
| Blacklist partagée | Cross-prestataires — un client banni chez un loueur est flaggé partout |
| Vérification identité | KYC obligatoire avant toute réservation |
| Logs exhaustifs | Toute action tracée avec IP, device, session |

### 13.3 Audits de sécurité

- **corridor.dev** : pen-testing et audit pré-lancement
- **Audits réguliers** : trimestriels post-lancement
- **Bug bounty** : à envisager post-V2
- **Revue de code** : PR reviews obligatoires, branches protégées

---

## 14. Benchmark Airbnb — Leçons appliquées

> 📄 L'analyse benchmark complète est disponible dans le fichier [`airbnb-analyse-benchmark.md`](./airbnb-analyse-benchmark.md).

### Leçons clés intégrées au projet Maloc

| Pattern Airbnb | Application Maloc |
|---|---|
| **1 hôte = 1 conversation** | 1 loueur = 1 conversation par réservation, pas de multi-thread |
| **Snapshot au moment de la réservation** | Prix et conditions figés dans la table `reservations` au moment de la demande |
| **Photos comme preuve** | Protocole photo géolocalisé + horodaté en 4 phases avec comparaison IA |
| **Trust & Safety centralisé** | Blacklist partagée + KYC obligatoire + logs exhaustifs |
| **Commission transparente** | 10% clairement affiché, split payment automatique via Stripe Connect |
| **Résolution de litiges structurée** | Arbre de décision admin avec 3 options (dédommagement loueur, geste Maloc, remboursement client) |
| **Review system** | Notes 1-5 étoiles + commentaires + droit de réponse loueur (lié à l'abonnement) |
| **Paiement sécurisé marketplace** | Jamais de paiement direct — tout transite par la plateforme (Stripe Connect Custom) |

---

## Annexes

### A. Variables d'environnement requises

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Cloudflare R2
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_ENDPOINT=

# didit.me
DIDIT_API_KEY=
DIDIT_WEBHOOK_SECRET=

# api-ninjas
API_NINJAS_KEY=

# ClickSend
CLICKSEND_USERNAME=
CLICKSEND_API_KEY=

# Meilisearch
MEILISEARCH_HOST=
MEILISEARCH_API_KEY=

# Sentry
SENTRY_DSN=

# OpenAI (Maloc OS)
OPENAI_API_KEY=

# WhatsApp Business (Maloc OS)
WHATSAPP_API_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
```

### B. Conventions de nommage

| Élément | Convention | Exemple |
|---|---|---|
| Tables | snake_case, pluriel | `reservation_photos` |
| Colonnes | snake_case | `stripe_account_id` |
| Edge Functions | kebab-case | `create-reservation` |
| API routes | kebab-case | `/api/v1/create-checkout` |
| Components | PascalCase | `VehicleCard.tsx` |
| Fichiers | kebab-case | `vehicle-card.tsx` |

### C. Figma

- **Maquettes** : [https://www.figma.com/design/bfAXwgPanhBCmypa70nkO4/Maloc](https://www.figma.com/design/bfAXwgPanhBCmypa70nkO4/Maloc)

---

## 9. Choix techniques argumentés

### 9.1 Supabase vs Backend custom (Node/Express)
- **Auth + RLS + Realtime + Storage** out of the box = gain estimé de **3 semaines** de dev
- PostgREST natif = pas besoin de coder un API layer REST manuellement
- Edge Functions (Deno) pour la logique métier : webhooks Stripe, envoi SMS, comparaison photos IA
- **Open source** = pas de vendor lock-in définitif, self-host possible à tout moment
- Sur un timeline de 8 semaines, un backend custom serait trop risqué

### 9.2 Next.js vs Nuxt/Angular
- **SEO critique** pour le catalogue : Google doit indexer les véhicules → SSR/ISR obligatoire
- Next.js + Vercel = déploiement instantané, preview deployments par PR
- **Même écosystème React** que React Native → partage de logique, types, hooks
- ISR (Incremental Static Regeneration) pour les pages catalogue = performance maximale

### 9.3 Stripe Connect Custom vs Standard
- Maloc est un **marketplace multi-vendeurs** → Connect Custom est le seul mode donnant le contrôle total
- Gestion des payouts, commissions 10%, balances loueurs, délais de reversement
- Onboarding KYB des loueurs intégré (obligation légale pour marketplace)
- Gestion des litiges et remboursements côté plateforme

### 9.4 API REST vs GraphQL
- Supabase expose **PostgREST nativement** = zéro config, auto-généré depuis le schéma
- Pour notre cas d'usage (CRUD + workflows), REST est plus simple et performant
- GraphQL = over-engineering non justifié à ce stade
- Si besoin futur, Supabase supporte GraphQL via pg_graphql

### 9.5 iPad CRM : React Native build dédié
- Pas du responsive web — les loueurs ont besoin d'un **vrai outil tactile** terrain
- React Native permet un build iPad optimisé (split view, drag & drop, gestures)
- Partage 90% du code avec l'app mobile client

---

## 10. Assurance & Gestion des risques

### 10.1 Stratégie par phases

| Phase | Approche | Détail |
|---|---|---|
| **Phase 1 (MVP)** | Assurance du loueur | On vérifie que chaque loueur a une assurance location valide. Upload obligatoire du justificatif. |
| **Phase 2 (Q3 2026)** | Partenariat assureur | Intégration d'un assureur (Wakam, Luko, ou similaire) pour proposer une **assurance Maloc intégrée** |
| **Phase 3 (2027)** | MalocCover | Programme d'assurance propre (type AirCover) avec couverture complète |

### 10.2 Couverture des dommages
- **Petits dommages** (< montant caution) → prélevés sur l'empreinte bancaire Stripe du client
- **Dommages moyens** (caution insuffisante) → Maloc assiste le loueur dans les démarches de recouvrement
- **Sinistre total** → Assurance du loueur (Phase 1) / Assurance Maloc intégrée (Phase 2+)
- **Responsabilité juridique** → à définir avec les avocats Maloc (CGU + contrat de location)

### 10.3 Risques identifiés
- **Fraude client** : fausse identité, permis falsifié → didit.me + blacklist partagée
- **Vol de véhicule** : GPS tracking recommandé (Phase 2), signalement police automatisé
- **Non-retour** : protocole d'escalade (SMS → appel → signalement → poursuites)
- **Dommages non déclarés** : comparaison IA photos départ/retour + horodatage/géoloc

---

## 11. Scalabilité & Performance

### 11.1 Architecture actuelle (MVP → 1000 users)
- Supabase Pro : gère facilement **10k+ connexions concurrentes**
- Cloudflare R2 + CDN edge pour les images → **latence < 50ms** en Europe
- Meilisearch sur VPS dédié pour la recherche catalogue

### 11.2 Scale-up (1k → 50k users)
- **Read replicas** Supabase pour séparer les lectures (catalogue, recherche) des écritures (réservations)
- **Connection pooling** via Supavisor (intégré Supabase)
- **Queue system** : pg_boss (natif PostgreSQL) pour les jobs asynchrones :
  - Envoi d'emails et SMS
  - Comparaison IA des photos
  - Génération de contrats PDF
  - Calcul des statistiques dashboard

### 11.3 Multi-région (expansion européenne)
- Edge Functions déployées par région (eu-west, eu-central)
- CDN Cloudflare → cache automatique multi-PoP
- Base de données : migration vers Supabase self-hosted si nécessaire pour la latence
- Stratégie multi-tenant par pays (schéma PostgreSQL par filiale ou RLS par pays)

### 11.4 Rate limiting & Anti-abus
- Rate limiting sur les Edge Functions (Supabase built-in + custom middleware)
- Détection de comportements suspects :
  - Réservations multiples simultanées
  - Changements fréquents de carte bancaire
  - Création de comptes en masse (même IP/device)
- WAF Cloudflare en front
- CSP headers stricts

---

## 12. Sécurité avancée

### 12.1 Anti-fraude
- **Scoring de risque** par client : basé sur ancienneté, historique, vérification KYC, comportement
- **Flagging automatique** : clients avec score < seuil → validation admin obligatoire
- **Stripe Radar** intégré pour la détection de fraude paiement

### 12.2 Audits
- **corridor.dev** : audits de sécurité réguliers (pentest, revue de code)
- Logs d'audit immuables (append-only) pour toutes les actions sensibles
- Alerting automatique sur comportements anormaux (Sentry + custom)

### 12.3 Conformité supplémentaire
- **PCI-DSS** : géré par Stripe (aucune donnée carte sur nos serveurs)
- **RGPD** : DPO à nommer, registre des traitements, droit à l'oubli implémenté
- **KYC/KYB** : didit.me pour la vérification, stockage sécurisé des documents

---

## 13. Benchmark Airbnb — Leçons appliquées

> 📎 Analyse complète disponible dans `airbnb-analyse-benchmark.md`

### Éléments directement appliqués à Maloc :
- **1 conversation = 1 relation loueur/client** (pattern Airbnb validé)
- **Commission marketplace** : Airbnb ~14% guest + ~3% host → Maloc simplifie à **10% flat** (plus attractif pour les prestataires)
- **Système d'avis bidirectionnel** avec période de grâce
- **Snapshot des annonces** au moment de la réservation (protection client)
- **Vérification d'identité** progressive (basique → complète selon montant)

### Adaptations spécifiques au secteur automobile :
- **État des lieux digital** (photos géolocalisées+horodatées avant/après) — Airbnb n'a pas d'équivalent aussi strict
- **Vérification permis de conduire** — obligatoire, pas d'équivalent Airbnb
- **Caution élevée** (véhicules de luxe = 5k-50k€) → empreinte bancaire Stripe
- **Blacklist partagée** entre prestataires — avantage compétitif défensif unique, Airbnb n'a rien d'équivalent
- **Contrat de location signé électroniquement** — obligation légale automobile

---

## 14. Roadmap révisée (MVP → V3)

### MVP — Lancement 4 avril 2026
> Focus : le client peut chercher, réserver et payer un véhicule

| Module | Détail |
|---|---|
| Catalogue | Recherche, filtres, pages véhicules avec SSR/SEO |
| Réservation | Flow complet : demande → acceptation → confirmation |
| Paiement | Stripe Connect : empreinte bancaire + débit + commission |
| Messagerie | 1 conversation par relation loueur/client, événements système |
| KYC | Vérification identité client (didit.me) |
| État des lieux | Photos géolocalisées/horodatées départ + retour |
| Auth | Google/Apple Sign-In + email |
| Page prestataire | Vitrine basique (véhicules, infos, avis) |
| Admin basique | Validation agences, utilisateurs, véhicules |

### V2 — Mai 2026
| Module | Détail |
|---|---|
| CRM Prestataire | Gestion flotte complète, calendrier, iPad build |
| Blacklist | Système partagé avec validation admin |
| Facturation | Génération auto, comptabilité prestataire |
| Contrats | Générateur + signature électronique |
| Abonnement | SUB 199€/mois avec Stripe Billing |
| Dashboard admin | Stats complètes, gestion avancée |

### V3 — Juin-Juillet 2026
| Module | Détail |
|---|---|
| Maloc OS | IA : analyse données, générateur story, bot WhatsApp SAV |
| Fournisseurs | Catalogue véhicules Maloc pour loueurs |
| Coupons | Système complet (clients + prestataires + bar-tabac) |
| Mises en avant | Promotions payantes dans le catalogue |
| App mobile | React Native (iOS + Android) |
| Assurance intégrée | Partenariat assureur Phase 2 |

---

> **Document rédigé le 7 février 2026** — Mis à jour le 7 février 2026 (review Maloc OS + discussions techniques).
> Prochaine revue : fin Sprint 1 (21 février 2026).
