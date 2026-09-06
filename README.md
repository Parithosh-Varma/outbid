# OX.lol — 1:1 Clone

Pixel-perfect clone of **https://ox.lol/** — "Where bold products compete for the spotlight."

## Run locally

```bash
python3 -m http.server 8787 --directory .
# or
npm run dev
```

Open http://localhost:8787

## Structure

- `index.html` — Full page structure replicating ox.lol SSR output (header, hero, bid panel, leaderboard, calendar, footer)
- `styles.css` — Original Tailwind build from ox.lol (`/assets/styles-awlFZRyO.css`) — ensures 1:1 visual parity (variables, grids, rank cards, ambients)
- `script.js` — Interactivity matching production: headline $17 +/- controls, category filter pills, bid validation, Dodo Payments dialog, dark mode (localStorage `ox-theme`), live counters, calendar
- `public/` — Favicons, ox-mark, manifest, logos fetched from ox.lol

## Features cloned

- Header with `ox` wordmark + blended dot/ring, All-time/Today pill, nav, dark mode, mobile drawer
- Hero tape, `Claim #1 for $17` with orbiting price controls
- Bid panel (URL + category + OX Bid) with whole-dollar validation
- Leaderboard: front-row banner, rank-stage (rank-one depth/3D, rank-two orange, rank-three silver), chase-pack + more boards
- Category pills (All → Other) filtering live
- Latest activity + Calendar board (September 2026) with champion days
- Footer, dialogs, toasts

## Notes

- CSS is vendored directly from ox.lol to guarantee exact tokens (`--background`, `--primary` oklch, `.site-shell` grid, `.rank-one` shadows, etc.)
- Fonts: Inter via Google Fonts (original uses `Inter Variable`)
