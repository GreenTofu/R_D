import create from "zustand";

import goalAPI from "api/goalAPI";

const useGoalStore = create((set, get) => ({
  statusList: [],

  fetchStatusList: async () => {
    const { data } = await goalAPI.getStatusList();

    set({ statusList: data.goalStatus });
  },

  getStatus: ({ id, name }) => {
    const requestStatus = get().statusList.find(
      (status) => status.name === name || status.id === id
    );

    return requestStatus;
  },
}));

export default useGoalStore;
