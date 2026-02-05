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

    // Dark mode optimized colors with higher opacity
    const isClean = scenario === 'clean'
    const baseColor = isClean ? '#10b981' : '#ef4444' // emerald-500 : red-500
    const glowColor = isClean ? '#34d399' : '#f87171' // emerald-400 : red-400

    chartRef.current = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Signal Pertinent', 'Bruit'],
        datasets: [{
          label: 'Qualité du Contexte',
          data: data,
          backgroundColor: isClean
            ? 'rgba(16, 185, 129, 0.5)'  // Increased from 0.2 to 0.5
            : 'rgba(239, 68, 68, 0.5)',   // Increased from 0.2 to 0.5
          borderColor: glowColor,
          borderWidth: 3,
          pointBackgroundColor: baseColor,
          pointBorderColor: glowColor,
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
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
