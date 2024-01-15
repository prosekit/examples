<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import { defineExtension } from './extension'
import Toolbar from './toolbar.vue'

const js = `async function main() {\n  while (true) {\n    await sleep();\n    await eat();\n    await code('JavaScript!');\n  }\n}`
const py = `async def main():\n    while True:\n        await sleep()\n        await eat()\n        await code("Python!")`
const go = `func main() {\n\tfor {\n\t\tsleep()\n\t\teat()\n\t\tcode("Go!")\n\t}\n}`

const defaultDoc: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'codeBlock',
      attrs: { language: 'javascript' },
      content: [{ type: 'text', text: js }],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'python' },
      content: [{ type: 'text', text: py }],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'go' },
      content: [{ type: 'text', text: go }],
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
        <Toolbar />
        <div ref="editorRef" class='dark:bg-zinc-900 relative box-border min-h-full flex-1 overflow-auto bg-white px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:color-white [&_pre]:bg-zinc-800'></div>
      </div>
    </div>
  </ProseKit>
</template>
