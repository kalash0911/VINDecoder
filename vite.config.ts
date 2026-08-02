import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// If deploying to https://<user>.github.io/<repo>/, set base to '/<repo>/'.
// For Vercel/Netlify or https://<user>.github.io/, the default '/' is correct.
export default defineConfig({
  base: '/VINDecoder',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
