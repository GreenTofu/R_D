import React, { useEffect } from "react";

const Modal = ({ children, open, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "initial";
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed z-50 top-0 left-0 h-screen w-full bg-neutral-900 bg-opacity-50 flex justify-center items-center"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        className="max-h-[95%] overflow-auto rounded-md shadow-md"
        role="presentation"
        id="hide-scrollbar"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
