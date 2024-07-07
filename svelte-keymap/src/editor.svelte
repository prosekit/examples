<script lang="ts">
import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromNode } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { onDestroy, onMount } from 'svelte'
import { writable } from 'svelte/store'
import Toolbar from './toolbar.svelte'

const extension = defineBasicExtension()
const editor = createEditor({ extension })

let place: HTMLDivElement
onMount(() => editor.mount(place))
onDestroy(() => editor.mount(null))

const submitions = writable<string[]>([])

const pushSubmition = (hotkey: string) => {
  const doc = editor.view.state.doc
  const docString = JSON.stringify(jsonFromNode(doc))
  const submition = `${new Date().toISOString()}\t${hotkey}\n${docString}`
  submitions.update((submitions) => [...submitions, submition])
}
</script>

<ProseKit {editor}>
  <div class='box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-white dark:bg-neutral-900'>
    <Toolbar onSubmit={pushSubmition} />
    <div class='relative w-full flex-1 box-border overflow-y-scroll'>
      <div bind:this={place} class='ProseMirror box-border min-h-full px-[max(40px,_calc(50%-330px))] py-[24px] outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800'></div>
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
