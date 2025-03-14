<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor, jsonFromNode } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'

import { defineExtension } from './extension'
import Toolbar from './toolbar.vue'

const editor = createEditor({ extension: defineExtension() })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})

const submitions = ref<string[]>([])

function pushSubmition(hotkey: string) {
  const doc = editor.view.state.doc
  const docString = JSON.stringify(jsonFromNode(doc))
  const submition = `${new Date().toISOString()}\t${hotkey}\n${docString}`
  submitions.value = [...submitions.value, submition]
}
</script>

<template>
  <ProseKit :editor="editor">
    <div
      class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-white dark:bg-gray-950"
    >
      <Toolbar @submit="pushSubmition" />
      <div class="relative w-full flex-1 box-border overflow-y-scroll">
        <div
          ref="editorRef"
          class="ProseMirror box-border min-h-full px-[max(4rem,_calc(50%-20rem))] py-8 outline-none outline-0 [&_span[data-mention=&quot;user&quot;]]:text-blue-500 [&_span[data-mention=&quot;tag&quot;]]:text-violet-500"
        />
      </div>
    </div>
    <fieldset
      class="mt-4 box-border flex max-w-full w-full overflow-x-auto border p-4 rounded-md shadow min-w-0"
    >
      <legend>Submit Records</legend>
      <ol>
        <li v-for="(submition, index) in submitions" :key="index">
          <pre>{{ submition }}</pre>
        </li>
      </ol>
      <div v-if="submitions.length === 0">No submitions yet</div>
    </fieldset>
  </ProseKit>
</template>
