import { useEffect, useState } from "react";

import projectAPI from "api/projectAPI";
import useDebounce from "hooks/useDebounce";
import { DEBOUNCE_DELAY } from "utils/constant";

const useProjects = ({ filter, search, limit = 10 }) => {
  const [projectList, setProjectList] = useState([]);
  const [total, setTotal] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

  const totalPage = Math.ceil(total / limit) || 1;

  const fetchProjectList = async () => {
    const response = await projectAPI.getList({
      page: currentPage,
      limit,
      filter,
      search: search || null,
    });

    const { data } = response;

    setProjectList(data.projectList.rows);
    setTotal(data.projectList.count);
  };

  useEffect(() => {
    fetchProjectList();
  }, [debouncedSearch, filter, currentPage]);

  return {
    projectList,
    total,
    totalPage,
    currentPage,
    setCurrentPage,
    fetchProjectList,
  };
};

export default useProjects;
