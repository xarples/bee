import { Sequelize, Options } from 'sequelize'

let sequelize: Sequelize

export default function setupSequelize(options: Options) {
  if (!sequelize) {
    sequelize = new Sequelize(options)
  }

  return sequelize
}
