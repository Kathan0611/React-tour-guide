import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: './src/main.tsx', // Path to your library's entry point
      name: 'react-step-guide',  // Global variable name (useful for UMD builds)
      fileName: (format) => `react-step-guide.${format}.js`,
    },
    rollupOptions: {
      // Externalize dependencies that should not be bundled
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
})