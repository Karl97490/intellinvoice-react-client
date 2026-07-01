import Service from "./index.service";

class UserService extends Service {
  constructor(urlPrefixe) {
    super();
    this.urlPrefixe = urlPrefixe;
  }

  // GET /api/users/:userId
  getClient = (id) => {
    return this.service.get(this.urlPrefixe + `/${id}`);
  };

  // PATCH /api/users/:userId
  updateUserInfos = (id, requestBody) => {
    return this.service.patch(this.urlPrefixe + `/${id}`, requestBody);
  };

  // PATCH /api/users/password/:userId
  updateUserPassword = (id, requestBody) => {
    return this.service.patch(this.urlPrefixe + `/password/${id}`, requestBody);
  };

  // DELETE /api/users/:userId
  deleteUser = (id) => {
    return this.service.delete(this.urlPrefixe + `/${id}`);
  };
}

const userService = new UserService("/users");

export default userService;
