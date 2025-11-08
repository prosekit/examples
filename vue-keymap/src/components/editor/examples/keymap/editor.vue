<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'

import { defineExtension } from './extension'
import Toolbar from './toolbar.vue'

const extension = defineExtension()
const editor = createEditor({ extension })

const editorRef = ref<HTMLDivElement | null>(null)
const submissions = ref<string[]>([])

function pushSubmission(hotkey: string) {
  const docString = JSON.stringify(editor.getDocJSON())
  const submission = `${new Date().toISOString()}\t${hotkey}\n${docString}`
  submissions.value = [...submissions.value, submission]
}

watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div
      class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white"
    >
      <Toolbar :on-submit="pushSubmission" />
      <div class="relative w-full flex-1 box-border overflow-y-auto">
        <div
          ref="editorRef"
          class="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"
        />
      </div>
    </div>
    <fieldset
      class="mt-4 box-border flex max-w-full w-full overflow-x-auto border p-4 rounded-md shadow-sm min-w-0"
    >
      <legend>Submit Records</legend>
      <ol>
        <li v-for="(submission, index) in submissions" :key="index">
          <pre>{{ submission }}</pre>
        </li>
      </ol>
      <div v-if="submissions.length === 0">No submissions yet</div>
    </fieldset>
  </ProseKit>
</template>
