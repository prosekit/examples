import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'

import { renderSlashMenu } from '../../ui/slash-menu'

import { defineExtension } from './extension'

export function setupVanillaEditor() {
  const extension = defineExtension()
  const editor = createEditor({ extension })

  return {
    render: () => {
      const port = document.createElement('div')
      port.className =
        'box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white'

      const scrolling = document.createElement('div')
      scrolling.className = 'relative w-full flex-1 box-border overflow-y-auto'
      port.append(scrolling)

      const content = document.createElement('div')
      content.className =
        'ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500'
      scrolling.append(content)

      scrolling.append(renderSlashMenu(editor))

      editor.mount(content)

      return port
    },
    destroy: () => {
      editor.unmount()
    },
  }
}
