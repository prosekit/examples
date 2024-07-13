import type { Config } from 'tailwindcss'
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'

const config: Config = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx,vue,svelte}'],
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['lucide']),
    }),
  ],
}
export default config
