import { recentQueries } from '../mockData'

const TYPE_LABELS = {
  simple: 'Simple',
  standard: 'Standard',
  complex: 'Complex',
  action: 'Action',
}

export default function RecentQueries() {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 500, color: '#18181b', marginBottom: 10 }}>
        Recent queries
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {recentQueries.map((q, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 12,
              padding: '10px 0',
              borderBottom: i < recentQueries.length - 1 ? '1px solid #f4f4f5' : 'none',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 13,
                color: '#18181b',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {q.prompt}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 3 }}>
                <span style={{
                  fontSize: 11,
                  color: '#a1a1aa',
                  background: '#f4f4f5',
                  padding: '1px 6px',
                  borderRadius: 4,
                }}>
                  {TYPE_LABELS[q.type]}
                </span>
                <span style={{ fontSize: 11, color: '#a1a1aa' }}>{q.date}</span>
              </div>
            </div>
            <div style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#18181b',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              −{q.cost} cr
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
