module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('PerformanceReviews', 'finalPoint', {
        type: Sequelize.FLOAT,
      }),
    ]);
  },

  async down(queryInterface) {
    await Promise.all([
      queryInterface.removeColumn('PerformanceReviews', 'finalPoint'),
    ]);
  },
};
