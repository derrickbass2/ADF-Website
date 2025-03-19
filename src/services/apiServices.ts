// src/services/apiService.ts
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.adaptivedatafusion.com';

export const apiService = {
  async get(endpoint: string, params?: any) {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
      return response.data;
    } catch (error) {
      console.error(`API GET Error at ${endpoint}:`, error);
      throw error;
    }
  },

  async post(endpoint: string, data: any) {
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`API POST Error at ${endpoint}:`, error);
      throw error;
    }
  }
};

// src/services/researchService.ts
import { apiService } from './apiService';

export const researchService = {
  async getResearchProjects() {
    return apiService.get('/research/projects');
  },

  async getPublicationDetails(publicationId: string) {
    return apiService.get(`/research/publications/${publicationId}`);
  }
};

// src/services/authService.ts
import { apiService } from './apiService';

export const authService = {
  async login(email: string, password: string) {
    return apiService.post('/auth/login', { email, password });
  },

  async logout() {
    return apiService.post('/auth/logout', {});
  }
};