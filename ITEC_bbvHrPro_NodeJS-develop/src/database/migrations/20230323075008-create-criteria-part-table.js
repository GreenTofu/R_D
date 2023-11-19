module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CriteriaParts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      partName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      partNumber: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('CriteriaParts');
  },
};
