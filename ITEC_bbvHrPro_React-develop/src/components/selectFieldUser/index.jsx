import React from "react";

import DropDownIcon from "assets/icons/dropdown.png";
import SelectItemUser from "components/selectItemUser";
import useClickOutside from "hooks/useClickOutside";
import { getFullname } from "utils/helper";

const SelectFieldUser = ({
  name,
  itemList,
  setValue,
  initialValue,
  isEditable,
}) => {
  const { open, setOpen, dropdownRef } = useClickOutside();

  const handleSelect = (item) => {
    setOpen(false);
    setValue(name, item);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        className={`relative flex items-center w-full rounded-md border bg-white py-3 px-3 ${
          !isEditable && "cursor-default"
        }`}
        type="button"
        onClick={() => isEditable && setOpen(!open)}
      >
        <div className="flex items-center">
          {initialValue?.avatar && (
            <img
              className="rounded-full w-6 h-6 mr-2"
              src={initialValue.avatar}
              alt="avatar"
            />
          )}

          <p className="text-sm">
            {initialValue?.id ? getFullname(initialValue) : "None"}
          </p>
        </div>

        {isEditable && (
          <img
            className="absolute right-3 w-4 h-4 pointer-events-none"
            src={DropDownIcon}
            alt="icon"
          />
        )}
      </button>

      {open && (
        <div className="absolute mt-1 w-full max-h-44 overflow-y-auto rounded-md drop-shadow-xl bg-white z-50">
          {itemList.map((item) => (
            <SelectItemUser
              key={item.id || 0}
              item={item}
              onSelect={() => handleSelect(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectFieldUser;
