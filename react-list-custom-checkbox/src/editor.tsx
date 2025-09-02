import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import './custom-list.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension(), defaultContent })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div
        className="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white"
        data-custom-list-css-enabled
      >
        <Toolbar />
        <div className="relative w-full flex-1 box-border overflow-y-scroll">
          <div
            ref={editor.mount}
            className="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"
          ></div>
        </div>
      </div>
    </ProseKit>
  )
}
const defaultContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Custom list checkbox design and strikethrough for completed tasks. Please check ',
        },
        { type: 'text', text: 'custom-list.css', marks: [{ type: 'code' }] },
        { type: 'text', text: ' for the styles.' },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'task', checked: true },
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Completed Task' }],
        },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'task', checked: false },
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Incomplete Task' }],
        },
      ],
    },
  ],
}
