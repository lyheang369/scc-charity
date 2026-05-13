# Hero Logo Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a crossfading logo carousel below the trust line in the Hero section, cycling through organizer, supporter, and sponsor logos with a role label under each.

**Architecture:** A new `LogoCarousel` component is added at the top of `src/components/Hero.jsx` alongside the existing `RotatingPhrase`. It uses the same `opacity` + `translateY` crossfade pattern as `RotatingPhrase`, cycling 4 entries every 2.5 seconds. No new files are created.

**Tech Stack:** React 19, Tailwind CSS v4, static assets from `public/logos/`

---

## File Map

| File | Change |
|---|---|
| `src/components/Hero.jsx` | Add `LogoCarousel` component (above `Hero`); add `<LogoCarousel>` JSX after trust line |

No other files change. Logo assets already exist in `public/logos/`.

---

### Task 1: Add the `LogoCarousel` component to Hero.jsx

**Files:**
- Modify: `src/components/Hero.jsx` — add component above the `Hero` default export

- [ ] **Step 1: Open `src/components/Hero.jsx`** and locate the `RotatingPhrase` component (lines 8–52). You will add `LogoCarousel` immediately after it (before the `export default function Hero()` line).

- [ ] **Step 2: Insert the `LogoCarousel` component**

Add this block between the closing `}` of `RotatingPhrase` and the `export default function Hero()` line:

```jsx
const BASE = import.meta.env.BASE_URL

const LOGO_ENTRIES = [
  { src: `${BASE}logos/scc-white.svg`,    alt: 'SCC logo',    label: 'Organized by' },
  { src: `${BASE}logos/CamEd_Logo.webp`,  alt: 'CamEd logo',  label: 'Supported by' },
  { src: `${BASE}logos/floral.webp`,      alt: 'Floral logo',  label: 'In-Kind Sponsor' },
  { src: `${BASE}logos/rourm.webp`,       alt: 'Rourm logo',   label: 'Sponsor' },
]

function LogoCarousel() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % LOGO_ENTRIES.length)
        setVisible(true)
      }, 500)
    }, 2500)
    return () => clearInterval(id)
  }, [])

  const entry = LOGO_ENTRIES[idx]

  return (
    <div className="h-20 flex flex-col items-start justify-center">
      <img
        key={idx}
        src={entry.src}
        alt={entry.alt}
        className="h-10 w-auto object-contain opacity-80"
        style={{
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-6px)',
        }}
      />
      <span
        className="text-[9px] tracking-widest uppercase text-white/30 mt-1"
        style={{
          transition: 'opacity 0.5s ease',
          opacity: visible ? 1 : 0,
        }}
      >
        {entry.label}
      </span>
    </div>
  )
}
```

- [ ] **Step 3: Add `<LogoCarousel />` into the Hero JSX**

Find this block in `Hero.jsx` (around line 92):

```jsx
<p className="text-xs tracking-wide text-white/30 uppercase animate-[fadeUp_0.8s_1s_ease_both]">{t.hero.trust}</p>
```

Replace it with:

```jsx
<p className="text-xs tracking-wide text-white/30 uppercase animate-[fadeUp_0.8s_1s_ease_both]">{t.hero.trust}</p>
<div className="animate-[fadeUp_0.8s_1.1s_ease_both]">
  <LogoCarousel />
</div>
```

- [ ] **Step 4: Start the dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:5173` and check:
- The SCC logo appears first below the trust line with "Organized by" label
- Every ~2.5 seconds it crossfades to the next logo + label
- The cycle is: SCC → CamEd → Floral → Rourm → SCC (repeating)
- The container height stays fixed (no layout shift during transitions)
- Logos are visible and white/light-tinted against the dark navy background

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat: add crossfading logo carousel to Hero section"
```

---

### Task 2: Fix CamEd logo visibility (if needed)

**Files:**
- Modify: `src/components/Hero.jsx` — adjust img styling for CamEd if it has a dark background

> **Note:** Only do this task if the CamEd logo appears invisible or hard to see on the dark navy background during visual verification in Task 1. `floral.webp` and `rourm.webp` likely have transparent backgrounds; `CamEd_Logo.webp` may not.

- [ ] **Step 1: Check CamEd logo background**

Open `http://localhost:5173`, wait for the CamEd logo to appear. If it is clearly visible, skip this task entirely.

If it appears as a dark block on dark background, proceed:

- [ ] **Step 2: Add per-entry filter support**

In `LOGO_ENTRIES`, add an optional `invert` boolean to the CamEd entry:

```jsx
const LOGO_ENTRIES = [
  { src: `${BASE}logos/scc-white.svg`,    alt: 'SCC logo',    label: 'Organized by' },
  { src: `${BASE}logos/CamEd_Logo.webp`,  alt: 'CamEd logo',  label: 'Supported by', invert: true },
  { src: `${BASE}logos/floral.webp`,      alt: 'Floral logo',  label: 'In-Kind Sponsor' },
  { src: `${BASE}logos/rourm.webp`,       alt: 'Rourm logo',   label: 'Sponsor' },
]
```

Update the `<img>` in `LogoCarousel` to apply the filter:

```jsx
<img
  key={idx}
  src={entry.src}
  alt={entry.alt}
  className="h-10 w-auto object-contain opacity-80"
  style={{
    transition: 'opacity 0.5s ease, transform 0.5s ease',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(-6px)',
    filter: entry.invert ? 'brightness(0) invert(1)' : undefined,
  }}
/>
```

- [ ] **Step 3: Verify in browser**

CamEd logo should now appear white/light against the navy background.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "fix: invert CamEd logo for visibility on dark hero background"
```
