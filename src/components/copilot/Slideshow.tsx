import { useEffect, useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import Chart from 'chart.js/auto'
import { copilotSlides } from '@/data/copilot-slides'

interface ContextChartProps {
  onDataAdd: (dataset: number, amount: number) => void
  onReset: () => void
}

function ContextChart({ onDataAdd, onReset }: ContextChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)
  const [contextValue, setContextValue] = useState(0)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Contexte'],
        datasets: [{
          label: 'Occupation',
          data: [contextValue],
          backgroundColor: [
            contextValue > 80 ? 'rgba(239, 68, 68, 0.8)' :
            contextValue > 50 ? 'rgba(234, 88, 12, 0.8)' :
            'rgba(16, 185, 129, 0.8)'
          ],
          borderColor: [
            contextValue > 80 ? 'rgba(239, 68, 68, 1)' :
            contextValue > 50 ? 'rgba(234, 88, 12, 1)' :
            'rgba(16, 185, 129, 1)'
          ],
          borderWidth: 1,
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            min: 0,
            max: 100,
            ticks: {
              callback: (value) => value + '%',
              color: '#71717a'
            },
            grid: { color: '#27272a' }
          },
          y: { display: false }
        }
      }
    })

    chartRef.current = chart

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [contextValue])

  useEffect(() => {
    ;(window as any).addContext = onDataAdd
    ;(window as any).resetContext = () => {
      setContextValue(0)
      onReset()
    }
  }, [onDataAdd, onReset])

  return <canvas ref={canvasRef}></canvas>
}

interface DilutionChartProps {
  scenario: 'clean' | 'noise'
}

function DilutionChart({ scenario }: DilutionChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const data = scenario === 'clean' ? [85, 15] : [25, 75]

    const chart = new Chart(ctx, {
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
        plugins: {
          legend: { display: false }
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 25,
              color: '#71717a',
              backdropColor: 'transparent'
            },
            grid: { color: '#27272a' },
            angleLines: { color: '#27272a' },
            pointLabels: {
              color: '#a1a1aa',
              font: { size: 12 }
            }
          }
        }
      }
    })

    chartRef.current = chart

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [scenario])

  return <canvas ref={canvasRef}></canvas>
}

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [contextValue, setContextValue] = useState(0)
  const [scenario, setScenario] = useState<'clean' | 'noise'>('clean')
  const [showShortcuts, setShowShortcuts] = useState(false)

  const slides = copilotSlides
  const totalSlides = slides.length

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prev()
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
        case '?':
          setShowShortcuts(!showShortcuts)
          break
        case 'Escape':
          setShowShortcuts(false)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide, showShortcuts])

  // Setup charts and button handlers
  useEffect(() => {
    // Context chart (slide 1)
    const contextMount = document.getElementById('contextChartMount')
    if (contextMount && currentSlide === 1) {
      const root = createRoot(contextMount)
      root.render(
        <ContextChart
          onDataAdd={(dataset, amount) => {
            const newValue = Math.min(100, contextValue + amount)
            setContextValue(newValue)
            const statusEl = document.getElementById('contextStatus')
            if (statusEl) {
              if (newValue > 80) {
                statusEl.textContent = 'État : Saturé ⚠️'
                statusEl.className = 'text-center text-sm mt-4 text-red-400 mono'
              } else if (newValue > 50) {
                statusEl.textContent = 'État : Attention'
                statusEl.className = 'text-center text-sm mt-4 text-orange-400 mono'
              } else {
                statusEl.textContent = 'État : Optimal'
                statusEl.className = 'text-center text-sm mt-4 text-emerald-400 mono'
              }
            }
          }}
          onReset={() => {
            setContextValue(0)
            const statusEl = document.getElementById('contextStatus')
            if (statusEl) {
              statusEl.textContent = 'État : Optimal'
              statusEl.className = 'text-center text-sm mt-4 text-emerald-400 mono'
            }
          }}
        />
      )
    }

    // Dilution chart (slide 2)
    const dilutionMount = document.getElementById('dilutionChartMount')
    if (dilutionMount && currentSlide === 2) {
      const root = createRoot(dilutionMount)
      root.render(<DilutionChart scenario={scenario} />)
    }

    // Button handlers
    const contextBtns = document.querySelectorAll('.context-btn')
    contextBtns.forEach(btn => {
      const action = btn.getAttribute('data-action')
      btn.onclick = () => {
        const addContext = (window as any).addContext
        if (!addContext) return

        switch (action) {
          case 'addSmall':
            addContext(1, 5)
            break
          case 'addLarge':
            addContext(1, 30)
            break
          case 'addChat':
            addContext(2, 15)
            break
          case 'reset':
            ;(window as any).resetContext()
            break
        }
      }
    })

    // Scenario selectors
    const scenarioCards = document.querySelectorAll('.scenario-card')
    scenarioCards.forEach(card => {
      const cardScenario = card.getAttribute('data-scenario')
      card.onclick = () => {
        if (cardScenario === 'clean' || cardScenario === 'noise') {
          setScenario(cardScenario as 'clean' | 'noise')
          scenarioCards.forEach(c => c.classList.remove('selected'))
          card.classList.add('selected')

          const messageEl = document.getElementById('dilutionMessage')
          if (messageEl) {
            if (cardScenario === 'clean') {
              messageEl.innerHTML = '<strong>Résultat :</strong> Copilot comprend exactement ce que vous voulez. Le code généré utilise les bonnes variables et respecte le style.'
              messageEl.className = 'mt-4 p-3 bg-emerald-900/20 text-emerald-400 rounded-lg text-sm text-center'
            } else {
              messageEl.innerHTML = '<strong>Résultat :</strong> Copilot est distrait par le bruit. Réponse générique, variables aléatoires, pas de cohérence.'
              messageEl.className = 'mt-4 p-3 bg-red-900/20 text-red-400 rounded-lg text-sm text-center'
            }
          }
        }
      }
    })

  }, [currentSlide, contextValue, scenario])

  const next = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <>
      {/* Progress Bar */}
      <div class="progress-bar" style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}></div>

      {/* Fullscreen Button */}
      <button class="fullscreen-btn" onClick={toggleFullscreen} title="Mode présentation (F)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
        <span class="ml-2">Présentation</span>
      </button>

      {/* Slides */}
      <div class="slides-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            class={`slide ${index === currentSlide ? 'active' : ''} ${index < currentSlide ? 'prev' : ''}`}
            data-slide={index}
          >
            <div
              class="slide-content"
              dangerouslySetInnerHTML={{ __html: slide.content }}
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div class="nav-controls">
        <button onClick={prev} disabled={currentSlide === 0} class="nav-btn" title="Précédent (←)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <span class="nav-indicator mono">{currentSlide + 1} / {totalSlides}</span>
        <button onClick={next} disabled={currentSlide === totalSlides - 1} class="nav-btn" title="Suivant (→)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Shortcuts Modal */}
      {showShortcuts && (
        <div class="shortcuts-modal" onClick={() => setShowShortcuts(false)}>
          <div class="shortcuts-content" onClick={(e) => e.stopPropagation()}>
            <h3 class="text-lg font-semibold mb-4">Raccourcis clavier</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-zinc-400">Slide suivante</span>
                <div class="flex gap-1">
                  <span class="shortcut-key">→</span>
                  <span class="shortcut-key">Espace</span>
                </div>
              </div>
              <div class="flex justify-between">
                <span class="text-zinc-400">Slide précédente</span>
                <span class="shortcut-key">←</span>
              </div>
              <div class="flex justify-between">
                <span class="text-zinc-400">Mode présentation</span>
                <span class="shortcut-key">F</span>
              </div>
              <div class="flex justify-between">
                <span class="text-zinc-400">Quitter fullscreen</span>
                <span class="shortcut-key">Esc</span>
              </div>
              <div class="flex justify-between">
                <span class="text-zinc-400">Afficher aide</span>
                <span class="shortcut-key">?</span>
              </div>
            </div>
            <button
              onClick={() => setShowShortcuts(false)}
              class="mt-6 w-full py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  )
}
