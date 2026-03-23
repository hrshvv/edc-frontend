// Helper export map representing Dev 3 admin endpoints. 
// Uses mock endpoints if REAL flag is disabled, seamlessly transitioning.

import api from './api';
import { adminMock } from './mock/adminMock';

const USE_MOCK = true; // Switch this to false when Dev 1 finishes the real backend APIs

export const adminService = {
  getDashboardStats: async () => {
    if (USE_MOCK) return adminMock.getDashboardStats();
    const { data } = await api.get('/admin/events/stats');
    return data;
  },
  
  getEventDetails: async (slug) => {
    if (USE_MOCK) return adminMock.getEventDetails(slug);
    const { data } = await api.get(`/admin/events/${slug}`);
    return data;
  },

  getRegistrations: async (slug) => {
    if (USE_MOCK) return adminMock.getRegistrations(slug);
    const { data } = await api.get(`/admin/events/${slug}/registrations`);
    return data;
  },

  getSubmissions: async (slug) => {
    if (USE_MOCK) return adminMock.getSubmissions(slug);
    const { data } = await api.get(`/admin/events/${slug}/submissions`);
    return data;
  },

  getLeaderboard: async (slug) => {
    if (USE_MOCK) return adminMock.getLeaderboard(slug);
    const { data } = await api.get(`/admin/events/${slug}/leaderboard`);
    return data;
  },

  getEventSettings: async (slug) => {
    if (USE_MOCK) return adminMock.getEventSettings(slug);
    const { data } = await api.get(`/admin/events/${slug}/settings`);
    return data;
  },

  updateEventSettings: async (slug, payload) => {
    if (USE_MOCK) return adminMock.updateEventSettings(slug, payload);
    const { data } = await api.patch(`/admin/events/${slug}/settings`, payload);
    return data;
  }
};
