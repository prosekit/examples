<script lang="ts">
import Toggle from './toggle.svelte'

import { useReadonly } from './use-readonly'

const { readonly } = useReadonly()
</script>

<div class='z-2 sticky top-0 box-border flex flex-wrap gap-1 bg-gray-100 p-2 dark:bg-zinc-900 items-center'>
  <Toggle pressed={$readonly} onClick={() => ($readonly = true)}>
    Readonly
  </Toggle>

  <Toggle pressed={!$readonly} onClick={() => ($readonly = false)}>
    Editable
  </Toggle>
</div>
