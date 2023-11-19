import { clone, isEmpty, pick } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import projectAPI from "api/projectAPI";
import BackIcon from "assets/icons/arrow-left-tail.png";
import RightArrowIcon from "assets/icons/arrow-right-black.png";
import saveIcon from "assets/icons/ic-reload.png";
import addIcon from "assets/icons/ic_add.png";
import ConfirmModal from "components/confirmModal";
import InputField from "components/inputField";
import TagList from "components/tagList";
import MemberDetailModal from "pages/resources/projectDetails/memberDetails";
import useToastStore from "store/toastStore";
import { PROJECT_DETAIL_FIELDS } from "utils/constant";
import { getFullname } from "utils/helper";
import { projectNameValidator } from "utils/validator";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialData = useRef(null);

  const [memberModal, setMemberModal] = useState(null);
  const [projectName, setProjectName] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);

  const { openSuccessfulToast, openErrorToast } = useToastStore();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    trigger,
  } = useForm();

  const {
    fields: members,
    replace: setMembers,
    remove: removeMember,
  } = useFieldArray({
    control,
    name: "members",
    keyName: "field-id",
  });

  const {
    fields: tags,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const fetchProjectDetails = async () => {
    const response = await projectAPI.getDetails(id);

    const { project } = response.data;
    initialData.current = project;

    const tagList = project.tags.map((tag) => tag.name);
    project.tags = tagList;

    reset(pick(project, PROJECT_DETAIL_FIELDS));

    setProjectName(project.name);
  };

  const onSubmit = async (data) => {
    const submitData = clone(data);

    submitData.tags = data.tags.filter((tag) => !isEmpty(tag));

    submitData.members = data.members.map((member) => ({
      id: member.id,
      ...member.working,
    }));

    try {
      await projectAPI.update(id, submitData);

      setOpenConfirm(false);
      openSuccessfulToast("Update project detail successfully");
    } catch (error) {
      const { message } = error.response.data;
      openErrorToast(message);
    }
  };

  const onCancelEditMember = () => {
    setMemberModal(null);
    setMembers(initialData.current?.members);
  };

  const onConfirmEditMember = async () => {
    const isValid = await trigger(`members`);

    if (isValid) setMemberModal(null);
  };

  const onRemoveMember = async () => {
    removeMember(memberModal.index);
    setMemberModal(null);
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  return (
    <>
      <div className="flex w-full justify-between items-center mb-10">
        <div className="flex items-center">
          <button type="button" onClick={() => navigate(-1)}>
            <img
              className="w-5 h-5 mr-5"
              src={BackIcon}
              alt="back-icon"
            />
          </button>
          <h3 className="font-bold text-2xl text-neutral-900 font-nunito">
            {projectName}
          </h3>
        </div>
        <button
          type="submit"
          className="flex justify-center items-center text-neutral-900 bg-white w-28 py-2 border border-neutral-900 rounded-md ml-3"
          onClick={() => setOpenConfirm(true)}
        >
          <img src={saveIcon} alt="" className="mr-1 w-5" />
          Save
        </button>
      </div>

      <div className="flex">
        <div className="pr-7 w-[465px]">
          <h4 className="text-md text-neutral-900 font-bold font-nunito mb-4">
            Name
          </h4>

          <InputField
            name="name"
            register={register}
            validator={projectNameValidator}
            isEditable
            error={errors.name?.message}
          />

          <h4 className="mt-6 text-md text-neutral-900 font-bold font-nunito">
            Description
          </h4>

          <textarea
            placeholder="Enter your project description..."
            className="bg-white min-h-[115px] w-full border resize-none rounded-md text-sm text-neutral-900 mt-4 p-4 outline-none"
            {...register("description")}
          />

          <h4 className="text-md text-neutral-900 font-bold mt-6">
            Members
          </h4>

          <div className="mt-4 overflow-y-auto">
            <div>
              {members.map((member, index) => (
                <button
                  key={member.id}
                  onClick={() => setMemberModal({ ...member, index })}
                  type="button"
                  className="bg-white border w-full rounded-md h-14 p-4 mb-3 flex justify-between items-center"
                >
                  <div className="flex justify-start items-center w-36">
                    <img
                      src={member.avatar}
                      alt=""
                      className="rounded-full w-7 h-7 mr-2"
                    />
                    <p className="text-xs text-neutral-900 mr-1">
                      {getFullname(member)}
                    </p>
                  </div>
                  <p className="text-[11px] w-24 text-left text-neutral-500">
                    {member.position}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="p-1.5 text-neutral-700 w-10 text-[10px] border rounded">
                      {member.working.effort}%
                    </span>
                    <span className="ml-2 text-neutral-700 text-[11px]">
                      efforts
                    </span>
                    <img
                      src={RightArrowIcon}
                      alt=""
                      className="w-4 h-4 ml-4"
                    />
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button type="button" className="flex items-center">
                <img
                  src={addIcon}
                  alt=""
                  className="w-3 h-3 inline"
                />
                <span className="text-primary-500 text-xs ml-1">
                  Add member
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="w-96 ml-20">
          <h4 className="text-md text-neutral-900 font-bold mb-2">
            Tags
          </h4>

          <TagList
            fields={tags}
            register={register}
            tagField="name"
            append={appendTag}
            remove={removeTag}
          />

          <div className="flex justify-start mt-9 py-4">
            <div className="mr-14">
              <h4 className="text-md text-neutral-900 font-bold mb-4">
                Started Date
              </h4>

              <InputField
                type="date"
                name="startDate"
                register={register}
                initialValue={watch("startDate")}
                isEditable
              />
            </div>

            <div>
              <h4 className="text-md text-neutral-900 font-bold mb-4">
                Due Date
              </h4>

              <InputField
                type="date"
                name="endDate"
                register={register}
                initialValue={watch("endDate")}
                isEditable
              />
            </div>
          </div>
        </div>
      </div>

      <MemberDetailModal
        register={register}
        member={memberModal}
        errors={errors}
        onRemove={onRemoveMember}
        onCancel={onCancelEditMember}
        onConfirm={onConfirmEditMember}
      />

      <ConfirmModal
        isOpen={openConfirm}
        title="Save"
        description="Are you sure you want to update this project detail?"
        onConfirm={handleSubmit(onSubmit)}
        onCancel={() => setOpenConfirm(false)}
      />
    </>
  );
};

export default ProjectDetails;
