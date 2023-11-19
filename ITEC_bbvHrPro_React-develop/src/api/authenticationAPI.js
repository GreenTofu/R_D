import axios from "./axios";

const signIn = async (email, password) => {
  const response = await axios.post(`authentication/signIn`, {
    email,
    password,
  });

  return response;
};

const verifyUser = async () => {
  const response = await axios.get(`/users/auth`);

  return response;
};

const authenticationAPI = {
  signIn,
  verifyUser,
};

export default authenticationAPI;
