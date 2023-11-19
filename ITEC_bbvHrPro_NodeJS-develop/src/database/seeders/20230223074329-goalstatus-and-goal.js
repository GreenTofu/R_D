const { Op } = require('sequelize');

const { User, Goal } = require('models');

module.exports = {
  async up(queryInterface) {
    const goalStatus = await queryInterface.bulkInsert(
      'GoalStatus',
      [
        { name: 'Pending Approval' },
        { name: 'Approved' },
        { name: 'Drafting' },
        { name: 'Evaluated' },
      ],
      { returning: true },
    );

    const owner = await User.findAll({
      where: { role: { [Op.not]: 'Candidate' } },
      attributes: ['id'],
    });

    const promises = [];
    owner.forEach((user) => {
      promises.push(
        Goal.create({
          title: 'Improve time management skills.',
          description: 'Need a report for time spending',
          statusId: goalStatus[0].id,
          userId: user.id,
          startDate: '2022-02-15',
          endDate: '2022-02-15',
          createdAt: '2022-02-15',
          updatedAt: '2022-02-15',
        }),
      );
      promises.push(
        Goal.create({
          title: 'Learn a new ORM and apply to demo project',
          description: 'Need a report for time spending',
          statusId: goalStatus[1].id,
          userId: user.id,
          startDate: '2022-02-15',
          endDate: '2022-02-15',
          createdAt: '2022-02-15',
          updatedAt: '2022-02-15',
        }),
      );
      promises.push(
        Goal.create({
          title:
            'Increase responsibilities and duties in the workplace.',
          description: 'Need a report on how it going',
          statusId: goalStatus[2].id,
          startDate: '2022-02-15',
          endDate: '2022-02-15',
          userId: user.id,
          createdAt: '2022-02-15',
          updatedAt: '2022-02-15',
        }),
      );
      promises.push(
        Goal.create({
          title: 'Learn a new language',
          description: 'Learn basic Python',
          statusId: goalStatus[3].id,
          finalPoint: 4.5,
          startDate: '2022-02-15',
          endDate: '2022-02-15',
          userId: user.id,
          createdAt: '2022-02-15',
          updatedAt: '2022-02-15',
        }),
      );
    });
    await Promise.all(promises);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      'GoalStatus',
      {
        name: [
          'Pending Approval',
          'Approved',
          'Drafting',
          'Evaluated',
        ],
      },
      { truncate: true, cascade: true, restartIdentity: true },
    );

    await Goal.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
