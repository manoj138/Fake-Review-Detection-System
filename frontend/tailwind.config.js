/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F5F7FB',
          sidebar: '#111827',
          sidebarHover: '#1C2638',
          primary: '#635BFF',
          primaryHover: '#5249E0',
          ai: '#8B5CF6',
          aiLight: '#F3EEFE',
          success: '#16A34A',
          successLight: '#DCFCE7',
          danger: '#EF6464',
          dangerLight: '#FEE2E2',
          warning: '#F59E0B',
          warningLight: '#FEF3C7',
          card: '#FFFFFF',
          dark: '#172033',
          muted: '#718096',
          border: '#E6EAF2',
          borderLight: '#F1F4F9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        card: '0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03)',
        popover: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
