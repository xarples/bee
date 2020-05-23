const { defineUpDown } = require('@xarples/bee-engine')

module.exports = defineUpDown({
  async up(queryInterface, dataTypes) {
    await queryInterface.createTable('table_name', {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      created_at: {
        allowNull: false,
        type: dataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: dataTypes.DATE,
      },
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('table_name')
  },
})
