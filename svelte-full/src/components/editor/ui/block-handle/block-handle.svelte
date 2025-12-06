<script lang="ts">
import {
  BlockHandleAdd,
  BlockHandleDraggable,
  BlockHandlePopover,
} from 'prosekit/svelte/block-handle'

interface Props {
  dir?: 'ltr' | 'rtl'
}

const props: Props = $props()
</script>

<BlockHandlePopover
  placement={props.dir === 'rtl' ? 'right' : 'left'}
  class="flex items-center flex-row box-border justify-center transition border-0 [&:not([data-state])]:hidden will-change-transform motion-safe:data-[state=open]:animate-in motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=open]:fade-in-0 motion-safe:data-[state=closed]:fade-out-0 motion-safe:data-[state=open]:zoom-in-95 motion-safe:data-[state=closed]:zoom-out-95 motion-safe:data-[state=open]:animate-duration-150 motion-safe:data-[state=closed]:animate-duration-200"
>
  <BlockHandleAdd class="flex items-center box-border justify-center h-[1.5em] w-[1.5em] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-500/50 cursor-pointer">
    <div class="i-lucide-plus size-5 block"></div>
  </BlockHandleAdd>
  <BlockHandleDraggable class="flex items-center box-border justify-center h-[1.5em] w-[1.2em] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-500/50 cursor-grab">
    <div class="i-lucide-grip-vertical size-5 block"></div>
  </BlockHandleDraggable>
</BlockHandlePopover>
