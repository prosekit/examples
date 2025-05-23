import { useEditor } from 'prosekit/react'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/react/autocomplete'
import { useState } from 'react'

import type { EditorExtension } from './extension'
import { useUserQuery } from './use-user-query'

export default function UserMenuDynamic() {
  const editor = useEditor<EditorExtension>()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const handleUserInsert = (id: number, username: string) => {
    editor.commands.insertMention({
      id: id.toString(),
      value: '@' + username,
      kind: 'user',
    })
    editor.commands.insertText({ text: ' ' })
  }

  const { loading, users } = useUserQuery(query, open)

  return (
    <AutocompletePopover
      regex={/@\w*$/}
      onQueryChange={setQuery}
      onOpenChange={setOpen}
      className="relative block max-h-[25rem] min-w-[15rem] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden"
    >
      <AutocompleteList filter={null}>
        <AutocompleteEmpty className="relative flex items-center justify-between min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800">
          {loading ? 'Loading...' : 'No results'}
        </AutocompleteEmpty>

        {users.map((user) => (
          <AutocompleteItem
            key={user.id}
            className="relative flex items-center justify-between min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
            onSelect={() => handleUserInsert(user.id, user.name)}
          >
            <span className={loading ? 'opacity-50' : undefined}>
              {user.name}
            </span>
          </AutocompleteItem>
        ))}
      </AutocompleteList>
    </AutocompletePopover>
  )
}
