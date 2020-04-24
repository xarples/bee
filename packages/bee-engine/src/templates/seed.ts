;`import { define } from '../lib'

export default define({
  async up(queryInterface, dataTypes) {
    await queryInterface.createTable('table_name', {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('table_name')
  },
})
`
