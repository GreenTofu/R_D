import { useEffect, useState } from "react";

import performanceAPI from "api/performanceAPI";

const useReviewCycle = ({ id }) => {
  const [reviewCycle, setReviewCycle] = useState();

  const fetchReviewCycle = async () => {
    const { data } = await performanceAPI.getCycleInfo(id);

    setReviewCycle(data.cycle);
  };

  useEffect(() => {
    fetchReviewCycle();
  }, []);

  return { reviewCycle };
};

export default useReviewCycle;
