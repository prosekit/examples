<script lang="ts">
import {
  BlockHandleAdd,
  BlockHandleDraggable,
  BlockHandlePopover,
} from 'prosekit/svelte/block-handle'
</script>

<BlockHandlePopover class='flex items-center flex-row box-border justify-center transition border-0 py-2 [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200'>
  <BlockHandleAdd class='flex items-center box-border justify-center h-[1.5em] w-[1.5em] hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-500/50 dark:text-zinc-500/50 cursor-pointer'>
    <div class='i-lucide-plus h-5 w-5'></div>
  </BlockHandleAdd>
  <BlockHandleDraggable class='flex items-center box-border justify-center h-[1.5em] w-[1.2em] hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-500/50 dark:text-zinc-500/50 cursor-grab'>
    <div class='i-lucide-grip-vertical h-5 w-5'></div>
  </BlockHandleDraggable>
</BlockHandlePopover>
