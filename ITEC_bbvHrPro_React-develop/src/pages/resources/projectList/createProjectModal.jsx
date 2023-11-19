import { isEmpty, find } from "lodash";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import projectAPI from "api/projectAPI";
import ErrorMessage from "components/errorMessage";
import InputField from "components/inputField";
import Modal from "components/modal";
import SelectField from "components/selectField";
import TagList from "components/tagList";
import { projectNameValidator } from "utils/validator";

const CreateProjectModal = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD"),
      status: "Upcoming",
    },
  });

  const navigate = useNavigate();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const [statusList, setStatusList] = useState([]);

  const getStatusNames = (list) => {
    const arr = [];
    list.forEach((item) => {
      arr.push(item.statusName);
    });

    return arr;
  };

  const fetchStatusList = async () => {
    const response = await projectAPI.getStatusList();

    const { status } = response.data;

    setStatusList(status);
  };

  const onSubmit = async (data) => {
    const submitData = data;

    submitData.tags = data.tags.filter((tag) => !isEmpty(tag));

    const selectedStatus = find(statusList, {
      statusName: submitData.status,
    });

    submitData.status = selectedStatus.id;

    try {
      const response = await projectAPI.createProject(submitData);
      const newProject = response.data.project;

      navigate(`/resources/projects/${newProject.id}`);
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
    fetchStatusList();
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="px-8 py-5 bg-white">
        <div className="flex justify-between">
          <p className="text-xl text-neutral-500 font-semibold">
            Create Project
          </p>
          <button
            className="text-primary-500 text-sm"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Name"
            type="text"
            name="name"
            placeholder="Project A"
            register={register}
            validator={projectNameValidator}
            isEditable
            error={errors.name?.message}
          />

          <p className="text-neutral-900 text-sm font-semibold mt-6 mb-1.5">
            Tags
          </p>

          <TagList
            fields={fields}
            register={register}
            append={append}
            remove={remove}
          />

          <div className="mt-6 flex justify-between">
            <div className="mr-8">
              <p className="text-neutral-900 text-sm font-semibold mb-1.5">
                Started Date
              </p>
              <InputField
                type="date"
                name="startDate"
                register={register}
                initialValue={watch("startingDate")}
                isEditable
                error={errors.startDate?.message}
              />
            </div>
            <div>
              <p className="text-neutral-900 text-sm text-right font-semibold mb-1.5">
                Due Date
              </p>
              <InputField
                type="date"
                name="endDate"
                register={register}
                initialValue={watch("dueDate")}
                isEditable
                error={errors.endDate?.message}
              />
            </div>
          </div>

          <p className="text-neutral-900 text-sm font-semibold mt-6 mb-1.5">
            Status
          </p>
          <SelectField
            name="status"
            itemList={getStatusNames(statusList)}
            setValue={setValue}
            initialValue={watch("status")}
            isEditable
          />

          <p className="text-neutral-900 text-sm font-semibold mt-6 mb-1.5">
            Description
          </p>

          <textarea
            className="w-full h-32 rounded-md border text-xs p-4"
            placeholder="Write down the details about your project..."
            {...register("description")}
          />
          <ErrorMessage message={errors.description?.message} />

          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="px-5 py-1.5 rounded border border-primary-500 text-primary-500 text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateProjectModal;
