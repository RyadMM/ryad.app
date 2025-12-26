# ryad.app

Monorepo for hosting small projects on ryad.app

## Structure

```
ryad.app/
├── vercel.json          # routing configuration
├── lazy/                # project accessible at ryad.app/lazy
│   └── site-gemini.html
└── your-project/        # add new projects here
    └── index.html
```

## Adding a new project

1. Create a folder in the root (e.g., `my-project/`)
2. Add your files (index.html, assets, etc.)
3. Add a rewrite rule in `vercel.json`:

```json
{
  "source": "/my-project",
  "destination": "/my-project/index.html"
},
{
  "source": "/my-project/:match*",
  "destination": "/my-project/:match*"
}
```

4. Deploy - Vercel will handle the rest

---

Deployed on Vercel 🚀
