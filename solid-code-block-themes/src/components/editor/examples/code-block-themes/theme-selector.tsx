import {
  defineCodeBlockShiki,
  shikiBundledThemesInfo,
  type ShikiBundledTheme,
} from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/solid'
import { createMemo, createSignal, For, type JSX } from 'solid-js'

export function ThemeSelector(): JSX.Element {
  const [theme, setTheme] = createSignal('github-dark')
  const extension = createMemo(() => {
    return defineCodeBlockShiki({ themes: [theme() as ShikiBundledTheme] })
  })
  useExtension(extension)

  return (
    <>
      <label for="code-block-theme-selector">Theme</label>
      <select
        id="code-block-theme-selector"
        value={theme()}
        onChange={(event) => setTheme(event.target.value)}
        class="outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 text-sm focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 disabled:pointer-events-none min-w-9 min-h-9 text-gray-900 dark:text-gray-50 disabled:text-gray-900/50 dark:disabled:text-gray-50/50 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=on]:bg-gray-200 dark:data-[state=on]:bg-gray-700"
      >
        <For each={shikiBundledThemesInfo}>
          {(info) => <option value={info.id}>{info.id}</option>}
        </For>
      </select>
    </>
  )
}
