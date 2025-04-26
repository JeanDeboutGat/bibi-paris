/**
 * Standardized API error handling for the application
 */

export class ApiError extends Error {
  status: number;
  code?: string;
  
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export class NetworkError extends ApiError {
  constructor(message = 'Network error. Please check your connection.') {
    super(message, 0);
    this.name = 'NetworkError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource = 'Resource', message?: string) {
    super(message || `${resource} not found.`, 404);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends ApiError {
  fields?: Record<string, string>;
  
  constructor(message = 'Validation error.', fields?: Record<string, string>) {
    super(message, 400);
    this.name = 'ValidationError';
    this.fields = fields;
  }
}

export class AuthenticationError extends ApiError {
  constructor(message = 'Authentication required.') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

/**
 * Handles fetch responses and throws the appropriate error type
 */
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const errorData = await response.json();
      
      // Handle structured error responses
      if (errorData.message) {
        if (response.status === 404) {
          throw new NotFoundError(errorData.resource, errorData.message);
        } else if (response.status === 400 && errorData.fields) {
          throw new ValidationError(errorData.message, errorData.fields);
        } else if (response.status === 401) {
          throw new AuthenticationError(errorData.message);
        } else {
          throw new ApiError(errorData.message, response.status, errorData.code);
        }
      }
      
      throw new ApiError(errorData.message || 'An error occurred', response.status);
    }
    
    // Simple error with status code
    throw new ApiError(`HTTP Error ${response.status}`, response.status);
  }
  
  return response.json();
}

/**
 * Wrapper for fetch that includes error handling
 */
export async function fetchWithErrorHandling<T>(
  url: string, 
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);
    return await handleApiResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof Error && 'message' in error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('Network request failed')) {
        throw new NetworkError();
      }
    }
    
    throw new ApiError('An unexpected error occurred', 500);
  }
}

/**
 * Helper to get a user-friendly error message from any error
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  } else if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred.';
} 