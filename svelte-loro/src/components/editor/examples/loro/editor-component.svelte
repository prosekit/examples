<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/loro/style.css'

import type {
  CursorAwareness,
  LoroDocType,
} from 'loro-prosemirror'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { Toolbar } from '../../ui/toolbar'

import { defineExtension } from './extension'

interface Props {
  loro: LoroDocType
  awareness: CursorAwareness
}

const props: Props = $props()

const extension = defineExtension(props.loro, props.awareness)
const editor = createEditor({ extension })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white">
    <Toolbar />
    <div class="relative w-full flex-1 box-border overflow-y-auto">
      <div use:mount class="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"></div>
    </div>
  </div>
</ProseKit>
