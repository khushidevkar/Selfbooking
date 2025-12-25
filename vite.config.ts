import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: 'demo.selfbooking.co',  // your custom host
    port: 3000,
    strictPort: true,
    open: true,
    proxy: {
      // forward /api to your backend
      '/api/hotels': {
      // '/api/tbo_hotel': {
        target: 'https://demo.taxivaxi.com',
        // target: 'https://demo.fleet247.in',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
