<script lang="ts">
import Button from './button.svelte'

import { useReadonly } from './use-readonly'

const { readonly } = useReadonly()
</script>

<div class='z-2 box-border border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center'>
  <Button pressed={$readonly} onClick={() => ($readonly = true)}>
    Readonly
  </Button>

  <Button pressed={!$readonly} onClick={() => ($readonly = false)}>
    Editable
  </Button>
</div>
