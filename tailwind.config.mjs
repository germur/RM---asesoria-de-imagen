/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
    darkMode: ["class"],
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                // LA PALETA DE PODER (Vogue/GQ Aesthetic)
                brand: {
                    primary: '#C41230',    // Rojo Roger (Acción, Urgencia)
                    secondary: '#C1002B',  // Rojo Oscuro (Hover, Interacción)
                    black: '#000000',      // Autoridad Absoluta (Títulos)
                    white: '#FFFFFF',      // Espacio Negativo (Fondos)
                    gray: '#F0F2F3',       // Estructura (Tarjetas, Fondos secundarios)
                },
                // Mapeo para componentes UI existentes (Shadcn/UI compatibilidad)
                border: "#F0F2F3",       // Usamos el gris de marca para bordes sutiles
                input: "#F0F2F3",
                ring: "#C41230",         // El foco ahora es rojo
                background: "#FFFFFF",
                foreground: "#000000",

                primary: {
                    DEFAULT: "#000000",    // La acción principal por defecto sigue siendo negra (elegancia)
                    foreground: "#FFFFFF",
                },
                destructive: {
                    DEFAULT: "#C41230",    // El rojo también sirve para alertas críticas
                    foreground: "#FFFFFF",
                },
                muted: {
                    DEFAULT: "#F0F2F3",
                    foreground: "#64748b", // Slate-500 para texto secundario legible
                },
            },
            fontFamily: {
                // Mantenemos la dualidad Serif/Sans
                serif: ["Playfair Display", ...defaultTheme.fontFamily.serif],
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                lg: "0.2rem", // Reducimos radio: Bordes casi rectos = Más seriedad/fuerza
                md: "0.2rem",
                sm: "0.1rem",
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
