import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function IdeComparisonChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const categories = [
      'Feature Release Speed',
      'Language Intelligence',
      'Extension Ecosystem',
      'Startup Performance',
      'Refactoring Tools',
      'Copilot Parity'
    ]

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: categories,
        datasets: [
          {
            label: 'VS Code',
            data: [95, 70, 95, 90, 65, 100],
            backgroundColor: '#60a5fa',
            borderRadius: 4
          },
          {
            label: 'IntelliJ',
            data: [70, 95, 75, 60, 95, 85],
            backgroundColor: '#f97316',
            borderRadius: 4
          }
        ]
      },
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
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              color: '#eaeaea',
              maxRotation: 45,
              minRotation: 45,
              font: { size: 11 }
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#eaeaea', padding: 15 }
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.raw}%`
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuart',
          delay: (context) => context.dataIndex * 100
        }
      }
    })

    return () => {
      if (chartRef.current) chartRef.current.destroy()
    }
  }, [])

  return (
    <div className="ide-comparison-chart">
      <div className="chart-container" style={{ position: 'relative', height: '300px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  )
}
