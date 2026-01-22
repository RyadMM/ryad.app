export interface Slide {
  id: number
  title: string
  badge: { text: string; type: 'accent' | 'danger' | 'success' } | null
  content: string
}

export const copilotSlides: Slide[] = [
  {
    id: 0,
    title: 'Title / Hook',
    badge: { text: '15-30 min', type: 'accent' },
    content: `
      <div class="max-w-4xl text-center">
        <div class="animate-in">
          <span class="badge badge-accent mb-6">15-30 min</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-in delay-1 gradient-text">
          L'Art du Contexte
        </h1>
        <p class="text-xl md:text-2xl text-zinc-400 mb-8 animate-in delay-2 max-w-2xl mx-auto">
          GitHub Copilot n'est pas intelligent. Il est <span class="text-indigo-400 font-semibold">contextuel</span>.
        </p>
        <p class="text-zinc-500 mb-12 animate-in delay-3 max-w-xl mx-auto">
          La différence entre un utilisateur moyen et un expert ? La maîtrise du contexte.<br>
          Comprendre comment il se construit, se dilue, et comment le contrôler.
        </p>
        <div class="animate-in delay-4">
          <div class="inline-flex items-center gap-3 text-sm text-zinc-500">
            <span class="flex items-center gap-1">
              <span class="shortcut-key">→</span> Avancer
            </span>
            <span class="flex items-center gap-1">
              <span class="shortcut-key">F</span> Fullscreen
            </span>
            <span class="flex items-center gap-1">
              <span class="shortcut-key">?</span> Aide
            </span>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 1,
    title: 'La Fenêtre de Contexte',
    badge: { text: 'Concept 1', type: 'accent' },
    content: `
      <div class="max-w-6xl w-full">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span class="badge badge-accent mb-4 animate-in">Concept 1</span>
            <h2 class="text-3xl md:text-4xl font-bold mb-6 animate-in delay-1">La Fenêtre de Contexte</h2>
            <p class="text-zinc-400 mb-6 animate-in delay-2">
              Copilot ne connaît pas tout votre projet. Il ne voit que ce qui tient dans sa <strong class="text-white">fenêtre de contexte</strong> — une mémoire limitée (env. 128k tokens).
            </p>
            <div class="space-y-3 text-sm text-zinc-500 animate-in delay-3">
              <p>Ce qui remplit la fenêtre :</p>
              <ul class="space-y-2 ml-4">
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Fichiers ouverts (onglets visibles)</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Le fichier actuel (autour du curseur)</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Historique du chat récent</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Imports et définitions liées</li>
              </ul>
            </div>
            <div class="card mt-6 animate-in delay-4">
              <p class="text-sm text-zinc-400 mb-4">Simulateur : Ajoutez des éléments pour voir l'impact</p>
              <div class="flex flex-wrap gap-2">
                <button data-action="addSmall" class="context-btn px-3 py-1.5 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-lg transition">
                  + Petit fichier (5%)
                </button>
                <button data-action="addLarge" class="context-btn px-3 py-1.5 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-lg transition">
                  + Gros module (30%)
                </button>
                <button data-action="addChat" class="context-btn px-3 py-1.5 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-lg transition">
                  + Chat history (15%)
                </button>
                <button data-action="reset" class="context-btn px-3 py-1.5 text-sm bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded-lg transition">
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div class="card animate-in delay-2">
            <h3 class="text-lg font-semibold mb-4 text-center">Occupation de la fenêtre</h3>
            <div class="chart-container" style="position: relative; height: 250px;">
              <div id="contextChartMount"></div>
            </div>
            <p id="contextStatus" class="text-center text-sm mt-4 text-emerald-400 mono">État : Optimal</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    title: 'La Dilution du Contexte',
    badge: { text: 'Concept 2', type: 'danger' },
    content: `
      <div class="max-w-6xl w-full">
        <div class="text-center mb-12">
          <span class="badge badge-danger mb-4 animate-in">Concept 2</span>
          <h2 class="text-3xl md:text-4xl font-bold mb-4 animate-in delay-1">La Dilution du Contexte</h2>
          <p class="text-zinc-400 max-w-2xl mx-auto animate-in delay-2">
            Avoir 20 fichiers ouverts n'aide pas Copilot. Cela le <strong>noie</strong>.<br>
            Si le code pertinent représente 10% de la fenêtre, la réponse sera générique ou hallucinatoire.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="space-y-4 animate-in delay-1">
            <div class="card scenario-card selected" data-scenario="clean">
              <h4 class="font-semibold mb-2">Scenario A : Focus</h4>
              <p class="text-sm text-zinc-500">2 fichiers ouverts. Question précise. Contexte Markdown présent.</p>
              <div class="mt-3">
                <span class="badge badge-success">Signal fort</span>
              </div>
            </div>
            <div class="card scenario-card" data-scenario="noise">
              <h4 class="font-semibold mb-2">Scenario B : Chaos</h4>
              <p class="text-sm text-zinc-500">15 onglets ouverts (vieux logs, configs). Question vague. Chat long.</p>
              <div class="mt-3">
                <span class="badge badge-danger">Bruit élevé</span>
              </div>
            </div>
          </div>

          <div class="md:col-span-2 card animate-in delay-2">
            <h3 class="text-lg font-semibold mb-4 text-center">Impact sur la qualité</h3>
            <div class="chart-container" style="position: relative; height: 250px;">
              <div id="dilutionChartMount"></div>
            </div>
            <p id="dilutionMessage" class="mt-4 p-3 bg-emerald-900/20 text-emerald-400 rounded-lg text-sm text-center">
              <strong>Résultat :</strong> Copilot comprend exactement ce que vous voulez. Le code généré utilise les bonnes variables et respecte le style.
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 3,
    title: 'Architecture Pipeline',
    badge: { text: 'Architecture', type: 'accent' },
    content: `
      <div class="max-w-5xl w-full">
        <div class="text-center mb-12">
          <span class="badge badge-accent mb-4 animate-in">Architecture</span>
          <h2 class="text-3xl md:text-4xl font-bold mb-4 animate-in delay-1">Comment Copilot Construit le Contexte</h2>
        </div>

        <div class="card animate-in delay-2">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
            <div class="flex-1">
              <div class="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-zinc-400">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <path d="M14 2v6h6"/>
                </svg>
              </div>
              <p class="font-semibold">IDE</p>
              <p class="text-xs text-zinc-500 mt-1">Fichiers ouverts<br>Curseur position</p>
            </div>
            <div class="hidden md:block text-zinc-600">→</div>
            <div class="flex-1">
              <div class="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-indigo-400">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <p class="font-semibold">Retriever</p>
              <p class="text-xs text-zinc-500 mt-1">RAG + Embeddings<br>Symbol graph</p>
            </div>
            <div class="hidden md:block text-zinc-600">→</div>
            <div class="flex-1">
              <div class="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-indigo-400">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </div>
              <p class="font-semibold">Scorer</p>
              <p class="text-xs text-zinc-500 mt-1">Priorisation<br>FIFO sliding</p>
            </div>
            <div class="hidden md:block text-zinc-600">→</div>
            <div class="flex-1">
              <div class="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center mx-auto mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white">
                  <path d="M12 8V4H8"/>
                  <rect width="16" height="12" x="4" y="8" rx="2"/>
                  <path d="M2 14h2"/>
                  <path d="M20 14h2"/>
                  <path d="M15 13v2"/>
                  <path d="M9 13v2"/>
                </svg>
              </div>
              <p class="font-semibold">LLM</p>
              <p class="text-xs text-zinc-500 mt-1">Génération<br>128k window</p>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-zinc-800">
            <p class="text-sm text-zinc-400 text-center">
              <strong class="text-white">Chaque interaction</strong> trigger ce pipeline complet.
              Le contexte est recalculé, scoré, et assemblé avant d'atteindre le LLM.
            </p>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-4 mt-8">
          <div class="card text-center animate-in delay-3">
            <p class="text-2xl font-bold text-indigo-400">VSCode</p>
            <p class="text-xs text-zinc-500 mt-2">Plus inclusif par défaut. Inclut tout le workspace avec @workspace.</p>
          </div>
          <div class="card text-center animate-in delay-4">
            <p class="text-2xl font-bold text-indigo-400">IntelliJ</p>
            <p class="text-xs text-zinc-500 mt-2">Plus sélectif. Scope par module, besoin d'être plus explicite.</p>
          </div>
          <div class="card text-center animate-in delay-5">
            <p class="text-2xl font-bold text-emerald-400">Best Practice</p>
            <p class="text-xs text-zinc-500 mt-2">Fermez les onglets inutiles. Utilisez @mentions pour cibler.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 4,
    title: 'PARTIE 2 - Concept LEGO',
    badge: { text: 'PARTIE 2', type: 'accent' },
    content: `
      <div class="max-w-5xl w-full">
        <div class="text-center mb-12">
          <span class="badge badge-accent mb-4 animate-in">PARTIE 2</span>
          <h2 class="text-3xl md:text-4xl font-bold mb-4 animate-in delay-1">Les Fichiers Markdown comme <span class="text-indigo-400">"Mémoire LEGO"</span></h2>
          <p class="text-zinc-400 max-w-2xl mx-auto animate-in delay-2">
            Créez une mémoire externe persistante que Copilot utilise à chaque interaction.
          </p>
        </div>

        <div class="grid md:grid-cols-4 gap-4 animate-in delay-3">
          <div class="text-center">
            <div class="lego-brick mb-3">
              <div class="text-xs text-indigo-200 mb-1">BRIQUE 1</div>
              <div class="font-bold">ARCHITECTURE.md</div>
            </div>
            <p class="text-xs text-zinc-500">Pattern microservices, technologies, décisions</p>
          </div>
          <div class="text-center">
            <div class="lego-brick mb-3">
              <div class="text-xs text-indigo-200 mb-1">BRIQUE 2</div>
              <div class="font-bold">PRODUCT.md</div>
            </div>
            <p class="text-xs text-zinc-500">Vision, fonctionnalités, user stories</p>
          </div>
          <div class="text-center">
            <div class="lego-brick mb-3">
              <div class="text-xs text-indigo-200 mb-1">BRIQUE 3</div>
              <div class="font-bold">GUIDELINES.md</div>
            </div>
            <p class="text-xs text-zinc-500">Règles de codage, tests, git workflow</p>
          </div>
          <div class="text-center">
            <div class="lego-brick mb-3 emerald">
              <div class="text-xs text-emerald-200 mb-1">CHEF D'ORCHESTRE</div>
              <div class="font-bold">copilot-instructions.md</div>
            </div>
            <p class="text-xs text-zinc-500">Connecte toutes les briques avec @mentions</p>
          </div>
        </div>

        <div class="mt-8 card animate-in delay-4">
          <h4 class="font-semibold mb-4">Pourquoi LEGO ?</h4>
          <div class="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <p class="font-semibold text-indigo-400 mb-1">Modulaire</p>
              <p class="text-zinc-500">Chaque fichier est autonome</p>
            </div>
            <div>
              <p class="font-semibold text-indigo-400 mb-1">Assemblable</p>
              <p class="text-zinc-500">On combine ce qu'on need</p>
            </div>
            <div>
              <p class="font-semibold text-indigo-400 mb-1">Réutilisable</p>
              <p class="text-zinc-500">La même brique sert partout</p>
            </div>
            <div>
              <p class="font-semibold text-indigo-400 mb-1">Extensible</p>
              <p class="text-zinc-500">On ajoute au fur et à mesure</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 5,
    title: 'Mécanisme @mentions',
    badge: { text: 'Mécanisme', type: 'accent' },
    content: `
      <div class="max-w-5xl w-full">
        <div class="text-center mb-12">
          <span class="badge badge-accent mb-4 animate-in">Mécanisme</span>
          <h2 class="text-3xl md:text-4xl font-bold mb-4 animate-in delay-1">Comment les Briques se Connectent</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="animate-in delay-2">
            <h4 class="font-semibold mb-4 flex items-center gap-2">
              <span class="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-sm">1</span>
              Dans copilot-instructions.md
            </h4>
            <div class="code-block mono">
              <span class="comment"># Contexte Projet</span><br>
              <span class="keyword">-</span> Pour la vision produit: <span class="function">@PRODUCT.md</span><br>
              <span class="keyword">-</span> Pour l'architecture: <span class="function">@ARCHITECTURE.md</span><br>
              <span class="keyword">-</span> Pour les guidelines: <span class="function">@GUIDELINES.md</span>
            </div>
          </div>

          <div class="animate-in delay-3">
            <h4 class="font-semibold mb-4 flex items-center gap-2">
              <span class="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-sm">2</span>
              Copilot suit les liens
            </h4>
            <div class="card">
              <p class="text-sm text-zinc-400 mb-4">Quand Copilot voit <code class="mono text-indigo-400">@PRODUCT.md</code>, il va lire le fichier et l'inclut dans le contexte.</p>
              <div class="flex items-center justify-center gap-2 text-xs text-zinc-500">
                <span class="badge badge-accent">instructions</span>
                <span>→</span>
                <span class="badge badge-accent">PRODUCT</span>
                <span>→</span>
                <span class="badge badge-accent">ARCHITECTURE</span>
                <span>→</span>
                <span class="badge badge-accent">GUIDELINES</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card mt-8 animate-in delay-4">
          <h4 class="font-semibold mb-4">Résultat : Assemblage complet</h4>
          <div class="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
            <div class="flex items-center gap-2">
              <span class="badge badge-accent">Architecture</span>
              <span class="text-zinc-500">+</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="badge badge-accent">Produit</span>
              <span class="text-zinc-500">+</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="badge badge-accent">Guidelines</span>
              <span class="text-zinc-500">=</span>
            </div>
            <span class="badge badge-success">Compréhension complète</span>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 6,
    title: 'Exemple Concret',
    badge: { text: 'Exemple', type: 'accent' },
    content: `
      <div class="max-w-5xl w-full">
        <div class="text-center mb-12">
          <span class="badge badge-accent mb-4 animate-in">Exemple</span>
          <h2 class="text-3xl md:text-4xl font-bold mb-4 animate-in delay-1">Avant / Après</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="card border-red-900/30 animate-in delay-2">
            <div class="flex items-center gap-2 mb-4">
              <span class="badge badge-danger">SANS Markdown</span>
            </div>
            <div class="code-block mono text-xs">
              <span class="comment">// Prompt: "Ajoute une fonction login"</span><br><br>
              <span class="keyword">function</span> <span class="function">login</span>(<span class="variable">email</span>, <span class="variable">password</span>) {<br>
              &nbsp;&nbsp;<span class="comment">// Code générique...</span><br>
              &nbsp;&nbsp;<span class="keyword">return</span> <span class="string">"success"</span>;<br>
              }
            </div>
            <div class="mt-4 space-y-2 text-xs text-zinc-500">
              <p class="flex items-center gap-2"><span class="text-red-400">×</span> Pas de cohérence architecture</p>
              <p class="flex items-center gap-2"><span class="text-red-400">×</span> Pas de tests</p>
              <p class="flex items-center gap-2"><span class="text-red-400">×</span> Pas de documentation</p>
            </div>
          </div>

          <div class="card border-emerald-900/30 animate-in delay-3">
            <div class="flex items-center gap-2 mb-4">
              <span class="badge badge-success">AVEC Markdown</span>
            </div>
            <div class="code-block mono text-xs">
              <span class="comment">// Prompt: "Ajoute une fonction login"</span><br>
              <span class="comment">// Copilot a lu ARCHITECTURE.md + GUIDELINES.md</span><br><br>
              <span class="keyword">async function</span> <span class="function">login</span>(<span class="variable">email</span>, <span class="variable">password</span>) {<br>
              &nbsp;&nbsp;<span class="comment">// Auth service pattern (ARCHITECTURE.md)</span><br>
              &nbsp;&nbsp;<span class="comment">// JWT token + error handling</span><br>
              &nbsp;&nbsp;<span class="comment">// Tests générés (GUIDELINES.md)</span><br>
              }
            </div>
            <div class="mt-4 space-y-2 text-xs text-zinc-500">
              <p class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Architecture cohérente</p>
              <p class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Tests générés</p>
              <p class="flex items-center gap-2"><span class="text-emerald-400">✓</span> Patterns respectés</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 7,
    title: 'Quick Start',
    badge: { text: 'Action', type: 'success' },
    content: `
      <div class="max-w-4xl w-full">
        <div class="text-center mb-12">
          <span class="badge badge-success mb-4 animate-in">Action</span>
          <h2 class="text-3xl md:text-4xl font-bold mb-4 animate-in delay-1">Quick Start — 5 Files, 10 Minutes</h2>
        </div>

        <div class="space-y-4 animate-in delay-2">
          <div class="card flex items-start gap-4">
            <span class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold shrink-0">1</span>
            <div>
              <p class="font-semibold">Créez <code class="mono text-indigo-400">ARCHITECTURE.md</code></p>
              <p class="text-sm text-zinc-500 mt-1">Pattern global, technologies clés, décisions architecturales. Max 2 pages.</p>
            </div>
          </div>
          <div class="card flex items-start gap-4">
            <span class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold shrink-0">2</span>
            <div>
              <p class="font-semibold">Créez <code class="mono text-indigo-400">PRODUCT.md</code></p>
              <p class="text-sm text-zinc-500 mt-1">Vision, fonctionnalités principales, user stories. Max 2 pages.</p>
            </div>
          </div>
          <div class="card flex items-start gap-4">
            <span class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold shrink-0">3</span>
            <div>
              <p class="font-semibold">Créez <code class="mono text-indigo-400">GUIDELINES.md</code></p>
              <p class="text-sm text-zinc-500 mt-1">Règles de codage, test requirements, git workflow. Max 1 page.</p>
            </div>
          </div>
          <div class="card flex items-start gap-4">
            <span class="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold shrink-0">4</span>
            <div>
              <p class="font-semibold">Créez <code class="mono text-emerald-400">.github/copilot-instructions.md</code></p>
              <p class="text-sm text-zinc-500 mt-1">Le chef d'orchestre avec des <code class="text-indigo-400">@mentions</code> vers les 3 fichiers.</p>
            </div>
          </div>
          <div class="card flex items-start gap-4">
            <span class="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold shrink-0">5</span>
            <div>
              <p class="font-semibold">Testez !</p>
              <p class="text-sm text-zinc-500 mt-1">Demandez à Copilot d'implémenter une feature. Voyez la différence.</p>
            </div>
          </div>
        </div>

        <div class="mt-8 p-4 bg-indigo-900/20 rounded-xl border border-indigo-800/50 animate-in delay-3">
          <p class="text-sm text-center text-indigo-300">
            <strong class="text-white">ROI:</strong> 2 heures de setup → gains immédiats et cumulatifs sur chaque interaction.
          </p>
        </div>
      </div>
    `
  },
  {
    id: 8,
    title: 'Conclusion',
    badge: null,
    content: `
      <div class="max-w-4xl text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-8 animate-in gradient-text">
          Ce qu'il faut retenir
        </h2>

        <div class="grid md:grid-cols-3 gap-6 mb-12">
          <div class="card animate-in delay-1">
            <div class="text-3xl mb-3">🎯</div>
            <p class="font-semibold text-lg mb-2">Le contexte est limité</p>
            <p class="text-sm text-zinc-500">Fenêtre de 128k tokens. Ce qui n'y est pas n'existe pas pour Copilot.</p>
          </div>
          <div class="card animate-in delay-2">
            <div class="text-3xl mb-3">🧱</div>
            <p class="font-semibold text-lg mb-2">Build LEGO, not chaos</p>
            <p class="text-sm text-zinc-500">Les fichiers markdown sont des actifs de contexte, pas de la doc passive.</p>
          </div>
          <div class="card animate-in delay-3">
            <div class="text-3xl mb-3">⚡</div>
            <p class="font-semibold text-lg mb-2">Engineering, not guessing</p>
            <p class="text-sm text-zinc-500">Contrôlez le contexte = contrôlez la qualité des réponses.</p>
          </div>
        </div>

        <div class="card max-w-xl mx-auto animate-in delay-4">
          <p class="text-lg text-zinc-300 mb-4">
            "Copilot n'est pas intelligent. Il est contextuel."
          </p>
          <p class="text-sm text-zinc-500">
            Votre job : être un bon Context Engineer.
          </p>
        </div>

        <div class="mt-12 animate-in delay-5">
          <p class="text-zinc-500 text-sm mb-4">Questions ?</p>
          <div class="flex items-center justify-center gap-4 text-xs text-zinc-600">
            <span>Présenté par Ryad</span>
            <span>•</span>
            <span>ryad.app</span>
          </div>
        </div>
      </div>
    `
  }
]
