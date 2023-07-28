import { createRouter, createWebHistory } from 'vue-router'
import List from '../views/ChatList.vue'
import Chat from '../views/ChatPage.vue'
import Login from '../views/LoginPage.vue'

const routes = [
  {
    path: '/',
    component: List
  },
  {
    path: '/chats/:id',
    component: Chat
  },
  {
    path: '/login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
