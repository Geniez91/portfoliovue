<template>
<div class="container">
    <p class="text-write text-h5 text-black font-weight-bold" :class="smAndDown ? 'text-center mb-3 text-wrap':''">
      Bonjour à tous et Bienvenue sur mon portfolio ! 
    </p>
  </div>
  <p class="text-h5 text-black font-weight-bold text-slide-in":class="smAndDown ? 'text-center':''"  >
     Je m'appelle Jérémy Weltmann et je suis Développeur Web Full Stack.
    </p>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';

const {smAndDown}=useDisplay()
</script>

<style lang="css">
.container{
  display: inline-block;
}
</style>