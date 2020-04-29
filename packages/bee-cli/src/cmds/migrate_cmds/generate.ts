import path from 'path'
import bee, { IEngineOptions } from '@xarples/bee-engine'
import { Argv, Arguments } from 'yargs'

interface IOptions {
  name: string
  bee: IEngineOptions
}

export const command = 'generate [name]'

export const desc = 'Generate a new migration'

export const builder = function (yargs: Argv) {
  return yargs
    .options({
      name: {
        type: 'string',
        desc: 'Name of the new migration',
        required: true,
      },
    })
    .example(
      'bee migration generate --name create-users',
      'Generate a new migration file with name XXXX-create-users'
    )
}

export const handler = async function (argv: Arguments<IOptions>) {
  const engine = bee.createEngine(argv.bee)

  engine.generate({
    fileName: argv.name,
    template: 'migration',
    outputPath: path.resolve(process.cwd(), 'migrations'),
  })
}
