import path from 'path'
import bee, { IBeeEngineOptions } from '@xarples/bee-engine'
import { Argv, Arguments } from 'yargs'

interface IOptions extends IBeeEngineOptions {
  to?: string
}

export const command = 'down [to]'

export const desc = 'Revert all migrations ran'

export const builder = function (yargs: Argv) {
  return yargs
    .options({
      to: {
        type: 'string',
        desc: 'Target migration name',
        default: undefined,
      },
    })
    .example('bee migration down', 'Revert all pending migrations')
    .example(
      'bee migration down --to XXX-create-users',
      'Revert the migrations from the current state to the passed migration name'
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

  const options = argv.to ? { to: argv.to } : undefined

  await beeEngine.revert(options)
}
