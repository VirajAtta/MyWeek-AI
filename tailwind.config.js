/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      colors: {
        // Calm enterprise palette
        canvas: '#f6f7f9',
        ink: {
          DEFAULT: '#1f2733',
          muted: '#5b6472',
          soft: '#8a919e',
        },
        brand: {
          50: '#eef4ff',
          100: '#dae6ff',
          200: '#bcd1ff',
          300: '#8fb2ff',
          400: '#5c88f5',
          500: '#3a63d8',
          600: '#2b4bb0',
          700: '#243d8c',
          800: '#213670',
          900: '#1f305c',
        },
        // Status accents (used with icon + text label, never color alone)
        action: {
          bg: '#fdecec',
          border: '#f5c6c6',
          fg: '#b42323',
        },
        changed: {
          bg: '#fdf4e3',
          border: '#f2dca6',
          fg: '#9a6a13',
        },
        fyi: {
          bg: '#eef1f5',
          border: '#d7dde6',
          fg: '#57616f',
        },
        ok: {
          bg: '#e9f6ee',
          border: '#bfe4cd',
          fg: '#1f7a44',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.08)',
        cardhover:
          '0 4px 8px rgba(16, 24, 40, 0.06), 0 8px 24px rgba(16, 24, 40, 0.10)',
        drawer: '-8px 0 24px rgba(16, 24, 40, 0.12)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
      },
    },
  },
  plugins: [],
}
