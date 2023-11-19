export default (sequelize, DataTypes) => {
  const GoalStatus = sequelize.define(
    'GoalStatus',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false, freezeTableName: true },
  );

  GoalStatus.associate = function associate(models) {
    GoalStatus.hasMany(models.Goal, {
      as: 'goal',
      foreignKey: { name: 'statusId' },
    });
  };
  return GoalStatus;
};
