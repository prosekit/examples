import { defineCodeBlockShikiji } from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/react'
import { useMemo, useState } from 'react'
import { bundledThemesInfo, type BundledTheme } from 'shikiji'

export function ThemeSelector() {
  const [theme, setTheme] = useState('github-dark')
  const extension = useMemo(() => {
    return defineCodeBlockShikiji({ theme: theme as BundledTheme })
  }, [theme])
  useExtension(extension)

  return (
    <>
      <label>Theme:</label>
      <select
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
        className='outline-unset focus-visible:outline-unset inline-flex items-center justify-center rounded-md bg-transparent bg-transparent p-2 font-medium transition focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50 hover:disabled:opacity-50 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 data-[state=on]:bg-gray-200/60 dark:data-[state=on]:bg-gray-700/60'
      >
        {bundledThemesInfo.map((info) => (
          <option key={info.id} value={info.id}>
            {info.id}
          </option>
        ))}
      </select>
    </>
  )
}
