import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union, type NodeJSON } from 'prosekit/core'
import {
  defineCommitRecorder,
  type CommitRecorder,
} from 'prosekit/extensions/commit'
import { ProseKit } from 'prosekit/solid'
import type { JSX } from 'solid-js'

export default function EditorMain(props: {
  commitRecorder: CommitRecorder
  initialContent?: NodeJSON
}): JSX.Element {
  const extension = union(
    defineBasicExtension(),
    defineCommitRecorder(props.commitRecorder),
  )
  const editor = createEditor({
    extension,
    defaultContent: props.initialContent,
  })

  return (
    <ProseKit editor={editor}>
      <div class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white">
        <div class="relative w-full flex-1 box-border overflow-y-auto">
          <div
            ref={editor.mount}
            class="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"
          ></div>
        </div>
      </div>
    </ProseKit>
  )
}
