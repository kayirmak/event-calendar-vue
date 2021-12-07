import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import CreateEvent from '../components/Events/CreateEvent.vue';
import Login from '../components/Auth/Login.vue';
import Register from '../components/Auth/Register.vue';
import EventsList from '../components/Events/EventsList.vue';
import EventDetails from '../components/Events/EventDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-event',
    name: 'CreateEvent',
    component: CreateEvent
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/events-list',
    name: 'EventsList',
    component: EventsList
  },
  {
    path: '/event-details/:id?',
    props: true,
    name: 'EventDetails',
    component: EventDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
