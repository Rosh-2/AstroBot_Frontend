import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ Critical for Render (ensures assets load from root)
  optimizeDeps: {
    exclude: ['lucide-react'], 
  },
});