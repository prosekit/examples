import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromHTML } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/solid'
import { createSignal, For, type JSX } from 'solid-js'

import { htmlFromMarkdown, markdownFromHTML } from './markdown'

export default function Editor(): JSX.Element {
  const [records, setRecords] = createSignal<string[]>([])
  const [hasUnsavedChange, setHasUnsavedChange] = createSignal(false)

  const extension = defineBasicExtension()
  const editor = createEditor({ extension })

  const handleDocChange = () => setHasUnsavedChange(true)
  useDocChange(handleDocChange, { editor })

  const handleSave = () => {
    const html = editor.getDocHTML()
    const record = markdownFromHTML(html)
    setRecords((prev) => [...prev, record])
    setHasUnsavedChange(false)
  }

  const handleLoad = (record: string) => {
    const html = htmlFromMarkdown(record)
    editor.setContent(jsonFromHTML(html, { schema: editor.schema }))
    setHasUnsavedChange(false)
  }

  return (
    <div class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white">
      <button
        onClick={handleSave}
        disabled={!hasUnsavedChange()}
        class="m-1 border border-solid bg-white px-2 py-1 text-sm text-black disabled:cursor-not-allowed disabled:text-gray-500"
      >
        {hasUnsavedChange() ? 'Save' : 'No changes to save'}
      </button>
      <ul class="border-b border-t border-solid text-sm">
        <For each={records()}>
          {(record) => (
            <li class="m-1 flex gap-2">
              <button
                class="border border-solid bg-white px-2 py-1 text-black"
                onClick={() => handleLoad(record)}
              >
                Load
              </button>
              <span class="flex-1 overflow-x-scroll p-2">
                <pre>{record}</pre>
              </span>
            </li>
          )}
        </For>
      </ul>
      <ProseKit editor={editor}>
        <div class="relative w-full flex-1 box-border overflow-y-auto">
          <div
            ref={editor.mount}
            class="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"
          ></div>
        </div>
      </ProseKit>
    </div>
  )
}
