import { renderMermaidSVG, THEMES } from 'beautiful-mermaid'
import {
  isCodeBlockPreviewHiddenDecoration,
  shikiBundledLanguagesInfo,
  type CodeBlockAttrs,
} from 'prosekit/extensions/code-block'
import { TextSelection } from 'prosekit/pm/state'
import type { SolidNodeViewProps } from 'prosekit/solid'
import { createMemo, For, Show, type JSX } from 'solid-js'

export default function CodeBlockView(props: SolidNodeViewProps): JSX.Element {
  const attrs = () => props.node.attrs as CodeBlockAttrs
  const language = () => attrs().language || ''
  const hidePreview = () =>
    props.decorations.some(isCodeBlockPreviewHiddenDecoration)
  const showMermaidPreview = () => !hidePreview() && language() === 'mermaid'
  let preRef: HTMLPreElement | undefined

  const mermaidPreview = createMemo<{
    svg: string | null
    error: Error | null
  }>(() => {
    if (language() !== 'mermaid') return { svg: null, error: null }
    try {
      return {
        svg: renderMermaidSVG(props.node.textContent, THEMES['tokyo-night']),
        error: null,
      }
    } catch (err) {
      return {
        svg: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  })

  const setLanguage = (lang: string) => {
    const newAttrs: CodeBlockAttrs = { language: lang }
    props.setAttrs(newAttrs)
  }

  const focusSource = (event: MouseEvent) => {
    event.preventDefault()
    const pos = props.getPos()
    if (typeof pos !== 'number') return
    const { state, dispatch } = props.view
    const selection = TextSelection.near(state.doc.resolve(pos + 1), 1)
    dispatch(state.tr.setSelection(selection))
    props.view.focus()
    preRef?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  return (
    <>
      <div
        class="relative mx-2 top-3 h-0 select-none overflow-visible text-xs data-preview:hidden"
        contentEditable={false}
        data-preview={showMermaidPreview() ? '' : undefined}
      >
        <select
          aria-label="Code block language"
          class="outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded-sm border-none bg-transparent px-2 py-1 text-xs transition text-(--prosemirror-highlight) opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 hover:[div[data-node-view-root]:hover_&]:opacity-80"
          onChange={(event) => setLanguage(event.target.value)}
          value={language()}
        >
          <option value="">Plain Text</option>
          <For each={shikiBundledLanguagesInfo}>
            {(info) => <option value={info.id}>{info.name}</option>}
          </For>
        </select>
      </div>
      <pre
        ref={(element) => {
          props.contentRef(element)
          preRef = element
        }}
        class="data-preview:hidden"
        data-preview={showMermaidPreview() ? '' : undefined}
        data-language={language()}
      ></pre>
      <Show when={showMermaidPreview()}>
        <div
          aria-label="Edit source"
          class="block py-2 overflow-auto"
          contentEditable={false}
          onMouseDown={focusSource}
        >
          <Show when={mermaidPreview().error}>
            <pre>{mermaidPreview().error?.message}</pre>
          </Show>
          <Show when={mermaidPreview().svg}>
            <div innerHTML={mermaidPreview().svg || ''}></div>
          </Show>
        </div>
      </Show>
    </>
  )
}
