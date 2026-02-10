import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

export const postBfhl = (payload) => api.post("/bfhl", payload);
export const getHealth = () => api.get("/health");
