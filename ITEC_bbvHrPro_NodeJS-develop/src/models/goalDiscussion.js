export default (sequelize, DataTypes) => {
  const GoalDiscussion = sequelize.define('GoalDiscussion', {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  GoalDiscussion.associate = function associate(models) {
    GoalDiscussion.belongsTo(models.Goal, {
      as: 'goal',
      foreignKey: { name: 'goalId' },
    });
    GoalDiscussion.belongsTo(models.User, {
      as: 'user',
      foreignKey: { name: 'userId' },
    });
  };

  return GoalDiscussion;
};
