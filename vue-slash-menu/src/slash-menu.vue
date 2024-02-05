<script setup lang="ts">
import { AutocompleteEmpty } from 'prosekit/vue/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/vue/autocomplete-item'
import { AutocompleteList } from 'prosekit/vue/autocomplete-list'
import { AutocompletePopover } from 'prosekit/vue/autocomplete-popover'
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>().value

const isBlockEmpty = () => {
  let selection = editor.view.state.selection
  return selection.empty && selection.$from.parent.content.size === 0
}

const handleSelectHeading = (level: number) => {
  if (isBlockEmpty()) {
    editor.commands.setHeading({ level })
  } else {
    editor.commands.insertHeading({ level })
  }
}

const handleSelectList = (kind: 'task' | 'bullet' | 'ordered' | 'toggle') => {
  if (isBlockEmpty()) {
    editor.commands.wrapInList({ kind })
  } else {
    editor.commands.insertList({ kind })
  }
}
</script>

<template>
  <AutocompletePopover
    :editor="editor"
    :regex="/\/.*$/iu"
    class='relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg'
  >
    <AutocompleteList :editor="editor">
      <AutocompleteEmpty class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800'>
        No Command match
      </AutocompleteEmpty>

      <AutocompleteItem
        class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800'
        :onSelect="() => handleSelectHeading(1)"
      >
        Heading 1
      </AutocompleteItem>
      <AutocompleteItem
        class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800'
        :onSelect="() => handleSelectHeading(2)"
      >
        Heading 2
      </AutocompleteItem>

      <AutocompleteItem
        class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800'
        :onSelect="() => handleSelectList('task')"
      >
        Task list
      </AutocompleteItem>

      <AutocompleteItem
        class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800'
        :onSelect="() => handleSelectList('bullet')"
      >
        Bullet list
      </AutocompleteItem>

      <AutocompleteItem
        class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800'
        :onSelect="() => handleSelectList('ordered')"
      >
        Ordered list
      </AutocompleteItem>

      <AutocompleteItem
        class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800'
        :onSelect="() => handleSelectList('toggle')"
      >
        Toggle list
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
