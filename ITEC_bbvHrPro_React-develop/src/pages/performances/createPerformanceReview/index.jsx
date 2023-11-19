import { isEmpty } from "lodash";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import performanceAPI from "api/performanceAPI";
import EmployeeIcon from "assets/icons/employee-select.png";
import EvaluatorIcon from "assets/icons/evaluator.png";
import SelectedEmployee from "components/selectedEmployee";
import useCriterias from "hooks/useCriterias";
import SelectEmployeeModal from "pages/performances/createPerformanceReview/selectEmployeeModal";
import useToastStore from "store/toastStore";
import { CycleContext } from "utils/context";
import { getFullname } from "utils/helper";

import CriteriaList from "./criteriaList";

const CreatePerformanceReview = () => {
  const navigate = useNavigate();

  const reviewCycle = useContext(CycleContext);

  const [selectedEvaluator, setSelectedEvaluator] = useState();
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const [openEvaluatorModal, setOpenEvaluatorModal] = useState(false);
  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);

  const { register, handleSubmit, getValues, reset } = useForm();

  const { criteriaData } = useCriterias();

  const { openSuccessfulToast, openErrorToast } = useToastStore();

  const handleRemoveEmployee = (employee) => {
    const newSelectedList = selectedEmployees.filter(
      (item) => item.id !== employee.id
    );

    setSelectedEmployees(newSelectedList);
  };

  const validateCriterias = (normalizedCriterias) => {
    const totalWeight = normalizedCriterias.reduce(
      (sum, criteria) => sum + criteria.weight,
      0
    );

    if (totalWeight !== 100) {
      return `The total of criteria weights must be 100% (Current: ${totalWeight}%)`;
    }

    return null;
  };

  const validateEvaluator = () => {
    if (!selectedEvaluator) {
      return "Please select an evaluator";
    }

    return null;
  };

  const validateEmployees = () => {
    if (isEmpty(selectedEmployees)) {
      return "Please select at least 1 employee";
    }

    return null;
  };

  const validateAssignees = () => {
    const isDuplicate = selectedEmployees.find(
      (emp) => emp.id === selectedEvaluator.id
    );

    if (isDuplicate) {
      return "Evaluator can't be an assignee at the same time";
    }

    return null;
  };

  const onSubmit = async (data) => {
    const { criterias } = data;

    const normalizedCriterias = criterias.flatMap((part) =>
      part.criteria.map(({ id, defaultWeight }) => ({
        id,
        weight: parseInt(defaultWeight),
      }))
    );

    const error =
      validateCriterias(normalizedCriterias) ||
      validateEvaluator() ||
      validateEmployees() ||
      validateAssignees();

    if (error) {
      openErrorToast(error);

      return;
    }

    const employeeIds = selectedEmployees.map(
      (employee) => employee.id
    );

    const submitData = {
      criteria: normalizedCriterias,
      evaluatorId: selectedEvaluator.id,
      employeeIds,
    };

    const response = await performanceAPI.createPerformanceReview(
      reviewCycle.id,
      submitData
    );

    if (response.status !== 200) {
      openErrorToast("Something went wrong, please try again!");
    } else {
      const totalCreatedForms = employeeIds.length;
      openSuccessfulToast(
        `Create performance review forms successfully (${totalCreatedForms}/${totalCreatedForms})`
      );

      navigate(`/performances/cycles/${reviewCycle.id}`);
    }
  };

  const formatDate = (date) => {
    return moment(date).format("MMM DD, YYYY");
  };

  useEffect(() => {
    reset({ criterias: criteriaData });
  }, [criteriaData]);

  return (
    <>
      <h1 className="text-[28px] font-extrabold text-neutral-900">
        Create Performance Review
      </h1>

      <form
        className="flex w-full mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="basis-1/2 mr-40">
          <div className="flex items-center">
            <h1 className="text-base text-neutral-700 font-bold mr-2">
              Review Cycle:
            </h1>
            <h1 className="text-sm text-neutral-900">
              {formatDate(reviewCycle?.startDate)} -{" "}
              {formatDate(reviewCycle?.endDate)}
            </h1>
          </div>

          <div className="mt-2 flex items-center">
            <h1 className="text-base text-neutral-700 font-bold mr-2">
              Due date:
            </h1>
            <div className="flex">
              <h1 className="text-sm text-neutral-900 mr-1">
                {formatDate(reviewCycle?.empDueDate)} for
              </h1>
              <h1 className="text-sm text-neutral-900 font-bold">
                Employee
              </h1>
            </div>
          </div>

          <div className="mt-2 flex items-center">
            <h1 className="text-base text-neutral-700 font-bold mr-2">
              Due date:
            </h1>
            <div className="flex">
              <h1 className="text-sm text-neutral-900 mr-1">
                {formatDate(reviewCycle?.evalDueDate)} for
              </h1>
              <h1 className="text-sm text-neutral-900 font-bold">
                Evaluator
              </h1>
            </div>
          </div>

          <div className="mt-10">
            <CriteriaList
              criteriaData={getValues().criterias || []}
              register={register}
            />
          </div>
        </div>

        <div className="relative basis-1/2">
          <div className="flex justify-between">
            <div className="flex items-center">
              <img
                className="w-5 h-5 mr-3"
                src={EvaluatorIcon}
                alt="icon"
              />
              <h1 className="text-base font-bold">Evaluator</h1>
            </div>

            <button
              type="button"
              onClick={() => setOpenEvaluatorModal(true)}
            >
              <p className="text-sm text-primary-500">
                {selectedEvaluator ? "Change" : "Select"}
              </p>
            </button>
          </div>

          {selectedEvaluator ? (
            <div className="mt-5 flex items-center">
              <img
                className="w-11 h-11 rounded-full mr-3"
                src={selectedEvaluator.avatar}
                alt="avatar"
              />

              <div>
                <p className="text-lg text-neutral-900 font-semibold">
                  {getFullname(selectedEvaluator)}
                </p>

                <p className="text-sm text-neutral-500">
                  {selectedEvaluator.position}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm text-neutral-500">
              Select an evaluator
            </p>
          )}

          <div className="mt-14 flex justify-between">
            <div className="flex items-center">
              <img
                className="w-5 h-5 mr-3"
                src={EmployeeIcon}
                alt="icon"
              />
              <h1 className="text-base font-bold">
                Assign To ({selectedEmployees.length})
              </h1>
            </div>

            <button
              type="button"
              onClick={() => setOpenEmployeeModal(true)}
            >
              <p className="text-sm text-primary-500">
                {!isEmpty(selectedEmployees) ? "Change" : "Select"}
              </p>
            </button>
          </div>

          {!isEmpty(selectedEmployees) ? (
            <div className="h-72 mt-6 overflow-auto pr-4">
              {selectedEmployees.map((employee) => (
                <SelectedEmployee
                  key={employee.id}
                  employee={employee}
                  onRemove={() => handleRemoveEmployee(employee)}
                />
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-neutral-500">
              Select employee(s)
            </p>
          )}

          <div className="absolute w-full bottom-0 flex justify-between">
            <button
              type="button"
              className="px-14 py-3 text-sm text-neutral-900"
              onClick={() => navigate(-1)}
            >
              <p>Cancel</p>
            </button>

            <button
              type="submit"
              className="bg-white px-14 py-3 rounded-md border border-primary-500 text-sm text-primary-500"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      <SelectEmployeeModal
        open={openEvaluatorModal}
        onClose={() => setOpenEvaluatorModal(false)}
        modalTitle="Select Evaluator"
        onConfirm={setSelectedEvaluator}
        defaultValue={selectedEvaluator && [selectedEvaluator]}
        isMultipleSelect={false}
        filterRole="Manager"
      />

      <SelectEmployeeModal
        open={openEmployeeModal}
        onClose={() => setOpenEmployeeModal(false)}
        modalTitle="Select Employee"
        onConfirm={setSelectedEmployees}
        defaultValue={selectedEmployees}
      />
    </>
  );
};

export default CreatePerformanceReview;
