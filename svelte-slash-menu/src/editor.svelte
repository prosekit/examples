<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { createEditor } from 'prosekit/core'
import { defineExtension } from './extension'
import { onMount, onDestroy } from 'svelte'
import { ProseKit } from 'prosekit/svelte'
import SlashMenu from './slash-menu.svelte'

const editor = createEditor({ extension: defineExtension() })

let place: HTMLDivElement
onMount(() => editor.mount(place))
onDestroy(() => editor.unmount())
</script>

<ProseKit {editor}>
  <div class='box-border h-full max-h-[500px] w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
    <div class='relative flex min-h-full w-full flex-col'>
      <div bind:this={place} class='dark:bg-dark relative box-border min-h-full flex-1 overflow-auto bg-white px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:bg-slate-100'></div>
      <SlashMenu />
    </div>
  </div>
</ProseKit>
