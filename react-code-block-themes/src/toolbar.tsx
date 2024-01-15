import { ThemeSelector } from './theme-selector'

export default function Toolbar() {
  return (
    <div className='z-2 sticky top-0 box-border flex flex-wrap gap-1 bg-gray-100 p-2 dark:bg-zinc-900 items-center'>
      <ThemeSelector />
    </div>
  )
}
