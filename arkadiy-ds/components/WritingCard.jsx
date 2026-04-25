// =============================================================
// arkadiy-ds / components / WritingCard.jsx
// Index-table row for essays + newsletter items.
// =============================================================

function WritingIndexRow({ num, title, sub, kind = 'Essay', source = 'site', date }) {
  const isEssay = kind === 'Essay';
  return (
    <a style={{
      display: 'grid', gridTemplateColumns: '80px 1fr 120px 120px',
      padding: '28px 0',
      borderBottom: '1px solid var(--rule)',
      textDecoration: 'none', cursor: 'pointer',
      alignItems: 'baseline',
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-faint)', letterSpacing: 0.4 }}>
        {String(num).padStart(3, '0')}
      </span>
      <div>
        <div className={isEssay ? 'display-sm' : ''} style={{
          fontFamily: 'var(--font-display)',
          fontSize: isEssay ? 22 : 16,
          fontWeight: isEssay ? 'var(--display-weight)' : 500,
          letterSpacing: -0.3, lineHeight: 1.25,
          color: 'var(--ink)', marginBottom: sub ? 8 : 0, maxWidth: '48ch',
        }}>{title}</div>
        {sub && <div className="body" style={{ fontSize: 14, lineHeight: 1.5, maxWidth: '56ch' }}>{sub}</div>}
      </div>
      <span className="meta" style={{ color: isEssay ? 'var(--accent)' : 'var(--ink-soft)' }}>{kind}</span>
      <span className="meta" style={{ textAlign: 'right' }}>{source} · {date}</span>
    </a>
  );
}

function WritingIndexHeader() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '80px 1fr 120px 120px',
      padding: '14px 0',
      fontFamily: 'var(--font-mono)', fontSize: 10.5,
      color: 'var(--ink-faint)',
      letterSpacing: 0.6, textTransform: 'uppercase',
      borderBottom: '1px solid var(--rule)',
      borderTop: '2px solid var(--ink)',
    }}>
      <span>№</span><span>Title</span><span>Kind</span>
      <span style={{ textAlign: 'right' }}>Where · when</span>
    </div>
  );
}

if (typeof window !== 'undefined') Object.assign(window, { WritingIndexRow, WritingIndexHeader });
