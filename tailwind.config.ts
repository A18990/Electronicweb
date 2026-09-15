import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16211F", // near-black, warm dark — body text
        paper: "#F1F4F3", // cool off-white — page background
        petrol: "#0F3D3E", // deep teal — headings, primary surfaces
        amber: "#E8A33D", // copper/amber — CTAs, in-stock signal
        slate: "#5C7A78", // muted blue-grey — secondary text, borders
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "4px",
      },
    },
  },
  plugins: [],
};

export default config;