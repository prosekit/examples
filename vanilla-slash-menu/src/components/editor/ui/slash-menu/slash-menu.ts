import 'prosekit/web/autocomplete'

import type { BasicExtension } from 'prosekit/basic'
import type { Editor } from 'prosekit/core'
import { canUseRegexLookbehind } from 'prosekit/core'
import type {
  AutocompletePopupElement,
  AutocompletePositionerElement,
  AutocompleteRootElement,
} from 'prosekit/web/autocomplete'

import { renderSlashMenuEmpty } from './slash-menu-empty'
import { renderSlashMenuItem } from './slash-menu-item'

// Match inputs like "/", "/table", "/heading 1" etc. Do not match "/ heading".
const regex = canUseRegexLookbehind() ? /(?<!\S)\/(\S.*)?$/u : /\/(\S.*)?$/u

export function renderSlashMenu(editor: Editor<BasicExtension>) {
  const root = document.createElement(
    'prosekit-autocomplete-root',
  ) as AutocompleteRootElement
  root.editor = editor
  root.regex = regex

  const positioner = document.createElement(
    'prosekit-autocomplete-positioner',
  ) as AutocompletePositionerElement
  positioner.className =
    'block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none'

  const popup = document.createElement(
    'prosekit-autocomplete-popup',
  ) as AutocompletePopupElement
  popup.className =
    'box-border origin-(--transform-origin) transition-[opacity,scale] transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg bg-[canvas] flex flex-col relative max-h-100 min-h-0 min-w-60 select-none overflow-hidden whitespace-nowrap'

  const content = document.createElement('div')
  content.className =
    'flex flex-col flex-1 min-h-0 overflow-y-auto p-1 bg-[canvas] overscroll-contain'

  content.append(
    renderSlashMenuItem({
      label: 'Text',
      kbd: undefined,
      onSelect: () => editor.commands.setParagraph(),
    }),
  )
  content.append(
    renderSlashMenuItem({
      label: 'Heading 1',
      kbd: '#',
      onSelect: () => editor.commands.setHeading({ level: 1 }),
    }),
  )
  content.append(
    renderSlashMenuItem({
      label: 'Heading 2',
      kbd: '##',
      onSelect: () => editor.commands.setHeading({ level: 2 }),
    }),
  )
  content.append(
    renderSlashMenuItem({
      label: 'Heading 3',
      kbd: '###',
      onSelect: () => editor.commands.setHeading({ level: 3 }),
    }),
  )
  content.append(
    renderSlashMenuItem({
      label: 'Bullet list',
      kbd: '-',
      onSelect: () => editor.commands.wrapInList({ kind: 'bullet' }),
    }),
  )
  content.append(
    renderSlashMenuItem({
      label: 'Ordered list',
      kbd: '1.',
      onSelect: () => editor.commands.wrapInList({ kind: 'ordered' }),
    }),
  )
  content.append(
    renderSlashMenuItem({
      label: 'Task list',
      kbd: '[]',
      onSelect: () => editor.commands.wrapInList({ kind: 'task' }),
    }),
  )
  content.append(
    renderSlashMenuItem({
      label: 'Toggle list',
      kbd: '>>',
      onSelect: () => editor.commands.wrapInList({ kind: 'toggle' }),
    }),
  )
  content.append(
    renderSlashMenuItem({
      label: 'Quote',
      kbd: '>',
      onSelect: () => editor.commands.setBlockquote(),
    }),
  )
  content.append(
    renderSlashMenuItem({
      label: 'Table',
      onSelect: () => editor.commands.insertTable({ row: 3, col: 3 }),
    }),
  )
  content.append(
    renderSlashMenuItem({
      label: 'Divider',
      kbd: '---',
      onSelect: () => editor.commands.insertHorizontalRule(),
    }),
  )
  content.append(
    renderSlashMenuItem({
      label: 'Code',
      kbd: '```',
      onSelect: () => editor.commands.setCodeBlock(),
    }),
  )
  content.append(renderSlashMenuEmpty())

  popup.append(content)
  positioner.append(popup)
  root.append(positioner)

  return root
}
