import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'
import type { SolidNodeViewProps } from 'prosekit/solid'
import { For } from 'solid-js'

export default function CodeBlockView(props: SolidNodeViewProps) {
  const attrs = props.node.attrs as CodeBlockAttrs
  const language = attrs.language

  const setLanguage = (language: string) => {
    const attrs: CodeBlockAttrs = { language }
    props.setAttrs(attrs)
  }

  return (
    <>
      <div
        class="relative mx-2 top-3 h-0 select-none overflow-visible text-xs"
        contentEditable={false}
      >
        <select
          aria-label="Code block language"
          class="outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded-sm border-none bg-transparent px-2 py-1 text-xs transition text-(--prosemirror-highlight) opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 hover:[div[data-node-view-root]:hover_&]:opacity-80"
          onChange={(event) => setLanguage(event.target.value)}
          value={language || ''}
        >
          <option value="">Plain Text</option>
          <For each={shikiBundledLanguagesInfo}>
            {(info) => <option value={info.id}>{info.name}</option>}
          </For>
        </select>
      </div>
      <pre ref={props.contentRef} data-language={language}></pre>
    </>
  )
}
