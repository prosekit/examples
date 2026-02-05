<script lang="ts">
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union } from 'prosekit/core'
import { defineCommitViewer, type Commit } from 'prosekit/extensions/commit'
import { defineReadonly } from 'prosekit/extensions/readonly'
import { ProseKit } from 'prosekit/svelte'

interface Props {
  commit: Commit
}

const props: Props = $props()

let extension = $derived(union(
  defineBasicExtension(),
  defineReadonly(),
  defineCommitViewer(props.commit),
))
let editor = $derived(createEditor({ extension }))
</script>

<ProseKit {editor}>
  <div class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white">
    <div class="relative w-full flex-1 box-border overflow-y-auto">
      <div {@attach editor.mount} class="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"></div>
    </div>
  </div>
</ProseKit>
