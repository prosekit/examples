<script setup lang="ts">
import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import {
  createEditor,
  htmlFromNode,
  jsonFromHTML,
  type NodeJSON,
} from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/vue'
import { computed, ref, watchPostEffect } from 'vue'
import { ListDOMSerializer } from 'prosekit/extensions/list'

const key = ref(1)
const defaultDoc = ref<NodeJSON | undefined>()
const records = ref<string[]>([])
const hasUnsavedChange = ref(false)

const editor = computed(() => {
  const extension = defineBasicExtension()
  return createEditor({ extension, defaultDoc: defaultDoc.value })
})
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  const editorValue = editor.value
  editorValue.mount(editorRef.value)
  onCleanup(() => editorValue.mount(null))
})

const handleDocChange = () => (hasUnsavedChange.value = true)
useDocChange(handleDocChange, { editor })

// Save the current document as a HTML string
const handleSave = () => {
  const record = htmlFromNode(editor.value.view.state.doc, {
    DOMSerializer: ListDOMSerializer,
  })
  records.value.push(record)
  hasUnsavedChange.value = false
}

// Load a document from a HTML string
const handleLoad = (record: string) => {
  defaultDoc.value = jsonFromHTML(record, { schema: editor.value.schema })
  key.value += 1
  hasUnsavedChange.value = false
}
</script>

<template>
  <ProseKit :editor="editor">
    <div class='box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-white dark:bg-neutral-900'>
      <button
        @click="handleSave"
        :disabled="!hasUnsavedChange"
        class="m-1 border border-solid bg-white px-2 py-1 text-sm text-black disabled:cursor-not-allowed disabled:text-gray-500"
      >
        {{ hasUnsavedChange ? 'Save' : 'No Changes' }}
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
      <div class='relative w-full flex-1 box-border overflow-y-scroll'>
        <div ref="editorRef" class='ProseMirror box-border min-h-full px-[max(40px,_calc(50%-330px))] py-[24px] outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800'></div>
      </div>
    </div>
  </ProseKit>
</template>
