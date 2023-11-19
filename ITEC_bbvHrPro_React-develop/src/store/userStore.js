import create from "zustand";

import authenticationAPI from "api/authenticationAPI";
import { setAuthHeader } from "utils/helper";

const useUserStore = create((set) => ({
  user: null,

  signInAction: async (data) => {
    const response = await authenticationAPI.signIn(
      data.email,
      data.password
    );

    const { user, token } = response.data;

    set({ user });

    localStorage.setItem("token", token);
    setAuthHeader(token);
  },

  signOutAction: () => {
    set({ user: null });

    localStorage.removeItem("token");
    setAuthHeader(null);
  },

  setUserAction: (user) => set({ user }),
}));

export default useUserStore;
