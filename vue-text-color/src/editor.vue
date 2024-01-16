<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import { defineExtension } from './extension'
import InlineMenu from './inline-menu.vue'

const defaultHTML =
  '<p>Select some text and click the buttons to change the color, or input a custom color.</p>' +
  '<p style="color:#ef4444;">Select some text and click the buttons to change the color, or input a custom color.</p>' +
  '<p style="color:#22c55e;">Select some text and click the buttons to change the color, or input a custom color.</p>' +
  '<p style="color:#3b82f6;">Select some text and click the buttons to change the color, or input a custom color.</p>'

const editor = createEditor({ extension: defineExtension(), defaultHTML })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div class='box-border h-full w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
      <div class='relative flex min-h-full w-full flex-col'>
        <div ref="editorRef" spellcheck="false" class='dark:bg-zinc-900 relative box-border min-h-full flex-1 overflow-auto bg-white px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:color-white [&_pre]:bg-zinc-800'></div>
        <InlineMenu />
      </div>
    </div>
  </ProseKit>
</template>
