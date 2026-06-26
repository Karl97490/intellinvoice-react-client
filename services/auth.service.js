import Service from "./index.service";

class AuthService extends Service {
  verify = () => {
    return this.service.get("/api/auth/verify");
  };
}

const authService = new AuthService();

export default authService;
