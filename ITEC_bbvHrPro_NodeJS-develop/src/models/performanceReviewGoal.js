export default (sequelize, DataTypes) => {
  const PerformanceReviewGoal = sequelize.define(
    'PerformanceReviewGoal',
    {
      point: {
        type: DataTypes.FLOAT,
      },
      comment: {
        type: DataTypes.TEXT,
      },
    },
  );

  PerformanceReviewGoal.associate = function associate(models) {
    PerformanceReviewGoal.belongsTo(models.User, {
      as: 'user',
      foreignKey: { name: 'userId' },
    });

    PerformanceReviewGoal.belongsTo(models.Goal, {
      as: 'goal',
      foreignKey: { name: 'goalId' },
    });

    PerformanceReviewGoal.belongsTo(models.PerformanceReview, {
      as: 'review',
      foreignKey: { name: 'performanceReviewId' },
    });

    PerformanceReviewGoal.belongsTo(models.PerformanceReviewStatus, {
      as: 'status',
      foreignKey: { name: 'statusId' },
    });
  };

  return PerformanceReviewGoal;
};
