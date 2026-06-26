import Service from "./index.service";

class AuthService extends Service {
  constructor(urlPrefixe) {
    super();
    this.urlPrefixe = urlPrefixe;
  }
  signUp = (requestBody) => {
    return this.service.post(this.urlPrefixe + "/signup", requestBody);
  };
  login = (requestBody) => {
    return this.service.post(this.urlPrefixe + "/login", requestBody);
  };
  verify = () => {
    return this.service.get(this.urlPrefixe + "/verify");
  };
}

const authService = new AuthService("/auth");

export default authService;
