import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import { useTranslations } from '../useTranslations'

type ViewMode = 'explore' | 'execute' | 'both'

interface ExploreExecuteChartProps {
  lang?: 'en' | 'fr'
}

export default function ExploreExecuteChart({ lang = 'en' }: ExploreExecuteChartProps) {
  const t = useTranslations('charts', lang)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('explore')

  const dimensions = [
    t('exploreExecute.contextBreadth'),
    t('exploreExecute.promptPrecision'),
    t('exploreExecute.iterationExpected'),
    t('exploreExecute.verificationNeeded'),
    t('exploreExecute.sessionLength')
  ]

  const exploreData = {
    label: t('exploreExecute.exploreMode'),
    data: [85, 40, 90, 50, 80],
    backgroundColor: 'rgba(96, 165, 250, 0.3)',
    borderColor: '#60a5fa',
    borderWidth: 2,
    pointBackgroundColor: '#60a5fa',
    pointBorderColor: '#fff',
    pointRadius: 5
  }

  const executeData = {
    label: t('exploreExecute.executeMode'),
    data: [30, 95, 25, 85, 30],
    backgroundColor: 'rgba(74, 222, 128, 0.3).',
    borderColor: '#4ade80',
    borderWidth: 2,
    pointBackgroundColor: '#4ade80',
    pointBorderColor: '#fff',
    pointRadius: 5
  }

  const getDatasets = () => {
    if (viewMode === 'explore') return [{ ...exploreData }]
    if (viewMode === 'execute') return [{ ...executeData }]
    return [{ ...exploreData }, { ...executeData }]
  }

  useEffect(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const datasets = getDatasets()

    if (chartRef.current) {
      chartRef.current.data.datasets = datasets
      chartRef.current.update('default')
    } else {
      chartRef.current = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: dimensions,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              min: 0,
              max: 100,
              beginAtZero: true,
              grid: { color: 'rgba(255,255,255,0.1)' },
              angleLines: { color: 'rgba(255,255,255,0.1)' },
              pointLabels: {
                color: '#eaeaea',
                font: { size: 12 }
              },
              ticks: {
                display: false,
                stepSize: 25
              }
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: '#eaeaea', padding: 15 }
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
  }, [viewMode, t])

  return (
    <div className="explore-execute-chart">
      <div className="chart-container" style={{ position: 'relative', height: '320px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="chart-controls">
        <button className={viewMode === 'explore' ? 'active' : ''} onClick={() => setViewMode('explore')}>
          {t('exploreExecute.exploreMode')}
        </button>
        <button className={viewMode === 'execute' ? 'active' : ''} onClick={() => setViewMode('execute')}>
          {t('exploreExecute.executeMode')}
        </button>
        <button className={viewMode === 'both' ? 'active' : ''} onClick={() => setViewMode('both')}>
          {t('exploreExecute.compareBoth')}
        </button>
      </div>
    </div>
  )
}
