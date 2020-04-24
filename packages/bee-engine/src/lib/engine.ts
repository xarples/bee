import fs from 'fs'
import path from 'path'

import { Sequelize, DataTypes } from 'sequelize'

import Umzug, {
  Umzug as IUmzug,
  UpToOptions,
  UpDownMigrationsOptions,
} from 'umzug'

import { IBeeEngineOptions } from '../types'

class BeeEngine {
  umzug: IUmzug
  options: IBeeEngineOptions

  constructor(options: IBeeEngineOptions) {
    const sequelize = new Sequelize(options.sequelize)
    const migrations = options.umzug!.migrations || {}
    const storageOptions = options.umzug!.storageOptions || {}

    const umzug = new Umzug({
      migrations: {
        ...migrations,
        params: [sequelize.getQueryInterface(), DataTypes],
        pattern: /^\d+[\w-]+\.(js|ts)$/,
      },
      storage: 'json',
      storageOptions: {
        ...storageOptions,
        sequelize,
      },
    })

    this.umzug = umzug
    this.options = options
  }

  async run(options?: UpToOptions | UpDownMigrationsOptions) {
    const umzug = this.umzug
    const migrations = await umzug.up(options)

    return migrations
  }

  async revert(options?: UpToOptions | UpDownMigrationsOptions) {
    const umzug = this.umzug
    const migrations = await umzug.down(options)

    return migrations
  }

  async listExecuted() {
    const umzug = this.umzug
    const migrations = await umzug.executed()

    return migrations
  }

  async listPending() {
    const umzug = this.umzug
    const migrations = await umzug.pending()

    return migrations
  }

  async listAll() {
    const executed = await this.listExecuted()
    const pending = await this.listPending()

    return {
      executed,
      pending,
    }
  }

  async generateMigration(name: string) {
    const options = this.options
    //@ts-ignore
    const migrationsPath = options.umzug.migrations.path
    const fileName = `${Date.now()}-${name}.js`
    const templatePath = path.resolve(
      __dirname,
      '..',
      'templates',
      'migration.js'
    )
    const destPath: string = migrationsPath
      ? path.resolve(migrationsPath, fileName)
      : path.resolve(process.cwd(), 'migrations', fileName)

    fs.copyFileSync(templatePath, destPath, fs.constants.COPYFILE_EXCL)
  }

  async generateSeed(name: string) {
    const options = this.options
    //@ts-ignore
    const migrationsPath = options.umzug.migrations.path
    const fileName = `${Date.now()}-${name}.js`
    const templatePath = path.resolve(__dirname, '..', 'templates', 'seed.js')
    const destPath = migrationsPath
      ? path.resolve(migrationsPath, fileName)
      : path.resolve(process.cwd(), 'migrations', fileName)

    fs.copyFileSync(templatePath, destPath, fs.constants.COPYFILE_EXCL)
  }
}

export default BeeEngine
