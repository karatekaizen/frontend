import frappePreset from 'frappe-ui/tailwind'
import colors from 'tailwindcss/colors'

import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [frappePreset],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/frappe-ui/src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        slate: colors.slate,
        zinc: colors.zinc,
        gray: {
          ...colors.gray,
          750: '#232D42',
          850: '#18202F',
          950: '#0B0F19',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [typography],
}
