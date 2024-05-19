
import { ThemeSelector } from './theme-selector'

export default function Toolbar() {
  return (
    <div className="z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-background border-border border-solid border-l-0 border-r-0 border-t-0 border-b">
      <ThemeSelector />
    </div>
  )
}
