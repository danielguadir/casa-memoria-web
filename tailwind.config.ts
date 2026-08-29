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
        crema: "#FDFBF7",
        'crema-dark': "#F2EBE1",
        'verde-profundo': "#1C3F2B", // conexión con territorio y montaña
        terracota: "#A84522", // tierra, memoria, calidez
        'terracota-light': "#C95B36",
        cafe: "#4A3018", // identidad orgánica ancestral
        mostaza: "#DCA74E", // acento cálido
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-lora)', 'serif'],
      },
      backgroundImage: {
        'pattern-tejido': "url('/images/tejido-pattern.png')",
        'pattern-tierra': "url('/images/tierra-pattern.png')",
      }
    },
  },
  plugins: [],
};
export default config;
