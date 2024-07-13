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
      <label htmlFor="code-block-theme-selector">Theme</label>
      <select
        id="code-block-theme-selector"
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
        className="outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 text-sm focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 disabled:pointer-events-none min-w-9 min-h-9 disabled:opacity-50 hover:disabled:opacity-50 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 data-[state=on]:bg-gray-200 dark:data-[state=on]:bg-gray-700"
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
