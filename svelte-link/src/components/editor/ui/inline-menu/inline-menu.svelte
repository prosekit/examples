<script lang="ts">
import type { BasicExtension } from 'prosekit/basic'
import type { Editor } from 'prosekit/core'
import type { LinkAttrs } from 'prosekit/extensions/link'
import type { EditorState } from 'prosekit/pm/state'
import {
  useEditor,
  useEditorDerivedValue,
} from 'prosekit/svelte'
import { InlinePopover } from 'prosekit/svelte/inline-popover'

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
  const from = state.selection.$from
  const marks = from.marksAcross(from)
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

let linkMenuOpen = $state(false)
function toggleLinkMenuOpen() {
  linkMenuOpen = !linkMenuOpen
}

function handleLinkUpdate(href?: string) {
  if (href) {
    $editor.commands.addLink({ href })
  } else {
    $editor.commands.removeLink()
  }

  linkMenuOpen = false
  $editor.focus()
}
</script>

<InlinePopover
  data-testid="inline-menu-main"
  class="z-10 box-border border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden relative flex min-w-32 space-x-1 overflow-auto whitespace-nowrap rounded-md p-1"
  onOpenChange={(open) => {
    if (!open) linkMenuOpen = false
  }}
>
  {#if $items.bold}
    <Button
      pressed={$items.bold.isActive}
      disabled={!$items.bold.canExec}
      onClick={$items.bold.command}
      tooltip="Bold"
    >
      <div class="i-lucide-bold size-5 block"></div>
    </Button>
  {/if}
  {#if $items.italic}
    <Button
      pressed={$items.italic.isActive}
      disabled={!$items.italic.canExec}
      onClick={$items.italic.command}
      tooltip="Italic"
    >
      <div class="i-lucide-italic size-5 block"></div>
    </Button>
  {/if}
  {#if $items.underline}
    <Button
      pressed={$items.underline.isActive}
      disabled={!$items.underline.canExec}
      onClick={$items.underline.command}
      tooltip="Underline"
    >
      <div class="i-lucide-underline size-5 block"></div>
    </Button>
  {/if}
  {#if $items.strike}
    <Button
      pressed={$items.strike.isActive}
      disabled={!$items.strike.canExec}
      onClick={$items.strike.command}
      tooltip="Strikethrough"
    >
      <div class="i-lucide-strikethrough size-5 block"></div>
    </Button>
  {/if}
  {#if $items.code}
    <Button
      pressed={$items.code.isActive}
      disabled={!$items.code.canExec}
      onClick={$items.code.command}
      tooltip="Code"
    >
      <div class="i-lucide-code size-5 block"></div>
    </Button>
  {/if}
  {#if $items.link?.canExec && $items.link}
    <Button
      pressed={$items.link.isActive}
      onClick={() => {
        $items.link!.command()
        toggleLinkMenuOpen()
      }}
      tooltip="Link"
    >
      <div class="i-lucide-link size-5 block"></div>
    </Button>
  {/if}
</InlinePopover>

<InlinePopover
  placement="bottom"
  defaultOpen={false}
  open={linkMenuOpen}
  data-testid="inline-menu-link"
  class="z-10 box-border border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch"
  onOpenChange={(open) => {
    linkMenuOpen = open
  }}
>
  {#if linkMenuOpen && $items.link}
    <form
      onsubmit={(event) => {
        event.preventDefault()
        const target = event.target as HTMLFormElement | null
        const href = target?.querySelector('input')?.value?.trim()
        handleLinkUpdate(href)
      }}
    >
      <input
        placeholder="Paste the link..."
        value={$items.link.currentLink || ''}
        class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
      />
    </form>
  {/if}
  {#if $items.link?.isActive}
    <button
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-9 px-3"
      onclick={() => handleLinkUpdate()}
      onmousedown={(e) => e.preventDefault()}
    >
      Remove link
    </button>
  {/if}
</InlinePopover>
