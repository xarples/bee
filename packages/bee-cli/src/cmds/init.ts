import path from 'path'
import { Argv, Arguments } from 'yargs'
import bee, { IEngineOptions } from '@xarples/bee-engine'

interface IOptions {
  bee: IEngineOptions
}

export const command = 'init'

export const desc = 'Initialize a bee project'

export const builder = function (yargs: Argv) {
  return yargs.example('bee init', 'Initialize a bee a project')
}

export const handler = function (argv: Arguments<IOptions>) {
  const engine = bee.createEngine({
    ...argv.bee,
  })

  engine.generate({
    fileName: '',
    template: 'init',
    outputPath: path.resolve(process.cwd()),
  })
}
