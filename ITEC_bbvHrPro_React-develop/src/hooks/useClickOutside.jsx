import { useEffect, useRef, useState } from "react";

const useClickOutside = () => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    )
      setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
  }, []);

  return { open, setOpen, dropdownRef };
};

export default useClickOutside;
