<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import type { Editor } from 'prosekit/core'
import {
  ProseKit,
  useDocChange,
} from 'prosekit/svelte'

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
  <div class="relative w-full flex-1 box-border overflow-y-scroll">
    <div use:mount class="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"></div>
  </div>
</ProseKit>
