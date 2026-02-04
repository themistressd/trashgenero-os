import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Toxic Palette
        'void-black': '#000000',
        'system-gray': '#C0C0C0',
        'bubblegum-pink': '#FF00FF',
        'hacker-green': '#00FF00',
        'glitch-blue': '#0000FF',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'vcr': ['VCR OSD Mono', 'monospace'],
        'vt323': ['VT323', 'monospace'],
        'pixelify': ['Pixelify Sans', 'monospace'],
        'marker': ['Permanent Marker', 'cursive'],
        'mono': ['Courier New', 'monospace'],
      },
      animation: {
        'glitch': 'glitch 0.3s cubic-bezier(.25, .46, .45, .94) infinite',
        'glitch-slow': 'glitch 1s cubic-bezier(.25, .46, .45, .94) infinite',
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'crt-on': 'crt-on 0.5s ease-out forwards',
        'rgb-shift': 'rgb-shift 2s ease-in-out infinite',
        'pixel-fade': 'pixel-fade 0.3s ease-in-out',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { 
            transform: 'translate(0)',
            filter: 'hue-rotate(0deg)',
          },
          '33%': { 
            transform: 'translate(-2px, 2px)',
            filter: 'hue-rotate(90deg)',
          },
          '66%': { 
            transform: 'translate(2px, -2px)',
            filter: 'hue-rotate(180deg)',
          },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'crt-on': {
          '0%': {
            transform: 'scaleY(0.001) scaleX(2)',
            filter: 'brightness(4)',
          },
          '50%': {
            transform: 'scaleY(0.5) scaleX(1.5)',
          },
          '100%': {
            transform: 'scaleY(1) scaleX(1)',
            filter: 'brightness(1)',
          },
        },
        'rgb-shift': {
          '0%, 100%': { 
            textShadow: '2px 0 0 #FF00FF, -2px 0 0 #00FFFF',
          },
          '50%': { 
            textShadow: '-2px 0 0 #FF00FF, 2px 0 0 #00FFFF',
          },
        },
        'pixel-fade': {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.8)',
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
      screens: {
        'trash-mate': { 'max': '768px' }, // Mobile view
        'trash-os': { 'min': '769px' }, // Desktop view
      },
      boxShadow: {
        'win95': 'inset 1px 1px 0 0 #ffffff, inset -1px -1px 0 0 #808080',
        'win95-pressed': 'inset -1px -1px 0 0 #ffffff, inset 1px 1px 0 0 #808080',
        'crt': '0 0 20px rgba(0, 255, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
export default config;
