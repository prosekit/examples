import 'prosekit/basic/style.css'
import 'prosekit/extensions/yjs/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function EditorComponent() {
  const editor = useMemo(() => {
    const doc = new Y.Doc()
    const provider = new WebsocketProvider(
      // Use the public ws server from yjs
      'wss://demos.yjs.dev/ws',
      'github.com/prosekit',
      doc,
    )

    const extension = defineExtension(doc, provider.awareness!)
    return createEditor({ extension })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-white dark:bg-neutral-900">
        <Toolbar />
        <div className="relative w-full flex-1 box-border overflow-y-scroll">
          <div
            ref={editor.mount}
            className='ProseMirror box-border min-h-full px-[max(40px,_calc(50%-330px))] py-[24px] outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800'
          ></div>
        </div>
      </div>
    </ProseKit>
  )
}