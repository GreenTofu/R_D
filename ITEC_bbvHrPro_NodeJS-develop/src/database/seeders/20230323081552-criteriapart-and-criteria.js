const { Criteria } = require('models');

module.exports = {
  async up(queryInterface) {
    const criteriaPart = await queryInterface.bulkInsert(
      'CriteriaParts',
      [
        {
          partName: 'Performance',
          partNumber: 1,
        },
        {
          partName: 'Soft Skills',
          partNumber: 2,
        },
        {
          partName: 'Individual Development Goals',
          partNumber: 3,
        },
        {
          partName: 'Feedback',
          partNumber: 4,
        },
      ],
      {
        returning: true,
      },
    );
    await queryInterface.bulkInsert('Criteria', [
      {
        name: 'Utilization',
        defaultWeight: 40,
        partId: criteriaPart[0].id,
        description:
          'Utilization = (billable hours + non-billable hours) / expected hours\n(according to possible working time in reviewed period - based on PM report)',
      },
      {
        name: 'Work quality & responsibility',
        defaultWeight: 20,
        partId: criteriaPart[0].id,
        description:
          '- Quality of assigned tasks, for example: the quality of code, estimation, test result, design architecture, etc.\n- Understand roles and responsibilities and pursue them with passion and excellence.',
      },
      {
        name: 'Communication & Collaboration',
        defaultWeight: 5,
        partId: criteriaPart[1].id,
        description:
          '- Express thoughts constructively and respectfully (both verbal and written) in individual and group situations.- Ensure that reports, emails and other business documents are presented clearly, accurately and convincingly.\n- Ability to connect with people, build and maintain a conversation.\n- Understand and respect others.',
      },
      {
        name: 'Problem solving',
        defaultWeight: 5,
        partId: criteriaPart[1].id,
        description:
          "- Ability to identify and analyze problems independently and define when it is necessary to involve others.\n- Be customer-focused, understand their visions and needs, propose the best possible solution to contribute to customers' success",
      },
      {
        name: 'Time management',
        defaultWeight: 5,
        partId: criteriaPart[1].id,
        description:
          'Ability to:\n- Prioritize schedules and deadlines.\n- Complete tasks within given timeframes.',
      },
      {
        name: 'Agile mindset',
        defaultWeight: 5,
        partId: criteriaPart[1].id,
        description:
          '- Open to change, can adapt behavior and work methods in response to new and unexpected situation.\n- Continuous improvement of technical skills and project knowledge.',
      },
      {
        name: 'Goal Scoring',
        defaultWeight: 20,
        partId: criteriaPart[2].id,
        description:
          'Individual development goals defined by employees',
      },
    ]);
    await queryInterface.bulkInsert('Feedbacks', [
      {
        name: 'Good points',
        partId: criteriaPart[3].id,
      },
      {
        name: 'Points to improve',
        partId: criteriaPart[3].id,
      },
      {
        name: 'Training Needs (Tech, soft skills)',
        partId: criteriaPart[3].id,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      'CriteriaParts',
      {
        partNumber: [1, 2, 3, 4],
      },
      { truncate: true, cascade: true, restartIdentity: true },
    );

    await Criteria.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
