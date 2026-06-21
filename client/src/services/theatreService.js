import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const ENDPOINT = `${API}/api/theatres`;

export const getTheatres = async () => {
  const response = await axios.get(ENDPOINT);
  return response.data.result;
};