import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CharacterPage from '@/views/CharacterPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/character/:id',
      name: 'character',
      component: CharacterPage
    }
  ]
})

export default router
