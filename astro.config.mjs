// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.pavesasrl.it',

  integrations: [
    sitemap()
  ],

  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },

  // Image optimization configuration
  image: {
    // Use Sharp for image processing (default in Astro 5)
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    // Allow images from these domains for remote optimization
    domains: [],
    remotePatterns: []
  },

  // Prefetch configuration for faster navigation
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover'
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Optimize CSS
      cssMinify: true,
      // Optimize chunk splitting for better caching
      rollupOptions: {
        output: {
          // Manual chunks for better caching
          manualChunks: (id) => {
            // Separate vendor chunks
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    }
  }
});
