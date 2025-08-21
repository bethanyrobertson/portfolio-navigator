import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        foreground2: 'hsl(var(--foreground-2))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        'muted-foreground-subtle': 'hsl(var(--muted-foreground-subtle))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        'chart-1': 'hsl(var(--chart-1))',
        'chart-2': 'hsl(var(--chart-2))',
        'chart-3': 'hsl(var(--chart-3))',
        'chart-4': 'hsl(var(--chart-4))',
        'chart-5': 'hsl(var(--chart-5))',
        // Navbar colors
        'navbar-light': '#FEF7FF',
        'navbar-dark': '#322F35',
        // Button colors
        'lilac': '#D0BCFF',
        // Custom colors
        'custom-purple': '#F3EDF7',
        'custom-dark': '#002226',
        'footer-light': '#EAEEEF',
        'footer-dark': '#13343B'
      },
      borderRadius: {
        radius: 'var(--radius)',
        'radius-sm': 'var(--radius-sm)',
        'radius-md': 'var(--radius-md)',
        'radius-lg': 'var(--radius-lg)',
        'radius-xl': 'var(--radius-xl)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        serif: ['var(--font-serif)', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'marquee': 'marquee 25s linear infinite',
      },
      spacing: {
        '28': '7rem',
        '32': '8rem',
        '44': '11rem',
        '76': '19rem',
      },
      maxWidth: {
        '76': '19rem',
      },
      fontSize: {
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      screens: {
        'max-lg': { max: '1023px' },
      },
      // Add more comprehensive utilities
      width: {
        'full': '100%',
      },
      height: {
        'full': '100%',
        '793': '793px',
        '550': '550px',
      },
      padding: {
        '6': '1.5rem',
        '8': '2rem',
        '28': '7rem',
        '32': '8rem',
        '44': '11rem',
        '10': '2.5rem',
      },
      margin: {
        '5': '1.25rem',
        '8': '2rem',
        '12': '3rem',
        '20': '5rem',
        '24': '6rem',
        '6': '1.5rem',
      },
      gap: {
        '2.5': '0.625rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '14': '3.5rem',
        '20': '5rem',
      },
      flexDirection: {
        'col': 'column',
        'row': 'row',
      },
      alignItems: {
        'center': 'center',
      },
      justifyContent: {
        'center': 'center',
        'between': 'space-between',
      },
      gridTemplateColumns: {
        '1': 'repeat(1, minmax(0, 1fr))',
        '2': 'repeat(2, minmax(0, 1fr))',
        '3': 'repeat(3, minmax(0, 1fr))',
      },
      objectFit: {
        'cover': 'cover',
      },
      objectPosition: {
        'left-top': 'left top',
      },
      boxShadow: {
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      fontWeight: {
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      lineHeight: {
        '1': '1',
        '2': '2rem',
        '2.5': '2.5rem',
        '1.25': '1.25rem',
        '1.75': '1.75rem',
        '2.25': '2.25rem',
      },
      whiteSpace: {
        'nowrap': 'nowrap',
      },
      overflow: {
        'hidden': 'hidden',
      },
      position: {
        'relative': 'relative',
        'absolute': 'absolute',
        'fixed': 'fixed',
      },
      cursor: {
        'pointer': 'pointer',
      },
      transitionProperty: {
        'all': 'all',
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
      transitionDuration: {
        '200': '200ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      outline: {
        'none': 'none',
      },
      borderWidth: {
        '1': '1px',
      },
      borderStyle: {
        'solid': 'solid',
        'transparent': 'transparent',
      },
      flexShrink: {
        '0': '0',
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    typography,
  ],
}

export default config 