import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'

export default function ContextCompositionChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)
  const [mode, setMode] = useState<'chat' | 'inline'>('chat')

  useEffect(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const labels = [
      'System Instructions',
      'Current File',
      'Conversation History',
      'Related Files',
      'Workspace Symbols'
    ]

    const chatData = [25, 20, 30, 15, 10]
    const inlineData = [10, 45, 5, 35, 5]

    const colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#60a5fa', '#22d3d8']

    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: mode === 'chat' ? chatData : inlineData,
          backgroundColor: colors,
          borderColor: '#16213e',
          borderWidth: 3,
          hoverOffset: 15
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '55%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#eaeaea',
              padding: 12,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.label}: ${context.raw}%`
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000,
          easing: 'easeOutQuart'
        }
      }
    })

    return () => {
      if (chartRef.current) chartRef.current.destroy()
    }
  }, [mode])

  return (
    <div className="context-composition-chart">
      <div className="chart-container" style={{ position: 'relative', height: '280px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="chart-controls">
        <button className={mode === 'chat' ? 'active' : ''} onClick={() => setMode('chat')}>
          Chat Mode
        </button>
        <button className={mode === 'inline' ? 'active' : ''} onClick={() => setMode('inline')}>
          Inline Completion
        </button>
      </div>
    </div>
  )
}
