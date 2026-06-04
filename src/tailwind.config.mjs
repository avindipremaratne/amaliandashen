/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "-0.01em" }],
                sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "-0.01em" }],
                base: ["1rem", { lineHeight: "1.5rem", letterSpacing: "-0.01em" }],
                lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],
                xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em", fontWeight: "bold" }],
                "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.011em", fontWeight: "bold" }],
                "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.01em", fontWeight: "bold" }],
                "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.01em", fontWeight: "bold" }],
                "5xl": ["3rem", { lineHeight: "1", letterSpacing: "-0.01em", fontWeight: "bold" }],
                "6xl": ["3.75rem", { lineHeight: "1", letterSpacing: "-0.01em" }],
                "7xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.01em" }],
                "8xl": ["5.25rem", { lineHeight: "1", letterSpacing: "-0.01em" }],
                "9xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.01em" }],
            },
            fontFamily: {
                heading: ["Ephesis", "cursive"],
                paragraph: ["Montserrat", "sans-serif"],
                montserrat: ["montserrat", "sans-serif"],
                "luxurious-script": ["luxurious-script", "cursive"],
                "dancing-script": ["dancing script", "cursive"],
                cinzel: ["cinzel", "serif"],
                fraunces: ["fraunces", "serif"],
                "pinyon-script": ["pinyon-script", "pinyon script", "cursive"],
                "victoria-titling-mt-w90": ["victoria-titling-mt-w90", "serif"],
                "bodoni-moda": ["bodoni-moda", "bodoni moda", "serif"],
                "mr-de-haviland": ["mr de haviland", "cursive"],
                "wixmadefortextapp-regular": ["wixmadefortextapp-regular", "sans-serif"]
            },
            colors: {
                 primary: '#1F2A44',          // Deep Midnight Navy (buttons)
  'primary-foreground': '#FFFFFF',
  'primary-hover': '#C8A96A',  // Champagne Gold (hover)
  accent: '#C8A96A',           // Champagne Gold (icons, dividers)
  'accent-foreground': '#1C1C1C',
  background: '#F7F3EE',       // Ivory Silk
  foreground: '#1C1C1C',       // Soft Black Ink
  secondary: '#FCFAF7',        // Soft Porcelain (cards)
  'secondary-foreground': '#1C1C1C',
  muted: '#F0EDE8',
  'muted-foreground': '#3A3A3A', // Charcoal Grey
  card: '#FCFAF7',             // Soft Porcelain
  'card-foreground': '#1C1C1C',
  border: '#E8E3DC',
  link: '#3A3A3A',             // Charcoal Grey
  gold: '#C8A96A',             // Champagne Gold utility
  navy: '#1F2A44',             // Navy utility
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
