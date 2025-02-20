import axios from "axios";


const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : "http://51.20.71.77:8000/api",
});

export default client;
