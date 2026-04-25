# Arkadiy Schennikov — Design System

**Version:** 0.2 · 2026-04-21
**Maintainer:** Arkadiy (author) · Claude (co-author on this build)

> **Changelog**
> - **0.3** — Added `--positive` / `--state-positive` token (warm olive, dark+light pair) for directional "high = good" metrics on data surfaces only. New components: `bar-chart` (single, severity-coloured, positive, threshold line, bin histogram), `category-chart` (timeline-by-category), `filter-pills` (4+ options, escape-pill pattern). New DS sections: §7.1a Positive metrics (strict applicability), §7.3a Bar-chart rules.
> - **0.2** — Added data patterns: severity (typographic, reusing `--accent`), tables, charts, dense layout scale, `tokens.js` runtime helper. New components: `table`, `alert`, `status-pill`, `search-input`, `chart-helpers`. Reference page `Dashboard-reference.html`. No breaking changes to v0.1 tokens.
> - **0.1** — Initial release: dark/light warm-paper palette, Manrope + IBM Plex Mono, Euler wordmark, Hero, WritingCard, footer, topbar.

This is the design language for Arkadiy's independent practice and all artefacts issued under his name — landing pages, essays, presentations, case notes, internal tools. It is **small by design**. Two themes, one typeface family, one accent colour, one wordmark. Everything else is rhythm, whitespace, and the discipline of not adding things.

---

## 1 · Philosophy

**The practice is technical, unhurried, literate.** Designs should read the way a good book reads — the author has done the thinking, so the reader doesn't have to. No marketing hedging. No "AI-first" gradients. No emoji as brand.

**The wordmark is Euler's identity:** `eⁱπ + 1 = 0`. It lives centered in the sticky top chrome of every page. It is the bar the work is held to — five fundamental constants, one equation, zero remainder. Do not decorate it, do not replace it with a monogram, do not move it to the footer.

**Technical voice comes from typography, not iconography.** The coded feeling of the brand is carried by IBM Plex Mono in UI labels (`§01`, `FIG. II`, `20 MS/DIV`) and by small SVG plots (FFT spectra, Lissajous curves, phase portraits) as decoration — never as data. Body text is always Manrope, never mono.

---

## 2 · Tokens (see `tokens.css`)

### Dark (default — "warm coal")
| Token          | Value      | Role |
|----------------|------------|------|
| `--bg`         | `#141110`  | Page background. Warm coal — never pure black. |
| `--bg-elev`    | `#1a1715`  | Subtly raised (cards, tooltips). |
| `--accent-soft`| `#2e201a`  | Tinted surface behind callouts, inputs. |
| `--ink`        | `#ede5d8`  | Primary text — warm cream. |
| `--ink-soft`   | `#968c7a`  | Muted text, eyebrows, meta. |
| `--ink-faint`  | `#322a25`  | Disabled, ghost numerals. |
| `--rule`       | `#241f1b`  | Hairlines, 1px borders, dividers. |
| `--accent`     | `#f5936a`  | Coral-peach. **THE signal colour.** Use sparingly. |

### Light ("warm paper")
| Token          | Value      |
|----------------|------------|
| `--bg`         | `#f4ecdd`  |
| `--bg-elev`    | `#ede5d5`  |
| `--accent-soft`| `#ecd9c3`  |
| `--ink`        | `#1a1613`  |
| `--ink-soft`   | `#6b5f4e`  |
| `--ink-faint`  | `#d8cbb4`  |
| `--rule`       | `#e4d8bf`  |
| `--accent`     | `#c2451e`  | Deeper coral — the light-theme twin of `#f5936a`. |

**Light is NOT an inversion.** It is a parallel warm-paper palette where the coral accent is re-mixed deeper (`#c2451e` vs `#f5936a`) to read as signal, not pastel.

### Typography
| Token                | Value                                          |
|----------------------|------------------------------------------------|
| `--font-display`     | `"Manrope", system-ui, sans-serif`             |
| `--font-body`        | `"Manrope", system-ui, sans-serif`             |
| `--font-mono`        | `"IBM Plex Mono", ui-monospace, monospace`     |
| `--display-weight`   | `600`                                          |
| `--display-tracking` | `-1.8px`                                       |
| `--display-leading`  | `1.03`                                         |
| `--body-size`        | `17px` · leading `1.6`                         |
| `--meta-size`        | `11px` · letter-spacing `0.5px`, UPPERCASE     |

### Spacing
| Token           | Value   |
|-----------------|---------|
| `--gutter`      | `64px`  | Horizontal page gutter. |
| `--section-pad` | `96px`  | Vertical padding between major sections. |
| `--max-width`   | `1320px`| Content canvas width. |

---

## 3 · Rules of use

1. **Theme default is dark.** Light is available via `<html data-theme="light">` and a toggle in the topbar. Respect `prefers-color-scheme` only if the user explicitly asks.
2. **Accent is the only colour.** Never introduce a second hue. If a design "needs" more colour, it doesn't — it needs hierarchy.
3. **Mono is UI-only.** Eyebrows, meta rows, figure labels, status strings, table headers. Never for body, never for headlines.
4. **Display italic is for emphasis inside a headline.** Never for entire headlines.
5. **Decorations (FFT, Lissajous, phase, ring) are brand signal, not data.** They go in Hero or section corners, bottom-right, `opacity ≤ 0.9`, viewport-guarded (`vw ≥ 1100px`).
6. **Rule lines are 1px, `var(--rule)`.** No shadows. No rounded corners except on the pulse dot and avatar frames (where it's sensible — not because CSS makes it easy).
7. **Gradients: forbidden.** The palette is flat. Any "depth" comes from typography, not from Photoshop.
8. **Emoji: forbidden as brand elements.** Fine inside user content (essay bodies, quotes).

---

## 4 · Patterns

See `components/` for portable templates. Each expects `tokens.css` + `typography.css` to be loaded.

| Pattern         | File                               | Use for |
|-----------------|------------------------------------|---------|
| Topbar + Euler + theme toggle | `components/topbar.html` | Every branded page. |
| Hero            | `components/Hero.jsx`              | Landing page, section-opener. |
| Writing index row | `components/WritingCard.jsx`     | Essay + newsletter index tables. |
| Footer          | `components/footer.html`           | Page bottom. |
| Data table (severity, accordion) | `components/table.html`  | Dashboards, monitoring, reports. |
| Alert / callout | `components/alert.html`            | WARN/CRIT messages, with action. |
| Status pill     | `components/status-pill.html`      | Inline state markers. |
| Search input    | `components/search-input.html`     | Filtering, global search (`/` prefix). |
| Line-chart reference | `components/chart-helpers.html` | SVG line chart + tooltip + legend. |
| Bar-chart reference | `components/bar-chart.html`   | Single, severity-coloured, positive, histogram. |
| Category-chart      | `components/category-chart.html` | Timeline-by-category, event dots. |
| Filter pills        | `components/filter-pills.html` | 4+ filter options with escape. |
| Runtime tokens      | `tokens.js`                    | JS chart libs; re-reads on theme change. |

Reference implementations (full context, not portable — read as examples):
- `../hero-variant.jsx` — Hero component with all 4 decoration flavors.
- `../landing-sections.jsx`, `../landing-sections-b.jsx` — long-form section patterns.
- `../Landing.html` — composed example with dark/light toggle (editorial surface).
- `../Dashboard-reference.html` — composed example of §7 data patterns (dense surface).

---

## 5 · Antipatterns — things NOT to do

- ❌ Inter, Roboto, or system sans as display type. The face is Manrope, always.
- ❌ A second accent colour ("let's add a blue for links").
- ❌ Gradients of any kind (linear, radial, mesh).
- ❌ Rounded cards with left-border accent (the "AI SaaS landing" trope).
- ❌ Emoji in headings, CTAs, or nav.
- ❌ Monospace for body copy ("let's make it look coded").
- ❌ Drop shadows. The design is flat, not skeuomorphic.
- ❌ Replacing the Euler wordmark with initials, a logo, or a photo.
- ❌ Adding a second font to "give variety" — variety comes from weight, size, and italic.

---

## 6 · Versioning

Bump the version at the top of this file when tokens change. Token changes propagate to every project that copied `arkadiy-ds/` — review downstream before pulling. Append a one-line entry to the changelog block under the version header; diffs are readable by scrolling one section, not by grepping git.

---

## 7 · Data patterns (dashboards, tables, charts)

The brand is editorial by default but must also serve dashboards, monitoring, and admin tools. The rule of data surfaces is the same as the rest of the system: **one accent colour, typography carries the signal.**

### 7.1 Severity

Severity is **not** a new palette. It is a semantic re-use of existing tokens:

| State  | Token           | Visual |
|--------|-----------------|--------|
| OK     | `--state-ok`    (= `--ink-soft`) | Muted. *Normal is the absence of signal.* |
| WARN   | `--state-warn`  (= `--accent` @ 40% opacity) | Half-signal. Readable at a glance, doesn't scream. |
| CRIT   | `--state-crit`  (= `--accent`)   | Full signal. The only state where the brand colour means *stop*. |

**Rules.** Labels are mono uppercase: `OK` / `WARN` / `CRIT`. Dots (when used) are 6px circles in the same colour — static, not pulsing. The pulse animation is reserved for availability (`class="pulse"`), not severity. Never tint a whole row by severity; colour the label, not the background. Exception: a CRIT alert callout may use `--accent-soft` as its surface (see §7.4).

### 7.1a Positive metrics (the one exception to single-accent)

External audiences read **green = good, red = bad** as a universal convention. Internal dashboards can live on the coral severity ladder alone; public dashboards can't. This is the only place in the system where a second hue is allowed.

**Token:** `--positive` (warm olive — `#8fa677` dark / `#5a7347` light). Not a generic chart green — picked to sit beside coral in the warm palette. Alias: `--state-positive`.

**Applicability — all three must hold:**

1. **Surface is a data surface** (dashboard, report). Never on editorial surfaces (landing, essay, wordmark context). Positive does not exist in the brand voice, only in the data voice.
2. **Metric is directional and one-sided** — "high = good, low = neutral" (physical activity, sleep hours, uptime, completed tasks). Not two-sided "good / bad" — that's severity, stays on coral ladder.
3. **Visualization is discrete** — bar, pill, dot, filled area. Not a line chart. Lines are continuous; positive-colouring a line implies the whole line is "good", which is meaningless. Colour discrete marks only.

**Never combine positive + warn + crit in the same chart.** Max two semantics per visualization. If a metric can be good / warning / critical simultaneously, it's severity, stays coral. Positive is for metrics that have no critical state to communicate.

**Positive ≠ OK.** OK is nothing (absence of signal, `--ink-soft`, used in severity tables). Positive is directional (presence of good news, `--positive`). A row with `OK` label + a bar coloured `--positive` is legitimate: the row says "no incident", the bar says "metric is high".

### 7.2 Tables

Hairlines only — horizontal 1px `--rule` between rows. No vertical borders. No zebra (zebra adds noise and fights with severity labels).

- **Column headers** — mono 11px uppercase, `--ink-soft`, weight 500.
- **Numeric cells** — body font with `font-variant-numeric: tabular-nums` and `text-align: right`. Not mono — mono is the UI voice, tabular-nums is enough for alignment.
- **Hover** — `--bg-elev` on `<tr>`, but only if rows are actually clickable (add class `interactive`). Static tables don't react to pointer.
- **Accordion rows** — clicking a row toggles a paired detail row with `[data-open]` attribute. Detail row sits on `--bg-elev`. See `components/table.html`.

### 7.3 Charts

Charts are **data**, not decoration — the Hero-corner plots are the opposite: decoration that looks like data. Don't confuse them.

- **Single series** → line stroke `--accent`, 1.5px.
- **Multi-series** → coral at stepped opacities: **100% / 60% / 30%** (via `seriesColors(n)` in `tokens.js`). Never introduce a second hue. If the chart needs four colours, it needs to be two charts.
- **Gridlines** — horizontal only, 1px `--data-grid`. No vertical gridlines, no frame rectangle.
- **Axis labels, ticks** — mono 11px, `--data-axis`.
- **Chart title + meta** — mono 11px uppercase, `--ink` for title, `--ink-soft` for meta (units, time range).
- **Tooltips** — `--bg-elev` surface, 1px `--rule` border, padding `10px 14px`, no shadow. Mono 10px uppercase `--ink-soft` for the label line, body 14px `--ink` for the value (tabular-nums).
- **Legends** — mono 11px uppercase `--ink-soft`, colour swatch is an 18×2px line matching the series stroke.

See `components/chart-helpers.html` for a hand-rolled SVG reference (preferred for ≤3 series) and the JS-library integration block at the bottom of that file.

### 7.3a Bar charts — when severity applies

Bars are discrete visual units. Unlike line charts (continuous), a bar *can* carry its own state directly in its fill colour. This unlocks three flavours — use the right one:

| Flavour | Fill rule | Use for |
|---|---|---|
| **Single-series** | all bars `--accent` | Any metric over time/categories where state isn't distinguished. Default choice. |
| **Severity-coloured** | `--ink-soft` (norm) / `--state-warn` (over threshold) / `--state-crit` (critical) | Metrics with a target/threshold where each bar's state matters (work hours, error rates, latency spikes). |
| **Positive** | all bars `--state-positive` | Directional "high = good" metric (§7.1a). Never mixed with severity-coloured in the same chart. |
| **Bin histogram** | all bars `--accent` | Distribution of values into bins. Single-colour always — bins don't have states. |

**Threshold line** — 1px dashed `--accent`, drawn horizontally at the target value. Label goes in the legend row, not floating on the chart.

**Multi-series bars (grouped)** — use `seriesColors(n)` like line charts (coral 100/60/30%). If you need grouped bars *and* severity colouring simultaneously, the chart wants to be two charts stacked.

### 7.4 Alerts / callouts

Three severities share one layout: `[mono severity label] [body message] [optional action →]`. No icons. No rounded-card-with-left-border accent (that's the antipattern). Horizontal hairlines top and bottom.

- **OK / WARN** — no surface tint. Just the label colour + message.
- **CRIT** — `--accent-soft` as background. This is the only place in the system where a tinted surface carries semantic weight. Use sparingly; if every alert is CRIT, none are.

See `components/alert.html`.

### 7.5 Status pills

Inline marker — 6px dot + mono uppercase label, colour from severity token. No filled background, no rounded rectangle. Used inside table cells, card headers, service lists. See `components/status-pill.html`.

### 7.6 Search input

No magnifier icon (iconography is outside the DS voice). Use a mono `/` prefix inside the field — a Vim/Slack-style signal that reads as "search" without decoration. Underline becomes `--accent` on focus. Optional `⌘K` hint in a bordered `<kbd>` on the right. See `components/search-input.html`.

### 7.7 Dense layout mode

The editorial scale (`--gutter: 64px` / `--section-pad: 96px` / `--max-width: 1320px`) is too airy for dashboards. Dense mode is a **parallel** scale — activate with `<body class="dense">` or apply the dense tokens to a specific container. Do not redefine the editorial tokens locally.

| Token                | Dense value |
|----------------------|-------------|
| `--gutter-dense`     | `24px`      |
| `--section-pad-dense`| `32px`      |
| `--stack-dense-*`    | `4 / 8 / 14 / 24 px` |
| `--max-width-dense`  | `none` — dashboards run full-viewport. |

Grid: prefer `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))` with `gap: var(--gutter-dense)`. A formal 12-column is overkill for most dashboard compositions; minmax lets cards reflow honestly.

### 7.8 Form controls, modals, skeletons

Deferred to project-level until a real need arises. When you build them, follow the same principles: hairlines over fills, mono for labels, body for inputs, `--accent` only on focus/active. Modals are explicitly **not** in the DS — their behaviour varies too much across product contexts (side sheet vs centered vs full-bleed). Design per-project.

### 7.9 JS chart libraries

Libraries like Recharts, Chart.js, and D3 take hex strings via props, not CSS variables. Use `tokens.js` to read tokens at runtime and re-read on theme change:

```js
import { getTokens, seriesColors, onThemeChange } from './arkadiy-ds/tokens.js';
onThemeChange((theme, T) => {
  chart.update({ colors: seriesColors(2), axis: T.dataAxis, grid: T.dataGrid });
});
```

Never hardcode hex values in JS — the dark↔light toggle will desync.

---

## 8 · Surface contexts (branded vs internal)

The Euler wordmark is the brand signal. Not every surface needs it.

- **Branded surfaces** (public URL, clients see it, portfolio, landing, essay) — full topbar with Euler wordmark centered. `components/topbar.html`.
- **Internal surfaces** (private dashboards, admin tools, monitoring that only you see) — minimal topbar, no wordmark. Just project name + nav + theme toggle. Same tokens, same font stack, no branding.

If in doubt: is there any chance this page has a public URL? Use the branded topbar. Is it strictly private? The minimal version is fine.

---

## 9 · Theme persistence

`localStorage['theme']` is canon. `prefers-color-scheme` is consulted **only on first visit** as a fallback — once the user toggles, their choice wins forever. This is what `components/topbar.html` already implements.
