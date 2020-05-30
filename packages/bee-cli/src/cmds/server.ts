// import path from 'path'
import { Argv, Arguments } from 'yargs'
import { IEngineOptions } from '@xarples/bee-engine'
import bee from '@xarples/bee-server'

interface IOptions {
  bee: IEngineOptions
  port?: number
}

export const command = 'server'

export const desc = 'Start the rest api server'

export const builder = function (yargs: Argv) {
  return yargs
    .options({
      port: {
        type: 'number',
        desc: 'List pending seeds',
        default: 4000,
      },
    })
    .example('bee server', 'Start the graphql server')
    .example('bee server --port 3000', 'Start the graphql server on port 3000')
}

export const handler = function (argv: Arguments<IOptions>) {
  const server = bee.createServer(argv.bee)

  server.listen(argv.port, () => {
    console.log('Server listening on http://localhost:3000')
  })
}
