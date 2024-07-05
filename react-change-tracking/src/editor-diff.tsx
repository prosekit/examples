import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union } from 'prosekit/core'
import { defineCommitViewer, type Commit } from 'prosekit/extensions/commit'
import { defineReadonly } from 'prosekit/extensions/readonly'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

export default function DiffViewer({ commit }: { commit: Commit }) {
  const editor = useMemo(() => {
    const extension = union([
      defineBasicExtension(),
      defineReadonly(),
      defineCommitViewer(commit),
    ])
    return createEditor({ extension })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className='box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-white dark:bg-neutral-900'>
        <div className='relative w-full flex-1 box-border overflow-y-scroll'>
          <div ref={editor.mount} className='ProseMirror box-border min-h-full px-[max(40px,_calc(50%-330px))] py-[24px] outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800'></div>
        </div>
      </div>
    </ProseKit>
  )
}
