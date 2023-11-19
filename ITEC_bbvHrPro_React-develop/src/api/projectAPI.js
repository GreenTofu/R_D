import axios from "api/axios";

const getList = async ({
  page = 1,
  limit = 10,
  filter = "name",
  search,
}) => {
  const response = await axios.get("projects", {
    params: { page, limit, filter, search },
  });

  return response;
};

const getDetails = async (id) => {
  const response = await axios.get(`projects/${id}`);

  return response;
};

const update = async (id, updateInfo) => {
  const response = await axios.put(`projects/${id}`, updateInfo);

  return response;
};

const createProject = async (newProject) => {
  const response = await axios.post("projects", newProject);

  return response;
};

const getStatusList = async () => {
  const response = await axios.get("projects/status");

  return response;
};

const projectAPI = {
  getList,
  getDetails,
  update,
  createProject,
  getStatusList,
};

export default projectAPI;
