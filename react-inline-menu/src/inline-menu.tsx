import { useEditor } from 'prosekit/react'
import { InlinePopover } from 'prosekit/react/inline-popover'

import ButtonGroup from './button-group'

export default function InlineMenu() {
  const editor = useEditor()

  return (
    <InlinePopover className='relative block max-h-[400px] min-w-[120px] space-x-1 overflow-auto whitespace-nowrap rounded p-1 z-10 box-border rounded border border-solid border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-zinc-800' editor={editor}>
      <ButtonGroup />
    </InlinePopover>
  )
}
