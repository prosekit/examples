import { ComboBox } from 'prosekit/react/combo-box'
import { ComboBoxInput } from 'prosekit/react/combo-box-input'
import { ComboBoxItem } from 'prosekit/react/combo-box-item'
import { ComboBoxList } from 'prosekit/react/combo-box-list'
import { useRef, useState } from 'react'
import { bundledLanguagesInfo } from 'shikiji'

const languages: Array<[id: string, name: string]> = bundledLanguagesInfo.map(
  (info) => [info.id, info.name],
)

export default function LanguageSelector({
  language,
  setLanguage,
}: {
  language?: string
  setLanguage: (language: string) => void
}) {
  const [showComboBox, setShowComboBox] = useState(false)

  const closeComboBox = () => {
    setShowComboBox(false)
  }
  const toggleComboBox = () => {
    setShowComboBox((value) => !value)
  }

  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <div className='relative top-2 box-border flex h-0 w-full overflow-visible'>
      <button
        className='absolute m-2 box-border cursor-pointer rounded-md border-none bg-transparent px-2 py-0.5 text-xs text-gray-400 outline-none transition hover:bg-gray-500/30 hover:text-gray-800 opacity-0 [div[data-node-view-root]:hover_&]:opacity-100'
        onClick={toggleComboBox}
        ref={buttonRef}
        contentEditable={false}
      >
        {language || 'Plain Text'}
      </button>

      <ComboBox
        className='divide-y-1 w-50 box-border flex flex-col divide-y divide-gray-200 overflow-hidden rounded-md rounded-md border border-solid border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-zinc-800'
        active={showComboBox}
        reference={buttonRef.current ?? undefined}
        onDismiss={closeComboBox}
      >
        <ComboBoxInput
          placeholder="Search for a langauge..."
          className='box-border flex h-8 w-full rounded-md bg-transparent px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 [&_input]:border-none [&_input]:outline-none'
        ></ComboBoxInput>
        <ComboBoxList className='box-border flex max-h-[300px] flex-col overflow-y-auto overflow-x-hidden border-0 border-solid p-1'>
          {languages.map(([languageId, languageName]) => (
            <ComboBoxItem
              key={languageId}
              className='relative block scroll-my-1 rounded px-2 py-1.5 text-sm box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-gray-200/70 aria-selected:dark:bg-gray-700/70'
              onSelect={() => setLanguage(languageId)}
            >
              {languageName}
            </ComboBoxItem>
          ))}
        </ComboBoxList>
      </ComboBox>
    </div>
  )
}
