<script lang="ts">
import 'prosekit/basic/style.css'


import { useDocChange, ProseKit } from 'prosekit/svelte'
import type { Editor } from 'prosekit/core'

export let editor: Editor
export let onDocChange: () => void

useDocChange(
  () => {
    onDocChange?.()
  },
  { editor },
)

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div class='relative w-full flex-1 box-border overflow-y-scroll'>
    <div use:mount class='ProseMirror box-border min-h-full px-[max(40px,_calc(50%-330px))] py-[24px] outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800'></div>
  </div>
</ProseKit>
