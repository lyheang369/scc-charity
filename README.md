# 🌟 Smile of Cambodian Children

> A charity campaign website by **students of CamEd Business School ** — raising funds to bring essential educational materials to **270 underprivileged children** in Siem Reap Province, Cambodia.

---

## 🎯 About the Campaign

**The Smile of Cambodian Children** is a 3-day charity campaign organized by CamEd Business School students. Our goal is simple: every child deserves access to education. We raise funds and distribute school supplies — books, pens, school bags, and stationery sets — directly to students who need them most.

| Detail | Info |
|---|---|
| 📍 Location | Siem Reap Province, Cambodia |
| 📅 Duration | 3-Day Campaign |
| 🎒 Target | 270 Students |
| 🏫 Organizer | CamEd Business School · Group L |

---

## 🌐 Live Website

**[scc-charity.github.io/scc-charity](https://lyheang369.github.io/scc-charity/)**

---

## ✨ Features

- **Bilingual** — Full English and Khmer (ភាសាខ្មែរ) language support with a globe-icon dropdown switcher
- **Rotating Hero Phrases** — Language-aware inspirational phrases that crossfade every 4 seconds
- **Count-Up Animation** — Impact numbers animate when scrolled into view
- **Mobile-First Navbar** — Full-screen overlay menu with staggered animations and animated hamburger → × transition
- **Scroll Reveal** — Sections fade-up as the user scrolls
- **Fully Static** — No server required; deploys to any static host

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Icons | lucide-react |
| Deployment | GitHub Pages |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev        # → http://localhost:5173

# Build for production
npm run build      # → /dist

# Preview production build locally
npm run preview
npx serve dist -l 3000
```

---

## 🗂 Project Structure

```
src/
├── components/        # Page sections (Hero, About, Impact, Navbar…)
├── context/           # LanguageContext — EN/KM toggle state
├── data/
│   └── content.js     # ✏️  All bilingual text lives here
├── hooks/
│   ├── useTranslation.js   # Returns content[language]
│   ├── useInView.js        # IntersectionObserver wrapper
│   └── useCountUp.js       # Animated number count-up
└── index.css          # Tailwind v4 @theme brand tokens
public/
└── logos/             # Static image assets
```

> **To change any text:** edit `src/data/content.js` only — update **both** `en` and `km` keys.

---

## 🎨 Design System — Radiant Guardian

The visual identity balances the **trust and authority** of a meaningful social cause with the **joy and warmth** of children gaining a brighter future.

| Token | Color | Usage |
|---|---|---|
| Navy | `#2f3d48` | Text, deep surfaces, footer |
| Green | `#02752e` | Hope, section accents |
| Orange | `#ff6602` | Primary CTA only |
| Lime | `#7ee110` | Spark, interaction accents |
| Cream | `#fdf8f2` | Main background |

**Rules:** no hard borders — tonal layering only · asymmetric layouts · generous whitespace · `.section-padding` on every section

---

<div align="center">

*Every child deserves a chance to learn.*

</div>
