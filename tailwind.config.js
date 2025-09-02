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
        brand: {
          bg: '#FAFAF8',
          surface: '#FFFFFF',
          fg: '#0F172A',
          primary: '#1D4ED8',
          secondary: '#6D28D9'
        },
        state: {
          success: '#16A34A',
          warning: '#CA8A04',
          danger:  '#DC2626'
        },
        background: '#000000',
        foreground: '#ffffff',
        muted: {
          DEFAULT: '#c6c6c6',
          foreground: '#737373',
        },
        surface: '#171717',
        accent: {
          DEFAULT: '#0000ee',
          alt: '#ffd500',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Monument Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        sm: ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        base: ['1rem', { lineHeight: '1.5' }],
        lg: ['1.125rem', { lineHeight: '1.4' }],
        xl: ['1.25rem', { lineHeight: '1.3' }],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        '3xl': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        '4xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        // Style guide tokens
        h1: ['3.25rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        h2: ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.005em' }],
        h3: ['1.75rem', { lineHeight: '1.3' }],
        h4: ['1.5rem', { lineHeight: '1.35' }],
        h5: ['1.25rem', { lineHeight: '1.45' }],
        h6: ['1.125rem', { lineHeight: '1.5' }],
        body: ['1rem', { lineHeight: '1.65' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65' }],
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      maxWidth: {
        '4xl': '896px',
        'content': '768px',
      },
    },
  },
  plugins: [],
}
