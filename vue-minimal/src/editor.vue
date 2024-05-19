<script setup lang="ts">
import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromNode, type NodeJSON } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'

const props = defineProps<{
  defaultDoc?: NodeJSON
  onDocUpdate?: (doc: NodeJSON) => void
}>()

const extension = defineBasicExtension()
const editor = createEditor({ extension, defaultDoc: props.defaultDoc })

useDocChange((doc) => props.onDocUpdate?.(jsonFromNode(doc)), { editor })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div class="box-border h-full w-full min-h-32 overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700">
      <div ref="editorRef" class="ProseMirror relative box-border min-h-full flex-1 overflow-auto bg-background px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention='user']]:text-blue-500 [&_span[data-mention='tag']]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800"></div>
    </div>
  </ProseKit>
</template>
