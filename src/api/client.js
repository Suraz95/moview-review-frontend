import axios from "axios";


const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : "http://localhost:3000/api",
});

export default client;
