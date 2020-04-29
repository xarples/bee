import bee, { IEngineOptions } from '@xarples/bee-engine'
import { Argv, Arguments } from 'yargs'

interface IFilter {
  name: 'executed' | 'pending'
  active: boolean | undefined
}

interface IOptions {
  pending?: boolean
  executed?: boolean
  bee: IEngineOptions
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
  const engine = bee.createEngine(argv.bee)

  const filters: IFilter[] = [
    { name: 'pending', active: argv.pending },
    { name: 'executed', active: argv.executed },
  ]

  const defaultFilter = { name: undefined, active: true }
  const filter = filters.find((filter) => filter.active) || defaultFilter
  const migrations = await engine.list(filter.name)

  console.log(migrations)
}
