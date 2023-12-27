<script lang="ts">
import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromNode } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { onDestroy, onMount } from 'svelte'
import Toolbar from './toolbar.svelte'
import { writable } from 'svelte/store'

const extension = defineBasicExtension()
const editor = createEditor({ extension })

let place: HTMLDivElement
onMount(() => editor.mount(place))
onDestroy(() => editor.unmount())

const submitions = writable<string[]>([])

const pushSubmition = (hotkey: string) => {
  const doc = editor.view.state.doc
  const docString = JSON.stringify(jsonFromNode(doc))
  const submition = `${new Date().toISOString()}\t${hotkey}\n${docString}`
  submitions.update((submitions) => [...submitions, submition])
}
</script>

<ProseKit {editor}>
  <div class='box-border h-full max-h-[500px] w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
    <Toolbar onSubmit={pushSubmition} />
    <div bind:this={place} class='dark:bg-dark relative box-border min-h-full flex-1 overflow-auto bg-white px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:bg-slate-100'></div>
  </div>
  <fieldset class="mt-4 border">
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
