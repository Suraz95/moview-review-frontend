import axios from "axios";


const client = axios.create({
  baseURL: window.__RUNTIME_CONFIG__?.VITE_BASE_URL
    ? `${window.__RUNTIME_CONFIG__.VITE_BASE_URL}/api`
    : "http://13.60.25.3:8000/api",
});


export default client;
