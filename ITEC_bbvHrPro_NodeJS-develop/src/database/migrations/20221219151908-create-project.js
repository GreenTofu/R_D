module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'ProjectStatus', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'SET NULL',
      },
      manager: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'SET NULL',
      },
      startDate: {
        type: Sequelize.DATEONLY,
      },
      endDate: {
        type: Sequelize.DATEONLY,
      },
      logo: {
        type: Sequelize.STRING(512),
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
    await queryInterface.dropTable('Projects');
  },
};
