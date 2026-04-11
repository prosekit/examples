<script setup lang="ts">
import type { BasicExtension } from 'prosekit/basic'
import type { Editor } from 'prosekit/core'
import type { LinkAttrs } from 'prosekit/extensions/link'
import type { EditorState } from 'prosekit/pm/state'
import { useEditor, useEditorDerivedValue } from 'prosekit/vue'
import {
  InlinePopoverPopup,
  InlinePopoverPositioner,
  InlinePopoverRoot,
} from 'prosekit/vue/inline-popover'
import { ref } from 'vue'

import { Button } from '../button'

function getInlineMenuItems(editor: Editor<BasicExtension>) {
  return {
    bold: editor.commands.toggleBold
      ? {
          isActive: editor.marks.bold.isActive(),
          canExec: editor.commands.toggleBold.canExec(),
          command: () => editor.commands.toggleBold(),
        }
      : undefined,
    italic: editor.commands.toggleItalic
      ? {
          isActive: editor.marks.italic.isActive(),
          canExec: editor.commands.toggleItalic.canExec(),
          command: () => editor.commands.toggleItalic(),
        }
      : undefined,
    underline: editor.commands.toggleUnderline
      ? {
          isActive: editor.marks.underline.isActive(),
          canExec: editor.commands.toggleUnderline.canExec(),
          command: () => editor.commands.toggleUnderline(),
        }
      : undefined,
    strike: editor.commands.toggleStrike
      ? {
          isActive: editor.marks.strike.isActive(),
          canExec: editor.commands.toggleStrike.canExec(),
          command: () => editor.commands.toggleStrike(),
        }
      : undefined,
    code: editor.commands.toggleCode
      ? {
          isActive: editor.marks.code.isActive(),
          canExec: editor.commands.toggleCode.canExec(),
          command: () => editor.commands.toggleCode(),
        }
      : undefined,
    link: editor.commands.addLink
      ? {
          isActive: editor.marks.link.isActive(),
          canExec: editor.commands.addLink.canExec({ href: '' }),
          command: () => editor.commands.expandLink(),
          currentLink: getCurrentLink(editor.state) || '',
        }
      : undefined,
  }
}

function getCurrentLink(state: EditorState): string | undefined {
  const { $from } = state.selection
  const marks = $from.marksAcross($from)
  if (!marks) {
    return
  }
  for (const mark of marks) {
    if (mark.type.name === 'link') {
      return (mark.attrs as LinkAttrs).href
    }
  }
}

const editor = useEditor<BasicExtension>()
const items = useEditorDerivedValue(getInlineMenuItems)

const linkMenuOpen = ref(false)
function toggleLinkMenuOpen() {
  linkMenuOpen.value = !linkMenuOpen.value
}

function handleLinkUpdate(href?: string) {
  if (href) {
    editor.value.commands.addLink({ href })
  } else {
    editor.value.commands.removeLink()
  }

  linkMenuOpen.value = false
  editor.value.focus()
}
</script>

<template>
  <InlinePopoverRoot
    @open-change="
      (event) => {
        if (!event.detail) linkMenuOpen = false
      }
    "
  >
    <InlinePopoverPositioner
      class="block overflow-visible bg-transparent w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"
    >
      <InlinePopoverPopup
        data-testid="inline-menu-main"
        class="box-border origin-(--transform-origin) transition transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg relative flex min-w-32 space-x-1 overflow-auto whitespace-nowrap rounded-md p-1"
      >
        <Button
          v-if="items.bold"
          :pressed="items.bold.isActive"
          :disabled="!items.bold.canExec"
          tooltip="Bold"
          @click="items.bold.command"
        >
          <div class="i-lucide-bold size-5 block"></div>
        </Button>
        <Button
          v-if="items.italic"
          :pressed="items.italic.isActive"
          :disabled="!items.italic.canExec"
          tooltip="Italic"
          @click="items.italic.command"
        >
          <div class="i-lucide-italic size-5 block"></div>
        </Button>
        <Button
          v-if="items.underline"
          :pressed="items.underline.isActive"
          :disabled="!items.underline.canExec"
          tooltip="Underline"
          @click="items.underline.command"
        >
          <div class="i-lucide-underline size-5 block"></div>
        </Button>
        <Button
          v-if="items.strike"
          :pressed="items.strike.isActive"
          :disabled="!items.strike.canExec"
          tooltip="Strikethrough"
          @click="items.strike.command"
        >
          <div class="i-lucide-strikethrough size-5 block"></div>
        </Button>
        <Button
          v-if="items.code"
          :pressed="items.code.isActive"
          :disabled="!items.code.canExec"
          tooltip="Code"
          @click="items.code.command"
        >
          <div class="i-lucide-code size-5 block"></div>
        </Button>
        <Button
          v-if="items.link?.canExec && items.link"
          :pressed="items.link.isActive"
          tooltip="Link"
          @click="
            () => {
              items.link!.command()
              toggleLinkMenuOpen()
            }
          "
        >
          <div class="i-lucide-link size-5 block"></div>
        </Button>
      </InlinePopoverPopup>
    </InlinePopoverPositioner>
  </InlinePopoverRoot>

  <InlinePopoverRoot
    v-if="items.link"
    :default-open="false"
    :open="linkMenuOpen"
    @open-change="
      (event) => {
        linkMenuOpen = event.detail
      }
    "
  >
    <InlinePopoverPositioner
      placement="bottom"
      class="block overflow-visible bg-transparent w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"
    >
      <InlinePopoverPopup
        data-testid="inline-menu-link"
        class="box-border origin-(--transform-origin) transition transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch"
      >
        <form
          v-if="linkMenuOpen"
          @submit.prevent="
            (event) => {
              const target = event.target as HTMLFormElement | null
              const href = target?.querySelector('input')?.value?.trim()
              handleLinkUpdate(href)
            }
          "
        >
          <input
            placeholder="Paste the link..."
            :value="items.link.currentLink || ''"
            class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
          />
        </form>
        <button
          v-if="items.link.isActive"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-9 px-3"
          @click="() => handleLinkUpdate()"
          @mousedown.prevent
        >
          Remove link
        </button>
      </InlinePopoverPopup>
    </InlinePopoverPositioner>
  </InlinePopoverRoot>
</template>
