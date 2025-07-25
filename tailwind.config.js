/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
        },
        beige: {
          50: "#fefdf9",
          100: "#fefbf3",
          200: "#fdf4e1",
          300: "#fceacc",
          400: "#f9d5a7",
          500: "#f5c282",
          600: "#f0a855",
          700: "#e18b2b",
          800: "#c4741f",
          900: "#a0611a",
        },
      },
    },
  },
  plugins: [],
};
