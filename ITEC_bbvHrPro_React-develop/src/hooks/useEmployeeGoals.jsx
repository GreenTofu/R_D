import { clone } from "lodash";
import { useEffect, useState } from "react";

import goalAPI from "api/goalAPI";
import useUserStore from "store/userStore";

const useEmployeeGoals = () => {
  const [goalList, setGoalList] = useState([]);
  const user = useUserStore((state) => state.user);

  const fetchGoalList = async () => {
    const response = await goalAPI.getGoalList(user?.id);

    const { data } = response;

    setGoalList(data.goalList);
  };

  const addGoal = (newGoal) => {
    const newGoalList = clone(goalList);
    newGoalList.unshift(newGoal);

    setGoalList(newGoalList);
  };

  const updateGoal = (id, newGoal) => {
    const newGoalList = clone(goalList);
    const updatedGoalIndex = newGoalList.findIndex(
      (goal) => goal.id === id
    );

    newGoalList[updatedGoalIndex] = newGoal;

    setGoalList(newGoalList);
  };

  const deleteGoal = (id) => {
    const newGoalList = clone(goalList);
    const index = newGoalList.findIndex((goal) => goal.id === id);

    if (index === -1) return;

    newGoalList.splice(index, 1);

    setGoalList(newGoalList);
  };

  useEffect(() => {
    fetchGoalList();
  }, []);

  return {
    goalList,
    addGoal,
    updateGoal,
    deleteGoal,
  };
};

export default useEmployeeGoals;
