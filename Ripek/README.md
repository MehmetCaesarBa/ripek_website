# Ripek Website

Static 4-page website (Home, About Us, Products, Contacts) for Ripek, a 19L water bottle producer. Built with plain HTML/CSS/JS — no build tools, no dependencies.

## Structure

```
index.html          Home
about.html           About Us (history timeline, certificates, references)
products.html        Products (6-item grid)
contacts.html        Contacts (phone number only, per design spec)
css/style.css        All styles (colors, layout, responsive rules)
js/translations.js   All Turkish & English text strings
js/i18n.js           Language switching logic (defaults to Turkish)
js/main.js           Mobile nav toggle + active nav-link highlighting
```

## Run locally

Browsers block `fetch()` and some scripts on `file://` pages, so serve the folder over HTTP instead of double-clicking the HTML files. Pick whichever you have installed:

**Python (usually preinstalled):**
```
cd path/to/this/folder
python -m http.server 8000
```
Then open http://localhost:8000

**Node.js:**
```
cd path/to/this/folder
npx serve .
```
(or `npx http-server .`)

**VS Code:** install the "Live Server" extension, right-click `index.html` → "Open with Live Server".

## Language

The site defaults to **Turkish** on first visit. Visitors can switch to **English** via the dropdown in the top bar; the choice is remembered (localStorage) for later visits. To add another language, add a new key to `js/translations.js` and a matching `<li data-lang="..">` entry in the language dropdown in each HTML file.

## Images

No images were generated. Every spot that needs a photo/logo is marked with a dashed placeholder box (e.g. `[hero product photo]`, `[product photo]`, `[client logo]`). Search each HTML file for `image-placeholder` to find them, and swap in an `<img>` tag once you have real photography.

## Editing text

All copy lives in `js/translations.js` (both `tr` and `en` objects) — edit there rather than in the HTML, since HTML only holds fallback text and `data-i18n="key.path"` references.

## Next steps for deployment

This is plain static HTML/CSS/JS, so it can be deployed as-is to any static host (Netlify, Vercel, GitHub Pages, S3, or a plain web server) — just upload the whole folder. No build step is required.
