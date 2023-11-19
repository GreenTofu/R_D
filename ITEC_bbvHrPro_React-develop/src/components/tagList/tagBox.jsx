import React from "react";

import RemoveTagIcon from "assets/icons/remove-tag.png";

const TagBox = ({ index, register, onRemove }) => {
  return (
    <div className="relative mr-3 mb-3">
      <input
        className="text-xs w-16 text-center border border-neutral-500 rounded px-1.5 py-1.5"
        type="text"
        {...register(`tags.${index}`)}
      />

      <button type="button" onClick={onRemove}>
        <img
          className="w-5 absolute -top-2 -right-2"
          src={RemoveTagIcon}
          alt="remove-button"
        />
      </button>
    </div>
  );
};

export default TagBox;
