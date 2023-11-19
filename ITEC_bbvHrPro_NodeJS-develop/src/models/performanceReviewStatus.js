export default (sequelize, DataTypes) => {
  const PerformanceReviewStatus = sequelize.define(
    'PerformanceReviewStatus',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false, freezeTableName: true },
  );

  PerformanceReviewStatus.associate = function associate(models) {
    PerformanceReviewStatus.hasMany(models.PerformanceReview, {
      as: 'performanceReview',
      foreignKey: { name: 'statusId' },
    });
    PerformanceReviewStatus.hasMany(
      models.PerformanceReviewCriteria,
      {
        as: 'criteriaReview',
        foreignKey: { name: 'statusId' },
      },
    );
    PerformanceReviewStatus.hasMany(models.PerformanceReviewGoal, {
      as: 'goalReview',
      foreignKey: { name: 'statusId' },
    });
    PerformanceReviewStatus.hasMany(models.PerformanceReviewFeedback, {
      as: 'feedbackReview',
      foreignKey: { name: 'statusId' },
    });
  };
  return PerformanceReviewStatus;
};
