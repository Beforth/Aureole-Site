/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f3ff',
          100: '#cce7ff',
          200: '#99cfff',
          300: '#66b7ff',
          400: '#339fff',
          500: '#2298d2', // Main primary color
          600: '#1b7aa8',
          700: '#145c7e',
          800: '#0d3e54',
          900: '#06202a',
        },
        secondary: {
          50: '#f0f2f5',
          100: '#e1e5eb',
          200: '#c3cbd7',
          300: '#a5b1c3',
          400: '#8797af',
          500: '#455975', // Main secondary color
          600: '#37475e',
          700: '#293546',
          800: '#1b232e',
          900: '#0d1117',
        },
        accent: {
          50: '#e6e6e8',
          100: '#ccccd1',
          200: '#9999a3',
          300: '#666675',
          400: '#333347',
          500: '#01042d', // Main accent color
          600: '#010324',
          700: '#01021b',
          800: '#000112',
          900: '#000009',
        },
        dark: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e3e6ea',
          300: '#d5d9df',
          400: '#c7ccd4',
          500: '#1b243f', // Main dark color
          600: '#161d32',
          700: '#111626',
          800: '#0c0f19',
          900: '#07080d',
        },
        background: {
          light: '#fafafb',
          off: '#ffffff',
          gray: '#f8f9fa',
        },
        text: {
          primary: '#01042d',
          secondary: '#455975',
          muted: '#a1afbb',
        },
        glass: {
          bg: 'rgba(250, 250, 251, 0.95)',
          border: 'rgba(34, 152, 210, 0.15)',
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2298d2 0%, #455975 50%, #1b243f 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #fafafb 0%, #ffffff 100%)',
        'gradient-accent': 'linear-gradient(135deg, #01042d 0%, #1b243f 100%)',
        'gradient-sky': 'linear-gradient(135deg, #2298d2 0%, #455975 100%)',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(34, 152, 210, 0.3)',
        'glass': '0 8px 32px rgba(1, 4, 45, 0.1)',
        'glow-lg': '0 0 60px rgba(34, 152, 210, 0.4)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
