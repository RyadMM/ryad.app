import { useState } from 'react'
import { type ArticleSection } from '@/data/copilot-article'
import ArticleSection from './ArticleSection'
import PresentationToggle from './PresentationToggle'

interface ArticleProps {
  lang: 'en' | 'fr'
  sections: ArticleSection[]
}

export default function Article({ lang, sections }: ArticleProps) {
  const [viewMode, setViewMode] = useState<'article' | 'presentation'>('article')

  if (viewMode === 'presentation') {
    return (
      <div className="presentation-mode">
        <div className="presentation-placeholder">
          <p>Presentation Mode (Slides)</p>
          <p className="text-sm text-zinc-500 mt-2">
            The existing Slideshow component will be integrated here.
          </p>
        </div>
        <PresentationToggle mode="presentation" onToggle={() => setViewMode('article')} />
      </div>
    )
  }

  return (
    <div className="article-mode">
      <div className="sections-container">
        {sections.map((section) => (
          <ArticleSection key={section.id} section={section} lang={lang} />
        ))}
      </div>
      <PresentationToggle mode="article" onToggle={() => setViewMode('presentation')} />
    </div>
  )
}
