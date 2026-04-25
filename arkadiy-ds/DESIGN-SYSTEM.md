# Arkadiy Schennikov — Design System

**Version:** 0.5 · 2026-04-25
**Maintainer:** Arkadiy (author) · Claude (co-author on this build)

> **Changelog**
> - **0.5** — Field-reconciliation pass against the live dashboard (commit 497a0f3). Five points resolved across two categories.
>   - **Corrections** (DS was wrong, dashboard was right):
>     - **§7.11 axis ≥ gridline** — strict inequality relaxed to "axis ≥ gridline, equality permitted when both are quiet enough not to compete with data." Axis must never be *weaker* than gridlines; equality is fine.
>     - **`--data-axis` retoned to `--ink-soft`** — `--ink-faint` (~1.3:1 contrast) does not satisfy the readability function of axis tick labels on a data-dense surface. `--ink-faint` is now reserved for genuinely-ghost cases (watermarks, deprecated, explicitly de-emphasised secondary axes).
>   - **New named patterns** (DS hadn't named these; field practice did):
>     - **§7.1a-2 Asymmetric action histogram** — legalises a quality histogram whose bins on one end of the scale require finer-grained reaction protocols than the other (e.g. `crit` / `warn` / `neutral` / `pos` across discrete buckets). Three preconditions enforced; documents the pattern OV1 in `Hedgeinform/hedgedasbord` was reaching for.
>     - **§7.1a-3 Unipolar polarity** — one pole of a binary metric carries semantics, the other is its absence. Null pole is `--ink-faint` *by spec* (so the absent reading visually recedes rather than competing for height).
>     - **§7.3a row 4 — Measurement without judgement** — solid `--accent` bars for metrics that have no normative interpretation in the moment but are kept on the surface for downstream pattern-detection.
>   - `components/bar-chart.html` updated to match the corrected `--data-axis`.
>   - **Known debt (deferred to v0.6).** §7.10 *Histograms* and §7.11 *Axes & gridlines* sit between §7.3a and §7.4 — a numbering stutter inherited from v0.4 (when the sections were appended at the bottom of §7's working draft and never resequenced). Renumbering them to §7.4 / §7.5 and shifting existing §7.4–§7.9 down would break inbound references from the Hedgeinform webapp (`ARCHITECTURE.md → §7.11`, `OV3` / `OV4` / `OV5`). Resolution scheduled for v0.6 as a single "§7 numbering rationalisation" pass with an explicit mapping table; until then the order is correct, only the labels are out of sequence.
> - **0.4** — Handoff session 2026-04-25: four field observations resolved.
>   - **§7.1a rewritten:** Replaced `--positive` single-token with the three-token value scale `--val-pos` / `--val-neu` / `--val-neg` (+ `--val-warn` advisory). Three strict conditions of applicability + explicit antipattern list. Single principle, no surface split.
>   - **§8 rewritten:** Removed branded/internal split. Topbar carries up to two identity marks (Euler center, monogram left), default both present; any combination is permitted at project discretion. §8.1 monogram style; §8.2 Euler style.
>   - **§7.10 new:** Histogram contract — dense bins, gap ≤ 1px, baseline = `--ink-faint`, no per-bar labels.
>   - **§7.11 new:** Axis & gridline contract — axis weight > gridline weight, gridlines never overlap axis, tick labels never cross axis.
> - **0.3** — Added `--positive` / `--state-positive` token (warm olive, dark+light pair) for directional "high = good" metrics on data surfaces only. New components: `bar-chart`, `category-chart`, `filter-pills`. New DS sections: §7.1a Positive metrics (strict applicability), §7.3a Bar-chart rules. *(Superseded by 0.4 §7.1a rewrite — `--positive` retained as legacy alias of `--val-pos`.)*
> - **0.2** — Added data patterns: severity, tables, charts, dense layout scale, `tokens.js` runtime helper.
> - **0.1** — Initial release.

This is the design language for Arkadiy's independent practice and all artefacts issued under his name — landing pages, essays, presentations, case notes, internal tools. It is **small by design**. Two themes, one typeface family, one accent colour, one wordmark. Everything else is rhythm, whitespace, and the discipline of not adding things.

---

## 1 · Philosophy

**The practice is technical, unhurried, literate.** Designs should read the way a good book reads — the author has done the thinking, so the reader doesn't have to. No marketing hedging. No "AI-first" gradients. No emoji as brand.

**The wordmark is Euler's identity:** `eⁱπ + 1 = 0`. It is the bar the work is held to — five fundamental constants, one equation, zero remainder. Do not decorate it, do not replace it with "a more recognizable logo," do not move it to the footer. (For topbar slot rules — where Euler sits, when it can be omitted, and how the personal monogram coexists — see §8.)

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
| `--ink-faint`  | `#322a25`  | Genuinely-ghost only: watermarks, deprecated values, explicitly de-emphasised secondary axes. **Not** for tick labels (see §7.11). |
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

### 7.1a Reading values on dashboards — the three-hue scale

Dashboards must communicate **value polarity** to any viewer, not just to people who have read this DS. Three semantic colours, used strictly inside data contexts, are the system's answer.

**Tokens.**

| Token         | Dark      | Light     | Means |
|---------------|-----------|-----------|-------|
| `--val-pos`   | `#8fa677` | `#5a7347` | Positive value / favourable delta / "high = good." |
| `--val-neu`   | `#968c7a` | `#6b5f4e` | Neutral / unchanged / no-news. (= `--ink-soft`.) |
| `--val-neg`   | `#c2614a` | `#a83a18` | Negative value / adverse delta / "high = bad." |
| `--val-warn`  | coral 40% | coral 40% | Advisory / approaching threshold. Used only when an explicit warning band is required. |

The three primary hues are picked to **co-exist with `--accent`** (warm olive / muted ink / desaturated brick) — they are not generic chart green/red. The brand voice does not change; the data voice gains polarity.

**Three conditions of applicability — ALL must hold.** If any one fails, the value scale does not apply; fall back to severity (§7.1) or single-accent.

1. **The element is a value cell.** A number, a delta, a bar, a pill, a sparkline mark — something that *is* a measured quantity. Not a button, not a heading, not body text, not chrome.
2. **Polarity is unambiguous.** "Up = better" or "down = better" must be obvious from the metric itself (revenue, errors, latency, sleep hours). If polarity depends on context, use `--val-neu` and explain in the label.
3. **Mutually exclusive per element.** A given value cell takes exactly **one** of the three hues. Never a gradient between them, never two at once. `--val-warn` does not coexist with the others on the same element.

**Antipatterns — explicitly forbidden.**

- ❌ Tinting an entire row, card, or panel by value polarity. Colour the value, not the container.
- ❌ Using `--val-pos` / `--val-neg` on text in editorial surfaces (essays, landing, hero). The brand has one accent; positive/negative do not exist outside data.
- ❌ Using the value scale as decoration — background washes, illustrations, accent bars, dividers, focus rings.
- ❌ Pairing the value scale with `--accent` in the same chart series. Pick severity *or* polarity, not both.
- ❌ Inventing a fourth value hue ("a yellow for caution"). `--val-warn` is the fourth and final flavour; it is coral 40%, not a new colour.
- ❌ Using saturated screen-greens / screen-reds. The system's polarity hues are warm and desaturated; pure `#00c853` / `#d50000` break the palette.

**Pos-vs-OK is not a duplicate.** `--val-neu` (= `--ink-soft`) is the absence of news. `--val-pos` is the presence of *good* news. A row that says `OK` (severity) and shows a `--val-pos` bar (polarity) is legitimate — severity says "no incident," polarity says "metric is in the favourable direction." The two scales answer different questions.

**Containment.** The value scale lives inside data surfaces only — dashboards, reports, embedded charts. Editorial surfaces (essays, landing, hero, wordmark context) keep the single-accent voice. An editorial article *quoting* a public dashboard may embed it as a figure (its own framed surface); the surrounding editorial copy still uses no polarity colour.

#### 7.1a-2 · Named exception: Asymmetric action histogram

A quality histogram may break the *mutually exclusive per element* rule (condition 3 above) by mixing severity and polarity hues across its bins — but only under three conditions, all of which must hold.

1. **The scale is judgemental.** Bins represent a quality grade or evaluation (1–10 day-score, NPS, satisfaction), not a count of independent events.
2. **Bins are discrete.** Each bin maps to a named action protocol; the histogram is read bin-by-bin, not as a continuous distribution.
3. **Action zones are asymmetric.** The bins on one end of the scale require finer-grained reaction protocols than the other end. (E.g. `1–2` triggers same-day review, `3–4` triggers trend watch — different protocols. `9–10` is a single "reinforce what worked" zone — one protocol. The middle is ordinary range — no protocol.)

If condition 3 fails — if both ends of the scale carry the same number of action zones — the chart is a double-severity distribution and must use a single scale (severity *or* polarity, not both).

**Spec.** Per-bin fill follows the action zone: severity hues (`--state-crit` / `--state-warn`) for the action-heavy end, `--ink-soft` for the no-action middle, polarity hue (`--val-pos`) for the reinforce end. `--val-neu` is not used — neutral middle is `--ink-soft` because it represents *no action needed*, which is a softer claim than *neutral value*.

**Reference.** `webapp/src/blocks/ClaudeScore.tsx` in the Hedgeinform dashboard implements this against a 5-bin Claude day-score (1–2 / 3–4 / 5–6 / 7–8 / 9–10) — see `ARCHITECTURE.md → OV1`.

#### 7.1a-3 · Named exception: Unipolar polarity

A binary metric may be coloured with one polarity hue and one ghost — when the metric records the **presence or absence** of an event rather than two opposing states.

**Conditions — all must hold.**

1. **The metric is binary.** Each cell is a bar of full or zero height; there is no in-between.
2. **One pole carries semantics, the other is its absence.** "Did the run happen today" — `--val-pos` for yes, ghost for no. Not "good vs bad" — "happened vs didn't."
3. **Single-day cells are not meant to be compared by height.** The signal lives in *frequency over the period*, not in any individual bar.

**Spec.** Positive pole — `--val-pos`. Null pole — `--ink-faint`, **by design**. Using `--val-neu` here would invite the eye to compare the heights of "neutral" and "positive" bars as if they were two states of the same metric — they are not. `--ink-faint` makes the absence visually recede so the pattern of presence reads cleanly.

**This is the one place** in v0.5 where `--ink-faint` legitimately sits in a value cell. It works precisely *because* `--ink-faint` is the de-emphasis register (§2): the null pole is supposed to be faint.

**Reference.** `webapp/src/blocks/Operations.tsx` "Физактивность" sub-chart in the Hedgeinform dashboard.

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

### 7.3a Bar charts — when severity or polarity applies

Bars are discrete visual units. Unlike line charts (continuous), a bar *can* carry its own state directly in its fill colour. This unlocks four flavours — use the right one:

| Flavour | Fill rule | Use for |
|---|---|---|
| **Single-series** | all bars `--accent` | Any metric over time/categories where state isn't distinguished. Default choice. |
| **Severity-coloured** | `--ink-soft` (norm) / `--state-warn` (over threshold) / `--state-crit` (critical) | Metrics with a target/threshold where each bar's state matters (work hours, error rates, latency spikes). |
| **Polarity-coloured** | `--val-pos` / `--val-neu` / `--val-neg` per bar (§7.1a) | Bars that represent value polarity — deltas, comparisons, signed metrics. One hue per bar, never blended. |
| **Measurement without judgement** | all bars `--accent` | Metrics with no normative reading in the moment (social contacts per day, raw event counts) but kept on the surface for downstream pattern-detection. Visually identical to single-series — the *intent* is what differs: the chart deliberately refuses to colour-code state. |
| **Bin histogram** | all bars `--accent`, see §7.10 | Distribution of values into bins. Single-colour always — bins don't have states. (For the named exception where bins *do* carry mixed semantics, see §7.1a-2 *Asymmetric action histogram*.) |

**Threshold line** — 1px dashed `--accent`, drawn horizontally at the target value. Label goes in the legend row, not floating on the chart.

**Multi-series bars (grouped)** — use `seriesColors(n)` like line charts (coral 100/60/30%). If you need grouped bars *and* state colouring simultaneously, the chart wants to be two charts stacked.

### 7.10 Histograms — distribution contract

Histograms communicate **shape**, not individual values. The contract:

- **Bins are dense.** `gap` between bars ≤ 1px (or 0 for tight distributions). The eye should read a silhouette, not a row of separated bars.
- **All bars one colour** — `--accent`. Bins are not states. Never colour bins by polarity or severity — a histogram bar means "count in this range," nothing more.
- **Baseline.** A 1px `--ink-faint` line at the bottom anchors the distribution. No top frame, no side frames.
- **No per-bar labels.** Y-axis ticks (§7.11) carry the count scale; each-bar annotation defeats the silhouette read.
- **X-axis ticks every N bins**, where N is chosen so labels do not collide — typically every 5th or 10th bin. Ticks on the bin edges, not the bin centres.
- **Annotations** (mean, median, target) — 1px dashed `--accent` vertical line + mono uppercase label at the top of the chart area. Maximum two annotations per histogram.

Use `components/bar-chart.html` (histogram flavour) as the reference.

### 7.11 Axes & gridlines — the layering contract

Axes and gridlines coexist in every chart. They must read as a **layered hierarchy**, not as a tangle.

- **Relative weight.** Axis is **at least as heavy as** gridlines, never lighter. Equality is permitted *if both are quiet enough not to compete with the data* — on a tight, data-dense surface a 1px `--rule` axis over 1px `--rule` gridlines reads as a single quiet armature, and that is fine. The directional rule (axis ≥ gridline) is non-negotiable; the strict inequality is not.
- **Axis line.** 1px `--rule` is the dashboard default — quiet armature, lets data dominate. Step it up to 1px `--ink-soft` only when the chart is sparse, when there are no gridlines (axis-only chart), or when the axis must visibly anchor a small embedded chart. Never `--ink-faint` (that's the de-emphasis register, see §2).
- **Gridlines.** 1px `--rule` (= `--data-grid`). Horizontal only for line/bar/area charts. Vertical gridlines are reserved for histograms (§7.10) where the X axis is categorical-ordinal and counts are meaningful per bin edge.
- **No overlap.** A gridline never sits on top of an axis. If a tick value falls on the baseline, omit the gridline at that position — the axis already draws it.
- **Tick labels.** Mono 11px `--data-axis` (= `--ink-soft`, see §2). Sit *outside* the plot area, never overlapping the axis or any gridline. Y-axis labels right-aligned to the axis with 8px gap; X-axis labels centred on the tick, 6px below the baseline. Tick labels are information carriers, not chrome — they must be plainly readable.
- **No frame rectangle.** A box around the plot adds two redundant axes. The plot is bounded by data, axis, and whitespace — not by a fourth-wall border.

If a chart library default violates this contract, override the styles via `tokens.js`. Do not work around the contract by relabelling "axis" and "gridline" — the visual roles are what matters.

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

## 8 · Topbar identity

The topbar carries up to two identity marks, in two distinct slots:

- **Center — Euler wordmark** (`eⁱπ + 1 = 0`). Brand of the practice.
- **Left — Personal monogram** (italic AS). Signature of the operator.

**Default state:** both present. The pair reads as "practice + author" — the work happens inside Arkadiy's practice and was assembled by Arkadiy specifically.

**Optional exclusions.** Any project may, at its discretion:

- omit the monogram — Euler alone, the classical branded surface;
- omit the Euler — monogram alone, a light or anonymous tool;
- omit both — chrome-free utility surface.

DS does not prescribe which combination a given surface must use — that's a project-level decision based on context. DS describes the **elements**, not their **mandatory presence**. (This mirrors the §7.1a principle: the system supplies a vocabulary; projects choose which words to use.)

If in doubt, default to both. Removing chrome is an editorial choice, not a default.

### 8.1 Monogram — style rules

- Manrope italic, weight 500, 18–20px, color `--accent`.
- `letter-spacing: -0.05em` (denser than running italic — reads as a signature, not a word).
- Sits in the **left** topbar slot, before the project name, separated by `·` in `--ink-faint`.
- Never in the center slot (that's Euler's place; if Euler is omitted, the centre stays empty).
- Never larger than 24px (becomes a logo).
- Never duplicated within a single page.
- Never on `--accent-soft` surface (the tinted background eats the italic glyph).

**Aspirational visual:** an interlocked / shared-baseline ligature glyph delivered as a custom SVG or hand-tuned font asset. Italic letters are the base case; promote to ligature when the asset exists. The promotion is invisible to consuming projects — same slot, same size, same colour.

### 8.2 Euler — style rules

- Manrope italic display, 17px, color `--accent`.
- Center slot of the sticky topbar, vertically centred.
- Never decorated (no underline, no box, no shadow, no animation).
- Never replaced by initials, a graphic logo, or a photo.
- Never moved to the footer or to a side rail.
- Renders as `eⁱπ + 1 = 0` with the `iπ` set as a superscript on `e`.

Reference: `components/topbar.html`.

---

## 9 · Theme persistence

`localStorage['theme']` is canon. `prefers-color-scheme` is consulted **only on first visit** as a fallback — once the user toggles, their choice wins forever. This is what `components/topbar.html` already implements.
