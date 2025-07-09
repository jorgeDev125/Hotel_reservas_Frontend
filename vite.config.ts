import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  build: {
    outDir: 'public/dist', // Carpeta de salida
  },
  plugins: [
    tailwindcss(),
  ],
})