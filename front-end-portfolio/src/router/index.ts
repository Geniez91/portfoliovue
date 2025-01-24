/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import AcademicPath from '@/pages/AcademicPath.vue'
import Skills from '@/pages/Skills.vue'
import Welcome from '@/pages/Welcome.vue'
import WorkExperience from '@/pages/WorkExperience.vue'
import Project from '@/pages/Project.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router/auto'

const routes:Array<RouteRecordRaw>=[{
  path:'/',
  component:Welcome,
},
{
  path:'/skills',
  component:Skills
},
{
  path:'/academic',
  component:AcademicPath
},
{
  path:'/workExperience',
  component:WorkExperience
},
{
  path:'/projects',
  component:Project
}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})



export default router
