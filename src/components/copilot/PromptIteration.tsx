import { useTranslations } from './useTranslations'

interface PromptIterationProps {
  lang?: 'en' | 'fr'
}

type Locale = 'en' | 'fr'

export default function PromptIteration({ lang = 'en' as Locale }: PromptIterationProps) {
  const t = useTranslations('contextStack', lang)

  // Translations for this component
  const i18n = {
    en: {
      title: 'Prompt Iteration Strategy',
      draft: 'Draft',
      refinement: 'Refinement',
      final: 'Final',
      draftDesc: '"Create React function"',
      refinementDesc: '"Add error handling"',
      finalDesc: '"Optimized version"',
      draftPrompt: 'Prompt v1',
      refinementPrompt: 'Prompt v2',
      finalPrompt: 'Prompt v3',
      signal: 'Signal',
      demonstrate: '▶ Demonstrate Iteration'
    },
    fr: {
      title: "Stratégie d'Itération de Prompt",
      draft: 'Brouillon',
      refinement: 'Raffinement',
      final: 'Final',
      draftDesc: '"Créer fonction React"',
      refinementDesc: '"Ajouter error handling"',
      finalDesc: '"Version optimisée"',
      draftPrompt: 'Prompt v1',
      refinementPrompt: 'Prompt v2',
      finalPrompt: 'Prompt v3',
      signal: 'Signal',
      demonstrate: '▶ Démontrer l\'itération'
    }
  }

  const text = i18n[lang]

  const steps = [
    { label: text.draft, desc: text.draftDesc, signal: 30, prompt: text.draftPrompt },
    { label: text.refinement, desc: text.refinementDesc, signal: 60, prompt: text.refinementPrompt },
    { label: text.final, desc: text.finalDesc, signal: 95, prompt: text.finalPrompt }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      {/* Title */}
      <h3 style={{
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#a0a0a0',
        textAlign: 'center',
        margin: 0
      }}>
        {text.title}
      </h3>

      {/* Visualization */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        alignItems: 'stretch'
      }}>
        {steps.map((step, index) => {
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                transition: 'all 0.5s ease-out',
                opacity: 1,
                transform: 'translateY(0)'
              }}
            >
              {/* Step card */}
              <div style={{
                flex: 1,
                minHeight: '140px',
                border: `3px solid ${step.signal >= 60 ? '#4ade80' : step.signal >= 50 ? '#fb923c' : '#f87171'}`,
                borderRadius: '12px',
                background: `${step.signal >= 60 ? 'rgba(74,222,128,0.15)' : step.signal >= 50 ? 'rgba(251,146,60,0.15)' : 'rgba(248,113,113,0.15)'}`,
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.5s ease-out'
              }}>
                {/* Step label */}
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: step.signal >= 60 ? '#4ade80' : step.signal >= 50 ? '#fb923c' : '#f87171',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem'
                }}>
                  {step.label}
                </div>

                {/* Prompt version */}
                <div style={{
                  fontSize: '0.75rem',
                  color: '#a0a0a0',
                  marginBottom: '0.5rem',
                  opacity: 0.8
                }}>
                  {step.prompt}
                </div>

                {/* Description */}
                <div style={{
                  fontSize: '0.8rem',
                  color: '#eaeaea',
                  textAlign: 'center',
                  marginBottom: '1rem',
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {step.desc}
                </div>

                {/* Signal bar */}
                <div style={{ width: '100%' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    marginBottom: '0.25rem',
                    color: '#a0a0a0'
                  }}>
                    <span>{text.signal}</span>
                    <span style={{
                      color: step.signal >= 60 ? '#4ade80' : step.signal >= 50 ? '#fb923c' : '#f87171',
                      fontWeight: 600
                    }}>
                      {step.signal}%
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div
                      style={{
                        width: `${step.signal}%`,
                        height: '100%',
                        background: step.signal >= 60 ? '#4ade80' : step.signal >= 50 ? '#fb923c' : '#f87171',
                        borderRadius: '4px',
                        transition: 'width 1s ease-out',
                        boxShadow: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @media (max-width: 768px) {
          .prompt-iteration-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
