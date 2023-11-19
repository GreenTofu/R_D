module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('PerformanceReviewGoals', 'point', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn('PerformanceReviewGoals', 'comment', {
        type: Sequelize.TEXT,
      }),
    ]);
  },

  async down(queryInterface) {
    await Promise.all([
      queryInterface.removeColumn('PerformanceReviewGoals', 'point'),
      queryInterface.removeColumn(
        'PerformanceReviewGoals',
        'comment',
      ),
    ]);
  },
};
