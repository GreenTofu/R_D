const { User, Tag } = require('models');

module.exports = {
  async up() {
    const developers = await User.findAll({
      where: { position: 'Software Engineer' },
    });

    const developerSkills = await Tag.findAll({
      where: { name: ['Angular', '.NET Core'] },
    });

    developers.forEach((developer) => {
      developer.addTags(developerSkills);
    });

    const managers = await User.findAll({
      where: { role: 'Manager' },
    });

    const managerSkills = await Tag.findAll({
      where: { name: 'Business Analysis' },
    });

    managers.forEach((manager) => {
      manager.addTags(managerSkills);
    });

    const designers = await User.findAll({
      where: { position: 'Designer' },
    });

    const designerSkills = await Tag.findAll({
      where: { name: 'Visily' },
    });

    const addTags = [];
    designers.forEach((designer) => {
      addTags.push(designer.addTags(designerSkills));
    });

    await Promise.all(addTags);
  },

  async down(queryInterface) {
    const users = await User.findAll({
      attributes: ['id'],
      where: {
        email: [
          'jd@gmail.com',
          'jacky@gmail.com',
          'michelle@gmail.com',
          'lyly@gmail.com',
          'micheal@gmail.com',
          'kate@gmail.com',
          'jm@gmail.com',
          'bily@gmail.com',
          'john@gmail.com',
          'kelly@gmail.com',
          'tom@gmail.com',
          'marble@gmail.com',
          'smith@gmail.com',
          'lady@gmail.com',
          'daisy@gmail.com',
          'william@gmail.com',
        ],
      },
    });

    const ids = users.map((user) => user.id);

    await queryInterface.bulkDelete('User_Skill', {
      userID: ids,
    });
  },
};
