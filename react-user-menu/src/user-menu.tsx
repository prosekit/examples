import { useEditor } from 'prosekit/react'
import { AutocompleteEmpty } from 'prosekit/react/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/react/autocomplete-item'
import { AutocompleteList } from 'prosekit/react/autocomplete-list'
import { AutocompletePopover } from 'prosekit/react/autocomplete-popover'

import type { EditorExtension } from './extension'
import { users } from './user-data'

export default function UserMenu() {
  const editor = useEditor<EditorExtension>()

  const handleUserInsert = (id: number, username: string) => {
    editor.commands.insertMention({
      id: id.toString(),
      value: '@' + username,
      kind: 'user',
    })
    editor.commands.insertText({ text: ' ' })
  }

  return (
    <AutocompletePopover
      editor={editor}
      regex={/@\w*$/}
      className='relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded border border-solid border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-zinc-800'
    >
      <AutocompleteList editor={editor}>
        <AutocompleteEmpty className='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-gray-200/70 aria-selected:dark:bg-gray-700/70'>
          No User match
        </AutocompleteEmpty>

        {users.map((user) => (
          <AutocompleteItem
            key={user.id}
            className='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-gray-200/70 aria-selected:dark:bg-gray-700/70'
            onSelect={() => handleUserInsert(user.id, user.name)}
          >
            {user.name}
          </AutocompleteItem>
        ))}
      </AutocompleteList>
    </AutocompletePopover>
  )
}
