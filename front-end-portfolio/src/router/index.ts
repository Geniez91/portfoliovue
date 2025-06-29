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
import Contact from '@/pages/Contact.vue'
import ExperienceDetail from '@/pages/ExperienceDetail.vue'
import Connexion from '@/pages/Connexion.vue'
import ForgettenPassword from '@/pages/ForgettenPassword.vue'
import UpdatePassword from '@/pages/UpdatePassword.vue'
import TestEditor from '@/pages/AddWorkExperience.vue'
import AddWorkExperience from '@/pages/AddWorkExperience.vue'
import EditWorkExperience from '@/pages/EditWorkExperience.vue'
import ProjetDetail from '@/pages/ProjetDetail.vue'
import AddProject from '@/pages/AddProject.vue'
import EditProject from '@/pages/EditProject.vue'

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
  path:'/workExperience/:name',
  component:ExperienceDetail
},
{
  path:'/projects',
  component:Project
},
{
  path:'/projects/:name',
  component:ProjetDetail
},
{
  path:'/contact',
  component:Contact
},
{
  path:"/admin-login",
  component:Connexion
},
{
  path:'/forgetten-password',
  component:ForgettenPassword
},
{
  path:'/update-password',
  component:UpdatePassword
},
{
  path:'/addWorkExperience',
  component:AddWorkExperience
},
{
  path:'/editWorkExperience/:id',
  component:EditWorkExperience
},
{
  path:'/addProject',
  component:AddProject
},
{
  path:'/editProject/:id',
  component:EditProject
}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})



export default router
