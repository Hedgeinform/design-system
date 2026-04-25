// =============================================================
// arkadiy-ds / components / Hero.jsx
// Hero pattern — eyebrow + tagline + lede + CTA row + decoration.
// Replace placeholder strings with project copy.
// Requires tokens.css + typography.css.
// Decoration is optional — pass decoration={null} to remove.
// Available decorations: 'spectral' | 'lissajous' | 'phase' | 'ring' | null.
// =============================================================

function Hero({
  eyebrow = 'EYEBROW — e.g. "Independent practice"',
  taglineParts = [
    { text: 'Headline phrase with ' },
    { text: 'accent word', accent: true },
    { text: ' in the middle.' },
  ],
  lede = 'One-paragraph lede. 2–3 sentences, under ~52ch wide. Tone: plain, specific, no marketing hedging.',
  primaryCTA = { label: 'Work with me', href: '#work' },
  secondaryCTA = { label: 'Read writing', href: '#writing' },
  decoration = 'spectral',
}) {
  return (
    <section className="ads-hero" style={{ borderTop: 0, padding: 'calc(var(--section-pad) * 0.6) 0 var(--section-pad)' }}>
      <div className="container" style={{ position: 'relative' }}>

        {/* Eyebrow: §01 — rule — label */}
        <div className="eyebrow-row" style={{ marginBottom: 28 }}>
          <span className="num">§01</span>
          <span className="rule" />
          <span>{eyebrow}</span>
        </div>

        {/* Tagline — the typographic hero */}
        <h1 className="display-xl" style={{ marginBottom: 28 }}>
          {taglineParts.map((part, i) =>
            part.accent ? <span key={i} className="accent">{part.text}</span> :
            part.italic ? <em key={i}>{part.text}</em> :
            <span key={i}>{part.text}</span>
          )}
        </h1>

        {/* Lede */}
        <p className="lede" style={{ marginBottom: 40 }}>{lede}</p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <a className="btn-primary" href={primaryCTA.href}>
            {primaryCTA.label}
            <span style={{ fontFamily: 'var(--font-mono)' }}>→</span>
          </a>
          <a className="btn-secondary" href={secondaryCTA.href}>
            {secondaryCTA.label}
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-soft)' }}>→</span>
          </a>
        </div>

        {/* Optional decoration — bottom-right, viewport-guarded */}
        {decoration && <HeroDecoration flavor={decoration} />}
      </div>
    </section>
  );
}

// ---- Decoration ---------------------------------------------------
// Each flavor is a small SVG plot — spectral FFT, Lissajous curve,
// phase-portrait, polar ring. These are BRAND DECORATIONS, not charts —
// they communicate technical voice without pretending to be data.
// See hero-variant.jsx in the reference project for full implementations.
// ------------------------------------------------------------------
function HeroDecoration({ flavor = 'spectral' }) {
  const wrap = {
    position: 'absolute',
    right: 48, bottom: -40,
    width: 300, height: 120,
    pointerEvents: 'none',
    opacity: 0.9,
  };
  if (flavor === 'spectral') return <div style={wrap}><SpectralDecoration /></div>;
  // Other flavors: copy the relevant function from hero-variant.jsx.
  return null;
}

// Minimal spectral FFT-style bar chart. Deterministic, formant-shaped.
function SpectralDecoration() {
  const w = 300, h = 120, baseY = h - 14, bars = 48;
  const bw = (w - 10) / bars;
  const vals = [];
  for (let i = 0; i < bars; i++) {
    const f = i / bars;
    const a = Math.exp(-Math.pow((f - 0.18) * 6, 2));
    const b = Math.exp(-Math.pow((f - 0.45) * 8, 2)) * 0.7;
    const c = Math.exp(-Math.pow((f - 0.72) * 10, 2)) * 0.4;
    const n = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    vals.push(Math.max(0.04, a + b + c + Math.abs(n) * 0.15 - 0.05));
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
      <text x="5" y="12" style={{
        fontFamily: 'var(--font-mono)', fontSize: 10,
        fill: 'var(--ink-soft)', letterSpacing: 0.4, textTransform: 'uppercase',
      }}>FFT · 0 → 24 kHz</text>
      <line x1="5" x2={w - 5} y1={baseY} y2={baseY} stroke="var(--rule)" strokeWidth="0.5" />
      {vals.map((v, i) => (
        <rect key={i} x={5 + i * bw + 0.5} y={baseY - v * 78}
          width={bw - 1} height={v * 78}
          fill="var(--accent)" opacity={0.3 + v * 0.7} />
      ))}
    </svg>
  );
}

if (typeof window !== 'undefined') Object.assign(window, { Hero });
