export default (sequelize, DataTypes) => {
  const ProjectStatus = sequelize.define(
    'ProjectStatus',
    {
      statusName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false, freezeTableName: true },
  );

  ProjectStatus.associate = function associate(models) {
    ProjectStatus.hasMany(models.Project, {
      as: 'status',
      foreignKey: { name: 'status' },
    });
  };

  return ProjectStatus;
};
