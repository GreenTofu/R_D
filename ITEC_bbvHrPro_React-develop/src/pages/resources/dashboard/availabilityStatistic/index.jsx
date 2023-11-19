import React, { useState, useEffect } from "react";

import dashboardAPI from "api/dashboardAPI";
import Pagination from "components/pagination";

import AvailabilityItem from "./availabilityItem";

const Availability = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const itemPerPage = 3;

  const getAvailability = async (pageNumber) => {
    const response = await dashboardAPI.getAvailability(pageNumber);
    const { count, rows } = response.data.resources;

    setTotalResults(count);
    setTotalPages(Math.ceil(count / itemPerPage));
    setEmployeeList(rows);
  };

  useEffect(() => {
    getAvailability(page);
  }, [page]);

  return (
    <div className="basis-1/2 py-5 bg-white border border-neutral-300 rounded-md">
      <div className="flex px-6 mb-2">
        <div className="basis-4/12 mr-2">
          <p className="text-xs font-bold text-neutral-700">
            Resource name
          </p>
        </div>

        <div className="basis-5/12 mr-2">
          <p className="text-xs font-bold text-neutral-700">
            Technical skills
          </p>
        </div>

        <div className="basis-3/12 flex justify-center">
          <p className="text-xs font-bold text-neutral-700">
            Availability
          </p>
        </div>
      </div>

      <div className="h-44">
        {employeeList.map((employee) => (
          <AvailabilityItem key={employee.id} data={employee} />
        ))}
      </div>

      <div className="mt-4 pt-2">
        <Pagination
          totalResults={totalResults}
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Availability;
