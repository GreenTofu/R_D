import { isEmpty, omit, pick, reject } from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

import employeeAPI from "api/employeeAPI";
import BackIcon from "assets/icons/arrow-left-tail.png";
import EmailIcon from "assets/icons/email.png";
import ImageIcon from "assets/icons/image.png";
import PhoneIcon from "assets/icons/phone.png";
import ConfirmModal from "components/confirmModal";
import InputField from "components/inputField";
import SelectField from "components/selectField";
import SelectFieldUser from "components/selectFieldUser";
import Tag from "components/tag";
import WorkingProject from "components/workingProject";
import useToastStore from "store/toastStore";
import useUserStore from "store/userStore";
import { ROLE } from "utils/constant";
import { getFullname } from "utils/helper";
import {
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  phoneValidator,
} from "utils/validator";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [editInfo, setEditInfo] = useState({});

  const [openConfirm, setOpenConfirm] = useState(false);

  const { openSuccessfulToast, openErrorToast } = useToastStore();

  const user = useUserStore((state) => state.user);
  const isManager = user?.id && user?.role === ROLE.MANAGER;

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const fetchUserProfile = async () => {
    const response = await employeeAPI.getProfile(id);
    const userDTO = response.data.user;

    const editFields = pick(userDTO, [
      "avatar",
      "firstName",
      "lastName",
      "email",
      "phone",
      "position",
      "role",
      "startingDate",
      "directManager",
    ]);

    reset(editFields);

    setUserData(userDTO);
  };

  const fetchEditInfo = async () => {
    const response = await employeeAPI.getEditInfo();

    const { info } = response.data;

    setEditInfo({
      roleList: info.roles,
      positionList: info.positions,
      managerList: reject(info.managers, ["id", parseInt(id)]),
    });
  };

  const onSubmit = async (data) => {
    const submitData = omit(data, ["directManager", "avatar"]);

    if (data.directManager?.id) {
      submitData.manager = data.directManager.id;
    }

    try {
      await employeeAPI.updateProfile(id, submitData);

      setOpenConfirm(false);
      openSuccessfulToast("Update profile successfully");
    } catch (error) {
      const { message } = error.response.data;
      openErrorToast(message);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    if (isManager) fetchEditInfo();
  }, [id]);

  return (
    <>
      <div className="flex items-center mb-10">
        <button type="button" onClick={() => navigate(-1)}>
          <img
            className="w-5 h-5 mr-5"
            src={BackIcon}
            alt="back-icon"
          />
        </button>
        <p className="font-bold text-2xl">{getFullname(userData)}</p>
      </div>

      <form className="flex">
        <div className="basis-4/12 pr-10">
          <p className="text-xs font-semibold uppercase mb-3">
            Profile Image
          </p>

          <div className="flex justify-center items-center min-w-[280px] min-h-[280px]">
            <img
              className="rounded mb-3"
              src={userData?.avatar}
              alt="avatar"
            />
          </div>

          <div className="flex justify-center mb-8">
            <button className="flex items-center" type="button">
              <img
                className="w-4 h-4 mr-2"
                src={ImageIcon}
                alt="avatar-icon"
              />
              <p className="text-xs text-sky-500">
                Change profile image
              </p>
            </button>
          </div>

          <p className="text-xs font-semibold uppercase mb-3">
            Employee Details
          </p>

          <InputField
            insideLabel="First name"
            type="text"
            name="firstName"
            register={register}
            validator={firstNameValidator}
            initialValue={watch("firstName")}
            isEditable
            error={errors.firstName?.message}
          />

          <InputField
            insideLabel="Last name"
            type="text"
            name="lastName"
            register={register}
            validator={lastNameValidator}
            initialValue={watch("lastName")}
            isEditable={isManager}
            error={errors.lastName?.message}
          />

          <InputField
            insideLabel="Email"
            icon={EmailIcon}
            type="email"
            name="email"
            register={register}
            validator={emailValidator}
            initialValue={watch("email")}
            isEditable={isManager}
            error={errors.email?.message}
          />

          <InputField
            insideLabel="Phone"
            type="tel"
            name="phone"
            icon={PhoneIcon}
            register={register}
            validator={phoneValidator}
            initialValue={watch("phone")}
            isEditable={isManager}
            error={errors.phone?.message}
          />

          {isManager && (
            <button
              className="w-full h-11 flex justify-center items-center rounded-lg mt-16 bg-black"
              type="button"
              onClick={() => setOpenConfirm(true)}
            >
              <p className="text-white">Save</p>
            </button>
          )}
        </div>

        <div className="basis-4/12 relative">
          <div className="px-7">
            <p className="text-xs font-semibold uppercase mb-3">
              Role
            </p>

            <SelectField
              name="role"
              itemList={editInfo.roleList}
              setValue={setValue}
              initialValue={watch("role")}
              isEditable={isManager}
            />

            <p className="text-xs font-semibold uppercase mt-8 mb-3">
              Position
            </p>

            <SelectField
              name="position"
              itemList={editInfo.positionList}
              setValue={setValue}
              initialValue={watch("position")}
              isEditable={isManager}
            />

            <p className="text-xs font-semibold uppercase mt-8 mb-3">
              Start Date
            </p>

            <InputField
              type="date"
              name="startingDate"
              register={register}
              initialValue={watch("startingDate")}
              isEditable={isManager}
            />
          </div>

          {isManager && (
            <div className="absolute bottom-0 w-full pr-8">
              <Link
                to="/resources/"
                className="w-full h-11 flex justify-center items-center rounded-lg border border-black mt-20 bg-white"
                type="button"
              >
                <p className="text-black">Cancel</p>
              </Link>
            </div>
          )}
        </div>

        <div className="basis-5/12 pl-10">
          <div className="mb-7 w-3/4">
            <p className="text-xs font-semibold uppercase mb-3">
              Direct Manager
            </p>

            <SelectFieldUser
              name="directManager"
              itemList={editInfo.managerList}
              setValue={setValue}
              initialValue={watch("directManager")}
              isEditable={isManager}
            />
          </div>

          <p className="text-xs font-semibold uppercase mt-10 mb-3">
            Skills
          </p>

          <div className="mb-7 max-h-14 flex flex-wrap overflow-hidden">
            {userData.tags?.map((skill) => (
              <Tag key={skill.id}>{skill.name}</Tag>
            ))}
          </div>

          {!isEmpty(userData.projects) && (
            <div className="my-10">
              <p className="text-xs font-semibold uppercase mb-7">
                Working Projects
              </p>

              {userData.projects?.map((project) => (
                <WorkingProject
                  key={project.id}
                  logo={project.logo}
                  name={project.name}
                  effort={project.working.effort}
                />
              ))}
            </div>
          )}
        </div>
      </form>

      <ConfirmModal
        isOpen={openConfirm}
        title="Save"
        description="Are you sure you want to update this profile detail?"
        onConfirm={handleSubmit(onSubmit)}
        onCancel={() => setOpenConfirm(false)}
      />
    </>
  );
};

export default Profile;
