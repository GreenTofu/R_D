import { Criteria, CriteriaPart } from 'models';

const getCriteriaList = async () => {
  const criteria = await CriteriaPart.findAll({
    include: [
      {
        model: Criteria,
        as: 'criteria',
      },
    ],
  });
  return criteria;
};

const CriteriaService = { getCriteriaList };

export default CriteriaService;
