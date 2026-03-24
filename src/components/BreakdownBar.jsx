import { usageBreakdown, totalConsumed } from '../mockData'

const TYPE_COLORS = {
  simple: '#18181b',
  standard: '#52525b',
  complex: '#a1a1aa',
  action: '#d4d4d8',
}

export default function BreakdownBar() {
  const entries = Object.entries(usageBreakdown)
  const total = totalConsumed || 1

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 500, color: '#18181b', marginBottom: 10 }}>
        Usage by query type
      </div>

      {/* Stacked bar */}
      <div style={{
        display: 'flex',
        height: 6,
        borderRadius: 99,
        overflow: 'hidden',
        gap: 1,
        marginBottom: 14,
      }}>
        {entries.map(([type, data]) => (
          <div
            key={type}
            style={{
              flex: data.credits / total,
              background: TYPE_COLORS[type],
              transition: 'flex 0.5s ease',
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {entries.map(([type, data]) => (
          <div key={type} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 8, height: 8, borderRadius: 2,
                background: TYPE_COLORS[type], flexShrink: 0,
              }} />
              <span style={{ fontSize: 13, color: '#3f3f46' }}>
                {data.label}
              </span>
              <span style={{ fontSize: 12, color: '#a1a1aa' }}>
                {data.costLabel}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 12, color: '#71717a' }}>{data.count} queries</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#18181b', minWidth: 50, textAlign: 'right' }}>
                {data.credits} cr
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
