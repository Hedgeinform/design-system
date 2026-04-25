/* =============================================================
   arkadiy-ds / tokens.js
   Runtime helper for reading CSS custom properties in JS.
   Use this to feed chart libraries (Recharts, Chart.js, D3, etc.)
   values from tokens.css so dark/light toggles stay in sync.

   Usage:
     import { getToken, getTokens, onThemeChange } from './arkadiy-ds/tokens.js';
     const accent = getToken('--accent');           // "#f5936a" (dark) or "#c2451e" (light)
     const T = getTokens();                         // full bundle, see below
     onThemeChange((theme, tokens) => { ... });     // re-render charts on toggle
   ============================================================= */

/**
 * Read a single CSS custom property from :root.
 * @param {string} name — e.g. "--accent"
 * @returns {string} — trimmed value, or "" if unset
 */
export function getToken(name) {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Read the full token bundle most chart code needs.
 * Grouped for ergonomic destructuring.
 */
export function getTokens() {
  return {
    // Surface
    bg:        getToken('--bg'),
    bgElev:    getToken('--bg-elev'),
    accentSoft:getToken('--accent-soft'),

    // Text
    ink:       getToken('--ink'),
    inkSoft:   getToken('--ink-soft'),
    inkFaint:  getToken('--ink-faint'),

    // Structure
    rule:      getToken('--rule'),
    accent:    getToken('--accent'),

    // Data semantic
    stateOk:   getToken('--state-ok'),
    stateWarn: getToken('--state-warn'),
    stateCrit: getToken('--state-crit'),
    statePositive: getToken('--state-positive'),
    positive:  getToken('--positive'),
    positiveSoft: getToken('--positive-soft'),
    dataGrid:  getToken('--data-grid'),
    dataAxis:  getToken('--data-axis'),
    dataLabel: getToken('--data-label'),

    // Typography
    fontDisplay: getToken('--font-display'),
    fontBody:    getToken('--font-body'),
    fontMono:    getToken('--font-mono'),
  };
}

/**
 * Compute the coral-opacity ladder for multi-series charts.
 * Rule: one series = 100%. Two = 100/60. Three = 100/60/30.
 * If you need more than 3, the chart wants to be two charts.
 * @param {number} n — number of series (1..3)
 * @returns {string[]} — rgba strings, n items long
 */
export function seriesColors(n) {
  if (n < 1) return [];
  if (n > 3) {
    console.warn('[arkadiy-ds] seriesColors: >3 series — consider splitting into two charts.');
  }
  const accent = getToken('--accent');
  const opacities = n === 1 ? [1] : n === 2 ? [1, 0.6] : [1, 0.6, 0.3];
  return opacities.slice(0, n).map(op => `rgb(from ${accent} r g b / ${op})`);
}

/**
 * Subscribe to theme changes — re-reads tokens and calls your callback.
 * Observes the `data-theme` attribute on <html>.
 *
 * @param {(theme: string, tokens: object) => void} cb
 * @returns {() => void} — unsubscribe
 */
export function onThemeChange(cb) {
  if (typeof window === 'undefined') return () => {};
  const fire = () => cb(
    document.documentElement.getAttribute('data-theme') || 'dark',
    getTokens()
  );
  const obs = new MutationObserver(fire);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  // Fire once on subscribe so the consumer gets initial state.
  queueMicrotask(fire);
  return () => obs.disconnect();
}
