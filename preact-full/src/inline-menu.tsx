import type { JSX } from 'preact'
import { useState } from 'preact/hooks'
import type { Editor } from 'prosekit/core'
import type { LinkAttrs } from 'prosekit/extensions/link'
import type { EditorState } from 'prosekit/pm/state'
import { useEditor, useEditorDerivedValue } from 'prosekit/preact'
import { InlinePopover } from 'prosekit/preact/inline-popover'

import Button from './button'
import type { EditorExtension } from './extension'

function getInlineMenuItems(editor: Editor<EditorExtension>) {
  return {
    bold: {
      isActive: editor.marks.bold.isActive(),
      canExec: editor.commands.toggleBold.canExec(),
      command: () => editor.commands.toggleBold(),
    },
    italic: {
      isActive: editor.marks.italic.isActive(),
      canExec: editor.commands.toggleItalic.canExec(),
      command: () => editor.commands.toggleItalic(),
    },
    underline: {
      isActive: editor.marks.underline.isActive(),
      canExec: editor.commands.toggleUnderline.canExec(),
      command: () => editor.commands.toggleUnderline(),
    },
    strike: {
      isActive: editor.marks.strike.isActive(),
      canExec: editor.commands.toggleStrike.canExec(),
      command: () => editor.commands.toggleStrike(),
    },
    code: {
      isActive: editor.marks.code.isActive(),
      canExec: editor.commands.toggleCode.canExec(),
      command: () => editor.commands.toggleCode(),
    },
    link: {
      isActive: editor.marks.link.isActive(),
      canExec: editor.commands.addLink.canExec({ href: '' }),
      command: () => editor.commands.expandLink(),
      currentLink: getCurrentLink(editor.state),
    },
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

export default function InlineMenu() {
  const editor = useEditor<EditorExtension>()
  const items = useEditorDerivedValue(getInlineMenuItems)

  const [linkMenuOpen, setLinkMenuOpen] = useState(false)
  const toggleLinkMenuOpen = () => setLinkMenuOpen((open) => !open)

  const handleLinkUpdate = (href?: string) => {
    if (href) {
      editor.commands.addLink({ href })
    } else {
      editor.commands.removeLink()
    }

    setLinkMenuOpen(false)
    editor.focus()
  }

  const handleFormSubmit = (event: JSX.TargetedEvent<HTMLFormElement>) => {
    event.preventDefault()
    const input = event.currentTarget.querySelector('input')
    const href = input?.value?.trim()
    handleLinkUpdate(href)
  }

  return (
    <>
      <InlinePopover
        data-testid="inline-menu-main"
        className="z-10 box-border border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden relative flex min-w-32 space-x-1 overflow-auto whitespace-nowrap rounded-md p-1"
        onOpenChange={(open) => {
          if (!open) {
            setLinkMenuOpen(false)
          }
        }}
      >
        <Button
          pressed={items.bold.isActive}
          disabled={!items.bold.canExec}
          onClick={() => items.bold.command()}
          tooltip="Bold"
        >
          <div className="i-lucide-bold size-5 block"></div>
        </Button>

        <Button
          pressed={items.italic.isActive}
          disabled={!items.italic.canExec}
          onClick={() => items.italic.command()}
          tooltip="Italic"
        >
          <div className="i-lucide-italic size-5 block"></div>
        </Button>

        <Button
          pressed={items.underline.isActive}
          disabled={!items.underline.canExec}
          onClick={() => items.underline.command()}
          tooltip="Underline"
        >
          <div className="i-lucide-underline size-5 block"></div>
        </Button>

        <Button
          pressed={items.strike.isActive}
          disabled={!items.strike.canExec}
          onClick={() => items.strike.command()}
          tooltip="Strikethrough"
        >
          <div className="i-lucide-strikethrough size-5 block"></div>
        </Button>

        <Button
          pressed={items.code.isActive}
          disabled={!items.code.canExec}
          onClick={() => items.code.command()}
          tooltip="Code"
        >
          <div className="i-lucide-code size-5 block"></div>
        </Button>

        {items.link.canExec && (
          <Button
            pressed={items.link.isActive}
            onClick={() => {
              items.link.command()
              toggleLinkMenuOpen()
            }}
            tooltip="Link"
          >
            <div className="i-lucide-link size-5 block"></div>
          </Button>
        )}
      </InlinePopover>

      <InlinePopover
        placement="bottom"
        defaultOpen={false}
        open={linkMenuOpen}
        onOpenChange={setLinkMenuOpen}
        data-testid="inline-menu-link"
        className="z-10 box-border border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch"
      >
        {linkMenuOpen && (
          <form onSubmit={handleFormSubmit}>
            <input
              placeholder="Paste the link..."
              defaultValue={items.link.currentLink}
              className="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
            />
          </form>
        )}
        {items.link.isActive && (
          <button
            onClick={() => handleLinkUpdate()}
            onMouseDown={(event) => event.preventDefault()}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-9 px-3"
          >
            Remove link
          </button>
        )}
      </InlinePopover>
    </>
  )
}
