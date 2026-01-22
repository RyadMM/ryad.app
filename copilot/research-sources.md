# Sources de Recherche - Copilot Context Engineering

## Articles Techniques Principaux

### 1. [How GitHub Copilot Handles Multi-File Context Internally](https://www.linkedin.com/pulse/how-github-copilot-handles-multi-file-context-deep-dive-dixitt-qvunc)
**Auteur:** Shallabh Dixitt | **Date:** Mai 2025

**Contenu clé:**
- Architecture end-to-end du système multi-fichiers
- Context Retriever: symboles, embeddings, imports, graphes
- Prompt Assembler avec gestion de budget token
- Recalcul en temps réel à chaque frappe
- Priority Queue dynamique

**Diagrammes disponibles:**
- Fig 1: High-level system flow (IDE → Plugin → Retriever → Assembler → LLM)
- Fig 2: Context gathering lifecycle (signaux, scoring, ranking)
- Fig 3: Token budget filtering et prompt construction
- Fig 4: User Signal Spectrum (actif vs passif)
- Fig 5: Dynamic Context Re-Evaluation Pipeline
- Priority Queue Refresh flow

### 2. [Set up a context engineering flow in VS Code](https://code.visualstudio.com/docs/copilot/guides/context-engineering-guide)
**Source:** Microsoft Documentation

**Contenu clé:**
- Workflow context engineering en 3 étapes
- Custom instructions (.github/copilot-instructions.md)
- Chat modes pour différents workflows
- Prompt files réutilisables
- Best practices et anti-patterns

### 3. [11 Chunking Strategies for RAG — Simplified & Visualized](https://masteringllm.medium.com/11-chunking-strategies-for-rag-simplified-visualized-df0dbec8e373)
**Auteur:** Mastering LLM

**Visualisations disponibles:**
- Fixed-Length Chunking
- Sentence-Based Chunking
- Paragraph-Based Chunking
- **Sliding Window Chunking** (très pertinent)
- Semantic Chunking
- Recursive Chunking
- Context-Enriched Chunking
- Modality-Specific Chunking
- Agentic Chunking
- Subdocument Chunking
- Hybrid Chunking

### 4. [LLM Visualization](https://bbycroft.net/llm)
**Type:** Visualisation interactive 3D

**Contenu:**
- Animation du token flow dans un Transformer
- Attention weights visualization
- Token prediction probabilities

## Recherche Académique

### Context Window & Token Management

1. [RAGVIZ: Diagnose and Visualize Retrieval-Augmented Generation](https://aclanthology.org/2024.emnlp-demo.33.pdf)
   - Paper académique avec diagrammes de sliding window
   - Figure 5: Sliding window method visualization

2. [SelfBudgeter: Adaptive Token Allocation](https://arxiv.org/html/2505.11274v5)
   - Algorithmes d'allocation dynamique de tokens
   - Token budget management

### Attention Mechanism

3. [LLM Transformer Model Visually Explained](https://poloclub.github.io/transformer-explainer/)
   - Visualisation interactive de l'attention
   - Comment les tokens communiquent entre eux

4. [Attention Mechanism in LLMs: An Intuitive Explanation](https://www.datacamp.com/blog/attention-mechanism-in-llms-intuition)
   - Similarité pairwise entre tokens
   - Complexité quadratique expliquée

## Architecture Copilot

### Context Selection & Scoring

- **Sources de contexte:** Fichiers ouverts, récents, symboles référencés, imports, embeddings sémantiques
- **Facteurs de scoring:**
  - Proximité au curseur
  - Similarité sémantique (embeddings)
  - Pertinence des symboles
  - Récence d'accès
  - Graph des imports

### Real-time Adaptability

- Signaux actifs: fichier actif, langage, frappe
- Signaux passifs: scroll, mouvement curseur, ouverture/fermeture
- Time-decay algorithms pour le recency weighting
- Heatmaps de focus développeur

### Token Budget Management

- Prefix prioritaire (avant curseur)
- Suffix optionnel (FIM - Fill-In-Middle)
- Snippets rankés
- Imports et constantes
- Trim sélectif du bas du ranking

## Ressources Additionnelles

### Copilot Context Concepts
- [Concepts for providing context to GitHub Copilot](https://docs.github.com/en/copilot/concepts/context)
- [Provide context to GitHub Copilot](https://docs.github.com/en/copilot/how-tos/provide-context)
- [Manage context for AI (VS Code)](https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context)

### Comparatif IDEs
- [Mastering Multi-File Edits in IntelliJ](https://medium.com/@isurutharanga/mastering-multi-file-edits-in-intellij-idea-with-github-copilot-a-productivity-power-move-fc98fd9dd239)
- Différences VSCode vs IntelliJ dans la gestion du contexte
