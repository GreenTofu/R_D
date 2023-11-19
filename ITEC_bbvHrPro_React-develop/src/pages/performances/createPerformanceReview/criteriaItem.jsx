import React from "react";

const CriteriaItem = ({
  partIndex,
  criteriaIndex,
  name,
  register,
}) => {
  const criteriaRegister = `criterias[${partIndex}].criteria[${criteriaIndex}].defaultWeight`;

  return (
    <div className="mt-2.5 w-80 flex bg-white border rounded-lg pt-3.5 pb-2.5 px-2">
      <div className="flex pb-1 border-b border-neutral-500 mr-5">
        <input
          className="w-6 text-xs text-neutral-900 text-center"
          type="number"
          {...register(criteriaRegister, {
            required: true,
          })}
        />
        <p className="mt-[1px] mr-1 text-xs text-neutral-900 pointer-events-none">
          %
        </p>
      </div>

      <p className="mb-1 text-sm text-neutral-900">{name}</p>
    </div>
  );
};

export default CriteriaItem;
