<script lang="ts">
import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/svelte'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    subscript: {
      isActive: editor.marks.subscript.isActive(),
      canExec: editor.commands.toggleSubscript.canExec(),
      command: () => editor.commands.toggleSubscript(),
    },
    superscript: {
      isActive: editor.marks.superscript.isActive(),
      canExec: editor.commands.toggleSuperscript.canExec(),
      command: () => editor.commands.toggleSuperscript(),
    },
  }
}

const items = useEditorDerivedValue(getToolbarItems)
</script>

<div class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
  <Button
    pressed={$items.subscript.isActive}
    disabled={!$items.subscript.canExec}
    onClick={$items.subscript.command}
  >
    Subscript
  </Button>
  <Button
    pressed={$items.superscript.isActive}
    disabled={!$items.superscript.canExec}
    onClick={$items.superscript.command}
  >
    Superscript
  </Button>
</div>
