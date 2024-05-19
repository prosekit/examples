<script setup lang="ts">
import Toggle from './toggle.vue'
import { useReadonly } from './use-readonly'

const { readonly } = useReadonly()
</script>

<template>
  <div class='z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-background border-border border-solid border-l-0 border-r-0 border-t-0 border-b'>
    <Toggle :pressed="readonly" :onClick="() => (readonly = true)">
      Readonly
    </Toggle>
    <Toggle :pressed="!readonly" :onClick="() => (readonly = false)">
      Editable
    </Toggle>
  </div>
</template>
