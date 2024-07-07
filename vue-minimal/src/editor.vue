<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor, jsonFromNode, type NodeJSON } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import { defineExtension } from './extension'

const props = defineProps<{
  defaultDoc?: NodeJSON
  onDocUpdate?: (doc: NodeJSON) => void
}>()

const extension = defineExtension()
const editor = createEditor({ extension, defaultDoc: props.defaultDoc })

useDocChange((doc) => props.onDocUpdate?.(jsonFromNode(doc)), { editor })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div class='box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-white dark:bg-neutral-900'>
      <div class='relative w-full flex-1 box-border overflow-y-scroll'>
        <div ref="editorRef" class='ProseMirror box-border min-h-full px-[max(40px,_calc(50%-330px))] py-[24px] outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800'></div>
      </div>
    </div>
  </ProseKit>
</template>
