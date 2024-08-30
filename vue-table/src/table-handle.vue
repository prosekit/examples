<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import {
  TableHandleRoot,
  TableHandleColumnRoot,
  TableHandleColumnTrigger,
  TableHandlePopoverContent,
  TableHandlePopoverItem,
  TableHandleRowRoot,
  TableHandleRowTrigger,
} from 'prosekit/vue/table-handle'

import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <TableHandleRoot class="contents">
    <TableHandleColumnRoot
      class="flex items-center box-border justify-center h-[1.2em] w-[1.5em] bg-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-500/50 dark:text-zinc-500/50 translate-y-3 border border-zinc-200 dark:border-zinc-800 border-solid [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200"
    >
      <TableHandleColumnTrigger>
        <div class="i-lucide-grip-horizontal h-5 w-5"></div>
      </TableHandleColumnTrigger>
      <TableHandlePopoverContent
        class="relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg [&:not([data-state])]:hidden"
      >
        <TableHandlePopoverItem
          class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
          :disabled="!editor.commands.addTableColumnBefore.canExec()"
          @select="editor.commands.addTableColumnBefore"
        >
          Insert Left
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
          :disabled="!editor.commands.addTableColumnAfter.canExec()"
          @select="editor.commands.addTableColumnAfter"
        >
          Insert Right
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
          :disabled="!editor.commands.deleteCellSelection.canExec()"
          @select="editor.commands.deleteCellSelection"
        >
          Clear Contents
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
          :disabled="!editor.commands.deleteTableColumn.canExec()"
          @select="editor.commands.deleteTableColumn"
        >
          Delete Column
        </TableHandlePopoverItem>
      </TableHandlePopoverContent>
    </TableHandleColumnRoot>
    <TableHandleRowRoot
      class="flex items-center box-border justify-center h-[1.5em] w-[1.2em] bg-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-500/50 dark:text-zinc-500/50 translate-x-3 border border-zinc-200 dark:border-zinc-800 border-solid [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200"
    >
      <TableHandleRowTrigger>
        <div class="i-lucide-grip-vertical h-5 w-5"></div>
      </TableHandleRowTrigger>
      <TableHandlePopoverContent
        class="relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg [&:not([data-state])]:hidden"
      >
        <TableHandlePopoverItem
          class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
          :disabled="!editor.commands.addTableRowAbove.canExec()"
          @select="editor.commands.addTableRowAbove"
        >
          Insert Above
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
          :disabled="!editor.commands.addTableRowBelow.canExec()"
          @select="editor.commands.addTableRowBelow"
        >
          Insert Below
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
          :disabled="!editor.commands.deleteCellSelection.canExec()"
          @select="editor.commands.deleteCellSelection"
        >
          Clear Contents
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
          :disabled="!editor.commands.deleteTableRow.canExec()"
          @select="editor.commands.deleteTableRow"
        >
          Delete Row
        </TableHandlePopoverItem>
      </TableHandlePopoverContent>
    </TableHandleRowRoot>
  </TableHandleRoot>
</template>
