import axios from "axios";

class Service {
  constructor(api) {
    this.service = axios.create({
      baseURL: import.meta.env.VITE_API_URL || " http://localhost:5005",
    });

    this.service.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { authorization: storedToken };
      }
      return config;
    });
  }

  test = () => {
    return this.service.get("/");
  };
}

export default Service;
