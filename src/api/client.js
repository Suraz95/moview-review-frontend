import axios from "axios";


const client = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api || http://13.60.25.3:8000/api`,
});


export default client;
