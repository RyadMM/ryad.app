/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        tron: {
          cyan: '#00f0ff',
          blue: '#00a8ff',
          glow: 'rgba(0, 240, 255, 0.5)',
        },
        background: '#050508',
        surface: '#0a0a12',
        surfaceHighlight: '#12121a',
        muted: 'rgba(0, 240, 255, 0.5)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', textShadow: '0 0 10px rgba(0, 240, 255, 0.8)' },
          '50%': { opacity: '0.8', textShadow: '0 0 20px rgba(0, 240, 255, 0.4)' },
        },
        flicker: {
          '0%': { opacity: '0.95' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.98' },
        },
      },
    },
  },
  plugins: [],
}
