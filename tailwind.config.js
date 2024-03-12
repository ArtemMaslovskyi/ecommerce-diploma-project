/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./src/**/*.{html,js}",
  ],
  theme: {
    fontFamily: {
      roboto: ["roboto"],
    },
    extend: {
      colors: {
        "main-yellow": "#FFC700",
        "main-blue": "#00296B",
      },
      backgroundImage: {
        "graph-pattern": "url('./pages/graph.png')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
