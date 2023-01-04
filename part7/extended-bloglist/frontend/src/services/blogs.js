import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then((response) => response.data);
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (updateObject, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, updateObject);
  return response.data;
};

const del = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`,config);
  return response.data;
};

const addComment = async (comment, id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment);
  return response.data;
};

export default { getAll, getById, create, update, del, addComment, setToken };