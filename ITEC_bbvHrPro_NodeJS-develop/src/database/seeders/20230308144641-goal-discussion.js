const { GoalDiscussion } = require('models');
const GoalServices = require('services/goal').default;

module.exports = {
  async up() {
    const allGoal = await GoalServices.getAllGoal();

    const promises = [];
    allGoal.forEach((goal) => {
      promises.push(
        goal.createDiscussion({
          message: 'Please review the goal for me!',
          userId: goal.userId,
        }),
      );

      if (goal.user.directManager?.id) {
        promises.push(
          goal.createDiscussion({
            message: 'Waiting me a little time',
            userId: goal.user.directManager?.id,
          }),
        );
      }
    });
    await Promise.all(promises);
  },

  async down() {
    await GoalDiscussion.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
