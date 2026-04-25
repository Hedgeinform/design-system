# arkadiy-ds

Personal design system for Arkadiy Schennikov's independent practice.

## What's here

```
arkadiy-ds/
├── tokens.css              CSS custom properties — colours, type, spacing (editorial + dense)
├── tokens.js               Runtime helper: getToken / getTokens / seriesColors / onThemeChange
├── typography.css          Typographic classes built on tokens
├── fonts/                  Self-hosted woff2 — Manrope (4 weights) + IBM Plex Mono (2 weights), latin + cyrillic
├── components/
│   ├── topbar.html         Sticky top chrome + Euler wordmark + theme toggle
│   ├── Hero.jsx            Hero pattern: eyebrow / tagline / lede / CTAs / decoration
│   ├── WritingCard.jsx     Index-table rows for essays + newsletter
│   ├── footer.html         Four-column footer + meta strip
│   ├── table.html          Data table — hairlines, severity labels, accordion rows
│   ├── alert.html          Callout — OK/WARN/CRIT, mono label + body
│   ├── status-pill.html    Inline state marker — 6px dot + mono label
│   ├── search-input.html   Search field with `/` prefix (no icon)
│   ├── chart-helpers.html  SVG line-chart reference + tooltip + legend
│   ├── bar-chart.html      Bar: single / severity / positive / histogram + threshold
│   ├── category-chart.html Timeline-by-category dot chart
│   └── filter-pills.html   Horizontal chip-strip for 4+ filter options
├── DESIGN-SYSTEM.md        Philosophy · tokens · rules · antipatterns · data patterns
├── CLAUDE.md               Instructions that Claude Code reads automatically
└── README.md               (you are here)
```

## How to use in a new project

1. **Copy the whole `arkadiy-ds/` folder** into your new project's root. The `arkadiy-ds/fonts/` subfolder must come along — Manrope and IBM Plex Mono are self-hosted (twelve `.woff2` files, ~80KB total). The `@font-face` declarations live inside `typography.css` and use relative paths to `fonts/`, so the folder must stay together.
2. **Link the CSS** in your HTML `<head>`:
   ```html
   <link rel="stylesheet" href="arkadiy-ds/tokens.css">
   <link rel="stylesheet" href="arkadiy-ds/typography.css">
   ```
   That's it — fonts load automatically through `@font-face` in `typography.css`. No external CDN, no `fonts.googleapis.com` link, no third-party request.
3. **Paste the topbar** from `components/topbar.html` into your `<body>`, replace `{{PLACEHOLDERS}}` with your strings.
4. **Build the rest** using `var(--bg)`, `var(--ink)`, `var(--accent)` etc. — never hard-code hex values.

If you are working with Claude Code: `CLAUDE.md` inside this folder is auto-loaded and tells Claude to follow the design system. You don't need to remind it each session.

### About the fonts

The `arkadiy-ds/fonts/` folder ships **self-hosted woff2 only** — twelve files, latin + cyrillic subsets, weights 400/500/600/700 (Manrope) and 400/500 (Plex Mono). This is the production-recommended path for everything: dashboards (CSP, GDPR, offline tolerance), editorial sites (no second HTTP-hop), prototypes (faster to show).

`font-display: swap` is set on every face, with metric-matched synthetic fallbacks (`Manrope Fallback` over Arial, `IBM Plex Mono Fallback` over Menlo) so the swap is visually quiet — text appears immediately in the fallback, then re-renders in the real font without layout shift. See the comment block at the top of `typography.css` for the override numbers.

Files come from [fontsource](https://github.com/fontsource/font-files) (mirror of Google Fonts as standalone files, OFL/MIT licensed). To regenerate or update, fetch from `fontsource/font-files` `fonts/google/manrope/files/` and `fonts/google/ibm-plex-mono/files/`.

**For prototypes only** — if you need a faster-than-copy spin-up and don't have the `fonts/` folder handy, you can fall back to Google Fonts as a one-line replacement of the `@font-face` block:

```html
<!-- prototype-only path; do NOT ship to production -->
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Production warning: `fonts.googleapis.com` triggers a CSP allowance for `style-src` and `font-src`, sends the user's IP to Google (a GDPR consideration in EU jurisdictions), and adds an extra DNS+HTTP hop on the critical path. Self-hosted is unconditionally better outside the prototyping window.

## Updating

When tokens change here, every project that copied this folder is out of date. There is no auto-sync — propagate by hand, intentionally. Bump the version header in `DESIGN-SYSTEM.md` when you change tokens, so downstream diffs are readable.

## Philosophy (short version)

- Two themes (dark default, light), one typeface family (Manrope + IBM Plex Mono), one accent (coral).
- Euler's identity `eⁱπ + 1 = 0` is the wordmark. Do not replace.
- Technical voice comes from typography and small SVG plots, not icons or gradients.
- Data surfaces follow the same rule: severity is typographic + coral-opacity; one accent; hairlines, not fills.
- See `DESIGN-SYSTEM.md` for the full story; `Landing.html` and `Dashboard-reference.html` for composed examples.
