import { defineStore } from "pinia";
import { api } from "@/http/api.js";

export const useDemoStore = defineStore("demo", {
  state: () => ({
    token: null,
    user: null,
  }),

  actions: {
    async fetchAllDemos(val) {
      try {
        const response = await api.get(`/calendly?page=${val}`);
        return response.data;

        // You may want to store the token in a secure way (e.g., localStorage) for persistent login
      } catch (error) {
        // Handle login error
        console.error("Login error:", error);
        throw error;
      }
    },
  },
});
