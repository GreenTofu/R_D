module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Goals', 'startDate', {
      type: Sequelize.DATEONLY,
    });
    await queryInterface.addColumn('Goals', 'endDate', {
      type: Sequelize.DATEONLY,
    });
  },

  async down(queryInterface) {
    queryInterface.removeColumn('Goals', 'startDate');
    queryInterface.removeColumn('Goals', 'endDate');
  },
};
