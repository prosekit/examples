<script setup lang="ts">
import 'prosekit/basic/style.css'

import { watchPostEffect, ref } from 'vue'
import { ProseKit } from 'prosekit/vue'
import { defineExtension } from './extension'
import Toolbar from './toolbar.vue'
import { createEditor } from 'prosekit/core'

const editor = createEditor({ extension: defineExtension() })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div
      class="box-border h-full max-h-[500px] w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700"
    >
      <div class="relative flex min-h-full w-full flex-col">
        <Toolbar />
        <div
          ref="editorRef"
          class="dark:bg-dark relative box-border min-h-full flex-1 overflow-auto bg-white px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention=&quot;user&quot;]]:color-blue-500 [&_span[data-mention=&quot;tag&quot;]]:color-violet-500 [&_pre]:bg-slate-100"
        ></div>
      </div>
    </div>
  </ProseKit>
</template>
