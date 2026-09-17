# Charcha Tea Website — Project Status

**Last updated:** 2026-09-17
**Repo:** github.com/ankitc1106/chaudhary-tea (branch `master`, last commit `67129f6`)
**Stack:** SvelteKit + Tailwind + Sanity CMS (project `wyastv6s`, dataset `production`) → deployed on Cloudflare Pages, auto-deploys on push to `master`.

## How to resume work here

- **Local dev:** `npm run dev`. IMPORTANT: `svelte.config.js` must use `adapter-auto` to run locally on this Windows ARM64 machine (`adapter-cloudflare` needs `workerd`, which has no win32-arm64 build). Before any commit/push, swap it back to `adapter-cloudflare` — production needs the real adapter. The file has both import lines; just comment/uncomment.
- **Type-check:** `npm run check` (also needs `adapter-auto` locally, same reason).
- **Sanity Studio:** `cd sanity && npm run dev` → http://localhost:3333 (needs a Sanity login).
- Most content edits this session were done directly via the Sanity HTTP mutate API with a write token pasted ad-hoc in chat (not stored in the repo) — not through Studio UI. Studio still works fine if preferred going forward.
- If `npm run dev` throws `EPERM` on `.svelte-kit/types/route_meta_data.json`: kill stray `node` processes (leftover dev servers from earlier sessions), delete the `.svelte-kit/` folder, restart `npm run dev`. It regenerates automatically.

## What's been done (this session, in order)

1. Homepage hero cover photo: tried several directions (product-family photo → typography-only → Banaras-ghat photo with baked-in headline → same photo with headline removed, now a **live headline** "Banaras Ki Chai, Duniya ki Charcha" in **Satisfy** font, replacing the earlier baked-in text). Current photo: `src/lib/images/hero-cover.jpg` (enhanced for contrast/warmth from a user-provided source photo).
2. Removed hero CTA buttons and the floating product-icon lineup card under the header; shrank header height (was near-full-screen, now ~55vh/68vh).
3. Renamed every product in Sanity to be Charcha-branded: **Charcha Green Tea, Charcha Gold Tea, Charcha Elaichi Chai, Charcha Arabica Coffee, Charcha Mix Masala**. Added quirky per-product taglines (Bolne Wali Chai, Cardamom & Calm Down, Dadi Maa Ka Raaz, Bean There Talked That, The Daily Detoxify) and rewrote all product descriptions.
4. Updated SKU weights/prices for every product in Sanity (current pricing below).
5. Added sitewide motion: scroll-reveal, magnetic button hover-pull, idle image float, ambient cursor-glow, animated price counter on variant switch. Actions live in `src/lib/actions/{reveal,magnetic,cursorGlow,parallax}.ts`.
6. Topbar: removed the Berkshire Swash script wordmark (was unreadable at nav size), replaced with the user-provided transparent gold Charcha logo (`src/lib/images/charcha-logo.png`). Scrolling top-bar text now "Welcome to the world of Charcha".
7. Hamburger menu (`Sidebar.svelte`) simplified to 3 items: **Our Products** (expands to a list of products, each linking to its on-page anchor), **About Us**, **Contact Us**. Removed the old Charcha-logo home-link tab.
8. Fully redesigned **About Us** and **Contact Us** pages to match the charcoal/gold theme (previously the legacy orange "Shahi"-branded `UtilHeader` + plain black text). About page copy now focuses only on Charcha (dropped the old Charcha/Shahi/Power three-brand story). About page's heritage image was recolored from blue/purple to black-and-gold via a custom Node hue-shift script (no image-editing tool available, so this was done with raw pixel math).
9. Fixed "What Sets Us Apart" feature grid: removed an awkward floating product image next to the heading, added a one-line description under each value card.
10. Every product's Buy button (previously **never showed** — `buyLink` was empty in Sanity for everything) replaced with an always-visible **"Order on WhatsApp"** button that opens WhatsApp with a pre-filled message (product name + selected weight + price).
11. Footer: fixed copy (was saying "Welcome to..." at the very bottom — wrong, that's a greeting not a closing line) and removed a leftover 160px of excess bottom padding (was sized for a fixed brand-switcher bar removed earlier in the session).
12. Added Instagram link to the Contact page's social icons (`https://www.instagram.com/charcha.tea.coffee/`).

## Known open items (flagged, not yet resolved)

- **Facebook social link is broken/placeholder** in Sanity (`http://gfa.cpo`) — currently filtered out of the Contact page. Needs a real URL from the user.
- **`/power` and `/shahi` routes** still exist in the codebase, deprioritized (not linked in nav, business focus is Charcha-only), just patched enough to not throw type errors — visually still stale/legacy. Not redesigned.
- Local dev port sometimes shifts (5173/5174/5175...) if a previous session's process is still holding the port — check with `netstat -ano | grep LISTENING` before assuming a port is free.

## Current product pricing (as of last check this session)

| Product | Variants |
|---|---|
| Charcha Green Tea | 100g / ₹120 |
| Charcha Gold Tea | 250g / ₹195, 500g / ₹390 |
| Charcha Elaichi Chai | 12g/₹5, 24g/₹10, 100g/₹42, 250g/₹105, 500g/₹210, 1kg/₹410, 3kg/₹1200 |
| Charcha Mix Masala | 20g/₹30, 40g/₹60, 100g/₹160, 250g/₹400, 500g/₹800, 1kg/₹1600 |
| Charcha Arabica Coffee | 50g/₹400, 100g/₹800 |

## Key file map

- Hero / header: `src/lib/components/Hero.svelte`, `src/lib/components/layout/Header.svelte`
- Homepage: `src/routes/+page.svelte`
- Product card: `src/lib/components/Product.svelte`
- Nav: `src/lib/components/Topbar.svelte`, `src/lib/components/layout/Sidebar.svelte`
- Footer: `src/lib/components/layout/Footer.svelte`
- About / Contact pages: `src/routes/about-us/+page.svelte`, `src/routes/contact-us/+page.svelte`
- Motion actions: `src/lib/actions/*.ts`
- Feature grid: `src/lib/components/FeatureSection.svelte`

## Design system quick reference

- Colors (Tailwind, `tailwind.config.js`): `charcoal` (#141210), `cream` (#F7F1E4), `gold` (#C9A24A, with `.light`/`.dark` variants)
- Fonts: `font-inria` (Inria Serif, body/headings), `font-camby` (Cambay, body copy), `font-rubik` (Rubik, uppercase labels/buttons), `font-berk` (currently mapped to **Satisfy** — a Google Font, used only for the homepage hero headline)
- Motion pattern: most sections use `use:reveal` (scroll-fade-in) and `use:cursorGlow` (ambient gold glow following cursor on dark sections); CTAs use `use:magnetic` (cursor-pull hover)
