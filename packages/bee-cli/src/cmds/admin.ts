import path from 'path'
import { Argv, Arguments } from 'yargs'
import { IEngineOptions } from '@xarples/bee-engine'
import bee from '@xarples/bee-server'

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
  const execPath = path.resolve(__dirname, '..', '..', '..', 'bee-admin')
  const server = bee.createServer(argv.bee)

  server.listen(4000, async () => {
    console.log('Server listening on http://localhost:3000')

    await execa.command(`npm start -- --port ${argv.port}`, {
      cwd: execPath,
    })
  })
}
