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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        // Core Web Theme (Crisp, High-Legibility Light White Background & Deep Slate Text)
        background: '#ffffff', // Primary base background (pure white for premium editorial look)
        foreground: '#0f172a', // Deep slate gray text for maximum legibility
        
        // Cards and Content Block Modules (Standout panels with soft shadows and thin borders)
        card: {
          DEFAULT: '#ffffff', 
          foreground: '#0f172a',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#0f172a',
        },
        
        // Secondary Brand Accent (Signature Upfluence Corporate Deep Blue)
        // This instantly colors your active tabs, main navigation headings, and key focus metrics!
        primary: {
          DEFAULT: '#0e0ed7', 
          foreground: '#ffffff',
        },
        
        // Tertiary Brand Highlight (Upfluence Action Orange-Red)
        // Used cleanly on secondary badges, warning blocks, focus buttons, and CTAs!
        accent: {
          DEFAULT: '#ff4432', 
          foreground: '#ffffff',
        },
        ring: '#0e0ed7', // Focus rings default to corporate blue
        
        // Interactive state helpers
        secondary: {
          DEFAULT: '#f1f5f9', // Clean gray container filling for subtle contrast blocks
          foreground: '#0f172a',
        },
        muted: {
          DEFAULT: '#f8fafc',
          foreground: '#64748b', 
        },
        
        // System Layout Standards
        destructive: {
          DEFAULT: '#ff4432',
          foreground: '#ffffff',
        },
        border: '#e2e8f0', // Clean card outline borders
        input: '#ffffff',
        
        // Analytical Data Charts (Drawn using corporate blue and brand red accents)
        chart: {
          '1': '#0e0ed7', // Primary chart series (Corporate Blue)
          '2': '#ff4432', // Accent chart series (Vibrant Red)
          '3': '#3b82f6', 
          '4': '#10b981', 
          '5': '#f59e0b', 
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
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
