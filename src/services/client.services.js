import Service from "./index.service";

class ClientService extends Service {
  constructor(urlPrefixe) {
    super();
    this.urlPrefixe = urlPrefixe;
  }
  // GET /api/clients/
  getAllClients = (filter = {}) => {
    return this.service.get(this.urlPrefixe + `/`, {
      params: filter,
    });
  };

  // GET /api/clients/:clientId
  getClient = (id) => {
    return this.service.get(this.urlPrefixe + `/${id}`);
  };

  // POST /api/clients/
  createClient = (requestBody) => {
    return this.service.post(this.urlPrefixe + `/`, requestBody);
  };

  // PATCH /api/clients/:clientId
  updateClient = (id, requestBody) => {
    return this.service.patch(this.urlPrefixe + `/${id}`, requestBody);
  };

  // DELETE /api/clients/:clientId
  deleteClient = (id) => {
    return this.service.delete(this.urlPrefixe + `/${id}`);
  };
}

const clientService = new ClientService("/clients");

export default clientService;
