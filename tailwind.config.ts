import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f5f8fa",
        card: "#ffffff",
        ink: "#0f172a",
        muted: "#64748b",
        positive: "#047857",
        negative: "#b91c1c",
        accent: "#0f766e"
      },
      boxShadow: {
        panel: "0 8px 30px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
