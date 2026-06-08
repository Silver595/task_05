/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    fontFamily: {
      sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      display: ['"Space Grotesk"', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#4f46e5',
        dark: '#050505',
        surface: '#0a0a0a',
        whatsapp: '#25D366',
      },
      animation: {
        'fade-up': 'fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        marquee: 'marquee 30s linear infinite',
        'spin-slow': 'spin 15s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'text-reveal': 'textReveal 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'gradient-x': 'gradientX 8s ease infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)', filter: 'blur(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        textReveal: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% center' },
          '50%': { backgroundPosition: '100% center' },
        },
      },
    },
  },
  plugins: [],
};
