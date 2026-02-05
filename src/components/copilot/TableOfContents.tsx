import { useEffect, useState } from 'react'
import { type ArticleSection } from '@/data/copilot-article'
import { useTranslations } from './useTranslations'

interface TableOfContentsProps {
  sections: ArticleSection[]
  lang?: 'en' | 'fr'
}

export default function TableOfContents({ sections, lang = 'en' }: TableOfContentsProps) {
  const t = useTranslations('toc', lang)
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      {
        threshold: 0.5,
        rootMargin: '-80px 0px -50% 0px'
      }
    )

    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="table-of-contents">
      <h3>{t('onThisPage')}</h3>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={active === section.id ? 'active' : ''}
              onClick={(e) => handleClick(e, section.id)}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
