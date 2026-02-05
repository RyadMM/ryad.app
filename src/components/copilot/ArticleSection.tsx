import { type ArticleSection as ArticleSectionType } from '@/data/copilot-article'
import ContextStack from './ContextStack'
import ContextCapacityChart from './charts/ContextCapacityChart'
import PromptIteration from './PromptIteration'
import PrimacyRecencyChart from './charts/PrimacyRecencyChart'
import ContextDilutionChart from './charts/ContextDilutionChart'
import ExploreExecuteChart from './charts/ExploreExecuteChart'

interface ArticleSectionProps {
  section: ArticleSectionType
  lang?: 'en' | 'fr'
}

export default function ArticleSection({ section, lang }: ArticleSectionProps) {
  const renderChart = () => {
    switch (section.chart) {
      case 'context-stack':
        return <ContextStack lang={lang} />
      case 'context-capacity':
        return <ContextCapacityChart lang={lang} />
      case 'prompt-iteration':
        return <PromptIteration lang={lang} />
      case 'primacy':
        return <PrimacyRecencyChart lang={lang} />
      case 'dilution':
        return <ContextDilutionChart lang={lang} />
      case 'explore-execute':
        return <ExploreExecuteChart lang={lang} />
      default:
        return null
    }
  }

  return (
    <section id={section.id} className="article-section">
      <h2>{section.title}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: section.content }}
        className="prose-content"
      />
      {section.chart && (
        <div className="chart-wrapper">
          {renderChart()}
        </div>
      )}
    </section>
  )
}
