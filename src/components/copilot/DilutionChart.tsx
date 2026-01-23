import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

type Scenario = 'clean' | 'noise'

interface DilutionChartProps {
  scenario: Scenario
}

export default function DilutionChart({ scenario }: DilutionChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const data = scenario === 'clean' ? [85, 15] : [25, 75]

    chartRef.current = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Signal Pertinent', 'Bruit'],
        datasets: [{
          label: 'Qualité du Contexte',
          data: data,
          backgroundColor: scenario === 'clean'
            ? 'rgba(16, 185, 129, 0.2)'
            : 'rgba(239, 68, 68, 0.2)',
          borderColor: scenario === 'clean'
            ? 'rgba(16, 185, 129, 1)'
            : 'rgba(239, 68, 68, 1)',
          borderWidth: 2,
          pointBackgroundColor: scenario === 'clean'
            ? 'rgba(16, 185, 129, 1)'
            : 'rgba(239, 68, 68, 1)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 500 },
        plugins: { legend: { display: false } },
        scales: {
          r: {
            min: 0, max: 100,
            ticks: {
              stepSize: 25,
              color: 'var(--color-chart-ticks)',
              backdropColor: 'transparent'
            },
            grid: { color: 'var(--color-chart-grid)' },
            angleLines: { color: 'var(--color-chart-grid)' },
            pointLabels: {
              color: 'var(--color-text-secondary)',
              font: { size: 12 }
            }
          }
        }
      }
    })

    return () => {
      if (chartRef.current) chartRef.current.destroy()
    }
  }, [scenario]) // Only re-create on scenario change

  return <canvas ref={canvasRef}></canvas>
}
