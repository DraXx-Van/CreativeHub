import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const ENDPOINT = `${API}/api/movies`;

export const getMovies = async () => {
  const response = await axios.get(ENDPOINT);
  return response.data.result;
};

export const getMovieById = async (id) => {
  const response = await axios.get(`${ENDPOINT}/${id}`);
  return response.data.result;
};