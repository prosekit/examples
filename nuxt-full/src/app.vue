<script setup lang="ts">
import Editor from './editor.vue'
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <ClientOnly>
      <Editor />
    </ClientOnly>
  </div>
</template>
