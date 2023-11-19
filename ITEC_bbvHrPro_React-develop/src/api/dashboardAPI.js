import axios from "api/axios";

const getStatistic = async () => {
    const response = await axios.get("resources/statistic");

    return response;
};

const getAvailability = async (page = 1) => {
    const response = await axios.get("resources/available", {
      params: { page },
    });

    return response;
};

const getActiveProjects = async (page = 1) => {
    const response = await axios.get("resources/activeProjects", {
      params: { page },
    });

    return response;
};

const getUpcomingResources = async () => {
    const response = await axios.get("resources/upcoming");

    return response;
};

const dashboardAPI = {
  getStatistic,
  getAvailability,
  getActiveProjects,
  getUpcomingResources,
};

export default dashboardAPI;
