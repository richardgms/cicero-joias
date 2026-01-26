import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        jost: ['var(--font-jost)', 'sans-serif'],
        philosopher: ['var(--font-philosopher)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        // Semantic Tokens
        'radius-sm': '6px',
        'radius-md': '8px',
        'radius-lg': '12px',
        'radius-xl': '16px',
        'radius-2xl': '24px',
        'radius-full': '9999px',
      },
      boxShadow: {
        'card-sm': '0 15px 35px -20px rgba(24, 68, 52, 0.15)',
        'card-sm-hover': '0 25px 50px -25px rgba(24, 68, 52, 0.25)',
        'card-md': '0 24px 55px -34px rgba(24, 68, 52, 0.35)',
        'button-gold': '0 10px 25px -10px rgba(200, 155, 60, 0.2)',
        'button-gold-strong': '0 10px 25px -10px rgba(200, 155, 60, 0.3)',
        // Semantic Tokens
        'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'shadow-card': '0 4px 20px -4px rgba(24,68,52,0.05)',
        'shadow-card-hover': '0 20px 40px -12px rgba(24,68,52,0.15)',
        'shadow-button-primary': '0 25px 45px -20px rgba(207,154,36,0.45)',
      },
      colors: {
        // Tokens Semânticos (Design System)
        // Texto
        'text-primary': '#184434', // Esmeralda
        'text-secondary': '#2E363D', // Grafite
        'text-muted': '#2d6854', // Esmeralda Light
        'text-on-dark': '#F5F3EE', // Marfim
        'text-on-brand': '#184434', // Esmeralda (on Gold)

        // Superfícies
        'surface-page': '#F8F5F0', // Marfim/Off-white
        'surface-section': '#FFFFFF', // Branco
        'surface-card': 'rgba(255, 255, 255, 0.6)', // Glass
        'surface-subtle': 'rgba(24, 68, 52, 0.05)', // Esmeralda Ultra-Light
        // surface-hero é tratado via classes de gradiente

        // Ações
        'action-primary': '#184434', // Esmeralda
        'action-primary-hover': '#0f2b21', // Esmeralda Dark
        'action-strong': '#CF9A24', // Ouro
        'action-strong-hover': '#B88820', // Ouro Dark

        // Bordas
        'border-default': 'rgba(166, 166, 166, 0.2)',
        'border-subtle': 'rgba(207, 154, 36, 0.3)', // Ouro Low Opacity
        'border-focus': '#CF9A24', // Ouro

        // Paleta Esmeralda Solar (Base)
        esmeralda: {
          DEFAULT: '#184434', // Esmeralda Profundo (cor-base)
          light: '#2A6A52',
          dark: '#0F2A20',
          deep: '#04160f', // Legacy Dark
        },
        ouro: {
          DEFAULT: '#CF9A24', // Atualizado para tom do Design System
          light: '#E1B959',
          dark: '#B08935',
        },
        marfim: {
          DEFAULT: '#F5F3EE', // Atualizado para tom do Design System
          light: '#FFFFFF',
          dark: '#E8E4D8',
        },
        grafite: {
          DEFAULT: '#2E363D', // Atualizado para tom do Design System
          light: '#333333',
          dark: '#000000',
        },
        // Cores padrão do sistema
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        shimmer: {
          '0%': {
            transform: 'translateX(-100%) skewX(-12deg)',
          },
          '100%': {
            transform: 'translateX(200%) skewX(-12deg)',
          },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2s ease-in-out infinite',
        bounce: 'bounce 1s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
