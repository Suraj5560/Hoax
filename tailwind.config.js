/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        indigo: {
          ink: 'var(--color-indigo-ink)',
          DEFAULT: '#1F2A68',
          50: '#F0F3FF',
          100: '#DCE4FD',
          200: '#BDCBFA',
          300: '#94ABF6',
          400: '#6482F0',
          500: '#3D5CE6',
          600: '#2A43CB',
          700: '#1F2A68',
          800: '#192252',
          900: '#13193E',
        },
        cloud: {
          DEFAULT: 'var(--color-cloud)',
          dark: '#0F1322',
        },
        lilac: {
          haze: 'var(--color-lilac-haze)',
          DEFAULT: '#CBB8FF',
          100: '#F3EEFF',
          200: '#E2D5FF',
          300: '#CBB8FF',
          400: '#AF91FF',
          500: '#8F63FF',
        },
        sky: {
          wash: 'var(--color-sky-wash)',
          DEFAULT: '#BFE3FF',
          100: '#EBF6FF',
          200: '#D5EDFF',
          300: '#BFE3FF',
          400: '#90CCFF',
        },
        peach: {
          blush: 'var(--color-peach-blush)',
          DEFAULT: '#FFD9C7',
          100: '#FFF2EC',
          200: '#FFE5D9',
          300: '#FFD9C7',
        },
        safe: {
          mint: 'var(--color-safe-mint)',
          DEFAULT: '#2BB673',
          50: '#ECFDF3',
          100: '#D1FADF',
        },
        amber: {
          alert: 'var(--color-amber-alert)',
          DEFAULT: '#F5A524',
          50: '#FFFBEB',
          100: '#FEF3C7',
        },
        signal: {
          coral: 'var(--color-signal-coral)',
          DEFAULT: '#FF4D5E',
          50: '#FEF2F2',
          100: '#FEE2E2',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'control': '10px',
        'surface-sm': '14px',
        'surface': '20px',
        'surface-lg': '24px',
      },
      boxShadow: {
        'soft-indigo': '0 10px 30px -5px rgba(31, 42, 104, 0.08), 0 4px 12px -2px rgba(31, 42, 104, 0.04)',
        'elevated-indigo': '0 20px 40px -10px rgba(31, 42, 104, 0.14), 0 6px 16px -3px rgba(31, 42, 104, 0.06)',
        'glow-lilac': '0 0 35px -5px rgba(203, 184, 255, 0.45)',
        'glow-sky': '0 0 35px -5px rgba(191, 227, 255, 0.5)',
        'danger-soft': '0 10px 25px -5px rgba(255, 77, 94, 0.2)',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
      },
      keyframes: {
        'mesh-shift': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(20px, -25px) scale(1.05)' },
          '66%': { transform: 'translate(-25px, 20px) scale(0.95)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
      animation: {
        'mesh': 'mesh-shift 18s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
