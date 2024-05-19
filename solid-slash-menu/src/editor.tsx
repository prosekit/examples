import 'prosekit/basic/style.css'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import { defineExtension } from './extension'
import SlashMenu from './slash-menu'

export default function Editor() {
  const editor = createEditor({ extension: defineExtension() })

  return (
    <ProseKit editor={editor}>
      <div class='box-border h-full w-full min-h-32 overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
        <div class='relative flex min-h-full w-full flex-col'>
          <div ref={editor.mount} class='ProseMirror relative box-border min-h-full flex-1 overflow-auto bg-white dark:bg-neutral-900 px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800'></div>
          <SlashMenu />
        </div>
      </div>
    </ProseKit>
  )
}
