import path from 'path'
import { Argv, Arguments } from 'yargs'
import { IEngineOptions } from '@xarples/bee-engine'
import execa from 'execa'

interface IOptions {
  bee: IEngineOptions
  port?: number
  host?: string
}

export const command = 'admin'

export const desc = 'Start the rest api server'

export const builder = function (yargs: Argv) {
  return yargs
    .options({
      port: {
        type: 'number',
        desc: 'graphql server port',
        default: 3000,
      },
    })
    .example('bee admin', 'Start the migration ui')
    .example('bee admin --port 4000', 'Start the migration ui on port 4000')
}

export const handler = async function (argv: Arguments<IOptions>) {
  const execPath = path.resolve(
    __dirname,
    '..',
    '..',
    'node_modules',
    '@xarples',
    'bee-admin'
  )

  const { stdout } = await execa.command(`npm run dev -- --port ${argv.port}`, {
    cwd: execPath,
  })

  console.log(stdout)
}
