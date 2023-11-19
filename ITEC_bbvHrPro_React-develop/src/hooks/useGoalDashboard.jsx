import { clone } from "lodash";
import { useEffect, useState } from "react";

import goalAPI from "api/goalAPI";
import useDebounce from "hooks/useDebounce";
import { DEBOUNCE_DELAY } from "utils/constant";

const useGoalDashboard = ({ filter, search }) => {
  const [goalList, setGoalList] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

  const limit = 10;

  const totalPage = Math.ceil(total / limit) || 1;

  const fetchGoalList = async () => {
    const response = await goalAPI.getManageGoal({
      page: currentPage,
      filter,
      search: search || null,
      limit,
    });

    const { data } = response;

    setGoalList(data.goalList.rows);
    setTotal(data.goalList.count);
  };

  const updateGoal = (id, newGoal) => {
    const newGoalList = clone(goalList);
    const updatedGoalIndex = newGoalList.findIndex(
      (goal) => goal.id === id
    );

    newGoalList[updatedGoalIndex] = newGoal;

    setGoalList(newGoalList);
  };

  useEffect(() => {
    fetchGoalList();
  }, [debouncedSearch, filter, currentPage]);

  return {
    goalList,
    total,
    totalPage,
    currentPage,
    setCurrentPage,
    updateGoal,
  };
};

export default useGoalDashboard;
