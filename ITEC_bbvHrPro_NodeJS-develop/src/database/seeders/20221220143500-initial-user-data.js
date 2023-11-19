const { User } = require('models');
const { randomElementsInArr } = require('utils/function');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'manager@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'Admin',
        lastName: 'Manager',
        phone: '0987654321',
        role: 'Manager',
        position: 'Service Unit Manager',
        manager: null,
        startingDate: '2017/10/09',
        avatar: `${process.env.BACKEND_URL}/images/avatar1.png`,
      },
      {
        email: 'employee@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'Normal',
        lastName: 'User',
        phone: '0987654321',
        role: 'Employee',
        position: 'Software Engineer',
        manager: null,
        startingDate: '2018/02/23',
        avatar: `${process.env.BACKEND_URL}/images/avatar2.png`,
      },
      {
        email: 'jd@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'Jayden',
        lastName: 'Kor',
        phone: '052619569',
        role: 'Manager',
        position: 'Project Manager',
        manager: null,
        startingDate: '2017/10/09',
        avatar: `${process.env.BACKEND_URL}/images/avatar1.png`,
      },
      {
        email: 'jacky@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'Jacky',
        lastName: 'Kor',
        phone: '052619589',
        role: 'Employee',
        position: 'Software Engineer',
        manager: null,
        startingDate: '2018/02/23',
        avatar: `${process.env.BACKEND_URL}/images/avatar2.png`,
      },
      {
        email: 'michelle@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'Michelle',
        lastName: 'Smith',
        phone: '055919569',
        role: 'Manager',
        position: 'Project Manager',
        manager: null,
        startingDate: '2019/09/01',
        avatar: `${process.env.BACKEND_URL}/images/avatar3.png`,
      },
      {
        email: 'lyly@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'Lyly',
        lastName: 'Blanchett',
        phone: '052619123',
        role: 'Employee',
        position: 'Software Engineer',
        startingDate: '2021/03/23',
        manager: null,
        avatar: `${process.env.BACKEND_URL}/images/avatar4.png`,
      },
      {
        email: 'micheal@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'Micheal',
        lastName: 'Harper',
        phone: '052678569',
        role: 'Employee',
        position: 'Designer',
        manager: null,
        startingDate: '2021/11/30',
        avatar: `${process.env.BACKEND_URL}/images/avatar5.png`,
      },
      {
        email: 'kate@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'Kate',
        lastName: 'Smith',
        phone: '052629589',
        role: 'Employee',
        position: 'Software Engineer',
        manager: null,
        startingDate: '2021/05/15',
        avatar: `${process.env.BACKEND_URL}/images/avatar6.png`,
      },
      {
        email: 'jm@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'Jacky',
        lastName: 'Michelle',
        phone: '052619889',
        role: 'Manager',
        position: 'Project Manager',
        manager: null,
        startingDate: '2020/08/24',
        avatar: `${process.env.BACKEND_URL}/images/avatar7.png`,
      },
      {
        email: 'bily@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'Bily',
        lastName: 'Chris',
        phone: '052456123',
        role: 'Employee',
        position: 'Software Engineer',
        manager: null,
        startingDate: '2022/12/01',
        avatar: `${process.env.BACKEND_URL}/images/avatar8.png`,
      },
      {
        email: 'john@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'John',
        lastName: 'Harper',
        phone: '056192569',
        role: 'Employee',
        position: 'Software Engineer',
        manager: null,
        startingDate: '2018/04/23',
        avatar: `${process.env.BACKEND_URL}/images/avatar9.png`,
      },
      {
        email: 'kelly@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'Kelly',
        lastName: 'Wong',
        phone: '019552669',
        role: 'Manager',
        position: 'Service Unit Manager',
        manager: null,
        startingDate: '2018/04/25',
        avatar: `${process.env.BACKEND_URL}/images/avatar10.png`,
      },
      {
        email: 'tom@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'Tom',
        lastName: 'Watson',
        phone: '055692619',
        role: 'Manager',
        position: 'Human Resources',
        manager: null,
        startingDate: '2021/02/28',
        avatar: `${process.env.BACKEND_URL}/images/avatar1.png`,
      },
      {
        email: 'marble@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'Marble',
        lastName: 'Kor',
        phone: '052789456',
        role: 'Manager',
        position: 'Project Manager',
        manager: null,
        startingDate: '2020/05/18',
        avatar: `${process.env.BACKEND_URL}/images/avatar2.png`,
      },
      {
        email: 'smith@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'Smith',
        lastName: 'Smith',
        phone: '123159755',
        role: 'Employee',
        position: 'Software Engineer',
        manager: null,
        startingDate: '2021/06/28',
        avatar: `${process.env.BACKEND_URL}/images/avatar3.png`,
      },
      {
        email: 'lady@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'Lady',
        lastName: 'Wang',
        phone: '015975345',
        role: 'Employee',
        position: 'Designer',
        manager: null,
        startingDate: '2021/01/01',
        avatar: `${process.env.BACKEND_URL}/images/avatar4.png`,
      },
      {
        email: 'daisy@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'Daisy',
        lastName: 'Chris',
        phone: '052619569',
        role: 'Manager',
        position: 'Project Manager',
        manager: null,
        startingDate: '2021/11/30',
        avatar: `${process.env.BACKEND_URL}/images/avatar5.png`,
      },
      {
        email: 'william@gmail.com',
        password:
          '$2b$10$9mzvvzjkvi2XEKNYJFA5DOghEUFcKHg1ujP7tjIZ4lRI6pwbGVJW6',
        firstName: 'William',
        lastName: 'Harper',
        phone: '789456123',
        role: 'Employee',
        position: 'Software Engineer',
        manager: null,
        startingDate: '2022/10/15',
        avatar: `${process.env.BACKEND_URL}/images/avatar6.png`,
      },
    ]);

    const managers = await User.findAll({
      where: { role: 'Manager', position: 'Service Unit Manager' },
      attributes: ['id'],
    });

    const employees = await User.findAll({});

    const promises = [];

    employees.forEach((user) => {
      let managerId;
      do {
        managerId = randomElementsInArr(managers)[0].id;
      } while (managerId === user.id);
      promises.push(user.setDirectManager(managerId));
    });

    await Promise.all(promises);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      'Users',
      {
        email: [
          'manager@gmail.com',
          'user@gmail.com',
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
      { truncate: true, cascade: true, restartIdentity: true },
    );
  },
};
