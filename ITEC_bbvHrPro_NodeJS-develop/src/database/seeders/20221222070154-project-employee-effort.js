const { User, Project, ProjectMember } = require('models');
const { randomElementsInArr } = require('utils/function');

module.exports = {
  async up() {
    const users = await User.findAll({
      attributes: ['id'],
    });

    const projects = await Project.findAll({});

    const promises = [];

    projects.forEach((project) => {
      promises.push(project.addMember(project.manager));

      let empId;
      do {
        empId = randomElementsInArr(users)[0].id;
      } while (empId === project.manager);

      promises.push(project.addMember(empId));
    });

    await Promise.all(promises);

    await ProjectMember.update(
      { effort: 50 },
      {
        where: {
          effort: null,
        },
      },
    );
  },
  async down() {
    await ProjectMember.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
