import { useEditor } from 'prosekit/react'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/react/autocomplete'

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
      regex={/@\w*$/}
      className="relative block max-h-[25rem] min-w-[8rem] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg [&:not([data-state])]:hidden"
    >
      <AutocompleteList>
        <AutocompleteEmpty className="relative block min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800">
          No results
        </AutocompleteEmpty>

        {users.map((user) => (
          <AutocompleteItem
            key={user.id}
            className="relative block min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
            onSelect={() => handleUserInsert(user.id, user.name)}
          >
            {user.name}
          </AutocompleteItem>
        ))}
      </AutocompleteList>
    </AutocompletePopover>
  )
}
