export const localStorageUtils = {
    // Generic method to set an item in localStorage
    set<T>(key: string, value: T): void {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        throw new Error('Failed to save data to local storage');
      }
    },
  
    // Generic method to get an item from localStorage
    get<T>(key: string): T | null {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
      }
    },
  
    // Remove a specific item from localStorage
    remove(key: string): void {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    },
  
    // Clear all items from localStorage
    clear(): void {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    },
  
    // Check if an item exists in localStorage
    has(key: string): boolean {
      return localStorage.getItem(key) !== null;
    },
  
    // Store authentication token
    setAuthToken(token: string): void {
      this.set('authToken', token);
    },
  
    // Retrieve authentication token
    getAuthToken(): string | null {
      return this.get('authToken');
    },
  
    // Remove authentication token
    removeAuthToken(): void {
      this.remove('authToken');
    }
  };