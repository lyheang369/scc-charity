# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> A shorter `AGENTS.md` exists at the repo root for general agent contributors. Keep both in sync when project-wide conventions change.

## Commands

```bash
npm install       # Install dependencies (required before first run)
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Build static output to /dist
npm run preview   # Preview the production build locally
npx serve dist -l 3000  # Serve the built /dist folder for testing
```

There are no tests or linting configured in this project.

## Architecture

**Stack:** React 19 + Vite 8 + Tailwind CSS v4 (via `@tailwindcss/vite` plugin) + `lucide-react` icons.

**Output:** `npm run build` produces a fully static `/dist` folder deployed to GitHub Pages. `vite.config.js` sets `base: '/'`. All internal asset paths must use `import.meta.env.BASE_URL` for dynamic references.

### Routing

`App.jsx` uses a minimal hash router — no external library. A `usePage()` hook listens to `hashchange` and returns `window.location.hash`. Routes:

- `#donate` → `<DonatePage>` (single donation contact page)
- Empty hash and any in-page anchor (`#about`, `#sponsors`, etc.) → main single-page layout

Only `#donate` is special-cased; in-page anchor hashes fall through to the main layout and scroll natively.

To add a new page: add a new hash condition in `App.jsx` and create the component in `src/pages/`.

### Main page structure

`main.jsx` wraps `<App>` in `<LanguageProvider>`. `App.jsx` renders sections in this order:

```
Navbar → Hero → About → VisionMission → Impact → EventDetails → HowToHelp → [Gallery — commented out] → Team → Sponsors → Organizers → Footer
```

`Gallery` is imported but its JSX usage is commented out in `App.jsx` (`{/* <Gallery /> */}`) pending real images. Uncomment that line to restore it.

### Bilingual system

All on-page text lives in **`src/data/content.js`** — a single default export with `en` and `km` (Khmer) top-level keys, each mirroring the same nested structure. Language state is managed by `src/context/LanguageContext.jsx` (a `useState` toggle, default `'en'`) and consumed via the `useTranslation()` hook (`src/hooks/useTranslation.js`), which returns `content[language]`.

Every component calls `const t = useTranslation()` and reads text as `t.section.key`.

**To add or change any on-page text, edit `content.js` only — always update both `en` and `km` sections with matching keys.**

Notable non-obvious keys:
- `event.poster` — object with bilingual text for the styled poster card in `EventDetails`
- `donate.khqr` — object for the KHQR donation QR section on the donate page
- `sponsors.brands` — array of sponsor objects (`key`, `name`, `type`, `description`); `type` is either `inKind` or `financial` and maps to a labeled badge in `Sponsors.jsx`
- `organizers.organizedBy` / `supportedBy` / `scc` / `camed` — per-logo role labels and names rendered in `Organizers.jsx`

**`impact.stats[].number` must use Western Arabic digits** (e.g. `"270+"`, `"3"`, `"100%"`), never Khmer numerals. The `parseStat()` helper in `Impact.jsx` uses `/^(\\d+)/` which only matches `[0-9]`. Using Khmer digit characters causes the count-up to show `0` as a prefix.

The `hero` section uses `rotatingPhrases` (an array) instead of a single string — this powers the `RotatingPhrase` component inside `Hero.jsx` that crossfades between phrases every 4 seconds. Both `en` and `km` must have the same key with matching-length arrays.

### Hooks

| Hook | Location | Purpose |
|---|---|---|
| `useTranslation()` | `src/hooks/useTranslation.js` | Returns `content[language]` from context |
| `useInView(threshold, { once })` | `src/hooks/useInView.js` | `IntersectionObserver` wrapper. `once: true` (default) fires once and disconnects — used by `ScrollReveal`. `once: false` re-fires on every enter/exit — used for repeating animations. |
| `useCountUp(target, { duration, started })` | `src/hooks/useCountUp.js` | Animates a number from 0 to `target` using ease-out cubic when `started` flips to `true`. Resets to 0 when `started` becomes `false`. |

### Components

**`ResponsiveImage`** — renders a `<picture>` with a WebP `<source>` and a PNG/JPEG `<img>` fallback. Always use this for photos in `public/img/` and logos in `public/logos/` when a `.webp` version exists alongside the original.

**`ScrollReveal`** — wraps any content in a `useInView`-triggered fade-up animation (one-time, `once: true`).

**`LanguageToggle`** — globe-icon dropdown with `English` / `ខ្មែរ` options. Accepts a `dark` boolean prop:
- `dark={true}` (default) — white styling, for use on dark navbar surfaces (transparent hero, open menu overlay)
- `dark={false}` — navy styling, for use on light/glass scrolled navbar

`Navbar.jsx` derives `isDark = menuOpen || !scrolled` and passes it as `<LanguageToggle dark={isDark} />`.

**`Navbar`** — fixed top bar with:
- Logo switches between `scc-white.svg` (dark/hero state) and `scc.svg` (scrolled light state) via `isDark`
- Glass overlay is a separate child `div` that fades via `opacity` (not `transition-all`) to avoid backdrop-filter flash on scroll-to-top
- `onScroll()` is called immediately on mount to sync state with actual scroll position
- Full-screen mobile overlay menu with body scroll lock while open

**`Impact`** — stat cards use `useCountUp` triggered by `useInView(0.25)` (once only). Supply items render as icon cards in a 2×2 / 4-col grid using `lucide-react` icons mapped by index.

**`Sponsors`** — two-card grid; each card pulls logo from `public/logos/{brand.key}.webp`. The `brand.type` (`inKind` | `financial`) selects the badge styling and icon (`Sparkles` for in-kind, `Heart` for financial).

**`Organizers`** — two-logo footer-adjacent block. Each entry shows a colored pill role label (`organizers.organizedBy` orange for SCC, `organizers.supportedBy` cyan for CamEd). Renders from a local `entries` array — there is no shared data file.

### Tailwind v4 theme

Brand colors and fonts are defined as `@theme` variables in **`src/index.css`** (no `tailwind.config.js`). Use them in components as Tailwind utilities:

| Variable | Value | Utility |
|---|---|---|
| `--color-navy` | `#0C4E8C` | `bg-navy`, `text-navy` |
| `--color-navy-light` | `#0d3f73` | `bg-navy-light` |
| `--color-green` | `#11C4D4` | `bg-green`, `text-green` (cyan — secondary CTA) |
| `--color-orange` | `#0C81E4` | `bg-orange`, `text-orange` (bright blue — primary CTA) |
| `--color-orange-dark` | `#0a6dc0` | `bg-orange-dark` (hover state) |
| `--color-lime` | `#4FE7AF` | `bg-lime`, `text-lime` (mint accent) |
| `--color-lime-soft` | mint 18% opacity | `bg-lime-soft` |
| `--color-green-light` | `#0db5c4` | `bg-green-light`, `text-green-light` |
| `--color-cream` / `--color-sand` / `--color-warm-gray` | icy whites | `bg-cream`, `bg-sand`, `bg-warm-gray` |
| `--color-text` | `#1a2840` | `text-text` |
| `--color-muted` | `#4a6a8a` | `text-muted` |
| `--font-display` | Plus Jakarta Sans | `font-display` |
| `--font-body` | Inter | `font-body` |
| `--font-khmer` | Noto Sans Khmer | `font-khmer` |
| `--breakpoint-xs: 400px` | — | `xs:` responsive prefix |

> **Note:** Despite the variable name, `orange` is now bright blue (`#0C81E4`) and `green` is cyan (`#11C4D4`) following the palette update. The names are kept for backward compatibility with component classes.

`src/index.css` also defines:
- `.section-padding` — consistent vertical rhythm (5rem mobile, 7rem md+). All section components use this.
- `.glass` / `.glass-dark` — frosted-glass treatments using `backdrop-filter: blur`

### Known hardcoded strings

A few UI strings are intentionally hardcoded and not in `content.js`:
- `Navbar.jsx` — the two-line event name ("Smile of" / "Cambodian Children") and the mobile menu footer label
- `Footer.jsx` — the brand name next to the logo
- `LanguageToggle.jsx` — the "Language" dropdown header

These are brand-identity strings that don't need translation. Do not move them to `content.js` unless specifically asked.

### Static assets

Logos live in **`public/logos/`**: `scc.svg` (color), `scc-white.svg` (white), `scc-black.svg` (black), plus `CamEd_Logo`, `floral`, `rourm` each with `.png` and `.webp` variants. Reference them via `${import.meta.env.BASE_URL}logos/filename`. Never import from `src/` for `<img>` src — always use `public/`.

`public/img/` contains group/event photos. Each image has both an original and a `.webp` version — always serve `.webp` via `ResponsiveImage` with the original as fallback.

`scripts/convert-to-webp.sh` (uses `cwebp` via `brew install webp`) and `scripts/convert-to-webp.mjs` (uses `sharp` — **not currently in `package.json` deps**) are batch WebP utilities. Both have hard-coded file lists that still reference originals that have since been deleted (`All_group_Members_image.JPEG`, `event-poster.jpg`); update the array inside the script before re-running, or convert ad-hoc with `cwebp -q 85 input.png -o output.webp`.

The favicon and OG image in `index.html` point to `scc.svg`.

### Coding conventions

- ES modules throughout; component files use PascalCase (`Hero.jsx`), hooks use camelCase with `use` prefix (`useInView.js`)
- 2-space indentation, single quotes, no semicolons unless required
- Conventional Commit prefixes for commits: `fix:`, `feat:`, `docs:`, `chore:`
- PRs for visual changes should include screenshots; content-only PRs should confirm both `en` and `km` were updated

### CI/CD deployment

Two parallel workflows trigger on every push to `main`:
- **`deploy.yml`** — builds and uploads `dist/` to GitHub Pages via `actions/deploy-pages`. No secrets required.
- **`deploy-cpanel.yml`** — builds and FTPs `dist/` to `/scc-charity.com/` on cPanel using `SamKirkland/FTP-Deploy-Action`. Uses `dangerous-clean-slate: true` so each deploy wipes the directory before upload (ensures stale files from prior schemas don't linger). Requires `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` secrets.

### Design system

The site follows the **Radiant Guardian** design system:
- No hard borders — use tonal background shifts for separation
- Blue (`#0C81E4`, utility `bg-orange`) is the primary CTA color only
- Asymmetric layouts in at least one section per page
- All section components use `.section-padding` for consistent vertical rhythm
