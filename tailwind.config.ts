import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        deep: { DEFAULT: '#0F1F1B', 700: '#17302A', 600: '#1F3F37' },
        chalk: { DEFAULT: '#ECEAE1', 100: '#F5F3EC', 200: '#E0DDD0' },
        zellige: { DEFAULT: '#25664F', 400: '#3E8B71' },
        saffron: { DEFAULT: '#E2A72E', 600: '#C98F1B' },
        ember: '#D2512A',
        mute: '#5B6661',
      },
      fontFamily: {
        display: ['var(--font-display)', 'var(--font-arabic)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'var(--font-arabic)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        cue: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        glow: { '0%,100%': { opacity: '0.55' }, '50%': { opacity: '0.9' } },
      },
      animation: {
        cue: 'cue 2.4s ease-in-out infinite',
        glow: 'glow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
