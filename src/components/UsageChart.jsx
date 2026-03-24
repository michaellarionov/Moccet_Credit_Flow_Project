import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import { usageHistory } from '../mockData'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e4e4e7',
      borderRadius: 8,
      padding: '8px 12px',
      fontSize: 13,
      color: '#18181b',
    }}>
      <div style={{ fontWeight: 500 }}>{payload[0].payload.label}</div>
      <div style={{ color: '#71717a', marginTop: 2 }}>{payload[0].value} credits</div>
    </div>
  )
}

export default function UsageChart() {
  // Show every 5th label to avoid crowding
  const data = usageHistory.map((d, i) => ({
    ...d,
    displayLabel: i % 5 === 0 ? d.label : '',
  }))

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 500, color: '#18181b', marginBottom: 12 }}>
        Daily usage — last 30 days
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#18181b" stopOpacity={0.08} />
              <stop offset="95%" stopColor="#18181b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#f4f4f5" vertical={false} />
          <XAxis
            dataKey="displayLabel"
            tick={{ fontSize: 11, fill: '#a1a1aa' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#a1a1aa' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e4e4e7' }} />
          <Area
            type="monotone"
            dataKey="credits"
            stroke="#18181b"
            strokeWidth={1.5}
            fill="url(#areaGrad)"
            dot={false}
            activeDot={{ r: 3, fill: '#18181b', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
