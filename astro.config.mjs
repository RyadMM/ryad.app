import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
  compressHTML: true,
})
