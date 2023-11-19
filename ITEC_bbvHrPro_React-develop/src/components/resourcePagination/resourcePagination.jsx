import React from "react";

import leftIcon from "assets/icons/arrow-left.png";
import rightIcon from "assets/icons/arrow-right.png";

const ResourcePagination = ({
  currentPage,
  totalPage,
  setCurrentPage,
}) => {
  return (
    <div className="mx-auto flex flex-wrap justify-center items-center text-neutral-500">
      <ul className="flex items-center justify-center">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="p-1 mr-3 rounded-full cursor-pointer h-8 w-8 flex items-center justify-center"
        >
          <img className="w-4" src={leftIcon} alt="back-icon" />
        </button>

        {totalPage &&
          [...Array(totalPage).keys()].map((page) => (
            <button
              key={`page-${page + 1}`}
              type="button"
              onClick={() => setCurrentPage(page + 1)}
              className={`p-1 mr-3 rounded-full ${
                page + 1 === currentPage
                  ? "bg-primary text-white"
                  : "bg-white text-neutral"
              } text-xs h-8 w-8 flex items-center justify-center hover:bg-primary-300 hover:text-white`}
            >
              {page + 1}
            </button>
          ))}

        <button
          type="button"
          disabled={currentPage >= totalPage}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="p-1 mr-3 rounded-full cursor-pointer h-8 w-8 flex items-center justify-center hover:text-white"
        >
          <img className="w-4" src={rightIcon} alt="next-icon" />
        </button>
      </ul>
    </div>
  );
};

export default ResourcePagination;
