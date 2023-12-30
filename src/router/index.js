import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue"
import Dashboard from "@/views/Dashboard.vue"
import AllDemos from "@/views/AllDemos.vue";
import Assistant from "@/views/Assistant"

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/demos",
    name: "AllDemos",
    component: AllDemos,
  },
  {
    path: "/assist",
    name: "Assistant",
    component: Assistant,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
