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
    path: '/locations',
    name: 'locations',
    component: () => import('../views/Locations')
  },
  {
    path: '/card-location/:id',
    name: 'card-location',
    props: true,
    component: () => import('../views/CardLocation')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
