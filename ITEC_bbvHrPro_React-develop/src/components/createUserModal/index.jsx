import moment from "moment";
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import employeeAPI from "api/employeeAPI";
import imageIcon from "assets/icons/image.png";
import userAvatar from "assets/icons/newEmpAvatar.png";
import InputField from "components/inputField";
import Modal from "components/modal";
import SelectField from "components/selectField";
import SelectFieldUser from "components/selectFieldUser";
import {
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  phoneValidator,
} from "utils/validator";

const CreateUserModal = ({
  open,
  onClose,
  onSuccess,
  title,
  isCandidate,
}) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const [editInfo, setEditInfo] = useState({});

  const inputFileRef = useRef();

  const defaultRole = isCandidate ? "Candidate" : "Employee";

  const defaultFields = {
    role: defaultRole,
    position: "Designer",
    startingDate: moment(new Date()).format("YYYY-MM-DD"),
  };

  const fetchSelectList = async () => {
    const response = await employeeAPI.getEditInfo();
    const { info } = response.data;

    const filteredRoleList = isCandidate
      ? ["Candidate"]
      : info.roles.filter((role) => role !== "Candidate");

    const noneOption = {};
    info.managers.push(noneOption);

    setEditInfo({
      roleList: filteredRoleList,
      positionList: info.positions,
      managerList: info.managers,
    });
  };

  const onSubmit = async (data) => {
    const submitData = { ...data, manager: data.manager?.id };
    try {
      const response = await employeeAPI.createEmployee(submitData);
      const newEmployee = response.data.user;

      onSuccess(newEmployee);
      onClose();
    } catch (error) {
      const errorData = error.response.data;
      const errorField = errorData?.field;

      setError(errorField, {
        type: "400",
        message: errorData.message,
      });
    }
  };

  useEffect(() => {
    fetchSelectList();
    reset(defaultFields);
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative py-6 px-10 bg-white">
        <div className="flex justify-between mb-2">
          <h3 className="text-xl text-neutral-500 font-bold font-lato">
            {title}
          </h3>
          <button
            type="button"
            className="text-info-500 text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>

        <div className="relative flex-auto content-center w-72">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex flex-row mb-2 mt-8">
              <img
                src={userAvatar}
                alt=""
                className="mx-auto w-28 rounded"
              />

              <input
                type="file"
                name="avatar"
                ref={inputFileRef}
                accept="image/png, image/jpeg"
                hidden
              />

              <button
                type="button"
                className="text-sm justify-center items-center flex w-full mt-3"
              >
                <img
                  src={imageIcon}
                  alt=""
                  className="inline mr-1.5 w-4"
                />
                <span className="text-info-500 text-sm">
                  Change profile image
                </span>
              </button>
            </div>

            <div className="my-4 mt-5">
              <InputField
                label="First name"
                type="text"
                name="firstName"
                placeholder="David"
                register={register}
                validator={firstNameValidator}
                isEditable
                error={errors.firstName?.message}
              />
            </div>

            <div className="my-4">
              <InputField
                label="Last name"
                type="text"
                name="lastName"
                placeholder="Beckham"
                register={register}
                validator={lastNameValidator}
                isEditable
                error={errors.lastName?.message}
              />
            </div>

            <div className="my-4">
              <InputField
                label="Email"
                type="email"
                name="email"
                placeholder="yourmail@bbv.com"
                register={register}
                validator={emailValidator}
                isEditable
                error={errors.email?.message}
              />
            </div>

            <div className="my-4">
              <InputField
                label="Phone number"
                type="tel"
                name="phone"
                placeholder="09123XXXXX"
                register={register}
                validator={phoneValidator}
                isEditable
                error={errors.phone?.message}
              />
            </div>

            <div className="my-4">
              <p className="text-neutral-700 text-sm font-semibold mb-1">
                Role
              </p>
              <SelectField
                name="role"
                itemList={editInfo.roleList}
                setValue={setValue}
                initialValue={watch("role")}
                isEditable
              />
            </div>

            <div className="my-4">
              <p className="text-neutral-700 text-sm font-semibold mb-1">
                Position
              </p>
              <SelectField
                name="position"
                itemList={editInfo.positionList}
                setValue={setValue}
                initialValue={watch("position")}
                isEditable
              />
            </div>

            <div className="my-4">
              <p className="text-neutral-700 text-sm font-semibold mb-1">
                Direct Manager
              </p>
              <SelectFieldUser
                name="manager"
                itemList={editInfo.managerList}
                setValue={setValue}
                initialValue={watch("manager")}
                isEditable
              />
            </div>

            <div className="my-4">
              <p className="text-neutral-700 text-sm font-semibold mb-1">
                Start date
              </p>
              <InputField
                type="date"
                name="startingDate"
                register={register}
                initialValue={watch("startingDate")}
                isEditable
              />
            </div>

            <div className="text-center pt-3 pb-5">
              <button
                type="submit"
                className="w-20 h-9 px-3 py-1 rounded border border-primary-500 text-primary-500 text-sm"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateUserModal;
