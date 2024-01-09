<script setup lang="ts">
import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromNode } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { computed, ref, watchPostEffect } from 'vue'

import EventHandlers from './event-handlers.vue'

const key = ref(1)
const defaultDoc = ref<string | undefined>()
const records = ref<string[]>([])
const hasUnsavedChange = ref(false)

const editor = computed(() => {
  const extension = defineBasicExtension()
  return createEditor({
    extension,
    defaultDoc: defaultDoc.value && JSON.parse(defaultDoc.value),
  })
})
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.value.mount(editorRef.value))

const onDocChange = () => {
  hasUnsavedChange.value = true
}

const onSave = () => {
  const doc = JSON.stringify(jsonFromNode(editor.value.view.state.doc))
  records.value.push(doc)
  hasUnsavedChange.value = false
}

const onLoad = (record: string) => {
  defaultDoc.value = record
  key.value += 1
  hasUnsavedChange.value = false
}
</script>

<template>
  <ProseKit :editor="editor">
    <div>
      <button
        @click="onSave"
        :disabled="!hasUnsavedChange"
        class="my-2 border border-solid bg-white p-2 text-black disabled:cursor-not-allowed disabled:text-gray-500'"
      >
        {{ hasUnsavedChange ? 'Save' : 'No Changes' }}
      </button>
      <ul>
        <li
          v-for="(record, index) in records"
          :key="index"
          class="my-2 flex gap-2"
        >
          <button
            class="border border-solid bg-white p-2 text-black"
            :class="{ 'disabled:text-gray-500': !hasUnsavedChange }"
            @click="onLoad(record)"
          >
            Load
          </button>
          <span class="flex-1 overflow-x-scroll p-2">
            <pre>{{ record }}</pre>
          </span>
        </li>
      </ul>
    </div>

    <div class='box-border h-full max-h-[500px] w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
      <div ref="editorRef" class='dark:bg-dark relative box-border min-h-full flex-1 overflow-auto bg-white px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:bg-slate-100'></div>
    </div>

    <EventHandlers :onDocChange="onDocChange" />
  </ProseKit>
</template>
