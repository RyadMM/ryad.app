export interface ArticleSection {
  id: string
  title: string
  content: string
  chart?: 'context-stack' | 'context-capacity' | 'prompt-iteration' | 'primacy' | 'dilution' | 'explore-execute' | null
  slideMapping?: number
}

export const copilotArticleSectionsFR: ArticleSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: `
      <p>La différence entre une interaction IA productive et une expérience frustrante vient souvent de l'IA elle-même : elle réside dans le contexte que vous fournissez.</p>
      <p>L'ingénierie du contexte est une compétence qui distingue les développeurs qui utilisent efficacement les outils IA de ceux qui luttent avec des résultats incohérents. À mesure que les assistants IA deviennent des outils standard, comprendre <em>comment</em> ils traitent le contexte est aussi important que de connaître les raccourcis de votre IDE.</p>
    `,
    slideMapping: 0
  },
  {
    id: 'context-window',
    title: 'La Fenêtre de Contexte',
    content: `
      <p>Les assistants IA comme GitHub Copilot n'ont pas accès à l'intégralité de votre base de code ou à une mémoire infinie. Ils opèrent dans une "mémoire de travail" à capacité fixe appelée <strong>fenêtre de contexte</strong>.</p>
      <p>Pensez-y comme un tableau blanc de taille fixe. Tout doit tenir, et le contenu plus ancien est effacé lorsque l'espace vient à manquer. Cette contrainte détermine ce que l'IA "connaît" à tout moment.</p>
      <p>La fenêtre de contexte comprend les prompts système, le contexte des fichiers, l'historique de conversation et votre prompt actuel. Tous se partageant le même espace limité. La composition varie entre le mode chat et la complétion en ligne, et dépend des fichiers que vous avez ouverts, du code que vous avez sélectionné et de votre historique de conversation.</p>
      <p>Les modèles modernes comme GPT 4.1 prennent en charge jusqu'à 128 000 jetons, mais cette limite reste finie et nécessite une gestion minutieuse.</p>
    `,
    chart: 'context-stack',
    slideMapping: 1
  },
  {
    id: 'prompt-iteration-strategy',
    title: 'La Stratégie d\'Itération',
    content: `
      <p>Une technique puissante : utiliser le chat comme brouillon. Commencez avec une version simple de votre question, laissez l'IA répondre, puis raffinez avec le feedback.</p>
      <p>Chaque itération améliore la qualité du signal. La réponse finale devient un excellent prompt pour votre vraie question.</p>
      <p><em>Exemple : au lieu de demander "Créer un système d'auth avec OAuth", commencez par "Comment structurer un user en React ?", puis itérez vers la solution complète.</em></p>
    `,
    chart: 'prompt-iteration',
    slideMapping: 2
  },
  {
    id: 'primacy',
    title: "L'Effet de Primauté et de Récence",
    content: `
      <p>Les informations au <strong>début</strong> et à la <strong>fin</strong> du contexte ont plus de poids. Le milieu est souvent "perdu". Les instructions enterrées au milieu de la conversation sont fréquemment ignorées.</p>
      <p>Ce n'est pas une bizarrerie. C'est fondamental pour le fonctionnement des mécanismes d'attention des transformeurs. Comprendre cela vous aide à structurer vos prompts efficacement. Répétez les contraintes importantes dans les longues sessions, et placez les informations critiques là où elles seront remarquées.</p>
    `,
    chart: 'primacy',
    slideMapping: 3
  },
  {
    id: 'dilution',
    title: 'La Dilution du Contexte',
    content: `
      <p>La dilution du contexte se produit lorsque des informations non pertinentes ou redondantes évincent ce qui compte. Chaque jeton de bruit réduit la place pour les jetons de signal.</p>
      <p>Causes courantes : inclure des fichiers entiers lorsqu'une seule fonction compte, des historiques de conversation longs et erratiques, copier-coller des traces d'erreur sans les nettoyer, ajouter des fichiers générés ou des fichiers de verrouillage que l'IA comprend déjà.</p>
      <p>La solution : soyez chirurgical dans vos sélections de code, commencez des sessions fraîches pour des tâches distinctes, et utilisez des délimiteurs explicites pour structurer les longs prompts.</p>
    `,
    chart: 'dilution',
    slideMapping: 5
  },
  {
    id: 'smart-engineer',
    title: "L'Analogie de l'Ingénieur Intelligent",
    content: `
      <p>Imaginez une IA agente comme un ingénieur très compétent qui vient de rejoindre votre équipe. Il a accès à votre base de code mais a zéro contexte préalable sur <em>votre problème spécifique</em>.</p>
      <p>Votre travail : fournir le <strong>contexte minimal et pertinent</strong> dont il a besoin — pas de vider tout le dépôt sur lui. L'objectif est la précision, pas le volume. Un ingénieur intelligent submergé d'informations non pertinentes produira de pires résultats que celui à qui l'on donne un contexte ciblé et actionnable.</p>
      <p>Cette analogie encadre tout ce qui suit : l'ingénierie du contexte consiste à être un bon lead technique pour votre assistant IA.</p>
    `,
    slideMapping: 4
  },
  {
    id: 'explore-execute',
    title: 'Mode Exploration vs Exécution',
    content: `
      <p>Différentes tâches nécessitent différentes approches.</p>
      <p><strong>Mode Exploration :</strong> Apprentissage, brainstorming, compréhension de code inconnu. Utilisez des questions ouvertes, un dialogue itératif. Un contexte plus large est acceptable.</p>
      <p><strong>Mode Exécution :</strong> Implémentation d'une tâche spécifique et bien définie. Utilisez des prompts précis avec des critères d'acceptation clairs. Contexte minimal et très pertinent.</p>
      <p>Le danger : mélanger les modes nuit à votre flux de travail. Envisagez de commencer une nouvelle session lorsque vous passez de l'exploration à l'exécution.</p>
    `,
    chart: 'explore-execute',
    slideMapping: 7
  },
  {
    id: 'principles',
    title: 'Principes Intemporels',
    content: `
      <p>L'ingénierie du contexte ne consiste pas à tromper l'IA — il s'agit de communication claire. Les mêmes compétences qui font de vous un bon collaborateur avec des humains s'appliquent ici : clarté, pertinence, structure.</p>
      <p><strong>Principes clés :</strong></p>
      <ul>
        <li>Le contexte est fini — traitez-le comme une ressource précieuse.</li>
        <li>La précision plutôt que le volume — donnez à l'IA ce dont elle a besoin, pas tout ce que vous avez.</li>
        <li>La structure compte — le début et la fin du contexte ont du poids.</li>
        <li>La qualité se compound — les petites ambiguïtés créent des erreurs plus importantes.</li>
        <li>Adaptez votre mode — l'exploration et l'exécution sont des flux de travail différents.</li>
        <li>Itérez sur vos prompts — le métatravail rapporte des dividendes.</li>
      </ul>
      <p>À mesure que les outils IA évoluent, les développeurs qui maîtrisent le contexte surpasseront constamment ceux qui ne le font pas.</p>
    `,
    slideMapping: 9
  }
]
