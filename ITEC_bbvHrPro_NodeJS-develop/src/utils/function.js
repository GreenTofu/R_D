import { Op, Sequelize } from 'sequelize';

const randomElementsInArr = (arr, elements = 1) => {
  // shuffle array, then choose n elements
  const shuffleArr = arr.sort(() => Math.random() - 0.5);

  return shuffleArr.slice(0, elements);
};

const searchByFullName = (search = '', table = '') => {
  const query = Sequelize.where(
    Sequelize.fn(
      'concat',
      Sequelize.col(`${table}.firstName`),
      ' ',
      Sequelize.col(`${table}.lastName`),
    ),
    {
      [Op.iLike]: search,
    },
  );

  return query;
};

const getPercentage = (count, total) => (count / total) * 100;

export { randomElementsInArr, searchByFullName, getPercentage };
