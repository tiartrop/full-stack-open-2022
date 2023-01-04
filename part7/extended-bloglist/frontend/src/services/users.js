import axios from "axios";
const baseUrl = "/api/users";

const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then((response) => response.data);
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

export default { getAll, getById, create };