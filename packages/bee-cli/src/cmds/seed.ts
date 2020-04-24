import { Argv } from 'yargs'

export const command = 'seed <command>'

export const desc = 'Manage seeds'

export const builder = function (yargs: Argv) {
  return yargs.commandDir('seed_cmds', { extensions: ['ts', 'js'] })
}

export const handler = function () {}
