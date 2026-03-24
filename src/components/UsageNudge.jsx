import { useState } from 'react'

// threshold: 75 | 90 | 95 | 100
export default function UsageNudge({ threshold, onDismiss, onPurchase }) {
  const configs = {
    75: {
      icon: '◐',
      message: "You've used 75% of your credits this month.",
      sub: 'Top up now to keep things moving.',
      cta: 'Add credits',
    },
    90: {
      icon: '◑',
      message: "90% of your monthly credits are gone.",
      sub: 'Running low — consider topping up soon.',
      cta: 'Add credits',
    },
    95: {
      icon: '◕',
      message: "Almost out — only 5% of credits remain.",
      sub: "Don't get interrupted mid-project.",
      cta: 'Top up now',
    },
    100: {
      icon: '●',
      message: "You've run out of credits.",
      sub: 'Purchase more to continue using Moccet.',
      cta: 'Purchase credits',
    },
  }

  const c = configs[threshold]
  const isPersistent = threshold === 100

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
        padding: '12px 16px',
        borderRadius: 10,
        background: isPersistent ? '#18181b' : '#fafafa',
        border: isPersistent ? 'none' : '1px solid #e4e4e7',
        marginTop: 8,
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', gap: 10, flex: 1, minWidth: 0 }}>
        <span style={{
          fontSize: 14,
          color: isPersistent ? '#a1a1aa' : '#71717a',
          flexShrink: 0,
          marginTop: 1,
        }}>
          {c.icon}
        </span>
        <div>
          <div style={{
            fontSize: 13,
            fontWeight: 500,
            color: isPersistent ? '#fff' : '#18181b',
          }}>
            {c.message}
          </div>
          <div style={{
            fontSize: 12,
            color: isPersistent ? '#a1a1aa' : '#71717a',
            marginTop: 2,
          }}>
            {c.sub}
          </div>
          <button
            onClick={onPurchase}
            style={{
              marginTop: 8,
              padding: '6px 12px',
              borderRadius: 6,
              border: isPersistent ? '1px solid #3f3f46' : '1px solid #e4e4e7',
              background: isPersistent ? 'transparent' : '#fff',
              color: isPersistent ? '#fff' : '#18181b',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {c.cta}
          </button>
        </div>
      </div>

      {!isPersistent && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            background: 'none',
            border: 'none',
            color: '#a1a1aa',
            cursor: 'pointer',
            fontSize: 16,
            padding: 2,
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}
