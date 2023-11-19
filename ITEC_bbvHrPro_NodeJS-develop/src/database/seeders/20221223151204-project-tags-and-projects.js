const { Project } = require('models');
const { randomElementsInArr } = require('utils/function');

module.exports = {
  async up(queryInterface) {
    const tags = await queryInterface.bulkInsert(
      'Tags',
      [
        { name: 'E-commerce' },
        { name: 'Mobile' },
        { name: 'Web' },
        { name: 'React' },
        { name: 'NodeJs' },
      ],
      { returning: true },
    );

    const projects = await Project.findAll({});

    const promises = [];

    projects.forEach((project) => {
      randomElementsInArr(tags, 2).forEach((tag) => {
        promises.push(project.addTag(tag.id));
      });
    });

    await Promise.all(promises);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete(
      'Tags',
      { name: ['E-commerce', 'Mobile', 'Web', 'React', 'NodeJs'] },
      { truncate: true, cascade: true, restartIdentity: true },
    );
  },
};
