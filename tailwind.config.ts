import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        oak: {
          '950': '#0A0908',
          '900': '#111009',
          '800': '#1C1A14',
          '700': '#2E2B21',
          warm: '#C4A882',
          muted: '#8A8275',
          light: '#F8F5F0',
        },
      },
      letterSpacing: {
        'widest-xl': '0.4em',
      },
      animation: {
        'fade-in': 'fadeIn 1.4s ease forwards',
        'slide-up': 'slideUp 0.9s ease forwards',
        'slide-up-delay': 'slideUp 0.9s ease 0.3s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
