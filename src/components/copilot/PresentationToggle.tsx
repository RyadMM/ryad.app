import { useEffect } from 'react'

interface PresentationToggleProps {
  mode: 'article' | 'presentation'
  onToggle: () => void
}

export default function PresentationToggle({ mode, onToggle }: PresentationToggleProps) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') {
        onToggle()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [onToggle])

  return (
    <button
      onClick={onToggle}
      className="presentation-toggle"
      title={mode === 'article' ? 'Presentation mode (Press P)' : 'Article mode (Press P)'}
    >
      {mode === 'article' ? (
        <>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3" />
            <path d="M16 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" />
            <path d="M12 20v2" />
            <path d="M12 14v2" />
            <path d="M12 8v2" />
            <path d="M12 2v2" />
          </svg>
          <span>Presentation</span>
        </>
      ) : (
        <>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
          <span>Article</span>
        </>
      )}
    </button>
  )
}
