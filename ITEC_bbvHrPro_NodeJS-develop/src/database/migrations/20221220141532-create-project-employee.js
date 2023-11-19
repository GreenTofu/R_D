module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProjectMembers', {
      employeeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      projectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'Projects', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      availability: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('ProjectMembers');
  },
};
