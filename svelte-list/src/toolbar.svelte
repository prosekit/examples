<script lang="ts">
import { useEditor } from 'prosekit/svelte'
import Button from './button.svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
  <Button
    pressed={$editor.nodes.list.isActive({ kind: 'bullet' })}
    onClick={() => $editor.commands.toggleList({ kind: 'bullet' })}
    tooltip="Bullet"
  >
    <div class="i-lucide-list size-5 block"></div>
  </Button>

  <Button
    pressed={$editor.nodes.list.isActive({ kind: 'ordered' })}
    onClick={() => $editor.commands.toggleList({ kind: 'ordered' })}
    tooltip="Ordered"
  >
    <div class="i-lucide-list-ordered size-5 block"></div>
  </Button>

  <Button
    pressed={$editor.nodes.list.isActive({ kind: 'task' })}
    onClick={() => $editor.commands.toggleList({ kind: 'task' })}
    tooltip="Task"
  >
    <div class="i-lucide-list-checks size-5 block"></div>
  </Button>

  <Button
    pressed={$editor.nodes.list.isActive({ kind: 'toggle' })}
    onClick={() => $editor.commands.toggleList({ kind: 'toggle' })}
    tooltip="Toggle"
  >
    <div class="i-lucide-list-collapse size-5 block"></div>
  </Button>
</div>
