import { useState } from 'react'
import { useTranslations } from './useTranslations'

const CONTEXT_LIMIT = 128000
const CONTAINER_HEIGHT = 280

type MessageQuality = 'signal' | 'noise' | 'system'
type Locale = 'en' | 'fr'

interface ContextStackProps {
  lang?: Locale
}

const QUALITY_CONFIG = {
  signal: {
    label: 'Signal',
    color: '#22c55e', // Green
    bg: 'rgba(34, 197, 94, 0.15)',
    description: 'High-quality, relevant content'
  },
  noise: {
    label: 'Noise',
    color: '#ef4444', // Red
    bg: 'rgba(239, 68, 68, 0.15)',
    description: 'Low-quality, irrelevant content'
  },
  system: {
    label: 'System',
    color: '#8b5cf6', // Purple
    bg: 'rgba(139, 92, 246, 0.15)',
    description: 'System instructions'
  }
} as const

const MESSAGE_TYPES = {
  systemPrompt: {
    label: 'System',
    tokens: 8000,
    role: 'system',
    quality: 'system' as MessageQuality
  },
  qualityUserMessage: {
    label: 'User',
    tokens: 1500,
    role: 'user',
    quality: 'signal' as MessageQuality
  },
  noisyUserMessage: {
    label: 'User',
    tokens: 1500,
    role: 'user',
    quality: 'noise' as MessageQuality
  },
  qualityAIMessage: {
    label: 'Assistant',
    tokens: 3500,
    role: 'assistant',
    quality: 'signal' as MessageQuality
  },
  noisyAIMessage: {
    label: 'Assistant',
    tokens: 3500,
    role: 'assistant',
    quality: 'noise' as MessageQuality
  }
} as const

type MessageKey = keyof typeof MESSAGE_TYPES

interface Message {
  type: MessageKey
  id: string
  quality: MessageQuality
}

// Calculate impact points based on tokens and quality
const getImpactPoints = (tokens: number, quality: MessageQuality): number => {
  if (quality === 'system') return 0
  if (quality === 'signal') return Math.round((tokens / 100))
  return -Math.round((tokens / 100))
}

const formatTokens = (tokens: number): string => {
  if (tokens >= 1000) return `${(tokens / 1000).toFixed(1)}k`
  return tokens.toString()
}

export default function ContextStack({ lang = 'en' }: ContextStackProps) {
  const t = useTranslations('contextStack', lang)

  const [messages, setMessages] = useState<Message[]>([
    { type: 'systemPrompt', id: 'system-1', quality: 'system' }
  ])

  // Calculate token totals
  const usedTokens = messages.reduce((sum, m) => sum + MESSAGE_TYPES[m.type].tokens, 0)
  const availableTokens = Math.max(0, CONTEXT_LIMIT - usedTokens)
  const usagePercent = (usedTokens / CONTEXT_LIMIT) * 100

  // Count messages for numbering
  const getMessageCounts = () => {
    let qualityUserCount = 0
    let noisyUserCount = 0
    let qualityAICount = 0
    let noisyAICount = 0

    return messages.map(m => {
      if (m.type === 'systemPrompt') return 'System'
      if (m.type === 'qualityUserMessage') {
        qualityUserCount++
        return `User ${qualityUserCount} ✓`
      }
      if (m.type === 'noisyUserMessage') {
        noisyUserCount++
        return `User ${noisyUserCount} ✗`
      }
      if (m.type === 'qualityAIMessage') {
        qualityAICount++
        return `Assistant ${qualityAICount} ✓`
      }
      noisyAICount++
      return `Assistant ${noisyAICount} ✗`
    })
  }

  const messageLabels = getMessageCounts()

  const getBlockHeight = (tokens: number): number => {
    return (tokens / CONTEXT_LIMIT) * CONTAINER_HEIGHT
  }

  // Calculate overall signal percentage
  const totalSignalTokens = messages.reduce((sum, m) => {
    const msgType = MESSAGE_TYPES[m.type]
    return sum + (msgType.quality === 'signal' ? msgType.tokens : 0)
  }, 0)
  const signalPercent = usedTokens > 0 ? (totalSignalTokens / usedTokens) * 100 : 0

  // Get quality label
  const getQualityLabel = () => {
    if (signalPercent > 70) return t('highQuality')
    if (signalPercent > 40) return t('mixedQuality')
    return t('lowQuality')
  }

  const getQualityColor = () => {
    if (signalPercent > 70) return '#22c55e'
    if (signalPercent > 40) return '#fbbf24'
    return '#ef4444'
  }

  const addMessage = (type: MessageKey) => {
    setMessages(prev => [...prev, {
      type,
      id: `${type}-${Date.now()}`,
      quality: MESSAGE_TYPES[type].quality
    }])
  }

  const removeLast = () => {
    setMessages(prev => prev.length > 1 ? prev.slice(0, -1) : prev)
  }

  const reset = () => {
    setMessages([{ type: 'systemPrompt', id: 'system-1', quality: 'system' }])
  }

  return (
    <div className="context-stack-single" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Single Panel Layout */}
      <div>
        <h3 style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#a0a0a0',
          marginBottom: '0.5rem',
          textAlign: 'center'
        }}>
          {t('contextMessages')}
        </h3>

        <div style={{ position: 'relative' }}>
          <div style={{
            width: '100%',
            height: `${CONTAINER_HEIGHT}px`,
            border: `2px solid ${usagePercent > 100 ? '#f87171' : 'rgba(255,255,255,0.2)'}`,
            borderRadius: '12px',
            background: 'rgba(0,0,0,0.3)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              position: 'relative'
            }}>
              {messages.map((msg, idx) => {
                const msgType = MESSAGE_TYPES[msg.type]
                const qualityConfig = QUALITY_CONFIG[msgType.quality]
                const height = getBlockHeight(msgType.tokens)
                const label = messageLabels[idx]
                const impactPoints = getImpactPoints(msgType.tokens, msgType.quality)
                const isSignal = msgType.quality === 'signal'
                const isNoise = msgType.quality === 'noise'

                return (
                  <div
                    key={msg.id}
                    style={{
                      height: `${height}px`,
                      minHeight: '48px',
                      border: `2px dashed ${qualityConfig.color}`,
                      borderRadius: '6px',
                      background: qualityConfig.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 1rem',
                      margin: '2px 4px',
                      transition: 'all 0.5s ease-out',
                      animation: 'slideIn 0.3s ease-out',
                      position: 'relative',
                      cursor: 'default'
                    }}
                    title={`${label}: ${formatTokens(msgType.tokens)} tokens (${qualityConfig.label})`}
                  >
                    {/* Left: Label with quality checkmark */}
                    <span style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: qualityConfig.color,
                      flex: 1,
                      minWidth: 0
                    }}>
                      {label}
                    </span>

                    {/* Center: Token count */}
                    <span style={{
                      fontSize: '0.8rem',
                      color: '#a0a0a0',
                      fontWeight: 500,
                      flexShrink: 0,
                      margin: '0 1rem'
                    }}>
                      {formatTokens(msgType.tokens)}
                    </span>

                    {/* Right: Impact indicator */}
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: isSignal ? '#22c55e' : isNoise ? '#ef4444' : '#8b5cf6',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px',
                      minWidth: '60px',
                      justifyContent: 'flex-end'
                    }}>
                      {isSignal && '↑'}
                      {isNoise && '↓'}
                      {impactPoints !== 0 && (
                        <span>{impactPoints > 0 ? `+${impactPoints}` : impactPoints}</span>
                      )}
                      {msgType.quality === 'system' && (
                        <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>(base)</span>
                      )}
                    </span>
                  </div>
                )
              })}

              {availableTokens > 0 && (
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.3)',
                  fontStyle: 'italic',
                  margin: '2px 4px',
                  border: '1px dashed rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  background: 'rgba(255,255,255,0.02)'
                }}>
                  {availableTokens > 10000 ? `${formatTokens(availableTokens)} ${t('available')}` : ''}
                </div>
              )}
            </div>

            {usagePercent > 100 && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(248, 113, 113, 0.95)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 600,
                textAlign: 'center',
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(248, 113, 113, 0.4)'
              }}>
                {t('overflow')}
              </div>
            )}
          </div>

          {/* Scale markers */}
          <div style={{
            position: 'absolute',
            right: '-40px',
            top: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.4)'
          }}>
            <span>128k</span>
            <span>0</span>
          </div>
        </div>
      </div>

      {/* Quality Bar at bottom */}
      <div style={{
        padding: '0.75rem',
        background: signalPercent > 70
          ? 'rgba(34, 197, 94, 0.1)'
          : signalPercent > 40
            ? 'rgba(251, 191, 36, 0.1)'
            : 'rgba(239, 68, 68, 0.1)',
        borderRadius: '8px',
        border: `1px solid ${getQualityColor()}`
      }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{ fontSize: '0.875rem', color: '#a0a0a0', marginBottom: '0.25rem' }}>
            {t('signalQuality')}: <strong style={{ color: getQualityColor() }}>
              {signalPercent.toFixed(1)}%
            </strong>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', opacity: 0.8 }}>
              {getQualityLabel()}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          width: '100%',
          height: '12px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '6px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div
            style={{
              width: `${signalPercent}%`,
              height: '100%',
              background: getQualityColor(),
              borderRadius: '6px',
              transition: 'all 0.5s ease-out',
              boxShadow: `0 0 10px ${getQualityColor()}40`
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div>
        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{
            fontSize: '0.75rem',
            color: '#a0a0a0',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {t('addToConversation')}
          </div>

          {/* Quality User Messages */}
          <div style={{ marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.25rem' }}>{t('userMessages')}</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => addMessage('qualityUserMessage')}
                disabled={usagePercent >= 150}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.625rem',
                  background: 'rgba(0,0,0,0.3)',
                  border: `1px solid ${QUALITY_CONFIG.signal.color}`,
                  borderRadius: '6px',
                  color: QUALITY_CONFIG.signal.color,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: usagePercent >= 150 ? 'not-allowed' : 'pointer',
                  opacity: usagePercent >= 150 ? 0.5 : 1,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (usagePercent < 150) {
                    e.currentTarget.style.background = QUALITY_CONFIG.signal.bg
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.3)'
                }}
              >
                {t('qualityBtn')} <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>+1.5k</span>
              </button>
              <button
                onClick={() => addMessage('noisyUserMessage')}
                disabled={usagePercent >= 150}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.625rem',
                  background: 'rgba(0,0,0,0.3)',
                  border: `1px solid ${QUALITY_CONFIG.noise.color}`,
                  borderRadius: '6px',
                  color: QUALITY_CONFIG.noise.color,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: usagePercent >= 150 ? 'not-allowed' : 'pointer',
                  opacity: usagePercent >= 150 ? 0.5 : 1,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (usagePercent < 150) {
                    e.currentTarget.style.background = QUALITY_CONFIG.noise.bg
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.3)'
                }}
              >
                {t('noisyBtn')} <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>+1.5k</span>
              </button>
            </div>
          </div>

          {/* Quality AI Messages */}
          <div style={{ marginBottom: '0.25rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.25rem' }}>{t('aiResponses')}</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => addMessage('qualityAIMessage')}
                disabled={usagePercent >= 150}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.625rem',
                  background: 'rgba(0,0,0,0.3)',
                  border: `1px solid ${QUALITY_CONFIG.signal.color}`,
                  borderRadius: '6px',
                  color: QUALITY_CONFIG.signal.color,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: usagePercent >= 150 ? 'not-allowed' : 'pointer',
                  opacity: usagePercent >= 150 ? 0.5 : 1,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (usagePercent < 150) {
                    e.currentTarget.style.background = QUALITY_CONFIG.signal.bg
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.3)'
                }}
              >
                {t('qualityBtn')} <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>+3.5k</span>
              </button>
              <button
                onClick={() => addMessage('noisyAIMessage')}
                disabled={usagePercent >= 150}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.625rem',
                  background: 'rgba(0,0,0,0.3)',
                  border: `1px solid ${QUALITY_CONFIG.noise.color}`,
                  borderRadius: '6px',
                  color: QUALITY_CONFIG.noise.color,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: usagePercent >= 150 ? 'not-allowed' : 'pointer',
                  opacity: usagePercent >= 150 ? 0.5 : 1,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (usagePercent < 150) {
                    e.currentTarget.style.background = QUALITY_CONFIG.noise.bg
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.3)'
                }}
              >
                {t('noisyBtn')} <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>+3.5k</span>
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {messages.length > 1 && (
            <button
              onClick={removeLast}
              style={{
                flex: 1,
                padding: '0.5rem 0.875rem',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '6px',
                color: '#eaeaea',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.3)'
              }}
            >
              {t('removeLast')}
            </button>
          )}
          <button
            onClick={reset}
            style={{
              flex: messages.length <= 1 ? 1 : undefined,
              padding: '0.5rem 0.875rem',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '6px',
              color: '#eaeaea',
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.3)'
            }}
          >
            {t('reset')}
          </button>
        </div>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        fontSize: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{
            width: '16px',
            height: '16px',
            border: `2px dashed ${QUALITY_CONFIG.signal.color}`,
            borderRadius: '4px',
            background: QUALITY_CONFIG.signal.bg
          }}></div>
          <span style={{ color: '#a0a0a0' }}>{t('quality')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{
            width: '16px',
            height: '16px',
            border: `2px dashed ${QUALITY_CONFIG.noise.color}`,
            borderRadius: '4px',
            background: QUALITY_CONFIG.noise.bg
          }}></div>
          <span style={{ color: '#a0a0a0' }}>{t('noisy')}</span>
        </div>
      </div>

      {/* Inline animation keyframes */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .context-stack-single > div:first-child h3 {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  )
}
