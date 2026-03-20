import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sv-pink': '#e94560',
        'sv-cyan': '#4fc3f7',
        'sv-orange': '#ff7043',
        'sv-purple': '#7c3aed',
        'sv-indigo': '#4f46e5',
        'sv-navy': '#1a1a2e',
        'sv-dark': '#16213e',
        'sv-blue': '#0f3460',
      },
      backgroundImage: {
        'sv-gradient': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      },
    },
  },
  plugins: [],
}
export default config
