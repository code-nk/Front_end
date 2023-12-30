import { defineStore } from "pinia";
import { api } from "@/http/api.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    user: null,
  }),

  actions: {
    async login({ email, password }) {
      try {
        const response = await api.post("/login", { email, password });
        const { token, user } = response.data;

        this.token = token;
        this.user = user;
        return response.data;

        // You may want to store the token in a secure way (e.g., localStorage) for persistent login
      } catch (error) {
        // Handle login error
        console.error("Login error:", error);
        throw error;
      }
    },

    async register({ email, password, name }) {
      try {
        const response = await api.post("/register", { email, password, name });
        const { token, user } = response.data;

        this.token = token;
        this.user = user;

        // You may want to store the token in a secure way (e.g., localStorage) for persistent login
      } catch (error) {
        // Handle registration error
        console.error("Registration error:", error);
        throw error;
      }
    },

    logout() {
      // Clear token and user data
      this.token = null;
      this.user = null;

      // You may want to remove the token from storage for logout
    },
  },
});
