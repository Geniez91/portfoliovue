<template>
  <v-app-bar app absolute color="navbar" >
    <v-btn icon @click="drawer = !drawer" class="d-md-none">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-app-bar-title v-if="!mdAndUp">Mon Portfolio</v-app-bar-title>
    <v-spacer class="d-none d-md-flex"></v-spacer>
    <v-tabs
      v-if="mdAndUp"
      bg-color="navbar"
      centered
      class="d-none d-md-flex"
    >
      <v-tab
        v-for="item in itemsNavBar"
        :key="item.name"
        :value="item.name"
        :to="item.to"
        :href="item?.href"
      >
        {{ item.name }}
      </v-tab>
    </v-tabs>

    <v-spacer class="d-none d-md-flex"></v-spacer>
  
    <v-btn icon="mdi mdi-moon-warning-crescent" @click="ChangeTheme()">
      <v-icon :icon=" theme.global.name.value === 'light' ? 'mdi-white-balance-sunny':'mdi-moon-waxing-crescent'" size="32"></v-icon>
    </v-btn>
    
  </v-app-bar>
  <v-navigation-drawer color="navbar" v-model="drawer" temporary class="d-md-none">
    <v-list>
      <v-list-item
        v-for="item in itemsNavBar"
        :key="item.name"
        :to="item.to"
        :href="item?.href"
        @click="drawer = false"
      >
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
  
  <script lang="ts" setup>
  import type { IItemNavBar } from '@/interfaces/interfaces';
  import MonCV from '/assets/CV_WELTMANN_JEREMY_2025.pdf'
import { useDisplay, useTheme } from 'vuetify';
import { ref } from 'vue';

const theme = useTheme()

  const {mdAndUp}=useDisplay()

  const drawer = ref(false);
  
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

function ChangeTheme(){
   theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
  </script>
  