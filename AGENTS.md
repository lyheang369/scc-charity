# Repository Guidelines

## Project Structure & Module Organization

This is a static React 19 + Vite 8 site. Source code lives in `src/`: page sections are in `src/components/`, hash-routed pages in `src/pages/`, hooks in `src/hooks/`, language state in `src/context/`, and bilingual copy in `src/data/content.js`. Tailwind v4 theme tokens are in `src/index.css`.

Static assets live in `public/`, especially `public/logos/` and `public/img/`. Do not edit generated `dist/` files manually.

## Build, Test, and Development Commands

- `npm install` installs dependencies from `package-lock.json`.
- `npm run dev` starts Vite, usually at `http://localhost:5173`.
- `npm run build` creates the production bundle in `dist/`.
- `npm run preview` previews the production build locally.
- `npx serve dist -l 3000` is useful for testing the built output as plain static files.

## Coding Style & Naming Conventions

Use ES modules and React function components. Component files use PascalCase, such as `Hero.jsx`; hooks use camelCase with a `use` prefix, such as `useInView.js`. Prefer concise JSX, 2-space indentation, single quotes, and no semicolons unless needed.

Use Tailwind utilities and theme variables from `src/index.css` (`bg-navy`, `text-orange`, `font-khmer`). Reference public assets with `${import.meta.env.BASE_URL}logos/scc.svg` rather than hardcoded paths.

## Bilingual Content Guidelines

Edit page copy in `src/data/content.js`; keep `en` and `km` structures in sync. Components should read text through `useTranslation()` instead of duplicating strings. For `impact.stats[].number`, use Western Arabic digits such as `270+`, because the count-up parser only handles `[0-9]`.

## Testing Guidelines

No automated test or lint scripts are currently configured. Before opening a pull request, run `npm run build` and manually check the landing page, language toggle, mobile menu, scroll animations, and `#donate`. If tests are added, place them near the related component or under `tests/`, and add the command to `package.json`.

## Commit & Pull Request Guidelines

Recent history uses Conventional Commit-style prefixes, especially `fix:`, `feat:`, and `docs:`. Keep commits focused, for example `fix: update footer contact handles`.

Pull requests should include a short description, verification steps such as `npm run build`, linked issues when applicable, and screenshots or recordings for visual changes. For content changes, mention whether both English and Khmer entries were updated.

## Deployment & Configuration Notes

GitHub Actions builds on pushes to `main` and deploys `dist/` to GitHub Pages and cPanel. The Vite `base` is currently `/`; preserve this unless the hosting path changes. cPanel deployment depends on `FTP_SERVER`, `FTP_USERNAME`, and `FTP_PASSWORD` repository secrets.
