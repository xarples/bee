import { Argv } from 'yargs'

export const command = 'migrate <command>'

export const desc = 'Manage migrations'

export const builder = function (yargs: Argv) {
  return yargs.commandDir('migrate_cmds', { extensions: ['ts', 'js'] })
}

export const handler = function () {}
