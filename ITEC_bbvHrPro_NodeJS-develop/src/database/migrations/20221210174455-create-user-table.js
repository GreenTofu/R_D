module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(15),
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Employee',
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      manager: {
        type: Sequelize.STRING,
      },
      startingDate: {
        type: Sequelize.DATEONLY,
        defaultValue: new Date(),
      },
      avatar: {
        type: Sequelize.STRING(512),
        defaultValue: `${process.env.BACKEND_URL}/images/default.png`,
      },
      password: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
