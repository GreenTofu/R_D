module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Skill', {
      userID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      skillID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: 'Tags', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('User_Skill');
  },
};
