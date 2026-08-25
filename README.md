# Youth Alive 26 — Camp Info Hub

One shareable, mobile-first page with **everything for the Youth Alive 26 Summer Camp**
(Sapanca, Sakarya · 18–20 September 2026) in one place: rules, packing list, what not to
bring, transportation, schedule, music, notes and contacts — so info stops getting lost
across WhatsApp messages.

- **Bilingual** EN / TR (toggle in the header, remembers your choice).
- **Works offline** once opened (installable to the home screen — PWA).
- **No build step, no dependencies** — plain HTML/CSS/JS, deployed to Vercel.

## Structure

| File | What it is |
|------|------------|
| `index.html` | The whole app — layout, styles, and **all content** live here (in the `DATA` object). |
| `manifest.webmanifest` | PWA metadata (name, colors, icon). |
| `sw.js` | Service worker — caches the page for offline use. |
| `artwork-en.png` / `artwork-tr.png` | Official camp artwork shown in the hero (swaps with language). |
| `icon-192.png` / `icon-512.png` / `apple-touch-icon.png` | App / home-screen icons (flame emblem on brand gold). |
| `vercel.json` | Vercel config (`cleanUrls`). |

## Updating the content

All text is in the `DATA` object near the bottom of `index.html`. Every field is
`{ en: "...", tr: "..." }`. Edit the value, save, done.

- **Schedule** and **Music** are placeholders. Fill `DATA.schedule` / `DATA.music`:
  change `placeholder:true` to `false` and replace `text` with the real content
  (or add a richer structure and a matching render function).
- After changing content, **bump the cache version** in `sw.js` (`ya26-v1` → `ya26-v2`)
  so phones that already opened the page pull the update.

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(A plain static server is required — opening the file directly disables the service worker.)

## Deploy (Vercel)

```bash
vercel          # first time: link/create the project
vercel --prod   # publish
```

Then share the URL in the participant group.
