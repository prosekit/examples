import type { JSX } from 'solid-js'

import { ThemeSelector } from './theme-selector'

export default function Toolbar(): JSX.Element {
  return (
    <div class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
      <ThemeSelector />
    </div>
  )
}
