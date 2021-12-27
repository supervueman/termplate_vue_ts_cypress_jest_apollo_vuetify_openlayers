import { RouteConfig } from 'vue-router'
import Playground from '../views/Playground.vue'

const routes: Array<RouteConfig> = [
  {
    path: '/playground',
    name: 'Playground',
    component: Playground,
    meta: {
      layout: () => import('@/modules/playground/layouts/PlaygroundLayout.vue'),
    },
  },
]

export default routes
