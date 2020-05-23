import bee, { IEngineOptions } from '@xarples/bee-engine'
import { Argv, Arguments } from 'yargs'

interface IOptions {
  to?: string
  bee: IEngineOptions
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
  const engine = bee.createEngine(argv.bee)
  const options = argv.to ? { to: argv.to } : undefined

  await engine.seeds.revert(options)
}
