import path from 'path'
import bee, { IBeeEngineOptions } from '@xarples/bee-engine'
import { Argv, Arguments } from 'yargs'

interface IOptions extends IBeeEngineOptions {
  name: string
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
  const sequelize = argv.sequelize
  const umzug = argv.umzug || {
    migrations: {
      path: path.resolve(process.cwd(), 'migrations'),
    },
    storageOptions: {
      path: path.resolve(process.cwd(), 'bee_migrations.json'),
    },
  }

  const beeEngine = bee.createClient({
    sequelize,
    umzug,
  })

  await beeEngine.generateMigration(argv.name)
}
