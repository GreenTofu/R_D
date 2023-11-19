import { useEffect, useState } from "react";

import performanceAPI from "api/performanceAPI";
import useDebounce from "hooks/useDebounce";
import { DEBOUNCE_DELAY } from "utils/constant";

const useReviewList = ({ cycleId, limit = 10 }) => {
  const [reviewList, setReviewList] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

  const totalPage = Math.ceil(total / limit) || 1;

  const fetchReviewList = async () => {
    const { data } = await performanceAPI.getReviewList(cycleId, {
      page: currentPage,
      search,
      limit,
    });

    setReviewList(data.reviewList.rows);

    setTotal(data.reviewList.count);
  };

  const onChangeSearch = (searchValue) => {
    setCurrentPage(1);
    setSearch(searchValue);
  };

  useEffect(() => {
    fetchReviewList();
  }, [debouncedSearch, currentPage]);

  return {
    reviewList,
    total,
    totalPage,
    setCurrentPage,
    currentPage,
    onChangeSearch,
    fetchReviewList,
  };
};

export default useReviewList;
