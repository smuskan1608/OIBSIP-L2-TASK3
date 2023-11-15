/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#112d4e',
        'hard-blue': '#3f72af',
        'button': '#3f72af',
        'map': '#102e51'
      },
    },
  },
  plugins: [],
}

