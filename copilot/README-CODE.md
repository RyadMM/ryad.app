# Copilot Context Engineering — Presentation

Présentation interactive sur la maîtrise du contexte GitHub Copilot.

## Structure du Projet

```
copilot/
├── index.html              # Point d'entrée HTML (minimal)
├── css/
│   ├── main.css           # Variables CSS et styles de base
│   ├── slides.css         # Système de slides et animations
│   └── components.css     # Composants UI (cards, badges, modals)
├── js/
│   ├── app.js             # Initialisation principale
│   ├── slides.js          # Contenu des slides (éditable)
│   ├── navigation.js      # Navigation clavier + touch swipe
│   ├── fullscreen.js      # Gestion du mode présentation
│   ├── charts.js          # Configurations Chart.js
│   └── ui.js              # Gestion UI (progress, shortcuts)
└── README.md              # Ce fichier
```

## Architecture Modulaire

Chaque module est indépendant et peut être modifié sans affecter les autres.

### HTML (`index.html`)
- Structure minimale
- Importe les modules CSS et JS
- Contient les éléments UI statiques (progress bar, controls, modal)

### CSS Modules

| Fichier | Responsabilité |
|---------|----------------|
| `main.css` | Variables CSS, reset, styles de base |
| `slides.css` | Layout des slides, transitions, animations |
| `components.css` | Cards, badges, buttons, modals, code blocks |

### JS Modules

| Fichier | Classe/Fonction | Responsabilité |
|---------|-----------------|----------------|
| `app.js` | `App` | Bootstrap, initialise tous les modules |
| `slides.js` | `slides[]`, `renderSlides()` | Définition du contenu des slides |
| `navigation.js` | `SlideNavigation` | Navigation clavier, touch swipe |
| `fullscreen.js` | `FullscreenManager` | Mode présentation |
| `charts.js` | `ContextChart`, `DilutionChart` | Graphiques interactifs |
| `ui.js` | `UIManager`, `ScenarioSelector` | Progress bar, UI events |

## Comment Modifier

### Ajouter/Modifier un Slide

Éditer `js/slides.js` :

```javascript
export const slides = [
    {
        id: 0,
        title: 'Mon Titre',
        badge: { text: 'Concept', type: 'accent' },
        content: `
            <div class="max-w-4xl">
                <h2>Mon Contenu</h2>
                ...
            </div>
        `
    },
    // ... ajouter d'autres slides
];
```

### Changer les Couleurs

Éditer `css/main.css` :

```css
:root {
    --accent: #6366f1;      /* Couleur principale */
    --success: #10b981;     /* Vert (succès) */
    --danger: #ef4444;      /* Rouge (erreur) */
}
```

### Modifier la Navigation

Éditer `js/navigation.js` :

```javascript
// Changer les raccourcis clavier
setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Modifier ici
    });
}
```

## Déploiement

Le projet est configuré pour Vercel via `vercel.json` à la racine.

Access via: `https://ryad.app/copilot`

## Raccourcis Clavier

| Touche | Action |
|--------|--------|
| `→` / `Espace` | Slide suivante |
| `←` | Slide précédente |
| `F` | Mode présentation |
| `Esc` | Quitter fullscreen |
| `?` | Aide raccourcis |

## Dépendances

- Tailwind CSS (CDN)
- Chart.js (CDN)
- Google Fonts (Inter, JetBrains Mono)

## Tests

Ouvrir la console du navigateur pour voir les logs de validation :

```
✅ Copilot Context Engineering Presentation initialized
📊 Status: {
    slidesCount: 9,
    chartsInitialized: 2,
    keyboardNavigation: true,
    fullscreenSupported: true,
    touchSwipeSupported: true
}
```
