import wasm from 'vite-plugin-wasm'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [wasm(), react(), tailwindcss()],
})
