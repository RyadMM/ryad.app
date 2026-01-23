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

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Contexte'],
        datasets: [{
          label: 'Occupation',
          data: [value],
          backgroundColor: 'var(--color-success)',
          borderColor: 'var(--color-success)',
          borderWidth: 1,
          borderRadius: 4,
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
              color: 'var(--color-chart-ticks)'
            },
            grid: { color: 'var(--color-chart-grid)' }
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
    const colorVar = value > 80
      ? 'var(--color-danger)'
      : value > 50
        ? 'var(--color-warning)'
        : 'var(--color-success)'

    dataset.backgroundColor = colorVar
    dataset.borderColor = colorVar

    chart.update('none') // 'none' mode = no animation for smooth updates
  }, [value])

  return <canvas ref={canvasRef}></canvas>
}
