import { QueryInterface, DataTypes } from 'sequelize'

export interface IDefineOptions {
  up: (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => void
  down: (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => void
}

export default function defineUpDown(options: IDefineOptions): IDefineOptions {
  return options
}
