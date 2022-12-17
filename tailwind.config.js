/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "black-background": "#080405",
        "proj-red": "#e21717",
      },
    },
  },
  plugins: [],
};
