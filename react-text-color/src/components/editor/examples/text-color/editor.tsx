import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'
import InlineMenu from './inline-menu'

const defaultContent = '<p>'
  + '<span style="color: #ef4444">Select</span> '
  + '<span style="color: #f97316">some</span> '
  + '<span style="color: #eab308">text</span> '
  + '<span style="color: #22c55e">to</span> '
  + '<span style="color: #3b82f6">change</span> '
  + '<span style="color: #6366f1">the</span> '
  + '<span style="color: #a855f7">color</span> '
  + '</p>'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension, defaultContent })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white">
        <div className="relative w-full flex-1 box-border overflow-y-auto">
          <div ref={editor.mount} className="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"></div>
          <InlineMenu />
        </div>
      </div>
    </ProseKit>
  )
}
