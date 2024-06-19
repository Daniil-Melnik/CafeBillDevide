import { createRouter, createWebHashHistory } from 'vue-router'
import ListChecks from '../components/ListChecks.vue'
import CafeView from '../components/CafeView.vue'
import ListPersons from '../components/ListPersons.vue'
import ListRelat from '../components/ListRelat.vue'

const routes = [
  {
    path: '/',
    name: 'ListChecks',
    component: ListChecks
  },
  {
    path: '/lsPers',
    name: 'ListPersons',
    component: ListPersons
  },
  {
    path: '/lsRelat',
    name: 'ListRelat',
    component: ListRelat
  },
  {
    path: '/cafe/view',
    name: 'CafeView',
    component: CafeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
