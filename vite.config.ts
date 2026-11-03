import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'vendor-motion'
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/'))
            return 'vendor-react'
        },
      },
    },
  },
})
