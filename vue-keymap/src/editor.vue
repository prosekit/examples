<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor, jsonFromNode } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import { defineExtension } from './extension'
import Toolbar from './toolbar.vue'

const editor = createEditor({ extension: defineExtension() })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))

const submitions = ref<string[]>([])

const pushSubmition = (hotkey: string) => {
  const doc = editor.view.state.doc
  const docString = JSON.stringify(jsonFromNode(doc))
  const submition = `${new Date().toISOString()}\t${hotkey}\n${docString}`
  submitions.value = [...submitions.value, submition]
}
</script>

<template>
  <ProseKit :editor="editor">
    <div class='box-border h-full max-h-[500px] w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
      <Toolbar @submit="pushSubmition" />
      <div ref="editorRef" class='dark:bg-dark relative box-border min-h-full flex-1 overflow-auto bg-white px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:bg-slate-100'></div>
    </div>
    <fieldset class="mt-4 border">
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
