module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'PerformanceReviewCycles',
      'creatorId',
      {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'SET NULL',
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      'PerformanceReviewCycles',
      'creatorId',
    );
  },
};
