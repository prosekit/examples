import fs from 'node:fs/promises'

import { replaceThemes } from '../.temp/prosekit/packages/themes/dist/prosekit-themes.gen.js'

async function main() {
  // get the file name for args
  const fileName = process.argv[2]
  const text = await fs.readFile(fileName, 'utf-8')
  const newText = replaceThemes(text)
  if (text !== newText) {
    await fs.writeFile(fileName, newText)
  }
}

main()
