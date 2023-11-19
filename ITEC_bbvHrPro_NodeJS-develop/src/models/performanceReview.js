export default (sequelize, DataTypes) => {
  const PerformanceReview = sequelize.define('PerformanceReview', {
    finalPoint: {
      type: DataTypes.FLOAT,
    },
  });

  PerformanceReview.associate = function associate(models) {
    PerformanceReview.belongsTo(models.User, {
      as: 'evaluator',
      foreignKey: { name: 'evaluatorId' },
    });
    PerformanceReview.belongsTo(models.User, {
      as: 'employee',
      foreignKey: { name: 'employeeId' },
    });
    PerformanceReview.belongsTo(models.PerformanceReviewCycle, {
      as: 'cycle',
      foreignKey: { name: 'cycleId' },
    });
    PerformanceReview.belongsToMany(models.Goal, {
      through: models.PerformanceReviewGoal,
      as: 'goals',
      foreignKey: { name: 'performanceReviewId' },
    });
    PerformanceReview.belongsTo(models.PerformanceReviewStatus, {
      as: 'status',
      foreignKey: { name: 'statusId' },
    });
    PerformanceReview.belongsToMany(models.Criteria, {
      through: models.PerformanceReviewCriteria,
      as: 'criteria',
      foreignKey: { name: 'performanceReviewId' },
    });
    PerformanceReview.belongsToMany(models.Criteria, {
      through: models.PerformanceReviewFinalizeCriteria,
      as: 'finalizeCriteria',
      foreignKey: { name: 'performanceReviewId' },
    });
    PerformanceReview.belongsToMany(models.Feedback, {
      through: models.PerformanceReviewFeedback,
      as: 'feedback',
      foreignKey: { name: 'performanceReviewId' },
    });
  };
  return PerformanceReview;
};
