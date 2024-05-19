import {
  defineCodeBlockShiki,
  shikiBundledThemesInfo,
  type ShikiBundledTheme,
} from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/react'
import { useMemo, useState } from 'react'

export function ThemeSelector() {
  const [theme, setTheme] = useState('github-dark')
  const extension = useMemo(() => {
    return defineCodeBlockShiki({ themes: [theme as ShikiBundledTheme] })
  }, [theme])
  useExtension(extension)

  return (
    <>
      <label>Theme:</label>
      <select
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
        className="outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:disabled:opacity-50 bg-transparent hover:bg-secondary data-[state=on]:bg-accent"
      >
        {shikiBundledThemesInfo.map((info) => (
          <option key={info.id} value={info.id}>
            {info.id}
          </option>
        ))}
      </select>
    </>
  )
}
