<script setup lang="ts">
import { useEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'
import Toggle from './toggle.svelte'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class='z-2 sticky top-0 box-border flex flex-wrap gap-1 bg-gray-100 p-2 dark:bg-zinc-900'>
  <Toggle
    pressed={$editor.marks.italic.isActive()}
    onClick={() => $editor.commands.toggleItalic()}
  >
    Italic
  </Toggle>
</div>
