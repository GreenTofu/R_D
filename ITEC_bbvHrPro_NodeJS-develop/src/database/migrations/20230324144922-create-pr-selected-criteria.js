module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PerformanceReviewCriteria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      performanceReviewId: {
        type: Sequelize.INTEGER,
        references: { model: 'PerformanceReviews', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      userId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'SET NULL',
      },
      criteriaId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Criteria', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'RESTRICT',
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
    await queryInterface.dropTable('PerformanceReviewCriteria');
  },
};
