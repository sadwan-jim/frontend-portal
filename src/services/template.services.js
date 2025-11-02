
import BaseService from "./base.service";

class TemplateService extends BaseService {
  constructor() {
    super("/api/FormTemplates");
  }
}

export default new TemplateService();
