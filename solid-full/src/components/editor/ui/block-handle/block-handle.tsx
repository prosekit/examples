import {
  BlockHandleAdd,
  BlockHandleDraggable,
  BlockHandlePopup,
  BlockHandlePositioner,
  BlockHandleRoot,
} from 'prosekit/solid/block-handle'
import type { JSX } from 'solid-js'

interface Props {
  dir?: 'ltr' | 'rtl'
}

export default function BlockHandle(props: Props): JSX.Element {
  return (
    <BlockHandleRoot class="contents">
      <BlockHandlePositioner
        placement={props.dir === 'rtl' ? 'right' : 'left'}
        class="block overflow-visible bg-transparent w-min h-min motion-safe:ease-out motion-safe:transition-transform motion-safe:duration-100"
      >
        <BlockHandlePopup class="flex motion-safe:duration-100 data-[state=closed]:motion-safe:duration-150 motion-safe:transition-discrete motion-safe:transition-all data-[state=closed]:opacity-0 starting:opacity-0 opacity-100 data-[state=closed]:scale-90 starting:scale-90 scale-100">
          <BlockHandleAdd class="h-6 w-6 cursor-pointer flex items-center box-border justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-400/50">
            <div class="i-lucide-plus size-5 block" />
          </BlockHandleAdd>
          <BlockHandleDraggable class="h-6 w-5 cursor-grab flex items-center box-border justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-400/50">
            <div class="i-lucide-grip-vertical size-5 block" />
          </BlockHandleDraggable>
        </BlockHandlePopup>
      </BlockHandlePositioner>
    </BlockHandleRoot>
  )
}
