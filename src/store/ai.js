import { defineStore } from "pinia";
import { api } from "@/http/api.js";

export const useAIStore = defineStore("ai", {
  state: () => ({
    token: null,
    user: null,
  }),

  actions: {
    async getResponse(prompt) {
      try {
        const response = await api.post("/get-chatgpt-response", {
          prompt,
        });
        return response;

        // You may want to store the token in a secure way (e.g., localStorage) for persistent login
      } catch (error) {
        // Handle login error
        console.error("Login error:", error);
        throw error;
      }
    },
  },
});
