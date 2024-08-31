<script lang="ts">
import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union, type NodeJSON } from 'prosekit/core'
import {
  CommitRecorder,
  defineCommitRecorder,
} from 'prosekit/extensions/commit'
import { ProseKit } from 'prosekit/svelte'

export let commitRecorder: CommitRecorder
export let defaultContent: NodeJSON

const extension = union([
  defineBasicExtension(),
  defineCommitRecorder(commitRecorder),
])

const editor = createEditor({ extension, defaultContent })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div class='box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-white dark:bg-neutral-900'>
    <div class='relative w-full flex-1 box-border overflow-y-scroll'>
      <div use:mount class='ProseMirror box-border min-h-full px-[max(4rem,_calc(50%-20rem))] py-8 outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800'></div>
    </div>
  </div>
</ProseKit>
