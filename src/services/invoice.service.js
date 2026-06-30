import Service from "./index.service";

class InvoiceService extends Service {
  constructor(urlPrefixe) {
    super();
    this.urlPrefixe = urlPrefixe;
  }

  // GET /api/invoices/
  getAllInvoices = (filter = {}) => {
    return this.service.get(this.urlPrefixe + `/`, {
      params: filter,
    });
  };

  // GET /api/invoices/:invoiceId
  getInvoice = (id) => {
    return this.service.get(this.urlPrefixe + `/${id}`);
  };

  // POST /api/invoices/
  createInvoice = (requestBody) => {
    return this.service.post(this.urlPrefixe + `/`, requestBody);
  };

  // PATCH /api/invoices/:invoiceId
  updateInvoice = (id, requestBody) => {
    return this.service.patch(this.urlPrefixe + `/${id}`, requestBody);
  };

  // PATCH /api/invoices/status/:invoiceId
  updateStatusInvoice = (id, requestBody) => {
    return this.service.patch(this.urlPrefixe + `/status/${id}`, requestBody);
  };

  // DELETE /api/invoices/:invoiceId
  deleteInvoice = (id) => {
    return this.service.delete(this.urlPrefixe + `/${id}`);
  };
}

const invoiceService = new InvoiceService("/invoices");

export default invoiceService;
