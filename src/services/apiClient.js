// src/services/apiClient.js

import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.HEADERS,
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        // const token = await AsyncStorage.getItem('authToken');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
      },
      (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
      },
      (error) => {
        if (error.response) {
          // Server responded with error
          console.error('Response Error:', error.response.status, error.response.data);
          
          switch (error.response.status) {
            case 401:
              // Handle unauthorized
              console.log('Unauthorized - redirect to login');
              break;
            case 404:
              console.log('Resource not found');
              break;
            case 500:
              console.log('Server error');
              break;
          }
        } else if (error.request) {
          // Request made but no response
          console.error('Network Error:', error.message);
        } else {
          console.error('Error:', error.message);
        }
        
        return Promise.reject(error);
      }
    );
  }

  async get(url, config) {
    const response = await this.client.get(url, config);
    return response.data;
  }

  async post(url, data, config) {
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  async put(url, data, config) {
    const response = await this.client.put(url, data, config);
    return response.data;
  }

  async patch(url, data, config) {
    const response = await this.client.patch(url, data, config);
    return response.data;
  }

  async delete(url, config) {
    const response = await this.client.delete(url, config);
    return response.data;
  }
}

export default new ApiClient();