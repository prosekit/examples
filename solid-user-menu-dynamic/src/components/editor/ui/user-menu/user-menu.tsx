import type { BasicExtension } from 'prosekit/basic'
import { canUseRegexLookbehind, type Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/solid'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompletePopup,
  AutocompletePositioner,
  AutocompleteRoot,
} from 'prosekit/solid/autocomplete'
import { For, type JSX } from 'solid-js'

// Match inputs like "@", "@foo", "@foo bar" etc. Do not match "@ foo".
const regex = canUseRegexLookbehind() ? /(?<!\S)@(\S.*)?$/u : /@(\S.*)?$/u

export default function UserMenu(props: {
  users: { id: number; name: string }[]
  loading?: boolean
  onQueryChange?: (query: string) => void
  onOpenChange?: (open: boolean) => void
}): JSX.Element {
  const editor = useEditor<Union<[MentionExtension, BasicExtension]>>()

  const handleUserInsert = (id: number, username: string) => {
    editor().commands.insertMention({
      id: id.toString(),
      value: '@' + username,
      kind: 'user',
    })
    editor().commands.insertText({ text: ' ' })
  }

  return (
    <AutocompleteRoot
      regex={regex}
      onQueryChange={(event) => props.onQueryChange?.(event.detail)}
      onOpenChange={(event) => props.onOpenChange?.(event.detail)}
    >
      <AutocompletePositioner class="block overflow-visible bg-transparent w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none">
        <AutocompletePopup class="box-border origin-(--transform-origin) transition transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg flex flex-col relative max-h-100 min-w-60 select-none overflow-auto whitespace-nowrap p-1">
          <AutocompleteEmpty class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800">
            {props.loading ? 'Loading...' : 'No results'}
          </AutocompleteEmpty>

          <For each={props.users}>
            {(user) => (
              <AutocompleteItem
                class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                onSelect={() => handleUserInsert(user.id, user.name)}
              >
                <span class={props.loading ? 'opacity-50' : undefined}>
                  {user.name}
                </span>
              </AutocompleteItem>
            )}
          </For>
        </AutocompletePopup>
      </AutocompletePositioner>
    </AutocompleteRoot>
  )
}
