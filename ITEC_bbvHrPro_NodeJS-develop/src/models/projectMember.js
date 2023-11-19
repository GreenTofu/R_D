export default (sequelize, DataTypes) => {
  const ProjectMember = sequelize.define('ProjectMember', {
    effort: {
      type: DataTypes.INTEGER,
    },
    startDate: {
      type: DataTypes.DATEONLY,
    },
    endDate: {
      type: DataTypes.DATEONLY,
    },
    estimateTime: {
      type: DataTypes.INTEGER,
    },
    actualTime: {
      type: DataTypes.INTEGER,
    },
  });

  return ProjectMember;
};
