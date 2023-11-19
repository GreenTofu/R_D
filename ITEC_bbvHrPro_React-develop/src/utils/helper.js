import { isEmpty } from "lodash";

import axios from "api/axios";

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

const getFullname = (user) => {
  if (isEmpty(user)) return "";

  return `${user?.firstName} ${user?.lastName}`;
};

const getReviewStatusStyle = (status) => {
  const commonStyle = "py-1.5 px-2 rounded-full text-xs";

  const statusList = {
    Evaluating: `${commonStyle} bg-warning-100 text-warning-500`,
    "In Finalizing": `${commonStyle} bg-primary-100 text-primary-500`,
    Completed: `${commonStyle} bg-success-100 text-success-700`,
  };

  return statusList[status];
};

export { getFullname, setAuthHeader, getReviewStatusStyle };
