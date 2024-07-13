import 'prosekit/basic/style.css'
import 'prosekit/extensions/search/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'
import Search from './search'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({
      extension,
      defaultHTML:
        '<p>Baa, baa, black sheep,</p>' +
        '<p>Have you any wool?</p>' +
        '<p>Yes, sir, yes, sir,</p>' +
        '<p>Three bags full;</p>' +
        '<p>One for the master,</p>' +
        '<p>And one for the dame,</p>' +
        '<p>And one for the little boy</p>' +
        '<p>Who lives down the lane.</p>',
    })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-white dark:bg-neutral-900">
        <div className="relative w-full flex-1 box-border overflow-y-scroll">
          <Search />
          <div
            ref={editor.mount}
            className='ProseMirror box-border min-h-full px-[max(40px,_calc(50%-330px))] py-[24px] outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800'
          ></div>
        </div>
      </div>
    </ProseKit>
  )
}
