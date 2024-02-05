import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromNode, type NodeJSON } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/solid'

export default function Editor(props: {
  defaultDoc?: NodeJSON
  onDocUpdate?: (doc: NodeJSON) => void
}) {
  const extension = defineBasicExtension()
  const editor = createEditor({ extension, defaultDoc: props.defaultDoc })

  useDocChange((doc) => props.onDocUpdate?.(jsonFromNode(doc)), { editor })

  return (
    <ProseKit editor={editor}>
      <div class='box-border h-full w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
        <div ref={editor.mount} class='dark:bg-zinc-900 relative box-border min-h-full flex-1 overflow-auto bg-white dark:bg-neutral-900 px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:color-white [&_pre]:bg-zinc-800'></div>
      </div>
    </ProseKit>
  )
}
