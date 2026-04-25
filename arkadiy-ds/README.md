# arkadiy-ds

Personal design system for Arkadiy Schennikov's independent practice.

## What's here

```
arkadiy-ds/
├── tokens.css              CSS custom properties — colours, type, spacing (editorial + dense)
├── tokens.js               Runtime helper: getToken / getTokens / seriesColors / onThemeChange
├── typography.css          Typographic classes built on tokens
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

1. **Copy the whole `arkadiy-ds/` folder** into your new project's root.
2. **Link the CSS** in your HTML `<head>`:
   ```html
   <link rel="stylesheet" href="arkadiy-ds/tokens.css">
   <link rel="stylesheet" href="arkadiy-ds/typography.css">
   <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
   ```
3. **Paste the topbar** from `components/topbar.html` into your `<body>`, replace `{{PLACEHOLDERS}}` with your strings.
4. **Build the rest** using `var(--bg)`, `var(--ink)`, `var(--accent)` etc. — never hard-code hex values.

If you are working with Claude Code: `CLAUDE.md` inside this folder is auto-loaded and tells Claude to follow the design system. You don't need to remind it each session.

## Updating

When tokens change here, every project that copied this folder is out of date. There is no auto-sync — propagate by hand, intentionally. Bump the version header in `DESIGN-SYSTEM.md` when you change tokens, so downstream diffs are readable.

## Philosophy (short version)

- Two themes (dark default, light), one typeface family (Manrope + IBM Plex Mono), one accent (coral).
- Euler's identity `eⁱπ + 1 = 0` is the wordmark. Do not replace.
- Technical voice comes from typography and small SVG plots, not icons or gradients.
- Data surfaces follow the same rule: severity is typographic + coral-opacity; one accent; hairlines, not fills.
- See `DESIGN-SYSTEM.md` for the full story; `Landing.html` and `Dashboard-reference.html` for composed examples.
