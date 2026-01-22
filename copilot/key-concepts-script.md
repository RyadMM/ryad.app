# Concepts Clés et Script - Présentation Copilot Context

## Hook d'Introduction (3 minutes)

**Ouverture percutante:**
> "Vous utilisez Copilot tous les jours, mais savez-vous VRAIMENT comment il pense ? Aujourd'hui, on va ouvrir le capot et comprendre ce qui se passe sous le hood."

**La thèse:**
- La différence entre un utilisateur moyen et un expert = la maîtrise du contexte
- Copilot n'est pas intelligent, il est **contextuel**
- Le contexte est votre ressource la plus précieuse (et limitée!)

**Quick poll:**
- "Qui a déjà eu l'impression que Copilot 'oubliait' ce que vous lui aviez dit ?"
- "Qui a déjà ouvert 20 onglets et vu les suggestions se dégrader ?"

---

## PARTIE 1: L'Anatomie du Contexte (7 minutes)

### Concept 1: Qu'est-ce que le "Contexte" ?

**Définition technique:**
Le contexte = l'ensemble des informations que Copilot envoie au LLM pour générer une réponse.

**Formule simple:**
```
Contexte = System Prompt + Prefix + Suffix + Snippets + Imports
         └─────────┬────────────────┘
                   Total ≤ 128k tokens (ou autre limite)
```

**Métaphore:** Le contexte comme "mémoire de travail" d'un développeur
- Un humain peut garder ~7±2 concepts en tête
- Un LLM peut garder ~128k tokens (mais c'est HARD LIMIT)
- Tout ce qui dépasse est purement et simplement oublié

### Concept 2: Les Sources de Contexte

**Hiérarchie des sources (de la plus à la moins importante):**

| Source | Impact | Pourquoi ? |
|--------|--------|-----------|
| Prefix (avant curseur) | 100% | C'est la tâche actuelle |
| Suffix (après curseur) | 80% | Fill-in-the-middle |
| Visible code blocks | 70% | Ce que vous voyez |
| Referenced symbols | 60% | Ce que vous appelez |
| Open tabs | 40% | Ce que vous avez ouvert |
| Recent edits | 50% | Ce que vous touchez |
| Semantic matches | 30% | Ce qui ressemble |
| Import graph | 25% | Ce qui est importé |

**Insight clé:**
> Copilot ne "voit" pas votre projet. Il ne voit que ce que vous LUI donnez.

### Concept 3: Comment le Contexte est Construit

**Le pipeline en temps réel:**

```
1. Vous tapez une lettre
   ↓
2. IDE capture le signal (keystroke + curseur position)
   ↓
3. Plugin Copilot envoie une requête de contexte
   ↓
4. Context Retriever cherche les snippets pertinents:
   - Symbol graph traversal
   - Vector embedding search
   - Import graph analysis
   - Recent files scan
   ↓
5. Chaque snippet reçoit un SCORE:
   Score = (Proximité × 0.3) + (Récence × 0.3) + (Sémantique × 0.2) + (Symboles × 0.2)
   ↓
6. Snippets triés par score décroissant
   ↓
7. Prompt Assembler remplit le budget token:
   - Prefix (40%)
   - Suffix (20%)
   - Snippets rankés (30%)
   - Imports/constants (5%)
   - System prompt (5%)
   ↓
8. Tout ce qui dépasse 128k est DROPPÉ
   ↓
9. LLM génère la réponse
   ↓
10. Suggestion affichée dans l'IDE
```

**Fréquence:** Ce pipeline tourne à **chaque frappe** (ou quasi).

---

## PARTIE 2: La Fenêtre de Contexte et ses Limites (5 minutes)

### Concept 4: La Context Window - Le "Bottleneck"

**La réalité technique:**
- Copilot utilise divers modèles (GPT-4, Codex, etc.)
- Chaque modèle a une limite HARD de tokens
- 1 token ≈ 4 caractères ≈ 0.75 mot
- 128k tokens ≈ 96,000 mots ≈ 300 pages de code

**Le problème:**
> Votre projet peut faire 100,000+ lignes. Copilot n'en voit qu'une fraction.

### Concept 5: Le Sliding Window - Comment le Contexte "Glisse"

**Visualisation:**

Imaginez une fenêtre fixe qui se déplace sur un ruban infini:

```
Ruban de vos interactions:
[Chat 1] → [Chat 2] → [Chat 3] → [Chat 4] → [Chat 5] → ...

Fenêtre de contexte (taille fixe):
           └────────────┘
           Context Window
```

**Ce qui se passe:**
- Chat 1: Contexte A, B, C → tout rentre
- Chat 2: Contexte A, B, C, D → C est tronqué
- Chat 3: Contexte A, B, D, E → A, B sont perdus
- Chat 4: Contexte D, E, F → contexte initial complètement perdu

**Conséquence:**
> Plus vous interagissez, plus le contexte initial se dilue.

### Concept 6: La Context Decay - Pourquoi Copilot "Oublie"

**Le phénomène:**

```
Pertinence du contexte initial:
100% │╭─────────
     │╲
 75% │ ╲
     │  ╲___
 50% │      ╲___
     │         ╲___
 25% │            ╲_________
     │                     ╲___
  0% │──────────────────────────→ Interactions
     1    5    10   15   20   25
```

**Causes:**
1. **Time-decay:** Les vieux snippets perdent leur score de récence
2. **Budget limit:** Chaque nouveau message pousse les vieux vers la sortie
3. **Priority shift:** Vos nouvelles priorités évincent les anciennes

**Symptômes:**
- "Il ne se souvient plus de ce qu'on a dit au début"
- "Les suggestions deviennent hors sujet"
- "Il répète les mêmes erreurs qu'on avait corrigées"

---

## PARTIE 3: Context Engineering - Les Bonnes Pratiques (5 minutes)

### Concept 7: Les 4 Commandements du Contexte

#### 1️⃣ BE FOCUSED - Un fichier/un sujet à la fois

**Mauvais:**
```
15 onglets ouverts: UserService, README, docker-compose,
package.json, .env.example, CONTRIBUTING, ...
→ Contexte dilué, suggestions pauvres
```

**Bon:**
```
3 onglets pertinents: UserService, AuthUtils, PasswordReset
→ Contexte concentré, suggestions précises
```

#### 2️⃣ BE EXPLICIT - Utilisez @file, @workspace, @codebase

**Au lieu de:**
```
"Refactor la méthode d'auth"
→ Copilot doit deviner de quoi vous parlez
```

**Préférez:**
```
"@file UserService.ts refactor la méthode login()"
→ Contexte explicite, pas de confusion
```

#### 3️⃣ BE CONSISTENT - Gardez la même direction dans le chat

**Mauvais:**
```
User: "Ajoute l'auth JWT"
Copilot: "Voici le code..."
User: "Au fait, comment je configure Docker ?"
→ Changement de sujet = perte de contexte
```

**Bon:**
```
Chat 1: Implémentation de l'auth JWT
Chat 2: Configuration Docker
→ Un chat par tâche = contexte propre
```

#### 4️⃣ BE AWARE - Savez quand reset

**Signaux qu'il faut reset:**
- Changement de domaine (backend → frontend)
- Nouvelle fonctionnalité indépendante
- Contexte devenu confus ou contradictoire
- Après ~10-15 échanges sur le même sujet

**Comment reset:**
- Nouveau chat (⌘N / Ctrl+N)
- Ou "Start a new chat"

### Concept 8: Anti-patterns à Éviter

❌ **Context Dumping:**
```
"Voici tout mon codebase, analyse-le"
→ Impossible, trop de tokens, suggestions médiocres
```

✅ **Progressive Disclosure:**
```
"@file UserService.ts analyse l'auth"
Puis "@file AuthUtils.ts vérifie la cohérence"
→ Contexte construit progressivement
```

❌ **Context Switching:**
```
"Refactor l'auth"
"C'est quoi ta stack Docker ?"
"Au fait l'auth..."
→ Copilot est perdu
```

✅ **Task Isolation:**
```
Chat 1: Refactor auth
Chat 2: Questions Docker
→ Contextes séparés
```

❌ **Tab Explosion:**
```
20 onglets ouverts "au cas où"
→ Le retriever est noyé dans le bruit
```

✅ **Tab Hygiène:**
```
Garder 3-5 onglets MAX pertinents pour la tâche
→ Contexte propre, suggestions ciblées
```

---

## PARTIE 4: Comportement VSCode vs IntelliJ (3 minutes)

### Différences Clés

| Aspect | VSCode | IntelliJ |
|--------|--------|----------|
| **Fichiers inclus** | Onglets visibles + récents | Fichier actif + scope projet |
| **@workspace** | Scan large (peut trop inclure) | Plus sélectif (scope aware) |
| **Verbosité** | Plus bavard sur le contexte | Plus silencieux |
| **Risque** | Over-context (trop de bruit) | Under-context (manque de contexte) |

### Recette par IDE

**VSCode:**
- Fermez agressivement les onglets inutiles
- Utilisez @file pour forcer l'inclusion
- Créez des workspaces par fonctionnalité

**IntelliJ:**
- Utilisez les scopes de projet
- Ouvrez explicitement les fichiers nécessaires
- @workspace est plus sûr, mais vérifiez ce qui est inclus

---

## PARTIE 5: Conclusion et Takeaways (2 minutes)

### Les 3 Choses à Retenir

1️⃣ **Le contexte est votre ressource la plus précieuse**
   - Il est limité (128k tokens hard limit)
   - Il se dilue avec le temps
   - Il doit être cultivé consciemment

2️⃣ **Copilot n'est pas intelligent, il est contextuel**
   - Garbage in, garbage out
   - La qualité des suggestions = qualité du contexte
   - Vous êtes le "context engineer"

3️⃣ **Context Engineering est une compétence critique**
   - Comme le test-driven development
   - Comme le code review
   - Ça s'apprend et ça se pratique

### Action Items Immédiats

**Demain matin:**
1. Fermez tous les onglets inutiles
2. Créez un nouveau chat pour chaque tâche
3. Utilisez @file au lieu de laisser Copilot deviner
4. Reset le chat quand vous changez de sujet

**Long terme:**
1. Mettez en place `.github/copilot-instructions.md`
2. Documentez votre architecture (ARCHITECTURE.md)
3. Créez des chat modes pour vos workflows
4. Entrainez votre équipe sur le context engineering

---

## Bonus: Metaphores pour Expliquer

### La Métaphore du Buffet
- Le contexte est votre assiette (taille fixe)
- Vous pouvez vous resservir, mais chaque service remplace l'ancien
- Si vous mettez tout en même temps, c'est le bordel et rien n'est bon

### La Métaphore de la Conversation
- Plus vous parlez avec quelqu'un, plus vous avez de contexte partagé
- Mais si une troisième personne arrive et change de sujet, le contexte initial se perd
- C'est pourquoi les "nouveaux chats" sont comme "nouvelles conversations"

### La Métaphore de la Fenêtre Coulissante
- Imaginez une fenêtre fixe sur un ruban infini
- Quand de nouvelles infos arrivent, les anciennes sortent
- C'est mécanique, impitoyable, et inévitable

---

## Sources Citées

**Articles principaux:**
- [How GitHub Copilot Handles Multi-File Context Internally](https://www.linkedin.com/pulse/how-github-copilot-handles-multi-file-context-deep-dive-dixitt-qvunc) - Shallabh Dixitt, 2025
- [Set up a context engineering flow in VS Code](https://code.visualstudio.com/docs/copilot/guides/context-engineering-guide) - Microsoft Docs
- [11 Chunking Strategies for RAG](https://masteringllm.medium.com/11-chunking-strategies-for-rag-simplified-visualized-df0dbec8e373) - Mastering LLM

**Recherche académique:**
- [RAGVIZ: Diagnose and Visualizing RAG](https://aclanthology.org/2024.emnlp-demo.33.pdf) - EMNLP 2024
- [SelfBudgeter: Adaptive Token Allocation](https://arxiv.org/html/2505.11274v5) - ArXiv 2025

**Outils de visualisation:**
- [LLM Visualization](https://bbycroft.net/llm) - 3D Transformer visualization
- [Transformer Explainer](https://poloclub.github.io/transformer-explainer/) - Interactive attention visualization

---

## Timing Suggéré

| Section | Durée | Cumulé |
|---------|-------|--------|
| Hook + Intro | 3 min | 0:03 |
| Anatomie du contexte | 7 min | 0:10 |
| Fenêtre de contexte | 5 min | 0:15 |
| Context Engineering | 5 min | 0:20 |
| VSCode vs IntelliJ | 3 min | 0:23 |
| Conclusion + Q&A | 7 min | 0:30 |

**Total:** 30 minutes (incluant 5-7 min de Q&A)

---

## Notes pour le Présentateur

**Pendant la présentation:**
- Utilisez les visualisations générées pour illustrer chaque concept
- Faites des démos live si possible (montrer le contexte qui se dégrade)
- Posez des questions à l'audience pour garder l'engagement

**Live Demo Ideas:**
1. Ouvrir 3 fichiers pertinents → bonnes suggestions
2. Ouvrir 10 fichiers aléatoires → suggestions se dégradent
3. Faire @file explicite → suggestions retrouvent la qualité

**Anti-sèche:**
- Le contexte n'est pas "magique", c'est un pipeline technique
- Chaque frappe trigger un re-calcul complet
- Le budget token est HARD LIMIT, pas de négociation possible
- VSCode et IntelliJ ont des stratégies différentes d'inclusion
- Le context engineering s'apprend, comme toute compétence technique
