# Choudharys Charcha — Luxury Redesign
## Design System & Implementation Plan

**Status:** Planning / documentation only. No production files, Sanity content, or deployment have been touched. This document lives locally in the repository and is not committed or pushed as part of this phase.

**Brand:** Choudharys Charcha — a premium Indian hospitality/culture house, Banaras-rooted, that started with tea. Primary emotional tagline: **"Bolne Wali Chai."** Supporting line: **"Banaras ki Chai. Duniya ki Charcha."**

Product range: Charcha Gold Tea (signature), Charcha Arabica Coffee (signature), Charcha Green Tea, Charcha Elaichi Chai, Charcha Khada Garam Masala / Mix Masala.

Feel: premium, cinematic, editorial, contemporary Indian, Banaras-rooted, warm, confident, sophisticated, restrained.
Not: generic SaaS, AI-generated, template-driven, overly ecommerce, overly decorative, crowded, gold-heavy.

---

## 1. Design Tokens

### Color

| Token | Hex | Role |
|---|---|---|
| `ink` (charcoal) | `#141210` | Primary dark ground |
| `ink-soft` | `#221E1A` | Secondary dark surface (already in Tailwind as `charcoal-light`) |
| `paper` (cream) | `#F7F1E4` | Primary light ground |
| `paper-dim` | `#EDE6D4` | Quiet/shelf surfaces — The Table |
| `gold` | `#C9A24A` | Hairlines, rules, small details, selected typography only — never a fill |
| `gold-dim` | `#9C7B33` | Gold-on-cream text where contrast matters (already in Tailwind as `gold.dark`) |
| `gold-light` | `#E4C77E` | Reserved for rare large-type moments only (already in Tailwind) |
| `ember` (photographic only) | `#B35A2E` | **Not a UI token.** Appears only inside Gold Tea photography grading. Never a background, border, or button color. |

Two text-on-surface pairs are load-bearing and must stay as-is: `ink` on `paper` and `paper` on `ink` (both comfortably pass AA). Every other pairing is decorative and must be checked case-by-case (see §15).

### Radius

Current site leans on `rounded-3xl` (24px) almost everywhere — pills, cards, image frames. That softness reads closer to "SaaS app" than "editorial house." Proposed scale, used deliberately rather than by default:

| Token | Value | Use |
|---|---|---|
| `radius-sharp` | 0px | Photography frames, The Table divid<br>rs, structural blocks |
| `radius-sm` | 4px | Buttons, tags, order-tray rows |
| `radius-full` | 999px | Reserved for exactly one or two true pill moments (e.g. a single quantity stepper) — not the default button shape anymore |

### Shadow

One shadow only, used sparingly on the order tray and nothing else: `0 20px 60px -20px rgba(20,18,16,0.35)`. No card-grid drop shadows.

---

## 2. Typography Scale

**Display:** Fraunces (variable — use `opsz`, `wght`, and light `SOFT`/`WONK` axis movement at large sizes for character; dial both back toward neutral at smaller sizes so it doesn't get precious in UI contexts).
**Body/UI:** Instrument Sans.

| Role | Face | Size (desktop / mobile) | Weight | Notes |
|---|---|---|---|---|
| Hero display | Fraunces | 96–112px / 48–56px | 400, high `opsz` | "Bolne Wali Chai" |
| Section display | Fraunces | 56–64px / 34–40px | 400–500 | Gold Tea, Coffee, Banaras headlines |
| Product title | Fraunces | 36–44px / 28–32px | 500 | The Table item names, product-page H1 |
| Editorial body | Instrument Sans | 17–19px / 16px | 400 | Line-height 1.6, max measure ~65–72ch |
| Navigation | Instrument Sans | 14px | 500 | No letter-spacing gimmicks |
| Eyebrow (rare) | Instrument Sans | 12–13px | 500 | Sentence case, not tracked-out caps — see rule below |
| Price | Instrument Sans (tabular figures) | 24–32px | 500 | Plain numeral, no currency-pill wrapper |
| Button / CTA | Instrument Sans | 14–15px | 500 | Sentence case ("Order on WhatsApp," not "ORDER ON WHATSAPP") |
| Small metadata | Instrument Sans | 12px | 400 | Weight/variant labels, timestamps |
| Footer | Instrument Sans (+ one Fraunces moment) | 14px body / 20px Fraunces moment | 400 / 500 | See §8 (Footer) |

**Eyebrow rule:** The current site uses tracked-uppercase eyebrows on nearly every section ("Premium Blend," "What Sets Us Apart," "Our Story," "It Started With One Cup"). This redesign uses hierarchy through scale/weight/spacing/placement instead. Eyebrows survive only where they carry real information a reader needs before the headline (e.g. a category label on a product page). Target: no more than 2–3 eyebrows on the entire homepage, none of them all-caps — sentence case at 12–13px, set apart by color (`gold-dim`) and spacing, not by shouting.

---

## 3. Spacing Scale

8px base unit, used consistently instead of the current mix of arbitrary Tailwind values:

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192px`

Section vertical padding uses the 64/96/128 steps; inline component spacing (gaps between a label and a value, icon and text) uses 4/8/12/16. The Table's hairline dividers get 48px of breathing room on each side at desktop, 32px at mobile.

---

## 4. Colour Usage Rules

**Allowed gold usage:**
- 1px hairlines and dividers
- Underline on an active/selected state (e.g. active variant)
- Icon strokes (outline icons, not filled)
- Large display typography (headlines, 32px+) where contrast is naturally sufficient
- A single accent rule in the footer

**Disallowed:**
- Gold-filled buttons or pills (current "Order on WhatsApp" gold-filled pill is being replaced — see §13/§10)
- Gold background washes behind cards or icon badges (current Sidebar/FeatureSection pattern)
- Gold for small body or label text (fails contrast — see §15)
- Ember as a background, border, button, or any repeated UI element — photographic grading only, confined to Gold Tea imagery

---

## 5. Section Dimensions

| Section | Height | Notes |
|---|---|---|
| Hero | 100vh desktop / 100dvh mobile | Full-bleed, fixed |
| Gold Tea | ~120vh desktop | Content may determine actual height; this is a target, not a hard lock |
| Banaras Story | 180–200vh scroll distance, ~100vh pinned viewport | Scroll distance scales with copy length, not fixed |
| Arabica Coffee | ~110vh desktop | Mirrors Gold Tea's generosity, slightly shorter |
| The Table | 80–100vh, content-driven | Grows with product count — not viewport-locked |
| Gifting & Trade | 40–50vh | Deliberately short |
| Closing Invitation | ~70vh | Short photographic bookend |
| Footer | Content-driven | No fixed height |

Total homepage scroll: roughly 7–7.5 screen-heights on desktop (shorter than today's page, which runs five near-identical product sections plus heritage plus feature grid back to back).

---

## 6. Homepage Wireframe

```
┌─────────────────────────────────────┐
│ HERO — 100vh                         │  Banaras photo, Ken Burns,
│ Bolne Wali Chai                      │  one mask-reveal, runs once
│ Banaras ki Chai. Duniya ki Charcha.  │
├─────────────────────────────────────┤
│ GOLD TEA — ~120vh                    │  62/38 asymmetric split,
│ signature · warm · curtain reveal    │  natural ember photographic tone
├─────────────────────────────────────┤
│ BANARAS STORY — 180–200vh scroll     │  photo pinned, 3 lines scrub
│ (~100vh pinned viewport)             │  through on scroll progress
├─────────────────────────────────────┤
│ ARABICA COFFEE — ~110vh              │  mirrors Gold Tea's grammar,
│ signature · neutral · curtain reveal │  dark/rich/contemporary contrast
├─────────────────────────────────────┤
│ THE TABLE — 80–100vh                 │  Green Tea / Elaichi / Masala
│ static — no entrance motion          │  3-up shelf, hairline dividers
├─────────────────────────────────────┤
│ GIFTING & TRADE — 40–50vh            │  charcoal, text-only, 1 CTA
├─────────────────────────────────────┤
│ CLOSING INVITATION — ~70vh           │  2nd Banaras crop, 1 line, 1 CTA
├─────────────────────────────────────┤
│ FOOTER                               │  1 gold hairline, quiet watermark
└─────────────────────────────────────┘
```

---

## 7. Desktop Layout Rules (≥1024px)

- Content max-width: 1440px container, full-bleed photography breaks out of it.
- Gold Tea / Coffee: asymmetric split (62/38 and its mirror), never centered/symmetric.
- The Table: 3-column grid, equal-width, hairline dividers between columns.
- Editorial text blocks: left-aligned, max measure ~65–72ch — never centered body copy.
- Wide tier (>1536px): hero and the two signature sections may grow in height/breathing room; max-width container can loosen slightly. Density does not increase — whitespace increases.

## 8. Tablet Layout Rules (640–1024px)

Treated as a genuine third state, not stretched mobile or squeezed desktop:

- Gold Tea / Coffee: split ratio softens toward 55/45; photography stays side-by-side (doesn't stack yet).
- The Table: 2-up grid (third item wraps), hairlines retained.
- Banaras Story: sticky/pinned scrub still attempted here (performance budget allows it); falls back to mobile's sequential pattern only if a real jank issue is found during QA.
- Type scale steps down one notch from desktop values in §2, not all the way to mobile values.

## 9. Mobile Layout Rules (<640px)

Its own canvas, not desktop minus a column:

- Hero: 100dvh, headline repositioned to clear the photo's own baked-in corner text (bottom-left third).
- Gold Tea / Coffee: stack photo-on-top at a real ~70vh crop (not the current cramped 42vh band), content below.
- Banaras Story: sticky/pinned scrub is dropped below tablet width — replaced with a simpler sequential fade-through, each line its own short viewport beat. Documented exception to "no viewport-triggered animation," justified by mobile Safari sticky-scroll jank.
- The Table: single column, hairlines retained between rows.
- Order tray: bottom sheet (see §13).
- Touch targets: minimum 44×44px on every interactive element.

---

## 10. Component Architecture

| Component | Status | Notes |
|---|---|---|
| `Hero.svelte` | Rebuilt | Ken Burns + mask reveal, runs once |
| `SignatureProduct.svelte` | New | Shared by Gold Tea and Coffee via a `grade: "ember" \| "neutral"` prop and a `reverse` prop for the mirrored layout — replaces two different one-off implementations with one component, two configurations |
| `BanarasStory.svelte` | New | Pinned scroll-scrub on tablet/desktop, sequential fallback on mobile (internally, not a separate component) |
| `ProductShelf.svelte` | New | Renders The Table's three items from product data |
| `GiftingBand.svelte` | New | Short charcoal CTA band |
| `ClosingInvitation.svelte` | New | Second photographic bookend |
| `OrderTray.svelte` | New | Lives in root layout; global cart state |
| `Product.svelte` | Retired or demoted | Logic (variant switch, price tween, WhatsApp link-building) is reused inside `SignatureProduct` and `ProductShelf` rather than kept as the primary visual pattern |
| `FeatureSection.svelte`, current `InfoSection.svelte` | Retired | Superseded by Banaras Story / Gifting / Closing |

**Motion actions** — current `reveal` (blanket scroll-fade, used ~30+ times) is retired. Replacement set, each used only where named in §14:

- `kenBurns` — hero background only
- `maskReveal` — hero headline only
- `curtainReveal` — Gold Tea, Coffee image entrance
- `scrollScrub` — Banaras Story text, desktop/tablet only
- `magnetic` — kept as-is, CTA hover-pull (user-triggered, already compliant with the brief)

---

## 11. Data Architecture

### Current model (as implemented today, `src/lib/types/pageType.ts`)

```
productItem {
  title: string
  buyLink: string
  description: string
  variants: { price, gram (string), unit, image }[]
  sideImage: string
}
```

No `slug`, no `sku`, no `category`, no `tagline`/`positioningLine` field, no `isSignature` flag, no explicit `order` field (homepage order is just array order in Sanity), weight stored as a string.

### Current hard-coded overrides (live in `src/routes/+page.svelte`, not in Sanity)

- `descriptionOverrides` — per-product long description, keyed by title string
- `taglineOverrides` — per-product positioning line ("Bolne Wali Chai," "Cardamom & Calm Down," "Dadi Maa Ka Raaz," "The Daily Detoxify")
- `closingNoteOverrides` — Green Tea's italic closing line
- `coffeeDescription`, `coffeeTagline` — Coffee's copy, hard-coded as standalone consts because Coffee is special-cased out of the main product loop entirely

This is real technical debt: content editors cannot currently change a tagline without a code deploy, and the "match by exact title string" pattern is fragile (a Sanity title typo silently drops the override).

### Proposed target schema (`product` document type)

```
product {
  _id
  slug               — e.g. "gold-tea"               [new]
  sku                — e.g. "CHA-GOLD"                [new]
  title              — "Charcha Gold Tea"
  category           — "tea" | "coffee" | "masala"     [new]
  isSignature        — boolean (Gold Tea, Coffee = true) [new]
  order              — number, explicit homepage/shelf sort [new]
  positioningLine     — "Bolne Wali Chai"               [new — replaces taglineOverrides]
  shortDescription    — 1 line, for The Table / shelf    [new]
  fullDescription      — long-form, for product page     [renamed from description]
  closingNote          — optional italic emphasis line   [formalizes closingNoteOverrides]
  heroImage, gallery[] — product photography
  variants[] {
    weightValue        — number, e.g. 500               [replaces string `gram`]
    weightUnit          — "g" | "kg"
    price               — number
    image
    inStock             — boolean                        [new]
  }
  whatsappMessageTemplate — optional override string      [new]
}
```

### Migration notes

- Every current `descriptionOverrides`/`taglineOverrides`/`closingNoteOverrides` entry maps 1:1 to a new Sanity field — this is a content migration (five products' worth of copy moved into Sanity), not a redesign of the copy itself.
- Coffee stops being special-cased in code; `isSignature` + `category: "coffee"` does the job generically, same as Gold Tea.
- `order` field replaces "array position in Sanity happens to match the homepage" as the actual sort mechanism — removes a hidden coupling.
- Weight becomes numeric (`weightValue` + `weightUnit`) instead of a string that gets `parseInt`'d client-side (current `Product.svelte` does `parseInt(a.gram)` and infers kg/g by checking `>= 1000` — fragile, worth fixing regardless of the visual redesign).
- No Sanity writes happen in this phase. This is a proposal to execute during Phase 0/1 implementation, with the user's sign-off, likely via the Sanity API the same way prior content edits this project were made.

---

## 12. Product-Page Architecture

Routes: `/products/gold-tea`, `/products/arabica-coffee`, `/products/green-tea`, `/products/elaichi-chai`, `/products/khada-garam-masala` — driven by the `slug` field above, one dynamic route (`/products/[slug]/+page.svelte`) rather than five hard-coded routes.

Page structure:
1. Full-bleed product photography, ~80vh
2. Product title + positioning line
3. Full description (editorial body copy — this is where today's homepage-length paragraphs properly belong)
4. Variant + weight + price selector
5. Add-to-tray / direct WhatsApp order
6. Related products (pulled by `category`, excluding self)

Homepage and The Table keep only `shortDescription` + `positioningLine` + price — full detail lives exclusively on the product page, removing the current duplication where the same long paragraph appears nowhere else but also never gets a dedicated home.

---

## 13. WhatsApp Cart Architecture

**Current state:** every "Order on WhatsApp" button is independent — each opens `wa.me` with a message for exactly one product/variant. No way to combine a multi-item order without manually editing the message.

**Proposed:** a client-side-only order tray, no backend.

- **State:** a small Svelte store (`orderTray` — array of `{ productSlug, title, weightValue, weightUnit, price, qty }`), persisted to `localStorage` so it survives a page reload but never leaves the browser.
- **Trigger:** each product gets an "Add to order" action alongside (not necessarily replacing) direct WhatsApp ordering, for people who want to batch things.
- **Tray UI:** invisible until non-empty. Desktop: slim tab fixed to the right edge, expands into a short panel on click. Mobile: bottom sheet, swipe or tap to expand.
- **Contents:** line-item list (product, weight, price, qty, remove), running total, one primary action: **"Send Order on WhatsApp."**
- **Message composition:** one `wa.me` link with a single pre-filled message listing every line item and the total — replaces N separate chats with one.
- **Visual:** charcoal surface, cream Instrument Sans text, a single gold hairline border — no gold fill, no badge-heavy cart-icon treatment.
- **Accessibility:** `aria-expanded` on the trigger, `aria-label` on remove buttons, Escape closes the panel, focus trapped while open.

This is pure front-end architecture — no Sanity schema change needed beyond the `whatsappMessageTemplate` override field noted in §11.

---

## 14. Motion Architecture

The current `reveal` action (translateY + opacity fade, applied to nearly every heading/paragraph/button across ~9 sections) is retired entirely. Replacement is a short, named, non-reusable-by-default list:

| Name | Where | Behaviour | Trigger |
|---|---|---|---|
| `kenBurns` | Hero background only | Scale 100%→106% over ~15s | Runs once on load |
| `maskReveal` | Hero headline only | Clip-path text reveal | Runs once on load, after `kenBurns` begins |
| `curtainReveal` | Gold Tea, Coffee images | Clip-path wipe reveal | First scroll-into-view only, never re-triggers |
| `scrollScrub` | Banaras Story text (desktop/tablet) | Opacity/position driven directly by scroll progress within the pinned region | Continuous while in view |
| `magnetic` | All primary CTAs | Cursor-pull hover (kept as-is) | User-triggered |
| Price tween | Variant switch (kept as-is) | Animated numeral transition | User-triggered |
| *(none)* | The Table, Gifting, Footer | Static — appears instantly | — |

**Reduced motion:** `prefers-reduced-motion: reduce` disables `kenBurns`, `curtainReveal`, and `scrollScrub` entirely (content renders in its final state immediately) and removes `maskReveal`'s animated clip in favor of an instant fade. `magnetic` and the price tween degrade to no-transform/instant-value since they're small and functional rather than purely decorative. No content is ever gated behind an animation completing.

---

## 15. Accessibility Checklist

- [ ] One logical `<h1>` per page (hero headline on homepage; product title on product pages)
- [ ] Semantic heading hierarchy, no skipped levels
- [ ] Full keyboard navigation: hamburger, order tray, variant selectors, all CTAs
- [ ] Visible focus states on every interactive element (not consistently present today)
- [ ] `aria-expanded` on hamburger and order-tray triggers
- [ ] `aria-label` on icon-only controls (close buttons, remove-from-tray)
- [ ] Escape key closes hamburger and order tray
- [ ] Descriptive `alt` text per product photo (currently several images use empty/generic alt)
- [ ] `prefers-reduced-motion` respected everywhere motion is used (see §14) — **not** "prefers-reduced-opacity," the correct media feature
- [ ] Touch targets ≥44×44px on mobile
- [ ] No information conveyed through animation alone
- [ ] No essential interaction is hover-only (every hover state has a tap/focus equivalent)
- [ ] **Contrast correction:** `#C9A24A` (gold) on `#F7F1E4` (cream) fails body-text contrast — restrict to large display type (32px+) or use `gold-dim` `#9C7B33` for smaller gold-on-cream text

---

## 16. SEO Checklist

(Documented now, implemented alongside the relevant build phase — not implemented in this planning turn.)

- [ ] Unique `<title>` and meta description per page, including each new `/products/[slug]` page
- [ ] Canonical URLs on every page
- [ ] Open Graph tags per page (homepage already has a baseline og:image from earlier work — extend per-product)
- [ ] Twitter card metadata per page
- [ ] Product structured data (`schema.org/Product`) on product pages — name, image, price, availability
- [ ] Organization/Brand structured data sitewide
- [ ] Sitemap regenerated to include new product-page routes and exclude `/shahi`, `/power` (see §18)
- [ ] `robots.txt` reviewed alongside the sitemap change
- [ ] Heading hierarchy audit across all new sections

---

## 17. Image Optimisation Strategy

- Responsive widths: serve multiple sizes per hero/product image (the existing `urlForImage` Sanity helper already supports width params — extend usage to product-page and shelf contexts consistently)
- Modern formats where the pipeline supports it (AVIF/WebP via Sanity's `auto=format`, already partially in use)
- Priority/eager loading for the hero image only; everything below the fold loads lazily
- Avoid oversized originals — audit current local assets (`about-us-heritage.jpg` is 1.45MB, `sahiHero.png` is 4.3MB and appears unused by any current route — candidate for removal during cleanup, not in this phase)
- One consistent grading/vignette pass across the Banaras hero crop, the closing-invitation crop, and the Banaras-story crop so all three read as one shoot
- Gold Tea gets its ember-toned grade; Coffee and The Table photography stay neutral (see earlier review)

---

## 18. Legacy-Route Strategy

`/power` and `/shahi` are removed from navigation, homepage, and the sitemap as part of this redesign's launch — but **not deleted**. Proposed sequence:

1. During implementation: routes remain in the codebase, simply unlinked and excluded from `sitemap.xml` and `robots.txt` indexing (e.g. `noindex` or sitemap omission).
2. After the new site is deployed and verified live and stable: revisit whether to archive (move out of `src/routes`) or fully delete. No deletion happens as part of this redesign's initial launch.
3. Any inbound links/QR codes pointing at `/power` or `/shahi` should be identified before the archive step, so a redirect can be added if needed rather than a dead link.

---

## 19. Implementation Phases

| Phase | Scope |
|---|---|
| **0** | Design system + architecture + documentation — this document |
| **1** | Navigation + Hero |
| **2** | Gold Tea + Banaras Story |
| **3** | Coffee + The Table |
| **4** | Gifting + Closing + Footer |
| **5** | Product pages (`/products/[slug]`) |
| **6** | WhatsApp cart (order tray) |
| **7** | Responsive refinement (tablet as a real state, mobile polish pass) |
| **8** | Accessibility + SEO + performance pass |
| **9** | Full QA (§20) |
| — | **Only after Phase 9 passes:** production deployment, via a dedicated branch, merged and verified before going live |

A `luxury-redesign` branch is proposed as the working branch once implementation (Phase 1 onward) begins — not created yet, per this turn's instructions.

---

## 20. QA Checklist

- [ ] Every section matches its approved motion behaviour (and *only* that behaviour — no stray reveal left over from the old system)
- [ ] `prefers-reduced-motion` verified on hero, Gold Tea, Coffee, Banaras Story
- [ ] Desktop/tablet/mobile each reviewed as their own layout, not just resized
- [ ] Gold usage audit: no filled gold buttons, no gold background washes anywhere in the shipped build
- [ ] Contrast check on every text/background pairing, specifically all gold-on-cream instances
- [ ] Keyboard-only pass: tab through hamburger → nav → every CTA → order tray → footer
- [ ] Screen-reader pass on hero (headline order), product pages, and order tray
- [ ] WhatsApp message output verified for single-item and multi-item (tray) orders, on both Android and iOS WhatsApp
- [ ] All product pricing/variants cross-checked against current Sanity data post-migration
- [ ] `/shahi`, `/power` confirmed absent from nav, homepage, and sitemap
- [ ] Lighthouse/perf pass on hero image loading and Banaras Story scroll performance, specifically on mid-range Android + mobile Safari
- [ ] Legacy production site diffed against new build section-by-section before go-live sign-off
