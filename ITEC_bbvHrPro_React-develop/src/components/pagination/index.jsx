import React from "react";

import ArrowLeft from "assets/icons/arrow-left.png";
import ArrowRight from "assets/icons/arrow-right.png";

const Pagination = ({
  totalResults,
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const size = totalPages > 3 ? 3 : totalPages;
  const pageArray = [];

  let start = currentPage - 1;

  if (currentPage < size) start = 1;
  else if (currentPage === totalPages)
    start = totalPages - (size - 1);

  for (let i = 0; i < size; i += 1) {
    pageArray.push(start + i);
  }

  return (
    <div className="flex justify-between px-6">
      <p className="text-xs font-semibold">{totalResults} results</p>

      <div className="flex">
        <button
          type="button"
          className="mr-2"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <img className="w-3 h-3" src={ArrowLeft} alt="left" />
        </button>

        {pageArray.map((pageNumber) => (
          <button
            key={pageNumber}
            className="mx-2 w-2"
            type="button"
            onClick={() => onPageChange(pageNumber)}
          >
            <p
              className={`text-xs ${
                pageNumber === currentPage
                  ? "text-primary"
                  : "text-neutral-500"
              }`}
            >
              {pageNumber}
            </p>
          </button>
        ))}

        <button
          type="button"
          className="ml-2"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <img className="w-3 h-3" src={ArrowRight} alt="right" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
