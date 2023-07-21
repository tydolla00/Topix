/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
  plugins: [`prettier-plugin-tailwindcss`],
};
