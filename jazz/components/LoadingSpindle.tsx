'use client';

// Small spinning-vinyl loader matching the lp.09 / shed-log aesthetic.
// `size` controls the SVG height in px; `label` is the optional caption.
export function LoadingSpindle({
  size = 84,
  label = 'spinning up…',
}: {
  size?: number;
  label?: string | null;
}) {
  return (
    <div className="spindle" style={{ ['--spindle-size' as string]: `${size}px` }}>
      <svg className="spindle-svg" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <radialGradient id="spindle-shine" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="40%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>
        <g className="spindle-disc">
          <circle cx={32} cy={32} r={30} className="spindle-vinyl" />
          <circle cx={32} cy={32} r={28} className="spindle-groove" fill="none" />
          <circle cx={32} cy={32} r={24} className="spindle-groove" fill="none" />
          <circle cx={32} cy={32} r={20} className="spindle-groove" fill="none" />
          <circle cx={32} cy={32} r={14} className="spindle-label" />
          <circle cx={32} cy={32} r={2.2} className="spindle-hole" />
          <circle cx={32} cy={32} r={30} fill="url(#spindle-shine)" />
          {/* the tick at 12 o'clock makes spinning legible */}
          <line x1={32} y1={20} x2={32} y2={14} className="spindle-tick" />
        </g>
      </svg>
      {label && <div className="spindle-label-text">{label}</div>}
    </div>
  );
}
