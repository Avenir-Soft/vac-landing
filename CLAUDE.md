# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing landing site for **vac.uz** (VAC.UZ — air-duct / ventilation manufacturer). Single-page React app with a few sub-routes. UI is **trilingual** — Russian (default), English, and Uzbek (Latin). See the language system below.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run dev:api  # admin PHP API in Docker on :8080 (Vite proxies /api, /content, /uploads); data in .dev-data/
npm run build    # tsc -b (type-check, fails on errors) THEN vite build → dist/
npm run lint     # ESLint over the repo
npm run preview  # serve the production build locally
```

There is **no test suite**. `npm run build` is the main correctness gate — it type-checks first via `tsc -b`, so type errors (and unused locals/params, see strict config) break the build, not just runtime.

## Architecture

- **Stack:** Vite 7 + React 19 + TypeScript (strict), Tailwind CSS v4, react-router-dom v7, framer-motion. `react-hook-form` + `zod` are installed for forms.
- **Routing** (`src/App.tsx`): `BrowserRouter` with routes `/`, `/about`, `/about/partners`, `/about/gallery`, `/catalog`, `/reference`, `/calculator`, `/prices`, `/contacts`, `/admin`. Pages live in `src/pages/`, composed from section components in `src/components/`. The `ScrollToHash` helper in `App.tsx` smooth-scrolls to `#anchor` on navigation or to top otherwise — page sections are reached via hash links to element IDs.
- **Theme system** (`src/lib/theme.ts` + `src/hooks/useTheme.ts`): custom light/dark, persisted in `localStorage['vac-theme']`, toggling the `.dark` class on `<html>`. Cross-component sync is done via a custom `vac-theme-change` window event plus the `storage` event — always change theme through `setTheme`/`useTheme`, never by touching the class directly. `initializeTheme()` runs in `src/main.tsx` *before* render to avoid a flash of the wrong theme.
- **Language / i18n system** (`src/i18n/language.ts` + `src/hooks/useLanguage.ts`): trilingual `ru`|`en`|`uz` (`Lang` type), Russian default, persisted in `localStorage['vac-lang']`, synced via the `vac-lang-change` custom event + `storage` event (mirrors the theme system). `initializeLang()` runs in `src/main.tsx` and sets `<html lang>`. Switch language only through `useLanguage()` / `setLang`. The `LanguageSwitcher` dropdown lives in both navbars. **Translation pattern:** copy is co-located per component — each file declares `const ru = {...}` then `const content: Record<Lang, typeof ru> = { ru, en:{...}, uz:{...} }`, and the component does `const { lang } = useLanguage(); const t = content[lang]`. `typeof ru` enforces that `en`/`uz` have the same *keys* (but NOT array length — keep localized arrays the same length by hand). The calculator is the exception: `src/lib/calculator.ts` keeps its data/formulas in Russian and exposes `tCalc(text, lang)` (a `ru → {en,uz}` lookup) that `Calculator.tsx` / `CalculatorSchematic.tsx` wrap around each displayed label. Personal names are intentionally left un-transliterated.
- **Assets:** `public/` files are served at the site root (logos, fonts, `cex_*.mp4`, large PDFs) and referenced by absolute path (e.g. `/vac-logo.png`); `src/assets/` files are imported and bundled/hashed by Vite.

## Tailwind v4 / shadcn notes

- Tailwind v4 is wired via the `@tailwindcss/vite` plugin (`vite.config.ts`). There is **no `tailwind.config.js`** — theme tokens live in `src/index.css` (`@theme`/`@import`).
- `components.json` configures shadcn (new-york style, `lucide` icons) with `@/...` aliases, **but those aliases are not wired into `vite.config.ts` or the tsconfigs, and no code uses them** (all imports are relative). Before adding shadcn UI components, set up the `@` path alias in both Vite and `tsconfig.app.json` first, or they won't resolve.

## Admin panel (`/admin`)

Lets the owner edit the photo gallery and the price lists without a rebuild. Not linked from the site; UI is Russian-only (internal tool).

- **Backend is PHP** (`public/api/admin.php`, copied to `dist/api/`) because the Plesk host serves static files + PHP. It writes data **next to the build** in `httpdocs/content/{gallery,prices}.json` and `httpdocs/uploads/{gallery,prices}/`. Those folders are not in the build, so a `git pull` of the `deploy` branch leaves them alone — never add them to the repo.
- **Public pages** (`about-gallery.tsx`, `prices.tsx`) read content via `useSiteContent()` from `src/lib/siteContent.ts`: `fetch('/content/<key>.json')`, and on any failure (incl. the SPA fallback returning HTML) they use the **defaults** in that same file (photos in `public/gallery/`, price PDFs/pages in `public/price-files/` (not `prices/` — a folder named like the `/prices` route makes the server serve the folder instead of the SPA)). Keep those default paths stable — the saved JSON on the server references them.
- **Auth:** password → HMAC token in an HttpOnly cookie, 12 h (secret in `content/.secret.php`). Initial bcrypt hash is in `public/api/config.php`; once changed in the admin, the new hash lives in `content/.password.php` and wins. Server-side state files are `.php` starting with `<?php exit; ?>` and are read as text (not `include`: opcache would return stale values). POSTs require the `X-Vac-Admin: 1` header (CSRF); 5 wrong passwords → 15 min lockout.
- **Uploads** go in 2 MB chunks (`uploadFile` in `src/admin/api.ts`) to dodge host PHP upload limits. Each chunk is retried with backoff on network errors / 429 / 5xx / non-JSON replies (shared-host rate limiting); the server makes retries idempotent via the `offset` param and a `.tmp/<id>.done` marker, so never drop those. A batch of gallery photos continues past a failed file and lists failures at the end. The server picks the type from magic bytes (jpg/png/webp/pdf) and generates the filename. Gallery photos are resized in the browser (JPEG, ≤2400 px); a price PDF is rendered in the browser with pdf.js into WebP page images (`src/admin/media.ts`). Unreferenced files in `uploads/` older than a day are deleted on save.
- The admin is a separate lazy chunk (`React.lazy` in `App.tsx`), so pdf.js stays out of the main bundle.

## "Book a call" form

`src/components/BookCallButton.tsx` is a floating CTA. On submit it first POSTs to `/api/book-call`; if that fails/returns non-OK, it **falls back to calling the Telegram Bot API directly from the browser**. So the form keeps working even where the serverless function is absent. The Netlify function (`netlify/functions/book-call.js`) does the same Telegram send server-side. Telegram bot token + chat id are hardcoded as fallbacks in both files (and thus shipped in the client bundle).

## Deployment

- **Netlify** (`netlify.toml`): rewrites `/api/*` → `/.netlify/functions/:splat` and SPA fallback `/*` → `/index.html`. This is where the `book-call` function actually runs.
- A **`deploy` branch** convention is used to publish the built site to the Billur Plesk host (vac.uz, `httpdocs`): build locally, push `dist/` contents to `deploy`, the host pulls that branch. Large media uploaded manually to the server (e.g. `каталог.pdf`, `products-catalog.pdf`) are **not** in the repo and must not be deleted by a deploy — they are preserved because the build output does not contain them. Any SPA-routing config on that host lives in `httpdocs/.htaccess` (not in this repo).
