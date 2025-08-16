import type { Editor } from 'prosekit/core'
import type { LinkAttrs } from 'prosekit/extensions/link'
import type { EditorState } from 'prosekit/pm/state'
import { useEditor, useEditorDerivedValue } from 'prosekit/react'
import { InlinePopover } from 'prosekit/react/inline-popover'
import { useState } from 'react'

import Button from './button'
import type { EditorExtension } from './extension'

function getInlineMenuItems(editor: Editor<EditorExtension>) {
  return {
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
        {items.link.canExec && (
          <Button
            pressed={items.link.isActive}
            onClick={() => {
              editor.commands.expandLink()
              toggleLinkMenuOpen()
            }}
            tooltip="Link"
          >
            <div className="i-lucide-link size-5 block"></div>
          </Button>
        )}
      </InlinePopover>

      <InlinePopover
        placement={'bottom'}
        defaultOpen={false}
        open={linkMenuOpen}
        onOpenChange={setLinkMenuOpen}
        data-testid="inline-menu-link"
        className="z-10 box-border border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch"
      >
        {linkMenuOpen && (
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
              defaultValue={items.link.currentLink}
              className="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
            ></input>
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
