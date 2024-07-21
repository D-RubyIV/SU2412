import axios from "axios";

class Http {
  api: any;

  constructor() {
    this.api = axios.create({
      baseURL: `http://localhost:8080/`,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.response.use(
      (res: any) => res,
      (err: any) => Promise.reject(err)
    );
  }

  async get(url: string, params?: any) {
    try {
      const response = await this.api.get(url, { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
    }
  }

  async post(url: string, data: any) {
    try {
      const response = await this.api.post(url, data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
    }
  }

  async update(url: string, data: any) {
    try {
      const response = await this.api.put(url, data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
    }
  }

  async patch(url: string, data: any) {
    try {
      const response = await this.api.patch(url, data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
    }
  }

  async delete(url: string, id: any) {
    try {
      const response = await this.api.delete(`${url}/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
    }
  }
}

export default Http;
