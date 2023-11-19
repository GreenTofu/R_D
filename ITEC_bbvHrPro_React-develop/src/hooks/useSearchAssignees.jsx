import { useState, useEffect } from "react";

import performanceAPI from "api/performanceAPI";
import useClickOutside from "hooks/useClickOutside";
import useDebounce from "hooks/useDebounce";
import { DEBOUNCE_DELAY } from "utils/constant";

const useSearchAssignees = ({ cycleId, search, role }) => {
  const [results, setResults] = useState([]);

  const { open, setOpen, dropdownRef } = useClickOutside();

  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

  const fetchSearchEmployees = async () => {
    const response = await performanceAPI.getAssigneeList(cycleId, {
      search,
      role,
    });

    const resultList = response.data.assigneeList;

    setResults(resultList);
    setOpen(true);
  };

  useEffect(() => {
    fetchSearchEmployees();
  }, [debouncedSearch]);

  return {
    open,
    results,
    dropdownRef,
    setOpen,
  };
};

export default useSearchAssignees;
