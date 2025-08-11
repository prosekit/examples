import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import type { Editor } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/react'

export default function EditorComponent({
  editor,
  onDocChange,
}: {
  editor: Editor
  onDocChange: () => void
}) {
  useDocChange(onDocChange, { editor })

  return (
    <ProseKit editor={editor}>
      <div className="relative w-full flex-1 box-border overflow-y-scroll">
        <div
          ref={editor.mount}
          className="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"
        ></div>
      </div>
    </ProseKit>
  )
}
