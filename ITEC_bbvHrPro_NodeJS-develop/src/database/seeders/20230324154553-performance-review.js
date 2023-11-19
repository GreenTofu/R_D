const { Op } = require('sequelize');

const {
  PerformanceReviewCycle,
  PerformanceReviewStatus,
  PerformanceReview,
  User,
} = require('models');

module.exports = {
  async up() {
    const cycle = await PerformanceReviewCycle.findOne({
      where: { startDate: '2022-07-01' },
    });

    const reviewStatus = await PerformanceReviewStatus.findOne({
      where: { name: 'Completed' },
      attribute: ['id'],
    });

    const users = await User.findAll({
      where: {
        position: { [Op.not]: 'Human Resources' },
      },
    });

    const promises = [];
    users.forEach((user) => {
      if (
        user?.manager &&
        user?.manager.position !== 'Human Resources'
      ) {
        promises.push(
          PerformanceReview.create({
            evaluatorId: user.manager,
            employeeId: user.id,
            cycleId: cycle.id,
            statusId: reviewStatus.id,
            finalPoint: 4.5,
          }),
        );
      }
    });
    await Promise.all(promises);
  },

  async down() {
    await PerformanceReview.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
