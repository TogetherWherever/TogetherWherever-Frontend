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
        'sunset': '#F5D6AD',
        'faded-orange': '#F0944D',
        'indian-yellow': "#E3A857",
        'teal-blue': '#008FA5',
        'moonstone-blue': '#009FB7',
        'ball-blue': '#28B1C6',
        'faded-blue': '#658CBB',
        'asparagus-green': '#60993E',
        'mint-cream': '#EFF9F0',
        'bistre': '#33261D',
        'earth-yellow-light': '#ECE2D7',
        'dorado': '#6B5755',
        'hurricane': '#877C7B',
        'satin-linen': '#ECE2D7',
        'red': '#ff0000'
      },
    },
  },
  plugins: [],
};
export default config;
