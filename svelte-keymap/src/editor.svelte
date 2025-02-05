<script lang="ts">
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { writable } from 'svelte/store'
import { defineExtension } from './extension'
import Toolbar from './toolbar.svelte'

const extension = defineExtension()
const editor = createEditor({ extension })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}

const submitions = writable<string[]>([])

const pushSubmition = (hotkey: string) => {
  const docString = JSON.stringify(editor.getDocJSON())
  const submition = `${new Date().toISOString()}\t${hotkey}\n${docString}`
  submitions.update((submitions) => [...submitions, submition])
}
</script>

<ProseKit {editor}>
  <div class='box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-white dark:bg-neutral-900'>
    <Toolbar onSubmit={pushSubmition} />
    <div class='relative w-full flex-1 box-border overflow-y-scroll'>
      <div use:mount class='ProseMirror box-border min-h-full px-[max(4rem,_calc(50%-20rem))] py-8 outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500'></div>
    </div>
  </div>
  <fieldset class='mt-4 box-border flex max-w-full w-full overflow-x-auto border p-4 rounded-md shadow min-w-0'>
    <legend>Submit Records</legend>
    <ol>
      {#each $submitions as submition, index (index)}
        <li>
          <pre>{submition}</pre>
        </li>
      {/each}
      {#if $submitions.length === 0}
        <div>No submitions yet</div>
      {/if}
    </ol>
  </fieldset>
</ProseKit>
