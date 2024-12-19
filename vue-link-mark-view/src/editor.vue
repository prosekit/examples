<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'

import { defineExtension } from './extension'

const defaultContent = `
  <p>Here is a link that changes color every second: <a href="https://www.example.com">example link</a>
`

const editor = createEditor({ extension: defineExtension(), defaultContent })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div
      class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-white dark:bg-neutral-900"
    >
      <div class="relative w-full flex-1 box-border overflow-y-scroll">
        <div
          ref="editorRef"
          class="ProseMirror box-border min-h-full px-[max(4rem,_calc(50%-20rem))] py-8 outline-none outline-0 [&_span[data-mention=&quot;user&quot;]]:text-blue-500 [&_span[data-mention=&quot;tag&quot;]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800"
        />
      </div>
    </div>
  </ProseKit>
</template>
