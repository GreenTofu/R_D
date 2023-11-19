import React from "react";

import { getFullname } from "utils/helper";

const SelectItemUser = ({ item, onSelect }) => {
  return (
    <>
      <button
        className="w-full px-3 py-3 hover:bg-slate-50 duration-200"
        type="button"
        onClick={onSelect}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {item.id ? (
              <>
                <img
                  className="rounded-full w-6 h-6 mr-2"
                  src={item.avatar}
                  alt="avatar"
                />
                <p className="text-sm">{getFullname(item)}</p>
              </>
            ) : (
              <p className="text-sm">None</p>
            )}
          </div>

          {item.position && (
            <p className="text-xs text-neutral-500">
              {item.position}
            </p>
          )}
        </div>
      </button>

      <div className="border-t border-gray-100" />
    </>
  );
};

export default SelectItemUser;
