import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

interface EffortChartProps {
  className?: string
}

export default function EffortChart({ className = '' }: EffortChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    // Destroy existing chart if any
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Placard (Cintre)', 'Tiroir (Pliage)', 'Crochet', 'Bac Vrac'],
        datasets: [{
          label: 'Friction Cognitive',
          data: [8, 6, 2, 1],
          backgroundColor: [
            'rgba(168, 162, 158, 0.5)',
            'rgba(168, 162, 158, 0.5)',
            'rgba(234, 88, 12, 0.8)',
            'rgba(234, 88, 12, 0.8)',
          ],
          borderColor: [
            'rgba(168, 162, 158, 1)',
            'rgba(168, 162, 158, 1)',
            'rgba(234, 88, 12, 1)',
            'rgba(234, 88, 12, 1)',
          ],
          borderWidth: 1,
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => {
                const labels = [
                  'Ouvrir → Trouver cintre → Accrocher → Fermer',
                  'Ouvrir → Plier → Ranger → Fermer',
                  'Attraper → Accrocher (Fini)',
                  'Attraper → Jeter (Fini)',
                ]
                return labels[context.dataIndex] || ''
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Niveau d'effort",
              color: '#71717a',
            },
            ticks: { color: '#71717a' },
            grid: { color: '#e7e5e4' },
          },
          x: {
            ticks: { color: '#71717a' },
            grid: { display: false },
          },
        },
      },
    })

    chartRef.current = chart

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [])

  return (
    <div class={`chart-container ${className}`}>
      <canvas ref={canvasRef} id="effortChart"></canvas>
    </div>
  )
}
