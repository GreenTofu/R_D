const { User, Tag } = require('models');

module.exports = {
  async up() {
    const developers = await User.findAll({
      where: {
        position: 'Software Engineer',
        role: 'Candidate',
      },
    });

    const addTags = [];

    const developerSkills = await Tag.findAll({
      where: {
        name: ['Angular', '.NET Core', 'Python', 'SQL', 'Docker'],
      },
    });

    developers.forEach((developer) => {
      addTags.push(developer.addTags(developerSkills));
    });

    const designers = await User.findAll({
      where: {
        position: 'Designer',
        role: 'Candidate',
      },
    });

    const designerSkills = await Tag.findAll({
      where: { name: ['Visily', 'Typography', 'Figma'] },
    });

    designers.forEach((designer) => {
      addTags.push(designer.addTags(designerSkills));
    });

    return Promise.all(addTags);
  },

  async down(queryInterface) {
    const users = await User.findAll({
      attributes: ['id'],
      where: {
        email: [
          'jn1@gmail.com',
          'emma@gmail.com',
          'chris@gmail.com',
          'lyly1@gmail.com',
          'harper@gmail.com',
          'katy@gmail.com',
          'jm1@gmail.com',
          'bendy1@gmail.com',
          'andy@gmail.com',
          'ken@gmail.com',
          'taylor@gmail.com',
          'mandy@gmail.com',
          'sandy@gmail.com',
          'lana@gmail.com',
          'dan@gmail.com',
          'will@gmail.com',
        ],
      },
    });

    const ids = users.map((user) => user.id);

    await queryInterface.bulkDelete('User_Skill', {
      userID: ids,
    });
  },
};
