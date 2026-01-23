import { useEffect, useState, useCallback, useMemo } from 'react'
import { copilotSlides } from '@/data/copilot-slides'
import ContextChart from './ContextChart'
import DilutionChart from './DilutionChart'

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [contextValue, setContextValue] = useState(0)
  const [scenario, setScenario] = useState<'clean' | 'noise'>('clean')
  const [showShortcuts, setShowShortcuts] = useState(false)

  const slides = copilotSlides
  const totalSlides = slides.length

  // Navigation handlers (stable callbacks)
  const next = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1))
  }, [totalSlides])

  const prev = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0))
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }, [])

  // Context manipulation handlers (stable callbacks)
  const handleAddSmall = useCallback(() => {
    setContextValue(v => Math.min(v + 5, 100))
  }, [])

  const handleAddLarge = useCallback(() => {
    setContextValue(v => Math.min(v + 30, 100))
  }, [])

  const handleAddChat = useCallback(() => {
    setContextValue(v => Math.min(v + 15, 100))
  }, [])

  const handleReset = useCallback(() => {
    setContextValue(0)
  }, [])

  const handleScenarioChange = useCallback((newScenario: 'clean' | 'noise') => {
    setScenario(newScenario)
  }, [])

  // Derived state (memoized)
  const contextStatus = useMemo(() => {
    if (contextValue > 80) {
      return { text: 'État : Saturé ⚠️', className: 'text-red-400 mono' }
    } else if (contextValue > 50) {
      return { text: 'État : Attention', className: 'text-orange-400 mono' }
    }
    return { text: 'État : Optimal', className: 'text-emerald-400 mono' }
  }, [contextValue])

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
          e.preventDefault()
          toggleFullscreen()
          break
        case '?':
          e.preventDefault()
          setShowShortcuts(s => !s)
          break
        case 'Escape':
          setShowShortcuts(false)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [next, prev, toggleFullscreen])

  return (
    <>
      {/* Progress Bar */}
      <div className="progress-bar" style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}></div>

      {/* Fullscreen Button */}
      <button className="fullscreen-btn" onClick={toggleFullscreen} title="Mode présentation (F)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
        <span className="ml-2">Présentation</span>
      </button>

      {/* Slides */}
      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''} ${index < currentSlide ? 'prev' : ''}`}
            data-slide={index}
          >
            <div className="slide-content">
              {slide.id === 1 ? (
                <ContextSlide
                  content={slide.content}
                  contextValue={contextValue}
                  status={contextStatus}
                  onAddSmall={handleAddSmall}
                  onAddLarge={handleAddLarge}
                  onAddChat={handleAddChat}
                  onReset={handleReset}
                />
              ) : slide.id === 2 ? (
                <DilutionSlide
                  content={slide.content}
                  scenario={scenario}
                  onScenarioChange={handleScenarioChange}
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: slide.content }} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="nav-controls">
        <button onClick={prev} disabled={currentSlide === 0} className="nav-btn" title="Précédent (←)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <span className="nav-indicator mono">{currentSlide + 1} / {totalSlides}</span>
        <button onClick={next} disabled={currentSlide === totalSlides - 1} className="nav-btn" title="Suivant (→)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Shortcuts Modal */}
      {showShortcuts && (
        <div className="shortcuts-modal" onClick={() => setShowShortcuts(false)}>
          <div className="shortcuts-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Raccourcis clavier</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Slide suivante</span>
                <div className="flex gap-1">
                  <span className="shortcut-key">→</span>
                  <span className="shortcut-key">Espace</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Slide précédente</span>
                <span className="shortcut-key">←</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Mode présentation</span>
                <span className="shortcut-key">F</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Quitter fullscreen</span>
                <span className="shortcut-key">Esc</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Afficher aide</span>
                <span className="shortcut-key">?</span>
              </div>
            </div>
            <button
              onClick={() => setShowShortcuts(false)}
              className="mt-6 w-full py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  )
}

// Context Simulator Slide Component
function ContextSlide({
  content,
  contextValue,
  status,
  onAddSmall,
  onAddLarge,
  onAddChat,
  onReset,
}: {
  content: string
  contextValue: number
  status: { text: string; className: string }
  onAddSmall: () => void
  onAddLarge: () => void
  onAddChat: () => void
  onReset: () => void
}) {
  // Extract the static content parts (everything before the simulator)
  const staticContent = content.replace(/<div class="card mt-6 animate-in delay-4">[\s\S]*$/, '')

  return (
    <div className="max-w-6xl w-full">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div dangerouslySetInnerHTML={{ __html: staticContent }} />

          {/* Interactive controls */}
          <div className="card animate-in delay-4">
            <p className="text-sm text-zinc-400 mb-4">Simulateur : Ajoutez des éléments pour voir l'impact</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={onAddSmall} className="px-3 py-1.5 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-lg transition">
                + Petit fichier (5%)
              </button>
              <button onClick={onAddLarge} className="px-3 py-1.5 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-lg transition">
                + Gros module (30%)
              </button>
              <button onClick={onAddChat} className="px-3 py-1.5 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-lg transition">
                + Chat history (15%)
              </button>
              <button onClick={onReset} className="px-3 py-1.5 text-sm bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded-lg transition">
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="card animate-in delay-2">
          <h3 className="text-lg font-semibold mb-4 text-center">Occupation de la fenêtre</h3>
          <div className="chart-container" style={{ position: 'relative', height: '250px' }}>
            <ContextChart value={contextValue} />
          </div>
          <p id="contextStatus" className={`text-center text-sm mt-4 ${status.className}`}>
            {status.text}
          </p>
        </div>
      </div>
    </div>
  )
}

// Dilution Scenario Slide Component
function DilutionSlide({
  content,
  scenario,
  onScenarioChange,
}: {
  content: string
  scenario: 'clean' | 'noise'
  onScenarioChange: (scenario: 'clean' | 'noise') => void
}) {
  // Extract the header content
  const headerContent = content.match(/<div class="text-center mb-12">[\s\S]*?<\/div>/)?.[0] || ''

  return (
    <div className="max-w-6xl w-full">
      <div className="text-center mb-12">
        <div dangerouslySetInnerHTML={{ __html: headerContent }} />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-4 animate-in delay-1">
          <div
            className={`card scenario-card ${scenario === 'clean' ? 'selected' : ''}`}
            onClick={() => onScenarioChange('clean')}
          >
            <h4 className="font-semibold mb-2">Scenario A : Focus</h4>
            <p className="text-sm text-zinc-500">2 fichiers ouverts. Question précise. Contexte Markdown présent.</p>
            <div className="mt-3">
              <span className="badge badge-success">Signal fort</span>
            </div>
          </div>
          <div
            className={`card scenario-card ${scenario === 'noise' ? 'selected' : ''}`}
            onClick={() => onScenarioChange('noise')}
          >
            <h4 className="font-semibold mb-2">Scenario B : Chaos</h4>
            <p className="text-sm text-zinc-500">15 onglets ouverts (vieux logs, configs). Question vague. Chat long.</p>
            <div className="mt-3">
              <span className="badge badge-danger">Bruit élevé</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 card animate-in delay-2">
          <h3 className="text-lg font-semibold mb-4 text-center">Impact sur la qualité</h3>
          <div className="chart-container" style={{ position: 'relative', height: '250px' }}>
            <DilutionChart scenario={scenario} />
          </div>
          <p id="dilutionMessage" className={`mt-4 p-3 rounded-lg text-sm text-center ${
            scenario === 'clean'
              ? 'bg-emerald-900/20 text-emerald-400'
              : 'bg-red-900/20 text-red-400'
          }`}>
            <strong>Résultat :</strong> {
              scenario === 'clean'
                ? 'Copilot comprend exactement ce que vous voulez. Le code généré utilise les bonnes variables et respecte le style.'
                : 'Copilot est distrait par le bruit. Réponse générique, variables aléatoires, pas de cohérence.'
            }
          </p>
        </div>
      </div>
    </div>
  )
}
