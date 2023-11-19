import React, { useState } from "react";

import CreateUserModal from "components/createUserModal";
import ResourceHeader from "components/resourceHeader";
import ResourcePagination from "components/resourcePagination/resourcePagination";
import useEmployees from "hooks/useEmployees";
import { EMPLOYEE_FILTER_LIST } from "utils/constant";

import EmployeeItem from "./employeeItem";

const EmployeeList = () => {
  const [filter, setFilter] = useState("name");
  const [search, setSearch] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const {
    employeeList,
    total,
    totalPage,
    currentPage,
    setCurrentPage,
    fetchEmployeeList,
  } = useEmployees({
    search,
    filter,
  });

  const onChangeSearch = (searchValue) => {
    setCurrentPage(1);
    setSearch(searchValue);
  };

  return (
    <>
      <ResourceHeader
        title="Employee List"
        filter={filter}
        setFilter={setFilter}
        onChangeSearch={onChangeSearch}
        filterList={EMPLOYEE_FILTER_LIST}
        onClickCreate={() => setOpenCreateModal(true)}
      />

      <div className="bg-white mt-8 pt-5 rounded-md drop-shadow-sm w-full text-sm text-neutral-500">
        <div className="flex my-2 px-6 text-neutral-900">
          <div className="basis-3/12 font-medium text-sm uppercase">
            Name
          </div>
          <div className="basis-3/12 font-medium text-sm">
            Position
          </div>
          <div className="basis-3/12 font-medium text-sm">Skills</div>
          <div className="basis-2/12 font-medium text-sm">
            Manager
          </div>
          <div className="basis-2/12 font-medium text-sm">
            Availability
          </div>
          <div className="w-5" />
        </div>

        <div>
          {employeeList.length > 0 ? (
            employeeList.map((employee) => (
              <EmployeeItem key={employee.id} employee={employee} />
            ))
          ) : (
            <div className="h-[200px] flex items-center justify-center">
              No employees found
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between rounded-md drop-shadow-sm bg-white mt-8 h-[50px] px-6 items-center">
        <p>
          <span>{total}</span> results
        </p>

        <div>
          <ResourcePagination
            currentPage={currentPage}
            totalPage={totalPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <CreateUserModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSuccess={fetchEmployeeList}
        title="New Employee"
      />
    </>
  );
};

export default EmployeeList;
