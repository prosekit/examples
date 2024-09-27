import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'
import { createMemo, For } from 'solid-js'

export default function LanguageSelector({
  language,
  setLanguage,
}: {
  language?: string
  setLanguage: (language: string) => void
}) {
  const valueLanguage = createMemo(() => {
    return language
  })
  return (
    <div
      class="relative left-2 top-3 h-0 select-none overflow-visible"
      contentEditable={false}
    >
      <select
        class="outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded border-none bg-transparent px-2 py-1 text-xs transition text-white opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 [div[data-node-view-root]:hover_&]:hover:opacity-80"
        onChange={(event) => setLanguage(event.target.value)}
        value={valueLanguage() || ''}
      >
        <option value="">Plain Text</option>
        <For each={shikiBundledLanguagesInfo}>
          {(info) => <option value={info.id}>{info.name}</option>}
        </For>
      </select>
    </div>
  )
}
