<script lang="ts">
import {
  AutocompleteItem,
  AutocompletePopover,
  AutocompleteEmpty,
  AutocompleteList,
} from 'prosekit/svelte/autocomplete'
import { useEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>()

const handleHeadingInsert = (level: number) => {
  $editor.commands.insertHeading({ level })
}

const handleHeadingConvert = (level: number) => {
  $editor.commands.setHeading({ level })
}
</script>

<AutocompletePopover regex={/\/.*$/iu} class="relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-border bg-background shadow-lg">
  <AutocompleteList>
    <AutocompleteEmpty class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-secondary">
      No results
    </AutocompleteEmpty>

    <AutocompleteItem
      class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-secondary"
      onSelect={() => handleHeadingInsert(1)}
    >
      Insert Heading 1
    </AutocompleteItem>
    <AutocompleteItem
      class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-secondary"
      onSelect={() => handleHeadingInsert(2)}
    >
      Insert Heading 2
    </AutocompleteItem>
    <AutocompleteItem
      class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-secondary"
      onSelect={() => handleHeadingConvert(1)}
    >
      Turn into Heading 1
    </AutocompleteItem>
    <AutocompleteItem
      class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-secondary"
      onSelect={() => handleHeadingConvert(2)}
    >
      Turn into Heading 2
    </AutocompleteItem>
  </AutocompleteList>
</AutocompletePopover>
