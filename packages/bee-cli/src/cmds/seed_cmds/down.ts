import path from 'path'
import bee, { IBeeEngineOptions } from '@xarples/bee-engine'
import { Argv, Arguments } from 'yargs'

interface IOptions extends IBeeEngineOptions {
  to?: string
}

export const command = 'down [to]'

export const desc = 'Revert all seeds ran'

export const builder = function (yargs: Argv) {
  return yargs
    .options({
      to: {
        type: 'string',
        desc: 'Target seed name',
        default: undefined,
      },
    })
    .example('bee seed down', 'Revert all pending seeds')
    .example(
      'bee seed down --to XXX-create-users',
      'Revert the seeds from the current state to the passed seed name'
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

  await beeEngine.revert(options)
}
