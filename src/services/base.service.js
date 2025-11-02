import axios from "@/plugins/axios";

export default class BaseService {
  constructor(baseURL) {
    if (!baseURL) {
      throw new Error("BaseService requires a baseURL");
    }
    this.baseURL = baseURL;
  }

  getAll(params = {}) {
    return axios.get(this.baseURL, { params });
  }

  getById(id) {
    return axios.get(`${this.baseURL}/${id}`);
  }

  create(data) {
    return axios.post(this.baseURL, data);
  }

  update(id, data) {
    return axios.put(`${this.baseURL}/${id}`, data);
  }

  delete(id) {
    return axios.delete(`${this.baseURL}/${id}`);
  }
}
