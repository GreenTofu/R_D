import { useEffect, useState } from "react";

import performanceAPI from "api/performanceAPI";

const useCriterias = () => {
  const [criteriaData, setCriteriaData] = useState([]);

  const fetchCriterias = async () => {
    const response = await performanceAPI.getCriterias();

    const { criteriaList } = response.data;

    setCriteriaData(criteriaList);
  };

  useEffect(() => {
    fetchCriterias();
  }, []);

  return {
    criteriaData,
  };
};

export default useCriterias;
