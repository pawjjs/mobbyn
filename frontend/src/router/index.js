import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'
import LoginView from '@/views/auth/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/auth/LoginView.vue")
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import("../views/auth/RegisterView.vue")
  },

  {
    path: '/:pathMatch(.*)*',
    name: "NotFound",
    component: NotFound
  }
]


export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
