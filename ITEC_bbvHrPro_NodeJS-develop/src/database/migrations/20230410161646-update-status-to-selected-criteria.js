module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'PerformanceReviewCriteria',
      'statusId',
      {
        type: Sequelize.INTEGER,
        references: { model: 'PerformanceReviewStatus', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'SET NULL',
      },
    );

    await queryInterface.addColumn(
      'PerformanceReviewGoals',
      'statusId',
      {
        type: Sequelize.INTEGER,
        references: { model: 'PerformanceReviewStatus', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'SET NULL',
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      'PerformanceReviewCriteria',
      'statusId',
    );
    await queryInterface.removeColumn(
      'PerformanceReviewGoals',
      'statusId',
    );
  },
};
