import {
  BlockHandleAdd,
  BlockHandleDraggable,
  BlockHandlePopup,
  BlockHandlePositioner,
  BlockHandleRoot,
} from 'prosekit/preact/block-handle'

interface Props {
  dir?: 'ltr' | 'rtl'
}

export default function BlockHandle(props: Props) {
  return (
    <BlockHandleRoot>
      <BlockHandlePositioner
        placement={props.dir === 'rtl' ? 'right' : 'left'}
        className="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"
      >
        <BlockHandlePopup className="flex box-border origin-(--transform-origin) transition transition-discrete motion-reduce:transition-none duration-100 data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95">
          <BlockHandleAdd className="h-6 w-6 cursor-pointer flex items-center box-border justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-400/50">
            <div className="i-lucide-plus size-5 block" />
          </BlockHandleAdd>
          <BlockHandleDraggable className="h-6 w-5 cursor-grab flex items-center box-border justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-400/50">
            <div className="i-lucide-grip-vertical size-5 block" />
          </BlockHandleDraggable>
        </BlockHandlePopup>
      </BlockHandlePositioner>
    </BlockHandleRoot>
  )
}
