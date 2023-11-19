
import { useEffect, useState } from "react";

import employeeAPI from "api/employeeAPI";
import useDebounce from "hooks/useDebounce";
import { DEBOUNCE_DELAY } from "utils/constant";

const useCandidates = ({ filter, search }) => {
  const [candidateList, setCandidateList] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

  const limit = 8;

  const totalPage = Math.ceil(total / limit) || 1;

  const fetchCandidateList = async () => {
    const response = await employeeAPI.getCandidateList({
      page: currentPage,
      filter,
      search: search || null,
      limit,
    });

    const { data } = response;

    setCandidateList(data.candidateList.rows);
    setTotal(data.candidateList.count);
  };

  useEffect(() => {
    fetchCandidateList();
  }, [debouncedSearch, filter, currentPage]);

  return {
    candidateList,
    total,
    totalPage,
    currentPage,
    setCurrentPage,
    fetchCandidateList,
  };
};

export default useCandidates;
