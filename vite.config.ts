import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  build: {
    outDir: 'public/build', // Carpeta de salida
  },
  plugins: [
    tailwindcss(),
  ],
})