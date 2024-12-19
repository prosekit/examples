import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'

export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx,vue,svelte}'],
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['lucide']),
    }),
  ],
}
