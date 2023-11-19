module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PerformanceReviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      evaluatorId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'SET NULL',
      },
      employeeId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'SET NULL',
      },
      cycleId: {
        type: Sequelize.INTEGER,
        references: { model: 'PerformanceReviewCycles', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: { model: 'PerformanceReviewStatus', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('PerformanceReviews');
  },
};
