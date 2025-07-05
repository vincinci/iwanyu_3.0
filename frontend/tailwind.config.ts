import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Iwanyu Brand Colors
        brand: {
          // Golden Yellow - Primary CTA & Accents
          yellow: {
            50: '#fffef7',
            100: '#fefcef', 
            200: '#fef7d7',
            300: '#feefbf',
            400: '#fde68a',
            500: '#FDCB58', // Primary Golden Yellow
            600: '#FFD700', // Pure Gold
            700: '#f59e0b',
            800: '#d97706',
            900: '#92400e',
          },
          // Deep Charcoal Gray - Text & UI Base
          charcoal: {
            50: '#f8f9fa',
            100: '#f1f3f4',
            200: '#e3e5e6',
            300: '#d1d5d8',
            400: '#9aa0a6',
            500: '#5f6368', 
            600: '#3c4043',
            700: '#2E2E2E', // Main Deep Charcoal
            800: '#202124',
            900: '#171717',
          },
          // Soft Green - Success & Verified Vendors
          green: {
            50: '#f0f9f4',
            100: '#dcf4e6',
            200: '#B7E4C7', // Light success green
            300: '#86d9a3',
            400: '#54c27d',
            500: '#54A66D', // Main success green
            600: '#22853f',
            700: '#1e7234',
            800: '#1d5b2c',
            900: '#194b25',
          },
          // Sky Blue - Secondary Highlights
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#4CA3DD', // Light sky blue
            500: '#3DA9FC', // Main sky blue
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
          // Rwanda Flag Blue - National Accent
          rwanda: {
            50: '#eff8ff',
            100: '#dff0ff',
            200: '#b8e4ff',
            300: '#7cd2ff',
            400: '#00ADEF', // Rwanda flag blue
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
          },
          // Simplified color aliases for easier use
          golden: '#FDCB58',      // Primary golden yellow
          primary: '#2E2E2E',     // Deep charcoal gray  
          success: '#54A66D',     // Soft green
          info: '#3DA9FC',        // Sky blue
        },
        // Keep existing design system colors
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
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
