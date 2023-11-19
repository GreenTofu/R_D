export default (sequelize, DataTypes) => {
  const Criteria = sequelize.define('Criteria', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    defaultWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Criteria.associate = function associate(models) {
    Criteria.belongsTo(models.CriteriaPart, {
      as: 'part',
      foreignKey: { name: 'partId' },
    });
    Criteria.belongsToMany(models.PerformanceReview, {
      through: models.PerformanceReviewCriteria,
      as: 'performanceReview',
      foreignKey: { name: 'criteriaId' },
    });
    Criteria.belongsToMany(models.PerformanceReview, {
      through: models.PerformanceReviewFinalizeCriteria,
      as: 'performanceReviewFinalize',
      foreignKey: { name: 'criteriaId' },
    });
  };
  return Criteria;
};
