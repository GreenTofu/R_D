import React, { useState } from "react";

import ResourceHeader from "components/resourceHeader";
import ResourcePagination from "components/resourcePagination/resourcePagination";
import useProjects from "hooks/useProjects";
import CreateProjectModal from "pages/resources/projectList/createProjectModal";
import { PROJECT_FILTER_LIST } from "utils/constant";

import ProjectItem from "./projectItem";

const ProjectList = () => {
  const [filter, setFilter] = useState("name");
  const [search, setSearch] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const {
    projectList,
    total,
    totalPage,
    currentPage,
    setCurrentPage,
  } = useProjects({ filter, search });

  const onChangeSearch = (searchValue) => {
    setCurrentPage(1);
    setSearch(searchValue);
  };

  return (
    <>
      <ResourceHeader
        title="Project List"
        filter={filter}
        setFilter={setFilter}
        onChangeSearch={onChangeSearch}
        filterList={PROJECT_FILTER_LIST}
        onClickCreate={() => setOpenCreateModal(true)}
      />

      <div className="bg-white mt-8 rounded-md drop-shadow-sm">
        <div className="relative pt-5">
          <div className="w-full text-sm text-left">
            <div className="flex mb-4 py-2 px-5 bg-opacity-30 text-neutral-700">
              <div className="basis-3/12 font-medium text-sm">
                Project Name
              </div>
              <div className="basis-2/12 font-medium text-sm">
                Status
              </div>

              <div className="basis-3/12 font-medium text-sm">
                Project Tags
              </div>
              <div className="basis-2/12 font-medium text-sm">
                Team members
              </div>
              <div className="basis-3/12 font-medium text-sm">
                Project Manager
              </div>
            </div>

            <div className="w-full">
              {projectList.length > 0 ? (
                projectList.map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))
              ) : (
                <div className="h-[200px] flex items-center justify-center">
                  No projects data
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between rounded-md drop-shadow-sm bg-white mt-8 h-[50px] px-6 items-center">
        <div>
          <p>
            <span className="text-sm">{total}</span> results
          </p>
        </div>

        <div>
          <ResourcePagination
            currentPage={currentPage}
            totalPage={totalPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <CreateProjectModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </>
  );
};

export default ProjectList;
