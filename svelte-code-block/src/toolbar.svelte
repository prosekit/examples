<script setup lang="ts">
import { useEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'
import Button from './button.svelte'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class='z-2 box-border border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center'>
  <Button
    pressed={$editor.nodes.codeBlock.isActive()}
    disabled={!$editor.commands.setCodeBlock.canApply()}
    onClick={() => $editor.commands.setCodeBlock()}
    tooltip="Heading 1"
  >
    <div class='i-lucide-square-code h-5 w-5' />
  </Button>
</div>
