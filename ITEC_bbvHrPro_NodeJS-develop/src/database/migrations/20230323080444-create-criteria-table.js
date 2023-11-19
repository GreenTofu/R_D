module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Criteria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      defaultWeight: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      partId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'CriteriaParts', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'SET NULL',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Criteria');
  },
};
