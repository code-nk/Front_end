import { defineStore } from "pinia";
import { api } from "@/http/api.js";

export const useVisitorStore = defineStore("visitor", {
  state: () => ({
    token: null,
    user: null,
  }),

  actions: {
    async visitorStats(rangeOne, rangeTwo) {
      try {
        const response = await api.post("/visitor-stats", {rangeOne, rangeTwo});
        return response;

        // You may want to store the token in a secure way (e.g., localStorage) for persistent login
      } catch (error) {
        // Handle login error
        console.error("Login error:", error);
        throw error;
      }
    },

  }
});
