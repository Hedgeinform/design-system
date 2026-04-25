# Arkadiy Schennikov — Design System

**Version:** 0.7 · 2026-04-26
**Maintainer:** Arkadiy (author) · Claude (co-author on this build)

> **Changelog**
> - **0.7** — Mobile-pass for editorial surfaces. Three additions, one extension.
>   - **§8.2a — Euler reflow on narrow viewports (new).** Below `--bp-narrow` (640px), the Euler wordmark migrates from the active-row centre slot to the right slot of an epigraph row at reduced size. The wordmark stays continuously present, but its role shifts — on desktop it is the central marque of the chrome; on mobile it is the running head of the page. Both readings preserve the §8.2 principle ("the standard this practice is held to"); only the typographic register changes.
>   - **§8.3 — Editorial eyebrow slot, meta-anchor (new).** The mobile epigraph row has a left slot reserved for the page's meta-anchor (`fig.`, `note`, `§NN`, issue number, date). If the consuming surface has no such anchor, the epigraph row is suppressed entirely and Euler falls back to a compact-mode centre placement in the active row. Editorial surfaces that publish — lead pages, essays, archive cards, dated artefacts — should populate this slot. Surfaces that operate (dashboards, forms) do not use this topbar component at all; they belong to dense mode (§7.10) and a separate chrome compoent — out of scope for v0.7, scheduled for v0.8.
>   - **§10 — Responsive scale (new).** Documents the mobile parallel scale (`--gutter-mobile`, `--section-pad-mobile`, `--max-width-mobile`, `--bp-narrow`) added to `tokens.css`, and the rule that this is a *third scale* alongside editorial (default) and dense — not an override of either. The breakpoint token is the single source of truth; consumers that mirror it in JS or in component-local CSS read `var(--bp-narrow)`.
>   - **components/topbar.html** rewritten to implement §8.2a + §8.3. New `{{META_ANCHOR}}` placeholder; `{{NAV_1}}` / `{{NAV_2}}` / `{{NAV_3}}` reduced to a single `{{NAV_LABEL}}` slot — multi-link nav on the topbar is not in scope for editorial surfaces (they have a footer for that).
>   - **components/footer.html** — flex-wrap behaviour confirmed; no markup change required for v0.7. Existing `gap: 20px; flex-wrap: wrap` on the meta-strip already reflows correctly under the new gutter.
>   - **No changes** to: typography scale, colour tokens, all data-surface rules (§7.x), §8.1 monogram, §8.2 Euler style.
> - **0.6** — Structural maturation pass. Three additions and one renumbering.
>   - **§1 — three voices.** Philosophy now names the three kinds of visual content that legitimately co-exist on a Schennikov surface: *brand signal* (decoration that looks like data), *data* (charts that are data), *hosted artefacts* (content authored elsewhere — generated images, embedded videos, quoted external surfaces). The DS regulates each voice differently; this is the frame for §3a and §7.1a *Containment*.
>   - **§3a — Hosted artefacts (new).** Names and bounds the case "a Schennikov surface hosts content whose visual language is foreign to the system." DS owns the wrapper (frame, caption, surface, adjacent typography); the artefact owns its interior. Required and forbidden behaviours enumerated. This legalises art-driven projects (generated imagery), client work whose imagery is dictated by external brand, and editorial figures quoting external dashboards or videos.
>   - **§7.6 — Axis-only chart (new, was open question from v0.5 §C-response).** Rules for sparkline-style and minimalist charts where there are no gridlines and the axis is the only visible armature. Axis steps up to `--ink-soft`; tick density and label rules diverge from §7.5.
>   - **§7 numbering rationalisation** (closes v0.5 known debt). The intra-§7 ordering now reads top-to-bottom in conceptual sequence, not in historical-append sequence. Mapping table:
>
>     | v0.5 § | v0.6 § | Title |
>     |---|---|---|
>     | 7.10 | 7.4 | Histograms — distribution contract |
>     | 7.11 | 7.5 | Axes & gridlines — the layering contract |
>     | (new) | 7.6 | Axis-only chart |
>     | 7.4 | 7.7 | Alerts / callouts |
>     | 7.5 | 7.8 | Status pills |
>     | 7.6 | 7.9 | Search input |
>     | 7.7 | 7.10 | Dense layout mode |
>     | 7.8 | 7.11 | Form controls, modals, skeletons |
>     | 7.9 | 7.12 | JS chart libraries |
>
>     Cross-references inside the document updated. Downstream consumers of the DS (notably `Hedgeinform/hedgedasbord` ARCHITECTURE.md OV3/OV4/OV5) must update inbound `§7.x` references when they pull v0.6.
>   - **Delivery layer: self-hosted fonts.** `arkadiy-ds/fonts/` now ships twelve woff2 files (Manrope 400/500/600/700, IBM Plex Mono 400/500, latin + cyrillic). `typography.css` carries the `@font-face` block with `font-display: swap` and metric-matched synthetic fallbacks (`Manrope Fallback`, `IBM Plex Mono Fallback`) so the swap is visually quiet — no layout shift at font-load. Google Fonts CDN is downgraded from primary install path to "prototypes only" with a CSP/GDPR caveat. This is a delivery-layer change, not a DS change — the type system itself is unchanged. Downstream consequence: `Hedgeinform/hedgedasbord` OV3 (Google Fonts) is no longer an override against DS; it can be retired and replaced with the standard self-hosted include.
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

**Three voices of visual content.** A Schennikov surface legitimately carries up to three distinct kinds of content, regulated differently:

1. **Brand signal** — FFT plots, Lissajous, ring, phase portraits, monogram, Euler. Decoration that *looks like* data but is not. Lives in margins, hero corners, section openers. Voice: warm coal, single accent. Governed by §3 rule 5.
2. **Data** — charts, tables, dashboards. Looks like data and *is* data. Lives in main content. Voice: warm coal with §7.1a polarity vocabulary on dense surfaces. Governed by §7.
3. **Hosted artefacts** — generated images, embedded videos, quoted external surfaces, third-party widgets, client-supplied imagery. Authored elsewhere; the DS does not regulate their interior. Voice: their own. Governed by §3a — DS owns the frame, the artefact owns the inside.

The discipline is to keep the three voices distinct. Brand signal does not pretend to be data; data does not pick up colour from hosted artefacts; hosted artefacts do not bleed past their frame.

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
| `--ink-faint`  | `#322a25`  | Genuinely-ghost only: watermarks, deprecated values, explicitly de-emphasised secondary axes. **Not** for tick labels (see §7.5). |
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

## 3a · Hosted artefacts

A Schennikov surface may host an artefact whose visual language is foreign to the system — a generated image, an embedded video, a third-party widget, a quoted dashboard from another product, client-supplied imagery the practice does not control. The DS does not regulate the *interior* of such an artefact; it regulates the **frame**: how the artefact is introduced, bounded, captioned, and referred to.

The principle: **DS owns the wrapper, the artefact owns its interior.** A loud image inside a quiet frame reads as a deliberate citation. A loud image with the page tinted to match it reads as a designer who has lost his nerve.

**Required.**

- The artefact sits in an explicit container — a `<figure>`, a `--bg-elev` card, a quoted block — bounded by a 1px `--rule` hairline or by negative space. Never bounded by a solid coloured fill.
- The frame is built from DS tokens only. Surface is `--bg` or `--bg-elev`; any text adjacent to the artefact (caption, fig number, alt label, source attribution) uses DS typography per §2 — `--font-mono` 11px uppercase for labels (`FIG. 03`, `SOURCE: …`), `--font-body` for captions, `--ink` / `--ink-soft` for text colour.
- The artefact does not bleed past its container. No edge-to-edge images that fight the page background, no overflow that escapes the figure's bounding box.
- The artefact is referenced from body text by its mono label (`see FIG. 03`), the same way an essay or paper cites a figure. This anchors the artefact as a *citation*, not as decoration.

**Forbidden.**

- ❌ The artefact's palette leaking into the surrounding chrome — no nav, button, link, accent, hairline, or focus ring picking up colour from the artefact, even if it would "look harmonious."
- ❌ The artefact replacing or shifting `--accent`. The single coral accent stays coral, regardless of what colours the artefact contains.
- ❌ Tinting the page or the figure surface to match the artefact ("wrap the image in its own dominant hue"). The page background stays `--bg`; the figure surface stays `--bg` or `--bg-elev`. No exceptions.
- ❌ Using the artefact's content as decoration outside the frame — no faded background versions, no cropped accent strips, no derivative colour washes.
- ❌ Stacking multiple hosted artefacts edge-to-edge with no DS frame between them. Each artefact gets its own bounded surface.

**Why this works.** The frame is what makes the artefact *legible* as content rather than as design. When the system is disciplined enough to host loud content without absorbing its language, the contrast itself becomes part of the composition: a tightly-controlled warm-coal surface acts as a gallery wall, and the hosted artefacts read as exhibits. This is the editorial logic of a museum catalogue, a scientific journal, an annotated record — the layout *is* the position.

**Use cases this legalises.**

- Art-driven projects whose generated imagery is necessarily loud (the spec for which the DS could never have been built — see §1 voice 3).
- Client work where the imagery is dictated by the client's brand and the practice does not control it; the DS-styled chrome (nav, footer, captions) frames the client material without absorbing it.
- Editorial articles citing an external dashboard, video, or screenshot as a figure (the case originally noted in §7.1a *Containment*; that paragraph remains and is now a specific instance of §3a).
- Embeddings (YouTube players, tweets, Figma frames, third-party widgets) that come with their own colour systems.

**Edge case — when the artefact *is* the page.** A surface dedicated entirely to displaying generated artefacts (a gallery view, a stream of generated images) may relax the "framed figure" rule and present the artefacts as a contact sheet — a regular grid bounded by the page gutter and `--rule` hairlines, captions per cell. The single-artefact frame rules apply per cell; the page chrome (topbar, footer, nav) remains DS-tokens-only.

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
| **Bin histogram** | all bars `--accent`, see §7.4 | Distribution of values into bins. Single-colour always — bins don't have states. (For the named exception where bins *do* carry mixed semantics, see §7.1a-2 *Asymmetric action histogram*.) |

**Threshold line** — 1px dashed `--accent`, drawn horizontally at the target value. Label goes in the legend row, not floating on the chart.

**Multi-series bars (grouped)** — use `seriesColors(n)` like line charts (coral 100/60/30%). If you need grouped bars *and* state colouring simultaneously, the chart wants to be two charts stacked.

### 7.4 Histograms — distribution contract

Histograms communicate **shape**, not individual values. The contract:

- **Bins are dense.** `gap` between bars ≤ 1px (or 0 for tight distributions). The eye should read a silhouette, not a row of separated bars.
- **All bars one colour** — `--accent`. Bins are not states. Never colour bins by polarity or severity — a histogram bar means "count in this range," nothing more.
- **Baseline.** A 1px `--ink-faint` line at the bottom anchors the distribution. No top frame, no side frames.
- **No per-bar labels.** Y-axis ticks (§7.5) carry the count scale; each-bar annotation defeats the silhouette read.
- **X-axis ticks every N bins**, where N is chosen so labels do not collide — typically every 5th or 10th bin. Ticks on the bin edges, not the bin centres.
- **Annotations** (mean, median, target) — 1px dashed `--accent` vertical line + mono uppercase label at the top of the chart area. Maximum two annotations per histogram.

Use `components/bar-chart.html` (histogram flavour) as the reference.

### 7.5 Axes & gridlines — the layering contract

Axes and gridlines coexist in every chart. They must read as a **layered hierarchy**, not as a tangle.

- **Relative weight.** Axis is **at least as heavy as** gridlines, never lighter. Equality is permitted *if both are quiet enough not to compete with the data* — on a tight, data-dense surface a 1px `--rule` axis over 1px `--rule` gridlines reads as a single quiet armature, and that is fine. The directional rule (axis ≥ gridline) is non-negotiable; the strict inequality is not.
- **Axis line.** 1px `--rule` is the dashboard default — quiet armature, lets data dominate. Step it up to 1px `--ink-soft` only when the chart is sparse, when there are no gridlines (axis-only chart), or when the axis must visibly anchor a small embedded chart. Never `--ink-faint` (that's the de-emphasis register, see §2).
- **Gridlines.** 1px `--rule` (= `--data-grid`). Horizontal only for line/bar/area charts. Vertical gridlines are reserved for histograms (§7.4) where the X axis is categorical-ordinal and counts are meaningful per bin edge.
- **No overlap.** A gridline never sits on top of an axis. If a tick value falls on the baseline, omit the gridline at that position — the axis already draws it.
- **Tick labels.** Mono 11px `--data-axis` (= `--ink-soft`, see §2). Sit *outside* the plot area, never overlapping the axis or any gridline. Y-axis labels right-aligned to the axis with 8px gap; X-axis labels centred on the tick, 6px below the baseline. Tick labels are information carriers, not chrome — they must be plainly readable.
- **No frame rectangle.** A box around the plot adds two redundant axes. The plot is bounded by data, axis, and whitespace — not by a fourth-wall border.

If a chart library default violates this contract, override the styles via `tokens.js`. Do not work around the contract by relabelling "axis" and "gridline" — the visual roles are what matters.

### 7.6 Axis-only chart

A chart with **no gridlines** — sparkline, embedded inline-chart, dense small-multiples grid, mini-trend in a table cell. Gridlines are absent because the chart is too small for them to read, or because the surrounding text already carries the coordinate context. The axis becomes the chart's only visible armature, and the rules from §7.5 shift accordingly.

- **Axis line.** Step up from the §7.5 default. Use 1px `--ink-soft`, never `--rule` — without gridlines, an `--rule`-weight axis vanishes and the chart appears to float without a baseline. The axis must visibly anchor the data.
- **Axis presence.** Single horizontal baseline minimum. A vertical axis is included only when scale matters (most sparklines have no Y axis at all — the shape carries the read).
- **Tick labels.** Sparser than §7.5: typically just min and max on each axis, or first and last data points. Mono 11px `--data-axis`. If the chart is small enough that even two labels collide, omit them entirely and rely on a mono caption underneath the chart (`30D · 0.42–0.91`).
- **Endpoints.** A 3px filled dot in `--accent` at the latest data point, when the chart's purpose is "what is the current value." Otherwise no point markers — the line is enough.
- **Annotations.** Forbidden. If a sparkline needs an annotation, it has outgrown the format and wants to be a §7.3 chart.
- **Spacing around.** A sparkline is text-grade content — vertical-align with the surrounding line height, no captions floating above. If captioned, mono 11px `--ink-soft` directly underneath, no gap above the chart.

**When to use vs §7.3 / §7.5.** If the chart is bigger than ~120×40 px, or carries more than one series, or asks the reader to compare specific values across the X axis, it wants gridlines and §7.5 applies. Axis-only is for the case where the chart is a *glyph* — read at a glance, anchored by a baseline, used in-line with text or in a dense grid.

**Reference.** Embedded inline charts in `webapp/src/blocks/` operate in this regime; `components/chart-helpers.html` will gain a sparkline example in v0.6.

### 7.7 Alerts / callouts

Three severities share one layout: `[mono severity label] [body message] [optional action →]`. No icons. No rounded-card-with-left-border accent (that's the antipattern). Horizontal hairlines top and bottom.

- **OK / WARN** — no surface tint. Just the label colour + message.
- **CRIT** — `--accent-soft` as background. This is the only place in the system where a tinted surface carries semantic weight. Use sparingly; if every alert is CRIT, none are.

See `components/alert.html`.

### 7.8 Status pills

Inline marker — 6px dot + mono uppercase label, colour from severity token. No filled background, no rounded rectangle. Used inside table cells, card headers, service lists. See `components/status-pill.html`.

### 7.9 Search input

No magnifier icon (iconography is outside the DS voice). Use a mono `/` prefix inside the field — a Vim/Slack-style signal that reads as "search" without decoration. Underline becomes `--accent` on focus. Optional `⌘K` hint in a bordered `<kbd>` on the right. See `components/search-input.html`.

### 7.10 Dense layout mode

The editorial scale (`--gutter: 64px` / `--section-pad: 96px` / `--max-width: 1320px`) is too airy for dashboards. Dense mode is a **parallel** scale — activate with `<body class="dense">` or apply the dense tokens to a specific container. Do not redefine the editorial tokens locally.

| Token                | Dense value |
|----------------------|-------------|
| `--gutter-dense`     | `24px`      |
| `--section-pad-dense`| `32px`      |
| `--stack-dense-*`    | `4 / 8 / 14 / 24 px` |
| `--max-width-dense`  | `none` — dashboards run full-viewport. |

Grid: prefer `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))` with `gap: var(--gutter-dense)`. A formal 12-column is overkill for most dashboard compositions; minmax lets cards reflow honestly.

### 7.11 Form controls, modals, skeletons

Deferred to project-level until a real need arises. When you build them, follow the same principles: hairlines over fills, mono for labels, body for inputs, `--accent` only on focus/active. Modals are explicitly **not** in the DS — their behaviour varies too much across product contexts (side sheet vs centered vs full-bleed). Design per-project.

### 7.12 JS chart libraries

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
- **Left — Personal monogram** (geometric AS line-art mark, §8.1). Signature of the operator.

**Default state:** both present. The pair reads as "practice + author" — the work happens inside Arkadiy's practice and was assembled by Arkadiy specifically.

**Optional exclusions.** Any project may, at its discretion:

- omit the monogram — Euler alone, the classical branded surface;
- omit the Euler — monogram alone, a light or anonymous tool;
- omit both — chrome-free utility surface.

DS does not prescribe which combination a given surface must use — that's a project-level decision based on context. DS describes the **elements**, not their **mandatory presence**. (This mirrors the §7.1a principle: the system supplies a vocabulary; projects choose which words to use.)

If in doubt, default to both. Removing chrome is an editorial choice, not a default.

### 8.1 Monogram — style rules

The monogram is a **geometric line-art SVG** shipped at `arkadiy-ds/monogram.svg`. Source: `brand/monogram.svg` (canonical, identical content).

- 28×28 viewBox, two stroked paths — A as triangle + crossbar, S as a single bezier ribbon.
- `stroke: currentColor`, `stroke-width: 1.4`, `fill: none`. Color comes from the consuming context (`var(--accent)` on dark surfaces, `var(--ink)` on tinted ones).
- Baked-in **`skewX(-8°)`** on the inner `<g>` — rhymes with the italic Euler wordmark. The skew is part of the asset; do not stack a second transform on top.
- **Embed inline as `<svg>`**, not via `<img src="monogram.svg">`. `<img>`-loaded SVGs render in an isolated context and `currentColor` will fall back to black on every dark surface.
- Sits in the **left** topbar slot, before the project name, separated by `·` in `--ink-faint`.
- **Sizes:** 14px (meta line), 22px (topbar — default), 36px (section header), 84px (hero / favicon source). Never larger than ≈ 88px (becomes a logo).
- Never in the center slot (that's Euler's place; if Euler is omitted, the centre stays empty).
- Never duplicated within a single page.
- Never on `--accent-soft` surface (the tinted background eats the stroke at small sizes — ink at small sizes if you must).

Reference: `components/monogram.html` (drop-in snippet at the topbar default size).

### 8.2 Euler — style rules

- Manrope italic display, 17px, color `--accent`.
- Center slot of the sticky topbar, vertically centred.
- Never decorated (no underline, no box, no shadow, no animation).
- Never replaced by initials, a graphic logo, or a photo.
- Never moved to the footer or to a side rail.
- Renders as `eⁱπ + 1 = 0` with the `iπ` set as a superscript on `e`.

Reference: `components/topbar.html`.

### 8.2a Euler — reflow on narrow viewports

Below `--bp-narrow` (640px), the Euler wordmark migrates out of the active
row's centre slot into the **right slot of an epigraph row** that sits
above the active row. Two things change:

- **Position** — centre of the active row → right of an epigraph row.
- **Size** — 17px → 11px (in mono-cased context, sits next to the meta-anchor).

What does **not** change:

- It is still present. The wordmark is never hidden on a Schennikov surface.
- It is still `--accent`, still Manrope italic, still rendered as
  `eⁱπ + 1 = 0` with `iπ` superscripted.
- It is still the wordmark of the practice in the §8.2 sense — the size
  reduction is a register change (running head ↔ display), not a status
  change.

**Why right rather than centre.** A two-row narrow topbar with Euler at
the centre of the epigraph row collides visually with the centre of the
active row below it — the eye reads two centred elements as a stacked
title, which Euler is not. Right-aligning Euler in the epigraph
preserves its compositional independence from the active row's monogram
and from the page title beneath the topbar.

**Compact fallback.** If the epigraph is suppressed (§8.3), Euler returns
to the active row in the centre slot at a compact size (15px). This is
the only condition under which Euler appears at less than 17px in the
active row.

### 8.3 Editorial eyebrow slot

The epigraph row's **left slot** carries the page's meta-anchor — the
identifier by which the page is referred to in the body of the practice:

- `fig. 2026·116` — for dated, numbered editorial artefacts (e.g. one fish per day).
- `note 037` — for serial notes / essay numbers.
- `§04` — for chaptered long-form.
- a date (`2026·04·25`) — for dated entries without a serial number.

The rule: **if the surface publishes, it carries an anchor; if it
operates, it does not use this topbar component.** The two cases:

| Surface kind | Has anchor? | Topbar epigraph |
|---|---|---|
| Editorial (publication) | yes | epigraph present, anchor + Euler |
| Editorial (no anchor — landing, contact) | no | epigraph suppressed, Euler centred compact |
| Dense (dashboard, CRM, form) | n/a | does not use this topbar at all (see §7.10) |

The component implements this with a `:has()` selector — if
`.meta-anchor` is empty, the epigraph row collapses and the active row
re-grids to centre Euler. Consumers can therefore leave the
`{{META_ANCHOR}}` slot empty without conditional rendering.

---

## 10 · Responsive scale

Three parallel scales coexist in this DS, and they correspond to three
kinds of work:

| Scale | Activated by | For |
|---|---|---|
| **Editorial** (default) | unspecified | publication, lead pages, essays, archives — read on a desktop, in print, in a quiet window |
| **Dense** | `<body class="dense">` | dashboards, monitoring, admin — operated, not read |
| **Mobile** | `@media (max-width: var(--bp-narrow))` | editorial surfaces viewed on a phone |

**Mobile is editorial relaxed by one notch — not editorial collapsed
into dense.** The relations between elements stay editorial (hairline
rules, generous line-height, Manrope body, mono meta), but absolute
spacings shrink: `--gutter` 64 → 20, `--section-pad` 96 → 56, `--max-width`
drops the 1320px cap, the largest two stack tokens shrink one step.
Smaller stacks are unchanged because they already read correctly at
narrow widths.

**The breakpoint is `--bp-narrow` (640px), not 768.** Empirical: the
editorial topbar's `1fr auto 1fr` grid stops fitting Russian uppercase
tagline + Euler + nav at ~640. Consumers that mirror the breakpoint in
JS or in component-local CSS read `var(--bp-narrow)` rather than
hard-coding 640. Single source of truth, single place to retune.

**Components affected by the mobile scale:**

- `topbar.html` — reflows to two-row epigraph layout (§8.2a, §8.3).
- `footer.html` — no markup change; existing `flex-wrap: wrap` reflows
  the four-column grid to a stack at narrow widths.
- All editorial typographic classes (`.display-xl`, `.lede`, `.body`,
  `.meta`) — already use `clamp()` or fixed sizes that read at 320px+;
  no per-class mobile overrides needed.
- Data-surface components (charts, tables, callouts, status pills,
  filter pills) — **out of scope for v0.7**. Data surfaces remain dense
  regardless of viewport (you do not read a dashboard on a phone; if you
  must, the surface owns its own narrow-viewport behaviour and is
  governed by §7.10, not by this section).

**Anti-pattern.** Do not introduce intermediate breakpoints
(`--bp-tablet`, etc.) without naming a third scale. The DS has three
scales, not three breakpoints — every breakpoint must correspond to a
named typographic register, otherwise the system fragments into ad-hoc
media queries with no semantics.

---

## 9 · Theme persistence

`localStorage['theme']` is canon. `prefers-color-scheme` is consulted **only on first visit** as a fallback — once the user toggles, their choice wins forever. This is what `components/topbar.html` already implements.
