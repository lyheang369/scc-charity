# Hero Logo Carousel — Design Spec

**Date:** 2026-05-13
**Status:** Approved

## Overview

Add a crossfading logo carousel to the Hero section, placed below the `t.hero.trust` line ("ORGANIZED BY SCC · SUPPORTED BY CAMED BUSINESS SCHOOL"). Each logo cycles into view one at a time with a small role label underneath, giving visitors an immediate visual sense of who organized, supports, and sponsors the campaign.

## Logos and Roles

Four entries cycle in this order:

| Logo file | Display label | Role |
|---|---|---|
| `public/logos/scc-white.svg` | Organized by | Organizer |
| `public/logos/CamEd_Logo.webp` | Supported by | Supporter |
| `public/logos/floral.webp` | In-Kind Sponsor | Sponsor |
| `public/logos/rourm.webp` | Sponsor | Sponsor |

## Animation

- **Transition:** crossfade — `opacity` + `translateY(-6px)` on exit, same pattern as `RotatingPhrase`
- **Duration:** 0.5s ease on both fade-out and fade-in
- **Interval:** 2.5 seconds per logo
- **Hold time:** 2 seconds visible (0.5s fade-out brings total to 2.5s before next logo appears)

## Component Design

A new `LogoCarousel` component is added at the top of `src/components/Hero.jsx`, alongside the existing `RotatingPhrase` component. It is not extracted to a separate file.

```
LogoCarousel
  props: entries = [{ src, alt, label }]
  state: idx (number), visible (boolean)
  effect: setInterval every 2500ms — fade out, swap idx, fade in
  render:
    fixed-height container (h-20) to prevent layout shift
      <img> constrained to h-10, object-contain, brightness-0 invert opacity-80
      <span> role label: text-[9px] tracking-widest uppercase text-white/30
```

## Placement in Hero

Inserted immediately after the `<p className="text-xs ...">` trust line (line 92 of current `Hero.jsx`). It gets its own `animate-[fadeUp_0.8s_1.1s_ease_both]` wrapper div so it staggers in 100ms after the trust line.

## Constraints

- Container height is fixed (`h-20`) so no layout shift occurs as logos swap
- Images use `${import.meta.env.BASE_URL}logos/filename` path convention (no `src/` imports for public assets)
- `scc-white.svg` is used (not `scc.svg`) because the Hero background is dark navy
- No changes to `content.js` — the logo list is hardcoded in the component since it is not translatable content
