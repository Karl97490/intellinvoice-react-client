import Service from "./index.service";

class ItemService extends Service {
  constructor(urlPrefixe) {
    super();
    this.urlPrefixe = urlPrefixe;
  }

  // GET /api/items/
  getAllItems = () => {
    return this.service.get(this.urlPrefixe + `/`);
  };

  // POST /api/items/
  createItem = (requestBody) => {
    return this.service.post(this.urlPrefixe + `/`, requestBody);
  };

  // PATCH /api/items/:itemId
  updateItem = (id, requestBody) => {
    return this.service.patch(this.urlPrefixe + `/${id}`, requestBody);
  };

  // DELETE /api/items/:itemId
  deleteItem = (id) => {
    return this.service.delete(this.urlPrefixe + `/${id}`);
  };
}

const itemService = new ItemService("/items");

export default itemService;
