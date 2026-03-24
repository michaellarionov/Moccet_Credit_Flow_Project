import { useState, useEffect } from 'react'
import BalanceRing from './components/BalanceRing'
import UsageChart from './components/UsageChart'
import BreakdownBar from './components/BreakdownBar'
import RecentQueries from './components/RecentQueries'
import PurchaseFlow from './components/PurchaseFlow'
import UsageNudge from './components/UsageNudge'
import { monthlyAllocation, totalConsumed, initialBalance } from './mockData'

const NUDGE_THRESHOLDS = [75, 90, 95, 100]

function getActiveThreshold(balance, allocation) {
  const pct = ((allocation - balance) / allocation) * 100
  if (pct >= 100) return 100
  if (pct >= 95) return 95
  if (pct >= 90) return 90
  if (pct >= 75) return 75
  return null
}

function Section({ children, style }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e4e4e7',
      borderRadius: 12,
      padding: '20px 20px',
      ...style,
    }}>
      {children}
    </div>
  )
}

export default function App() {
  const [balance, setBalance] = useState(Math.max(0, initialBalance))
  const [view, setView] = useState('dashboard') // 'dashboard' | 'purchase'
  const [dismissedNudges, setDismissedNudges] = useState(new Set())

  const threshold = getActiveThreshold(balance, monthlyAllocation)
  const showNudge = threshold !== null && !dismissedNudges.has(threshold)

  function handlePurchase(credits) {
    setBalance(b => Math.max(0, b + credits))
    setView('dashboard')
    // Clear dismissed nudges since balance changed
    setDismissedNudges(new Set())
  }

  function dismissNudge(t) {
    setDismissedNudges(d => new Set([...d, t]))
  }

  // Compute projection
  const avgDailyBurn = totalConsumed / 30
  const daysLeft = avgDailyBurn > 0 ? Math.floor(Math.max(0, balance) / avgDailyBurn) : 999
  const depletionDate = new Date('2026-03-23')
  depletionDate.setDate(depletionDate.getDate() + daysLeft)
  const depletionLabel = depletionDate.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric',
  })

  const pctUsed = ((monthlyAllocation - balance) / monthlyAllocation) * 100

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: '#fafafa',
      minHeight: '100vh',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* Top bar */}
      <div style={{
        maxWidth: 520,
        margin: '0 auto',
        padding: '0 16px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 0 0',
          marginBottom: 20,
        }}>
          <span style={{
            fontSize: 15,
            fontWeight: 600,
            color: '#18181b',
            letterSpacing: '-0.01em',
          }}>
            moccet
          </span>

          <div style={{ display: 'flex', gap: 6 }}>
            {['dashboard', 'purchase'].map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 99,
                  border: view === v ? '1.5px solid #18181b' : '1px solid #e4e4e7',
                  background: view === v ? '#18181b' : '#fff',
                  color: view === v ? '#fff' : '#71717a',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {v === 'dashboard' ? 'Credits' : 'Add credits'}
              </button>
            ))}
          </div>
        </div>

        {/* Inline nudge (below chat, above content) */}
        {showNudge && (
          <UsageNudge
            threshold={threshold}
            onDismiss={() => dismissNudge(threshold)}
            onPurchase={() => setView('purchase')}
          />
        )}

        <div style={{ height: 16 }} />

        {view === 'dashboard' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 40 }}>

            {/* Balance + projection */}
            <Section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <BalanceRing balance={balance} total={monthlyAllocation} />
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ fontSize: 22, fontWeight: 600, color: '#18181b', letterSpacing: '-0.02em' }}>
                    {balance.toLocaleString()}
                    <span style={{ fontSize: 14, fontWeight: 400, color: '#a1a1aa', marginLeft: 6 }}>
                      / {monthlyAllocation.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: '#71717a', marginTop: 4 }}>
                    {totalConsumed} credits used this month
                  </div>

                  {/* Mini progress bar */}
                  <div style={{
                    marginTop: 12,
                    height: 4,
                    borderRadius: 99,
                    background: '#f4f4f5',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min(100, pctUsed)}%`,
                      background: pctUsed > 95 ? '#ef4444' : pctUsed > 75 ? '#d97706' : '#18181b',
                      borderRadius: 99,
                      transition: 'width 0.5s ease, background 0.3s',
                    }} />
                  </div>

                  <div style={{ fontSize: 12, color: '#71717a', marginTop: 10 }}>
                    {balance > 0 ? (
                      <>At this pace, credits last until <strong style={{ color: '#18181b' }}>{depletionLabel}</strong> <span style={{ color: '#a1a1aa' }}>({daysLeft} day{daysLeft !== 1 ? 's' : ''})</span></>
                    ) : (
                      <span style={{ color: '#ef4444' }}>No credits remaining</span>
                    )}
                  </div>
                </div>
              </div>
            </Section>

            {/* Usage chart */}
            <Section>
              <UsageChart />
            </Section>

            {/* Breakdown */}
            <Section>
              <BreakdownBar />
            </Section>

            {/* Recent queries */}
            <Section>
              <RecentQueries />
            </Section>
          </div>
        ) : (
          <div style={{ paddingBottom: 40 }}>
            <Section>
              <PurchaseFlow onPurchase={handlePurchase} />
            </Section>
          </div>
        )}
      </div>
    </div>
  )
}
