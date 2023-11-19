module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'PerformanceReviewFinalizeCriteria',
      {
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
        point: {
          type: Sequelize.FLOAT,
        },
        performanceReviewId: {
          type: Sequelize.INTEGER,
          references: { model: 'PerformanceReviews', key: 'id' },
          onUpdate: 'cascade',
          onDelete: 'cascade',
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
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('PerformanceReviewFinalizeCriteria');
  },
};
