
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    // Solana libraries often expect 'global' or 'Buffer' to be defined
    'global': 'window',
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
  }
});
