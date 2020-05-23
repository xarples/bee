import path from 'path'
import { DataTypes } from 'sequelize'
import {
  Storage,
  JSONStorageOptions,
  SequelizeStorageOptions,
  MongoDBStorageOptions,
} from 'umzug'

import setupSequelize from '../sequelize'
import setupUmzug from '../umzug'
import run from './run'
import revert from './revert'
import list from './list'
import generate from './generate'

export interface IEngineOptions {
  database?: string
  username?: string
  password?: string
  dialect?: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | undefined
  host?: string
  storage?: string
  migrationStorage?: 'json' | 'sequelize' | 'mongodb' | Storage | undefined
  migrationsPath?: string
  migrationStorageOptions?:
    | Object
    | JSONStorageOptions
    | SequelizeStorageOptions
    | MongoDBStorageOptions
    | undefined
  seedsPath?: string
  seedStorage?: 'json' | 'sequelize' | 'mongodb' | Storage | undefined
  seedStorageOptions?:
    | Object
    | JSONStorageOptions
    | SequelizeStorageOptions
    | MongoDBStorageOptions
    | undefined
}

export default function createEngine(options: IEngineOptions) {
  const sequelize = setupSequelize({
    database: options.database,
    username: options.username,
    password: options.password,
    dialect: options.dialect,
    host: options.host,
    storage: options.storage,
  })

  const migrationUmzug = setupUmzug({
    migrations: {
      params: [sequelize.getQueryInterface(), DataTypes],
      path: options.migrationsPath || path.resolve(process.cwd(), 'migrations'),
    },
    storage: options.migrationStorage || 'sequelize',
    storageOptions: options.migrationStorageOptions || {
      sequelize,
      tableName: 'bee_migrations',
    },
  })

  const seedUmzug = setupUmzug({
    migrations: {
      params: [sequelize.getQueryInterface(), DataTypes],
      path: options.seedsPath || path.resolve(process.cwd(), 'seeds'),
    },
    storage: options.seedStorage || 'sequelize',
    storageOptions: options.seedStorageOptions || {
      sequelize,
      tableName: 'bee_seeds',
    },
  })

  return {
    options,
    generate,
    migrations: {
      run: run(migrationUmzug),
      revert: revert(migrationUmzug),
      list: list(migrationUmzug),
    },
    seeds: {
      run: run(seedUmzug),
      revert: revert(seedUmzug),
      list: list(seedUmzug),
    },
  }
}
