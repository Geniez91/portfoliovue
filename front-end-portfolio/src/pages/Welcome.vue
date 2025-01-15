

<template>
    <div class="d-flex flex-column align-center mt-16">
        <CircleImage :height="250" :width="250" :img-src="ProgrammingImage"/>
    </div>
    <div class="d-flex flex-column align-center mt-6">
        <WelcomePresentation></WelcomePresentation>
  </div>
  <v-row class="mt-16 ml-8">
    <WelcomeDescription></WelcomeDescription>
  </v-row>
  <div class="d-flex flex-column align-center mt-16">
    <WelcomeLinks></WelcomeLinks>
  </div>
  <div class="d-flex flex-column align-center mt-16">
    <ButtonArrowTo :tooltip="'Mes Compétences'" to="/skills"></ButtonArrowTo>
  </div>
  
</template>

<script setup lang="ts">
import ProgrammingImage from '@/assets/programming.png';
import ButtonArrowTo from '@/components/ButtonArrowTo.vue';
import CircleImage from '@/components/CircleImage.vue';
import WelcomeDescription from '@/components/WelcomeDescription.vue';
import WelcomeLinks from '@/components/WelcomeLinks.vue';
import WelcomePresentation from '@/components/WelcomePresentation.vue';
</script>