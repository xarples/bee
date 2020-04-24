import path from 'path'
import bee, { IBeeEngineOptions } from '@xarples/bee-engine'
import { Argv, Arguments } from 'yargs'

interface IOptions extends IBeeEngineOptions {
  pending?: boolean
  executed?: boolean
}

export const command = 'status [pending] [executed]'

export const desc = 'List the status of all migrations'

export const builder = function (yargs: Argv) {
  return yargs
    .options({
      pending: {
        type: 'boolean',
        desc: 'List pending migrations',
        default: undefined,
      },
      executed: {
        type: 'boolean',
        desc: 'List executed migrations',
        default: undefined,
      },
    })
    .example('bee migration status', 'List all migrations')
    .example('bee migration status --pending', 'List pending migrations')
    .example('bee migration status --executed', 'List executed migrations')
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

  if (argv.pending) {
    const migrations = await beeEngine.listPending()
    console.log(migrations)
  } else if (argv.executed) {
    const migrations = await beeEngine.listExecuted()
    console.log(migrations)
  } else {
    const migrations = await beeEngine.listAll()
    console.log(migrations)
  }
}
