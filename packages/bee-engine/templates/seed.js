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
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('table_name')
  },
})
