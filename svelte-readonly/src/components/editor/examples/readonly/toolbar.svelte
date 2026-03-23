<script lang="ts">
import { defineReadonly } from 'prosekit/extensions/readonly'
import { useExtension } from 'prosekit/svelte'
import { toStore } from 'svelte/store'

import { Button } from '../../ui/button'

let readonly = $state(true)

const extension = $derived(readonly ? defineReadonly() : null)

useExtension(toStore(() => extension))

function setReadonly(value: boolean) {
  readonly = value
}
</script>

<div class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
  <Button pressed={readonly} onClick={() => setReadonly(true)}>
    Readonly
  </Button>

  <Button pressed={!readonly} onClick={() => setReadonly(false)}>
    Editable
  </Button>
</div>
