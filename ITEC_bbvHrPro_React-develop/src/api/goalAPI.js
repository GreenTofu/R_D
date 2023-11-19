import axios from "api/axios";

const getGoalList = async (id) => {
  const response = await axios.get(`users/${id}/goals`);

  return response;
};

const getStatusList = async () => {
  const response = await axios.get(`goals/status`);

  return response;
};

const getGoalDetails = async (id) => {
  const response = await axios.get(`goals/${id}`);

  return response;
};

const createGoal = async (goalData) => {
  const response = await axios.post("goals", goalData);

  return response;
};

const updateGoal = async (id, goalData) => {
  const response = await axios.put(`goals/${id}`, goalData);

  return response;
};

const deleteGoal = async (id) => {
  const response = await axios.delete(`goals/${id}`);

  return response;
};

const getManageGoal = async ({
  page = 1,
  filter = "name",
  search,
  limit = 8,
}) => {
  const response = await axios.get("goals/manage", {
    params: { page, filter, search, limit },
  });

  return response;
};

const approveGoal = async (goalID) => {
  const response = await axios.put(`goals/${goalID}/approve`);

  return response;
};

const getDiscussionList = async (
  goalID,
  { limit, lastViewMessageTimestamp, lastViewMessageID }
) => {
  const response = await axios.get(`goals/${goalID}/discussion`, {
    params: {
      limit,
      timestamp: lastViewMessageTimestamp,
      messageId: lastViewMessageID,
    },
  });

  return response;
};

const sendMessage = async (goalID, message) => {
  const response = await axios.post(`goals/${goalID}/discussion`, {
    message,
  });

  return response;
};

const goalAPI = {
  getGoalList,
  getStatusList,
  getGoalDetails,
  createGoal,
  updateGoal,
  deleteGoal,
  getManageGoal,
  approveGoal,
  getDiscussionList,
  sendMessage,
};

export default goalAPI;
