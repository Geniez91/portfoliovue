<template>
    <v-card>
      <v-tabs bg-color="white" class="d-flex flex-column align-center">
        <v-tab
          v-for="(item) in itemsNavBar"
          :key="item"
          :value="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-card>
  </template>
  
  <script lang="ts" setup>
  import type { TItemNavBar } from '@/interfaces/interfaces';
  const itemsNavBar: TItemNavBar[] = [
    'Qui-suis-je ?',
    'Mes compétences',
    'Mon parcours académique',
    'Mes expériences professionnelles',
    'Mes projets',
    'Contact',
  ];
  </script>
  