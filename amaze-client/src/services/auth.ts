// Re-export all auth-related functions and types from the main API service
export { loginUser, registerUser, getCurrentUser } from './api';
export type { User, AuthResponse } from './api';
