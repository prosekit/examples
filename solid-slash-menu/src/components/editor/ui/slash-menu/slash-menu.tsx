import type { BasicExtension } from 'prosekit/basic'
import { canUseRegexLookbehind } from 'prosekit/core'
import { useEditor } from 'prosekit/solid'
import {
  AutocompletePopup,
  AutocompletePositioner,
  AutocompleteRoot,
} from 'prosekit/solid/autocomplete'
import type { JSX } from 'solid-js'

import SlashMenuEmpty from './slash-menu-empty'
import SlashMenuItem from './slash-menu-item'

// Match inputs like "/", "/table", "/heading 1" etc. Do not match "/ heading".
const regex = canUseRegexLookbehind() ? /(?<!\S)\/(\S.*)?$/u : /\/(\S.*)?$/u

export default function SlashMenu(): JSX.Element {
  const editor = useEditor<BasicExtension>()

  return (
    <AutocompleteRoot regex={regex}>
      <AutocompletePositioner class="block overflow-visible bg-transparent w-min h-min z-50 motion-safe:ease-out motion-safe:transition-transform motion-safe:duration-100">
        <AutocompletePopup class="box-border data-[state=closed]:motion-safe:duration-150 motion-safe:transition-discrete motion-safe:transition-all data-[state=closed]:opacity-0 starting:opacity-0 opacity-100 data-[state=closed]:scale-95 starting:scale-95 scale-100 motion-safe:duration-40 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg flex flex-col relative max-h-100 min-w-60 select-none overflow-auto whitespace-nowrap p-1">
          <SlashMenuItem
            label="Text"
            onSelect={() => editor().commands.setParagraph()}
          />

          <SlashMenuItem
            label="Heading 1"
            kbd="#"
            onSelect={() => editor().commands.setHeading({ level: 1 })}
          />

          <SlashMenuItem
            label="Heading 2"
            kbd="##"
            onSelect={() => editor().commands.setHeading({ level: 2 })}
          />

          <SlashMenuItem
            label="Heading 3"
            kbd="###"
            onSelect={() => editor().commands.setHeading({ level: 3 })}
          />

          <SlashMenuItem
            label="Bullet list"
            kbd="-"
            onSelect={() => editor().commands.wrapInList({ kind: 'bullet' })}
          />

          <SlashMenuItem
            label="Ordered list"
            kbd="1."
            onSelect={() => editor().commands.wrapInList({ kind: 'ordered' })}
          />

          <SlashMenuItem
            label="Task list"
            kbd="[]"
            onSelect={() => editor().commands.wrapInList({ kind: 'task' })}
          />

          <SlashMenuItem
            label="Toggle list"
            kbd=">>"
            onSelect={() => editor().commands.wrapInList({ kind: 'toggle' })}
          />

          <SlashMenuItem
            label="Quote"
            kbd=">"
            onSelect={() => editor().commands.setBlockquote()}
          />

          <SlashMenuItem
            label="Table"
            onSelect={() => editor().commands.insertTable({ row: 3, col: 3 })}
          />

          <SlashMenuItem
            label="Divider"
            kbd="---"
            onSelect={() => editor().commands.insertHorizontalRule()}
          />

          <SlashMenuItem
            label="Code"
            kbd="```"
            onSelect={() => editor().commands.setCodeBlock()}
          />

          <SlashMenuEmpty />
        </AutocompletePopup>
      </AutocompletePositioner>
    </AutocompleteRoot>
  )
}
