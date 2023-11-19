module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('ProjectMembers', 'startDate', {
        type: Sequelize.DATEONLY,
      }),
      queryInterface.addColumn('ProjectMembers', 'endDate', {
        type: Sequelize.DATEONLY,
      }),
      queryInterface.addColumn('ProjectMembers', 'estimateTime', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('ProjectMembers', 'actualTime', {
        type: Sequelize.INTEGER,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('ProjectMembers', 'startDate'),
      queryInterface.removeColumn('ProjectMembers', 'endDate'),
      queryInterface.removeColumn('ProjectMembers', 'estimateTime'),
      queryInterface.removeColumn('ProjectMembers', 'actualTime'),
    ]);
  },
};
