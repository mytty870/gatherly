// tailwind.config.js
import { type Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontSize: {
        'custom-xs': '0.78rem',
        'custom-sm': '0.85rem',
        'custom-md': '0.95rem',
        'custom-lg': '1.05rem',
      },
      colors: {
        lightGray: 'var(--color-light-gray)',
        slateGray: 'var(--color-slate-gray)',
        charcoalGray: 'var(--color-charcoal-gray)',
        dustGray: 'var(--color-dust-gray)',
        powderBlue: 'var(--color-powder-blue)',
        iceBlue: 'var(--color-ice-blue)',
        skyBlue: 'var(--color-sky-blue)',
        royalBlue: 'var(--color-royal-blue)',
        babyBlue: 'var(--color-baby-blue)',
        paleBlue: 'var(--color-pale-blue)',
        silverBlue: 'var(--color-silver-blue)',
        limeGreen: 'var(--color-lime-green)',
        lightPink: 'var(--color-light-pink)',
        transparentBlack: 'var(--color-transparent-black)',
        smokyBlue: 'var(--color-smoky-blue)',
        iceWhite: 'var(--color-ice-white)',
        stoneGray: 'var(--color-stone-gray)',
        mainBg: 'rgba(3, 10, 18, .81)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
