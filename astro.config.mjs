import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// URLs que NO deben aparecer en el sitemap (tambien llevan noindex):
// - Stubs de herramientas "Beta Privada / En desarrollo" (thin content)
// - Paginas de gracias post-conversion
const SITEMAP_EXCLUDE = new Set([
  ...[
    'test-colorimetria', 'calculadora-contraste', 'generador-paletas',
    'test-psicologia-color', 'detector-errores-color', 'analizador-rostro',
    'simulador-gafas', 'guia-barbas', 'calculadora-aurea', 'simulador-peinados',
    'calculadora-cuerpo', 'generador-guia-estilo', 'detector-errores-vestuario',
    'simulador-siluetas', 'test-proporcion', 'audit-linkedin', 'generador-outfits',
    'test-arquetipos', 'nivel-sofisticacion', 'calculadora-roi',
  ].map((s) => `https://rogermurillo.co/herramientas/${s}/`),
  'https://rogermurillo.co/gracias-compra/',
  'https://rogermurillo.co/gracias-lead/',
]);

export default defineConfig({
  site: 'https://rogermurillo.co',
  integrations: [
    react(),
    sitemap({
      // Excluir thin content: stubs, gracias, y blog programatico (noindex)
      filter: (page) =>
        !SITEMAP_EXCLUDE.has(page) &&
        !page.includes('/blog/estilo/'),
    }),
  ],
  vite: {
    plugins: [tailwind()],
  },
});
