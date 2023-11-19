export default (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false },
  );

  Tag.associate = function associate(models) {
    Tag.belongsToMany(models.User, {
      through: 'User_Skill',
      as: 'users',
      foreignKey: 'skillID',
    });
    Tag.belongsToMany(models.Project, {
      through: models.ProjectTag,
      as: 'projects',
      foreignKey: { name: 'tagId' },
    });
  };
  return Tag;
};
