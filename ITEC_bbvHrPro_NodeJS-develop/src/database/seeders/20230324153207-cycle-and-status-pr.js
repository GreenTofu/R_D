const {
  PerformanceReviewCycle,
  PerformanceReviewStatus,
  User,
} = require('models');

module.exports = {
  async up() {
    const hrUser = await User.findOne({
      where: { email: 'tom@gmail.com' },
    });

    await PerformanceReviewCycle.bulkCreate([
      {
        startDate: '2022-07-01',
        endDate: '2022-12-30',
        empDueDate: '2022-12-05',
        evalDueDate: '2022-12-15',
        creatorId: hrUser.id,
      },
      {
        startDate: '2023-01-01',
        endDate: '2023-06-30',
        empDueDate: '2022-05-15',
        evalDueDate: '2022-05-30',
        creatorId: hrUser.id,
      },
    ]);
    await PerformanceReviewStatus.bulkCreate([
      { name: 'Evaluating' },
      { name: 'In Finalizing' },
      { name: 'Completed' },
    ]);
  },

  async down() {
    await PerformanceReviewCycle.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await PerformanceReviewStatus.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
