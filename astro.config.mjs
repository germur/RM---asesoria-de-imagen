import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rogermurillo.co',
  base: '/RM---asesoria-de-imagen',
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwind()],
  },
});
