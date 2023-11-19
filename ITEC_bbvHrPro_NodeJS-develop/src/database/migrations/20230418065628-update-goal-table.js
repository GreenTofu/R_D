module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Goals', 'finalPoint', {
      type: Sequelize.FLOAT,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Goals', 'finalPoint');
  },
};
