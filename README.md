# Moccet Credit Flow

A credit management dashboard for the Moccet AI service. Users can monitor their credit balance, visualize usage patterns, and purchase additional credits.

## Features

- **Balance Ring** — Circular progress visualization with color-coded status (green > 50%, orange 25–50%, red < 25%)
- **Usage Chart** — 30-day area chart of daily credit consumption with hover tooltips
- **Breakdown Bar** — Stacked bar showing credit usage by query type (Simple, Standard, Complex, Action)
- **Recent Queries** — List of the 12 most recent queries with costs and timestamps
- **Purchase Flow** — Multi-step checkout for three credit packages
- **Usage Nudges** — Contextual warnings at 75%, 90%, 95%, and 100% usage thresholds
- **Auto Top-Up** — Toggle to automatically purchase credits when balance drops below 20

## Tech Stack

- [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- [Recharts](https://recharts.org/) for data visualization

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
src/
├── App.jsx                # Main app — dashboard and purchase views
├── main.jsx               # React entry point
├── mockData.js            # Simulated 30-day usage history and credit packages
└── components/
    ├── BalanceRing.jsx    # Circular SVG credit balance indicator
    ├── UsageChart.jsx     # Daily usage area chart
    ├── BreakdownBar.jsx   # Usage breakdown by query type
    ├── RecentQueries.jsx  # Recent query list
    ├── PurchaseFlow.jsx   # Credit purchase checkout
    └── UsageNudge.jsx     # Threshold-based usage warnings
```

## Credit Packages

| Package | Credits | Price |
|---|---|---|
| Starter | 200 | $2.99 |
| Popular | 500 | $5.99 |
| Power | 1,500 | $14.99 |

## Notes

- All data is simulated via `mockData.js` — no backend or real payments
- Monthly allocation is 500 credits
- Designed mobile-first with a max-width of 520px
