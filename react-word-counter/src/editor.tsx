import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'
import WordCounter from './word-counter'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({
      extension,
      defaultHTML: 'Start typing and observe the word count update below.',
    })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="box-border h-full max-h-[500px] w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700">
        <div className="relative flex min-h-full w-full flex-col">
          <div
            ref={editor.mount}
            className='dark:bg-dark relative box-border min-h-full flex-1 overflow-auto bg-white px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:bg-slate-100'
          ></div>
          <WordCounter />
        </div>
        ƒ
      </div>
    </ProseKit>
  )
}
