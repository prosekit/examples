<script setup lang="ts">
import type { EditorState } from 'prosekit/pm/state'
import { useEditor } from 'prosekit/vue'
import { InlinePopover } from 'prosekit/vue/inline-popover'
import { ref } from 'vue'
import type { EditorExtension } from './extension'
import Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
const linkMenuOpen = ref(false)

const setLinkMenuOpen = (value: boolean) => {
  linkMenuOpen.value = value
}
const toggleLinkMenuOpen = () => {
  linkMenuOpen.value = !linkMenuOpen.value
}

const getCurrentLink = (state: EditorState): string | undefined => {
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

const handleLinkUpdate = (href?: string) => {
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
  <InlinePopover class='z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg relative flex min-w-[120px] space-x-1 overflow-auto whitespace-nowrap rounded-md p-1'>
    <Toggle
      :pressed="editor.marks.bold.isActive()"
      :disabled="!editor.commands.toggleBold.canApply()"
      @click="() => editor.commands.toggleBold()"
    >
      <div class='i-lucide-bold h-5 w-5'></div>
    </Toggle>

    <Toggle
      :pressed="editor.marks.italic.isActive()"
      :disabled="!editor.commands.toggleItalic.canApply()"
      @click="() => editor.commands.toggleItalic()"
    >
      <div class='i-lucide-italic h-5 w-5'></div>
    </Toggle>

    <Toggle
      :pressed="editor.marks.underline.isActive()"
      :disabled="!editor.commands.toggleUnderline.canApply()"
      @click="() => editor.commands.toggleUnderline()"
    >
      <div class='i-lucide-underline h-5 w-5'></div>
    </Toggle>

    <Toggle
      :pressed="editor.marks.strike.isActive()"
      :disabled="!editor.commands.toggleStrike.canApply()"
      @click="() => editor.commands.toggleStrike()"
    >
      <div class='i-lucide-strikethrough h-5 w-5'></div>
    </Toggle>

    <Toggle
      :pressed="editor.marks.code.isActive()"
      :disabled="!editor.commands.toggleCode.canApply()"
      @click="() => editor.commands.toggleCode()"
    >
      <div class='i-lucide-code h-5 w-5'></div>
    </Toggle>

    <Toggle
      v-if="editor.commands.addLink.canApply({ href: '' })"
      :pressed="editor.marks.link.isActive()"
      @click="
        () => {
          editor.commands.expandLink()
          toggleLinkMenuOpen()
        }
      "
    >
      <div class='i-lucide-link h-5 w-5'></div>
    </Toggle>
  </InlinePopover>

  <InlinePopover
    class='z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch'
    :placement="'bottom'"
    :open="linkMenuOpen"
    @openChange="setLinkMenuOpen"
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
        class='flex h-10 rounded-md w-full bg-white dark:bg-neutral-900 px-3 py-2 text-sm placeholder:text-zinc-500 dark:placeholder:text-zinc-500 transition border box-border border-zinc-200 dark:border-zinc-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 focus-visible:ring-offset-0 outline-none focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50'
      />
    </form>
    <button
      v-if="editor.marks.link.isActive()"
      @click="handleLinkUpdate()"
      @mousedown.prevent
      class='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-900/90 dark:hover:bg-zinc-50/90 h-9 px-3'
    >
      Remove link
    </button>
  </InlinePopover>
</template>
