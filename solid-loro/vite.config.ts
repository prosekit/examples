import wasm from 'vite-plugin-wasm'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [wasm(), solid(), tailwindcss()],
})
