export default function BalanceRing({ balance, total }) {
  const pct = Math.max(0, Math.min(1, balance / total))
  const size = 140
  const stroke = 9
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = circ * pct
  const gap = circ - dash

  // Color based on remaining
  const color = pct > 0.5 ? '#18181b' : pct > 0.25 ? '#d97706' : '#ef4444'

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#e4e4e7"
          strokeWidth={stroke}
        />
        {/* Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${gap}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.6s ease, stroke 0.4s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 1,
      }}>
        <span style={{ fontSize: 26, fontWeight: 600, color: '#18181b', lineHeight: 1 }}>
          {balance.toLocaleString()}
        </span>
        <span style={{ fontSize: 11, color: '#71717a', letterSpacing: '0.03em' }}>credits left</span>
      </div>
    </div>
  )
}
