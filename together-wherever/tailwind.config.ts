import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'earth-yellow': '#E0A458',
        'moonstone-blue': '#009FB7',
        'asparagus-green': '#60993E',
        'mint-cream': '#EFF9F0',
        'bistre': '#33261D',
        'earth-yellow-light': '#ECE2D7',
      },
    },
  },
  plugins: [],
};
export default config;
