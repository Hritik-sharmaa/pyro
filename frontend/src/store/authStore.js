import { create } from "zustand";
const API_URL = "http://localhost:3000/api/auth";

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  register: async (firstName, lastName, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await response.json();
      //console.log(data);
      set({ isLoading: false, isAuthenticated: true, user: data.user });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.log(error);
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      set({ isLoading: false, isAuthenticated: true, user: data.user });
    } catch (err) {
      set({ isLoading: false, error: err.message });
      console.log(err);
      throw err;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      set({ isLoading: false, isAuthenticated: true, user: data.user });
    } catch (err) {
      set({ isLoading: false, error: err.message });
      console.log(err);
      throw err;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log(data);
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.log(error);
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
        const response = await fetch(`${API_URL}/reset-password/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ password }),
        })
        const data = await response.json();
        set({ isLoading: false, message: data.message });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.log(error);
      throw error;
    }
  },

}));
