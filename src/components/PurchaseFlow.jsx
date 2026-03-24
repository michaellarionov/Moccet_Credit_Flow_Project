import { useState } from 'react'
import { creditPackages } from '../mockData'

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#18181b" />
      <path d="M6 10.5l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      style={{
        position: 'relative',
        width: 40,
        height: 22,
        borderRadius: 99,
        background: checked ? '#18181b' : '#e4e4e7',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        transition: 'background 0.2s ease',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: 3,
        left: checked ? 21 : 3,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: '#fff',
        transition: 'left 0.2s ease',
      }} />
    </button>
  )
}

export default function PurchaseFlow({ onPurchase }) {
  const [selected, setSelected] = useState('popular')
  const [autoTopUp, setAutoTopUp] = useState(false)
  const [step, setStep] = useState('select') // 'select' | 'confirm' | 'success'

  const pkg = creditPackages.find(p => p.id === selected)

  function handleConfirm() {
    setStep('confirm')
  }

  function handlePay() {
    setStep('success')
    setTimeout(() => {
      onPurchase(pkg.credits)
      setStep('select')
    }, 1800)
  }

  if (step === 'success') {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '48px 24px', gap: 12, textAlign: 'center',
      }}>
        <div style={{ fontSize: 36 }}>✦</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#18181b' }}>
          {pkg.credits.toLocaleString()} credits added
        </div>
        <div style={{ fontSize: 13, color: '#71717a' }}>
          Your balance has been updated.
        </div>
      </div>
    )
  }

  if (step === 'confirm') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#18181b', marginBottom: 4 }}>
            Confirm purchase
          </div>
          <div style={{ fontSize: 13, color: '#71717a' }}>
            Simulated payment — no real charge.
          </div>
        </div>

        <div style={{
          background: '#fafafa',
          border: '1px solid #e4e4e7',
          borderRadius: 10,
          padding: '16px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#18181b' }}>
              {pkg.credits.toLocaleString()} credits
            </div>
            <div style={{ fontSize: 12, color: '#71717a', marginTop: 2 }}>{pkg.label} pack</div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#18181b' }}>
            ${pkg.price.toFixed(2)}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => setStep('select')}
            style={{
              flex: 1, padding: '11px 0',
              border: '1px solid #e4e4e7',
              borderRadius: 8, background: '#fff',
              fontSize: 13, fontWeight: 500, color: '#3f3f46',
              cursor: 'pointer',
            }}
          >
            Back
          </button>
          <button
            onClick={handlePay}
            style={{
              flex: 2, padding: '11px 0',
              border: 'none',
              borderRadius: 8, background: '#18181b',
              fontSize: 13, fontWeight: 500, color: '#fff',
              cursor: 'pointer',
            }}
          >
            Pay ${pkg.price.toFixed(2)}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: '#18181b' }}>Add credits</div>

      {/* Package cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {creditPackages.map(pkg => {
          const isSelected = selected === pkg.id
          return (
            <button
              key={pkg.id}
              onClick={() => setSelected(pkg.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: 10,
                border: isSelected ? '1.5px solid #18181b' : '1px solid #e4e4e7',
                background: isSelected ? '#fafafa' : '#fff',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  border: isSelected ? '5px solid #18181b' : '1.5px solid #d4d4d8',
                  background: '#fff',
                  transition: 'border 0.15s',
                  flexShrink: 0,
                }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: '#18181b' }}>
                      {pkg.credits.toLocaleString()} credits
                    </span>
                    {pkg.badge && (
                      <span style={{
                        fontSize: 10, fontWeight: 600,
                        color: '#18181b',
                        background: '#f4f4f5',
                        padding: '2px 7px',
                        borderRadius: 99,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}>
                        {pkg.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: '#71717a', marginTop: 2 }}>
                    ${(pkg.price / pkg.credits * 100).toFixed(1)}¢ per credit
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#18181b' }}>
                ${pkg.price.toFixed(2)}
              </div>
            </button>
          )
        })}
      </div>

      {/* Auto top-up */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 16,
        padding: '14px 0',
        borderTop: '1px solid #f4f4f5',
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#18181b' }}>Auto top-up</div>
          <div style={{ fontSize: 12, color: '#71717a', marginTop: 3, maxWidth: 240 }}>
            Automatically add 200 credits when your balance drops below 20
          </div>
        </div>
        <Toggle checked={autoTopUp} onChange={setAutoTopUp} />
      </div>

      {autoTopUp && (
        <div style={{
          fontSize: 12, color: '#71717a',
          background: '#f4f4f5',
          borderRadius: 8,
          padding: '10px 12px',
          marginTop: -12,
        }}>
          Top-ups will be charged at the Starter rate ($2.99 / 200 credits).
        </div>
      )}

      <button
        onClick={handleConfirm}
        style={{
          padding: '12px 0',
          border: 'none',
          borderRadius: 8,
          background: '#18181b',
          color: '#fff',
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        Continue
      </button>
    </div>
  )
}
