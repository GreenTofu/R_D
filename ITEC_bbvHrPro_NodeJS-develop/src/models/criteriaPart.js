export default (sequelize, DataTypes) => {
  const CriteriaPart = sequelize.define(
    'CriteriaPart',
    {
      partName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      partNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    { timestamps: false },
  );

  CriteriaPart.associate = function associate(models) {
    CriteriaPart.hasMany(models.Criteria, {
      as: 'criteria',
      foreignKey: { name: 'partId' },
    });
    CriteriaPart.hasMany(models.Feedback, {
      as: 'feedback',
      foreignKey: { name: 'partId' },
    });
  };
  return CriteriaPart;
};
