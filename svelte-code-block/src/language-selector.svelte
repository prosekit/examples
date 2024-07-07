<script lang="ts">
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'

export let language: string | undefined = undefined
export let setLanguage: (language: string) => void

const handleChange = (event: Event) => {
  setLanguage((event.target as HTMLSelectElement).value)
}
</script>

<div class='relative left-2 top-3 h-0 select-none overflow-visible' contentEditable={false}>
  <select
    class='outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded border-none bg-transparent px-2 py-1 text-xs transition text-white opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 [div[data-node-view-root]:hover_&]:hover:opacity-80'
    on:change={handleChange}
    value={language || ''}
  >
    <option value="">Plain Text</option>

    {#each shikiBundledLanguagesInfo as info (info.id)}
      <option value={info.id}>{info.name}</option>
    {/each}
  </select>
</div>
