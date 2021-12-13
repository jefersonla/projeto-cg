import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { injectHtml } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false
  },
  plugins: [
    svelte({
      hot: false, // Desativado por problemas
    }),
    injectHtml({
      data: {
        compiledStatus: '<div id="--compiled-vite" style="display: none"></div>'
      }
    })
  ]
});
