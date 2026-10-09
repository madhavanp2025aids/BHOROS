/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        content: '#F8F9FB',
        sidebar: '#FAFAFA',
        border: '#E5E7EB',
        primary: '#2563EB',
        'primary-hover': '#1d4ed8',
        text: {
          main: '#111827',
          muted: '#6B7280'
        },
        status: {
          info: '#3B82F6',
          warning: '#F59E0B',
          critical: '#EF4444',
          success: '#10B981'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
