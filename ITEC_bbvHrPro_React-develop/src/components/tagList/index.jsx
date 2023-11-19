import React from "react";

import PlusIcon from "assets/icons/plus.png";

import TagBox from "./tagBox";

const TagList = ({ fields, register, append, remove }) => {
  return (
    <div className="w-80 flex flex-wrap">
      {fields.map((field, index) => (
        <TagBox
          key={field.id}
          index={index}
          register={register}
          onRemove={() => remove(index)}
        />
      ))}

      <button
        className="flex items-center border border-neutral-500 rounded px-1.5 py-1.5 mb-3"
        type="button"
        onClick={() => append()}
      >
        <p className="text-xs text-neutral-500 mr-1">Add</p>
        <img className="w-3" src={PlusIcon} alt="plus" />
      </button>
    </div>
  );
};

export default TagList;
