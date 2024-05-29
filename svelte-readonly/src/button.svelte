<script lang="ts">
export let pressed: boolean = false
export let disabled: boolean = false
export let onClick: VoidFunction
</script>

<button
  data-state={pressed ? 'on' : 'off'}
  disabled={disabled ? true : undefined}
  on:click={onClick}
  on:mousedown|preventDefault
  class='outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50 hover:disabled:opacity-50 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 data-[state=on]:bg-gray-200 dark:data-[state=on]:bg-gray-700'
>
  <slot />
</button>
