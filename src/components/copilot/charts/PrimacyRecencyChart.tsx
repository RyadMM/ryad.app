import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import { useTranslations } from '../useTranslations'

interface PrimacyRecencyChartProps {
  lang?: 'en' | 'fr'
}

export default function PrimacyRecencyChart({ lang = 'en' }: PrimacyRecencyChartProps) {
  const t = useTranslations('charts', lang)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)
  const [sessionType, setSessionType] = useState<'short' | 'long'>('short')

  const positions = [
    t('primacy.start'), '', t('primacy.early'), '', t('primacy.midEarly'), '',
    t('primacy.middle'), '', t('primacy.midLate'), '', t('primacy.late'), '', t('primacy.end')
  ]

  const shortSession = [95, 90, 82, 75, 70, 68, 65, 68, 72, 80, 88, 94, 98]
  const longSession = [92, 78, 60, 45, 35, 30, 28, 30, 38, 55, 75, 90, 95]

  const currentData = sessionType === 'short' ? shortSession : longSession

  useEffect(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const chartData = {
      labels: positions,
      datasets: [{
        label: 'Relative Attention Weight',
        data: currentData,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart
          const { ctx: chartCtx, chartArea } = chart
          if (!chartArea) return 'rgba(96, 165, 250, 0.3)'
          const gradient = chartCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, 'rgba(96, 165, 250, 0.6)')
          gradient.addColorStop(1, 'rgba(96, 165, 250, 0.05)')
          return gradient
        },
        borderColor: '#60a5fa',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: '#60a5fa',
        pointBorderColor: '#16213e',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8
      }]
    }

    if (chartRef.current) {
      chartRef.current.data.datasets[0].data = currentData
      chartRef.current.update('default')
    } else {
      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              min: 0,
              max: 100,
              grid: { color: 'rgba(255,255,255,0.1)' },
              ticks: {
                color: '#a0a0a0',
                callback: (val) => val + '%'
              },
              title: {
                display: true,
                text: t('primacy.attentionWeight'),
                color: '#a0a0a0'
              }
            },
            x: {
              grid: { color: 'rgba(255,255,255,0.05)' },
              ticks: { color: '#a0a0a0' },
              title: {
                display: true,
                text: t('primacy.positionInContext'),
                color: '#a0a0a0'
              }
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: (items) => `${t('primacy.positionLabel')}${items[0].label || t('primacy.contextLabel')}`,
                label: (context) => `${t('primacy.attentionWeight')}: ${context.raw}%`
              }
            }
          },
          animation: {
            duration: 800,
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
  }, [sessionType, currentData, t])

  return (
    <div className="primacy-recency-chart">
      <div className="chart-container" style={{ position: 'relative', height: '320px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="chart-controls">
        <button
          className={sessionType === 'short' ? 'active' : ''}
          onClick={() => setSessionType('short')}>
          {t('primacy.shortSession')}
        </button>
        <button
          className={sessionType === 'long' ? 'active' : ''}
          onClick={() => setSessionType('long')}>
          {t('primacy.longSession')}
        </button>
      </div>
    </div>
  )
}
