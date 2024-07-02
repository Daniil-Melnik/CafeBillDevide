// Файл-маршрутизатор

import { createRouter, createWebHashHistory } from 'vue-router'
import ListChecks from '../components/pages/ListChecks.vue'
import ListPersons from '../components/pages/ListPersons.vue'
import ListRelat from '../components/pages/ListRelat.vue'

const routes = [
  {
    path: '/lsRec', // список чеков
    name: 'ListChecks',
    component: ListChecks
  },
  {
    path: '/', // главная страница - список посетителей
    name: 'ListPersons',
    component: ListPersons
  },
  {
    path: '/lsRelat', // список денежных отношений
    name: 'ListRelat',
    component: ListRelat
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
