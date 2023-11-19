module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Projects', 'description', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('Projects', 'description');
  },
};
