const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Token management
export const getToken = () => localStorage.getItem('token');
export const setToken = (token: string) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

// API helper
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  signUp: (email: string, password: string, name: string) =>
    apiCall('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),

  signIn: (email: string, password: string) =>
    apiCall('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getCurrentUser: () => apiCall('/api/auth/me'),
};

// Notes API
export const notesAPI = {
  getAll: () => apiCall('/api/notes'),

  create: (title: string, content: string) =>
    apiCall('/api/notes', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
    }),

  update: (id: string, title: string, content: string) =>
    apiCall(`/api/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
    }),

  delete: (id: string) =>
    apiCall(`/api/notes/${id}`, {
      method: 'DELETE',
    }),
};

// Profile API
export const profileAPI = {
  get: () => apiCall('/api/profile'),

  update: (bio: string) =>
    apiCall('/api/profile', {
      method: 'PUT',
      body: JSON.stringify({ bio }),
    }),
};
