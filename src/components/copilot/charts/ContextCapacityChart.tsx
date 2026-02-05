import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import { useTranslations } from '../useTranslations'

interface ContextCapacityChartProps {
  lang?: 'en' | 'fr'
}

const CONTEXT_LIMIT = 128000

const MESSAGE_TYPES = {
  systemPrompt: {
    label: 'System',
    tokens: 8000,
    color: '#8b5cf6', // Purple
    role: 'system'
  },
  userMessage: {
    label: 'User',
    tokens: 1500,
    color: '#fb923c', // Orange
    role: 'user'
  },
  aiMessage: {
    label: 'Assistant',
    tokens: 3500,
    color: '#4ade80', // Green
    role: 'assistant'
  }
} as const

type MessageKey = keyof typeof MESSAGE_TYPES

interface Message {
  type: MessageKey
  id: string
}

const formatTokens = (tokens: number): string => {
  if (tokens >= 1000) return `${(tokens / 1000).toFixed(1)}k`
  return tokens.toString()
}

export default function ContextCapacityChart({ lang = 'en' }: ContextCapacityChartProps) {
  const t = useTranslations('charts', lang)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  const [messages, setMessages] = useState<Message[]>([
    { type: 'systemPrompt', id: 'system-1' }
  ])

  // Calculate token totals
  const systemTokens = MESSAGE_TYPES.systemPrompt.tokens
  const messageTokens = messages.reduce((sum, m) => sum + MESSAGE_TYPES[m.type].tokens, 0)
  const usedTokens = messageTokens
  const availableTokens = Math.max(0, CONTEXT_LIMIT - usedTokens)
  const usagePercent = (usedTokens / CONTEXT_LIMIT) * 100

  // Count user/assistant messages for numbering
  let userCount = 0
  let assistantCount = 0

  const buildChartData = () => {
    const labels: string[] = []
    const data: number[] = []
    const colors: string[] = []
    const borderColors: string[] = []

    messages.forEach((msg) => {
      const msgType = MESSAGE_TYPES[msg.type]
      let displayLabel = msgType.label

      if (msg.type === 'userMessage') {
        userCount++
        displayLabel = `User ${userCount}`
      } else if (msg.type === 'aiMessage') {
        assistantCount++
        displayLabel = `Assistant ${assistantCount}`
      }

      labels.push(displayLabel)
      data.push(msgType.tokens)
      colors.push(msgType.color)
      borderColors.push(msgType.color)
    })

    // Reset counters for next render
    userCount = 0
    assistantCount = 0

    // Add remaining space
    if (availableTokens > 0) {
      labels.push(t('capacity.remainingSpace'))
      data.push(availableTokens)
      colors.push('rgba(255,255,255,0.15)')
      borderColors.push('rgba(255,255,255,0.3)')
    }

    return { labels, data, colors, borderColors }
  }

  useEffect(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const { labels, data, colors, borderColors } = buildChartData()

    if (chartRef.current) {
      chartRef.current.data.labels = labels
      chartRef.current.data.datasets[0].data = data
      chartRef.current.data.datasets[0].backgroundColor = colors
      chartRef.current.data.datasets[0].borderColor = borderColors
      chartRef.current.update('default')
    } else {
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: colors,
            borderColor: borderColors,
            borderWidth: 1,
            borderRadius: 0,
            borderSkipped: false
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true,
              display: true,
              grid: { display: false },
              ticks: { display: false },
              border: { display: false }
            },
            y: {
              stacked: true,
              display: false,
              grid: { display: false },
              border: { display: false }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: true,
              callbacks: {
                title: (items) => {
                  const idx = items[0].dataIndex
                  return labels[idx] || ''
                },
                label: (context) => {
                  const value = context.raw as number
                  const percentage = ((value / CONTEXT_LIMIT) * 100).toFixed(1)
                  return ` ${formatTokens(value)} tokens (${percentage}%)`
                }
              }
            }
          },
          animation: {
            duration: 500,
            easing: 'easeOutQuart'
          },
          layout: {
            padding: { left: 0, right: 0, top: 0, bottom: 0 }
          }
        }
      })
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [messages, availableTokens])

  const addUserMessage = () => {
    setMessages(prev => [...prev, { type: 'userMessage', id: `user-${Date.now()}` }])
  }

  const addAIMessage = () => {
    setMessages(prev => [...prev, { type: 'aiMessage', id: `ai-${Date.now()}` }])
  }

  const removeLast = () => {
    setMessages(prev => prev.length > 1 ? prev.slice(0, -1) : prev)
  }

  const reset = () => {
    setMessages([{ type: 'systemPrompt', id: 'system-1' }])
  }

  // Get message sequence for timeline display
  const getMessageSequence = () => {
    const sequence: string[] = []
    let u = 0, a = 0
    messages.forEach(m => {
      if (m.type === 'systemPrompt') {
        sequence.push('System')
      } else if (m.type === 'userMessage') {
        u++
        sequence.push(`U${u}`)
      } else if (m.type === 'aiMessage') {
        a++
        sequence.push(`A${a}`)
      }
    })
    return sequence
  }

  const currentTurn = Math.floor((messages.length - 1) / 2)

  return (
    <div className="context-capacity-chart">
      {/* The timeline bar */}
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        {/* Chart canvas - invisible but handles tooltips */}
        <div style={{ position: 'relative', height: '60px', marginBottom: '0.5rem' }}>
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }}></canvas>
        </div>

        {/* Custom timeline overlay */}
        <div style={{
          position: 'relative',
          height: '48px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          marginTop: '-60px',
          pointerEvents: 'none'
        }}>
          {messages.map((msg, idx) => {
            const msgType = MESSAGE_TYPES[msg.type]
            const width = (msgType.tokens / CONTEXT_LIMIT) * 100
            let label = msgType.label
            if (msg.type === 'userMessage') {
              const num = messages.slice(0, idx + 1).filter(m => m.type === 'userMessage').length
              label = `U${num}`
            } else if (msg.type === 'aiMessage') {
              const num = messages.slice(0, idx + 1).filter(m => m.type === 'aiMessage').length
              label = `A${num}`
            }

            return (
              <div
                key={msg.id}
                style={{
                  width: `${width}%`,
                  minWidth: '40px',
                  background: msgType.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#000',
                  borderRight: '1px solid rgba(0,0,0,0.2)',
                  transition: 'all 0.5s ease-out'
                }}
              >
                {label}
              </div>
            )
          })}
          {availableTokens > 0 && (
            <div
              style={{
                width: `${(availableTokens / CONTEXT_LIMIT) * 100}%`,
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                color: '#888',
                fontStyle: 'italic'
              }}
            >
              {availableTokens > 10000 ? t('capacity.remainingSpace') : ''}
            </div>
          )}
        </div>
      </div>

      {/* Usage summary */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        padding: '0.75rem 1rem',
        background: usagePercent > 90 ? 'rgba(248, 113, 113, 0.1)' : 'rgba(255,255,255,0.05)',
        borderRadius: '8px',
        border: `1px solid ${usagePercent > 90 ? '#f87171' : 'rgba(255,255,255,0.1)'}`
      }}>
        <span style={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
          <strong style={{ color: usagePercent > 90 ? '#f87171' : '#eaeaea' }}>
            {formatTokens(usedTokens)} / {formatTokens(CONTEXT_LIMIT)}
          </strong>
          <span style={{ marginLeft: '0.5rem', opacity: 0.7 }}>
            ({usagePercent.toFixed(1)}%)
          </span>
        </span>
        <span style={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
          {t('capacity.turn', '').replace('{turn}', currentTurn.toString())}
        </span>
      </div>

      {usagePercent > 100 && (
        <div style={{ color: '#f87171', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>
          {t('capacity.overflowWarning')}
        </div>
      )}

      {/* Controls */}
      <div className="chart-controls" style={{ marginTop: '1.5rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#a0a0a0', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {t('capacity.addToConversation')}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={addUserMessage}
              style={{ borderColor: MESSAGE_TYPES.userMessage.color, flex: 1 }}
            >
              <span style={{ color: MESSAGE_TYPES.userMessage.color }}>👤</span> {t('capacity.userMessage')}
              <span style={{ fontSize: '0.7rem', opacity: 0.7, marginLeft: '0.25rem' }}>
                +{formatTokens(MESSAGE_TYPES.userMessage.tokens)}
              </span>
            </button>
            <button
              onClick={addAIMessage}
              style={{ borderColor: MESSAGE_TYPES.aiMessage.color, flex: 1 }}
            >
              <span style={{ color: MESSAGE_TYPES.aiMessage.color }}>🤖</span> {t('capacity.assistant')}
              <span style={{ fontSize: '0.7rem', opacity: 0.7, marginLeft: '0.25rem' }}>
                +{formatTokens(MESSAGE_TYPES.aiMessage.tokens)}
              </span>
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {messages.length > 1 && (
            <button onClick={removeLast} style={{ fontSize: '0.875rem' }}>
              {t('capacity.removeLast')}
            </button>
          )}
          <button onClick={reset} style={{ fontSize: '0.875rem' }}>
            {t('capacity.reset')}
          </button>
        </div>
      </div>

      {/* Legend */}
      <div style={{
        marginTop: '1rem',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        fontSize: '0.8rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: '16px', height: '16px', background: MESSAGE_TYPES.systemPrompt.color, borderRadius: '3px' }}></div>
          <span style={{ color: '#a0a0a0' }}>{t('capacity.system')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: '16px', height: '16px', background: MESSAGE_TYPES.userMessage.color, borderRadius: '3px' }}></div>
          <span style={{ color: '#a0a0a0' }}>{t('capacity.user')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: '16px', height: '16px', background: MESSAGE_TYPES.aiMessage.color, borderRadius: '3px' }}></div>
          <span style={{ color: '#a0a0a0' }}>{t('capacity.assistant')}</span>
        </div>
      </div>
    </div>
  )
}
