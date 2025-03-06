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
  return union(
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Press / for commands...' }),
  )
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
  list.className =
    'relative block max-h-[25rem] min-w-[8rem] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden'
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
  item.className =
    'relative block min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800'
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
  const root = document.querySelector('.example-vanilla-dom')
  if (!root) {
    return
  }
  root.innerHTML = ''

  const viewport = root.appendChild(document.createElement('div'))
  viewport.className =
    'box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-white dark:bg-gray-950'

  const scrolling = viewport.appendChild(document.createElement('div'))
  scrolling.className = 'relative w-full flex-1 box-border overflow-y-scroll'

  const content = scrolling.appendChild(document.createElement('div'))
  content.className =
    'ProseMirror box-border min-h-full px-[max(4rem,_calc(50%-20rem))] py-8 outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500'

  editor.mount(content)

  scrolling.appendChild(createPopover())
}

main()
