/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
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
  plugins: [
    `prettier-plugin-tailwindcss`,
    require("daisyui"),
    require("tailwindcss-animate"),
  ],
};
