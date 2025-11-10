<script lang="ts">
import {
  defineCodeBlockShiki,
  shikiBundledThemesInfo,
  type ShikiBundledTheme,
} from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/svelte'
import {
  derived,
  writable,
} from 'svelte/store'

const theme = writable<ShikiBundledTheme>('github-dark')
const extension = derived(theme, ($theme) => {
  return defineCodeBlockShiki({ themes: [$theme] })
})

useExtension(extension)

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  theme.set(target.value as ShikiBundledTheme)
}
</script>

<label for="code-block-theme-selector">Theme</label>
<select
  id="code-block-theme-selector"
  value={$theme}
  onchange={handleChange}
  class="outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 text-sm focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 disabled:pointer-events-none min-w-9 min-h-9 text-gray-900 dark:text-gray-50 disabled:text-gray-900/50 dark:disabled:text-gray-50/50 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=on]:bg-gray-200 dark:data-[state=on]:bg-gray-700"
>
  {#each shikiBundledThemesInfo as info (info.id)}
    <option value={info.id}>
      {info.id}
    </option>
  {/each}
</select>
