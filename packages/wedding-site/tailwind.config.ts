import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      'black': '#000000',
      'white': '#FFFFFF',
      'morning-snow': '#7196c9',
      'amber-glow': '#ffe0b4',
      'mountain-pine': '#323b44'
    }
  },
  plugins: [],
};
export default config;
