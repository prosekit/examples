<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { defineExtension } from './extension'
import Toolbar from './toolbar.svelte'

const extension = defineExtension()
const editor = createEditor({ extension })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow flex flex-col bg-white dark:bg-gray-950 color-black dark:color-white">
    <div class="relative w-full flex-1 box-border overflow-y-scroll">
      <Toolbar />
      <div use:mount class="ProseMirror box-border min-h-full px-[max(4rem,_calc(50%-20rem))] py-8 outline-none outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"></div>
    </div>
  </div>
</ProseKit>
