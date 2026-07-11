import { create } from 'zustand';
import api from '../utils/api';

export const useLeadStore = create((set, get) => ({
  leads: [],
  adminAgents: [],
  revenue: { totalRevenue: 0, totalClosedLeads: 0 },
  loading: false,
  error: null,

  fetchLeads: async (status = '') => {
    set({ loading: true, error: null });
    try {
      const url = status ? `/leads?status=${status}` : '/leads';
      const response = await api.get(url);
      set({ leads: response.data.data, loading: false });
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch leads.';
      set({ error: msg, loading: false });
    }
  },

  createLead: async (leadData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/leads', leadData);
      set({ loading: false });
      return response.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to request site visit.';
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  updateLeadStatus: async (id, status) => {
    // Optimistic update
    const previousLeads = [...get().leads];
    const updatedLeads = previousLeads.map((l) =>
      l._id === id ? { ...l, status } : l
    );
    set({ leads: updatedLeads });

    try {
      const response = await api.patch(`/leads/${id}/status`, { status });
      // Update with server response
      set((state) => ({
        leads: state.leads.map((l) => (l._id === id ? response.data.data : l)),
      }));
    } catch (error) {
      // Revert on error
      set({ leads: previousLeads });
      const msg = error.response?.data?.message || 'Failed to update status.';
      set({ error: msg });
      throw new Error(msg);
    }
  },

  updateLeadDetails: async (id, details) => {
    set({ loading: true, error: null });
    try {
      const response = await api.patch(`/leads/${id}`, details);
      const updatedLead = response.data.data;
      set((state) => ({
        leads: state.leads.map((l) => (l._id === id ? { ...l, ...updatedLead } : l)),
        loading: false,
      }));
      return updatedLead;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update details.';
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  fetchRevenue: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/admin/revenue');
      set({ revenue: response.data.data, loading: false });
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch analytics.';
      set({ error: msg, loading: false });
    }
  },

  fetchAdminAgents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/admin/agents');
      set({ adminAgents: response.data.data, loading: false });
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch agent list.';
      set({ error: msg, loading: false });
    }
  },

  toggleAgentVerification: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.patch(`/admin/agents/${id}/verify`);
      const updatedAgent = response.data.data;
      set((state) => ({
        adminAgents: state.adminAgents.map((a) =>
          a._id === id ? { ...a, isVerified: updatedAgent.isVerified } : a
        ),
        loading: false,
      }));
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to verify agent.';
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },
}));
