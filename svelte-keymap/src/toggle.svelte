<script lang="ts">
export let pressed: boolean
export let disabled: boolean = false
export let onClick: VoidFunction
</script>

<button
  data-state={pressed ? 'on' : 'off'}
  disabled={disabled ? true : undefined}
  on:click={onClick}
  on:mousedown|preventDefault
  class='outline-unset focus-visible:outline-unset inline-flex items-center justify-center rounded-md bg-transparent bg-transparent p-2 font-medium transition focus-visible:ring-2 focus-visible:ring-gray-950 disabled:pointer-events-none hover:opacity-90 disabled:opacity-50 hover:disabled:opacity-50 data-[state=on]:opacity-80 text-gray-500 data-[state=on]:text-black dark:text-gray-400 dark:data-[state=on]:text-white box-border bg-transparent data-[state=on]:bg-gray-400/20 hover:data-[state=off]:bg-gray-400/20 dark:data-[state=on]:bg-gray-700 dark:hover:data-[state=off]:bg-gray-700/80'
>
  <slot />
</button>
