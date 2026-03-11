import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        contact: resolve(__dirname, 'src/contact.html'),
        privacy: resolve(__dirname, 'src/privacy.html'),
        terms: resolve(__dirname, 'src/terms.html'),
      },
    },
  },
  server: {
    allowedHosts: ['pregastrular-vacillant-chrystal.ngrok-free.dev'],
  },
});
