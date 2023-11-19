export default (sequelize, DataTypes) => {
  const PerformanceReviewCriteria = sequelize.define(
    'PerformanceReviewCriteria',
    {
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      point: {
        type: DataTypes.FLOAT,
      },
      comment: {
        type: DataTypes.TEXT,
      },
    },
  );
  PerformanceReviewCriteria.associate = function associate(models) {
    PerformanceReviewCriteria.belongsTo(models.User, {
      as: 'user',
      foreignKey: { name: 'userId' },
    });

    PerformanceReviewCriteria.belongsTo(models.Criteria, {
      as: 'baseCriteria',
      foreignKey: { name: 'criteriaId' },
    });

    PerformanceReviewCriteria.belongsTo(models.PerformanceReview, {
      as: 'review',
      foreignKey: { name: 'performanceReviewId' },
    });
    PerformanceReviewCriteria.belongsTo(
      models.PerformanceReviewStatus,
      {
        as: 'status',
        foreignKey: { name: 'statusId' },
      },
    );
  };
  return PerformanceReviewCriteria;
};
