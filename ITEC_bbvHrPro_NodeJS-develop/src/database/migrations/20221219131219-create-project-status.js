module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProjectStatus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      statusName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('ProjectStatus');
  },
};
