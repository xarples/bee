import path from 'path'
import bee, { IBeeEngineOptions } from '@xarples/bee-engine'
import { Argv, Arguments } from 'yargs'

interface IOptions extends IBeeEngineOptions {
  pending?: boolean
  executed?: boolean
}

export const command = 'status [pending] [executed]'

export const desc = 'List the status of all seeds'

export const builder = function (yargs: Argv) {
  return yargs
    .options({
      pending: {
        type: 'boolean',
        desc: 'List pending seeds',
        default: undefined,
      },
      executed: {
        type: 'boolean',
        desc: 'List executed seeds',
        default: undefined,
      },
    })
    .example('bee seed status', 'List all seeds')
    .example('bee seed status --pending', 'List pending seeds')
    .example('bee seed status --executed', 'List executed seeds')
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

  if (argv.pending) {
    const seeds = await beeEngine.listPending()
    console.log(seeds)
  } else if (argv.executed) {
    const seeds = await beeEngine.listExecuted()
    console.log(seeds)
  } else {
    const seeds = await beeEngine.listAll()
    console.log(seeds)
  }
}
