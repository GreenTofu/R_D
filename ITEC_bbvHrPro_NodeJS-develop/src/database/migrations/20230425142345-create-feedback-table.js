module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Feedbacks', {
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
      partId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'CriteriaParts', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('Feedbacks');
  },
};
