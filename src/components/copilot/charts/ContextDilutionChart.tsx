import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import { useTranslations } from '../useTranslations'

interface ContextDilutionChartProps {
  lang?: 'en' | 'fr'
}

type ScenarioKey = 'cleanCode' | 'wholeFile' | 'stackTrace' | 'historyBloat' | 'irrelevantFile'

interface Scenario {
  key: ScenarioKey
  timestamp: number
}

export default function ContextDilutionChart({ lang = 'en' }: ContextDilutionChartProps) {
  const t = useTranslations('charts', lang)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)
  const [scenarios, setScenarios] = useState<Scenario[]>([])

  // Real coding scenarios with their signal/noise impact
  const SCENARIOS = {
    cleanCode: {
      label: t('dilution.addRelevantFunction'),
      description: t('dilution.surgicallySelectedCode'),
      signal: 25,
      noise: 0,
      color: '#4ade80'
    },
    wholeFile: {
      label: t('dilution.addEntireFile'),
      description: t('dilution.mostlyIrrelevantCode'),
      signal: 15,
      noise: 35,
      color: '#fb923c'
    },
    stackTrace: {
      label: t('dilution.pasteFullStackTrace'),
      description: t('dilution.errorBuried'),
      signal: 5,
      noise: 50,
      color: '#f87171'
    },
    historyBloat: {
      label: t('dilution.addLongHistory'),
      description: t('dilution.meanderingConversation'),
      signal: 0,
      noise: 40,
      color: '#f87171'
    },
    irrelevantFile: {
      label: t('dilution.includePackageLock'),
      description: t('dilution.generatedNoise'),
      signal: 0,
      noise: 25,
      color: '#f87171'
    }
  }

  // Base signal from the prompt itself
  const baseSignal = 20

  // Calculate totals from scenarios
  const totalSignal = scenarios.length > 0 ? baseSignal + scenarios.reduce((sum, s) => sum + SCENARIOS[s.key].signal, 0) : 0
  const totalNoise = scenarios.reduce((sum, s) => sum + SCENARIOS[s.key].noise, 0)
  const total = totalSignal + totalNoise
  const signalPercent = total > 0 ? Math.round((totalSignal / total) * 100) : 0

  // Determine status colors and message based on signal percentage
  let signalColor, noiseColor, statusColor, statusMessage
  if (scenarios.length === 0 || total === 0) {
    signalColor = '#6b7280'
    noiseColor = '#6b7280'
    statusColor = '#6b7280'
    statusMessage = t('dilution.addScenarios').replace(':', '')
  } else if (signalPercent >= 60) {
    signalColor = '#4ade80'
    noiseColor = '#6b7280'
    statusColor = '#4ade80'
    statusMessage = t('dilution.goodRatio')
  } else if (signalPercent >= 40) {
    signalColor = '#fb923c'
    noiseColor = '#6b7280'
    statusColor = '#fb923c'
    statusMessage = t('dilution.dilutedSignal')
  } else {
    signalColor = '#f87171'
    noiseColor = '#4b5563'
    statusColor = '#f87171'
    statusMessage = t('dilution.criticalDilution')
  }

  const addScenario = (key: ScenarioKey) => {
    setScenarios(prev => [...prev, { key, timestamp: Date.now() }])
  }

  const removeLast = () => {
    setScenarios(prev => prev.slice(0, -1))
  }

  const reset = () => {
    setScenarios([])
  }

  useEffect(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const chartData = {
      labels: [t('dilution.signalLabel'), t('dilution.noiseLabel')],
      datasets: [{
        data: [totalSignal, totalNoise],
        backgroundColor: [signalColor, noiseColor],
        borderColor: '#16213e',
        borderWidth: 4,
        hoverOffset: 10
      }]
    }

    if (chartRef.current) {
      chartRef.current.data = chartData
      chartRef.current.update('default')
    } else {
      chartRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '60%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#eaeaea',
                padding: 15,
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw as number
                  const percentage = Math.round((value / total) * 100)
                  return `${context.label}: ${value} (${percentage}%)`
                }
              }
            }
          },
          animation: {
            duration: 600,
            easing: 'easeOutQuart'
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
  }, [totalSignal, totalNoise, signalColor, noiseColor, total, t])

  const scenarioPlural = scenarios.length !== 1 ? t('dilution.scenarios') : t('dilution.scenario')

  return (
    <div className="context-dilution-chart">
      <div className="chart-container" style={{ position: 'relative', height: '280px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>

      {/* Status indicator */}
      <div style={{
        textAlign: 'center',
        marginTop: '1rem',
        padding: '0.75rem 1rem',
        background: `rgba(${parseInt(statusColor === '#4ade80' ? '74,222,128' : statusColor === '#fb923c' ? '251,146,60' : '248,113,113')}, 0.15)`,
        borderRadius: '8px',
        border: `1px solid ${statusColor}`,
        fontWeight: 600,
        color: statusColor
      }}>
        <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
          {statusMessage}
        </div>
        <div style={{ fontSize: '0.75rem', opacity: 0.8, fontWeight: 400 }}>
          {t('dilution.signalLabel')}: {signalPercent}% | {scenarios.length} {scenarioPlural} {t('dilution.applied')}
        </div>
      </div>

      <div className="chart-controls" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Scenario buttons with descriptions */}
          <div style={{ fontSize: '0.75rem', color: '#a0a0a0', marginBottom: '0.25rem' }}>
            {t('dilution.addScenarios')}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button
              onClick={() => addScenario('cleanCode')}
              className="success"
              style={{ minWidth: '200px', textAlign: 'left' }}
            >
              <div>+ {t('dilution.relevantFunction')}</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.7, fontWeight: 400 }}>
                {SCENARIOS.cleanCode.description} (+{SCENARIOS.cleanCode.signal} signal)
              </div>
            </button>

            <button
              onClick={() => addScenario('wholeFile')}
              className="warning"
              style={{ minWidth: '200px', textAlign: 'left' }}
            >
              <div>+ {t('dilution.entireFile')}</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.7, fontWeight: 400 }}>
                {SCENARIOS.wholeFile.description} (+{SCENARIOS.wholeFile.signal} signal, +{SCENARIOS.wholeFile.noise} noise)
              </div>
            </button>

            <button
              onClick={() => addScenario('stackTrace')}
              className="danger"
              style={{ minWidth: '200px', textAlign: 'left' }}
            >
              <div>+ {t('dilution.fullStackTrace')}</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.7, fontWeight: 400 }}>
                {SCENARIOS.stackTrace.description} (+{SCENARIOS.stackTrace.signal} signal, +{SCENARIOS.stackTrace.noise} noise)
              </div>
            </button>

            <button
              onClick={() => addScenario('historyBloat')}
              className="danger"
              style={{ minWidth: '200px', textAlign: 'left' }}
            >
              <div>+ {t('dilution.longHistory')}</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.7, fontWeight: 400 }}>
                {SCENARIOS.historyBloat.description} (+{SCENARIOS.historyBloat.noise} noise)
              </div>
            </button>

            <button
              onClick={() => addScenario('irrelevantFile')}
              className="danger"
              style={{ minWidth: '200px', textAlign: 'left' }}
            >
              <div>+ {t('dilution.packageLock')}</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.7, fontWeight: 400 }}>
                {SCENARIOS.irrelevantFile.description} (+{SCENARIOS.irrelevantFile.noise} noise)
              </div>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            {scenarios.length > 0 && (
              <button onClick={removeLast} disabled={scenarios.length === 0}>
                {t('dilution.removeLast')}
              </button>
            )}
            <button onClick={reset}>
              {t('dilution.resetScenarios')}
            </button>
          </div>
        </div>
      </div>

      {/* Active scenarios list */}
      {scenarios.length > 0 && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem 1rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
          fontSize: '0.875rem'
        }}>
          <div style={{ color: '#a0a0a0', marginBottom: '0.5rem' }}>{t('dilution.activeScenarios')}</div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#eaeaea' }}>
            {scenarios.map((s, i) => (
              <li key={s.timestamp} style={{ marginBottom: '0.25rem' }}>
                {SCENARIOS[s.key].label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
