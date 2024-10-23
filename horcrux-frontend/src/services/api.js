// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/links";

export const getLinks = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const getArchivedLinks = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const createLink = async (link) => {
  const response = await axios.post(`${API_URL}`, link);
  return response.data;
};

export const updateLink = async (id, link) => {
  const response = await axios.put(`${API_URL}/${id}`, link);
  return response.data;
};

export const deleteLink = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getLinkById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getUniqueTags = async (id) => {
  const response = await axios.get(`${API_URL}/tags/unique`);
  return response.data;
};
