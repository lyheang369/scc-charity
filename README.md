# Smile of Cambodian Children

> A charity campaign website by **students of CamEd Business School** — raising funds to bring essential educational materials to **270 underprivileged children** in Siem Reap Province, Cambodia.

---

## About the Campaign

**The Smile of Cambodian Children** is a 3-day charity campaign organized by CamEd Business School students. Our goal is simple: every child deserves access to education. We raise funds and distribute school supplies — books, pens, school bags, and stationery sets — directly to students who need them most.

| Detail | Info |
|---|---|
| Location | Siem Reap Province, Cambodia |
| Duration | 3-Day Campaign |
| Target | 270 Students |
| Organizer | CamEd Business School |

---

## Live Website

**[lyheang369.github.io/scc-charity](https://lyheang369.github.io/scc-charity/)**

---

## Features

- **Bilingual** — Full English and Khmer (ភាសាខ្មែរ) support with a globe-icon dropdown switcher; all text in `src/data/content.js`
- **Donation Page** — Hash-routed `/donate` page with KHQR QR, Telegram, Email, and social contact cards
- **Sponsor Recognition** — Dedicated section thanking in-kind and financial sponsors of the campaign
- **Rotating Hero Phrases** — Language-aware inspirational phrases that crossfade every 4 seconds
- **Count-Up Animation** — Impact numbers animate when scrolled into view
- **Smart Navbar** — Logo and colors auto-adapt between dark (hero) and light (scrolled) surfaces
- **Mobile Menu** — Full-screen overlay with staggered animations and hamburger → × transition
- **Scroll Reveal** — Sections fade-up as the user scrolls
- **Static Deployment** — GitHub Actions builds and deploys to GitHub Pages on every push to `main`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Icons | lucide-react |
| Deployment | GitHub Pages |

---

## Getting Started

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # → /dist
npm run preview
```

---

## Project Structure

```
src/
├── components/        # Page sections (Hero, About, Impact, Navbar, Sponsors…)
├── pages/
│   └── DonatePage.jsx # Donation contact page (hash-routed #donate)
├── context/           # LanguageContext — EN/KM toggle state
├── data/
│   └── content.js     # All bilingual text lives here — edit both en and km
├── hooks/
│   ├── useTranslation.js   # Returns content[language]
│   ├── useInView.js        # IntersectionObserver wrapper
│   └── useCountUp.js       # Animated number count-up
└── index.css          # Tailwind v4 @theme brand color tokens
public/
├── logos/             # SCC, CamEd, Floral, Rourm logos (.svg / .png / .webp)
└── img/               # Photos with .webp + original fallbacks
```

> **To change any text:** edit `src/data/content.js` only — always update **both** `en` and `km` keys.

---

## Color Palette

| Token | Color | Usage |
|---|---|---|
| Navy | `#0C4E8C` | Hero background, headings, dark surfaces |
| Blue (orange) | `#0C81E4` | Primary CTA buttons |
| Cyan (green) | `#11C4D4` | Secondary CTA, accents |
| Mint (lime) | `#4FE7AF` | Stat highlights, interaction accents |
| Light mint | `#CCF1CD` | Soft background tints |

> Colors are defined as `@theme` variables in `src/index.css` and used as Tailwind utilities (`bg-navy`, `text-orange`, `bg-lime`, etc.).

---

<div align="center">

*Every child deserves a chance to learn.*

</div>
