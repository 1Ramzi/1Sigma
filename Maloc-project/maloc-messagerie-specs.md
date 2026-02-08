# Maloc — Spécifications Techniques du Système de Messagerie

> **Version :** 1.0  
> **Date :** 8 février 2026  
> **Statut :** Draft  
> **Auteur :** Équipe Maloc  

---

## Table des matières

1. [Architecture technique](#1-architecture-technique)
2. [Événements système automatiques](#2-événements-système-automatiques)
3. [Sécurité de la messagerie](#3-sécurité-de-la-messagerie)
4. [Horodatage et preuves](#4-horodatage-et-preuves)
5. [UI/UX de la messagerie](#5-uiux-de-la-messagerie)
6. [Questions ouvertes](#6-questions-ouvertes)

---

## Philosophie

**1 loueur ↔ 1 client = 1 conversation unique et permanente.**

Toutes les réservations, tous les événements, toutes les interactions entre un loueur et un client vivent dans une seule conversation. Comme Airbnb : on ne crée pas un nouveau thread par réservation, on continue la même conversation. Les événements système (réservation, paiement, contrat, photos, litiges) sont injectés automatiquement dans le fil sous forme de **cards interactives**.

La messagerie est le **système nerveux** de chaque location. C'est le lieu unique où tout se passe, tout est tracé, tout est prouvable.

---

## 1. Architecture technique

### 1.1 Stack technologique

| Composant | Technologie |
|---|---|
| Base de données | Supabase (PostgreSQL) |
| Temps réel | Supabase Realtime (WebSocket) |
| Backend | Supabase Edge Functions (Deno) |
| Storage photos | Supabase Storage (buckets privés) |
| Notifications push | Firebase Cloud Messaging (FCM) + Web Push API |
| Frontend | React Native (mobile) + Next.js (web) |
| Chiffrement | AES-256-GCM (messages au repos) + TLS 1.3 (transit) |

### 1.2 Schéma de base de données

#### Table `conversations`

```sql
CREATE TABLE conversations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       UUID NOT NULL REFERENCES profiles(id),
  owner_id        UUID NOT NULL REFERENCES profiles(id),  -- le loueur
  
  -- Métadonnées
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_message_at TIMESTAMPTZ,
  last_message_preview TEXT,          -- aperçu du dernier message (max 120 chars)
  
  -- Statut
  status          TEXT NOT NULL DEFAULT 'active' 
                  CHECK (status IN ('active', 'archived', 'dispute', 'blocked')),
  
  -- Compteurs non-lus (dénormalisés pour performance)
  unread_client   INT NOT NULL DEFAULT 0,
  unread_owner    INT NOT NULL DEFAULT 0,
  
  -- Litige
  dispute_id      UUID REFERENCES disputes(id),
  admin_joined    BOOLEAN NOT NULL DEFAULT false,
  admin_id        UUID REFERENCES profiles(id),
  
  -- Contrainte : 1 conversation unique par paire client/loueur
  UNIQUE (client_id, owner_id)
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_conversations_client ON conversations(client_id, last_message_at DESC);
CREATE INDEX idx_conversations_owner ON conversations(owner_id, last_message_at DESC);
CREATE INDEX idx_conversations_status ON conversations(status) WHERE status = 'dispute';
```

#### Table `messages`

```sql
CREATE TYPE message_type AS ENUM (
  'user_message',       -- Message texte libre d'un utilisateur
  'system_event',       -- Événement système automatique
  'reservation_card',   -- Card de réservation (demande, confirmation, etc.)
  'photo_upload',       -- Upload de photos (état des lieux)
  'contract_card',      -- Card de contrat à signer
  'review_request',     -- Demande d'avis
  'dispute_alert',      -- Alerte litige
  'payment_card',       -- Card de paiement / facturation
  'admin_message'       -- Message d'un admin (litige)
);

CREATE TABLE messages (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id   UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  
  -- Auteur
  sender_id         UUID REFERENCES profiles(id),  -- NULL pour system_event
  sender_role       TEXT NOT NULL CHECK (sender_role IN ('client', 'owner', 'system', 'admin')),
  
  -- Contenu
  type              message_type NOT NULL,
  content           TEXT,                           -- Texte du message (user_message)
  metadata          JSONB NOT NULL DEFAULT '{}',    -- Données structurées selon le type
  
  -- Réservation liée (si applicable)
  reservation_id    UUID REFERENCES reservations(id),
  
  -- Horodatage serveur uniquement
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Lecture
  read_by_client    BOOLEAN NOT NULL DEFAULT false,
  read_by_owner     BOOLEAN NOT NULL DEFAULT false,
  read_by_admin     BOOLEAN,                       -- NULL si pas de litige
  read_at_client    TIMESTAMPTZ,
  read_at_owner     TIMESTAMPTZ,
  
  -- Intégrité
  content_hash      TEXT,                           -- SHA-256 du contenu + metadata
  
  -- Soft delete (admin uniquement, pour modération)
  deleted_at        TIMESTAMPTZ,
  deleted_by        UUID REFERENCES profiles(id)
);

-- Index pour le chargement paginé des messages
CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX idx_messages_reservation ON messages(reservation_id) WHERE reservation_id IS NOT NULL;
CREATE INDEX idx_messages_unread_client ON messages(conversation_id) 
  WHERE read_by_client = false AND sender_role != 'client';
CREATE INDEX idx_messages_unread_owner ON messages(conversation_id) 
  WHERE read_by_owner = false AND sender_role != 'owner';
```

#### Table `message_events`

Table d'audit immutable. Chaque action sur un message est loguée ici. Aucune suppression possible.

```sql
CREATE TABLE message_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id      UUID NOT NULL REFERENCES messages(id),
  conversation_id UUID NOT NULL REFERENCES conversations(id),
  
  -- Événement
  event_type      TEXT NOT NULL CHECK (event_type IN (
    'created', 'read', 'delivered', 'action_clicked',
    'photo_uploaded', 'photo_validated', 'contract_signed',
    'deleted_by_admin', 'flagged', 'edited'
  )),
  
  -- Qui a déclenché
  actor_id        UUID REFERENCES profiles(id),
  actor_role      TEXT NOT NULL CHECK (actor_role IN ('client', 'owner', 'system', 'admin')),
  
  -- Données complémentaires
  metadata        JSONB NOT NULL DEFAULT '{}',
  
  -- Horodatage serveur immuable
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Intégrité
  event_hash      TEXT NOT NULL  -- SHA-256(previous_hash + event_data)
);

-- Aucun UPDATE ni DELETE autorisé (via trigger)
CREATE INDEX idx_message_events_message ON message_events(message_id, created_at);
CREATE INDEX idx_message_events_conversation ON message_events(conversation_id, created_at);
```

#### Table `typing_indicators` (éphémère)

```sql
CREATE TABLE typing_indicators (
  user_id         UUID PRIMARY KEY REFERENCES profiles(id),
  conversation_id UUID NOT NULL REFERENCES conversations(id),
  started_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Auto-expire après 5 secondes (nettoyé par cron)
  expires_at      TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '5 seconds')
);
```

#### Table `presence`

```sql
CREATE TABLE presence (
  user_id         UUID PRIMARY KEY REFERENCES profiles(id),
  status          TEXT NOT NULL DEFAULT 'offline' 
                  CHECK (status IN ('online', 'away', 'offline')),
  last_seen_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  current_conversation_id UUID REFERENCES conversations(id)
);
```

### 1.3 Structure des métadonnées par type de message

Chaque `message_type` a une structure `metadata` JSONB spécifique :

#### `user_message`
```json
{
  "attachments": [
    {
      "type": "image",
      "url": "https://storage.maloc.fr/...",
      "thumbnail_url": "https://storage.maloc.fr/.../thumb",
      "width": 1920,
      "height": 1080,
      "size_bytes": 2450000
    }
  ]
}
```

#### `system_event`
```json
{
  "event_code": "reservation_accepted",
  "reservation_id": "uuid",
  "title": "Réservation acceptée",
  "body": "Jean a accepté votre réservation pour la Porsche 911 du 15 au 18 mars.",
  "icon": "check-circle",
  "color": "success",
  "actions": [
    {
      "id": "view_reservation",
      "label": "Voir la réservation",
      "type": "navigate",
      "target": "/reservations/{id}"
    }
  ],
  "visible_to": ["client", "owner"]
}
```

#### `reservation_card`
```json
{
  "reservation_id": "uuid",
  "vehicle": {
    "id": "uuid",
    "name": "Porsche 911 Carrera S",
    "image_url": "https://...",
    "year": 2024
  },
  "dates": {
    "start": "2026-03-15T10:00:00Z",
    "end": "2026-03-18T10:00:00Z",
    "days": 3
  },
  "pricing": {
    "daily_rate": 450,
    "total": 1350,
    "service_fee": 135,
    "insurance": 90,
    "grand_total": 1575,
    "currency": "EUR"
  },
  "status": "pending",
  "actions": [
    {
      "id": "accept",
      "label": "Accepter",
      "type": "api_call",
      "endpoint": "/reservations/{id}/accept",
      "style": "primary",
      "visible_to": ["owner"]
    },
    {
      "id": "decline",
      "label": "Refuser",
      "type": "api_call",
      "endpoint": "/reservations/{id}/decline",
      "style": "danger",
      "visible_to": ["owner"]
    }
  ]
}
```

#### `photo_upload`
```json
{
  "context": "checkin_departure",
  "reservation_id": "uuid",
  "uploaded_by": "owner",
  "photos": [
    {
      "id": "uuid",
      "url": "https://storage.maloc.fr/...",
      "thumbnail_url": "https://...",
      "sha256": "a1b2c3d4...",
      "geolocation": {
        "lat": 48.8566,
        "lng": 2.3522,
        "accuracy_m": 5
      },
      "taken_at": "2026-03-15T09:45:00Z",
      "server_received_at": "2026-03-15T09:45:12Z",
      "exif": {
        "camera": "iPhone 16 Pro",
        "focal_length": "24mm"
      }
    }
  ],
  "total_photos": 12,
  "status": "pending_validation",
  "actions": [
    {
      "id": "validate_photos",
      "label": "Valider les photos",
      "type": "api_call",
      "endpoint": "/reservations/{id}/photos/validate",
      "style": "primary",
      "visible_to": ["client"]
    },
    {
      "id": "contest_photos",
      "label": "Contester",
      "type": "api_call",
      "endpoint": "/reservations/{id}/photos/contest",
      "style": "danger",
      "visible_to": ["client"]
    },
    {
      "id": "view_all",
      "label": "Voir toutes les photos (12)",
      "type": "navigate",
      "target": "/reservations/{id}/photos/checkin"
    }
  ]
}
```

#### `contract_card`
```json
{
  "contract_id": "uuid",
  "reservation_id": "uuid",
  "title": "Contrat de location — Porsche 911 Carrera S",
  "pdf_url": "https://storage.maloc.fr/contracts/...",
  "status": "pending_signatures",
  "signatures": {
    "owner": { "signed": true, "signed_at": "2026-03-14T18:00:00Z" },
    "client": { "signed": false }
  },
  "actions": [
    {
      "id": "sign_contract",
      "label": "Signer le contrat",
      "type": "api_call",
      "endpoint": "/contracts/{id}/sign",
      "style": "primary",
      "requires_confirmation": true,
      "confirmation_text": "En signant, vous acceptez les termes du contrat de location."
    },
    {
      "id": "view_contract",
      "label": "Lire le contrat",
      "type": "navigate",
      "target": "/contracts/{id}/view"
    }
  ]
}
```

#### `review_request`
```json
{
  "reservation_id": "uuid",
  "vehicle_name": "Porsche 911 Carrera S",
  "dates": "15–18 mars 2026",
  "review_deadline": "2026-03-27T23:59:59Z",
  "actions": [
    {
      "id": "write_review",
      "label": "Laisser un avis",
      "type": "navigate",
      "target": "/reservations/{id}/review"
    },
    {
      "id": "skip_review",
      "label": "Plus tard",
      "type": "dismiss"
    }
  ]
}
```

#### `dispute_alert`
```json
{
  "dispute_id": "uuid",
  "reservation_id": "uuid",
  "opened_by": "client",
  "reason": "damage_found",
  "title": "Litige ouvert — Dommages constatés",
  "description": "Le client signale des dommages non présents lors du départ.",
  "severity": "high",
  "actions": [
    {
      "id": "view_dispute",
      "label": "Voir le litige",
      "type": "navigate",
      "target": "/disputes/{id}"
    },
    {
      "id": "call_admin",
      "label": "Contacter un médiateur",
      "type": "api_call",
      "endpoint": "/disputes/{id}/request-admin",
      "style": "warning"
    }
  ]
}
```

#### `payment_card`
```json
{
  "type": "payment_confirmed",
  "reservation_id": "uuid",
  "amount": 1575.00,
  "currency": "EUR",
  "method": "card_visa_4242",
  "breakdown": {
    "rental": 1350.00,
    "service_fee": 135.00,
    "insurance": 90.00
  },
  "receipt_url": "https://...",
  "actions": [
    {
      "id": "view_receipt",
      "label": "Voir le reçu",
      "type": "navigate",
      "target": "/payments/{id}/receipt"
    }
  ]
}
```

### 1.4 Supabase Realtime — Subscriptions

#### Subscription par conversation

```typescript
// Client-side : s'abonner aux nouveaux messages d'une conversation
const channel = supabase
  .channel(`conversation:${conversationId}`)
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `conversation_id=eq.${conversationId}`
    },
    (payload) => {
      handleNewMessage(payload.new);
    }
  )
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'messages',
      filter: `conversation_id=eq.${conversationId}`
    },
    (payload) => {
      handleMessageUpdate(payload.new); // ex: read receipts
    }
  )
  .subscribe();
```

#### Subscription pour la liste des conversations (sidebar)

```typescript
// S'abonner aux mises à jour de toutes mes conversations
const listChannel = supabase
  .channel('my-conversations')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'conversations',
      filter: `client_id=eq.${userId}` // ou owner_id
    },
    (payload) => {
      updateConversationPreview(payload.new);
    }
  )
  .subscribe();
```

#### Presence et Typing

```typescript
// Presence (en ligne / hors ligne)
const presenceChannel = supabase
  .channel(`presence:${conversationId}`)
  .on('presence', { event: 'sync' }, () => {
    const state = presenceChannel.presenceState();
    updateOnlineUsers(state);
  })
  .on('presence', { event: 'join' }, ({ key, newPresences }) => {
    showUserOnline(newPresences);
  })
  .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
    showUserOffline(leftPresences);
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await presenceChannel.track({
        user_id: currentUser.id,
        online_at: new Date().toISOString()
      });
    }
  });

// Typing indicator
const sendTyping = () => {
  supabase
    .channel(`typing:${conversationId}`)
    .send({
      type: 'broadcast',
      event: 'typing',
      payload: { user_id: currentUser.id, name: currentUser.name }
    });
};
```

### 1.5 Indicateurs temps réel

| Indicateur | Mécanisme | Détail |
|---|---|---|
| **Non-lu** | Compteur dénormalisé sur `conversations` + flag par message | Incrémenté à chaque nouveau message, reset quand l'utilisateur ouvre la conversation |
| **Lu / Accusé de lecture** | `read_by_client` / `read_by_owner` sur `messages` | Mis à jour quand le destinataire scrolle jusqu'au message |
| **Typing** | Supabase Broadcast (pas de persistence) | Envoyé toutes les 2s pendant la frappe, expire après 5s sans signal |
| **En ligne** | Supabase Presence | Track au subscribe, untrack au disconnect, timeout 30s |
| **Dernière activité** | `presence.last_seen_at` | Affiché "Vu il y a X minutes" si offline |

### 1.6 Flux de données — Envoi d'un message

```
Client → API (Edge Function) → Validation + sanitization
                              → INSERT messages (timestamp serveur)
                              → UPDATE conversations (last_message_at, unread_count)
                              → INSERT message_events (type: created)
                              → Supabase Realtime notifie les abonnés
                              → Push notification si destinataire offline
```

**Important :** Le timestamp est **toujours** généré côté serveur (`DEFAULT now()`). Le client ne peut pas envoyer son propre timestamp. Cela garantit l'intégrité de la chronologie.

---

## 2. Événements système automatiques

Chaque événement est un message de type `system_event` injecté automatiquement dans la conversation. Ci-dessous la liste **exhaustive** de tous les événements.

### 2.1 Demande de réservation envoyée

| Champ | Valeur |
|---|---|
| **Event code** | `reservation_requested` |
| **Trigger** | Le client clique "Réserver" sur un véhicule |
| **Injecté dans** | La conversation client ↔ loueur (créée si inexistante) |
| **Contenu affiché** | Card de réservation avec détails véhicule, dates, tarif, total |
| **Icône** | 📋 |
| **Couleur** | `info` (bleu) |
| **Actions** | **Loueur :** "Accepter" (bouton vert) / "Refuser" (bouton rouge) / "Proposer d'autres dates" — **Client :** "Modifier" / "Annuler la demande" |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"Lucas a envoyé une demande de réservation pour votre Porsche 911 Carrera S du 15 au 18 mars 2026."* |

### 2.2 Réservation acceptée par le loueur

| Champ | Valeur |
|---|---|
| **Event code** | `reservation_accepted` |
| **Trigger** | Le loueur clique "Accepter" dans la card de réservation |
| **Contenu affiché** | Message de confirmation avec rappel des dates et prochaine étape (paiement) |
| **Icône** | ✅ |
| **Couleur** | `success` (vert) |
| **Actions** | **Client :** "Procéder au paiement" (bouton principal) — **Loueur :** aucune |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"Jean a accepté votre réservation ! Procédez au paiement pour confirmer."* |
| **Side effect** | La card de réservation initiale passe en statut `accepted`, les boutons Accepter/Refuser disparaissent |

### 2.3 Réservation refusée par le loueur

| Champ | Valeur |
|---|---|
| **Event code** | `reservation_declined` |
| **Trigger** | Le loueur clique "Refuser" (avec motif optionnel) |
| **Contenu affiché** | Message de refus avec motif si fourni |
| **Icône** | ❌ |
| **Couleur** | `danger` (rouge) |
| **Actions** | **Client :** "Chercher d'autres véhicules" / "Proposer d'autres dates" — **Loueur :** aucune |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"Jean a décliné votre demande de réservation. Motif : 'Véhicule indisponible ces dates.'"* |
| **Side effect** | Card initiale → statut `declined` |

### 2.4 Paiement confirmé

| Champ | Valeur |
|---|---|
| **Event code** | `payment_confirmed` |
| **Trigger** | Webhook Stripe → paiement réussi |
| **Contenu affiché** | Card de paiement avec montant, ventilation (location, frais, assurance), méthode de paiement masquée |
| **Icône** | 💳 |
| **Couleur** | `success` (vert) |
| **Actions** | **Client :** "Voir le reçu" — **Loueur :** aucune (voit le montant net attendu) |
| **Visible par** | Client ✅ Loueur ✅ (montant brut pour le client, montant net pour le loueur) Admin ✅ |
| **Message système** | *"Paiement de 1 575,00 € confirmé. Votre réservation est validée !"* |

### 2.5 Empreinte bancaire validée

| Champ | Valeur |
|---|---|
| **Event code** | `deposit_hold_confirmed` |
| **Trigger** | Webhook Stripe → empreinte caution réussie |
| **Contenu affiché** | Confirmation de la caution bloquée |
| **Icône** | 🔒 |
| **Couleur** | `info` (bleu) |
| **Actions** | **Client :** "Détails de la caution" — **Loueur :** aucune |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"Caution de 3 000,00 € pré-autorisée avec succès. Aucun débit ne sera effectué sauf en cas de dommages."* |

### 2.6 Contrat généré

| Champ | Valeur |
|---|---|
| **Event code** | `contract_generated` |
| **Trigger** | Paiement confirmé → génération automatique du contrat PDF |
| **Contenu affiché** | Card de contrat avec aperçu PDF, statut des signatures |
| **Icône** | 📄 |
| **Couleur** | `warning` (orange — action requise) |
| **Actions** | **Loueur :** "Lire le contrat" / "Signer" — **Client :** "Lire le contrat" / "Signer" |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"Le contrat de location a été généré. Les deux parties doivent le signer avant le check-in."* |
| **Card interactive** | Affiche les deux cases de signature avec statut (✅ signé / ⏳ en attente) |

### 2.7 Signature loueur confirmée

| Champ | Valeur |
|---|---|
| **Event code** | `contract_signed_owner` |
| **Trigger** | Le loueur signe le contrat (API + confirmation) |
| **Contenu affiché** | Mise à jour de la card contrat |
| **Icône** | ✍️ |
| **Couleur** | `success` |
| **Actions** | **Client :** "Signer le contrat" (si pas encore signé) |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"Jean (loueur) a signé le contrat."* |
| **Side effect** | La card contrat met à jour le statut signature loueur → ✅ |

### 2.8 Signature client confirmée

| Champ | Valeur |
|---|---|
| **Event code** | `contract_signed_client` |
| **Trigger** | Le client signe le contrat |
| **Contenu affiché** | Mise à jour de la card contrat — les deux signatures sont complètes |
| **Icône** | ✍️ |
| **Couleur** | `success` |
| **Actions** | **Les deux :** "Télécharger le contrat signé" |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"Lucas (client) a signé le contrat. Contrat complet !"* |
| **Side effect** | Card contrat → statut `fully_signed`. Lien de téléchargement du PDF signé |

### 2.9 Rappel check-in J-1

| Champ | Valeur |
|---|---|
| **Event code** | `checkin_reminder` |
| **Trigger** | Cron job — 24h avant la date de début de location |
| **Contenu affiché** | Rappel avec lieu, heure, checklist pré-check-in |
| **Icône** | ⏰ |
| **Couleur** | `info` |
| **Actions** | **Client :** "Voir les détails du check-in" / "Contacter le loueur" — **Loueur :** "Confirmer le lieu de rendez-vous" |
| **Visible par** | Client ✅ Loueur ✅ Admin ❌ |
| **Message système** | *"Rappel : Votre location de la Porsche 911 commence demain à 10h00. Lieu : 15 Rue de Rivoli, Paris."* |
| **Checklist affichée** | ☐ Contrat signé ✅ / ☐ Paiement confirmé ✅ / ☐ Pièce d'identité vérifiée ✅ / ☐ Permis de conduire vérifié ✅ |

### 2.10 Photos état des lieux — Loueur (départ)

| Champ | Valeur |
|---|---|
| **Event code** | `photos_checkin_owner` |
| **Trigger** | Le loueur upload les photos d'état des lieux via l'app |
| **Contenu affiché** | Card avec grille de miniatures (max 4 affichées + "+8 autres"), compteur total |
| **Icône** | 📸 |
| **Couleur** | `info` |
| **Actions** | **Client :** "Voir toutes les photos" / "Valider" / "Contester" — **Loueur :** "Voir" / "Ajouter des photos" |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"Jean (loueur) a uploadé 12 photos de l'état des lieux (départ)."* |
| **Métadonnées** | SHA-256 de chaque photo, géolocalisation, timestamp serveur, appareil |

### 2.11 Photos état des lieux — Client (départ)

| Champ | Valeur |
|---|---|
| **Event code** | `photos_checkin_client` |
| **Trigger** | Le client upload ses propres photos d'état des lieux |
| **Contenu affiché** | Card similaire avec miniatures |
| **Icône** | 📸 |
| **Couleur** | `info` |
| **Actions** | **Loueur :** "Voir toutes les photos" / "Valider" / "Contester" — **Client :** "Voir" / "Ajouter des photos" |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"Lucas (client) a uploadé 8 photos de l'état des lieux (départ)."* |

### 2.12 Validation mutuelle des photos (départ)

| Champ | Valeur |
|---|---|
| **Event code** | `photos_checkin_validated` |
| **Trigger** | Les deux parties ont cliqué "Valider" sur les photos de l'autre |
| **Contenu affiché** | Confirmation que l'état des lieux de départ est validé par les deux parties |
| **Icône** | ✅ |
| **Couleur** | `success` |
| **Actions** | Aucune (informatif) |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"État des lieux de départ validé par les deux parties. Bonne route ! 🚗"* |
| **Side effect** | Timestamp de validation mutuellement scellé dans `message_events`. Photos verrouillées (plus modifiables). |

### 2.13 Rappel retour J-1

| Champ | Valeur |
|---|---|
| **Event code** | `checkout_reminder` |
| **Trigger** | Cron job — 24h avant la date de fin de location |
| **Contenu affiché** | Rappel avec lieu, heure, consignes de retour |
| **Icône** | ⏰ |
| **Couleur** | `warning` |
| **Actions** | **Client :** "Voir les détails du retour" — **Loueur :** "Confirmer le lieu de retour" |
| **Visible par** | Client ✅ Loueur ✅ Admin ❌ |
| **Message système** | *"Rappel : La location se termine demain à 10h00. Merci de retourner le véhicule à l'adresse convenue."* |

### 2.14 Photos retour — Client

| Champ | Valeur |
|---|---|
| **Event code** | `photos_checkout_client` |
| **Trigger** | Le client upload les photos de retour |
| **Contenu affiché** | Card avec grille de miniatures |
| **Icône** | 📸 |
| **Couleur** | `info` |
| **Actions** | **Loueur :** "Voir" / "Valider" / "Signaler un dommage" — **Client :** "Voir" / "Ajouter" |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"Lucas (client) a uploadé 10 photos de retour du véhicule."* |

### 2.15 Photos retour — Loueur (avec signalement dommages)

| Champ | Valeur |
|---|---|
| **Event code** | `photos_checkout_owner` |
| **Trigger** | Le loueur upload ses photos de retour |
| **Contenu affiché** | Card avec miniatures. Si dommages annotés : badges rouges sur les photos concernées |
| **Icône** | 📸 (ou ⚠️ si dommages) |
| **Couleur** | `info` (ou `warning` si dommages) |
| **Actions** | **Client :** "Voir" / "Valider" / "Contester les dommages" — **Loueur :** "Voir" / "Ajouter" / "Annoter un dommage" |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"Jean (loueur) a uploadé 15 photos de retour. ⚠️ 2 dommages signalés."* |
| **Données dommages** | `damages: [{ photo_id, description, severity: "minor|major|critical", annotated_area: {x,y,w,h} }]` |

### 2.16 Validation mutuelle des photos (retour)

| Champ | Valeur |
|---|---|
| **Event code** | `photos_checkout_validated` |
| **Trigger** | Les deux parties ont validé les photos de retour |
| **Contenu affiché** | Confirmation que l'état des lieux de retour est validé |
| **Icône** | ✅ |
| **Couleur** | `success` |
| **Actions** | Aucune |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"État des lieux de retour validé par les deux parties."* |
| **Side effect** | Photos verrouillées. Si aucun dommage → process de clôture enclenché. Si dommages → facturation supplémentaire |

### 2.17 Facturation / Frais supplémentaires

| Champ | Valeur |
|---|---|
| **Event code** | `additional_charges` |
| **Trigger** | Le loueur soumet une demande de frais (dommages, retard, carburant, nettoyage) validée par le système ou l'admin |
| **Contenu affiché** | Card de facturation avec détail des frais, photos justificatives |
| **Icône** | 💰 |
| **Couleur** | `warning` |
| **Actions** | **Client :** "Voir les détails" / "Accepter" / "Contester" — **Loueur :** "Voir" |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"Des frais supplémentaires de 250,00 € ont été notifiés. Motif : Rayure pare-chocs avant."* |
| **Side effect** | Si le client accepte → débit caution. Si conteste → ouverture litige automatique |

### 2.18 Réservation clôturée

| Champ | Valeur |
|---|---|
| **Event code** | `reservation_closed` |
| **Trigger** | Toutes les étapes complétées (retour validé, pas de litige en cours, frais réglés) |
| **Contenu affiché** | Résumé de la location : dates, véhicule, coût total, statut |
| **Icône** | 🏁 |
| **Couleur** | `neutral` (gris) |
| **Actions** | **Client :** "Laisser un avis" — **Loueur :** "Laisser un avis" |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"La location de la Porsche 911 Carrera S (15–18 mars) est clôturée. Merci !"* |

### 2.19 Demande d'avis (J+2)

| Champ | Valeur |
|---|---|
| **Event code** | `review_request` |
| **Trigger** | Cron job — 48h après la clôture de la réservation |
| **Contenu affiché** | Card invitant à laisser un avis avec étoiles |
| **Icône** | ⭐ |
| **Couleur** | `info` |
| **Actions** | **Les deux :** "Laisser un avis" / "Plus tard" / "Ne pas donner d'avis" |
| **Visible par** | Client ✅ (voit sa propre demande) — Loueur ✅ (voit sa propre demande) — Chacun ne voit que SA demande d'avis |
| **Message système (client)** | *"Comment s'est passée votre location de la Porsche 911 ? Partagez votre expérience !"* |
| **Message système (loueur)** | *"Comment s'est passée la location avec Lucas ? Laissez votre avis !"* |
| **Note** | Les deux avis sont **masqués** jusqu'à ce que les deux soient soumis (ou après 14 jours), pour éviter les biais |

### 2.20 Avis publié

| Champ | Valeur |
|---|---|
| **Event code** | `review_published` |
| **Trigger** | Les deux avis sont soumis, OU délai de 14 jours écoulé |
| **Contenu affiché** | Notification que les avis sont désormais visibles |
| **Icône** | ⭐ |
| **Couleur** | `success` |
| **Actions** | **Les deux :** "Voir les avis" |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"Les avis de cette location sont maintenant publiés."* |

### 2.21 Reversement loueur effectué

| Champ | Valeur |
|---|---|
| **Event code** | `payout_completed` |
| **Trigger** | Virement Stripe Connect vers le compte du loueur effectué |
| **Contenu affiché** | Card avec montant versé, date de virement, référence |
| **Icône** | 💸 |
| **Couleur** | `success` |
| **Actions** | **Loueur :** "Voir le détail du versement" — **Client :** ne voit PAS cet événement |
| **Visible par** | Client ❌ Loueur ✅ Admin ✅ |
| **Message système** | *"Votre reversement de 1 215,00 € a été effectué. Virement attendu sous 2-3 jours ouvrés."* |

### 2.22 Litige ouvert

| Champ | Valeur |
|---|---|
| **Event code** | `dispute_opened` |
| **Trigger** | Un des deux utilisateurs ouvre un litige (bouton "Contester" ou "Signaler un problème") |
| **Contenu affiché** | Card d'alerte litige avec motif, description, pièces jointes |
| **Icône** | ⚠️ |
| **Couleur** | `danger` (rouge) |
| **Actions** | **Les deux :** "Voir le litige" / "Contacter un médiateur" — **Partie adverse :** "Répondre au litige" |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"⚠️ Lucas a ouvert un litige. Motif : Dommages non constatés au départ."* |
| **Side effect** | Conversation passe en statut `dispute`. Le reversement loueur est bloqué. Notification prioritaire aux deux parties + équipe admin. |

### 2.23 Admin rejoint la conversation

| Champ | Valeur |
|---|---|
| **Event code** | `admin_joined` |
| **Trigger** | Un médiateur Maloc rejoint la conversation (automatique si litige > 24h sans résolution, ou sur demande) |
| **Contenu affiché** | Message d'introduction du médiateur |
| **Icône** | 🛡️ |
| **Couleur** | `info` |
| **Actions** | Aucune |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"Sophie (médiateur Maloc) a rejoint la conversation pour vous aider à résoudre ce litige."* |
| **Side effect** | `conversations.admin_joined = true`, `admin_id` renseigné. L'admin peut désormais envoyer des `admin_message`. |

### 2.24 Litige résolu

| Champ | Valeur |
|---|---|
| **Event code** | `dispute_resolved` |
| **Trigger** | L'admin ou les deux parties marquent le litige comme résolu |
| **Contenu affiché** | Résumé de la résolution, décision finale, éventuels ajustements financiers |
| **Icône** | ✅ |
| **Couleur** | `success` |
| **Actions** | **Les deux :** "Voir la décision" — Si ajustement financier : "Voir le détail" |
| **Visible par** | Client ✅ Loueur ✅ Admin ✅ |
| **Message système** | *"Le litige a été résolu. Décision : Remboursement partiel de 150,00 € au client. Le reversement loueur ajusté sera effectué sous 48h."* |
| **Side effect** | Conversation repasse en statut `active`. Reversement débloqué (ajusté si nécessaire). |

### 2.25 Tableau récapitulatif des événements

| # | Event code | Trigger | Visible | Actions |
|---|---|---|---|---|
| 1 | `reservation_requested` | Client réserve | C+O+A | O: Accepter/Refuser, C: Modifier/Annuler |
| 2 | `reservation_accepted` | Loueur accepte | C+O+A | C: Payer |
| 3 | `reservation_declined` | Loueur refuse | C+O+A | C: Chercher autre |
| 4 | `payment_confirmed` | Stripe webhook | C+O+A | C: Reçu |
| 5 | `deposit_hold_confirmed` | Stripe webhook | C+O+A | C: Détails caution |
| 6 | `contract_generated` | Post-paiement | C+O+A | C+O: Lire/Signer |
| 7 | `contract_signed_owner` | Loueur signe | C+O+A | C: Signer |
| 8 | `contract_signed_client` | Client signe | C+O+A | C+O: Télécharger |
| 9 | `checkin_reminder` | Cron J-1 | C+O | C+O: Détails |
| 10 | `photos_checkin_owner` | Loueur upload | C+O+A | C: Valider/Contester |
| 11 | `photos_checkin_client` | Client upload | C+O+A | O: Valider/Contester |
| 12 | `photos_checkin_validated` | Validation mutuelle | C+O+A | — |
| 13 | `checkout_reminder` | Cron J-1 | C+O | C+O: Détails |
| 14 | `photos_checkout_client` | Client upload | C+O+A | O: Valider/Signaler |
| 15 | `photos_checkout_owner` | Loueur upload | C+O+A | C: Valider/Contester |
| 16 | `photos_checkout_validated` | Validation mutuelle | C+O+A | — |
| 17 | `additional_charges` | Loueur soumet | C+O+A | C: Accepter/Contester |
| 18 | `reservation_closed` | Auto post-retour | C+O+A | C+O: Laisser avis |
| 19 | `review_request` | Cron J+2 | C / O (séparé) | Laisser avis |
| 20 | `review_published` | 2 avis ou J+14 | C+O+A | Voir avis |
| 21 | `payout_completed` | Stripe Connect | O+A | O: Détails |
| 22 | `dispute_opened` | User ouvre litige | C+O+A | Voir/Répondre/Médiateur |
| 23 | `admin_joined` | Admin entre | C+O+A | — |
| 24 | `dispute_resolved` | Admin/parties résolvent | C+O+A | Voir décision |

*C = Client, O = Owner (loueur), A = Admin*

---

## 3. Sécurité de la messagerie

### 3.1 Chiffrement

#### En transit
- **TLS 1.3** obligatoire sur toutes les connexions (API, WebSocket, Storage)
- Certificate pinning sur l'app mobile
- HSTS strict sur le domaine web

#### Au repos
- **AES-256-GCM** pour le chiffrement des messages en base
- Clé de chiffrement gérée via Supabase Vault (ou AWS KMS)
- Les métadonnées JSONB sont chiffrées avec le même mécanisme
- Les photos sont chiffrées côté serveur dans Supabase Storage (SSE-S3)

#### Clés
- Clé maître (KEK) stockée dans un HSM / KMS externe
- Clé par conversation (DEK) dérivée de la clé maître + conversation_id
- Rotation des clés tous les 90 jours (les anciennes restent pour déchiffrer l'historique)

### 3.2 Row Level Security (RLS) — Supabase

```sql
-- Conversations : un utilisateur ne voit que SES conversations
CREATE POLICY "Users see own conversations" ON conversations
  FOR SELECT USING (
    auth.uid() = client_id OR 
    auth.uid() = owner_id OR
    -- Admin : voit tout
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Messages : un utilisateur ne voit que les messages de SES conversations
CREATE POLICY "Users see messages of own conversations" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
      AND (c.client_id = auth.uid() OR c.owner_id = auth.uid())
    )
    OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Messages : filtrage par visibilité (certains events ne sont pas visibles par tous)
CREATE POLICY "Visibility filter" ON messages
  FOR SELECT USING (
    -- Pour les system_events avec visible_to
    CASE 
      WHEN type = 'system_event' AND metadata->>'visible_to' IS NOT NULL THEN
        (
          SELECT 
            CASE 
              WHEN c.client_id = auth.uid() THEN 'client' = ANY(
                SELECT jsonb_array_elements_text(metadata->'visible_to')
              )
              WHEN c.owner_id = auth.uid() THEN 'owner' = ANY(
                SELECT jsonb_array_elements_text(metadata->'visible_to')
              )
              ELSE EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
            END
          FROM conversations c WHERE c.id = messages.conversation_id
        )
      ELSE true
    END
  );

-- Insertion : seuls les participants peuvent écrire
CREATE POLICY "Users insert messages in own conversations" ON messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
      AND (c.client_id = auth.uid() OR c.owner_id = auth.uid())
    )
    OR
    -- Admin dans une conversation en litige
    (
      EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
      AND EXISTS (
        SELECT 1 FROM conversations c 
        WHERE c.id = messages.conversation_id AND c.status = 'dispute'
      )
    )
  );

-- message_events : lecture seule pour les utilisateurs, écriture par le système uniquement
CREATE POLICY "Users read own message_events" ON message_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = message_events.conversation_id
      AND (c.client_id = auth.uid() OR c.owner_id = auth.uid())
    )
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- AUCUNE policy UPDATE/DELETE sur message_events (immutabilité)
```

### 3.3 Accès admin

- Les admins ont un rôle `admin` dans la table `profiles`
- Ils peuvent **lire** toutes les conversations (nécessaire pour les litiges)
- Ils ne peuvent **écrire** que dans les conversations en statut `dispute`
- Toute action admin est loguée dans `message_events` avec `actor_role = 'admin'`
- Accès admin via un dashboard interne séparé avec authentification MFA

### 3.4 Logs immutables

- La table `message_events` est en **append-only**
- Un trigger PostgreSQL empêche tout `UPDATE` ou `DELETE` :

```sql
CREATE OR REPLACE FUNCTION prevent_message_events_modification()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'message_events is append-only. Modifications are not allowed.';
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER no_update_message_events
  BEFORE UPDATE OR DELETE ON message_events
  FOR EACH ROW EXECUTE FUNCTION prevent_message_events_modification();
```

- Chaque événement contient un `event_hash` = SHA-256 du hash précédent + données de l'événement → **chaîne de hachage** (blockchain-like)
- Export périodique des logs vers un stockage froid (S3 Glacier) pour archivage long terme

### 3.5 Rétention des données (RGPD)

| Donnée | Durée de rétention | Justification |
|---|---|---|
| Messages texte | 3 ans après la dernière activité | Obligation légale contrats de location |
| Photos état des lieux | 5 ans | Preuve en cas de litige judiciaire |
| Contrats signés | 10 ans | Obligation légale française (Code civil) |
| Logs `message_events` | 5 ans | Preuve d'intégrité |
| Données de paiement | Gérées par Stripe | PCI DSS |
| Données supprimées sur demande | 30 jours pour exécution | Droit à l'effacement RGPD |

**Droit à l'effacement :**
- Les messages texte de l'utilisateur sont anonymisés (contenu remplacé par "[Message supprimé]")
- Les événements système sont conservés (obligation légale) mais les données personnelles sont pseudonymisées
- Les photos d'état des lieux ne peuvent PAS être supprimées pendant la durée de rétention (intérêt légitime)
- Le contrat signé est conservé 10 ans minimum
- L'utilisateur est informé de ces exceptions lors de sa demande

### 3.6 Prévention des abus

- **Rate limiting** : Max 30 messages / minute par utilisateur
- **Détection de contenu** : Filtrage des numéros de téléphone, emails, liens externes dans les messages (pour empêcher le contournement de la plateforme)
- **Signalement** : Bouton "Signaler" sur chaque message → review par admin
- **Blocage** : Un utilisateur peut bloquer l'autre → la conversation passe en `blocked`, seuls les événements système continuent
- **Anti-spam** : Détection de messages répétitifs / automatisés

---

## 4. Horodatage et preuves

### 4.1 Principes fondamentaux

> **Règle d'or : Tout timestamp provient du serveur. Jamais du client.**

Le client peut envoyer un `client_timestamp` à titre indicatif (pour la latence UX), mais le timestamp de référence est **toujours** `created_at DEFAULT now()` côté PostgreSQL.

### 4.2 Horodatage des messages

```sql
-- Le client NE PEUT PAS définir created_at
CREATE POLICY "No client timestamp override" ON messages
  FOR INSERT WITH CHECK (
    -- created_at n'est pas dans les colonnes insérées (géré par DEFAULT)
    true
  );

-- Trigger pour forcer le timestamp serveur
CREATE OR REPLACE FUNCTION force_server_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.created_at = now();  -- Écrase toute valeur fournie par le client
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER force_message_timestamp
  BEFORE INSERT ON messages
  FOR EACH ROW EXECUTE FUNCTION force_server_timestamp();
```

### 4.3 Photos — Intégrité et géolocalisation

#### Workflow d'upload

```
1. Client prend la photo via l'app Maloc
2. L'app extrait les EXIF (GPS, date, appareil)
3. Upload vers Edge Function (pas direct vers Storage)
4. Edge Function :
   a. Calcule SHA-256 du fichier brut
   b. Extrait et valide la géolocalisation EXIF
   c. Ajoute le timestamp serveur
   d. Signe le tout avec la clé privée du serveur
   e. Stocke dans Supabase Storage
   f. Crée l'entrée en base avec toutes les métadonnées
5. Le hash + signature sont stockés dans message_events (immutable)
```

#### Structure de preuve photo

```json
{
  "photo_id": "uuid",
  "file_sha256": "a1b2c3d4e5f6...",
  "file_size_bytes": 4521000,
  "geolocation": {
    "lat": 48.856614,
    "lng": 2.352222,
    "accuracy_meters": 5.2,
    "source": "exif",
    "validated": true
  },
  "timestamps": {
    "exif_taken_at": "2026-03-15T09:45:00+01:00",
    "client_uploaded_at": "2026-03-15T09:45:08+01:00",
    "server_received_at": "2026-03-15T09:45:12Z",
    "server_processed_at": "2026-03-15T09:45:13Z"
  },
  "device": {
    "model": "iPhone 16 Pro",
    "os": "iOS 19.2"
  },
  "server_signature": "RSA-SHA256:base64...",
  "signing_key_id": "maloc-photo-2026-q1"
}
```

#### Validation de la géolocalisation

- Si les EXIF ne contiennent pas de GPS → l'app demande la position au device
- La position est comparée à l'adresse de rendez-vous de la réservation
- Tolérance : **500 mètres** (configurable)
- Si la distance est > 500m → warning affiché mais upload autorisé (avec flag `location_mismatch: true`)
- Le flag est visible par l'admin en cas de litige

### 4.4 Chaîne de preuves pour les litiges

Chaque litige dispose d'une **chaîne de preuves** reconstituable :

```
1. Photos départ loueur (hash + geo + timestamp)
   ↓
2. Photos départ client (hash + geo + timestamp)
   ↓
3. Validation mutuelle départ (timestamp + signataires)
   ↓
4. [Période de location]
   ↓
5. Photos retour client (hash + geo + timestamp)
   ↓
6. Photos retour loueur (hash + geo + timestamp + annotations dommages)
   ↓
7. Validation mutuelle retour OU contestation
   ↓
8. Ouverture litige (motif + preuves jointes)
   ↓
9. Échanges dans le chat (tous horodatés serveur)
   ↓
10. Décision admin
```

Chaque étape est un `message_event` avec un `event_hash` chaîné. Il est mathématiquement impossible de modifier un événement passé sans casser la chaîne.

#### Export de preuves

```sql
-- Fonction pour exporter la chaîne de preuves d'une réservation
CREATE OR REPLACE FUNCTION export_evidence_chain(p_reservation_id UUID)
RETURNS TABLE (
  event_order INT,
  event_type TEXT,
  event_data JSONB,
  event_hash TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ROW_NUMBER() OVER (ORDER BY me.created_at)::INT,
    me.event_type,
    me.metadata,
    me.event_hash,
    me.created_at
  FROM message_events me
  JOIN messages m ON m.id = me.message_id
  WHERE m.reservation_id = p_reservation_id
  ORDER BY me.created_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 4.5 Signature numérique

- **Algorithme** : RSA-2048 avec SHA-256 (ou Ed25519 pour les nouvelles clés)
- **Clé privée** : Stockée dans un KMS (AWS KMS ou Supabase Vault)
- **Rotation** : Trimestrielle, les anciennes clés restent pour vérification
- **Vérification** : Endpoint public `/api/verify-evidence` pour vérifier l'intégrité d'une preuve

---

## 5. UI/UX de la messagerie

### 5.1 Layout général

```
┌─────────────────────────────────────────────────────────────┐
│  🔍 Rechercher                                    [👤 Profil]│
├──────────────┬──────────────────────────────────────────────┤
│              │  Jean — Porsche 911          🟢 En ligne     │
│ Conversations│──────────────────────────────────────────────│
│              │                                              │
│ ┌──────────┐ │  [system] Réservation acceptée ✅            │
│ │🟢 Jean   │ │  ┌─────────────────────────────┐            │
│ │ Porsche..│ │  │ 📋 Réservation #4521        │            │
│ │ 2 non-lus│ │  │ Porsche 911 Carrera S       │            │
│ └──────────┘ │  │ 15-18 mars 2026 — 1 575 €  │            │
│ ┌──────────┐ │  │ [Procéder au paiement]      │            │
│ │  Marie   │ │  └─────────────────────────────┘            │
│ │ BMW M4.. │ │                                              │
│ │          │ │  Jean: Super, hâte de vous remettre les clés│
│ └──────────┘ │                                              │
│ ┌──────────┐ │  Vous: Parfait, à samedi ! 🙌              │
│ │  Alex    │ │                                              │
│ │ Ferrari..│ │  [system] 💳 Paiement confirmé — 1 575 €   │
│ └──────────┘ │                                              │
│              │  [system] 📄 Contrat généré                  │
│              │  ┌─────────────────────────────┐            │
│              │  │ Contrat de location          │            │
│              │  │ ⏳ Jean — En attente          │            │
│              │  │ ⏳ Vous — En attente          │            │
│              │  │ [Lire le contrat] [Signer]   │            │
│              │  └─────────────────────────────┘            │
│              │                                              │
│              │──────────────────────────────────────────────│
│              │  [📎] [📷] Votre message...        [Envoyer]│
│              │  Jean est en train d'écrire...               │
└──────────────┴──────────────────────────────────────────────┘
```

### 5.2 Sidebar conversations

- **Tri** : Par `last_message_at` DESC (plus récent en haut)
- **Badge non-lu** : Pastille avec compteur (rouge)
- **Aperçu** : Dernière ligne du dernier message (120 chars max), tronqué
- **Avatar** : Photo de profil de l'interlocuteur
- **Indicateur en ligne** : Point vert si online, gris si offline
- **Filtres** : Toutes / En cours / Litiges / Archivées
- **Recherche** : Par nom d'utilisateur ou nom de véhicule
- **Swipe actions (mobile)** : Archiver, Marquer comme lu, Épingler

### 5.3 Cards interactives

Chaque type de card a un design cohérent :

#### Principes de design
- **Fond** : Surface élevée (légèrement plus claire que le fond du chat en mode sombre)
- **Border** : 1px subtle, arrondi 12px
- **En-tête** : Icône + titre en gras + badge de statut
- **Corps** : Informations structurées
- **Pied** : Boutons d'action alignés à droite
- **Couleurs des badges** : Vert (succès), Orange (en attente), Rouge (alerte), Bleu (info), Gris (terminé)

#### Card de réservation
```
┌──────────────────────────────────────┐
│ 📋 Demande de réservation            │
│                                      │
│ ┌──────┐  Porsche 911 Carrera S      │
│ │ 🚗   │  2024 • Blanc              │
│ │ img  │  ⭐ 4.9 (23 avis)          │
│ └──────┘                             │
│                                      │
│ 📅 15 mars → 18 mars 2026 (3 jours) │
│ 💰 450 €/jour → Total : 1 575 €     │
│                                      │
│ ⏳ En attente de réponse             │
│                                      │
│        [Refuser]  [✅ Accepter]      │
└──────────────────────────────────────┘
```

#### Card de photos (état des lieux)
```
┌──────────────────────────────────────┐
│ 📸 État des lieux — Départ           │
│ Par Jean (loueur) • 15 mars, 09:45   │
│                                      │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │
│ │     │ │     │ │     │ │ +8  │    │
│ │ img │ │ img │ │ img │ │     │    │
│ └─────┘ └─────┘ └─────┘ └─────┘    │
│                                      │
│ 12 photos • GPS vérifié ✅           │
│                                      │
│   [Voir tout]  [✅ Valider]         │
└──────────────────────────────────────┘
```

#### Card de contrat
```
┌──────────────────────────────────────┐
│ 📄 Contrat de location               │
│ Porsche 911 Carrera S — 15-18 mars   │
│                                      │
│ Signatures :                         │
│ ✅ Jean (loueur) — Signé le 14/03    │
│ ⏳ Lucas (client) — En attente       │
│                                      │
│   [Lire le contrat]  [✍️ Signer]     │
└──────────────────────────────────────┘
```

### 5.4 Boutons d'action dans les événements système

- Les boutons sont **contextuels** : ils n'apparaissent que pour l'utilisateur concerné
- Les boutons sont **éphémères** : une fois l'action effectuée, ils disparaissent et sont remplacés par le statut final
- Les actions critiques (signer, payer, accepter) requièrent une **confirmation modale**
- Les boutons ont des styles cohérents :
  - **Primary** (bleu Maloc) : action principale positive
  - **Success** (vert) : validation / acceptation
  - **Danger** (rouge) : refus / contestation / suppression
  - **Ghost** (transparent + border) : action secondaire (voir, détails)

### 5.5 Bouton "Appeler un admin"

- **Emplacement** : Header de la conversation (⋮ menu > "Demander un médiateur") + dans les cards de litige
- **Condition d'affichage** : Uniquement si la conversation est en statut `dispute` OU si l'utilisateur a un problème (accessible aussi via "Signaler un problème")
- **Comportement** :
  1. Confirmation modale : "Êtes-vous sûr ? Un médiateur Maloc rejoindra cette conversation."
  2. API call : `POST /disputes/{id}/request-admin`
  3. Notification à l'équipe admin (Slack + dashboard)
  4. Événement système `admin_joined` injecté quand l'admin se connecte
- **SLA** : Réponse admin dans les 2h (heures ouvrées) / 12h (hors heures)

### 5.6 Notifications push

#### Canaux de notification

| Événement | Push mobile | Push web | In-app | Email |
|---|---|---|---|---|
| Nouveau message | ✅ | ✅ | ✅ | ❌ |
| Réservation reçue | ✅ | ✅ | ✅ | ✅ |
| Réservation acceptée | ✅ | ✅ | ✅ | ✅ |
| Réservation refusée | ✅ | ✅ | ✅ | ✅ |
| Paiement confirmé | ✅ | ✅ | ✅ | ✅ |
| Contrat à signer | ✅ | ✅ | ✅ | ✅ |
| Rappel J-1 | ✅ | ✅ | ✅ | ✅ |
| Photos uploadées | ✅ | ✅ | ✅ | ❌ |
| Litige ouvert | ✅ (prioritaire) | ✅ | ✅ | ✅ |
| Admin rejoint | ✅ | ✅ | ✅ | ❌ |
| Reversement effectué | ✅ | ✅ | ✅ | ✅ |
| Demande d'avis | ✅ | ✅ | ✅ | ✅ (J+5) |

#### Règles de notification
- **Ne pas notifier** si l'utilisateur est actuellement dans la conversation (vérifié via Presence)
- **Grouper** les notifications si plusieurs messages rapprochés (debounce 30s)
- **Priorité** : Litiges = haute priorité (bypass DND), reste = normale
- **Contenu** : Aperçu du message (max 100 chars), nom de l'expéditeur, nom du véhicule
- **Deep link** : Ouvre directement la conversation sur le bon message

#### Stack technique
- **Mobile** : Firebase Cloud Messaging (FCM) pour Android + APNs pour iOS
- **Web** : Web Push API (service worker)
- **Backend** : Edge Function qui dispatch vers les différents canaux
- **Préférences** : L'utilisateur peut configurer ses préférences de notification par canal

### 5.7 Mode sombre

Le design Maloc utilise un mode sombre premium cohérent avec l'image haut de gamme :

| Élément | Couleur sombre | Couleur claire |
|---|---|---|
| Fond principal | `#0A0A0F` | `#FFFFFF` |
| Fond conversation | `#111118` | `#F5F5F7` |
| Fond card | `#1A1A24` | `#FFFFFF` |
| Fond message envoyé | `#1E3A5F` (bleu Maloc foncé) | `#DCE8F5` |
| Fond message reçu | `#1E1E2A` | `#E8E8ED` |
| Fond événement système | `transparent` | `transparent` |
| Texte principal | `#EAEAF0` | `#1A1A1F` |
| Texte secondaire | `#8888A0` | `#6E6E80` |
| Accent primaire | `#3B82F6` (bleu Maloc) | `#2563EB` |
| Succès | `#22C55E` | `#16A34A` |
| Warning | `#F59E0B` | `#D97706` |
| Danger | `#EF4444` | `#DC2626` |
| Bordure card | `#2A2A3A` | `#E5E5EA` |
| Séparateur | `#1F1F2E` | `#F0F0F5` |

- **Typographie** : Inter (ou SF Pro sur iOS) — messages en 15px, métadonnées en 13px
- **Animations** : Transitions douces (200ms ease) pour l'apparition des messages et cards
- **Haptics** : Retour haptique léger à l'envoi d'un message (iOS)

---

## 6. Questions ouvertes

### Q1 : Faut-il permettre les messages vocaux ?

**Suggestion :** Oui, dans une v2. Les messages vocaux sont utiles pour les instructions de check-in/check-out. Implémentation via enregistrement in-app + upload vers Supabase Storage + player inline dans le chat. Transcription automatique (Whisper API) pour la recherche et l'accessibilité.

**Priorité :** Moyenne — V2

### Q2 : Faut-il chiffrer de bout en bout (E2EE) ?

**Suggestion :** Non. Le chiffrement E2EE empêcherait l'admin de lire les conversations en cas de litige, ce qui est un besoin métier critique. Le chiffrement au repos (AES-256) + en transit (TLS 1.3) est suffisant et conforme au RGPD. Si un jour nécessaire, on pourrait implémenter un système où la clé E2EE est escrowed côté serveur, mais la complexité n'est pas justifiée.

**Décision recommandée :** Chiffrement serveur-side uniquement.

### Q3 : Combien de temps garder les conversations archivées ?

**Suggestion :** 3 ans après la dernière activité (aligné sur la prescription légale pour les contrats de location). Après 3 ans, anonymisation automatique des messages texte. Les photos et contrats suivent leurs propres durées de rétention (5 ans et 10 ans).

**Décision recommandée :** 3 ans, avec anonymisation progressive.

### Q4 : Quid si une partie ne valide pas les photos d'état des lieux ?

**Suggestion :** 
- Timeout de **4 heures** pour valider les photos
- Après 4h : notification de rappel
- Après **24h** : validation automatique implicite avec mention "Validé par défaut (pas de réponse dans les 24h)"
- L'utilisateur peut contester dans les **48h** suivant la validation auto
- Le tout est loggé dans `message_events` pour preuve

**Décision recommandée :** Validation auto après 24h avec période de contestation de 48h.

### Q5 : Les messages doivent-ils être modifiables / supprimables ?

**Suggestion :**
- **Messages texte** : Modifiable dans les 15 minutes, avec mention "[modifié]". L'original est conservé dans `message_events`.
- **Suppression** : Soft delete uniquement. Le message apparaît comme "[Message supprimé]" mais le contenu original reste en base (accessible admin).
- **Événements système** : Jamais modifiables ni supprimables.

**Décision recommandée :** Modification limitée (15 min), suppression soft-only.

### Q6 : Comment gérer les conversations avec plusieurs véhicules du même loueur ?

**Suggestion :** La conversation est unique par paire client/loueur. Si le client veut louer un autre véhicule du même loueur, la nouvelle réservation apparaît dans la même conversation. Les cards de réservation sont clairement identifiées avec le nom du véhicule. Un filtre "Par réservation" permet de ne voir que les messages/events liés à une réservation spécifique.

**Décision recommandée :** 1 conversation unique avec filtre par réservation.

### Q7 : Faut-il intégrer un système de traduction automatique ?

**Suggestion :** Oui, pour la v2. Maloc étant premium et potentiellement international, la traduction automatique (DeepL API ou Google Translate) permettrait aux loueurs parisiens de communiquer avec des clients étrangers. Bouton "Traduire" sous chaque message, avec mention "Traduit automatiquement".

**Priorité :** Basse — V2/V3

### Q8 : Quel comportement si le client ou le loueur supprime son compte ?

**Suggestion :**
- La conversation est conservée (obligations légales)
- Les messages de l'utilisateur supprimé sont anonymisés : "Utilisateur supprimé" comme nom
- Les événements système restent intacts
- Les photos d'état des lieux restent (intérêt légitime)
- L'autre partie voit un bandeau "Cet utilisateur a supprimé son compte"

**Décision recommandée :** Anonymisation sans suppression de la conversation.

### Q9 : Appels audio/vidéo dans la messagerie ?

**Suggestion :** Non en v1. La messagerie texte + events système couvrent 95% des besoins. Les appels ajoutent une complexité technique majeure (WebRTC, TURN servers) pour peu de valeur ajoutée dans un contexte de location. Si nécessaire, rediriger vers un appel téléphonique classique (avec numéro Maloc masqué pour la confidentialité).

**Priorité :** Basse — V3 éventuellement

### Q10 : Comment gérer les réservations instantanées (sans approbation loueur) ?

**Suggestion :** Pour les loueurs ayant activé la "Réservation instantanée" :
- L'événement `reservation_requested` est immédiatement suivi de `reservation_accepted` (auto)
- Le message système est adapté : "Réservation confirmée instantanément !"
- Le flux passe directement au paiement
- Le contrat est généré plus vite

**Décision recommandée :** Même flow, mais événement accept auto + flag `instant: true`.

### Q11 : Pagination et performance pour les longues conversations ?

**Suggestion :**
- Chargement initial : 50 derniers messages
- Infinite scroll vers le haut : chargement par batch de 50
- Les cards interactives avec état expiré sont rendues en mode compact (collapsed)
- Cache local (IndexedDB / AsyncStorage) pour les messages déjà chargés
- Curseur basé sur `created_at` (pas sur `offset`) pour la stabilité

**Décision recommandée :** Pagination par curseur, cache local, collapse des anciennes cards.

### Q12 : Faut-il un mode "hors-ligne" ?

**Suggestion :** Oui, basique :
- Les messages déjà chargés sont disponibles hors-ligne (cache local)
- Les messages rédigés hors-ligne sont mis en file d'attente et envoyés à la reconnexion
- Les événements système sont synchronisés au retour en ligne
- Indicateur "Hors ligne — les messages seront envoyés à la reconnexion"

**Priorité :** Moyenne — V1.5

---

## Annexes

### A. Diagramme de séquence — Cycle de vie complet d'une réservation

```
Client                    Serveur                    Loueur
  │                          │                          │
  │── Réserver ──────────────>│                          │
  │                          │── reservation_requested ─>│
  │                          │                          │
  │                          │<── Accepter ─────────────│
  │<── reservation_accepted ─│                          │
  │                          │                          │
  │── Payer ─────────────────>│                          │
  │<── payment_confirmed ────│── payment_confirmed ────>│
  │<── deposit_hold ─────────│                          │
  │<── contract_generated ───│── contract_generated ───>│
  │                          │                          │
  │                          │<── Signer ───────────────│
  │<── contract_signed_owner │                          │
  │── Signer ────────────────>│                          │
  │                          │── contract_signed_client >│
  │                          │                          │
  │<── checkin_reminder ─────│── checkin_reminder ─────>│
  │                          │                          │
  │                          │<── Upload photos ────────│
  │<── photos_checkin_owner ─│                          │
  │── Upload photos ─────────>│                          │
  │                          │── photos_checkin_client ─>│
  │── Valider photos ────────>│                          │
  │                          │<── Valider photos ───────│
  │<── photos_validated ─────│── photos_validated ─────>│
  │                          │                          │
  │         [=== LOCATION EN COURS ===]                 │
  │                          │                          │
  │<── checkout_reminder ────│── checkout_reminder ────>│
  │                          │                          │
  │── Upload photos retour ──>│                          │
  │                          │── photos_checkout_client >│
  │                          │<── Upload photos retour ─│
  │<── photos_checkout_owner │                          │
  │── Valider ───────────────>│                          │
  │                          │<── Valider ──────────────│
  │<── photos_validated ─────│── photos_validated ─────>│
  │                          │                          │
  │<── reservation_closed ───│── reservation_closed ───>│
  │                          │── payout_completed ─────>│
  │                          │                          │
  │<── review_request ───────│── review_request ───────>│
  │── Laisser avis ──────────>│                          │
  │                          │<── Laisser avis ─────────│
  │<── review_published ─────│── review_published ─────>│
```

### B. Index des event_codes

```
reservation_requested    | reservation_accepted     | reservation_declined
payment_confirmed        | deposit_hold_confirmed   | contract_generated
contract_signed_owner    | contract_signed_client   | checkin_reminder
photos_checkin_owner     | photos_checkin_client     | photos_checkin_validated
checkout_reminder        | photos_checkout_client    | photos_checkout_owner
photos_checkout_validated| additional_charges        | reservation_closed
review_request           | review_published          | payout_completed
dispute_opened           | admin_joined              | dispute_resolved
```

### C. Priorités d'implémentation

| Phase | Fonctionnalités |
|---|---|
| **V1 — MVP** | Messages texte, events système (réservation, paiement, contrat), photos état des lieux, notifications push, RLS, mode sombre |
| **V1.5** | Litiges + admin, validation mutuelle photos, chaîne de preuves, mode hors-ligne basique |
| **V2** | Messages vocaux, traduction auto, réservation instantanée, analytics messagerie |
| **V3** | Appels masqués, IA assistant (suggestions de réponse), chatbot FAQ |

---

*Document généré pour le projet Maloc — Plateforme de location de véhicules haut de gamme.*
*Dernière mise à jour : 8 février 2026*

---

## 7. Éléments de l'ancienne version Maloc
*Ajouté par Maloc OS — basé sur l'analyse technique de l'ancien système*

### 7.1 Mapping avec l'ancien système

L'ancienne version utilisait une table `Notifications` séparée. Dans la nouvelle architecture, les notifications sont remplacées par les **events système dans la messagerie**.

| Ancien système | Nouveau système (Messagerie) |
|----------------|------------------------------|
| `Notifications.type` | `messages.type = 'system_event'` |
| `Notifications.isRead` | `messages.read_by_client/owner` |
| `Notifications.userId` | `conversations.client_id/owner_id` |
| Tables séparées (Booking, Contract, Deposits) | Cards interactives dans la conversation |

### 7.2 Types d'événements à migrer

D'après l'ancienne base, voici les événements à implémenter :

**Workflow Réservation (ancien: Booking)**
```json
{
  "event_type": "reservation_request",
  "metadata": {
    "reservation_id": "uuid",
    "vehicle_id": "uuid",
    "start_at": "timestamp",
    "end_at": "timestamp",
    "price_total": "decimal",
    "status": "pending|approved|rejected|cancelled"
  }
}
```

**Workflow Contrat (ancien: Contract)**
```json
{
  "event_type": "contract_ready",
  "metadata": {
    "contract_id": "uuid",
    "reservation_id": "uuid",
    "pdf_url": "string",
    "requires_signature": true,
    "signed_by_client": false,
    "signed_by_owner": false
  }
}
```

**Workflow Caution (ancien: Deposits)**
```json
{
  "event_type": "deposit_action",
  "metadata": {
    "deposit_id": "uuid",
    "amount": "decimal",
    "action": "blocked|released|retained",
    "reason": "string|null"
  }
}
```

### 7.3 Rôles et permissions (ancien RBAC)

L'ancien système avait 4 rôles. Voici le mapping pour la messagerie :

| Ancien rôle | Nouveau sender_role | Permissions messagerie |
|-------------|---------------------|------------------------|
| `user` | `client` | Envoyer messages, voir sa conversation |
| `provider` | `owner` | Envoyer messages, voir ses conversations |
| `first_login_provider` | `owner` | Idem provider (après changement mdp) |
| `admin` | `admin` | Rejoindre conversations en litige, modérer |

### 7.4 Structure des anciens workflows à intégrer

**CreateVehicleRequest → Notification loueur**
Quand un admin valide un véhicule, envoyer un system_event dans les conversations du loueur :
```json
{
  "type": "system_event",
  "metadata": {
    "event": "vehicle_approved",
    "vehicle_id": "uuid",
    "vehicle_name": "Porsche 911",
    "message": "Votre véhicule a été approuvé et est maintenant visible sur le catalogue."
  }
}
```

**MembershipRequest → Notification nouvel adhérent**
Quand un admin approuve une adhésion :
```json
{
  "type": "system_event",
  "metadata": {
    "event": "membership_approved",
    "user_id": "uuid",
    "message": "Bienvenue chez Maloc ! Votre compte prestataire est activé."
  }
}
```

---

## 8. Template Admin (Spike Next.js)
*Ajouté par Maloc OS*

### 8.1 Stack du template

Le template `Spike template nextjs.zip` utilise :

| Composant | Librairie |
|-----------|-----------|
| UI Components | **MUI (Material UI)** v5 |
| State | Redux Toolkit |
| Tables | TanStack React Table |
| Graphiques | ApexCharts |
| Rich Text | TipTap |
| Permissions | CASL |
| Drag & Drop | dnd-kit |
| Date | date-fns + MUI X Date Pickers |
| Icons | Tabler Icons + MUI Icons |

### 8.2 Thème

- **Mode** : Dark theme (cohérent avec Maloc)
- **Couleurs** : Personnalisables via MUI ThemeProvider
- **Responsive** : Oui (mobile-first)

### 8.3 Modules disponibles dans le template

D'après la structure du zip, le template inclut :
- Dashboard avec charts
- Tables avec pagination/filtres
- Formulaires
- Blog/MDX
- Auth pages

### 8.4 Recommandation d'utilisation

Pour le **Dashboard Admin Maloc**, on peut :
1. Extraire le template dans `/var/www/maloc-admin/`
2. Customiser les couleurs (bleu Maloc #007BFF)
3. Créer les pages :
   - `/admin/dashboard` — Stats globales
   - `/admin/users` — Gestion utilisateurs
   - `/admin/providers` — Gestion loueurs
   - `/admin/vehicles` — Validation véhicules
   - `/admin/reservations` — Suivi réservations
   - `/admin/disputes` — Litiges (avec accès messagerie)
   - `/admin/payments` — Suivi paiements/cautions

### 8.5 Intégration Messagerie Admin

Le dashboard admin doit permettre :
- Voir les conversations en litige (`status = 'dispute'`)
- Rejoindre une conversation (`admin_joined = true`)
- Envoyer des messages avec `sender_role = 'admin'`
- Forcer la résolution (libérer/retenir caution)

---

## 9. Éléments à ajouter aux autres fichiers
*Par Maloc OS*

### Pour `maloc-flow-reservation.md`

L'ancienne version avait un workflow structuré :
1. Booking créé (status: pending)
2. Loueur accepte → Contract généré
3. Client paie → Deposit bloqué
4. Dates de location → UIPlanning mis à jour
5. Retour → Deposit libéré ou litige

### Pour `analyse-maquettes-complete.md`

Le template Spike peut servir de base pour :
- Dashboard Admin
- CRM Prestataire (iPad)
- Backoffice Maloc

**À extraire** : `/var/www/Maloc-project/old maloc/Spike template nextjs.zip` → `/var/www/maloc-admin/`

---

> *Complément ajouté le 8 février 2026 par Maloc OS 🦞*
> *Basé sur : analyse_technique_detaillee.md + maloc_backup_clean.sql + Spike template nextjs.zip*

