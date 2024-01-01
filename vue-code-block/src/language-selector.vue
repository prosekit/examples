<script setup lang="ts">
import { ComboBox } from 'prosekit/vue/combo-box'
import { ComboBoxInput } from 'prosekit/vue/combo-box-input'
import { ComboBoxItem } from 'prosekit/vue/combo-box-item'
import { ComboBoxList } from 'prosekit/vue/combo-box-list'
import { ref } from 'vue'
import { bundledLanguagesInfo } from 'shikiji'

const languages: Array<[id: string, name: string]> = bundledLanguagesInfo.map(
  (info) => [info.id, info.name],
)

const props = defineProps<{
  language?: string
  setLanguage: (language: string) => void
}>()

const showComboBox = ref(false)
const buttonRef = ref<HTMLButtonElement>()

const closeComboBox = () => {
  showComboBox.value = false
}
const toggleComboBox = () => {
  showComboBox.value = !showComboBox.value
}
</script>

<template>
  <div className='relative top-2 box-border flex h-0 w-full overflow-visible'>
    <button
      className='absolute m-2 box-border cursor-pointer rounded-md border-none bg-transparent px-2 py-0.5 text-xs text-gray-400 outline-none transition hover:bg-gray-500/30 hover:text-gray-800 opacity-0 [div[data-node-view-root]:hover_&]:opacity-100'
      @click="toggleComboBox"
      ref="buttonRef"
      contentEditable="false"
    >
      {{ props.language || 'Plain Text' }}
    </button>

    <ComboBox
      className='divide-y-1 w-50 box-border flex flex-col divide-y divide-gray-200 overflow-hidden rounded-md rounded-md border border-solid border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-zinc-800'
      :active="showComboBox"
      :reference="buttonRef"
      @dismiss="closeComboBox"
    >
      <ComboBoxInput
        placeholder="Search for a langauge..."
        className='box-border flex h-8 w-full rounded-md bg-transparent px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 [&_input]:border-none [&_input]:outline-none'
      ></ComboBoxInput>
      <ComboBoxList className='box-border flex max-h-[300px] flex-col overflow-y-auto overflow-x-hidden border-0 border-solid p-1'>
        <ComboBoxItem
          v-for="[languageId, languageName] in languages"
          :key="languageId"
          className='relative block scroll-my-1 rounded px-2 py-1.5 text-sm box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-gray-200/70 aria-selected:dark:bg-gray-700/70'
          @select="() => props.setLanguage(languageId)"
        >
          {{ languageName }}
        </ComboBoxItem>
      </ComboBoxList>
    </ComboBox>
  </div>
</template>
