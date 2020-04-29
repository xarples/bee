import { QueryInterface, DataTypes } from 'sequelize'

export interface IDefineOptions {
  up: (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => void
  down: (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => void
}

export default function define(options: IDefineOptions): IDefineOptions {
  return options
}
