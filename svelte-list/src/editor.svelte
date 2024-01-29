<script lang="ts">
import 'prosekit/basic/style.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { onDestroy, onMount } from 'svelte'
import { defineExtension } from './extension'

const defaultDoc: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'list',
      attrs: { kind: 'bullet' },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Bullet List' }] },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'ordered' },
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Ordered List' }],
        },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'task', checked: false },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Task List ' }] },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'toggle', collapsed: true },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Toggle List' }] },
        {
          type: 'list',
          attrs: {
            kind: 'bullet',
          },
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'Hidden' }] },
          ],
        },
      ],
    },
  ],
}

const editor = createEditor({ extension: defineExtension(), defaultDoc })

let place: HTMLDivElement
onMount(() => editor.mount(place))
onDestroy(() => editor.mount(null))
</script>

<ProseKit {editor}>
  <div class='box-border h-full w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
    <div bind:this={place} class='dark:bg-zinc-900 relative box-border min-h-full flex-1 overflow-auto bg-white px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:color-white [&_pre]:bg-zinc-800'></div>
  </div>
</ProseKit>
