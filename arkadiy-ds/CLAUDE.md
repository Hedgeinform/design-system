# Instructions for Claude

This project uses **arkadiy-ds**, the personal design system for Arkadiy Schennikov's independent practice.

## Before you design anything visual:

1. **Read `arkadiy-ds/DESIGN-SYSTEM.md` first.** It contains the tokens, typographic scale, rules of use, and antipatterns. Do not invent palettes or type stacks — use the ones defined there.

2. **Link `arkadiy-ds/tokens.css` and `arkadiy-ds/typography.css`** in every HTML artefact. All colours, fonts, spacing come from CSS custom properties (`var(--bg)`, `var(--ink)`, `var(--accent)`, etc.) — never hard-code hex values.

3. **Start from `arkadiy-ds/components/`** for common patterns (topbar, hero, writing index row, footer). They are portable templates with placeholder strings. Replace strings, keep structure.

4. **Theme default is dark.** Both dark and light palettes are defined in `tokens.css` and activated by `<html data-theme="dark|light">`. Include the theme toggle in the topbar unless told otherwise.

## Hard rules (from `DESIGN-SYSTEM.md § 3, § 5`):

- Manrope for display + body. IBM Plex Mono **only** for UI labels (eyebrows, meta rows, figure captions). Never Inter/Roboto/system-sans.
- One accent colour (coral). Never introduce a second hue.
- No gradients. No emoji as brand. No drop shadows. No rounded-card-with-left-border-accent.
- The Euler identity `eⁱπ + 1 = 0` is the wordmark. Centered in sticky topbar on every page. Do not replace.
- Decorations (FFT spectrum, Lissajous, phase portrait, polar ring) are brand signal, not data. Bottom-right of Hero or section corner, `opacity ≤ 0.9`, `vw ≥ 1100px` guard.

## Data surfaces (dashboards, tables, charts):

Read **§7 of `DESIGN-SYSTEM.md`** before building anything data-heavy. Short version:

- **Severity is semantic, not a new palette.** OK = `--state-ok` (ink-soft, quiet). WARN = `--state-warn` (coral at 40% opacity). CRIT = `--state-crit` (full coral). Labels are mono uppercase.
- **Tables**: horizontal hairlines only, no zebra, no vertical borders. Numeric cells use `font-variant-numeric: tabular-nums`. Hover `--bg-elev` only if row is clickable.
- **Charts**: single series = `--accent`. Multi-series = coral at 100/60/30% opacity (use `seriesColors(n)` from `tokens.js`). Gridlines horizontal only, `--data-grid`. Axis labels mono 11px. Never a second hue — if the chart wants a 4th colour, split it.
- **Bar charts** (§7.3a): three flavours — single-series `--accent`, severity-coloured (`--ink-soft` norm / `--state-warn` / `--state-crit`), or positive `--state-positive`. Threshold lines are 1px dashed `--accent`.
- **Positive metric colour** (§7.1a): `--positive` / `--state-positive` (warm olive) is the ONE allowed exception to single-accent. Use only when (1) data surface, (2) directional "high = good" metric, (3) discrete visualization (bar/pill/dot, never line). Never combined with warn/crit in the same chart.
- **Search input**: mono `/` prefix, no magnifier icon.
- **Dense mode**: use `--gutter-dense`, `--section-pad-dense`, `--max-width-dense: none`. Activate with `<body class="dense">`. Don't redefine editorial tokens locally.
- **Internal vs branded**: private/admin surfaces use a minimal topbar (no Euler wordmark). Public/branded surfaces keep the full topbar.

## JS chart libraries (Recharts, Chart.js, D3):

Import from `arkadiy-ds/tokens.js`:
```js
import { getTokens, seriesColors, onThemeChange } from './arkadiy-ds/tokens.js';
onThemeChange((theme, T) => chart.update({ colors: seriesColors(2), grid: T.dataGrid }));
```
Never hardcode hex values in JS — the theme toggle will desync.

## If something's missing:

If you need a pattern the design system doesn't have yet (modal, date-picker, complex form), design it consistent with the rules above, then propose it as an addition to `arkadiy-ds/components/`. Don't improvise silently.

## Reference implementations:

This same project contains full reference implementations you can read:
- `Landing.html` + `hero-variant.jsx` + `landing-sections*.jsx` — editorial landing page.
- `Essay.html` — long-form reading template.
- `Dashboard-reference.html` — dense data surface showing §7 patterns composed.

They are not portable (they embed project-specific content), but they show how the tokens + components compose into real pages.
