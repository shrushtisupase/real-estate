import { create } from 'zustand';
import api from '../utils/api';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, ...userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      set({ user: userData, token, loading: false });
      return userData;
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed. Please verify credentials.';
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  register: async (name, email, password, phone, role) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/register', { name, email, password, phone, role });
      const { token, ...userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      set({ user: userData, token, loading: false });
      return userData;
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed.';
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, error: null });
  },

  clearError: () => set({ error: null }),
}));
