import React, { useState } from "react";

import CreateUserModal from "components/createUserModal";
import ResourceHeader from "components/resourceHeader";
import ResourcePagination from "components/resourcePagination/resourcePagination";
import useCandidates from "hooks/useCandidates";
import { CANDIDATE_FILTER_LIST } from "utils/constant";

import CandidateItem from "./candidateItem";

const CandidateList = () => {
  const [filter, setFilter] = useState("name");
  const [search, setSearch] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const {
    candidateList,
    total,
    totalPage,
    currentPage,
    setCurrentPage,
    fetchCandidateList,
  } = useCandidates({
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
        title="Candidate List"
        filter={filter}
        setFilter={setFilter}
        onChangeSearch={onChangeSearch}
        filterList={CANDIDATE_FILTER_LIST}
        onClickCreate={() => setOpenCreateModal(true)}
      />

      <div className="grid grid-cols-4 gap-4 mt-8 h-max">
        {candidateList.map((candidate) => (
          <CandidateItem key={candidate.id} candidate={candidate} />
        ))}
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
        onSuccess={fetchCandidateList}
        title="New Candidate"
        isCandidate
      />
    </>
  );
};

export default CandidateList;
