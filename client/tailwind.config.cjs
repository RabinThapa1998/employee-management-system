/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--color-brand-primary)',
          secondary: 'var(--color-brand-secondary)',
        },
        gray: {
          primary: 'var(--color-gray-primary)',
        },
      },
      borderRadius: {
        primary: '5px',
      },
    },
    plugins: [],
  },
  corePlugins: {
    preflight: false,
  },
};
