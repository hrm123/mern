/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8888,
    strictPort: true,
  },
  build: {
    outDir: '../planetravelapis/public',
    emptyOutDir: true,
  },
  test: {
    environment: 'jsdom', // Use 'jsdom' for browser environments, 'node' for Node.js
    globals: true, // Allows using `expect`, `describe`, `it` globally without imports
    setupFiles: './test/setup.ts', // Optional: Path to a setup file for global configurations
  },
});
