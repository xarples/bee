import path from 'path'
import bee, { IBeeEngineOptions } from '@xarples/bee-engine'
import { Argv, Arguments } from 'yargs'

interface IOptions extends IBeeEngineOptions {
  to?: string
}

export const command = 'run [to]'

export const desc = 'Run pending migrations'

export const builder = function (yargs: Argv) {
  return yargs
    .options({
      to: {
        type: 'string',
        desc: 'Target migration name',
        default: undefined,
      },
    })
    .example('bee migration run', 'Run all pending migrations')
    .example(
      'bee migration run --to XXX-create-users',
      'Run the migrations from the current state to the passed migration name'
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

  await beeEngine.run(options)
}
