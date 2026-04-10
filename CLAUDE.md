# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Build static output to /dist
npm run preview   # Preview the production build locally
npx serve dist -l 3000  # Serve the built /dist folder for testing
```

There are no tests in this project.

## Architecture

**Stack:** React 19 + Vite 8 + Tailwind CSS v4 (via `@tailwindcss/vite` plugin) + `lucide-react` icons.

**Output:** `npm run build` produces a fully static `/dist` folder deployed to GitHub Pages under the `/scc-charity/` base path (set in `vite.config.js`). All internal asset paths must respect this base — use `import.meta.env.BASE_URL` for dynamic references.

### Page structure

`main.jsx` wraps `<App>` in `<LanguageProvider>`. `App.jsx` renders sections in this order:

```
Navbar → Hero → About → VisionMission → Impact → EventDetails → HowToHelp → [Gallery — commented out] → Organizers → Footer
```

`Gallery` is currently commented out in `App.jsx` pending real images. Uncomment `{/* <Gallery /> */}` to restore it.

### Bilingual system

All on-page text lives in **`src/data/content.js`** — a single default export with `en` and `km` (Khmer) top-level keys, each mirroring the same nested structure. Language state is managed by `src/context/LanguageContext.jsx` (a `useState` toggle, default `'en'`) and consumed via the `useTranslation()` hook (`src/hooks/useTranslation.js`), which returns `content[language]`.

Every component calls `const t = useTranslation()` and reads text as `t.section.key`.

**To add or change any on-page text, edit `content.js` only — always update both `en` and `km` sections with matching keys.**

The `hero` section uses `rotatingPhrases` (an array) instead of a single string — this powers the `RotatingPhrase` component inside `Hero.jsx` that crossfades between phrases every 4 seconds. Both `en` and `km` must have the same key with matching-length arrays.

### Hooks

| Hook | Location | Purpose |
|---|---|---|
| `useTranslation()` | `src/hooks/useTranslation.js` | Returns `content[language]` from context |
| `useInView(threshold, { once })` | `src/hooks/useInView.js` | `IntersectionObserver` wrapper. `once: true` (default) fires once and disconnects — used by `ScrollReveal`. `once: false` re-fires on every enter/exit — used for repeating animations. |
| `useCountUp(target, { duration, started })` | `src/hooks/useCountUp.js` | Animates a number from 0 to `target` using ease-out cubic when `started` flips to `true`. Resets to 0 when `started` becomes `false`. |

### Components

**`ScrollReveal`** — wraps any content in a `useInView`-triggered fade-up animation (one-time, `once: true`).

**`LanguageToggle`** — globe-icon dropdown that shows the current language code and a dropdown with `English` / `ខ្មែរ` options. Accepts a `dark` boolean prop:
- `dark={true}` (default) — white styling, for use on dark navbar surfaces (transparent hero, open menu overlay)
- `dark={false}` — navy styling, for use on light/glass scrolled navbar

`Navbar.jsx` derives `isDark = menuOpen || !scrolled` and passes it as `<LanguageToggle dark={isDark} />`.

**`Navbar`** — fixed top bar with:
- Logo + two-line event name ("Smile of" / "Cambodian Children") that adapts color via `isDark`
- Full-screen mobile overlay menu (opacity transition, staggered link slide-up, body scroll locked while open)
- Animated 3-bar → × hamburger using `bg-white`/`bg-navy` bar color toggled by `isDark`

**`Impact`** — stat cards use `useCountUp` triggered by `useInView(0.25)` (once only). Supply items render as icon cards in a 2×2 / 4-col grid using `lucide-react` icons mapped by index.

### Tailwind v4 theme

Brand colors and fonts are defined as `@theme` variables in **`src/index.css`** (no `tailwind.config.js`). Use them in components as Tailwind utilities:

| Variable | Utility |
|---|---|
| `--color-navy` / `--color-navy-light` | `bg-navy`, `text-navy`, `bg-navy-light` |
| `--color-green` / `--color-green-light` | `bg-green`, `text-green` |
| `--color-orange` / `--color-orange-dark` | `bg-orange`, `text-orange` |
| `--color-lime` / `--color-lime-soft` | `bg-lime`, `text-lime`, `bg-lime-soft` |
| `--color-cream` / `--color-sand` / `--color-warm-gray` | `bg-cream`, `bg-sand`, `bg-warm-gray` |
| `--color-text` / `--color-muted` | `text-text`, `text-muted` |
| `--font-display` | `font-display` (Plus Jakarta Sans) |
| `--font-body` | `font-body` (Inter) |
| `--font-khmer` | `font-khmer` (Noto Sans Khmer) |
| `--breakpoint-xs: 400px` | `xs:` responsive prefix |

`src/index.css` also defines:
- `.section-padding` — consistent vertical rhythm (5rem mobile, 7rem md+). All section components use this.
- `.glass` / `.glass-dark` — frosted-glass treatments using `backdrop-filter: blur`

### Static assets

Logos and images live in **`public/logos/`** and are referenced via `${import.meta.env.BASE_URL}logos/filename.png`. Never import images from `src/` for `<img>` src — always use `public/`.

### Design system

The site follows the **Radiant Guardian** design system defined in `.claude/skills/SKILL.md`:
- No hard borders — use tonal background shifts for separation
- Orange (`#ff6602`) is the primary CTA color only — avoid for small text (contrast)
- Asymmetric layouts in at least one section per page
- All section components use `.section-padding` for consistent vertical rhythm
