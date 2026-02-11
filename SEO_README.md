# SEO setup (elinorbahiti.ca)

## Where routes are defined

- **App routes:** `src/App.jsx` — defines `/`, `/credentials`, `/services`, `/contact`.
- **Sitemap routes:** `scripts/generate-sitemap.mjs` — `SITE_ROUTES` array. Add new public paths there when you add routes in App.jsx.
- **Per-route meta (title, description):** `src/seo-config.js` — `routeMetadata` keyed by pathname. Add an entry for any new route so the SEO component can set correct title/description/canonical/OG/Twitter.

## How sitemap is generated

- **Build:** `npm run build` runs `vite build` then `node scripts/generate-sitemap.mjs`.
- **Output:** `dist/sitemap.xml` is written with `<url>` entries for each path in `SITE_ROUTES`, with `lastmod` set to the build date. No content directory or MDX; routes are fixed in the script.
- **Serving:** Vite copies `public/robots.txt` to `dist/`. Nginx serves `dist/robots.txt` and `dist/sitemap.xml` at `/robots.txt` and `/sitemap.xml` via `try_files $uri`.

## Route-aware meta

- **Component:** `src/components/SEO.jsx` runs inside `Layout`, reads `useLocation()`, and updates `document.title`, `<meta name="description">`, `<link rel="canonical">`, and OG/Twitter meta tags from `src/seo-config.js`. No server rendering; all client-side after hydration.
