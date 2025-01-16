/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        animation: {
          'spin-slow': 'spin 2s linear infinite',
          'spin-fast': 'spin 500ms linear infinite',
        },
      },
    },
  },
  plugins: [],
}

