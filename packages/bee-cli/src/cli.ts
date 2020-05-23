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
        storage: path.resolve(process.cwd(), 'db.sqlite'),
        migrationsPath: path.resolve(process.cwd(), 'migrations'),
        migrationStorage: 'json',
        migrationStorageOptions: {
          path: path.resolve(process.cwd(), 'bee_migrations.json'),
        },
        seedsPath: path.resolve(process.cwd(), 'seeds'),
        seedStorage: 'json',
        seedStorageOptions: {
          path: path.resolve(process.cwd(), 'bee_migrations.json'),
        },
      },
    }
  }

  const file = fs.readFileSync(configPath!).toString('utf8')

  return JSON.parse(file)
}

main()
