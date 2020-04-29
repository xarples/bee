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
  storageOptions?:
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

  const umzug = setupUmzug({
    migrations: {
      params: [sequelize.getQueryInterface(), DataTypes],
      path: options.migrationsPath,
    },
    storage: options.migrationStorage || 'sequelize',
    storageOptions: options.storageOptions || {
      sequelize,
      tableName: 'bee_migrations',
    },
  })

  return {
    run: run(umzug),
    revert: revert(umzug),
    list: list(umzug),
    generate,
  }
}
