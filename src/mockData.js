// Generate 30 days of realistic usage history
function generateUsageHistory() {
  const days = []
  const today = new Date('2026-03-23')
  const queryTypes = ['simple', 'standard', 'complex', 'action']
  const costs = { simple: 1, standard: 3, complex: 12, action: 7 }

  // Simulate a user who is fairly active Mon-Fri, lighter on weekends
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    // Base query counts per day
    const baseQueries = isWeekend ? 3 : 9
    const variance = Math.floor(Math.random() * 5) - 2
    const totalQueries = Math.max(1, baseQueries + variance)

    const queries = []
    let dayCredits = 0

    for (let q = 0; q < totalQueries; q++) {
      // Weighted distribution: mostly simple+standard, some complex, fewer action
      const rand = Math.random()
      let type
      if (rand < 0.35) type = 'simple'
      else if (rand < 0.65) type = 'standard'
      else if (rand < 0.85) type = 'complex'
      else type = 'action'

      const cost = type === 'complex'
        ? Math.floor(Math.random() * 8) + 8  // 8-15
        : type === 'action'
        ? Math.floor(Math.random() * 6) + 5  // 5-10
        : costs[type]

      dayCredits += cost
      queries.push({ type, cost })
    }

    days.push({
      date: date.toISOString().split('T')[0],
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      credits: dayCredits,
      queries,
    })
  }
  return days
}

export const usageHistory = generateUsageHistory()

// Tally breakdown by type across all 30 days
export const usageBreakdown = usageHistory.reduce(
  (acc, day) => {
    day.queries.forEach(({ type, cost }) => {
      acc[type].count += 1
      acc[type].credits += cost
    })
    return acc
  },
  {
    simple: { count: 0, credits: 0, label: 'Simple', costLabel: '1 credit' },
    standard: { count: 0, credits: 0, label: 'Standard', costLabel: '3 credits' },
    complex: { count: 0, credits: 0, label: 'Complex', costLabel: '8–15 credits' },
    action: { count: 0, credits: 0, label: 'Action', costLabel: '5–10 credits' },
  }
)

// Total credits consumed this month
export const totalConsumed = usageHistory.reduce((s, d) => s + d.credits, 0)

// Monthly allocation
export const monthlyAllocation = 500

// Starting balance (remaining)
export const initialBalance = monthlyAllocation - totalConsumed

// Recent individual queries (last 10 across history, most recent first)
export const recentQueries = (() => {
  const queries = []
  const prompts = {
    simple: [
      'What does "yield" mean in Python?',
      'Format this date string',
      'What timezone is PST?',
      'Explain async/await briefly',
      'Convert JSON to table',
    ],
    standard: [
      'Summarize this contract clause',
      'Write a follow-up email draft',
      'Explain this error message',
      'Rewrite this paragraph for clarity',
      'Generate 5 headline options',
    ],
    complex: [
      'Analyze this dataset for trends',
      'Build a pricing strategy for SaaS',
      'Review this legal agreement',
      'Create a project roadmap outline',
      'Compare these three architectures',
    ],
    action: [
      'Search for competitor pricing pages',
      'Fetch and summarize top 5 results',
      'Draft and send meeting notes',
      'Pull repo stats from GitHub API',
      'Research market size for edtech',
    ],
  }
  // Walk history backwards
  for (let i = usageHistory.length - 1; i >= 0 && queries.length < 12; i--) {
    const day = usageHistory[i]
    for (let q = day.queries.length - 1; q >= 0 && queries.length < 12; q--) {
      const { type, cost } = day.queries[q]
      const pool = prompts[type]
      queries.push({
        prompt: pool[Math.floor(Math.random() * pool.length)],
        type,
        cost,
        date: day.label,
      })
    }
  }
  return queries
})()

export const creditPackages = [
  { id: 'starter', credits: 200, price: 2.99, label: 'Starter' },
  { id: 'popular', credits: 500, price: 5.99, label: 'Popular', badge: 'Best value' },
  { id: 'power', credits: 1500, price: 14.99, label: 'Power' },
]
