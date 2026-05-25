<script lang="ts">
import { renderMermaidSVG, THEMES } from 'beautiful-mermaid'
import type { ProseMirrorNode } from 'prosekit/pm/model'
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { isCodeBlockPreviewHiddenDecoration, shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'
import { TextSelection } from 'prosekit/pm/state'
import type { Decoration } from 'prosekit/pm/view'
import type { SvelteNodeViewProps } from 'prosekit/svelte'
import { fromStore } from 'svelte/store'

interface Props extends SvelteNodeViewProps {}

const props: Props = $props()
const node: ProseMirrorNode = $derived(fromStore(props.node).current)
const decorations: readonly Decoration[] = $derived(fromStore(props.decorations).current)

const attrs = $derived(node.attrs as CodeBlockAttrs)
const language = $derived(attrs.language || '')
const hidePreview = $derived(decorations.some(isCodeBlockPreviewHiddenDecoration))
const showMermaidPreview = $derived(!hidePreview && language === 'mermaid')
let preElement: HTMLPreElement | null = null

const mermaidPreview = $derived.by<{ svg: string | null; error: Error | null }>(() => {
  if (language !== 'mermaid') return { svg: null, error: null }
  try {
    return { svg: renderMermaidSVG(node.textContent, THEMES['tokyo-night']), error: null }
  } catch (err) {
    return { svg: null, error: err instanceof Error ? err : new Error(String(err)) }
  }
})

function setLanguage(lang: string) {
  const newAttrs: CodeBlockAttrs = { language: lang }
  props.setAttrs(newAttrs)
}

function bindContentRef(element: HTMLPreElement) {
  props.contentRef(element)
  preElement = element
}

function focusSource(event: MouseEvent) {
  event.preventDefault()
  const pos = props.getPos()
  if (typeof pos !== 'number') return
  const { state, dispatch } = props.view
  const selection = TextSelection.near(state.doc.resolve(pos + 1), 1)
  dispatch(state.tr.setSelection(selection))
  props.view.focus()
  preElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}
</script>

<div
  class="relative mx-2 top-3 h-0 select-none overflow-visible text-xs data-preview:hidden"
  contentEditable="false"
  data-preview={showMermaidPreview ? '' : undefined}
>
  <select
    aria-label="Code block language"
    class="outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded-sm border-none bg-transparent px-2 py-1 text-xs transition text-(--prosemirror-highlight) opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 hover:[div[data-node-view-root]:hover_&]:opacity-80"
    value={language}
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
<pre
  use:bindContentRef
  class="data-preview:hidden"
  data-preview={showMermaidPreview ? '' : undefined}
  data-language={language}
></pre>
{#if showMermaidPreview}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    aria-label="Edit source"
    class="block py-2 overflow-auto"
    contentEditable="false"
    onmousedown={focusSource}
  >
    {#if mermaidPreview.error}
      <pre>{mermaidPreview.error.message}</pre>
    {/if}
    {#if mermaidPreview.svg}
      <div>{@html mermaidPreview.svg}</div>
    {/if}
  </div>
{/if}
