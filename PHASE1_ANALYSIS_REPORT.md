# Phase 1: HomePage.txt and /assets/ Analysis

## 1. Page structure (from HomePage.txt)

- **Invalid HTML:** Body content appears inside `<head>` (no `</head>` or `<body>` before the first `<p>…HELLO, MY NAME IS</p>`). Rebuild will use valid structure: `<head>` … `</head><body>` … `</body>`.
- **Sections (order):**
  1. Hero: “HELLO, MY NAME IS” → divider → “Elinor Bahiti” → “Registered Condominium Manager”
  2. Portrait image (rounded, ~384px wide)
  3. Quote of the Day (div `#quote-container`: “Loading quote…”), link to ZenQuotes
  4. About Me (heading + condo-tower image + copy)
  5. Skills and Expertise (heading + arrow image + bullet list)
  6. Four expertise cards: Condo Act, Physical Building, Financial, Administration (image + title + text each)
  7. Experience (work-experience image + job history)
  8. Education (education image + education list)
  9. Portfolio (gallery of 6 images with captions)

---

## 2. External dependencies

| Type | Source | Used for | Reproduce locally? |
|------|--------|----------|---------------------|
| **Script** | `https://www.googletagmanager.com/gtag/js?id=GT-M38ZC59` | Google Analytics (Site Kit) | Omit for static rebuild (no tracking). No visual impact. |
| **CSS** | `www.elinorbahiti.ca/wp-content/plugins/wp-seopress/...` | SEO/admin bar | Not needed; admin bar not shown on static site. |
| **CSS** | `www.elinorbahiti.ca/wp-includes/css/dashicons.min.css` | Dashicons | Not needed for main content. |
| **CSS** | `www.elinorbahiti.ca/wp-includes/css/admin-bar.min.css` | WP admin bar | Not needed (no admin bar). |
| **API** | ZenQuotes (link: https://zenquotes.io/) | “Quote of the Day” text | Yes: client-side fetch to public API (e.g. `https://zenquotes.io/api/random`) so the section works with no backend. |
| **Fonts** | None explicitly in HTML | — | No external fonts; we’ll use system font stack. |
| **Schema** | schema.org (JSON-LD in page) | SEO only | Can keep same JSON-LD in static HTML; no external request. |

**Summary:** No external resource is required for layout or visuals. Google/CSS can be dropped. Quote of the Day can be reproduced with client-side JS calling ZenQuotes API.

---

## 3. Image mapping (WordPress URL → /assets/)

| WordPress path (from HTML) | In /assets/? | Local path to use |
|---------------------------|-------------|-------------------|
| `2021/10/cropped-portraitsmall.png` | Closest: `portraitsmall.png` | `assets/portraitsmall.png` |
| `2024/12/condo-tower.png` | Yes: `condo tower.png` | `assets/condo tower.png` |
| `2021/05/arrow-01-free-img.png` | **No** | — |
| `2024/12/justice-system.png` | Yes: `justice system.png` | `assets/justice system.png` |
| `2024/12/physical-building.png` | Yes: `physical building.png` | `assets/physical building.png` |
| `2024/12/financials.png` | Yes: `financials.png` | `assets/financials.png` |
| `2024/12/administration.png` | Yes: `administration.png` | `assets/administration.png` |
| `2024/12/work-experience.png` | Yes: `work experience.png` | `assets/work experience.png` |
| `2024/12/education.png` | Yes: `education.png` | `assets/education.png` |
| `2021/10/livonia-1024x470.png` (or livonia.png) | **No** | — |
| `2021/10/dna3-1024x921.jpg` | Yes: `dna3.jpg` | `assets/dna3.jpg` |
| `2021/10/750bay.png` | Yes: `750bay.png` | `assets/750bay.png` |
| `2022/11/The-Wave-e1668303964925.jpg` | **No** | — |
| `2022/11/Layout-Small.jpg` | **No** | — |
| `2022/11/1StJohns.jpg` | **No** | — |

---

## 4. Cannot be reproduced locally without changes

- **Missing image files in /assets/:**
  - `arrow-01-free-img.png` (Skills section decorative image)
  - Any Livonia image (first portfolio item)
  - `The-Wave-e1668303964925.jpg` (or equivalent “The Wave” image)
  - `Layout-Small.jpg` (Rivertowne)
  - `1StJohns.jpg` (1 St Johns)

  **Effect:** To match the live layout exactly, these would need to be added to `/assets/` or the live WordPress URLs used. For the static build, the implementation uses: (1) `public/assets/arrow.svg` (minimal SVG) in place of the missing arrow image; (2) `public/assets/placeholder.svg` for the four missing portfolio images (Livonia, The Wave, Rivertowne, 1 St Johns). Section structure and captions are unchanged.

- **Portrait:** HTML uses `cropped-portraitsmall.png`; only `portraitsmall.png` (and `.jpg`) exist in `/assets/`. Using `portraitsmall.png` is the only local option without adding a file.

- **WordPress-specific:** LiteSpeed snippet, Site Kit, admin-bar margins, RSS/oEmbed links, and gtag are omitted in the static rebuild; no visual change.

---

## 5. Summary

- **Layout and copy:** Fully reproducible with valid HTML/CSS and existing assets.
- **Quote of the Day:** Reproducible with client-side fetch to ZenQuotes API.
- **Assets:** 10 of 15 image references have a matching file in `/assets/`. 5 images (arrow + 4 portfolio) are missing; implementation will preserve layout and use placeholders or only available images so the build is self-contained and deployable.
