<script setup lang="ts">
import type { EditorState } from 'prosekit/pm/state'
import { useEditor } from 'prosekit/vue'
import { InlinePopover } from 'prosekit/vue/inline-popover'
import { ref } from 'vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
const linkMenuOpen = ref(false)

function setLinkMenuOpen(value: boolean) {
  linkMenuOpen.value = value
}
function toggleLinkMenuOpen() {
  linkMenuOpen.value = !linkMenuOpen.value
}

function getCurrentLink(state: EditorState): string | undefined {
  const { $from } = state.selection
  const marks = $from.marksAcross($from)
  if (!marks) {
    return
  }
  for (const mark of marks) {
    if (mark.type.name === 'link') {
      return mark.attrs.href
    }
  }
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
  <InlinePopover
    data-testid="inline-menu-main"
    class="z-10 box-border border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden relative flex min-w-32 space-x-1 overflow-auto whitespace-nowrap rounded-md p-1"
  >
    <Button
      :pressed="editor.marks.bold.isActive()"
      :disabled="!editor.commands.toggleBold.canExec()"
      tooltip="Bold"
      @click="() => editor.commands.toggleBold()"
    >
      <div class="i-lucide-bold size-5 block" />
    </Button>

    <Button
      :pressed="editor.marks.italic.isActive()"
      :disabled="!editor.commands.toggleItalic.canExec()"
      tooltip="Italic"
      @click="() => editor.commands.toggleItalic()"
    >
      <div class="i-lucide-italic size-5 block" />
    </Button>

    <Button
      :pressed="editor.marks.underline.isActive()"
      :disabled="!editor.commands.toggleUnderline.canExec()"
      tooltip="Underline"
      @click="() => editor.commands.toggleUnderline()"
    >
      <div class="i-lucide-underline size-5 block" />
    </Button>

    <Button
      :pressed="editor.marks.strike.isActive()"
      :disabled="!editor.commands.toggleStrike.canExec()"
      tooltip="Strikethrough"
      @click="() => editor.commands.toggleStrike()"
    >
      <div class="i-lucide-strikethrough size-5 block" />
    </Button>

    <Button
      :pressed="editor.marks.code.isActive()"
      :disabled="!editor.commands.toggleCode.canExec()"
      tooltip="Code"
      @click="() => editor.commands.toggleCode()"
    >
      <div class="i-lucide-code size-5 block" />
    </Button>

    <Button
      v-if="editor.commands.addLink.canExec({ href: '' })"
      :pressed="editor.marks.link.isActive()"
      tooltip="Link"
      @click="
        () => {
          editor.commands.expandLink()
          toggleLinkMenuOpen()
        }
      "
    >
      <div class="i-lucide-link size-5 block" />
    </Button>
  </InlinePopover>

  <InlinePopover
    :placement="'bottom'"
    :default-open="false"
    :open="linkMenuOpen"
    data-testid="inline-menu-link"
    class="z-10 box-border border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch"
    @open-change="setLinkMenuOpen"
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
        :defaultValue="getCurrentLink(editor.state)"
        class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
      />
    </form>
    <button
      v-if="editor.marks.link.isActive()"
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-9 px-3"
      @click="handleLinkUpdate()"
      @mousedown.prevent
    >
      Remove link
    </button>
  </InlinePopover>
</template>
