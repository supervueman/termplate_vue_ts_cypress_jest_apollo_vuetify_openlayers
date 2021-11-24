import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import { routes as mainRoutes } from '@/modules/main'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  ...mainRoutes,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
