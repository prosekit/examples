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
        className='outline-unset focus-visible:outline-unset inline-flex items-center justify-center rounded-md bg-transparent bg-transparent p-2 font-medium transition focus-visible:ring-2 focus-visible:ring-gray-950 disabled:pointer-events-none hover:opacity-90 disabled:opacity-50 hover:disabled:opacity-50 data-[state=on]:opacity-80 text-gray-500 data-[state=on]:text-black dark:text-gray-400 dark:data-[state=on]:text-white box-border bg-transparent data-[state=on]:bg-gray-400/20 hover:data-[state=off]:bg-gray-400/20 dark:data-[state=on]:bg-gray-700 dark:hover:data-[state=off]:bg-gray-700/80'
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
