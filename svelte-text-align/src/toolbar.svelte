<script lang="ts">
import type {
  Editor,
  NodeAction,
} from 'prosekit/core'
import { useEditor } from 'prosekit/svelte'
import Button from './button.svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })

const isTextAlignActive = (editor: Editor<EditorExtension>, value: string) => {
  return Object.values(editor.nodes).some((node: NodeAction<any>) => {
    return node.isActive({ textAlign: value })
  })
}
</script>

<div class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
  <Button
    pressed={isTextAlignActive($editor, 'left')}
    disabled={!$editor.commands.setTextAlign.canExec('left')}
    onClick={() => $editor.commands.setTextAlign('left')}
  >
    Left
  </Button>

  <Button
    pressed={isTextAlignActive($editor, 'center')}
    disabled={!$editor.commands.setTextAlign.canExec('center')}
    onClick={() => $editor.commands.setTextAlign('center')}
  >
    Center
  </Button>

  <Button
    pressed={isTextAlignActive($editor, 'right')}
    disabled={!$editor.commands.setTextAlign.canExec('right')}
    onClick={() => $editor.commands.setTextAlign('right')}
  >
    Right
  </Button>

  <Button
    pressed={isTextAlignActive($editor, 'justify')}
    disabled={!$editor.commands.setTextAlign.canExec('justify')}
    onClick={() => $editor.commands.setTextAlign('justify')}
  >
    Justify
  </Button>
</div>
