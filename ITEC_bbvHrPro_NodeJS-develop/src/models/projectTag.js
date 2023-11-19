export default (sequelize, DataTypes) => {
  const ProjectTag = sequelize.define(
    'ProjectTag',
    {},
    { timestamps: false },
  );
  return ProjectTag;
};
