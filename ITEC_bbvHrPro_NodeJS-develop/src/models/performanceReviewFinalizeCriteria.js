export default (sequelize, DataTypes) => {
  const PerformanceReviewFinalizeCriteria = sequelize.define(
    'PerformanceReviewFinalizeCriteria',
    {
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      point: {
        type: DataTypes.FLOAT,
      },
    },
  );
  PerformanceReviewFinalizeCriteria.associate = function associate(
    models,
  ) {
    PerformanceReviewFinalizeCriteria.belongsTo(models.Criteria, {
      as: 'baseCriteria',
      foreignKey: { name: 'criteriaId' },
    });

    PerformanceReviewFinalizeCriteria.belongsTo(
      models.PerformanceReview,
      {
        as: 'review',
        foreignKey: { name: 'performanceReviewId' },
      },
    );
  };
  return PerformanceReviewFinalizeCriteria;
};
