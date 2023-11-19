import { isEmpty } from "lodash";
import React, { useContext, useEffect, useState } from "react";

import SearchIcon from "assets/icons/ic_loupe.png";
import SelectItemUser from "components/selectItemUser";
import useSearchAssignees from "hooks/useSearchAssignees";
import { CycleContext } from "utils/context";

const SearchDropdown = ({ selectedItems, filterRole, onSelect }) => {
  const reviewCycle = useContext(CycleContext);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { open, results, dropdownRef, setOpen } = useSearchAssignees({
    cycleId: reviewCycle.id,
    search,
    role: filterRole,
  });

  const handleSelect = (employee) => {
    onSelect(employee);

    setOpen(false);
  };

  useEffect(() => {
    const filterResults = results.filter(
      (result) => !selectedItems.find((item) => item.id === result.id)
    );

    setSearchResults(filterResults);
  }, [selectedItems, results]);

  return (
    <div className="relative w-96 h-10" ref={dropdownRef}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <img className="w-4 h-4" src={SearchIcon} alt="search" />
      </div>

      <input
        type="text"
        className="bg-white border border-neutral-500 text-xs rounded block w-full px-9 h-full outline-0"
        placeholder="Search for employee name or position..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setOpen(true)}
      />

      <div className="absolute mt-1 w-full max-h-48 overflow-y-auto rounded-md drop-shadow-lg bg-white z-50">
        {open &&
          (isEmpty(searchResults) ? (
            <p className="text-neutral-500 text-xs text-center py-4">
              No employee found
            </p>
          ) : (
            searchResults.map((employee) => (
              <SelectItemUser
                key={employee.id}
                item={employee}
                onSelect={() => handleSelect(employee)}
              />
            ))
          ))}
      </div>
    </div>
  );
};

export default SearchDropdown;
