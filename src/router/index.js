import { createRouter, createWebHistory } from 'vue-router'
import Favorites from'../Pages/Favorites.vue'
import Home from '../Pages/Home.vue'
import Order from '../Pages/Order.vue'
import Account from '../Pages/Account.vue'
import Sinup from '../components/sinup.vue'
import Pagenotfound from '../Pages/Pagenotfound.vue'

const routes = [
  {
    path: '/Home',
    component: Home
  },
  {
    path: '/Favorites',
    component: Favorites
  },
  {
    path: '/Order',
    component: Order
  },
  {
    path: '/Account',
    component: Account
  },
  {
    path: '/Sinup',
    component: Sinup
  },
  {
  path: '/:pathMatch(.*)*',
  component: Pagenotfound
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router