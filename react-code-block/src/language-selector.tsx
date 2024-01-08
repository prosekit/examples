import { bundledLanguagesInfo } from 'shikiji'

export default function LanguageSelector({
  language,
  setLanguage,
}: {
  language?: string
  setLanguage: (language: string) => void
}) {
  return (
    <div className='relative left-2 top-3 h-0 select-none overflow-visible' contentEditable="false">
      <select
        className='outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded border-none bg-transparent px-2 py-1 text-xs transition opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 [div[data-node-view-root]:hover_&]:hover:opacity-80'
        onChange={(event) => setLanguage(event.target.value)}
        value={language || ''}
      >
        <option value="">Plain Text</option>
        {bundledLanguagesInfo.map((info) => (
          <option key={info.id} value={info.id}>
            {info.name}
          </option>
        ))}
      </select>
    </div>
  )
}
