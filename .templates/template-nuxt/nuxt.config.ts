import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/app.css'],
  srcDir: 'src',
  vite: {
      plugins: [
        tailwindcss(),
      ],
  },
  imports: {
      autoImport: false,
    },
})
