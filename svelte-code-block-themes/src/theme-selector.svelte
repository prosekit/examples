<script lang="ts">
import {
  defineCodeBlockShiki,
  shikiBundledThemesInfo,
  type ShikiBundledTheme,
} from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/svelte'
import { writable } from 'svelte/store'

let theme: ShikiBundledTheme = 'github-dark'

// Ensure extension is always defined
$: extension = defineCodeBlockShiki({ themes: [theme as ShikiBundledTheme] })

// Create a writable store for the extension, initialized with the current extension
const extensionStore = writable(extension)

// Update the store whenever the extension changes
$: {
  extensionStore.set(extension)
}

// Use the store
useExtension(extensionStore)

function change_theme(event: Event) {
  const select = event.target as HTMLSelectElement
  theme = select.value as ShikiBundledTheme
}
</script>

<label for="code-block-theme-selector">Theme</label>
<select
  id="code-block-theme-selector"
  value={theme}
  on:change={change_theme}
  class="outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 text-sm focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 disabled:pointer-events-none min-w-9 min-h-9 text-gray-900 dark:text-gray-50 disabled:text-gray-900/50 dark:disabled:text-gray-50/50 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=on]:bg-gray-200 dark:data-[state=on]:bg-gray-700"
>
  {#each shikiBundledThemesInfo as info}
    <option value={info.id}>
      {info.id}
    </option>
  {/each}
</select>
