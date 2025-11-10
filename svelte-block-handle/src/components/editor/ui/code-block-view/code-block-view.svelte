<script lang="ts">
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'
import type { SvelteNodeViewProps } from 'prosekit/svelte'

interface Props extends SvelteNodeViewProps {}

const props: Props = $props()
const node = props.node

const attrs = $derived($node.attrs as CodeBlockAttrs)

function setLanguage(lang: string) {
  const newAttrs: CodeBlockAttrs = { language: lang }
  props.setAttrs(newAttrs)
}

function bindContentRef(element: HTMLPreElement) {
  props.contentRef(element)
}
</script>

<div class="relative mx-2 top-3 h-0 select-none overflow-visible text-xs" contentEditable="false">
  <select
    aria-label="Code block language"
    class="outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded-sm border-none bg-transparent px-2 py-1 text-xs transition text-(--prosemirror-highlight) opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 hover:[div[data-node-view-root]:hover_&]:opacity-80"
    value={attrs.language || ''}
    onchange={(event) => setLanguage((event.target as HTMLSelectElement).value)}
  >
    <option value="">Plain Text</option>
    {#each shikiBundledLanguagesInfo as info (info.id)}
      <option value={info.id}>
        {info.name}
      </option>
    {/each}
  </select>
</div>
<pre use:bindContentRef data-language={attrs.language}></pre>
