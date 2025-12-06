<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import {
  createEditor,
  jsonFromHTML,
} from 'prosekit/core'
import {
  ProseKit,
  useDocChange,
} from 'prosekit/svelte'

import {
  htmlFromMarkdown,
  markdownFromHTML,
} from './markdown'

// A list of saved documents, stored as Markdown strings
let records = $state<string[]>([])
// Whether there are unsaved changes
let hasUnsavedChange = $state(false)
// A key to force a re-render of the editor
let key = $state(1)

const extension = defineBasicExtension()
const editor = createEditor({ extension })

function handleDocChange() {
  hasUnsavedChange = true
}
useDocChange(handleDocChange, { editor })

function handleSave() {
  const html = editor.getDocHTML()
  const record = markdownFromHTML(html)
  records = [...records, record]
  hasUnsavedChange = false
}

function handleLoad(record: string) {
  const html = htmlFromMarkdown(record)
  editor.setContent(jsonFromHTML(html, { schema: editor.schema }))
  hasUnsavedChange = false
  key += 1
}
</script>

<div class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white">
  <button
    disabled={!hasUnsavedChange}
    class="m-1 border border-solid bg-white px-2 py-1 text-sm text-black disabled:cursor-not-allowed disabled:text-gray-500"
    onclick={handleSave}
  >
    {hasUnsavedChange ? 'Save' : 'No changes to save'}
  </button>
  <ul class="border-b border-t border-solid text-sm">
    {#each records as record, index (index)}
      <li class="m-1 flex gap-2">
        <button
          class="border border-solid bg-white px-2 py-1 text-black"
          onclick={() => handleLoad(record)}
        >
          Load
        </button>
        <span class="flex-1 overflow-x-scroll p-2">
          <pre>{record}</pre>
        </span>
      </li>
    {/each}
  </ul>
  {#key key}
    <ProseKit {editor}>
      <div class="relative w-full flex-1 box-border overflow-y-auto">
        <div {@attach editor.mount} class="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"></div>
      </div>
    </ProseKit>
  {/key}
</div>
