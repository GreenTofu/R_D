
import { useEffect, useState } from "react";

import employeeAPI from "api/employeeAPI";
import useDebounce from "hooks/useDebounce";
import { DEBOUNCE_DELAY } from "utils/constant";

const useEmployees = ({ filter, search }) => {
  const [employeeList, setEmployeeList] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

  const limit = 10;

  const totalPage = Math.ceil(total / limit) || 1;

  const fetchEmployeeList = async () => {
    const response = await employeeAPI.getList({
      page: currentPage,
      filter,
      search: search || null,
      limit,
    });

    const { data } = response;

    setEmployeeList(data.employeeList.rows);
    setTotal(data.employeeList.count);
  };

  useEffect(() => {
    fetchEmployeeList();
  }, [debouncedSearch, filter, currentPage]);

  return {
    employeeList,
    total,
    totalPage,
    currentPage,
    setCurrentPage,
    fetchEmployeeList,
  };
};

export default useEmployees;
