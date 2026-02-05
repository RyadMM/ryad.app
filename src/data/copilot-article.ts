export interface ArticleSection {
  id: string
  title: string
  content: string
  chart?: 'context-stack' | 'context-capacity' | 'prompt-iteration' | 'primacy' | 'dilution' | 'explore-execute' | null
  slideMapping?: number
}

export const copilotArticleSections: ArticleSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: `
      <p>The difference between a productive AI interaction and a frustrating one often isn't the AI—it's the context you provide.</p>
      <p>Context engineering is a skill that separates developers who use AI tools effectively from those who struggle with inconsistent results. As AI assistants become standard tooling, understanding <em>how</em> they process context is as important as knowing your IDE shortcuts.</p>
    `,
    slideMapping: 0
  },
  {
    id: 'context-window',
    title: 'The Context Window',
    content: `
      <p>AI assistants like GitHub Copilot don't have access to your entire codebase or infinite memory. They operate within a fixed-capacity "working memory" called the <strong>context window</strong>.</p>
      <p>Think of it as a whiteboard of fixed size—everything must fit, and older content gets erased when space runs out. This constraint determines what the AI "knows" at any given moment.</p>
      <p>The context window includes: system prompts, file context, conversation history, and your current prompt—all competing for the same limited space. The composition varies between chat mode and inline completion, and depends on what files you have open, what code you've selected, and your conversation history.</p>
      <p>Modern models like Claude 4.1 support up to 128,000 tokens, but this limit is still finite and requires careful management.</p>
    `,
    chart: 'context-stack',
    slideMapping: 1
  },
  {
    id: 'primacy',
    title: 'The Primacy & Recency Effect',
    content: `
      <p>Information at the <strong>beginning</strong> and <strong>end</strong> of context carries more weight. The middle often gets "lost"—instructions buried mid-conversation are frequently ignored.</p>
      <p>This isn't a quirk; it's fundamental to how transformer attention mechanisms work. Understanding this helps you structure prompts effectively: restate important constraints in long sessions, and place critical information where it will be noticed.</p>
    `,
    chart: 'primacy',
    slideMapping: 3
  },
  {
    id: 'dilution',
    title: 'Context Dilution',
    content: `
      <p>Context dilution occurs when irrelevant or redundant information crowds out what matters. Every token of noise competes with tokens of signal.</p>
      <p>Common causes: including entire files when only a function matters, long meandering conversation histories, copy-pasting stack traces without trimming, adding generated files or lockfiles that the AI already understands.</p>
      <p>The fix: be surgical with code selections, start fresh sessions for distinct tasks, and use explicit delimiters to structure long prompts.</p>
    `,
    chart: 'dilution',
    slideMapping: 5
  },
  {
    id: 'smart-engineer',
    title: 'The Smart Engineer Analogy',
    content: `
      <p>Imagine an agentic AI as a highly capable engineer who just joined your team. They have access to your codebase but zero prior context about <em>your specific problem</em>.</p>
      <p>Your job: provide the <strong>minimal, relevant</strong> context they need—not dump the entire repo on them. The goal is precision, not volume. A smart engineer overwhelmed with irrelevant information will produce worse results than one given focused, actionable context.</p>
      <p>This analogy frames everything that follows: context engineering is about being a good technical lead to your AI assistant.</p>
    `,
    slideMapping: 4
  },
  {
    id: 'explore-execute',
    title: 'Explore vs Execute Mode',
    content: `
      <p>Different tasks require different approaches:</p>
      <p><strong>Exploration Mode:</strong> Learning, brainstorming, understanding unfamiliar code. Use open-ended questions, iterative dialogue. Broader context is acceptable.</p>
      <p><strong>Execution Mode:</strong> Implementing a specific, well-defined task. Use precise prompts with clear acceptance criteria. Minimal, highly relevant context.</p>
      <p>The danger: mixing modes pollutes your workflow. Consider starting a fresh session when switching between exploration and execution.</p>
    `,
    chart: 'explore-execute',
    slideMapping: 7
  },
  {
    id: 'principles',
    title: 'Timeless Principles',
    content: `
      <p>Context engineering isn't about tricking the AI—it's about clear communication. The same skills that make you a good collaborator with humans apply here: clarity, relevance, structure.</p>
      <p><strong>Key principles:</strong></p>
      <ul>
        <li>Context is finite—treat it as a precious resource.</li>
        <li>Precision over volume—give the AI what it needs, not everything you have.</li>
        <li>Structure matters—beginning and end of context carry weight.</li>
        <li>Quality compounds—small ambiguities cascade into larger errors.</li>
        <li>Match your mode—explore and execute are different workflows.</li>
        <li>Iterate on your prompts—meta-work pays dividends.</li>
      </ul>
      <p>As AI tooling evolves, the developers who master context will consistently outperform those who don't.</p>
    `,
    slideMapping: 9
  }
]
