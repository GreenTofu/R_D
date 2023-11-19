import React from "react";

import CriteriaItem from "./criteriaItem";

const CriteriaList = ({ criteriaData, register }) => {
  return (
    <>
      <h1 className="text-xl font-bold text-neutral-900">
        Set Criterias
      </h1>

      {criteriaData.map((part, partIndex) => (
        <div key={part.id}>
          <p className="mt-6 text-base text-neutral-700 font-bold">
            Part {part.partNumber}: {part.partName}
          </p>

          {part.criteria.map((criteria, criteriaIndex) => {
            return (
              <CriteriaItem
                key={criteria.id}
                partIndex={partIndex}
                criteriaIndex={criteriaIndex}
                name={criteria.name}
                register={register}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

export default CriteriaList;
