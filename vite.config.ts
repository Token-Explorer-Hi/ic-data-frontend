import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';

dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    environment('all', { prefix: 'CANISTER_' }),
    environment('all', { prefix: 'DFX_' }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    port: 3001,
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('@dfinity/') || id.includes('react')) {
              return 'vendor';
            }
            if (id.includes('@chakra-ui/') || id.includes('@emotion/') || id.includes('framer-motion')) {
              return 'ui';
            }
            return 'deps';
          }
        }
      }
    }
  },
  cacheDir: '../node_modules/.vite',
});
