module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PerformanceReviewCycles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      empDueDate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      evalDueDate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
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
    await queryInterface.dropTable('PerformanceReviewCycles');
  },
};
