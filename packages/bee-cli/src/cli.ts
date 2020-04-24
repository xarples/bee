#!/usr/bin/env node

import path from 'path'
import fs from 'fs'
import * as yargs from 'yargs'
import findUp from 'find-up'
import { IBeeEngineOptions } from '@xarples/bee-engine'

const config = getConfig()

function main() {
  yargs
    .scriptName('bee')
    .usage('Usage: $0 <command> [options]')
    .commandDir('cmds', { extensions: ['ts', 'js'] })
    .demandCommand()
    .config(config)
    .pkgConf('bee')
    .alias('h', 'help')
    .alias('v', 'version')
    .version('0.0.0').argv
}

function getConfig(): IBeeEngineOptions {
  const configPath = findUp.sync(['.beerc', '.beerc.json', '.beerc.js'])

  if (!configPath) {
    return {
      sequelize: {
        dialect: 'sqlite',
        storage: path.resolve(process.cwd(), 'db.sqlite'),
      },
      umzug: undefined,
    }
  }

  const file = fs.readFileSync(configPath!).toString('utf8')

  return JSON.parse(file)
}

main()
