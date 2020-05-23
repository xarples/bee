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
  const engine = bee.createEngine(argv.bee)
  const filters: IFilter[] = [
    { name: 'pending', active: argv.pending },
    { name: 'executed', active: argv.executed },
  ]

  const defaultFilter = { name: undefined, active: true }
  const filter = filters.find((filter) => filter.active) || defaultFilter
  const seeds = await engine.seeds.list(filter.name)

  console.log(seeds)
}
