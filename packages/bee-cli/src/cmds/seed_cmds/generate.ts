import path from 'path'
import bee, { IEngineOptions } from '@xarples/bee-engine'
import { Argv, Arguments } from 'yargs'

interface IOptions {
  name: string
  bee: IEngineOptions
}

export const command = 'generate [name]'

export const desc = 'Generate a new seed'

export const builder = function (yargs: Argv) {
  return yargs
    .options({
      name: {
        type: 'string',
        desc: 'Name of the new seed',
        required: true,
      },
    })
    .example(
      'bee seed generate --name create-users',
      'Generate a new seed file with name XXXX-create-users'
    )
}

export const handler = async function (argv: Arguments<IOptions>) {
  const engine = bee.createEngine({
    ...argv.bee,
    migrationsPath:
      argv.bee.migrationsPath || path.resolve(process.cwd(), 'seeds'),
    storageOptions: {
      path: path.resolve(process.cwd(), 'bee_seeds.json'),
    },
  })

  engine.generate({
    fileName: argv.name,
    template: 'seed',
    outputPath: path.resolve(process.cwd(), 'seeds'),
  })
}
