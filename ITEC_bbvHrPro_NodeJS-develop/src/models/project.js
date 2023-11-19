export default (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
    },
    endDate: {
      type: DataTypes.DATEONLY,
    },
    logo: {
      type: DataTypes.STRING(512),
    },
    description: {
      type: DataTypes.STRING(512),
    },
  });

  Project.associate = function associate(models) {
    Project.belongsToMany(models.User, {
      through: models.ProjectMember,
      as: 'members',
      foreignKey: { name: 'projectId' },
    });

    Project.belongsToMany(models.Tag, {
      through: models.ProjectTag,
      as: 'tags',
      foreignKey: { name: 'projectId' },
    });

    Project.belongsTo(models.User, {
      as: 'projectManager',
      foreignKey: { name: 'manager' },
    });

    Project.belongsTo(models.ProjectStatus, {
      as: 'projectStatus',
      foreignKey: { name: 'status' },
    });
  };
  return Project;
};
