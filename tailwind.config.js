/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0a',
          surface: '#1a1a1a',
        },
        light: {
          warm: '#fff8e7',
          glow: '#ffd700',
        },
        accent: {
          blue: '#4a9eff',
          gold: '#d4af37',
        },
        // Алиасы для удобства (если где-то используются короткие имена)
        gold: {
          DEFAULT: '#d4af37',
          light: '#e5c76b',
          dark: '#b8942e',
        },
      },
      fontFamily: {
        heading: ['Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        // Радиальный градиент для эффекта свечения
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      // Тени для эффекта свечения
      boxShadow: {
        'glow-gold': '0 0 30px rgba(212, 175, 55, 0.3)',
        'glow-blue': '0 0 30px rgba(74, 158, 255, 0.3)',
      },
    },
  },
  plugins: [],
}
