export default (sequelize, DataTypes) => {
  const Goal = sequelize.define('Goal', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    startDate: {
      type: DataTypes.DATEONLY,
    },
    endDate: {
      type: DataTypes.DATEONLY,
    },
    finalPoint: {
      type: DataTypes.FLOAT,
    },
  });

  Goal.associate = function associate(models) {
    Goal.belongsTo(models.User, {
      as: 'user',
      foreignKey: { name: 'userId' },
    });
    Goal.belongsTo(models.GoalStatus, {
      as: 'status',
      foreignKey: { name: 'statusId' },
    });
    Goal.hasMany(models.GoalDiscussion, {
      as: 'discussion',
      foreignKey: { name: 'goalId' },
    });
    Goal.belongsToMany(models.PerformanceReview, {
      through: models.PerformanceReviewGoal,
      as: 'performanceReview',
      foreignKey: { name: 'goalId' },
    });
  };
  return Goal;
};
