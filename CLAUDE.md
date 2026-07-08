# CLAUDE.md

Marketing site for **bottlebrain.io** (BottleBrain — AI sommelier for independent wine shops).
Vite + React + Tailwind + framer-motion, zero backend. Pushing to `main` deploys via Vercel.

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # production build (run before pushing)
```

## Architecture notes (non-obvious, load-bearing)

- **Ambient layering trick**: `BubbleField page` (cellar.jsx) renders first with no z-index.
  Dark sections (hero, analytics, demo card, footer) are *positioned* so they slide over it;
  light sections keep **static** backgrounds so bubbles ride between background and content.
  Never add `relative` + a background to a light section — it will hide the page bubbles.
- **All looping animation is CSS keyframes** (`bb-rise`, `bb-bob`, `bb-pulse` in index.css),
  parameterized via CSS custom properties. Never use framer-motion for continuous loops —
  ~95 JS-driven animations caused main-thread scroll jank. Framer is for one-shot
  entrances/reveals only.
- **Navbar dark/light detection** (Navbar.jsx): single rAF loop checks `[data-nav-dark]`
  rects against the pill's midline; hysteresis by inflating/deflating rects (a shifted
  trigger line oscillates at top edges); flips rate-limited to 1 per 250ms. The pill keeps
  `translateZ(0)` to mitigate Chrome's backdrop-filter scroll flicker (Safari unaffected);
  append `?noglass` to the URL to A/B without backdrop-filter.
- **Wordmark glass** (Wordmark.jsx): `glass.png` used as a CSS mask filled with
  `currentColor` — one inherited color animates text + glass together. Never tint the PNG
  with filter chains (hue-rotate transitions flash through blue).
- **Fraunces f transplant** (index.css `@font-face`, tailwind `font-display` stack):
  Fraunces' roman lowercase f has an unremovable under-baseline hook, so `U+0066` is
  overridden — upright f from Playfair Display, italic f kept Fraunces. Rule: calligraphic
  forms belong only to the pink italic highlights.
- **DemoForm.jsx** holds live EmailJS credentials — preserve exactly.
- **Testimonial quote is invented** (attributed to Mark, Petit Philippe) — get his approval
  or a real quote before treating it as fact.
- **SEO**: canonical is `https://www.bottlebrain.io/`; JSON-LD (Organization/WebSite/
  SoftwareApplication) in index.html; robots.txt + sitemap.xml in public/.

## Working agreements

- Never change page copy to solve a styling problem — fix the styling, or ask first.
- Verify visually (screenshots at 1440 and 390) before pushing; Tailwind drops invalid
  classes silently (e.g. `/97` opacity), so eyeball anything touched.
- Commit as `maxcmei <maxcmeissner@gmail.com>` or Vercel won't deploy.
