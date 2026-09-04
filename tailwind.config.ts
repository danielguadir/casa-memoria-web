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
        crema: "var(--color-crema)",
        'crema-dark': "var(--color-crema-dark)",
        'verde-profundo': "var(--color-verde-profundo)",
        terracota: "var(--color-terracota)",
        'terracota-light': "var(--color-terracota-light)",
        cafe: "var(--color-cafe)",
        mostaza: "var(--color-mostaza)",
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
