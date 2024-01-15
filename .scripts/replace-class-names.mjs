import fs from 'node:fs/promises'

import { replaceShortcuts } from '../.temp/prosekit/config/unocss-shortcut.mjs'

async function main() {
  // get the file name for args
  const fileName = process.argv[2]
  const text = await fs.readFile(fileName, 'utf-8')
  const newText = replaceShortcuts(text)
  if (text !== newText) {
    await fs.writeFile(fileName, newText)
  }
}

main()
