import { useEffect, useState } from "react";

import goalAPI from "api/goalAPI";

const useGoalDetails = ({ goalId }) => {
  const [goal, setGoal] = useState({});

  const fetchGoalDetails = async () => {
    const { data } = await goalAPI.getGoalDetails(goalId);

    setGoal(data.goal);
  };

  useEffect(() => {
    fetchGoalDetails();
  }, []);

  return {
    goal,
    updateGoal: setGoal,
  };
};

export default useGoalDetails;
