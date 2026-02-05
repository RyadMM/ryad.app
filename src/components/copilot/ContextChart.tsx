import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

interface ContextChartProps {
  value: number
}

export default function ContextChart({ value }: ContextChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  // Initialize chart once
  useEffect(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    // Dark mode optimized colors - more vibrant
    const getBarColor = (val: number) => {
      if (val > 80) return { bg: 'rgba(239, 68, 68, 0.7)', border: '#f87171' } // red
      if (val > 50) return { bg: 'rgba(245, 158, 11, 0.7)', border: '#fbbf24' } // amber
      return { bg: 'rgba(16, 185, 129, 0.7)', border: '#34d399' } // emerald
    }

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Contexte'],
        datasets: [{
          label: 'Occupation',
          data: [value],
          backgroundColor: getBarColor(value).bg,
          borderColor: getBarColor(value).border,
          borderWidth: 2,
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 300 },
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: {
          x: {
            min: 0, max: 100,
            ticks: {
              callback: (v) => v + '%',
              color: '#a3a3a3',
              font: { size: 13, weight: '500' }
            },
            grid: {
              color: '#333333',
              drawBorder: false
            }
          },
          y: { display: false }
        }
      }
    })

    return () => {
      if (chartRef.current) chartRef.current.destroy()
    }
  }, []) // Empty deps = initialize once

  // Update chart data when value prop changes
  useEffect(() => {
    if (!chartRef.current) return
    const chart = chartRef.current
    const dataset = chart.data.datasets[0]

    dataset.data = [value]

    // Update color based on value
    const getBarColor = (val: number) => {
      if (val > 80) return { bg: 'rgba(239, 68, 68, 0.7)', border: '#f87171' } // red
      if (val > 50) return { bg: 'rgba(245, 158, 11, 0.7)', border: '#fbbf24' } // amber
      return { bg: 'rgba(16, 185, 129, 0.7)', border: '#34d399' } // emerald
    }

    const colors = getBarColor(value)
    dataset.backgroundColor = colors.bg
    dataset.borderColor = colors.border

    chart.update('none') // 'none' mode = no animation for smooth updates
  }, [value])

  return <canvas ref={canvasRef}></canvas>
}
