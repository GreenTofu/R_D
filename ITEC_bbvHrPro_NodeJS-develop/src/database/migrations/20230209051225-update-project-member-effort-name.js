/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.renameColumn(
      'ProjectMembers',
      'availability',
      'effort',
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.renameColumn(
      'ProjectMembers',
      'effort',
      'availability',
    );
  },
};
