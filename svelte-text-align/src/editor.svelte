<script lang="ts">
import 'prosekit/basic/style.css'

import { defineExtension } from './extension'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { onDestroy, onMount } from 'svelte'
import Toolbar from './toolbar.svelte'

const extension = defineExtension()
const editor = createEditor({
  extension,
  defaultHTML:
    '<h1 style="text-align:center;">Heading</h1>' +
    '<p style="text-align:left;"">First paragraph</p>' +
    '<p style="text-align:center;">Second paragraph</p>' +
    '<p style="text-align:right;">Third paragraph</p>',
})

let place: HTMLDivElement
onMount(() => editor.mount(place))
onDestroy(() => editor.mount(null))
</script>

<ProseKit {editor}>
  <div class="box-border h-full w-full min-h-32 overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700">
    <Toolbar />
    <div bind:this={place} class="ProseMirror relative box-border min-h-full flex-1 overflow-auto bg-background px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention='user']]:text-blue-500 [&_span[data-mention='tag']]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800"></div>
  </div>
</ProseKit>
