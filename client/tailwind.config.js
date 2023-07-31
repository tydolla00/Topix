/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        worksans: "Work Sans, sans-serif",
      },
      colors: {
        purpleGrad: "#662d8c",
        pinkGrad: "#ed1e79",
        blueGrad: "#00aeef",
        redGrad: "#ed1c24",
        lightblueGrad: "#d2ffff",
        whiteGrad: "#0694c6",
      },
    },
  },
  plugins: [`prettier-plugin-tailwindcss`, require("daisyui")],
  daisyui: {
    themes: [
      "corporate",
      {
        mytheme: {
          primary: "#7dd3fc",
          secondary: "#7c3aed",
          accent: "#f471b5",
          neutral: "#1d283a",
          "base-100": "#0f1729",
          info: "#0ca6e9",
          success: "#2bd4bd",
          warning: "#f4c152",
          error: "#fb6f84",
        },
      },
    ],
    darkTheme: "mytheme",
  },
};
