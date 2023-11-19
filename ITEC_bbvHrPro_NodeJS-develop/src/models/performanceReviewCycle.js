export default (sequelize, DataTypes) => {
  const PerformanceReviewCycle = sequelize.define(
    'PerformanceReviewCycle',
    {
      startDate: {
        type: DataTypes.DATEONLY,
      },
      endDate: {
        type: DataTypes.DATEONLY,
      },
      empDueDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      evalDueDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
  );

  PerformanceReviewCycle.associate = function associate(models) {
    PerformanceReviewCycle.hasMany(models.PerformanceReview, {
      as: 'performanceReview',
      foreignKey: { name: 'cycleId' },
    });
    PerformanceReviewCycle.belongsTo(models.User, {
      as: 'creator',
      foreignKey: { name: 'creatorId' },
    });
  };
  return PerformanceReviewCycle;
};
