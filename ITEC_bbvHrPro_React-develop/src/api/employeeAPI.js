import axios from "api/axios";

const getList = async ({
  page = 1,
  filter = "name",
  search,
  limit = 10,
}) => {
  const response = await axios.get("users", {
    params: { page, filter, search, limit },
  });

  return response;
};

const getEditInfo = async () => {
  const response = await axios.get(`users/editInfo`);

  return response;
};

const getProfile = async (id) => {
  const response = await axios.get(`users/${id}`);

  return response;
};

const updateProfile = async (id, updateInfo) => {
  const response = await axios.put(`users/${id}`, updateInfo);

  return response;
};

const createEmployee = async (empData) => {
  const response = await axios.post("users", empData);

  return response;
};

const getCandidateList = async ({
  page = 1,
  filter = "name",
  search,
  limit = 8,
}) => {
  const response = await axios.get("users/candidates", {
    params: { page, filter, search, limit },
  });

  return response;
};

const employeeAPI = {
  getList,
  getEditInfo,
  getProfile,
  updateProfile,
  getCandidateList,
  createEmployee,
};

export default employeeAPI;
