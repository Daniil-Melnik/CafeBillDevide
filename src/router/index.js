import { createRouter, createWebHashHistory } from 'vue-router'
import ListChecks from '../components/ListChecks.vue'
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
