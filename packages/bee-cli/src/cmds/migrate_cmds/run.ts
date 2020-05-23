import bee, { IEngineOptions } from '@xarples/bee-engine'
import { Argv, Arguments } from 'yargs'

interface IOptions {
  to?: string
  bee: IEngineOptions
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
  const engine = bee.createEngine(argv.bee)
  const options = argv.to ? { to: argv.to } : undefined

  await engine.migrations.run(options)
}
