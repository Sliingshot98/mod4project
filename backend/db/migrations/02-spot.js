let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      address: {
        type: Sequelize.VARCHAR[50],
        allowNull: false,
        unique: true
      },
      city: {
        type: Sequelize.VARCHAR[50],
        allowNull: false,
        unique: false
      },
      state: {
        type: Sequelize.VARCHAR[14],
        allowNull: false,
        unique: true,
      },
      country: {
        type: Sequelize.VARCHAR[50],
        allowNull: false,
        unique: false
      },
      lat: {
        type: Sequelize.Decimal[9,6],
        allowNull: false,
        unique: true
      },
      lng: {
        type: Sequelize.Decimal[9,6],
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.Decimal[9,6],
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.VARCHAR["204"],
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL[7,2], 
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.dropTable(options);
  }
};