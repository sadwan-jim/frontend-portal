
import BaseService from "./base.service";

class SupplierContactService extends BaseService {
  constructor() {
    super("/api/SupplierContacts");
  }
}

export default new SupplierContactService();
