import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/loro/style.css'

import type { CursorAwareness, LoroDocType } from 'loro-prosemirror'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { Toolbar } from '../../ui/toolbar'

import { defineExtension } from './extension'

export default function EditorComponent(props: {
  loro: LoroDocType
  awareness: CursorAwareness
}) {
  const editor = useMemo(() => {
    const extension = defineExtension(props.loro, props.awareness)
    return createEditor({ extension })
  }, [props.loro, props.awareness])

  return (
    <ProseKit editor={editor}>
      <div className="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white">
        <Toolbar />
        <div className="relative w-full flex-1 box-border overflow-y-auto">
          <div
            ref={editor.mount}
            className="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"
          ></div>
        </div>
      </div>
    </ProseKit>
  )
}
