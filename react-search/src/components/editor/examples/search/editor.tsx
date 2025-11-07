import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/search/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { Search } from '../../ui/search'

import { defineExtension } from './extension'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({
      extension,
      defaultContent: '<p>Baa, baa, black sheep,</p>'
        + '<p>Have you any wool?</p>'
        + '<p>Yes, sir, yes, sir,</p>'
        + '<p>Three bags full;</p>'
        + '<p>One for the master,</p>'
        + '<p>And one for the dame,</p>'
        + '<p>And one for the little boy</p>'
        + '<p>Who lives down the lane.</p>',
    })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white">
        <div className="relative w-full flex-1 box-border overflow-y-auto">
          <Search />
          <div ref={editor.mount} className="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"></div>
        </div>
      </div>
    </ProseKit>
  )
}
