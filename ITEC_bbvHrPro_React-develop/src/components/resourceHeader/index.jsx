import React from "react";

import dropdownIcon from "assets/icons/dropdown.png";
import addIcon from "assets/icons/ic_add.png";
import filterIcon from "assets/icons/ic_filter.png";
import searchIcon from "assets/icons/ic_loupe.png";

const ResourceHeader = ({
  title = "Title",
  placeholder = "Search...",
  searchClass = "55%",
  filter,
  setFilter,
  onChangeSearch,
  filterList = [],
  onClickCreate,
  noFilter = false,
}) => {
  return (
    <div className="flex items-center h-9 relative w-full">
      <h1 className="font-bold text-xl">{title}</h1>

      {!noFilter && (
        <div className="ml-6 relative h-full rounded border border-neutral-500">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <img className="w-4 h-4" src={filterIcon} alt="filter" />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-9 px-2 w-36 border-0 rounded h-full appearance-none outline-none text-sm cursor-pointer"
          >
            {filterList.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>

          <div className="absolute top-2.5 right-2">
            <img
              className="w-4 h-4"
              src={dropdownIcon}
              alt="dropdown"
            />
          </div>
        </div>
      )}

      <div className={`ml-7 relative ${searchClass} w-[55%] h-full`}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <img className="w-4 h-4" src={searchIcon} alt="search" />
        </div>

        <input
          type="text"
          className="bg-white border border-neutral-500 text-sm rounded block w-full px-9 h-full outline-0 placeholder-neutral-400"
          placeholder={placeholder}
          onChange={(e) => onChangeSearch(e.target.value)}
        />
      </div>

      <div className="absolute right-0 h-9">
        {onClickCreate ? (
          <button
            type="button"
            className="flex items-center border border-primary capitalize px-3 text-sm rounded bg-white h-full"
            onClick={onClickCreate}
          >
            <span className="text-primary">Create</span>
            <img src={addIcon} alt="" className="w-4 h-4 ml-1.5" />
          </button>
        ) : (
          <div className="w-[100px]" />
        )}
      </div>
    </div>
  );
};

export default ResourceHeader;
