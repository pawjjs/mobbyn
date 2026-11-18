import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
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
