<script lang="ts">
import type { BasicExtension } from 'prosekit/basic'
import { canUseRegexLookbehind, type Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/svelte'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompletePopup,
  AutocompletePositioner,
  AutocompleteRoot,
} from 'prosekit/svelte/autocomplete'

interface Props {
  users: { id: number; name: string }[]
  loading?: boolean
  onQueryChange?: (query: string) => void
  onOpenChange?: (open: boolean) => void
}

const props: Props = $props()
const loading = $derived(props.loading ?? false)

const editor = useEditor<Union<[MentionExtension, BasicExtension]>>()

function handleUserInsert(id: number, username: string) {
  $editor.commands.insertMention({
    id: id.toString(),
    value: '@' + username,
    kind: 'user',
  })
  $editor.commands.insertText({ text: ' ' })
}

// Match inputs like "@", "@foo", "@foo bar" etc. Do not match "@ foo".
const regex = canUseRegexLookbehind() ? /(?<!\S)@(\S.*)?$/u : /@(\S.*)?$/u
</script>

<AutocompleteRoot
  {regex}
  onQueryChange={(event) => props.onQueryChange?.(event.detail)}
  onOpenChange={(event) => props.onOpenChange?.(event.detail)}
>
  <AutocompletePositioner class="block overflow-visible bg-transparent w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none">
    <AutocompletePopup class="box-border origin-(--transform-origin) transition transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg flex flex-col relative max-h-100 min-w-60 select-none overflow-auto whitespace-nowrap p-1">
      <AutocompleteEmpty class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800">
        {loading ? 'Loading...' : 'No results'}
      </AutocompleteEmpty>

      {#each props.users as user (user.id)}
        <AutocompleteItem
          class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
          onSelect={() => handleUserInsert(user.id, user.name)}
        >
          {#if loading}
            <span class="opacity-50">
              {user.name}
            </span>
          {:else}
            <span>
              {user.name}
            </span>
          {/if}
        </AutocompleteItem>
      {/each}
    </AutocompletePopup>
  </AutocompletePositioner>
</AutocompleteRoot>
