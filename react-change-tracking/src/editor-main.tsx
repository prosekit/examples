import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union, type NodeJSON } from 'prosekit/core'
import {
  CommitRecorder,
  defineCommitRecorder,
} from 'prosekit/extensions/commit'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

export default function Editor({
  commitRecorder,
  defaultContent,
}: {
  commitRecorder: CommitRecorder
  defaultContent?: NodeJSON
}) {
  const editor = useMemo(() => {
    const extension = union(
      defineBasicExtension(),
      defineCommitRecorder(commitRecorder),
    )
    return createEditor({ extension, defaultContent })
  }, [commitRecorder, defaultContent])

  return (
    <ProseKit editor={editor}>
      <div className="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-white dark:bg-neutral-900">
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
