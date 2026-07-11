import { create } from 'zustand';
import api from '../utils/api';

export const usePropertyStore = create((set, get) => ({
  properties: [],
  currentProperty: null,
  loading: false,
  error: null,

  fetchProperties: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.propertyType) params.append('propertyType', filters.propertyType);
      if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);

      const response = await api.get(`/properties?${params.toString()}`);
      set({ properties: response.data.data, loading: false });
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch properties.';
      set({ error: msg, loading: false });
    }
  },

  fetchPropertyById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/properties/${id}`);
      set({ currentProperty: response.data.data, loading: false });
      return response.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch property details.';
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  createProperty: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const newProperty = response.data.data;
      set((state) => ({
        properties: [newProperty, ...state.properties],
        loading: false,
      }));
      return newProperty;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to create property listing.';
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },
}));
