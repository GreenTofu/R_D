import { omit } from "lodash";
import React, { useState } from "react";

import performanceAPI from "api/performanceAPI";
import CycleModal from "components/cycleModal";
import ResourceHeader from "components/resourceHeader";
import useCycleList from "hooks/useCycleList";
import CycleItem from "pages/performances/cycleList/cycleItem";
import useUserStore from "store/userStore";
import { POSITION } from "utils/constant";

const CycleList = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [editCycleDetail, setEditCycleDetail] = useState({});

  const { cycleList, onCreate, onEdit, onChangeSearch } =
    useCycleList();

  const currentUser = useUserStore((state) => state.user);

  const isHRM =
    currentUser.position === POSITION.HUMAN_RESOURCE_MANAGER;

  const fetchCycleDetail = async (id) => {
    const response = await performanceAPI.getCycleInfo(id);

    const { cycle } = response.data;

    setEditCycleDetail(cycle);
  };

  const onEditCycle = (id) => {
    setOpenEditModal(true);

    fetchCycleDetail(id);
  };

  return (
    <>
      <ResourceHeader
        title="Performance Reviews"
        searchClass="w-[65%]"
        placeholder="Search by cycle or status"
        onClickCreate={isHRM ? () => setOpenCreateModal(true) : null}
        onChangeSearch={onChangeSearch}
        noFilter
      />

      <div className="bg-white mt-8 pt-5 rounded-md border">
        <div className="flex px-6 mb-2 text-neutral-900 font-bold">
          <h1 className="basis-3/12">Review Cycle</h1>
          <h1 className="basis-2/12 pl-4">Completed Forms</h1>
          <h1 className="basis-3/12 pl-14">Created By</h1>
          <h1 className="basis-3/12 pl-4">Last Update</h1>
          <div className="basis-1/12" />
        </div>

        {cycleList.map((cycleItem) => (
          <CycleItem
            key={cycleItem.id}
            cycleItem={cycleItem}
            isHRM={isHRM}
            onEdit={() => onEditCycle(cycleItem.id)}
          />
        ))}
      </div>

      <CycleModal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        title="Create Review Cycle"
        onSubmit={onCreate}
      />

      <CycleModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title="Edit Review Cycle"
        onSubmit={(submitData) =>
          onEdit(submitData.id, omit(submitData, ["id"]))
        }
        cycleDetail={editCycleDetail}
      />
    </>
  );
};
export default CycleList;
