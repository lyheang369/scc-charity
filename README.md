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
- **Donation Page** — Hash-routed `/donate` page with Telegram, Email, and Facebook contact cards
- **Live Donor Honor Roll** — Home-page donation feed and `#donors` leaderboard backed by ABA/KHQR payment records
- **Rotating Hero Phrases** — Language-aware inspirational phrases that crossfade every 4 seconds
- **Count-Up Animation** — Impact numbers animate when scrolled into view
- **Smart Navbar** — Logo and colors auto-adapt between dark (hero) and light (scrolled) surfaces; glass overlay fades via opacity to avoid backdrop-filter flash
- **Mobile Menu** — Full-screen overlay with staggered animations and hamburger → × transition
- **Scroll Reveal** — Sections fade-up as the user scrolls
- **Static-first Deployment** — GitHub Pages uses generated JSON; cPanel can run the generated Telegram PHP bridge for live updates

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
npm run donations:build  # rebuild public/data/donations.json from payment-data.txt
npm run donations:watch  # local Telegram polling when TG_API_BOT is in .env
```

## Donation Updates

Historical donations are generated from `payment-data.txt` into `public/data/donations.json`. The browser polls every few seconds and first tries `api/donations.php`; if that endpoint is unavailable, it falls back to the static JSON file.

For cPanel deploys, GitHub Actions runs `npm run donations:api` after the Vite build and writes `dist/api/donations.php` using the `TG_API_BOT` secret and Telegram group ID `-1003796814691`. After FTP deploy, the workflow runs `npm run donations:webhook` so Telegram pushes new group messages directly to `https://scc-charity.com/api/donations.php`. Keep the bot token in `.env` locally or GitHub Secrets only; do not expose it in React code.

If `TG_WEBHOOK_SECRET` is not set, the deploy script derives a stable webhook secret from `TG_API_BOT`. The optional `Sync Live Donations` workflow imports the live cPanel JSON back into the repository every 5 minutes so GitHub Pages and repo history catch up with live donations.

---

## Project Structure

```
src/
├── components/        # Page sections (Hero, About, Impact, Navbar…)
├── pages/
│   ├── DonatePage.jsx # Donation contact page (hash-routed #donate)
│   └── DonorsPage.jsx # Donor honor roll page (hash-routed #donors)
├── context/           # LanguageContext — EN/KM toggle state
├── data/
│   └── content.js     # All bilingual text lives here — edit both en and km
├── hooks/
│   ├── useTranslation.js   # Returns content[language]
│   ├── useInView.js        # IntersectionObserver wrapper
│   └── useCountUp.js       # Animated number count-up
└── index.css          # Tailwind v4 @theme brand color tokens
public/
└── logos/             # scc.svg / scc-white.svg / scc-black.svg / CamEd_Logo.png
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
