import 'prosekit/basic/style.css'

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
          className='ProseMirror box-border min-h-full px-[max(40px,_calc(50%-330px))] py-[24px] outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800'
        ></div>
      </div>
    </ProseKit>
  )
}
