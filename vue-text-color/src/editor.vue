<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'

import { defineExtension } from './extension'
import InlineMenu from './inline-menu.vue'

const defaultContent =
  '<p>' +
  '<span style="color: #ef4444">Select</span> ' +
  '<span style="color: #f97316">some</span> ' +
  '<span style="color: #eab308">text</span> ' +
  '<span style="color: #22c55e">to</span> ' +
  '<span style="color: #3b82f6">change</span> ' +
  '<span style="color: #6366f1">the</span> ' +
  '<span style="color: #a855f7">color</span> ' +
  '</p>'

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
          spellcheck="false"
          class="ProseMirror box-border min-h-full px-[max(4rem,_calc(50%-20rem))] py-8 outline-none outline-0 [&_span[data-mention=&quot;user&quot;]]:text-blue-500 [&_span[data-mention=&quot;tag&quot;]]:text-violet-500"
        />
        <InlineMenu />
      </div>
    </div>
  </ProseKit>
</template>
