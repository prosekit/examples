<script lang="ts">
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import type { SvelteNodeViewProps } from 'prosekit/svelte'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'

export let node: SvelteNodeViewProps['node']
export let setAttrs: SvelteNodeViewProps['setAttrs']
export let contentRef: SvelteNodeViewProps['contentRef']

// Ignore "<Component> was created with unknown prop" warnings in Svelte v4
$$restProps

const attrs = $node.attrs as CodeBlockAttrs
const language = attrs.language

const setLanguage = (language: string) => {
  const attrs: CodeBlockAttrs = { language }
  setAttrs(attrs)
}

const handleLanguageChange = (event: Event) => {
  setLanguage((event.target as HTMLSelectElement).value)
}
</script>

<div class='relative left-2 top-3 h-0 select-none overflow-visible' contentEditable={false}>
  <select
    class='outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded border-none bg-transparent px-2 py-1 text-xs transition text-white opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 [div[data-node-view-root]:hover_&]:hover:opacity-80'
    on:change={handleLanguageChange}
    value={language || ''}
  >
    <option value="">Plain Text</option>

    {#each shikiBundledLanguagesInfo as info (info.id)}
      <option value={info.id}>{info.name}</option>
    {/each}
  </select>
</div>
<pre use:contentRef data-language={language}></pre>
