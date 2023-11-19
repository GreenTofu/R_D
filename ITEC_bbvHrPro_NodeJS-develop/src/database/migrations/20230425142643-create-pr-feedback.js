module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PerformanceReviewFeedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.TEXT,
      },
      userId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'SET NULL',
      },
      performanceReviewId: {
        type: Sequelize.INTEGER,
        references: { model: 'PerformanceReviews', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      feedbackId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Feedbacks', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'SET NULL',
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: { model: 'PerformanceReviewStatus', key: 'id' },
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
    await queryInterface.dropTable('PerformanceReviewFeedbacks');
  },
};
