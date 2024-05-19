<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import { defineExtension } from './extension'
import Toolbar from './toolbar.vue'

const defaultHTML =
  '<h1 style="text-align:center;">Heading</h1>' +
  '<p style="text-align:left;">First paragraph</p>' +
  '<p style="text-align:center;">Second paragraph</p>' +
  '<p style="text-align:right;">Third paragraph</p>'

const editor = createEditor({ extension: defineExtension(), defaultHTML })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div class='box-border h-full w-full min-h-32 overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
      <div class='relative flex min-h-full w-full flex-col'>
        <Toolbar />
        <div
          ref="editorRef"
          spellcheck="false"
          class='ProseMirror relative box-border min-h-full flex-1 overflow-auto bg-background px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800'
        ></div>
      </div>
    </div>
  </ProseKit>
</template>
