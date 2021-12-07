import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/auth'
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../components/Auth')
  },
  {
    path: '/feed',
    name: 'feed',
    component: () => import('../views/Feed')
  },
  {
    path: '/card-location/:id',
    name: 'card-location',
    props: true,
    component: () => import('../views/CardLocation')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
