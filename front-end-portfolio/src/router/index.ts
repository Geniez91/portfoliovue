/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import Skills from '@/pages/Skills.vue'
import Welcome from '@/pages/Welcome.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router/auto'

const routes:Array<RouteRecordRaw>=[{
  path:'/',
  component:Welcome,
},
{
  path:'/skills',
  component:Skills
}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})



export default router
