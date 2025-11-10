<script setup lang="ts">
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
} from 'prosekit/vue'
import {
  ref,
  watchPostEffect,
} from 'vue'

// A list of saved documents, stored as HTML strings
const records = ref<string[]>([])
// Whether there are unsaved changes
const hasUnsavedChange = ref(false)
// A key to force a re-render of the editor
const key = ref(1)

const extension = defineBasicExtension()
const editor = createEditor({ extension })

function handleDocChange() {
  hasUnsavedChange.value = true
}
useDocChange(handleDocChange, { editor })

function handleSave() {
  const record = editor.getDocHTML()
  records.value = [...records.value, record]
  hasUnsavedChange.value = false
}

function handleLoad(record: string) {
  editor.setContent(jsonFromHTML(record, { schema: editor.schema }))
  hasUnsavedChange.value = false
  key.value += 1
}

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <div class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white">
    <button
      :disabled="!hasUnsavedChange"
      class="m-1 border border-solid bg-white px-2 py-1 text-sm text-black disabled:cursor-not-allowed disabled:text-gray-500"
      @click="handleSave"
    >
      {{ hasUnsavedChange ? 'Save' : 'No changes to save' }}
    </button>
    <ul class="border-b border-t border-solid text-sm">
      <li
        v-for="(record, index) in records"
        :key="index"
        class="m-1 flex gap-2"
      >
        <button
          class="border border-solid bg-white px-2 py-1 text-black"
          @click="handleLoad(record)"
        >
          Load
        </button>
        <span class="flex-1 overflow-x-scroll p-2">
          <pre>{{ record }}</pre>
        </span>
      </li>
    </ul>
    <ProseKit :key="key" :editor="editor">
      <div class="relative w-full flex-1 box-border overflow-y-auto">
        <div ref="editorRef" class="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"></div>
      </div>
    </ProseKit>
  </div>
</template>
