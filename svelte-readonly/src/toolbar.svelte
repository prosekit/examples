<script lang="ts">
import Toggle from './toggle.svelte'

import { useReadonly } from './use-readonly'

const { readonly } = useReadonly()
</script>

<div class="z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-white dark:bg-neutral-900 border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b">
  <Toggle pressed={$readonly} onClick={() => ($readonly = true)}>
    Readonly
  </Toggle>

  <Toggle pressed={!$readonly} onClick={() => ($readonly = false)}>
    Editable
  </Toggle>
</div>
