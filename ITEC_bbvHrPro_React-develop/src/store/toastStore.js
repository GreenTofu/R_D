import create from "zustand";

const useToastStore = create((set) => ({
  isOpen: false,
  state: "success",
  message: "Your action has been submitted",

  openSuccessfulToast: (
    message = "Your action has been submitted"
  ) => {
    set({ isOpen: true, state: "success", message });
  },

  openErrorToast: (message = "Something went wrong") => {
    set({ isOpen: true, state: "error", message });
  },

  closeToast: () => {
    set({ isOpen: false });
  },
}));

export default useToastStore;
