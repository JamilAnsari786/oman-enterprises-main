import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify'; // ✅ Netlify adapter

export default defineConfig({
  output: 'server', // ✅ required for Netlify adapter if using SSR or endpoints
  adapter: netlify(),
  integrations: [tailwind(), react()],
});
