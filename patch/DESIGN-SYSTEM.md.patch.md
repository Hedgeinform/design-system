# DESIGN-SYSTEM.md — v0.7 patch

The following changes apply to `arkadiy-ds/DESIGN-SYSTEM.md`. This file is
the **patch description**, not a replacement. Three insertions and one
header bump.

---

## 1. Header — version bump

Replace the existing header line:

```diff
- **Version:** 0.6 · 2026-04-25
+ **Version:** 0.7 · 2026-04-26
```

## 2. Changelog — prepend entry

Prepend the following entry above the existing `> - **0.6** —` line:

```markdown
> - **0.7** — Mobile-pass for editorial surfaces. Three additions, one extension.
>   - **§8.2a — Euler reflow on narrow viewports (new).** Below `--bp-narrow` (640px), the Euler wordmark migrates from the active-row centre slot to the right slot of an epigraph row at reduced size. The wordmark stays continuously present, but its role shifts — on desktop it is the central marque of the chrome; on mobile it is the running head of the page. Both readings preserve the §8.2 principle ("the standard this practice is held to"); only the typographic register changes.
>   - **§8.3 — Editorial eyebrow slot, meta-anchor (new).** The mobile epigraph row has a left slot reserved for the page's meta-anchor (`fig.`, `note`, `§NN`, issue number, date). If the consuming surface has no such anchor, the epigraph row is suppressed entirely and Euler falls back to a compact-mode centre placement in the active row. Editorial surfaces that publish — lead pages, essays, archive cards, dated artefacts — should populate this slot. Surfaces that operate (dashboards, forms) do not use this topbar component at all; they belong to dense mode (§7.10) and a separate chrome compoent — out of scope for v0.7, scheduled for v0.8.
>   - **§10 — Responsive scale (new).** Documents the mobile parallel scale (`--gutter-mobile`, `--section-pad-mobile`, `--max-width-mobile`, `--bp-narrow`) added to `tokens.css`, and the rule that this is a *third scale* alongside editorial (default) and dense — not an override of either. The breakpoint token is the single source of truth; consumers that mirror it in JS or in component-local CSS read `var(--bp-narrow)`.
>   - **components/topbar.html** rewritten to implement §8.2a + §8.3. New `{{META_ANCHOR}}` placeholder; `{{NAV_1}}` / `{{NAV_2}}` / `{{NAV_3}}` reduced to a single `{{NAV_LABEL}}` slot — multi-link nav on the topbar is not in scope for editorial surfaces (they have a footer for that).
>   - **components/footer.html** — flex-wrap behaviour confirmed; no markup change required for v0.7. Existing `gap: 20px; flex-wrap: wrap` on the meta-strip already reflows correctly under the new gutter.
>   - **No changes** to: typography scale, colour tokens, all data-surface rules (§7.x), §8.1 monogram, §8.2 Euler style.
```

## 3. §8 — extend with §8.2a and §8.3

After the existing `### 8.2 Euler — style rules` block (line ~456 onwards),
insert two new subsections:

```markdown
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
```

## 4. New top-level §10 — Responsive scale

Insert before `## 9 · Theme persistence`, renumbering the existing §9 to §11
(or insert as §10 between 9 and the document end — whichever sequence the
maintainer prefers; current draft assumes the latter).

```markdown
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
```

---

## Notes

- The `--bp-narrow` token is referenced from `tokens.css` (§10) and from
  `topbar.html`'s media query. The two must stay in sync; the canonical
  number lives in `tokens.css`.
- The `:has()` selector in the topbar fallback rule (§8.3) is supported
  in all evergreen browsers as of 2024; the only fallback risk is older
  Safari iOS, which is unlikely on a current viewing device. If the
  fallback fails (older browser, no `:has()` support), the epigraph
  remains visible with an empty left slot — degraded but not broken.
