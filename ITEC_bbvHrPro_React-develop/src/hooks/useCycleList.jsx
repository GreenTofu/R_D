import { clone, concat } from "lodash";
import { useEffect, useState } from "react";

import performanceAPI from "api/performanceAPI";
import useDebounce from "hooks/useDebounce";
import useToastStore from "store/toastStore";
import { DEBOUNCE_DELAY } from "utils/constant";

const useCycleList = () => {
  const [cycleList, setCycleList] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

  const { openSuccessfulToast, openErrorToast } = useToastStore();

  const fetchCycleList = async () => {
    const response = await performanceAPI.getCycleList();
    const { rows } = response.data.cycleList;

    setCycleList(rows);
  };

  const onCreate = async (newCycle) => {
    const response = await performanceAPI.createCycle(newCycle);

    const { cycle } = response.data;

    const newCycleList = concat(cycle, cycleList);

    setCycleList(newCycleList);
  };

  const onEdit = async (id, updatedCycle) => {
    try {
      const response = await performanceAPI.updateCycleInfo(
        id,
        updatedCycle
      );

      const { cycle } = response.data;

      const updatedIndex = cycleList.findIndex((item) => {
        return item.id === cycle.id;
      });

      const newCycleList = clone(cycleList);

      newCycleList[updatedIndex] = cycle;

      setCycleList(newCycleList);

      openSuccessfulToast("Update cycle detail successfully");
    } catch (error) {
      const { message } = error.response.data;
      openErrorToast(message);
    }
  };

  const onChangeSearch = (searchValue) => {
    setSearch(searchValue);
  };

  useEffect(() => {
    fetchCycleList();
  }, [debouncedSearch]);

  return { cycleList, onCreate, onEdit, onChangeSearch };
};

export default useCycleList;
