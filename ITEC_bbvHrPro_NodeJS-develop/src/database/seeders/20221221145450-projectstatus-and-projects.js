const { User, Project } = require('models');
const { randomElementsInArr } = require('utils/function');

module.exports = {
  async up(queryInterface) {
    const projectStatus = await queryInterface.bulkInsert(
      'ProjectStatus',
      [
        {
          statusName: 'Upcoming',
        },
        {
          statusName: 'In progress',
        },
        {
          statusName: 'Complete',
        },
      ],
      { returning: true },
    );

    const manager = await User.findAll({
      where: {
        role: 'Manager',
        position: 'Project Manager',
      },
      attributes: ['id'],
    });

    await queryInterface.bulkInsert('Projects', [
      {
        name: 'Apollo',
        status: projectStatus[2].id,
        manager: randomElementsInArr(manager)[0].id,
        startDate: '2023/01/12',
        endDate: '2023/02/12',
        logo: `${process.env.BACKEND_URL}/images/project1.png`,
        createdAt: '2023/01/12',
        updatedAt: '2023/01/12',
      },
      {
        name: 'Iron',
        status: projectStatus[2].id,
        manager: randomElementsInArr(manager)[0].id,
        startDate: '2023/01/12',
        endDate: '2023/02/14',
        logo: `${process.env.BACKEND_URL}/images/project1.png`,
        createdAt: '2023/01/12',
        updatedAt: '2023/01/12',
      },
      {
        name: 'Hidden Image',
        status: projectStatus[2].id,
        manager: randomElementsInArr(manager)[0].id,
        startDate: '2022/11/12',
        endDate: '2022/12/30',
        logo: `${process.env.BACKEND_URL}/images/project2.png`,
        createdAt: '2022/11/12',
        updatedAt: '2022/11/12',
      },
      {
        name: 'Online Bookstore',
        status: projectStatus[2].id,
        manager: randomElementsInArr(manager)[0].id,
        startDate: '2022/11/12',
        endDate: '2022/12/30',
        logo: `${process.env.BACKEND_URL}/images/project2.png`,
        createdAt: '2022/11/12',
        updatedAt: '2022/11/12',
      },
      {
        name: 'Airflow System',
        status: projectStatus[2].id,
        manager: randomElementsInArr(manager)[0].id,
        startDate: '2022/11/12',
        endDate: '2022/12/02',
        logo: `${process.env.BACKEND_URL}/images/project3.png`,
        createdAt: '2022/11/12',
        updatedAt: '2022/11/12',
      },
      {
        name: 'Performance Review',
        status: projectStatus[2].id,
        manager: randomElementsInArr(manager)[0].id,
        startDate: '2022/11/12',
        endDate: '2022/12/02',
        logo: `${process.env.BACKEND_URL}/images/project3.png`,
        createdAt: '2022/11/12',
        updatedAt: '2022/11/12',
      },
      {
        name: 'Cyclone',
        status: projectStatus[2].id,
        manager: randomElementsInArr(manager)[0].id,
        startDate: '2022/11/12',
        endDate: '2022/12/02',
        logo: `${process.env.BACKEND_URL}/images/project2.png`,
        createdAt: '2022/11/12',
        updatedAt: '2022/11/12',
      },
      {
        name: 'X Mind',
        status: projectStatus[2].id,
        manager: randomElementsInArr(manager)[0].id,
        startDate: '2022/11/12',
        endDate: '2022/12/02',
        logo: `${process.env.BACKEND_URL}/images/project3.png`,
        createdAt: '2022/11/12',
        updatedAt: '2022/11/12',
      },
      {
        name: 'Mindset',
        status: projectStatus[2].id,
        manager: randomElementsInArr(manager)[0].id,
        startDate: '2022/11/12',
        endDate: '2022/12/02',
        logo: `${process.env.BACKEND_URL}/images/project1.png`,
        createdAt: '2022/11/12',
        updatedAt: '2022/11/12',
      },
      {
        name: 'Indigo ',
        status: projectStatus[1].id,
        manager: randomElementsInArr(manager)[0].id,
        startDate: '2022/11/12',
        endDate: '2022/12/02',
        logo: `${process.env.BACKEND_URL}/images/project3.png`,
        createdAt: '2022/11/12',
        updatedAt: '2022/11/12',
      },
      {
        name: 'Cyber Logic',
        status: projectStatus[1].id,
        manager: randomElementsInArr(manager)[0].id,
        startDate: '2022/11/12',
        endDate: '2022/12/02',
        logo: `${process.env.BACKEND_URL}/images/project1.png`,
        createdAt: '2022/11/12',
        updatedAt: '2022/11/12',
      },
      {
        name: 'Life Of Glass',
        status: projectStatus[1].id,
        manager: randomElementsInArr(manager)[0].id,
        startDate: '2022/11/12',
        endDate: '2022/12/02',
        logo: `${process.env.BACKEND_URL}/images/project2.png`,
        createdAt: '2022/11/12',
        updatedAt: '2022/11/12',
      },
      {
        name: 'Project X',
        status: projectStatus[1].id,
        manager: randomElementsInArr(manager)[0].id,
        startDate: '2022/11/12',
        endDate: '2022/11/15',
        logo: `${process.env.BACKEND_URL}/images/project3.png`,
        createdAt: '2022/11/12',
        updatedAt: '2022/11/12',
      },
      {
        name: 'Einstein',
        status: projectStatus[0].id,
        manager: randomElementsInArr(manager)[0].id,
        startDate: '2022/11/12',
        endDate: '2022/11/15',
        logo: `${process.env.BACKEND_URL}/images/project1.png`,
        createdAt: '2022/11/12',
        updatedAt: '2022/11/12',
      },
      {
        name: 'Tesla Vision',
        status: projectStatus[1].id,
        manager: randomElementsInArr(manager)[0].id,
        startDate: '2022/11/12',
        endDate: '2022/11/15',
        logo: `${process.env.BACKEND_URL}/images/project3.png`,
        createdAt: '2022/11/12',
        updatedAt: '2022/11/12',
      },
      {
        name: 'Nitro',
        status: projectStatus[0].id,
        manager: randomElementsInArr(manager)[0].id,
        startDate: '2022/11/12',
        endDate: '2022/11/15',
        logo: `${process.env.BACKEND_URL}/images/project2.png`,
        createdAt: '2022/11/12',
        updatedAt: '2022/11/12',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      'ProjectStatus',
      { statusName: ['Upcoming', 'In progress', 'Complete'] },
      { truncate: true, cascade: true, restartIdentity: true },
    );

    await Project.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
