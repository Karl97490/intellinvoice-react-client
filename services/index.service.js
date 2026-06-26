import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL || " http://localhost:5005",
});

service.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("authToken");
  if (storedToken) {
    config.headers = { authorization: storedToken };
    console.log(config);
  }
  return config;
});

export { service };
