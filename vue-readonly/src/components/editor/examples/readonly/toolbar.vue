<script setup lang="ts">
import { Button } from '../../ui/button'

import { useReadonly } from './use-readonly'

const { readonly, setReadonly } = useReadonly()
</script>

<template>
  <div class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
    <Button :pressed="readonly" @click="setReadonly(true)">
      Readonly
    </Button>

    <Button :pressed="!readonly" @click="setReadonly(false)">
      Editable
    </Button>
  </div>
</template>
