import { concat, uniqBy } from "lodash";
import React, { useState, useEffect } from "react";

import CloseIcon from "assets/icons/close.png";
import Modal from "components/modal";
import SelectedEmployee from "components/selectedEmployee";

import SearchDropdown from "./searchDropdown";

const SelectEmployeeModal = ({
  open,
  onClose,
  modalTitle = "Select Employee",
  filterRole = "All",
  onConfirm,
  defaultValue = [],
  isMultipleSelect = true,
}) => {
  const [selectedList, setSelectedList] = useState([]);

  const handleSelect = (employee) => {
    const newSelectedList = isMultipleSelect
      ? uniqBy(concat(employee, selectedList), "id")
      : [employee];

    setSelectedList(newSelectedList);
  };

  const handleRemove = (employee) => {
    const newSelectedList = selectedList.filter(
      (item) => item.id !== employee.id
    );

    setSelectedList(newSelectedList);
  };

  const handleConfirm = () => {
    onConfirm(isMultipleSelect ? selectedList : selectedList[0]);

    onClose();
  };

  useEffect(() => {
    setSelectedList(defaultValue);
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative py-8 px-10 bg-white">
        <button
          className="absolute top-5 right-5"
          type="button"
          onClick={onClose}
        >
          <img className="w-5" src={CloseIcon} alt="close" />
        </button>

        <h1 className="text-lg font-bold mb-5">{modalTitle}</h1>

        <SearchDropdown
          selectedItems={selectedList}
          onSelect={handleSelect}
          filterRole={filterRole}
        />

        <h1 className="mt-8 mb-5 text-xs font-semibold text-neutral-500">
          Selected list ({selectedList.length})
        </h1>

        <div className="h-64 overflow-auto pr-4">
          {selectedList.map((employee) => (
            <SelectedEmployee
              key={employee.id}
              employee={employee}
              onRemove={() => handleRemove(employee)}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8 mb-2">
          <button
            type="button"
            className="py-2.5 px-6 bg-primary-100 rounded-md"
            onClick={handleConfirm}
          >
            <p className="text-sm text-primary-500">Confirm</p>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SelectEmployeeModal;
