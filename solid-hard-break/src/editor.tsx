import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

const defaultContent = `<p>
O’er all the hilltops<br />
Is quiet now,<br />
In all the treetops<br />
Hearest thou<br />
Hardly a breath;<br />
The birds are asleep in the trees:<br />
Wait, soon like these<br />
Thou too shalt rest.<br />
</p>
`

export default function Editor() {
  const editor = createEditor({ extension: defineExtension(), defaultContent })

  return (
    <ProseKit editor={editor}>
      <div class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow flex flex-col bg-white dark:bg-gray-950 color-black dark:color-white">
        <Toolbar />
        <div class="relative w-full flex-1 box-border overflow-y-scroll">
          <div
            ref={editor.mount}
            class="ProseMirror box-border min-h-full px-[max(4rem,_calc(50%-20rem))] py-8 outline-none outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"
          ></div>
        </div>
      </div>
    </ProseKit>
  )
}
