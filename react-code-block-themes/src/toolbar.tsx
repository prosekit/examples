import { ThemeSelector } from './theme-selector'

export default function Toolbar() {
  return (
    <div className="z-2 box-border border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
      <ThemeSelector />
    </div>
  )
}
