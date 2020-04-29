#!/usr/bin/env node

import path from 'path'
import fs from 'fs'
import * as yargs from 'yargs'
import findUp from 'find-up'
import { IEngineOptions } from '@xarples/bee-engine'

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

function getConfig(): { bee: IEngineOptions } {
  const configPath = findUp.sync(['.beerc', '.beerc.json', '.beerc.js'])

  if (!configPath) {
    return {
      bee: {
        database: undefined,
        username: undefined,
        password: undefined,
        host: 'localhost',
        dialect: 'sqlite',
        migrationStorage: 'json',
        migrationsPath: path.resolve(process.cwd(), 'migrations'),
        storage: path.resolve(process.cwd(), 'db.sqlite'),
        storageOptions: {
          path: path.resolve(process.cwd(), 'bee_migrations.json'),
        },
      },
    }
  }

  const file = fs.readFileSync(configPath!).toString('utf8')

  return JSON.parse(file)
}

main()
