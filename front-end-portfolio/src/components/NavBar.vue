<template>
    <v-card>
      <v-tabs bg-color="white" class="d-flex flex-column align-center">
        <v-tab
          v-for="(item) in itemsNavBar"
          :key="item.name"
          :value="item.name"
          :to="item.to"
        >
          {{ item.name }}
        
        </v-tab>
      </v-tabs>
    </v-card>
  </template>
  
  <script lang="ts" setup>
  import type { IItemNavBar } from '@/interfaces/interfaces';
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
    name:'Contact',
    to:'/'
  }
]
  </script>
  