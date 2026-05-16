<script setup lang="ts">
import type { BasicExtension } from 'prosekit/basic'
import { canUseRegexLookbehind } from 'prosekit/core'
import { useEditor } from 'prosekit/vue'
import {
  AutocompletePopup,
  AutocompletePositioner,
  AutocompleteRoot,
} from 'prosekit/vue/autocomplete'

import SlashMenuEmpty from './slash-menu-empty.vue'
import SlashMenuItem from './slash-menu-item.vue'

const editor = useEditor<BasicExtension>()

// Match inputs like "/", "/table", "/heading 1" etc. Do not match "/ heading".
const regex = canUseRegexLookbehind() ? /(?<!\S)\/(\S.*)?$/u : /\/(\S.*)?$/u
</script>

<template>
  <AutocompleteRoot :regex="regex">
    <AutocompletePositioner
      class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"
    >
      <AutocompletePopup
        class="box-border origin-(--transform-origin) transition-[opacity,scale] transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg bg-[canvas] flex flex-col relative max-h-100 min-h-0 min-w-60 select-none overflow-hidden whitespace-nowrap"
      >
        <div
          class="flex flex-col flex-1 min-h-0 overflow-y-auto p-1 bg-[canvas] overscroll-contain"
        >
          <SlashMenuItem
            label="Text"
            @select="() => editor.commands.setParagraph()"
          />

          <SlashMenuItem
            label="Heading 1"
            kbd="#"
            @select="() => editor.commands.setHeading({ level: 1 })"
          />

          <SlashMenuItem
            label="Heading 2"
            kbd="##"
            @select="() => editor.commands.setHeading({ level: 2 })"
          />

          <SlashMenuItem
            label="Heading 3"
            kbd="###"
            @select="() => editor.commands.setHeading({ level: 3 })"
          />

          <SlashMenuItem
            label="Bullet list"
            kbd="-"
            @select="() => editor.commands.wrapInList({ kind: 'bullet' })"
          />

          <SlashMenuItem
            label="Ordered list"
            kbd="1."
            @select="() => editor.commands.wrapInList({ kind: 'ordered' })"
          />

          <SlashMenuItem
            label="Task list"
            kbd="[]"
            @select="() => editor.commands.wrapInList({ kind: 'task' })"
          />

          <SlashMenuItem
            label="Toggle list"
            kbd=">>"
            @select="() => editor.commands.wrapInList({ kind: 'toggle' })"
          />

          <SlashMenuItem
            label="Quote"
            kbd=">"
            @select="() => editor.commands.setBlockquote()"
          />

          <SlashMenuItem
            label="Table"
            @select="() => editor.commands.insertTable({ row: 3, col: 3 })"
          />

          <SlashMenuItem
            label="Divider"
            kbd="---"
            @select="() => editor.commands.insertHorizontalRule()"
          />

          <SlashMenuItem
            label="Code"
            kbd="```"
            @select="() => editor.commands.setCodeBlock()"
          />

          <SlashMenuEmpty />
        </div>
      </AutocompletePopup>
    </AutocompletePositioner>
  </AutocompleteRoot>
</template>
