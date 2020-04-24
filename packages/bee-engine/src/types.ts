import {
  QueryInterface,
  DataTypes,
  Options as SequelizeOptions,
} from 'sequelize'

import { UmzugOptions } from 'umzug'

export interface IDefineOptions {
  up: (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => void
  down: (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => void
}

export interface IBeeEngineOptions {
  sequelize?: SequelizeOptions
  umzug?: UmzugOptions
}
