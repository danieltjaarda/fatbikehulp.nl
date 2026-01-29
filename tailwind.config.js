/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#2563eb',      // Donkerblauw (blue-600)
        'brand-medium': '#3b82f6',    // Medium blauw (blue-500)
        'brand-light': '#60a5fa',     // Lichtblauw (blue-400)
        'brand-cream': '#E5E9C5',
        'brand-menu': '#1e40af',      // Donkerblauw voor menu (blue-800)
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-6px)' },
          '75%': { transform: 'translateX(6px)' },
        },
        'scroll-reviews': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out',
        'scroll-reviews': 'scroll-reviews 20s linear infinite',
      },
    },
  },
  plugins: [],
}








