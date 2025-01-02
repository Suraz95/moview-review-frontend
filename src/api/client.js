import axios from "axios";


const runtimeConfig = window.__RUNTIME_CONFIG__ || {};
const baseURL = runtimeConfig.VITE_BASE_URL || "http://localhost:3000/api";

const client = axios.create({
  baseURL: `${baseURL}/api`,
});



export default client;
