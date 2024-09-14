import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],   

  build: {
    outDir: 'dist',
    assetsDir: 'assets',   

    css: {
      preprocessorOptions: {
        css: {
          additionalData: `@import "./css/index.css";`,
        },
      },
    },
  },
});