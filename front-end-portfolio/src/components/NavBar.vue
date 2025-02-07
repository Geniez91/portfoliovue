<template>
    <v-card>
      <v-tabs bg-color="white" class="d-flex flex-column align-center">
        <v-tab
          v-for="(item) in itemsNavBar"
          :key="item.name"
          :value="item.name"
          :to="item.to"
          :href="item?.href"
        >
          {{ item.name }}
        
        </v-tab>
      </v-tabs>
    </v-card>
  </template>
  
  <script lang="ts" setup>
  import type { IItemNavBar } from '@/interfaces/interfaces';
  import MonCV from '../assets/CV_WELTMANN_JEREMY_2025.pdf'
  const itemsNavBar: IItemNavBar[]=[{
     name:'Qui-suis-je ?',
     to:'/'
  },{
    name:'Mes compétences',
    to:'/skills'
  },
  {
    name:'Mon parcours académique',
    to:'/academic'
  },
  {
    name:'Mes expériences professionnelles',
    to:"/workExperience"
  },
  {
    name:'Mes projets',
    to:'/projects'
  },
  {
    name:'Mon CV',
    href:MonCV
  },
  {
    name:'Contact',
    to:'/contact'
  },


]
  </script>
  