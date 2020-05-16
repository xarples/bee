import path from 'path'
import { Argv, Arguments } from 'yargs'
import { IEngineOptions } from '@xarples/bee-engine'
import execa from 'execa'

interface IOptions {
  bee: IEngineOptions
}

export const command = 'admin'

export const desc = 'Start the rest api server'

export const builder = function (yargs: Argv) {
  return yargs
    .options({
      host: {
        type: 'string',
        desc: 'List pending seeds',
        default: 'localhost',
      },
      port: {
        type: 'number',
        desc: 'List pending seeds',
        default: 3000,
      },
    })
    .example('bee server', 'Start the rest api server')
    .example('bee server --port 3000', 'Start the rest api server')
    .example('bee server --host localhost', 'Start the rest api server')
}

export const handler = async function (_: Arguments<IOptions>) {
  const url = path.resolve(
    __dirname,
    '..',
    '..',
    'node_modules',
    '@xarples',
    'bee-admin',
    'dist',
    'server',
    'index.js'
  )

  const execPath = path.resolve(
    __dirname,
    '..',
    '..',
    'node_modules',
    '@xarples',
    'bee-admin'
  )

  await execa.node(url, undefined, { execPath })
}
