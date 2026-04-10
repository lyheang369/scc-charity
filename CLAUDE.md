# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Build static output to /dist
npm run preview   # Preview the production build locally
npx serve dist -l 3000  # Serve the built /dist folder for testing
```

## Architecture

**Stack:** React 19 + Vite 8 + Tailwind CSS v4 (via `@tailwindcss/vite` plugin) + `lucide-react` icons.

**Output:** `npm run build` produces a fully static `/dist` folder (no server needed) suitable for deployment to Netlify, Vercel, or GitHub Pages.

### Bilingual System

All text lives in **`src/data/content.js`** — a single object with `en` and `km` (Khmer) keys mirroring the same structure. Language state is managed by `src/context/LanguageContext.jsx` and consumed via the `useTranslation()` hook (`src/hooks/useTranslation.js`). Every component calls `const t = useTranslation()` and reads text as `t.section.key`.

To add or change any on-page text, edit `content.js` only — update both `en` and `km` sections with matching keys.

### Tailwind v4 Theme

Brand colors and fonts are defined as `@theme` variables in **`src/index.css`** (not in a `tailwind.config.js`). Use them in components as Tailwind utilities:

| Variable | Usage |
|----------|-------|
| `--color-navy` | `bg-navy`, `text-navy` |
| `--color-green` | `bg-green`, `text-green` |
| `--color-orange` | `bg-orange`, `text-orange` |
| `--color-lime` | `bg-lime`, `text-lime` |
| `--color-cream` / `--color-sand` | `bg-cream`, `bg-sand` |
| `--font-display` | `font-display` (Plus Jakarta Sans) |
| `--font-khmer` | `font-khmer` (Noto Sans Khmer) |

### Scroll Animations

`src/hooks/useInView.js` uses `IntersectionObserver` to trigger a one-time reveal. Wrap any section content in `<ScrollReveal>` (`src/components/ScrollReveal.jsx`) for a fade-up-on-scroll effect.

### Static Assets

Logos and images live in **`public/logos/`** and are referenced as `/logos/filename.png`. They are copied as-is into `/dist/logos/` on build. Never reference files from `src/` for images — always use `public/`.

### Design System

The site follows the "Radiant Guardian" design system defined in `.claude/skills/SKILL.md`:
- No hard borders — use tonal background shifts for separation
- Orange (`#ff6602`) is the primary CTA color only — avoid for small text (contrast)
- Asymmetric layouts in at least one section per page
- All section components use `section-padding` utility class for consistent vertical rhythm
