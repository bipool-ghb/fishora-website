# Handoff: Fishora — Fresh Halal Protein Store Website

## Overview
Fishora is an e-commerce website for a halal protein store based in Ishwardi, Pabna, Bangladesh. It sells fresh fish, meat, eggs, prawns, and dried fish with nationwide delivery. The site includes an online ordering system, shopping cart, checkout with Bangladeshi payment methods (bKash, Nagad, COD, bank transfer), and a services section for wholesale, wedding/event catering, fish/meat processing, and pre-orders.

## About the Design Files
The files in this bundle are **design references created in HTML/React** — prototypes showing intended look and behavior, not production code to copy directly. The task is to **recreate these designs in the target codebase's existing environment** (Next.js, React, etc.) using established patterns, a real backend, database, and payment integrations — or, if no environment exists yet, choose the most appropriate full-stack framework (e.g. Next.js + PostgreSQL + Stripe/bKash API).

## Fidelity
**High-fidelity (hifi)** — These are pixel-perfect mockups with final colors, typography, spacing, interactions, and bilingual content (English + Bangla). The developer should recreate the UI closely using the codebase's existing libraries.

---

## Screens / Views

### 1. Home Page
**Purpose:** Landing page — introduces the brand, showcases categories, featured products, and services.

**Layout:**
- **Hero section:** Full-width, min-height 480px. Two variants:
  - *Overlay*: Background image (fish on ice) with dark overlay (opacity 0.55), white text left-aligned, max-width 600px
  - *Split*: 50/50 grid — text left, image right
- **Hero content:** Badge pill ("100% Fresh & Halal"), H1 (52px/800), bilingual description, two CTAs (Shop Now + WhatsApp Order)
- **Categories section:** Centered heading, 5-column auto-fit grid (min 180px), cards with icon + name (EN/BN)
- **Featured Products:** 4-column auto-fit grid (min 240px) of ProductCards, filtered by `badge` field, max 6 items
- **Services section:** 4-column auto-fit grid (min 260px), cards with colored top border (3px), icon, title (EN/BN), description
- **Trust badges:** 4-column grid, centered icon + text

### 2. Shop Page
**Purpose:** Full product catalog with filtering, search, and sorting.

**Layout:**
- Max-width 1200px centered
- **Filters bar:** Search input (220px), category pill buttons (horizontal scroll on mobile), sort dropdown (right-aligned)
- **Product grid:** `repeat(auto-fill, minmax(240px, 1fr))`, 20px gap

**Product Card component:**
- 160px image placeholder area (category-colored tint background, emoji icon)
- Optional badge (absolute top-right, pill shape)
- Category label (uppercase, 12px, category color)
- Product name (16px/600) + Bangla name (13px, #888)
- Price: ৳{price}/{unit} — 20px/700, accent color
- Quantity selector (−/+) + "Add to Cart" button
- Hover: translateY(-2px) + shadow increase

### 3. Cart Page
**Purpose:** Review cart items, adjust quantities, proceed to checkout.

**Layout:** Two-column grid — items list (1fr) + order summary sidebar (340px, sticky top:80)
- Each cart item: horizontal card with icon, name, price/unit, qty controls, line total, remove button
- Summary: subtotal, delivery (free over ৳2,000, else ৳100), total, checkout button
- Empty state: centered emoji + message + CTA

### 4. Checkout Page
**Purpose:** Collect delivery info and payment method, place order.

**Layout:** Max-width 700px, stacked sections
- **Delivery info:** Name + Phone (2-col grid), Address (textarea)
- **Payment method:** 4-option grid — bKash (#E2136E), Nagad (#F6921E), COD (#555), Bank (#1565C0). Selected = colored border + tinted bg
- **Order total bar:** Accent-tinted background, total + item count + "Place Order" button
- **Success state:** Checkmark + confirmation message (EN/BN) + WhatsApp follow-up note

### 5. Services Page
**Purpose:** Showcase wholesale, wedding/event, processing, and pre-order services with quote request form.

**Layout:** Two-column grid — details (1fr) + quote form (380px, sticky)
- **Tab navigation:** 4 pills (Wholesale, Wedding & Events, Clean & Cut, Pre-Order)
- **Tab content:** Title (EN/BN), description (EN/BN), feature checklist with accent checkmarks
- **Quote form:** Name, Phone, Service Type (dropdown), Event Date, Details (textarea), Submit + WhatsApp buttons
- **Success state:** Confirmation + "Submit Another" + WhatsApp CTA

### 6. About Page
**Purpose:** Brand story and stats.

**Layout:** Max-width 800px, cover photo (full-width rounded), bilingual paragraphs, 2x2 stats grid (accent-tinted cards)

### 7. Delivery Page
**Purpose:** Delivery area, timing, charges, packaging info.

**Layout:** Max-width 800px, stacked cards with accent left-border (4px), each with title (EN/BN) + description

### 8. Contact Page
**Purpose:** Contact info + message form.

**Layout:** Two-column grid — contact details (icon + text list, WhatsApp CTA) + message form (name, phone, message, submit)

---

## Interactions & Behavior
- **Navigation:** SPA-style client routing via React state. Scroll-to-top on page change.
- **Cart:** Add items with quantity, increment/decrement in cart, remove items. Persisted in React state (add localStorage for production).
- **Hover states:** Cards lift (translateY -2px) with shadow increase. Buttons change opacity (0.85). Outline buttons fill on hover.
- **Mobile:** Hamburger menu at ≤768px, desktop nav hidden. Grid columns collapse naturally via auto-fit.
- **WhatsApp:** Floating button (fixed bottom-right, z-200), links to `wa.me/8801357187246`. Scale 1.1 on hover.
- **Checkout flow:** Cart → Checkout → Order confirmation. Payment method selection is visual (not functional in prototype).
- **Services:** Tab switching, quote form submission → success state.

## State Management
- `page` — current active page (string)
- `cart` — array of `{ product, qty }` objects
- `tweaks` — accent color, hero style, card style (for design exploration only; pick one for production)
- Services page: `activeTab`, `submitted` (local state)
- Checkout: `payment` method, `placed` boolean

## Design Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Accent (Teal) | `#0D7C66` | Primary brand color, buttons, links, badges |
| Alt: Ocean | `#1565C0` | Alternative brand theme |
| Alt: Forest | `#2E7D32` | Alternative brand theme |
| Alt: Coral | `#D84315` | Alternative brand theme |
| Alt: Royal | `#5E35B1` | Alternative brand theme |
| Background | `#f9fafb` | Page background |
| Surface | `#ffffff` | Cards, modals |
| Text Primary | `#1a1a1a` | Headings |
| Text Secondary | `#444444` | Body text |
| Text Muted | `#888888` | Descriptions, Bangla subtitles |
| Border | `#e0e0e0` / `#eee` / `#f0f0f0` | Card/input borders |
| Footer BG | `#1a1a1a` | Footer background |
| WhatsApp | `#25D366` | WhatsApp buttons |
| bKash | `#E2136E` | Payment option |
| Nagad | `#F6921E` | Payment option |
| Fish category | `#1976D2` | Category accent |
| Meat category | `#C62828` | Category accent |
| Eggs category | `#F9A825` | Category accent |
| Prawns category | `#E65100` | Category accent |
| Dried category | `#6D4C41` | Category accent |

### Typography
- **Font:** DM Sans (Google Fonts) — weights 400, 500, 600, 700, 800
- **Hero H1:** 52px / 800 / line-height 1.15
- **Page H1:** 28-32px / 700
- **Section H2:** 28px / 700
- **Card title:** 16px / 600
- **Body:** 15-16px / 400 / line-height 1.6-1.8
- **Small/labels:** 12-13px / 500-600
- **Price:** 20px / 700
- **Bangla subtitles:** 13px / 400, color #888

### Spacing
- Page max-width: 1200px
- Section padding: 60px vertical, 20px horizontal
- Card padding: 14-28px
- Card border-radius: 10-16px
- Button border-radius: 8-10px
- Pill border-radius: 20px
- Grid gap: 16-24px

### Shadows
- Card default: `0 1px 4px rgba(0,0,0,0.04)`
- Card hover: `0 6px 24px rgba(0,0,0,0.1)`
- Shadow card variant: `0 4px 20px rgba(0,0,0,0.08)`
- Navbar: `0 1px 8px rgba(0,0,0,0.04)`
- WhatsApp button: `0 4px 16px rgba(37,211,102,0.4)`

## Product Data
See `data.jsx` for full product catalog. 5 categories, ~22 products with:
- `id`, `cat`, `name` (EN), `nameBn` (BN), `price` (BDT), `unit` (kg/dozen), `badge` (optional)

## Assets
- `assets/Fishora-logo.jpeg` — Brand logo (used in navbar + footer)
- `assets/cover-photo.jpeg` — Fish on ice photo
- `assets/cover-photo-bd.png` — Cover with Fishora branding overlay
- `assets/Fresh fish assortment on ice.png` — Hero background image
- Product images are placeholders (emoji icons) — **replace with real product photography**

## Files
| File | Description |
|------|-------------|
| `Fishora Website.html` | Main entry point — app shell, routing, tweaks config |
| `data.jsx` | Product catalog and category definitions |
| `components.jsx` | Shared UI: Navbar, ProductCard, Footer, WhatsAppButton |
| `pages.jsx` | All page components: Home, Shop, Cart, Checkout, About, Delivery, Contact, Services |
| `assets/` | Logo and imagery |

## Production Considerations
- Add a real database (PostgreSQL/MongoDB) for products, orders, users
- Implement authentication for order tracking
- Integrate bKash/Nagad payment APIs
- Add real product images (replace emoji placeholders)
- Implement server-side order processing with WhatsApp notification API
- Add SEO meta tags and Open Graph for social sharing
- Add Bangla language toggle (currently mixed inline)
- Implement proper form validation
- Add order tracking / order history page
- Consider SSR (Next.js) for SEO on product pages
