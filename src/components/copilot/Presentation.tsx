import { useEffect, useState, useRef } from 'react'
import type { ArticleSection as ArticleSectionType } from '@/data/copilot-article'
import ArticleSection from './ArticleSection'

interface PresentationProps {
  sections: ArticleSectionType[]
  lang?: 'en' | 'fr'
  onClose: () => void
}

export default function Presentation({ sections, lang = 'en', onClose }: PresentationProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter sections that have content
  const slides = sections.filter(s => s.content || s.chart)

  // Auto-enter fullscreen on mount
  useEffect(() => {
    const enterFullscreen = async () => {
      if (containerRef.current && !document.fullscreenElement) {
        try {
          await containerRef.current.requestFullscreen()
        } catch (e) {
          console.warn('Fullscreen denied:', e)
        }
      }
    }
    enterFullscreen()
  }, [])

  // Navigation with keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault()
          nextSlide()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          prevSlide()
          break
        case 'Home':
          e.preventDefault()
          setCurrentIndex(0)
          break
        case 'End':
          e.preventDefault()
          setCurrentIndex(slides.length - 1)
          break
        case 'Escape':
          onClose()
          break
        case 'f':
        case 'F':
          e.preventDefault()
          toggleFullscreen()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [slides.length])

  // Detect fullscreen exit (Esc, system shortcut) and return to article mode
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isInFullscreen = !!document.fullscreenElement
      setIsFullscreen(isInFullscreen)
      if (!isInFullscreen) {
        // User exited fullscreen - return to article mode
        onClose()
      }
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [onClose])

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const currentSlide = slides[currentIndex]
  const progress = ((currentIndex + 1) / slides.length) * 100

  // Get badge info from slide mapping if exists
  const getBadge = () => {
    const mapping = currentSlide.slideMapping
    if (mapping === undefined) return null

    const badges = [
      { text: '15-30 min', type: 'accent' as const },
      { text: 'Concept 1', type: 'accent' as const },
      { text: 'Concept 2', type: 'accent' as const },
      { text: 'Concept 3', type: 'accent' as const },
      { text: 'Concept 4', type: 'accent' as const },
      { text: 'Concept 5', type: 'accent' as const },
      { text: 'Concept 6', type: 'accent' as const },
      { text: 'Concept 7', type: 'accent' as const },
      { text: 'Concept 8', type: 'accent' as const },
      { text: 'Concept 9', type: 'accent' as const }
    ]

    return badges[mapping] || null
  }

  const badge = getBadge()

  return (
    <div ref={containerRef} className="slides-container" onClick={nextSlide}>
      {/* Progress Bar */}
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      {/* Fullscreen Button */}
      <button className="fullscreen-btn" onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {isFullscreen ? (
            <path d="M8 3v3a2 2 0 0 1-2 2H5m13 0h9a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-5 5v-5H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h9" />
          ) : (
            <path d="M8 3H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5" />
          )}
        </svg>
        <span>{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
      </button>

      {/* Slide */}
      <div className="slide active">
        <div className="slide-content">
          {badge && (
            <div className="text-center mb-8">
              <span className={`badge badge-${badge.type} animate-in`}>{badge.text}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-in delay-1 gradient-text">
            {currentSlide.title}
          </h1>

          <div className="prose-content animate-in delay-2" style={{ minHeight: 'auto' }}>
            <div dangerouslySetInnerHTML={{ __html: currentSlide.content }} />
          </div>

          {currentSlide.chart && (
            <div className="chart-wrapper animate-in delay-3" onClick={(e) => e.stopPropagation()}>
              <ArticleSection section={currentSlide} lang={lang} chartOnly={true} />
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="nav-controls" onClick={(e) => e.stopPropagation()}>
        <button
          className="nav-btn"
          onClick={prevSlide}
          disabled={currentIndex === 0}
          aria-label="Previous slide"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <span className="nav-indicator">
          {currentIndex + 1} / {slides.length}
        </span>

        <button
          className="nav-btn"
          onClick={nextSlide}
          disabled={currentIndex === slides.length - 1}
          aria-label="Next slide"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
