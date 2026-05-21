import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'

export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm] }) },
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (['react', 'react-dom', 'react-router-dom'].some(pkg => id.includes(`/node_modules/${pkg}/`))) return 'vendor'
          if (id.includes('/node_modules/recharts/')) return 'charts'
        }
      }
    }
  }
})
