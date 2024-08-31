<script setup lang="ts">
import 'prosekit/basic/style.css'

import type { Editor } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'

const props = defineProps<{
  editor: Editor
}>()

const emit = defineEmits<{
  docChange: []
}>()

useDocChange(
  () => {
    emit('docChange')
  },
  { editor: props.editor },
)

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  const editor = props.editor
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div class="relative w-full flex-1 box-border overflow-y-scroll">
      <div
        ref="editorRef"
        class="ProseMirror box-border min-h-full px-[max(4rem,_calc(50%-20rem))] py-8 outline-none outline-0 [&_span[data-mention=&quot;user&quot;]]:text-blue-500 [&_span[data-mention=&quot;tag&quot;]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800"
      />
    </div>
  </ProseKit>
</template>
