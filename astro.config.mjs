// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Canonical production origin. Used for canonical URLs, sitemap, OG tags.
  // Keep in sync with SITE.url in src/consts.ts.
  site: 'https://strictons.com',

  // Every page is statically generated at build time. No SSR, no adapter needed
  // for the Vercel deploy target — Vercel auto-detects the Astro build output.
  output: 'static',

  // Clean, trailing-slash-free URLs (matches vercel.json `trailingSlash: false`).
  trailingSlash: 'never',

  integrations: [
    // Emits /sitemap-index.xml + /sitemap-0.xml at build time.
    sitemap(),
  ],

  image: {
    // Sharp is Astro's default local image service; stated explicitly so the
    // build-time optimization pipeline is obvious to future contributors.
    service: { entrypoint: 'astro/assets/services/sharp' },
  },

  vite: {
    // Tailwind CSS v4 (configured via CSS in src/styles/global.css).
    plugins: [tailwindcss()],
  },
});
