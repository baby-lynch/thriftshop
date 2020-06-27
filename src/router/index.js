import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Feedback from '../views/Feedback.vue'
import Shop from '../views/Shop.vue'
import Item from '../views/Item.vue'
import Purchase from '../views/Purchase.vue'
import Checkout from '../views/Checkout.vue'
import Account from '../views/Account.vue'
import MyStall from '../views/account/stall/MyStall.vue'
import MyBargain from '../views/account/stall/MyBargain.vue'
import Profile from '../views/account/information/Profile.vue'
import Password from '../views/account/information/Password.vue'
import Address from '../views/account/information/Address.vue'
import Sell from '../views/account/transaction/Sell.vue'
import Success from '../views/account/transaction/Success.vue'
import Order from '../views/account/transaction/Order.vue'
import Detail from '../views/account/transaction/Detail.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

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
    path: '/feedback',
    name: 'feedback',
    component: Feedback
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
  },
  {
    path: '/account',
    name: 'account',
    redirect: '/mystall',
    component: Account,
    children: [
      { path: '/mystall', name: 'mystall', component: MyStall },
      { path: '/mybargain', name: 'mybargain', component: MyBargain },
      { path: '/profile', name: 'profile', component: Profile },
      { path: '/password', name: 'password', component: Password },
      { path: '/address', name: 'address', component: Address },
      { path: '/sell', name: 'sell', component: Sell },
      { path: '/success', name: 'success', component: Success },
      { path: '/order', name: 'order', component: Order },
      { path: '/detail', name: 'detail', component: Detail }
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router
