import fs from 'fs'
import path from 'path'
import { ncp } from 'ncp'

import getFormatedDate from '../../utils/get-formated-date'

interface IOptions {
  fileName: string
  template: 'migration' | 'seed' | 'init'
  outputPath: string
}

export default function generate(options: IOptions) {
  const fileName = `${getFormatedDate()}-${options.fileName}.js`
  const templatePath = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'templates',
    `${options.template}${options.template !== 'init' ? '.js' : ''}`
  )

  let outputPath: string = options.outputPath
    ? path.resolve(options.outputPath, fileName)
    : path.resolve(process.cwd(), `${options.template}s`, fileName)

  if (options.template === 'init') {
    outputPath = options.outputPath || path.resolve(process.cwd())

    ncp(templatePath, outputPath, (err) => {
      if (err) {
        console.log(err)
      }
    })
  } else {
    fs.copyFileSync(templatePath, outputPath, fs.constants.COPYFILE_EXCL)
  }
}
