# AGENTS.md

Instructions for AI agents (opencode) working on the ryad.app monorepo.

## Project Structure

```
ryad.app/
├── lazy/                        # Existing project (Le Guide du Paresseux Organisé)
│   └── site-gemini.html
├── index.html                   # Main landing page
├── vercel.json                  # Vercel routing configuration
└── AGENTS.md                    # This file
```

## Lazy Project (ryad.app/lazy)

### Overview

Le Guide du Paresseux Organisé — A thoughtful approach to productivity and organized laziness.

### File Locations

**Main File:** `lazy/site-gemini.html`
- Contains the complete lazy project

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

**Step 4: Add to main index.html**
Update `index.html` to add link to your project in the Projects section.

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
3. Test responsive layout at various breakpoints
4. Verify all links work correctly

### Common Tasks

**Test local changes:**
```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

**Clear localStorage:**
- Open DevTools (F12)
- Go to Application/Storage tab
- Find "Local Storage"
- Delete entries for your domain

**Check deployed version:**
- Visit Vercel dashboard
- View deployment history
- Check logs for any errors

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

**Last updated:** January 18, 2026
