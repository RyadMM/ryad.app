# Présentation: Copilot Context Engineering

> Utilisation de Copilot : Comprendre le Contexte et les Fichiers Markdown comme Mémoire LEGO

**Audience:** Développeurs et QA
**Durée:** 20-30 minutes
**Format:** Teams meeting avec support visuel

---

## Structure de la Présentation

### PARTIE 1: Les Fondements du Contexte Copilot (12-15 min)

**Objectif:** Comprendre comment Copilot construit et utilise le contexte, sans entrer dans les détails techniques des tokens.

| Section | Durée | Contenu | Visualisation |
|---------|-------|---------|---------------|
| **Hook** | 3 min | Introduction percutante, quick poll | - |
| **Architecture** | 5 min | Le pipeline contexte, les sources de données | Visualisation 1: Architecture Complète |
| **Context Window** | 4 min | La fenêtre de contexte, ses limites, la dilution | Visualisation 4: Sliding Window |
| **Signaux & Scoring** | 3 min | Comment le contexte est scoré en temps réel | Visualisation 2: Context Lifecycle |

**Points clés à retenir:**
- Le contexte est limité et se dilue avec le temps
- Copilot n'est pas intelligent, il est contextuel
- Chaque interaction trigger un re-calcul complet du contexte
- VSCode et IntelliJ ont des stratégies différentes d'inclusion

---

### PARTIE 2: Les Fichiers Markdown comme Mémoire LEGO (8-12 min)

**Objectif:** Apprendre à utiliser les fichiers markdown pour créer une "mémoire externe" persistante et structurée.

| Section | Durée | Contenu | Visualisation |
|---------|-------|---------|---------------|
| **Concept LEGO** | 3 min | Métaphore des briques LEGO pour le contexte | Visualisation L1: 4 Briques Essentielles |
| **Les 4 Briques** | 4 min | ARCHITECTURE, PRODUCT, GUIDELINES, INSTRUCTIONS | Visualisation L5: Structure de Projet |
| **Exemples** | 3 min | Avant/Après, cas concrets | Visualisation L7: Feature Implémentation |
| **Quick Start** | 2 min | Checklist pour démarrer | Visualisation L10: Quick Start Guide |

**Points clés à retenir:**
- Les fichiers markdown = briques LEGO modulaires et réutilisables
- `copilot-instructions.md` est le "chef d'orchestre"
- Les @mentions connectent les briques entre elles
- ROI visible dès les premières utilisations

---

## Visualisations Disponibles

### Pour la Partie 1 (Fondements)

1. **Architecture Complète** - Le flux de l'IDE au LLM
2. **Context Lifecycle** - Signaux et scoring pipeline
3. **Token Budget** - Le funnel de priorisation
4. **Sliding Window** - Comment le contexte glisse
5. **Signal Spectrum** - Signaux actifs vs passifs
6. **Context Dilution** - Avant/Après comparaison
7. **Priority Queue** - Re-ranking en temps réel
8. **VSCode vs IntelliJ** - Comparatif comportemental
9. **Best Practices Flow** - Workflow décisionnel
10. **Attention Heatmap** - Comment le LLM "voit" le contexte

*Voir: `visualizations-descriptions.md` pour les descriptions détaillées*

### Pour la Partie 2 (LEGO)

1. **4 Briques Essentielles** - Les fichiers markdown clés
2. **Assemblage LEGO** - Avant/Après avec les fichiers
3. **Mécanisme @mention** - Comment les fichiers se connectent
4. **Flux Complet** - Workflow avec briques LEGO
5. **Structure Projet** - Où placer les fichiers
6. **Cycle de Vie** - Create, Use, Update
7. **Exemple Concret** - Implémentation de feature
8. **Anti-Pattern** - Contexte fragmenté vs centralisé
9. **ROI** - Investissement vs retour
10. **Quick Start** - Checklist de démarrage

*Voir: `visualizations-part2-lego.md` pour les descriptions détaillées*

---

## Contenu Détaillé

### Scripts et Notes

- **`key-concepts-script.md`** - Script complet avec talking points, timings, exemples
- **`part2-markdown-context-lego.md`** - Contenu détaillé de la partie 2 (LEGO)

### Sources de Recherche

- **`research-sources.md`** - Toutes les sources avec liens et résumés

**Sources principales:**
- [How GitHub Copilot Handles Multi-File Context](https://www.linkedin.com/pulse/how-github-copilot-handles-multi-file-context-deep-dive-dixitt-qvunc) - Shallabh Dixitt, 2025
- [Set up a context engineering flow in VS Code](https://code.visualstudio.com/docs/copilot/guides/context-engineering-guide) - Microsoft Docs
- [11 Chunking Strategies for RAG](https://masteringllm.medium.com/11-chunking-strategies-for-rag-simplified-visualized-df0dbec8e373) - Mastering LLM

---

## Timing Suggéré

```
0:00 - Introduction & Hook (3 min)
0:03 - Partie 1: Architecture du Contexte (5 min)
0:08 - Partie 1: Context Window & Dilution (4 min)
0:12 - Partie 1: Signaux & Scoring (3 min)
0:15 - Transition vers Partie 2 (2 min)
0:17 - Partie 2: Concept LEGO (3 min)
0:20 - Partie 2: Les 4 Briques (4 min)
0:24 - Partie 2: Exemples & Quick Start (3 min)
0:27 - Conclusion & Q&A (3 min)
```

**Total:** 30 minutes

---

## Pour le Présentateur

### Avant la présentation

1. **Générer les visuels**
   - Utiliser les descriptions dans `visualizations-descriptions.md` et `visualizations-part2-lego.md`
   - Outils recommandés: DALL-E 3, Midjourney, ou outils de diagramme (Lucidchart, diagrams.com)

2. **Préparer les démos (optionnel)**
   - Avoir un projet de test prêt
   - Montrer l'effet de l'ouverture de trop d'onglets
   - Démontrer l'effet des fichiers markdown contexte

### Pendant la présentation

- **Engagement:** Poser des questions à l'audience tous les 5-7 min
- **Visuals:** Chaque concept doit avoir une visuel associé
- **Demos:** Les démos live sont très efficaces pour illustrer la dilution du contexte

### Messages clés à faire passer

1. **Le contexte est votre ressource la plus précieuse**
2. **Copilot n'est pas intelligent, il est contextuel**
3. **Les fichiers markdown sont des actifs de contexte, pas de la documentation passive**
4. **Context Engineering est une compétence qui s'apprend**

### Anti-sèche

**Partie 1 - Fondements:**
- Contexte = System Prompt + Prefix + Snippets + Imports (≤128k tokens)
- Pipeline: IDE → Plugin → Retriever → Scorer → Assembler → LLM
- Le contexte se dilue avec les interactions (sliding window)
- VSCode: plus inclusif, IntelliJ: plus sélectif

**Partie 2 - LEGO:**
- 4 briques: ARCHITECTURE.md, PRODUCT.md, GUIDELINES.md, copilot-instructions.md
- copilot-instructions.md est le "chef d'orchestre" avec des @mentions
- Créer les 4 fichiers = ~2 heures, ROI immédiat
- KISS: max 2 pages par fichier

---

## Organisation des Fichiers

```
copilot-pres/
├── README.md                          <- Ce fichier
├── research-sources.md                <- Sources de recherche
├── key-concepts-script.md             <- Script détaillé présentation
├── visualizations-descriptions.md     <- Descriptions visuels Partie 1
├── part2-markdown-context-lego.md     <- Contenu détaillé Partie 2
└── visualizations-part2-lego.md       <- Descriptions visuels Partie 2
```

---

## Prochaines Étapes

1. ✅ Recherche terminée
2. ✅ Contenu structuré
3. ⏳ Générer les visuels avec un outil externe
4. ⏳ Pratiquer la présentation
5. ⏳ Recueillir feedback et itérer

---

## Sources

Toutes les sources sont documentées dans `research-sources.md` avec liens hypertexte.

**Sources principales:**
- LinkedIn: [How GitHub Copilot Handles Multi-File Context Internally](https://www.linkedin.com/pulse/how-github-copilot-handles-multi-file-context-deep-dive-dixitt-qvunc)
- Microsoft Docs: [Set up a context engineering flow in VS Code](https://code.visualstudio.com/docs/copilot/guides/context-engineering-guide)
- Medium: [11 Chunking Strategies for RAG](https://masteringllm.medium.com/11-chunking-strategies-for-rag-simplified-visualized-df0dbec8e373)
- Visualisation: [LLM Visualization](https://bbycroft.net/llm)
- Research: [RAGVIZ Paper](https://aclanthology.org/2024.emnlp-demo.33.pdf)
