export class ValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ValidationError';
    }
  }
  
  export const validationUtils = {
    validateEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new ValidationError('Invalid email format');
      }
      return true;
    },
  
    validatePassword(password: string): boolean {
      // Password must be:
      // - At least 8 characters long
      // - Contain at least one uppercase letter
      // - Contain at least one lowercase letter
      // - Contain at least one number
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      
      if (!passwordRegex.test(password)) {
        throw new ValidationError(
          'Password must be at least 8 characters long and contain uppercase, lowercase, and number'
        );
      }
      return true;
    },
  
    validatePhoneNumber(phone: string): boolean {
      // Supports various international phone number formats
      const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      
      if (!phoneRegex.test(phone)) {
        throw new ValidationError('Invalid phone number format');
      }
      return true;
    },
  
    validateRequired(value: any, fieldName: string): boolean {
      if (value === null || value === undefined || value === '') {
        throw new ValidationError(`${fieldName} is required`);
      }
      return true;
    },
  
    validateLength(value: string, min: number, max: number, fieldName: string): boolean {
      if (value.length < min || value.length > max) {
        throw new ValidationError(
          `${fieldName} must be between ${min} and ${max} characters long`
        );
      }
      return true;
    }
  };