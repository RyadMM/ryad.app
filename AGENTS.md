# AGENTS.md

Instructions for AI agents (opencode) working on the ryad.app monorepo.

## Project Structure

```
ryad.app/
├── cv/                          # Markdown to PDF CV converter
│   ├── index.html              # Main application (single file)
│   ├── test.html               # Proof of concept for PDF generation
│   └── sample.md               # Default CV content (Noémie's CV)
├── lazy/                        # Existing project (Le Guide du Paresseux Organisé)
│   └── site-gemini.html
├── index.html                   # Main landing page
├── vercel.json                  # Vercel routing configuration
└── AGENTS.md                    # This file
```

## CV Project (ryad.app/cv)

### Overview

A modern, bilingual markdown-to-PDF CV converter with real-time preview and professional PDF export.

### Tech Stack

- **CodeMirror 6** - Modern markdown editor with syntax highlighting (from esm.sh CDN)
- **Marked.js** - Fast markdown parsing (from cdnjs CDN)
- **html2pdf.js** - Client-side PDF generation (from cdnjs CDN)
- **Tailwind CSS** - UI styling (from cdnjs CDN, same as main site)

**Key Design:**
- Single HTML file (`cv/index.html`) - no build tools
- Client-side only - no backend needed
- Mobile-first responsive design
- Bilingual UI (FR/EN) with localStorage persistence

### Features

1. **Markdown Editor**
   - CodeMirror 6 with syntax highlighting
   - Auto-save to localStorage (debounced 300ms)
   - Character/line counter
   - Mobile-friendly (16px font, line wrapping)

2. **Live Preview**
   - Real-time markdown rendering with marked.js
   - Single professional CV template (hardcoded CSS)
   - US Letter format (8.5" x 11")
   - Responsive: Side-by-side on desktop, stacked on mobile

3. **PDF Export**
   - Smart filename generation (extracts name from first heading)
   - Format: `cv-{name}-{date}.pdf` or `cv-{date}.pdf`
   - US Letter format with 0.5" margins
   - High resolution (scale: 2)
   - JPEG compression (0.98 quality)

4. **Bilingual UI**
   - Toggle switch (EN/FR)
   - Persistent language preference
   - All labels translated

### File Locations

**Main Application:** `cv/index.html`
- Contains all features in single file (~400 lines)
- Embedded CSS for UI and CV template
- Embedded JavaScript for all logic
- Imports libraries via CDN

**Proof of Concept:** `cv/test.html`
- Tests html2pdf.js quality
- Uses Noémie's CV as sample
- Useful for testing PDF generation before changes

**Default Content:** `cv/sample.md`
- Noémie's CV in markdown
- Loaded by default in editor

### Modifying CV Styling

The CV template styling is hardcoded in `cv/index.html` within the `<style>` tag.

**Key CSS classes:**
- `.cv-template` - Main container (US Letter dimensions)
- `.cv-template h1` - Name (20pt, orange)
- `.cv-template h2` - Section headers (14pt, with orange border)
- `.cv-template h3` - Subsections (12pt, gray)
- `.cv-template p` - Paragraphs (11pt)
- `.cv-template ul/ol` - Lists
- `.cv-template li` - List items
- `.contact-info` - Contact information section

**To modify:**
1. Open `cv/index.html`
2. Find the `<style>` tag near the top
3. Locate CV-specific styles (after `/* CV Template Styling */`)
4. Modify as needed
5. Test changes in browser

**Color scheme:**
- Primary accent: `#f97316` (orange)
- Background: `#ffffff` (white)
- Text: `#18181b` (dark gray)
- Secondary text: `#6b7280` (gray)
- Headings: `#4b5563` (medium gray)

### Adding Templates (Future)

While currently there's only one template, the system is designed to be extensible.

**To add a new template:**
1. Add new CSS classes in `cv/index.html` `<style>` tag (e.g., `.cv-template-modern`)
2. Add a template selector in the UI (dropdown or buttons)
3. Add JavaScript to switch between templates
4. Update localStorage to save template preference

**Example:**
```css
/* Modern template */
.cv-template-modern {
  /* Your styles here */
}

/* Classic template (current) */
.cv-template {
  /* Existing styles */
}
```

```javascript
// In index.html
function setTemplate(templateName) {
  const preview = document.getElementById('preview');
  preview.className = `cv-template-${templateName}`;
  localStorage.setItem('cv-template', templateName);
}

// Load saved template
const savedTemplate = localStorage.getItem('cv-template') || 'classic';
setTemplate(savedTemplate);
```

### Testing PDF Generation

**Quality Checklist:**
- Text rendering sharpness
- Font readability at print size
- Page breaks handling
- Margin accuracy
- File size (target: <2MB for 2-page CV)

**To test:**
1. Open `cv/test.html` in browser
2. Click "Download PDF" button
3. Check the generated PDF
4. Note any issues in console

**Performance Testing (Mobile):**
1. Use browser DevTools to simulate mobile device
2. Edit markdown in editor
3. Measure preview update time
4. Current implementation: Real-time on desktop, manual refresh on mobile (if needed)

### Adding New Projects

**Step 1: Create project directory**
```bash
mkdir your-project/
cd your-project/
```

**Step 2: Add your files**
```bash
# Example: index.html
touch index.html
```

**Step 3: Update vercel.json**
Add routing rules to `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/your-project",
      "destination": "/your-project/index.html"
    },
    {
      "source": "/your-project/:match*",
      "destination": "/your-project/:match*"
    }
  ]
}
```

**Step 4: Add to main index.html (optional)**
Update `index.html` to add link to your project.

**Step 5: Deploy**
- Commit changes to git
- Vercel will auto-deploy
- Project will be available at `ryad.app/your-project`

### Deployment

**Vercel Configuration:**
- Repository: Connected to Vercel
- Build: No build command (static files)
- Output: Root directory
- Routes: Configured in `vercel.json`

**Deployment Process:**
1. Make changes locally
2. Test locally: `python3 -m http.server 8080` (in project directory)
3. Commit changes: `git add . && git commit -m "message"`
4. Push to remote: `git push`
5. Vercel auto-deploys (usually within 30-60 seconds)
6. Check Vercel dashboard for deployment status

**URL Structure:**
- Main site: `https://ryad.app`
- CV generator: `https://ryad.app/cv`
- Lazy project: `https://ryad.app/lazy`
- New projects: `https://ryad.app/your-project`

### Coding Conventions

**HTML/CSS:**
- Use Tailwind CSS for UI styling
- Follow existing color scheme (orange accent: #f97316, dark theme: #09090b)
- Mobile-first responsive design
- Use semantic HTML elements
- Include viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

**JavaScript:**
- Use modern ES6+ syntax
- Prefer arrow functions
- Use `const` and `let`, avoid `var`
- Handle errors gracefully with try-catch
- Add console logging for debugging

**Naming:**
- Use kebab-case for filenames and IDs
- Use camelCase for JavaScript variables and functions
- Use descriptive names (no abbreviations unless standard)

**Comments:**
- Add comments for complex logic
- Document function purposes
- Explain non-obvious decisions

### Testing Approach

**Manual Testing:**
1. Test on desktop browsers (Chrome, Firefox, Safari)
2. Test on mobile devices (iOS Safari, Chrome mobile)
3. Test PDF generation on different devices
4. Test bilingual toggle functionality
5. Test auto-save (check localStorage)
6. Test responsive layout at various breakpoints

**Testing PDF Generation:**
1. Use `cv/test.html` for quick tests
2. Check text quality
3. Verify page breaks
4. Confirm file size is reasonable
5. Test with different content lengths

**Testing Mobile Performance:**
1. Use DevTools device emulation
2. Measure preview update time
3. Test touch interactions
4. Verify scroll behavior
5. Check keyboard interactions

### Common Tasks

**Test local changes:**
```bash
cd cv
python3 -m http.server 8080
# Open http://localhost:8080/test.html
```

**Check PDF generation logs:**
- Open browser DevTools (F12)
- Go to Console tab
- Look for errors during PDF generation
- Check generation time in test results

**Clear localStorage:**
- Open DevTools (F12)
- Go to Application/Storage tab
- Find "Local Storage"
- Delete entries for your domain

**Check deployed version:**
- Visit Vercel dashboard
- View deployment history
- Check logs for any errors

### Troubleshooting

**PDF generation fails:**
- Check browser console for errors
- Verify html2pdf.js CDN is loading
- Check if content is too large (HTML5 canvas limits)
- Try reducing content length

**Poor PDF quality:**
- Check `scale` option in html2pdf.js (should be 2)
- Verify image quality (should be 0.98)
- Check font rendering in preview
- May need to pivot to Puppeteer if quality is unacceptable

**Mobile performance issues:**
- Check if real-time preview is enabled
- Add debounce if needed (currently 300ms)
- Consider manual refresh button
- Test with smaller content

**Editor not loading:**
- Check CodeMirror CDN URLs
- Verify network connectivity
- Check browser console for CORS errors
- Try different CDN if needed

### Future Enhancements

**Planned features:**
- Multiple CV templates (modern, creative, minimalist)
- Template preview before applying
- Custom font selection
- Color theme picker
- Upload/save CV to cloud
- Share CV via link
- Export to Word/Google Docs
- Resume score checker
- Spell checker

**Technical improvements:**
- Migrate to Puppeteer for better PDF quality
- Add unit tests
- Add integration tests
- Set up CI/CD pipeline
- Add analytics (with user consent)

### Contact

**Project:**
- Repository: ryad.app
- Maintainer: Ryad
- Contact: hello@ryad.app

**For opencode issues or questions:**
- Check this file first
- Review project structure
- Test locally before deploying
- Follow conventions listed above

---

**Last updated:** January 5, 2025
