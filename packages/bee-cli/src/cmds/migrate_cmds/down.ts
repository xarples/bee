import bee, { IEngineOptions } from '@xarples/bee-engine'
import { Argv, Arguments } from 'yargs'

interface IOptions {
  to?: string
  bee: IEngineOptions
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
  const engine = bee.createEngine(argv.bee)
  const options = argv.to ? { to: argv.to } : undefined

  await engine.migrations.revert(options)
}
