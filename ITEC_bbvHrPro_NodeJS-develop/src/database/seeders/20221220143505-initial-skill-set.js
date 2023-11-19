module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Tags', [
      {
        name: 'Angular',
        description:
          'Angular developers are responsible for developing and designing user interfaces using the AngularJS framework.',
      },
      {
        name: '.NET Core',
        description:
          '.NET Core developers are responsible for developing and designing backend logic using the framework',
      },
      {
        name: 'Visily',
        description:
          'Visily designers have knowledge of design principles combined with a mastery of design software.',
      },
      {
        name: 'Business Analysis',
        description:
          'For who proficient analysis requirements for clients',
      },
      {
        name: 'SQL',
        description:
          'SQL developers are responsible for all aspects of designing, creating and maintaining databases',
      },
      {
        name: 'Docker',
        description:
          'A highly skilled individual who can efficiently design containerization technologies and can also build scalable complex applications',
      },
      {
        name: 'Pyhton',
        description:
          'Writing and testing code, debugging programs and integrating applications with third-party web services.',
      },
      {
        name: 'Typography',
        description:
          'Design or style type for online and print publications',
      },
      {
        name: 'Figma',
        description:
          'Have knowledge of design principles combined with a mastery of design software.',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      'Tags',
      {
        name: ['Angular', 'Business Analysis', 'Visily', '.NET Core'],
      },
      { truncate: true, cascade: true, restartIdentity: true },
    );
  },
};
