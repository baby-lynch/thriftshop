import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Shop from '../views/Shop.vue'
import Item from '../views/Item.vue'
import Purchase from '../views/Purchase.vue'
import Checkout from '../views/Checkout.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop
  },
  {
    path: '/item',
    name: 'item',
    component: Item
  },
  {
    path: '/purchase',
    name: 'purchase',
    component: Purchase
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout
  }
]
const router = new VueRouter({
  routes
})

export default router
