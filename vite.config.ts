import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { routeMetadata } from './lib/routeMetadata';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [tailwindcss(), react(), {
        name: 'preview-route-metadata',
        configurePreviewServer(server) {
          server.middlewares.use((req, _res, next) => {
            const path = (req.url || '/').split('?')[0].replace(/\/$/, '') || '/';
            if (path !== '/' && path in routeMetadata) req.url = path + '/index.html';
            next();
          });
        },
      }],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom', 'react-router-dom'],
              motion: ['framer-motion'],
              icons: ['lucide-react'],
            },
          },
        },
      }
    };
});
