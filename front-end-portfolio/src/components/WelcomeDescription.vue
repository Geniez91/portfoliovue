<template>
<v-col class="col-6 text-slide-in ">
    <div class="d-flex flex-column align-center">
    <v-icon icon="mdi-briefcase" color="primary" size="150"></v-icon>
    <p class="text-primary text-h6">2 ans d'expériences en tant qu’apprenti Développeur Full Stack au sein de CarbonScore</p>
  </div>
  </v-col>
  <v-divider class="border-opacity-primary mx-5 text-slide-in" :vertical="mdAndDown ?false : true" color="primary"></v-divider>
  <v-col class="col-6 text-slide-in">
    <div class="d-flex flex-column align-center">
    <v-icon icon="mdi-school" color="primary" size="150" @click=""></v-icon>
    <p class="text-primary text-h6">Diplomé d’un mastère dev manager full Stack (RNCP 7) à l’ecole EFREI.</p>
  </div>
  </v-col>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';

const { mdAndDown}=useDisplay()
</script>