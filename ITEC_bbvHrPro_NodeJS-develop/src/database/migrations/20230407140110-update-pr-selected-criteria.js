module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('PerformanceReviewCriteria', 'point', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn(
        'PerformanceReviewCriteria',
        'comment',
        {
          type: Sequelize.TEXT,
        },
      ),
    ]);
  },

  async down(queryInterface) {
    await Promise.all([
      queryInterface.removeColumn(
        'PerformanceReviewCriteria',
        'point',
      ),
      queryInterface.removeColumn(
        'PerformanceReviewCriteria',
        'comment',
      ),
    ]);
  },
};
