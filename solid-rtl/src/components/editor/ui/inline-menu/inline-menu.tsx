import type { BasicExtension } from 'prosekit/basic'
import type { Editor } from 'prosekit/core'
import type { LinkAttrs } from 'prosekit/extensions/link'
import type { EditorState } from 'prosekit/pm/state'
import { useEditor, useEditorDerivedValue } from 'prosekit/solid'
import { InlinePopover } from 'prosekit/solid/inline-popover'
import { createSignal, Show, type JSX } from 'solid-js'

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

export default function InlineMenu(): JSX.Element {
  const editor = useEditor<BasicExtension>()
  const items = useEditorDerivedValue(getInlineMenuItems)

  const [linkMenuOpen, setLinkMenuOpen] = createSignal(false)
  const toggleLinkMenuOpen = () => setLinkMenuOpen((open) => !open)

  const handleLinkUpdate = (href?: string) => {
    if (href) {
      editor().commands.addLink({ href })
    } else {
      editor().commands.removeLink()
    }

    setLinkMenuOpen(false)
    editor().focus()
  }

  return (
    <>
      <InlinePopover
        attr:data-testid="inline-menu-main"
        class="z-10 box-border border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden relative flex min-w-32 space-x-1 overflow-auto whitespace-nowrap rounded-md p-1"
        onOpenChange={(open) => {
          if (!open) {
            setLinkMenuOpen(false)
          }
        }}
      >
        <Show when={items().bold}>
          {(item) => (
            <Button
              pressed={item().isActive}
              disabled={!item().canExec}
              onClick={item().command}
              tooltip="Bold"
            >
              <div class="i-lucide-bold size-5 block"></div>
            </Button>
          )}
        </Show>
        <Show when={items().italic}>
          {(item) => (
            <Button
              pressed={item().isActive}
              disabled={!item().canExec}
              onClick={item().command}
              tooltip="Italic"
            >
              <div class="i-lucide-italic size-5 block"></div>
            </Button>
          )}
        </Show>
        <Show when={items().underline}>
          {(item) => (
            <Button
              pressed={item().isActive}
              disabled={!item().canExec}
              onClick={item().command}
              tooltip="Underline"
            >
              <div class="i-lucide-underline size-5 block"></div>
            </Button>
          )}
        </Show>
        <Show when={items().strike}>
          {(item) => (
            <Button
              pressed={item().isActive}
              disabled={!item().canExec}
              onClick={item().command}
              tooltip="Strikethrough"
            >
              <div class="i-lucide-strikethrough size-5 block"></div>
            </Button>
          )}
        </Show>
        <Show when={items().code}>
          {(item) => (
            <Button
              pressed={item().isActive}
              disabled={!item().canExec}
              onClick={item().command}
              tooltip="Code"
            >
              <div class="i-lucide-code size-5 block"></div>
            </Button>
          )}
        </Show>
        <Show when={items().link?.canExec && items().link}>
          {(item) => (
            <Button
              pressed={item().isActive}
              onClick={() => {
                item().command()
                toggleLinkMenuOpen()
              }}
              tooltip="Link"
            >
              <div class="i-lucide-link size-5 block"></div>
            </Button>
          )}
        </Show>
      </InlinePopover>

      <Show when={items().link}>
        {(item) => (
          <InlinePopover
            placement="bottom"
            defaultOpen={false}
            open={linkMenuOpen()}
            onOpenChange={setLinkMenuOpen}
            attr:data-testid="inline-menu-link"
            class="z-10 box-border border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch"
          >
            <Show when={linkMenuOpen()}>
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  const target = event.target as HTMLFormElement | null
                  const href = target?.querySelector('input')?.value?.trim()
                  handleLinkUpdate(href)
                }}
              >
                <input
                  placeholder="Paste the link..."
                  value={item().currentLink || ''}
                  class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
                ></input>
              </form>
            </Show>
            <Show when={item().isActive}>
              <button
                onClick={() => handleLinkUpdate()}
                onMouseDown={(event) => event.preventDefault()}
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-9 px-3"
              >
                Remove link
              </button>
            </Show>
          </InlinePopover>
        )}
      </Show>
    </>
  )
}
