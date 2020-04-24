import path from 'path'
import bee, { IBeeEngineOptions } from '@xarples/bee-engine'
import { Argv, Arguments } from 'yargs'

interface IOptions extends IBeeEngineOptions {
  to?: string
}

export const command = 'run [to]'

export const desc = 'Run pending seeds'

export const builder = function (yargs: Argv) {
  return yargs
    .options({
      to: {
        type: 'string',
        desc: 'Target seed name',
        default: undefined,
      },
    })
    .example('bee seed run', 'Run all pending seeds')
    .example(
      'bee seed run --to XXX-create-users',
      'Run the seeds from the current state to the passed seed name'
    )
}

export const handler = async function (argv: Arguments<IOptions>) {
  const sequelize = argv.sequelize
  const umzug = argv.umzug || {
    migrations: {
      path: path.resolve(process.cwd(), 'seeds'),
    },
    storageOptions: {
      path: path.resolve(process.cwd(), 'bee_seeds.json'),
    },
  }

  const beeEngine = bee.createClient({
    sequelize,
    umzug,
  })

  const options = argv.to ? { to: argv.to } : undefined

  await beeEngine.run(options)
}
