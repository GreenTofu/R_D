export default (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Feedback.associate = function associate(models) {
    Feedback.belongsTo(models.CriteriaPart, {
      as: 'part',
      foreignKey: { name: 'partId' },
    });
    Feedback.belongsToMany(models.PerformanceReview, {
      through: models.PerformanceReviewFeedback,
      as: 'performanceReview',
      foreignKey: { name: 'feedbackId' },
    });
  };
  return Feedback;
};
