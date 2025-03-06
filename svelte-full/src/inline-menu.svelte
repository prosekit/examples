<script lang="ts">
import type { EditorState } from 'prosekit/pm/state'
import { useEditor } from 'prosekit/svelte'
import { InlinePopover } from 'prosekit/svelte/inline-popover'
import Button from './button.svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
let linkMenuOpen = false

const setLinkMenuOpen = (value: boolean) => {
  linkMenuOpen = value
}
const toggleLinkMenuOpen = () => {
  linkMenuOpen = !linkMenuOpen
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
    $editor.commands.addLink({ href })
  } else {
    $editor.commands.removeLink()
  }

  linkMenuOpen = false
  $editor.focus()
}

const handleSubmit = (event: Event) => {
  const target = event.target as HTMLFormElement | null
  const href = target?.querySelector('input')?.value?.trim()
  handleLinkUpdate(href)
}
</script>

<InlinePopover data-testid="inline-menu-main" class='z-10 box-border border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden relative flex min-w-[8rem] space-x-1 overflow-auto whitespace-nowrap rounded-md p-1'>
  <Button
    pressed={$editor.marks.bold.isActive()}
    disabled={!$editor.commands.toggleBold.canExec()}
    tooltip="Bold"
    onClick={() => $editor.commands.toggleBold()}
  >
    <div class='i-lucide-bold h-5 w-5'></div>
  </Button>

  <Button
    pressed={$editor.marks.italic.isActive()}
    disabled={!$editor.commands.toggleItalic.canExec()}
    onClick={() => $editor.commands.toggleItalic()}
    tooltip="Italic"
  >
    <div class='i-lucide-italic h-5 w-5'></div>
  </Button>

  <Button
    pressed={$editor.marks.underline.isActive()}
    disabled={!$editor.commands.toggleUnderline.canExec()}
    onClick={() => $editor.commands.toggleUnderline()}
    tooltip="Underline"
  >
    <div class='i-lucide-underline h-5 w-5'></div>
  </Button>

  <Button
    pressed={$editor.marks.strike.isActive()}
    disabled={!$editor.commands.toggleStrike.canExec()}
    onClick={() => $editor.commands.toggleStrike()}
    tooltip="Strike"
  >
    <div class='i-lucide-strikethrough h-5 w-5'></div>
  </Button>

  <Button
    pressed={$editor.marks.code.isActive()}
    disabled={!$editor.commands.toggleCode.canExec()}
    onClick={() => $editor.commands.toggleCode()}
    tooltip="Code"
  >
    <div class='i-lucide-code h-5 w-5'></div>
  </Button>

  {#if $editor.commands.addLink.canExec({ href: '' })}
    <Button
      pressed={$editor.marks.link.isActive()}
      onClick={() => {
        $editor.commands.expandLink()
        toggleLinkMenuOpen()
      }}
      tooltip="Link"
    >
      <div class='i-lucide-link h-5 w-5'></div>
    </Button>
  {/if}
</InlinePopover>

<InlinePopover
  placement="bottom"
  defaultOpen={false}
  open={linkMenuOpen}
  onOpenChange={setLinkMenuOpen}
  data-testid="inline-menu-link"
  class='z-10 box-border border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch'
>
  {#if linkMenuOpen}
    <form on:submit|preventDefault={handleSubmit}>
      <input
        placeholder="Paste the link..."
        value={getCurrentLink($editor.state) || ''}
        class='flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-none focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50'
      />
    </form>
  {/if}

  {#if $editor.marks.link.isActive()}
    <button
      on:click={() => handleLinkUpdate()}
      on:mousedown|preventDefault
      class='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-9 px-3'
    >
      Remove link
    </button>
  {/if}
</InlinePopover>
