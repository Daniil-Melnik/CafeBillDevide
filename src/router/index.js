import { createRouter, createWebHashHistory } from 'vue-router'
import ListFood from '../components/ListFood.vue'
import CafeView from '../components/CafeView.vue'
import ListPersons from '../components/ListPersons.vue'

const routes = [
  {
    path: '/',
    name: 'ListFood',
    component: ListFood
  },
  {
    path: '/lsPers',
    name: 'ListPersons',
    component: ListPersons
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
