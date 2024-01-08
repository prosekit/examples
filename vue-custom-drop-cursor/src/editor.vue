<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import { defineExtension } from './extension'

const defaultDoc: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Drag the images below to see the custom drop cursor.',
        },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/120x60/f59e0b/FFF?text=Amber',
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/120x60/84cc16/FFF?text=Lime',
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/120x60/06b6d4/FFF?text=Cyan',
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/120x60/f43f5e/FFF?text=Rose',
      },
    },
  ],
}

const editor = createEditor({ extension: defineExtension(), defaultDoc })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div class='box-border h-full max-h-[500px] w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
      <div class='relative flex min-h-full w-full flex-col'>
        <div ref="editorRef" class='dark:bg-dark relative box-border min-h-full flex-1 overflow-auto bg-white px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:bg-slate-100'></div>
      </div>
    </div>
  </ProseKit>
</template>
