// src/utils/formatters.ts
export const formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  export const truncateText = (text: string, maxLength: number = 100): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // src/utils/validation.ts
  export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validatePassword = (password: string): boolean => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  };
  
  // src/utils/localStorage.ts
  export const localStorageUtil = {
    set(key: string, value: any) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error saving to localStorage', error);
      }
    },
  
    get(key: string) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('Error reading from localStorage', error);
        return null;
      }
    },
  
    remove(key: string) {
      localStorage.removeItem(key);
    }
  };
  
  // src/utils/errorHandler.ts
  export class ApiError extends Error {
    status?: number;
    
    constructor(message: string, status?: number) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
    }
  }
  
  export const handleApiError = (error: any) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('API Error Response:', error.response.data);
      return new ApiError(error.response.data.message, error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      return new ApiError('No response from server');
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
      return new ApiError('Error processing request');
    }
  };