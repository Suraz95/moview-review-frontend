import axios from "axios";

console.log(`${import.meta.env.VITE_BASE_URL}`)

const client = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
});

export default client;
