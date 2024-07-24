<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/vue/autocomplete'

import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>()

function isBlockEmpty() {
  let selection = editor.value.view.state.selection
  return selection.empty && selection.$from.parent.content.size === 0
}

function handleSelectHeading(level: number) {
  if (isBlockEmpty()) {
    editor.value.commands.setHeading({ level })
  } else {
    editor.value.commands.insertHeading({ level })
  }
}

function handleSelectList(kind: 'task' | 'bullet' | 'ordered' | 'toggle') {
  if (isBlockEmpty()) {
    editor.value.commands.wrapInList({ kind })
  } else {
    editor.value.commands.insertList({ kind })
  }
}
</script>

<template>
  <AutocompletePopover
    :regex="/\/.*$/iu"
    class="relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg [&:not([data-state])]:hidden"
  >
    <AutocompleteList>
      <AutocompleteEmpty
        class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
      >
        No results
      </AutocompleteEmpty>

      <AutocompleteItem
        class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
        :on-select="() => handleSelectHeading(1)"
      >
        Heading 1
      </AutocompleteItem>
      <AutocompleteItem
        class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
        :on-select="() => handleSelectHeading(2)"
      >
        Heading 2
      </AutocompleteItem>

      <AutocompleteItem
        class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
        :on-select="() => handleSelectList('task')"
      >
        Task list
      </AutocompleteItem>

      <AutocompleteItem
        class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
        :on-select="() => handleSelectList('bullet')"
      >
        Bullet list
      </AutocompleteItem>

      <AutocompleteItem
        class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
        :on-select="() => handleSelectList('ordered')"
      >
        Ordered list
      </AutocompleteItem>

      <AutocompleteItem
        class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
        :on-select="() => handleSelectList('toggle')"
      >
        Toggle list
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
