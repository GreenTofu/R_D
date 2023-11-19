export default (sequelize, DataTypes) => {
  const PerformanceReviewFeedback = sequelize.define(
    'PerformanceReviewFeedback',
    {
      comment: {
        type: DataTypes.TEXT,
      },
    },
  );

  PerformanceReviewFeedback.associate = function associate(models) {
    PerformanceReviewFeedback.belongsTo(models.User, {
      as: 'user',
      foreignKey: { name: 'userId' },
    });
    PerformanceReviewFeedback.belongsTo(models.Feedback, {
      as: 'baseFeedback',
      foreignKey: { name: 'feedbackId' },
    });
    PerformanceReviewFeedback.belongsTo(models.PerformanceReview, {
      as: 'review',
      foreignKey: { name: 'performanceReviewId' },
    });
    PerformanceReviewFeedback.belongsTo(
      models.PerformanceReviewStatus,
      {
        as: 'status',
        foreignKey: { name: 'statusId' },
      },
    );
  };
  return PerformanceReviewFeedback;
};
