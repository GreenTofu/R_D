import React from "react";

const SelectItem = ({ item, onSelect }) => {
  return (
    <>
      <button
        className="w-full px-3 py-3 hover:bg-slate-50 duration-200"
        type="button"
        onClick={onSelect}
      >
        <p className="text-sm text-start text-gray-600">{item}</p>
      </button>

      <div className="border-t border-gray-100" />
    </>
  );
};

export default SelectItem;
