import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

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
        heading: ['var(--font-heading)', 'serif'],
        numeric: ['var(--font-numeric)', 'serif'],
        'libre-caslon': ['var(--font-libre-caslon)', 'serif'],
        marcellus: ['var(--font-marcellus)', 'serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        jost: ['var(--font-jost)', 'sans-serif'],
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
        control: 'var(--radius-control)',
        card: 'var(--radius-card)',
        pill: 'var(--radius-pill)',
      },
      spacing: {
        control: 'var(--control-min-height)',
      },
      minHeight: {
        control: 'var(--control-min-height)',
      },
      letterSpacing: {
        label: '0.16em',
        eyebrow: '0.3em',
      },
      boxShadow: {
        'card-sm': '0 15px 35px -20px rgba(24, 68, 52, 0.15)',
        'card-sm-hover': '0 25px 50px -25px rgba(24, 68, 52, 0.25)',
        'card-md': '0 24px 55px -34px rgba(24, 68, 52, 0.35)',
        'button-gold': '0 10px 25px -10px rgba(200, 155, 60, 0.2)',
        'button-gold-strong': '0 10px 25px -10px rgba(200, 155, 60, 0.3)',
        card: '0 4px 20px -4px rgba(24, 68, 52, 0.05)',
        'card-hover': '0 20px 40px -12px rgba(24, 68, 52, 0.15)',
        'button-primary': '0 25px 45px -20px rgba(199, 154, 52, 0.45)',
      },
      colors: {
        // Primitivas oficiais da marca. Os canais RGB preservam suporte a /opacity.
        'brand-emerald-950': 'rgb(var(--brand-emerald-950) / <alpha-value>)',
        'brand-emerald-900': 'rgb(var(--brand-emerald-900) / <alpha-value>)',
        'brand-emerald-800': 'rgb(var(--brand-emerald-800) / <alpha-value>)',
        'brand-emerald-700': 'rgb(var(--brand-emerald-700) / <alpha-value>)',
        'brand-gold-600': 'rgb(var(--brand-gold-600) / <alpha-value>)',
        'brand-gold-300': 'rgb(var(--brand-gold-300) / <alpha-value>)',
        'brand-ivory': 'rgb(var(--brand-ivory) / <alpha-value>)',
        'brand-white': 'rgb(var(--brand-white) / <alpha-value>)',
        'brand-graphite': 'rgb(var(--brand-graphite) / <alpha-value>)',
        'brand-text-secondary': 'rgb(var(--brand-text-secondary) / <alpha-value>)',

        // Tokens semânticos. O layout público redefine as variáveis sem afetar o admin.
        'text-primary': 'rgb(var(--ds-text-primary) / <alpha-value>)',
        'text-body': 'rgb(var(--ds-text-body) / <alpha-value>)',
        'text-secondary': 'rgb(var(--ds-text-secondary) / <alpha-value>)',
        'text-muted': 'rgb(var(--ds-text-muted) / <alpha-value>)',
        'text-on-dark': 'rgb(var(--ds-text-on-dark) / <alpha-value>)',
        'text-on-brand': 'rgb(var(--ds-text-on-brand) / <alpha-value>)',
        'surface-page': 'rgb(var(--ds-surface-page) / <alpha-value>)',
        'surface-section': 'rgb(var(--ds-surface-section) / <alpha-value>)',
        'surface-card': 'rgb(var(--ds-surface-card) / <alpha-value>)',
        'surface-subtle': 'rgb(var(--ds-surface-subtle) / <alpha-value>)',
        'surface-dark': 'rgb(var(--ds-surface-dark) / <alpha-value>)',
        'surface-dark-elevated': 'rgb(var(--ds-surface-dark-elevated) / <alpha-value>)',
        'action-primary': 'rgb(var(--ds-action-primary) / <alpha-value>)',
        'action-primary-hover': 'rgb(var(--ds-action-primary-hover) / <alpha-value>)',
        'action-strong': 'rgb(var(--ds-action-strong) / <alpha-value>)',
        'action-strong-hover': 'rgb(var(--ds-action-strong-hover) / <alpha-value>)',
        'action-on-dark': 'rgb(var(--ds-action-on-dark) / <alpha-value>)',
        'border-default': 'rgb(var(--ds-border-default) / <alpha-value>)',
        'border-subtle': 'rgb(var(--ds-border-subtle) / <alpha-value>)',
        'border-on-dark': 'rgb(var(--ds-border-on-dark) / <alpha-value>)',
        'border-focus': 'rgb(var(--ds-border-focus) / <alpha-value>)',
        'focus-ring': 'rgb(var(--ds-focus-ring) / <alpha-value>)',
        error: 'rgb(var(--ds-error) / <alpha-value>)',
        whatsapp: 'rgb(var(--ds-whatsapp) / <alpha-value>)',

        // Paleta legada: mantida até a migração das páginas existentes.
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
  plugins: [
    require('tailwindcss-animate'),
    plugin(({ addVariant }) => {
      addVariant('public', '.public-theme &');
    }),
  ],
};
export default config;
