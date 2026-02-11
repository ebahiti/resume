# Phase 1 – Quote of the Day Investigation Report

## 1. Location of Quote of the Day

- **Section in HTML:** `index.html` (and built `dist/index.html`)
  - Heading: `<h2>Quote of the Day</h2>`
  - Container: `<div id="quote-container">Loading quote...</div>`
  - Footer line: `<small>by <a href="https://zenquotes.io/">ZenQuotes</a></small>`

## 2. Where ZenQuotes Is Used

| Location | Usage |
|----------|--------|
| `src/main.js` (lines 1–23) | Single IIFE: fetches `https://zenquotes.io/api/random`, parses JSON, sets `#quote-container` text to `"quote" — author` or fallback. |
| `index.html` (lines 102–103) | Link/caption "by ZenQuotes" under the quote. |
| `dist/assets/main-*.js` | Built bundle still contains ZenQuotes URL and fetch (regenerated on build). |
| `dist/index.html` | Contains ZenQuotes link in built output. |

No other components, hooks, or services reference ZenQuotes; it is a single client-side fetch in `main.js`.

## 3. How the Quote Reaches the UI

1. Page loads (static HTML).
2. Script runs: `<script type="module" src="/src/main.js"></script>`.
3. The first IIFE in `main.js` runs: gets `#quote-container`, fetches ZenQuotes API, on success sets `container.textContent = '"' + data[0].q + '"' + (data[0].a ? ' — ' + data[0].a : '')`, on failure sets `'Quote unavailable.'`.

No SSR; purely client-side.

## 4. SSR vs Client-Side

- **Rendering:** Client-side only. No server-side rendering; Vite serves static HTML and JS.

## 5. Assets and Path to Quote File

- **Assets:** Served from the Vite `public` directory (`vite.config.js`: `publicDir: 'public'`). Files under `public/` are served at the site root, so `public/assets/` → `/assets/`.
- **Correct path for the app:** `/assets/quote_of_the_day.txt` (file must live in `public/assets/quote_of_the_day.txt`). The existing file is at project root `assets/quote_of_the_day.txt`; it is not in `public/`, so it is not currently served. It must be copied (or otherwise placed) in `public/assets/` for the app to fetch it.
- **Other assets:** Images etc. are referenced as `/assets/...` in `index.html` and are loaded from `public/assets/`; no other text files are fetched in the app.

## 6. Summary for Implementation

- **Files to change:** `src/main.js` (replace ZenQuotes IIFE with local quote logic), `index.html` (remove ZenQuotes link, update caption to “Daily rotation @ 9 AM” or similar).
- **Current data flow:** Page load → main.js → fetch ZenQuotes → set `#quote-container` text.
- **Best insertion point:** Replace the existing Quote of the Day IIFE in `main.js` with logic that: fetches `/assets/quote_of_the_day.txt`, parses lines into quotes (format `"Quote text" - Author`), computes a daily index with 9:00 AM local rollover, selects one quote, and sets `#quote-container`. Add `quote_of_the_day.txt` to `public/assets/` so it is available at `/assets/quote_of_the_day.txt`.
