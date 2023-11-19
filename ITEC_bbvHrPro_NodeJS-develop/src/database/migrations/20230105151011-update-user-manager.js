module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'manager', {
      type: 'INTEGER USING CAST("manager" as INTEGER)',
    });

    await queryInterface.addConstraint('Users', {
      fields: ['manager'],
      type: 'foreign key',
      name: 'Users_manager_fkey',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Users',
      'Users_manager_fkey',
    );

    await queryInterface.changeColumn('Users', 'manager', {
      type: Sequelize.STRING,
    });
  },
};
