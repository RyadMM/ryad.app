import { useState } from 'react'
import type { ArticleSection as ArticleSectionType } from '@/data/copilot-article'
import ArticleSection from './ArticleSection'
import PresentationToggle from './PresentationToggle'
import Presentation from './Presentation'

interface ArticleProps {
  lang: 'en' | 'fr'
  sections: ArticleSectionType[]
}

export default function Article({ lang, sections }: ArticleProps) {
  const [viewMode, setViewMode] = useState<'article' | 'presentation'>('article')

  if (viewMode === 'presentation') {
    return (
      <Presentation
        sections={sections}
        lang={lang}
        onClose={() => setViewMode('article')}
      />
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
