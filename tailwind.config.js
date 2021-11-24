module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "black-background": "#080405",
        "proj-red": "#e21717",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
