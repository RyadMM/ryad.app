import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'

export default function InputQualityCascadeChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)
  const [inputQuality, setInputQuality] = useState(95)

  const calculateCascade = (inputQuality: number) => {
    const degradationFactors = [1, 0.92, 0.85, 0.78]
    const noiseFactor = (100 - inputQuality) * 0.015

    return degradationFactors.map((factor, i) => {
      const cascadedLoss = Math.pow(1 - noiseFactor, i + 1)
      return Math.max(10, Math.round(inputQuality * factor * cascadedLoss))
    })
  }

  useEffect(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const stages = [
      'Input Clarity',
      'Context Interpretation',
      'Reasoning Quality',
      'Output Accuracy'
    ]

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: stages,
        datasets: [{
          label: 'Quality %',
          data: calculateCascade(inputQuality),
          backgroundColor: (context) => {
            const value = context.raw as number
            if (value >= 70) return '#4ade80'
            if (value >= 50) return '#fb923c'
            return '#f87171'
          },
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            min: 0,
            max: 100,
            grid: { color: 'rgba(255,255,255,0.1)' },
            ticks: {
              color: '#a0a0a0',
              callback: (val) => val + '%'
            }
          },
          y: {
            grid: { display: false },
            ticks: { color: '#eaeaea' }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `Quality: ${context.raw}%`
            }
          }
        },
        animation: {
          duration: 400,
          easing: 'easeOutQuart'
        }
      }
    })

    return () => {
      if (chartRef.current) chartRef.current.destroy()
    }
  }, [inputQuality])

  return (
    <div className="input-quality-cascade-chart">
      <div className="chart-container" style={{ position: 'relative', height: '280px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="slider-container" style={{ marginTop: '1.5rem' }}>
        <div className="slider-label" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#a0a0a0', marginBottom: '0.5rem' }}>
          <span>Vague Input</span>
          <span>Clear Input</span>
        </div>
        <input
          type="range"
          min="20"
          max="100"
          value={inputQuality}
          onChange={(e) => setInputQuality(parseInt(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  )
}
