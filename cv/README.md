# CV Generator - Refactored

A modern, bilingual markdown-to-PDF CV converter with real-time preview and professional PDF export.

**Status:** Refactored into modular structure (Jan 2025)

## Quick Start

```bash
cd /Users/ryad/projects/ryad.app
python3 -m http.server 8081
# Open http://localhost:8081/cv/
```

## Project Structure

```
cv/
├── index.html              # Entry point (230 lines)
├── css/
│   ├── main.css           # UI styling
│   ├── template.css       # CV template
│   └── mobile.css         # Mobile responsive
├── js/
│   ├── app.js             # Main app
│   ├── storage.js         # LocalStorage
│   ├── i18n.js            # Internationalization
│   ├── editor.js          # Editor
│   ├── preview.js         # Preview
│   ├── pdf.js             # PDF generation
│   ├── sidebar.js         # CV list
│   ├── selection.js       # Multi-select
│   └── ui.js             # UI utilities
├── locales/
│   ├── en.json            # English
│   └── fr.json            # French
├── AGENTS.md             # AI agent guide
└── README.md             # This file
```

## Features

- **Bilingual** (EN/FR) with auto-detection
- **Multi-CV management** - Create, rename, delete CVs
- **Multi-select** - Batch operations (download MD/PDF, delete)
- **Real-time preview** - Live markdown rendering
- **PDF export** - Professional US Letter format
- **Import/Export** - Markdown files
- **Auto-save** - 300ms debounce to localStorage
- **Page break control** - 1 page vs auto
- **Mobile responsive** - Touch-friendly UI
- **No build tools** - Pure client-side

## Tech Stack

- **Tailwind CSS** - UI styling (CDN)
- **Marked.js** - Markdown parsing (CDN)
- **html2pdf.js** - PDF generation (CDN)
- **ES6 Modules** - Modular JavaScript
- **LocalStorage** - State persistence

## Development

### Adding New Features

See `AGENTS.md` for detailed guide.

### Testing

```bash
# Start local server
cd /Users/ryad/projects/ryad.app
python3 -m http.server 8081

# Open browser
open http://localhost:8081/cv/
```

### Deployment

Automatically deployed to Vercel on push:
```bash
git add .
git commit -m "message"
git push
```

## Refactor Benefits

### Before (Monolithic)
- Single 2306-line `index.html`
- Hard to locate code
- AI agents need huge context
- Difficult to modify safely

### After (Modular)
- 13 focused files (50-350 lines each)
- Single responsibility per module
- AI agents work with smaller context
- Easy to locate and modify code
- Clear module boundaries

## File Sizes

| File | Lines | Purpose |
|------|-------|---------|
| `index.html` | 230 | HTML structure |
| `css/main.css` | 700 | UI styling |
| `css/template.css` | 100 | CV template |
| `css/mobile.css` | 300 | Mobile responsive |
| `js/app.js` | 350 | Main orchestration |
| `js/storage.js` | 100 | LocalStorage |
| `js/i18n.js` | 80 | Translations |
| `js/editor.js` | 60 | Editor logic |
| `js/preview.js` | 40 | Preview render |
| `js/pdf.js` | 80 | PDF generation |
| `js/sidebar.js` | 200 | CV list |
| `js/selection.js` | 150 | Multi-select |
| `js/ui.js` | 150 | UI utilities |
| `locales/en.json` | 30 | English |
| `locales/fr.json` | 30 | French |

**Total: ~2600 lines** (modular vs monolithic 2306)

## Key Modules

### Storage (`js/storage.js`)
- CV CRUD operations
- Language preference
- Sidebar state
- Page break mode
- Filename generation

### i18n (`js/i18n.js`)
- Translation loading
- Language switching
- UI text updates

### Editor (`js/editor.js`)
- Text input handling
- Debounced auto-save
- Content retrieval

### Preview (`js/preview.js`)
- Markdown rendering
- Content length checking
- Page break warnings

### PDF (`js/pdf.js`)
- Single CV download
- Batch PDF generation
- Configuration options

### Sidebar (`js/sidebar.js`)
- CV list rendering
- CV selection
- Create/Rename/Delete

### Selection (`js/selection.js`)
- Multi-select mode
- Batch operations
- Progress tracking

### UI (`js/ui.js`)
- Modals (rename, batch delete)
- Mobile menu
- Progress overlay
- HTML escaping

## Conventions

### CSS
- BEM-like naming for components (`.cv-item`, `.cv-name`)
- Mobile-first responsive design
- Utility classes via Tailwind
- Orange accent: `#f97316`

### JavaScript
- ES6 modules with `import`/`export`
- Arrow functions
- `const` and `let`, avoid `var`
- Descriptive function names
- Single responsibility per function

### Naming
- kebab-case for files and IDs
- camelCase for JavaScript variables/functions
- Descriptive names (no abbreviations)

## Color Scheme

- Primary accent: `#f97316` (orange)
- Background: `#ffffff` (white)
- Text: `#18181b` (dark gray)
- Secondary: `#6b7280` (gray)
- Success: `#10b981` (green)
- Danger: `#ef4444` (red)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6 modules required
- LocalStorage required

## License

Part of ryad.app monorepo.

## Support

For AI agent assistance, see `AGENTS.md`.

---

**Last updated:** January 5, 2025
**Refactored:** January 5, 2025
