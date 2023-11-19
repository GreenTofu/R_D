module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProjectTags', {
      tagId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'Tags', key: 'id' },
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
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('ProjectTags');
  },
};
