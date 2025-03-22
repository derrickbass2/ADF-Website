// src/services/apiService.ts
import axios from 'axios';

const BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || 'https://api.adaptivedatafusion.com';

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

