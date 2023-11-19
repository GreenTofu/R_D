import React from "react";

import ErrorMessage from "components/errorMessage";

const InputField = ({
  label,
  insideLabel,
  type = "text",
  name,
  icon,
  placeholder,
  register,
  validator,
  initialValue,
  isEditable,
  className = "",
  error,
}) => {
  return (
    <>
      <div
        className={insideLabel && "relative flex items-center mt-4"}
      >
        {insideLabel && (
          <p className="absolute top-2 left-3 text-[10px] text-gray-600 font-bold pointer-events-none">
            {insideLabel}
          </p>
        )}

        {label && (
          <h1 className="text-neutral-900 text-sm font-bold mb-1.5">
            {label}
          </h1>
        )}

        <input
          disabled={!isEditable}
          name={name}
          type={type}
          defaultValue={initialValue || null}
          placeholder={placeholder}
          {...(isEditable && { ...register(name, validator) })}
          className={`w-full rounded-md border bg-white text-sm px-3
          ${insideLabel && "pr-9 pt-6 pb-2"}
          ${label ? "h-12 py-6" : "py-3"}
          ${className}
        `}
        />

        {icon && (
          <img
            className="absolute right-3 w-5 h-5"
            src={icon}
            alt="icon"
          />
        )}
      </div>

      <ErrorMessage message={error} />
    </>
  );
};

export default InputField;
