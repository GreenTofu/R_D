const {
  PerformanceReview,
  PerformanceReviewCriteria,
  PerformanceReviewStatus,
  PerformanceReviewFinalizeCriteria,
  Criteria,
  Goal,
  GoalStatus,
  PerformanceReviewGoal,
  Feedback,
  PerformanceReviewFeedback,
} = require('models');

module.exports = {
  async up() {
    const completeStatus = await PerformanceReviewStatus.findOne({
      where: { name: 'Completed' },
      attribute: ['id'],
    });

    const performanceReviewList = await PerformanceReview.findAll({
      attribute: ['id'],
    });
    const criteria = await Criteria.findAll({
      attribute: ['id'],
    });

    const feedbacks = await Feedback.findAll({
      attribute: ['id', 'partId'],
    });

    const empIds = performanceReviewList.map((PR) => PR.employeeId);

    const approvedGoal = await Goal.findAll({
      where: { userId: empIds },
      include: [
        {
          model: GoalStatus,
          attributes: ['id', 'name'],
          as: 'status',
          where: { name: 'Evaluated' },
        },
      ],
    });

    const promises = [];
    performanceReviewList.forEach((PR) => {
      criteria.forEach((criterion) => {
        promises.push(
          PerformanceReviewCriteria.create({
            performanceReviewId: PR.id,
            userId: PR.evaluatorId,
            criteriaId: criterion.id,
            statusId: completeStatus.id,
            weight: criterion.defaultWeight,
            point: 4.5,
            comment: 'Well Done',
          }),
        );

        promises.push(
          PerformanceReviewFinalizeCriteria.create({
            performanceReviewId: PR.id,
            criteriaId: criterion.id,
            weight: criterion.defaultWeight,
            point: 4.5,
          }),
        );

        promises.push(
          PerformanceReviewCriteria.create({
            performanceReviewId: PR.id,
            userId: PR.employeeId,
            criteriaId: criterion.id,
            statusId: completeStatus.id,
            weight: criterion.defaultWeight,
            point: 4.5,
            comment: 'I think I did well',
          }),
        );
      });
      const empGoal = approvedGoal.filter(
        (goal) => goal.userId === PR.employeeId,
      );
      empGoal.forEach((goal) => {
        promises.push(
          PerformanceReviewGoal.create({
            performanceReviewId: PR.id,
            userId: PR.evaluatorId,
            goalId: goal.id,
            point: 4.5,
            comment: 'Achieve your goal well',
            statusId: completeStatus.id,
          }),
        );
        promises.push(
          PerformanceReviewGoal.create({
            performanceReviewId: PR.id,
            userId: PR.employeeId,
            goalId: goal.id,
            point: 4.5,
            comment: 'Nailed it!',
            statusId: completeStatus.id,
          }),
        );
      });
      feedbacks.forEach((feedback) => {
        promises.push(
          PerformanceReviewFeedback.create({
            performanceReviewId: PR.id,
            userId: PR.evaluatorId,
            feedbackId: feedback.id,
            statusId: completeStatus.id,
            comment: 'You did a great job',
          }),
        );
        promises.push(
          PerformanceReviewFeedback.create({
            performanceReviewId: PR.id,
            userId: PR.employeeId,
            feedbackId: feedback.id,
            statusId: completeStatus.id,
            comment: 'I think I did a great job',
          }),
        );
      });
    });
    await Promise.all(promises);
  },

  async down() {
    await PerformanceReviewCriteria.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await PerformanceReviewFinalizeCriteria.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await PerformanceReviewGoal.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await PerformanceReviewFeedback.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
