import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./extension/**/*.{html,mjs}"],
  theme: {
    extend: {
      colors: {
        cararra: {
          50: "#f7f7f5",
          100: "#eeefe9",
          200: "#dadbcd",
          300: "#c1c3ae",
          400: "#aaab8c",
          500: "#999976",
          600: "#8d8a69",
          700: "#757259",
          800: "#615e4b",
          900: "#4f4d3f",
          950: "#2a2820",
        },
      },
      fontFamily: {
        "berkely-mono": "Berkeley Mono Trial",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};
