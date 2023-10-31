import axios from 'axios';
import { useAuthStore } from '@/stores/userAuthStore.js';

class WebSiteService {
  constructor() {
    let service = axios.create({ baseURL: 'http://localhost:3000' });
    this.service = service;
    const authStore = useAuthStore();
    if (authStore.isAuthenticated) {
      this.service.interceptors.request.use(
        (config) => {
          const token = authStore.getToken;
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log(config);
          }
          return config;
        },
        (error) => Promise.reject(error)
      );
    }
  }

  getWebSites() {
    return new Promise((resolve, reject) => {
      this.service
        .get('/sites')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getWebSite(id) {
    return new Promise((resolve, reject) => {
      this.service
        .post('/sites', id)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  createWebSite(payload) {
    return new Promise((resolve, reject) => {
      this.service
        .post('/sites', payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  updateWebSite(id, newFields) {
    return new Promise((resolve, reject) => {
      this.service
        .patch(`/sites/${id}`, newFields)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  deleteWebSite(id) {
    return new Promise((resolve, reject) => {
      this.service
        .delete(`/sites/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default new WebSiteService();
