# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing landing site for **vac.uz** (VAC.UZ — air-duct / ventilation manufacturer). Single-page React app with a few sub-routes. All UI copy is in Russian (`<html lang="ru">`).

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # tsc -b (type-check, fails on errors) THEN vite build → dist/
npm run lint     # ESLint over the repo
npm run preview  # serve the production build locally
```

There is **no test suite**. `npm run build` is the main correctness gate — it type-checks first via `tsc -b`, so type errors (and unused locals/params, see strict config) break the build, not just runtime.

## Architecture

- **Stack:** Vite 7 + React 19 + TypeScript (strict), Tailwind CSS v4, react-router-dom v7, framer-motion. `react-hook-form` + `zod` are installed for forms.
- **Routing** (`src/App.tsx`): `BrowserRouter` with routes `/`, `/about`, `/about/office`, `/about/gallery`, `/catalog`, `/contacts`. Pages live in `src/pages/`, composed from section components in `src/components/`. The `ScrollToHash` helper in `App.tsx` smooth-scrolls to `#anchor` on navigation or to top otherwise — page sections are reached via hash links to element IDs.
- **Theme system** (`src/lib/theme.ts` + `src/hooks/useTheme.ts`): custom light/dark, persisted in `localStorage['vac-theme']`, toggling the `.dark` class on `<html>`. Cross-component sync is done via a custom `vac-theme-change` window event plus the `storage` event — always change theme through `setTheme`/`useTheme`, never by touching the class directly. `initializeTheme()` runs in `src/main.tsx` *before* render to avoid a flash of the wrong theme.
- **Assets:** `public/` files are served at the site root (logos, fonts, `cex_*.mp4`, large PDFs) and referenced by absolute path (e.g. `/vac-logo.png`); `src/assets/` files are imported and bundled/hashed by Vite.

## Tailwind v4 / shadcn notes

- Tailwind v4 is wired via the `@tailwindcss/vite` plugin (`vite.config.ts`). There is **no `tailwind.config.js`** — theme tokens live in `src/index.css` (`@theme`/`@import`).
- `components.json` configures shadcn (new-york style, `lucide` icons) with `@/...` aliases, **but those aliases are not wired into `vite.config.ts` or the tsconfigs, and no code uses them** (all imports are relative). Before adding shadcn UI components, set up the `@` path alias in both Vite and `tsconfig.app.json` first, or they won't resolve.

## "Book a call" form

`src/components/BookCallButton.tsx` is a floating CTA. On submit it first POSTs to `/api/book-call`; if that fails/returns non-OK, it **falls back to calling the Telegram Bot API directly from the browser**. So the form keeps working even where the serverless function is absent. The Netlify function (`netlify/functions/book-call.js`) does the same Telegram send server-side. Telegram bot token + chat id are hardcoded as fallbacks in both files (and thus shipped in the client bundle).

## Deployment

- **Netlify** (`netlify.toml`): rewrites `/api/*` → `/.netlify/functions/:splat` and SPA fallback `/*` → `/index.html`. This is where the `book-call` function actually runs.
- A **`deploy` branch** convention is used to publish the built site to the Billur Plesk host (vac.uz, `httpdocs`): build locally, push `dist/` contents to `deploy`, the host pulls that branch. Large media uploaded manually to the server (e.g. `каталог.pdf`, `products-catalog.pdf`) are **not** in the repo and must not be deleted by a deploy — they are preserved because the build output does not contain them. Any SPA-routing config on that host lives in `httpdocs/.htaccess` (not in this repo).
