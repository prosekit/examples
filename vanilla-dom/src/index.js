import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union } from 'prosekit/core'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import {
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/lit/autocomplete'

export function defineExtension() {
  return union([
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Press / for commands...' }),
  ])
}

const editor = createEditor({ extension: defineExtension() })

function createPopover() {
  const popover = new AutocompletePopover()
  popover.editor = editor
  popover.regex = /\/(\w*)$/
  popover.append(createList())
  return popover
}

function createList() {
  const list = new AutocompleteList()
  list.editor = editor
  list.append(
    createItem('Insert Heading 1', () => handleHeadingInsert(1)),
    createItem('Insert Heading 2', () => handleHeadingInsert(2)),
    createItem('Turn into Heading 1', () => handleHeadingConvert(1)),
    createItem('Turn into Heading 2', () => handleHeadingConvert(2)),
  )
  list.className = 'relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg'
  return list
}

/**
 * @param {string} text
 * @param {function} callback
 */
function createItem(text, callback) {
  const item = new AutocompleteItem()
  item.append(text)
  item.onSelect = callback
  item.className = 'relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800'
  return item
}

/**
 * @param {number} level
 */
function handleHeadingInsert(level) {
  editor.commands.insertHeading({ level })
}

/**
 * @param {number} level
 */
function handleHeadingConvert(level) {
  editor.commands.setHeading({ level })
}

function main() {
  let root = document.querySelector('.editor-root')
  if (!root) {
    root = document
      .querySelector('main')
      .appendChild(document.createElement('div'))
    root.classList.add('example-root')
  }
  root.innerHTML = ''

  const viewport = root.appendChild(document.createElement('div'))
  viewport.className = 'box-border h-full w-full min-h-32 overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'

  const doc = viewport.appendChild(document.createElement('div'))
  doc.className = 'relative flex min-h-full w-full flex-col'

  const content = doc.appendChild(document.createElement('div'))
  content.className = 'ProseMirror relative box-border min-h-full flex-1 overflow-auto bg-white dark:bg-neutral-900 px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800'

  editor.mount(content)

  doc.appendChild(createPopover())
}

main()
