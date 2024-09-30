// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import UserLogin from "../components/User-Login.vue"; // Caminho correto
import UserRegister from "../components/User-Register.vue"; // Caminho correto
import Home from "../components/Home-test.vue"; // Caminho correto

const routes = [
  {
    path: "/",
    name: "login",
    component: UserLogin,
  },
  {
    path: "/register",
    name: "register",
    component: UserRegister,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: { requiresAuth: true }, // Proteção de rota
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Verificação de autenticação antes de acessar rotas protegidas
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next({ name: "login" }); // Redireciona para login se não estiver autenticado
  } else {
    next();
  }
});

export default router;
